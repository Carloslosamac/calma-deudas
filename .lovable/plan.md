## Objetivo

Herramienta interna para el equipo comercial que convierte el caso de una persona endeudada en un **diagnóstico** (consecuencias de no actuar, miedo y dolor) y una **solución** (alivio + qué podemos hacer). Tres pasos: Cualificación → Diagnóstico → Solución. Cada caso se guarda en la base de datos para consultarlo después.

## Flujo de uso

```text
[1 Cualificación]      [2 Diagnóstico IA]            [3 Solución IA]
 Texto libre del caso   Consecuencias de NO actuar    Alivio + plan de acción
 + campos guía  ──────► (miedo/dolor)          ──────► (qué podemos hacer)
 (deuda, bienes...)      · Guion interno comercial      · Guion interno comercial
                         · Texto para enviar cliente    · Texto para enviar cliente
```

El triaje existente (`src/lib/seo/triage.ts`: LSO / reunificar / reclamación) se usa para orientar a la IA hacia la solución correcta según los campos guía, respetando las reglas de marca.

## Acceso

- Nueva ruta protegida `/admin/ventas` (solo usuarios con rol `admin`, igual que las demás páginas de admin vía `useAdminAuth`).
- Enlace desde la cabecera/navegación interna del panel admin.

## Paso 1 — Cualificación

Formulario con:
- **Texto libre**: cuadro grande donde el comercial pega/escribe el caso de la persona.
- **Campos guía** (opcionales pero recomendados, afinan el diagnóstico y el triaje):
  - Importe total de deuda
  - ¿Está en impago? (sí/no)
  - Tipo de deudas (préstamos, tarjetas, microcréditos, hacienda/SS…)
  - Vivienda (propiedad / hipoteca / alquiler)
  - Vehículo (propiedad / financiado / no)
  - Ingresos mensuales aproximados
- Nombre/etiqueta del caso (para identificarlo en el historial).
- Botón "Generar diagnóstico".

## Paso 2 — Diagnóstico (IA)

- Llama a la IA (Lovable AI, modelo por defecto) con el texto + campos + la solución sugerida por el triaje.
- Genera el **diagnóstico**: consecuencias concretas de no actuar (embargos, ASNEF, intereses que crecen, presión, etc.), con tono que transmite la gravedad real.
- Salida en **dos versiones**: guion interno para el comercial y texto en segunda persona listo para enviar al cliente (WhatsApp/email).
- Botón para copiar cada versión.

## Paso 3 — Solución (IA)

- Genera la **solución**: alivio y plan de acción concreto alineado con el triaje (LSO, reunificar o reclamación), explicando qué podemos hacer y los siguientes pasos.
- Mismas dos versiones (guion interno / texto para cliente) con botón copiar.
- El diagnóstico y la solución se generan en la misma llamada para coherencia, mostrándose en sus pasos.

## Historial en BD

- Tabla nueva `sales_cases` con: etiqueta, texto del caso, campos guía (jsonb), solución de triaje, diagnóstico generado (interno + cliente), solución generada (interno + cliente), `created_by`, timestamps.
- RLS: solo admins pueden leer/crear/editar/borrar (vía `has_role(auth.uid(),'admin')`).
- En `/admin/ventas`: lista de casos guardados (más recientes primero), abrir uno para releer su diagnóstico y solución, y botón para crear caso nuevo.

## Reglas de marca aplicadas

- Triaje según memoria: LSO = insolvente sin bienes pagados; reunificar = insolvente con bienes pagados de valor; reclamación = solvente + usura + deuda baja.
- Nunca describir "reunificar" como préstamo nuevo / agrupar / hipoteca.
- No inventar cifras de Calma (usar solo `brandStats.ts` si se citan datos).

## Detalles técnicos

- **Frontend**: `src/pages/AdminVentas.tsx` con stepper de 3 pasos (componentes en `src/components/admin/ventas/`), usando los componentes UI existentes (Card, Tabs, Textarea, Input). Lazy route en `App.tsx`.
- **IA**: nueva edge function `supabase/functions/sales-diagnosis/index.ts` que recibe caso+campos, aplica el triaje, llama a Lovable AI (`google/gemini-3-flash-preview`) con `LOVABLE_API_KEY`, y devuelve `{ diagnostico: {interno, cliente}, solucion: {interno, cliente}, triage }` como JSON estructurado. Manejo de errores 429/402.
- **BD**: migración para crear `sales_cases` con GRANTs + RLS admin-only. El guardado se hace desde el cliente tras recibir la respuesta de la IA.
- **Triaje**: reutiliza `src/lib/seo/triage.ts`; se mapean los campos guía a `TriageInput` en la edge function.
