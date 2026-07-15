# Investigar y arreglar la generación automática de contenido

No fue un problema de créditos. Hay dos incidencias reales en la cron `generate-daily-posts`:

## Diagnóstico

**Bloque 1 — 9, 10 y 11 de julio: fallos reales**
- `cron` (posts) marcó `failed` los tres días con los mismos roadmap ids: **74, 75, 76, 78, 82, 84, 87, 89, 91**.
- `cron-casos` también falló 1–2 casos esos días.
- El hecho de que sean los MISMOS ids todos los días descarta falta de créditos: apunta a contenido/plantilla que rompe la generación de esos posts concretos.

**Bloque 2 — desde el 12 de julio: runs colgados**
- Todos los `cron` (posts) del 12 al 15 aparecen en estado `running` sin `finished_at`.
- `cron-casos` de esos mismos días sí terminan `success`.
- En AI Gateway el 15/jul a las 08:15–08:17 hubo llamadas exitosas de Gemini, así que el edge function arranca y llama al modelo — pero después algo impide que se actualice el registro a `success` o `failed`.

## Pasos del plan

1. **Leer logs recientes de `generate-daily-posts`** (`supabase--edge_function_logs`) para localizar la excepción o el timeout que deja el run en `running`.
2. **Inspeccionar `supabase/functions/generate-daily-posts/index.ts`**, en concreto:
   - El bloque final que hace `UPDATE generator_runs SET status/finished_at`: confirmar que está dentro de un `finally` para que se ejecute también si algo lanza excepción.
   - Manejo de excepciones alrededor del bucle de roadmap ids.
   - Tiempos totales (si supera el timeout del edge function con muchos posts, el proceso muere sin poder cerrar el run).
3. **Revisar los roadmap ids 74, 75, 76, 78, 82, 84, 87, 89, 91** en la tabla del roadmap: probablemente comparten alguna característica (título/prompt/config) que hace fallar la generación o la validación posterior. Reproducir uno con una llamada directa al edge function para capturar el error concreto.
4. **Fixes previstos** (a confirmar tras 1–3):
   - Envolver el ciclo principal en `try/finally` que siempre marque el run como `success`/`failed` con contador correcto.
   - Aislar cada post en su propio `try/catch` para que un id malo no tumbe el resto (parece que ya lo hace, pero conviene confirmar y añadir mensaje de error por id).
   - Corregir/eliminar/regenerar los 9 roadmap ids problemáticos según lo que revele el paso 3.
   - Añadir un job de saneamiento: cerrar como `failed` cualquier `generator_run` en `running` con `started_at > 30 min`.
5. **Re-ejecutar manualmente** la cron para el día de hoy y verificar que se crea al menos 1 post y que el run termina en `success`.

## Nota sobre créditos

En el AI Gateway no hubo ni un solo error `402`/`429` en los últimos 7 días (391 llamadas, todas OK). El ciclo actual arrancó el 11/jul con 400 créditos y solo se han gastado 7,4. Así que los créditos no son la causa y no hay que actuar sobre eso.
