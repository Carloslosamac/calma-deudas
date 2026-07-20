## Diagnóstico confirmado

Comparando las capturas: las dos primeras (batch reciente) son fotos "de móvil" reales; la tercera (posts 19-20 julio, del cron) tiene el look editorial/stock (salas de reuniones con trajes, sello CANCELLED, familias perfectas). Ese estilo es el que produce `google/gemini-2.5-flash-image`, no Nano Banana 2 Lite.

El pipeline del cron y el del regenerador manual comparten prompt y modelo primario (`google/gemini-3.1-flash-lite-image`), pero ambos tienen a `google/gemini-2.5-flash-image` como fallback. En el cron, bajo presión de wall-clock y con `withTimeout(hero, 2min)`, el intento primario falla o vence más a menudo, se cae al fallback, y ese modelo es el que devuelve las imágenes tipo stock que ves en la tercera captura. El batch manual, sin esa presión, casi siempre resolvía con el primario y por eso quedaron consistentes.

## Cambios

Todo en `supabase/functions/generate-daily-posts/index.ts` (y espejo en `regenerate-blog-hero/index.ts` para que ambos se comporten igual):

1. **Eliminar el fallback a `gemini-2.5-flash-image`.** Es la fuente del "AI look". Si Lite falla, mejor no publicar imagen que publicar una que rompe la coherencia visual del blog.
2. **Timeout explícito + 2 reintentos en Nano Banana 2 Lite.** `fetchWithTimeout(45s)` por intento, hasta 3 intentos con backoff corto (1s, 3s). Cubre picos transitorios sin caer al modelo malo.
3. **Fallback de calidad, no de estilo.** Si tras los 3 intentos sigue fallando Lite, intentar UNA vez `google/gemini-3.1-flash-image` (Nano Banana 2 no-Lite, mismo estilo, ~3x más caro pero coherente). Si también falla, publicar sin hero (comportamiento actual del `withTimeout`).
4. **Endurecer `sceneFromLLM`:** si devuelve null, reintentar una vez antes de caer al regex `sceneFromTitle` (el regex también contribuye al look genérico cuando el LLM falla bajo carga).
5. **Subir el timeout de `generateAndUploadHero`** de 2min → 3min para dar margen a los reintentos sin cortar prematuro.

## Regeneración de los posts afectados

Después del cambio, regenerar los posts con look editorial de los últimos días (aprox. 8-12 posts del 18-20 julio) llamando a `regenerate-blog-hero` con offset acotado, para que igualen a los del batch anterior.

## Coste

- Caso normal (Lite acierta al primero): igual que ahora, ~0.135 cr/imagen.
- Caso reintento en Lite: aún ~0.135 cr (los intentos fallidos no facturan imagen).
- Caso fallback a Nano Banana 2 no-Lite: ~0.4 cr en ese post aislado. Debería ser marginal (<5% de posts).

## Detalles técnicos

- Archivos: `supabase/functions/generate-daily-posts/index.ts`, `supabase/functions/regenerate-blog-hero/index.ts`.
- No cambia el prompt ni la escena; solo la política de modelos, timeouts y reintentos.
- Sin migración de BD.