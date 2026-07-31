## Qué he verificado

- Los runs de 44m no son "lentos": el edge function muere sin cerrar el run y lo cierra después `close_stale_generator_runs` (>30 min). Por eso la duración es 44m y el estado queda "Fallo".
- Causa concreta: en `generate-daily-posts` el presupuesto es `TIME_BUDGET_MS = 130s`, pero cada post puede consumir `withTimeout(generateArticle, 180s)` + `withTimeout(hero, 180s)` = hasta 360s. El límite wall-clock del edge function llega antes → proceso matado → run huérfano, sin `published_count` ni cierre.
- El post del 30/07 16:17 (`cancelar-deudas-y-volver-a-facturar-sin-bloqueos`) tiene la imagen guardada como `slug.jpg` **sin timestamp**, mientras que las que regeneré ayer sí lo llevan. Es decir: el cron ejecutó una versión desplegada anterior a los últimos cambios de prompt/rutas. Además su `hero_alt` describe "mujer de perfil en terraza" pero la imagen es la pareja en mesa blanca: la imagen no corresponde al prompt nuevo.

## Plan

### 1. Que el run nunca se cuelgue

- Bajar los timeouts por fase a valores que quepan en la ventana real: artículo 70s, hero 45s.
- Comprobar el presupuesto **antes de cada fase** (no solo al inicio del bucle) y saltar el hero si no queda margen.
- Envolver todo el bucle en un deadline global (~120s) y cerrar el run en un `finally`, de modo que siempre se escriba `status`, `published_count`, `failed_count` aunque algo falle.
- Heartbeat: actualizar `generator_runs` tras cada post (ya existe parcialmente) para que la duración refleje trabajo real.

### 2. Que el objetivo diario se cumpla

- Mantener 3 crons/día (08:15, 12:15, 16:15 UTC) con objetivo 1–2 por run, ahora sí alcanzable dentro de la ventana.
- Si el presupuesto corta el run, cerrarlo como **OK parcial** (no "Fallo") con motivo `presupuesto`, para distinguir fallo real de corte planificado.

### 3. Que el cron use de verdad el prompt nuevo

- Añadir una constante `PIPELINE_VERSION` en `generate-daily-posts` y guardarla en `generator_runs` y en el post creado (o en el log), para poder comprobar en `/admin/contenido/salud` qué build generó cada imagen.
- Unificar el bloque de escenas/prompt/estilo entre `generate-daily-posts` y `regenerate-blog-hero` moviéndolo a `supabase/functions/_shared/hero-prompt.ts`, para que no puedan volver a divergir.
- Forzar ruta con timestamp también en el cron y `upsert: true`, evitando reutilizar ficheros antiguos.
- Redesplegar ambas funciones y comprobar en logs que el run nuevo reporta la versión esperada.

### 4. Corregir lo ya publicado

- Regenerar la portada del post del 30/07 con entorno blanco.
- Revisar los posts de los últimos 3 días y regenerar los que no lleven timestamp en la ruta (marcador de pipeline viejo).

## Detalle técnico

Archivos: `supabase/functions/generate-daily-posts/index.ts`, `supabase/functions/regenerate-blog-hero/index.ts`, nuevo `supabase/functions/_shared/hero-prompt.ts`. Sin cambios de esquema salvo, si hace falta, una columna `pipeline_version` en `generator_runs`.
