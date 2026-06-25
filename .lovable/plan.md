# Fix: la IA debe usar los datos editados, no las cifras del texto libre

## Problema
El edge function `sales-diagnosis` envía a la IA dos fuentes:
1. El texto libre del caso (resumen narrativo del comercial / caso de prueba).
2. Los "DATOS GUÍA" estructurados (deuda, entidades, ingresos, vivienda…).

Cuando ambas tienen cifras distintas (p.ej. el texto dice 1.350€ pero el campo Ingresos dice 1.100€), la IA usa la del texto libre. Resultado: el guion menciona 1.350€ aunque el comercial puso 1.100€.

## Solución
Establecer jerarquía explícita: **los DATOS GUÍA son la única fuente de verdad** para cifras y entidades. El texto libre sirve solo para contexto cualitativo (situación personal, emociones, tono), nunca para números.

### Cambios en `supabase/functions/sales-diagnosis/index.ts`
1. En el prompt principal (`buildPrompt`) y en los demás prompts que incluyen el caso (firma `buildSigningPrompt` y contrato), reordenar y etiquetar:
   - Poner los DATOS GUÍA marcados como **FUENTE DE VERDAD (prioridad absoluta)**.
   - Marcar el texto libre como **CONTEXTO CUALITATIVO** (situación, emociones), aclarando que NO debe usarse para importes, salario ni entidades si entran en conflicto con los datos guía.
2. Añadir una regla en el bloque REGLAS:
   - "Si una cifra (deuda, cuota, ingresos) o una entidad aparece en el texto libre pero difiere de los DATOS GUÍA, usa SIEMPRE el valor de los DATOS GUÍA. Los DATOS GUÍA reflejan lo que el comercial ha confirmado y editado."
3. Aplicar la misma regla/etiquetado a `buildSigningPrompt` y al prompt de contrato para que contrato y firma también respeten los datos editados.

### Despliegue
- Redesplegar `sales-diagnosis`.

### Verificación
- Regenerar el diagnóstico del caso de prueba con Ingresos = 1.100 y confirmar que el guion ya cita 1.100€ y no 1.350€.

## Nota
No hace falta tocar el frontend ni la base de datos: el campo Ingresos ya se envía correctamente; el problema es solo de priorización en el prompt.
