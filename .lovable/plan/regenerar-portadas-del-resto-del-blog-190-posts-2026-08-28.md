# Regenerar portadas del resto del blog (190 posts)

## Estado actual
- Total de posts en `generated_posts`: **240**
- Ya regenerados con el nuevo motor de escenas: **50** (los más recientes)
- Pendientes: **190**

## Presupuesto en Lovable credits (estimación)

Por post solo hay UNA llamada de IA: la generación de imagen con `google/gemini-3.1-flash-lite-image` (Nano Banana 2 Lite, el modelo de imagen más barato del gateway). El prompt de escena es determinista y no gasta nada.

- **Estimación: ~190 imágenes ≈ unos 5-10 credits en total** (depende del precio por imagen del modelo Lite; es del orden de céntimos por imagen).
- Mi trabajo de agente es mínimo: reutilizar la función `regenerate-blog-hero` ya desplegada en lotes de ~25 (8 llamadas). Prácticamente despreciable frente a 1 credit.
- La estimación se valida gratis: tras el primer lote de 25 se puede mirar el consumo real en los logs del AI Gateway y extrapolar antes de seguir.

Riesgo: reintentos por imagen fallida suman su coste; el run anterior de 50 terminó sin fallos.

## El cron diario ya usa el nuevo motor
`generate-daily-posts` importa el mismo `_shared/hero-prompt.ts` que se reescribió y desplegó — los posts nuevos ya salen con escenas coherentes con el título sin tocar nada más.

## Ejecución
1. Lanzar la regeneración por lotes de ~25 sobre los 190 posts restantes (excluyendo los 50 ya hechos), del más reciente al más antiguo.
2. Verificar al final que los 240 tienen `hero_image_url` actualizada y ninguna quedó en error.

## Detalles técnicos
- Reutiliza `supabase/functions/regenerate-blog-hero` y el motor de escenas de `supabase/functions/_shared/hero-prompt.ts` ya desplegados — no hay que escribir código nuevo.
- Se hará con un parámetro de offset/exclusión de los ya regenerados para no repetir ni gastar de más.
