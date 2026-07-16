## Problema

En la captura, el guion de Solución dice "aplicamos la LSO para **cancelar legalmente los 18.000 €**" cuando el triaje ha resuelto **Plan de pagos**. En plan de pagos NO se cancela todo de golpe: se paga una cuota durante 3–5 años y al final se exonera el resto. El guion suena igual para cualquier modalidad porque el prompt no se ramifica por `modality` ni por `variant`.

## Causa raíz en `supabase/functions/sales-diagnosis/index.ts`

- `SOLUTION_BRIEF.lso` y `SOLUTION_BENEFITS.lso` están redactados como "cancelar la deuda y empezar de cero" / "los X € quedan CANCELADOS por sentencia" — válido solo para **sin masa**. Se aplica igual a `liquidacion` y `plan_pagos`.
- `buildTriageExtraBlock` sí añade la cuota estimada y un aviso débil ("no prometas cancelación total inmediata"), pero queda dominado por el BRIEF/BENEFITS anteriores.
- No hay diferenciación de `variant` (individual vs conjunta/gananciales vs autónomo — concurso consecutivo, art. 489 TRLC, implicaciones distintas).

## Cambio (solo edge function, cero cambios de UI ni de datos)

Reescribir el bloque de solución para que se **componga por modalidad + variante**, y hacer que el prompt lo trate como fuente de verdad por encima de cualquier plantilla genérica.

### 1. `SOLUTION_BRIEF` deja de ser un `Record<solution, string>` y pasa a componerse

Para `solution = "lso"`, construir el brief a partir de `modality`:

- **sin_masa** → "LSO modalidad SIN MASA: no hay bienes de valor que liquidar, el proceso es rápido y termina con la EXONERACIÓN de la totalidad de la deuda (los X €). Es la modalidad en la que sí cabe decir que 'se cancela toda la deuda'."
- **liquidacion** → "LSO modalidad CON LIQUIDACIÓN: se liquida el/los bien(es) con valor (vehículo financiado con equity, etc.) para pagar a acreedores, y lo que quede sin cubrir se EXONERA por sentencia. NO digas 'te cancelamos todos los X €': parte se cubre con la liquidación del bien y el resto se exonera."
- **plan_pagos** → "LSO modalidad PLAN DE PAGOS: durante 3 a 5 años pagas una cuota mensual asumible (ingresos − gastos, estimada en Y €/mes) y al final del plan se EXONERA el resto de la deuda. PROHIBIDO decir 'cancelamos los X € ya' o 'sentencia que elimina la deuda de golpe': es un plan de pagos judicial con exoneración diferida al cumplirlo."

Para `reunificar` y `reclamacion` se conservan tal cual (ya son correctos).

### 2. `SOLUTION_BENEFITS.lso` también se ramifica por modalidad

- **sin_masa**: los beneficios actuales (cancelación íntegra por sentencia, fin de embargos, salida ASNEF, corte de llamadas de [entidades]).
- **liquidacion**: enfatizar (a) se paga con lo que valga el bien liquidado, (b) el resto se exonera, (c) se paran intereses/costas mientras se tramita.
- **plan_pagos**: enfatizar (a) cuota previsible de Y €/mes durante 3–5 años (mucho menor que lo que hoy pagas), (b) al cumplir el plan se exonera el resto, (c) durante el plan se paran embargos y crecen 0 intereses de demora, (d) sales de ASNEF al finalizar.

### 3. Modulación por `variant`

Añadir una línea al final del brief:
- **individual** → sin coletilla adicional.
- **conjunta** → "Concurso conjunto de ambos cónyuges en régimen de gananciales: umbral y viabilidad calculados sobre ingresos y gastos del hogar."
- **autonomo** → "Concurso consecutivo para autónomo: incluye deudas de la actividad; ver excepciones de deuda pública si aplican."

### 4. Reglas duras que se inyectan en el prompt cuando `solution = lso`

Añadir un bloque `LSO_HARD_RULES` (mismo texto en `buildPrompt`, `buildSigningPrompt`, `buildContractMessagePrompt`, `buildReinforcePrompt`) con:
- Si `modality = plan_pagos`: PROHIBIDO usar "cancelamos la deuda", "eliminamos los X €", "sentencia que borra la deuda". Obligatorio hablar de "cuota de Y €/mes durante 3–5 años y exoneración del resto al final".
- Si `modality = liquidacion`: PROHIBIDO decir "cancelamos todos los X €". Obligatorio explicar que parte se cubre con la liquidación del bien y el resto se exonera.
- Si `modality = sin_masa`: sí se puede hablar de cancelación íntegra.
- La cuota estimada solo se cita si `modality = plan_pagos` y `estimatedInstallment` está definido.

### 5. Recolocar la jerarquía en el prompt

Hoy `SOLUTION_BRIEF` y `SOLUTION_BENEFITS` se imprimen ANTES de `buildTriageExtraBlock`, por lo que ganan por posición. Cambiar el orden: primero `ENCAJE LSO YA RESUELTO` + `LSO_HARD_RULES`, luego el brief/benefits **ya modulados**. Sin esto, la IA sigue arrastrando la plantilla vieja.

## Archivos que se tocan

- `supabase/functions/sales-diagnosis/index.ts` — nueva composición de `SOLUTION_BRIEF` / `SOLUTION_BENEFITS` por `modality`+`variant`, `LSO_HARD_RULES`, reordenado de bloques en los 4 prompts.

No se toca:
- `src/lib/seo/triage.ts` (ya devuelve `modality`/`variant`/`estimatedInstallment` bien).
- `AdminVentas.tsx` (ya envía `triageExtra` al edge).
- UI, datos, esquema, Zoho/GHL.

## Métrica de éxito

- Caso del pantallazo (Individual · Plan de pagos, 18.000 €): el guion cita cuota mensual (Y €/mes) durante 3–5 años y exoneración diferida, **no** "cancelar legalmente 18.000 €".
- Casos con modalidad `sin_masa` sí pueden decir "cancelación íntegra".
- Casos con `liquidacion` explican liquidación del bien + exoneración del resto.
- Sin coste adicional de tokens: los mismos ~3 párrafos, solo condicionados por modalidad.
