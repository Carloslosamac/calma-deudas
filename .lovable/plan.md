## Diagnóstico

Las portadas del cron (22 jul) que has marcado como "cliché IA" (pareja de mediana edad frente al portátil, pareja en concesionario con llaves) usan el **mismo modelo y prompt** que las buenas del batch (mujer sola frente a papeles, mostrador de banco, buzones). No es un fallback al modelo malo.

Lo que las diferencia es **el sujeto de la escena**: las buenas describen **una sola persona o solo objetos** ("mujer mayor sola ante un cajero", "buzones de portal"); las malas describen **dos personas interactuando** ("pareja consultando móvil", "pareja recogiendo llaves del coche"). Nano Banana 2 Lite, con dos personas + oficina + ventana, siempre produce el look "stock corporativo" que ves — es un patrón conocido del modelo.

El fallo real está en `sceneFromLLM` (`generate-daily-posts` y `regenerate-blog-hero`): el prompt permite parejas/grupos y el modelo cae en ellos por defecto para temas de deuda familiar.

## Plan

### 1. Endurecer `sceneFromLLM` para forzar sujeto único (o ninguno)
En el prompt del scene-LLM (compartido por cron y regenerador):
- Añadir: "**Máximo UNA persona** en la escena. Prohibido parejas, familias, grupos, dos personas frente a un portátil, gestor atendiendo a cliente. Prioriza escenas **sin personas** (objetos, lugares, exteriores) o con una sola persona de espaldas/perfil/manos."
- Añadir a la lista de prohibidos por defecto: "pareja o gestor+cliente frente a un ordenador", "dos personas conversando en oficina", "familia mirando papeles".

### 2. Reforzar el prompt de imagen como red de seguridad
En `generateAndUploadHero` (ambos archivos), añadir a la lista de "Prohibido":
- "dos personas juntas en el encuadre, parejas, familias, gestor+cliente, cualquier interacción entre dos personas".
- "escenas tipo consulta profesional con dos personas frente a una pantalla".

### 3. Regenerar las portadas afectadas
Los 7 posts de 20-22 jul con este cliché (los del screenshot y los adyacentes) — llamada a `regenerate-blog-hero` con la lista de slugs, coste ~0.135 cr × 7.

### Fuera de scope
No se toca el modelo (seguimos con Nano Banana 2 Lite + fallback a Nano Banana 2), no se toca el flujo del cron ni los timeouts. Solo cambian dos strings de prompt.

## Detalles técnicos

Archivos a editar:
- `supabase/functions/generate-daily-posts/index.ts` — `sceneFromLLM` (líneas ~630-640) y prompt de `generateAndUploadHero` (línea ~738).
- `supabase/functions/regenerate-blog-hero/index.ts` — mismas dos secciones (`sceneFromLLM` y `buildPrompt`).
- Llamada final: POST a `regenerate-blog-hero` con `{ slugs: [<7 slugs de 20-22 jul>] }`.
