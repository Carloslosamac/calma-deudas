## Objetivo
Llegar a 5-7 posts publicados al día sin cambiar la calidad de imagen ni tocar los timeouts que ya funcionan. Mantener el "fallido por presupuesto" visible como está.

## Cambios

### 1. Reducir el objetivo por invocación a 2 fijo
En `supabase/functions/generate-daily-posts/index.ts`:
- Cambiar `DAILY_DISTRIBUTION = [2, 2, 3, 3, 3, 4]` a `[2, 2, 2]` (o `pickDailyCount → 2`). Con 2 posts caben cómodos en los 130s de presupuesto (30-40s texto + hasta 3 min imagen en el peor caso; el 2º arranca antes del corte).
- Motivo: los últimos runs muestran que el 2º post entra en zona de riesgo y el 3º casi nunca cabe.

### 2. Programar 3 crons al día en vez de 1
En Cloud (SQL via `supabase--insert` porque lleva project ref y anon key, no migration):
- Desprogramar el cron actual (`cron.unschedule`) de `generate-daily-posts`.
- Reprogramar 3 invocaciones distintas: `08:15`, `12:15` y `16:15` UTC (nombres separados, p.ej. `daily-posts-am`, `daily-posts-noon`, `daily-posts-pm`).
- Cada uno llama al mismo edge function; con objetivo 2 por invocación → 6 posts/día en media, rango 4-6 si algún run pierde 1 por presupuesto.

### 3. Sin cambios en el manejo de fallidos
- Se mantiene: si el 2º post no cabe en el presupuesto, queda como `Fallaron roadmap ids: X (parado por presupuesto de tiempo)` en `generator_runs`, visible en `/admin/contenido/salud`. Sirve como señal para saber cuándo el sistema no llega.

## Fuera de scope
- No se toca el modelo de imagen, ni retries, ni timeouts de hero, ni el flujo de scene-LLM.
- No se toca `generate-daily-casos` (distinto cron, sin este problema).
- No se cambia la UI de salud.

## Detalles técnicos
- Archivo a editar: `supabase/functions/generate-daily-posts/index.ts` (líneas 144-148).
- SQL a ejecutar vía `supabase--insert` (contiene URL del proyecto + anon key, no puede ir en migration):
  ```sql
  select cron.unschedule('<nombre-actual>');
  select cron.schedule('daily-posts-am',   '15 8 * * *',  $$ select net.http_post(...) $$);
  select cron.schedule('daily-posts-noon', '15 12 * * *', $$ select net.http_post(...) $$);
  select cron.schedule('daily-posts-pm',   '15 16 * * *', $$ select net.http_post(...) $$);
  ```
- Antes de reprogramar, listar `cron.job` para obtener el nombre exacto del actual.
