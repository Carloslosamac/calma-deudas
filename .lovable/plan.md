
## Contexto

`/admin/ventas` guía al comercial por 6 fases. Hoy la fase **Solución** (y todo lo que la sigue: Contrato, Firma) se apoya en un `triage()` binario (`lso | reunificar | reclamacion`) duplicado en `src/lib/seo/triage.ts` y en `supabase/functions/sales-diagnosis/index.ts`. No refleja el flowchart real de la LSO. Vamos a rediseñar Cualificación + triaje + Solución con criterio de **mínima fricción para el comercial** y **máximo ahorro de tokens** en la IA.

## Principios de este rediseño

- **Cero preguntas redundantes.** Cada campo nuevo se pregunta solo si su respuesta cambia el resultado del triaje.
- **Cortocircuitos tempranos.** Si en cualquier momento el triaje ya puede decidir (administrador → derivar, deuda <7.000€ sin usura → no insolvente), se salta el resto de la Cualificación y se marca como "derivar" o "descartar", sin invocar la IA.
- **Un solo prompt por fase.** El edge function `sales-diagnosis` recibe ya calculados `variant`, `modality`, `estimatedInstallment` y `warnings`. La IA no vuelve a razonarlos — solo redacta. Eso reduce ~40% el input token.
- **Reutilizar UI existente.** No añadimos cards nuevas: los campos nuevos se acoplan a los screens actuales de Cualificación.

## Nuevos campos de Cualificación (mínimos)

Se añaden a `GuideFields` en `AdminVentas.tsx`:

| Campo | Cuándo se pregunta | Motivo |
|---|---|---|
| `profile` (`particular_soltero` · `gananciales` · `autonomo` · `administrador_sociedad`) | Screen nuevo al inicio de Cualificación, sustituye a la pantalla `empleo` como primera de cualificación económica (el `employment` fino se mantiene solo si `profile ≠ administrador`) | Cambia umbral (1.700€ vs 3.000€) y ruta LSO |
| `publicDebtAmount` | Solo si el comercial marca Hacienda o Seguridad Social en `debts` | Warning "esa parte no se cancela" cuando >10.000€ con un mismo organismo |
| `isPrimaryResidence` (bool) | Se añade como toggle dentro del screen `vivienda` cuando `housing = hipoteca` | Habilita plan de pagos vs sin masa |
| `wantsToKeepVehicle` (bool) | Se añade como toggle dentro de `vehiculo` cuando `vehicle = financiado` y hay equity (`vehicleValue > vehicleRemaining`) | Plan de pagos vs liquidación |

**No añadimos pantalla nueva** para "quiere retener" ni para "vivienda habitual": son toggles inline en los screens que ya existen, así el flujo mantiene ≤10 pasos.

**Screen `empleo` actual**: se refunde con el nuevo `perfil`. `profile` sustituye a `employment` para el triaje; `employment` se conserva solo si `profile` es particular/autónomo, para el bloque de embargabilidad que ya usa el edge function.

## Motor de triaje (cliente + edge, idénticos)

Reescritura de `src/lib/seo/triage.ts` y del bloque `triage()` de `supabase/functions/sales-diagnosis/index.ts` con:

```ts
type Solution = "lso" | "reunificar" | "reclamacion" | "derivar" | "no_insolvente";
type Variant  = "individual" | "conjunta" | "autonomo";
type Modality = "sin_masa" | "liquidacion" | "plan_pagos";
interface TriageResult {
  solution: Solution;
  variant?: Variant;
  modality?: Modality;
  estimatedInstallment?: number;
  warnings: string[];
  title: string;
  description: string;
  highlights: string[];
}
```

Árbol (mismo orden que el flowchart, con cortos):

```text
1. administrador_sociedad          → derivar (STOP: no se genera resto de Cualificación)
2. deudaTotal <7.000€:
     solvente + usura              → reclamacion
     resto                         → no_insolvente
3. variant = autonomo | conjunta | individual  (por profile)
   umbralIngresos = 3.000€ si conjunta, else 1.700€
4. warning "deuda pública no cancelable" si publicDebtAmount > 10.000€
5. ingresos ≥ umbral:
     ratio gastos/ingresos >75%    → plan_pagos
     50–75%                        → plan_pagos + warning zona gris
     <50%                          → no_insolvente
   ingresos < umbral: modalidad por activos (paso 6)
6. hipoteca con equity + vivienda habitual → plan_pagos
   vehículo financiado con equity:
     wantsToKeep = true            → plan_pagos
     wantsToKeep = false           → liquidacion
   resto                           → sin_masa
7. Override marca: si insolvente + vivienda en propiedad (o coche valor ≥5.000€ retenido) → reunificar
8. estimatedInstallment = plan_pagos ? max(0, ingresos − gastos) : undefined
```

Se mantiene la firma actual (`solution`, `title`) para no romper el resto del edge function ni la persistencia; los campos nuevos son aditivos.

## Fase Solución (UI)

Antes del bloque de tarjetas de la IA, insertar un único bloque compacto `<TriageSummary>` (no una card nueva; va como primera "screen" del step 3):

- Línea 1: `Individual · Plan de pagos` (variant · modality humanizados).
- Línea 2 (si `plan_pagos`): `Cuota estimada: 320 €/mes · 3–5 años`.
- Línea 3 (si `warnings.length`): chips.
- Si `solution = "derivar"`: mensaje único "Derivar a abogado concursal", oculta el resto del guion y sustituye los botones de Contrato/Firma por `Marcar derivado`.

Este bloque también se muestra minimizado en el header sticky (`STEPS[step]`), para que el comercial vea el encaje sin abrir la card.

## Edge function `sales-diagnosis`

- Recibe `variant`, `modality`, `estimatedInstallment`, `warnings` desde el cliente y **no vuelve a calcularlos** (el triaje del edge queda solo como validación defensiva).
- El prompt de `solution` pasa a ser una plantilla condensada de ~50% de longitud actual:
  - `SOLUTION_BRIEF` se compone en runtime con los campos ya resueltos (`"${variant} · ${modality}. Cuota estimada X €/mes. Warnings: …"`).
  - Se eliminan del prompt los razonamientos redundantes ("si no hay bienes…", "si es autónomo…") — ya vienen resueltos.
  - Bloqueos duros añadidos: prohibido prometer "cancelación total" cuando `modality = plan_pagos`; obligatorio mencionar la parte de deuda pública si aparece en warnings.
- `phase = "derivar"` (nuevo): devuelve un guion breve de derivación sin honorarios. Al detectar `solution = "derivar"` el cliente ni siquiera llama a la IA para Contrato/Firma → cero coste.

## Persistencia

Sin migración: los campos nuevos entran dentro de `guide_fields` (JSONB) y `triage_extra` se guarda anexo en el mismo JSONB (`{ variant, modality, estimatedInstallment, warnings }`). `triage_solution` y `triage_title` siguen igual.

## Alcance de cambios

Archivos que se tocan:
- `src/lib/seo/triage.ts` — reescritura.
- `src/pages/AdminVentas.tsx` — nuevos campos en `GuideFields`, screen `perfil`, toggles inline en `vivienda`/`vehiculo`, bloque `TriageSummary` en Solución, cortocircuito para `derivar`/`no_insolvente`, `loadTestCase` ampliado.
- `supabase/functions/sales-diagnosis/index.ts` — recibir `variant/modality/warnings/estimatedInstallment`, prompt condensado, fase `derivar`.

No se tocan:
- `FormSection.tsx` ni `/gracias` (el cliente público seguirá con el mismo triaje al no aportarle los nuevos campos; caerá al fallback existente).
- Zoho / GHL / esquema BD.
- Fases Presentación y Cualificación previas al paso "perfil" (guiones existentes se conservan).

## Métricas de éxito

- Pasos de Cualificación: hoy 9, tras el cambio 9 (misma cantidad; se sustituye `empleo` por `perfil` y se añaden toggles inline).
- Reducción del prompt de `solution` ≈40% en input tokens.
- Casos `administrador_sociedad` y `no_insolvente` no invocan IA (ahorro completo).
