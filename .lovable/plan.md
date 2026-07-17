## Diagnóstico rápido

**1. Coste real, no 1 crédito por imagen**

Consulté los logs del AI Gateway para las 5 regeneraciones de este último lote. Todas usaron el modelo previsto y costaron mucho menos que 1 crédito:

- Modelo: `google/gemini-3.1-flash-lite-image` en `image_generations` (no chat_completions).
- Coste por imagen: **≈ 0,1346 créditos** (5 llamadas: 0,1346 + 0,1347 + 0,1346 + 0,1347 + 0,1346 ≈ **0,67 créditos en total para las 5**).
- Duración por imagen: ~2,8–3,0 s.
- 0 llamadas de LLM de descripción de escena (se sustituyó por lógica local): también contabilizado en 0 créditos extra.

Los 5,4 créditos que ves en el desglose de la sesión incluyen otras llamadas anteriores (por ejemplo la prueba inicial con Nano Banana estándar antes del cambio, que sí costó ~0,155 créditos, y los intentos previos que usaban el chat model + la llamada extra de descripción de escena, que sumaban ~1 crédito por imagen). Desde este lote, el ratio real es ~7× más barato que antes.

**2. Los posts SÍ están cambiados**

Confirmado en BD: los 5 slugs de este lote tienen `hero_image` con URL firmada nueva y `updated_at` de las 09:35–09:36 UTC de hoy. El frontend (`src/data/blog/dbPosts.ts`) lee `hero_image` desde la BD y mapea a `heroImage` en el componente, así que la vista de /blog los está sirviendo.

Los slugs actualizados en este lote son antiguos, no de la portada del blog:
- `toda-informacion-sobre-pagas-extras-son-embargables`
- `saber-sepe-ha-aprobado-paro`
- `significa-deuda-post-concursal`
- `avalistas-ley-segunda-oportunidad`
- `delitos-contra-derechos-trabajdores`

En /blog aparecen ordenados por fecha de publicación descendente, así que estos están en páginas posteriores, no arriba. Los 4 primeros del listado (los de ayer) ya se refrescaron antes.

## Qué te propongo hacer

1. Abrir directamente uno de los 5 posts refrescados y comprobar que ves la imagen nueva. Ejemplo: `/blog/toda-informacion-sobre-pagas-extras-son-embargables`. Si ahí sí se ve el cambio, la refactorización funciona y el problema es solo de dónde estás mirando.
2. Si quieres verlo reflejado ya en la portada del blog, tiene sentido cambiar el criterio de refresco: en vez de posts "más antiguos", refrescar los que aún tienen el estilo viejo pero **en orden descendente de fecha de publicación**, para que los cambios aparezcan primero en la home del blog. Se puede parametrizar `regenerate-blog-hero` con `order: "desc" | "asc"` y `offset` para ir avanzando por lotes.
3. Presupuesto: a 0,135 créditos por imagen, refrescar 100 posts ≈ 13,5 créditos. Puedo lanzarlo en lotes de 5 hasta terminar, mostrando el progreso y el coste acumulado real tras cada lote para que puedas cortar en el punto que quieras.

## Cambios de código (si aceptas)

- `supabase/functions/regenerate-blog-hero/index.ts`: añadir parámetros opcionales `order` (`"desc"` | `"asc"`, default `"desc"` para que aparezcan en portada) y `offset` (default 0). Reemplazan al `limit` puro cuando no se pasan `slugs`.
- Sin cambios en frontend ni migraciones.
- Ningún cambio en cron ni en la generación diaria (esa ya usa la pipeline barata).

## Fuera de alcance
- Rediseño visual del blog.
- Cambiar de modelo otra vez (los 0,135 créditos son ya el mínimo razonable del catálogo Gemini de imagen).
