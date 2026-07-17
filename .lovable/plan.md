## Objetivo
Seguir refrescando las hero images del blog con el estilo "foto de móvil realista + escena ligada al título", pero bajando el coste por imagen para que no se acerque a 1 crédito.

## De dónde viene el coste actual
Cada regeneración hace hoy 2 llamadas a AI Gateway:
1. `google/gemini-2.5-flash` para extraer la escena del título (`describeSceneFromTitle`).
2. `google/gemini-2.5-flash-image-preview` (Nano Banana) para generar la imagen 1200px.

La llamada de texto + un modelo de imagen "preview" es la parte cara. Vamos a recortar ambas.

## Cambios

### 1. Eliminar la llamada LLM de escena
Sustituir `describeSceneFromTitle` por un derivador local determinista basado en el título + `keywords`/`category` del post:
- Diccionario de disparadores (regex) → escena literal en español, p. ej.:
  - "carta|burofax|requerimiento" → "manos sosteniendo una carta certificada con logo bancario, sobre mesa de cocina"
  - "juzgado|demanda|sentencia" → "pasillo de juzgado español, persona esperando en un banco de madera con carpeta"
  - "nómina|embargo" → "recibo de nómina impreso sobre mesa, con marcas de bolígrafo"
  - "hipoteca|vivienda|piso" → "portal de bloque de viviendas español visto desde la acera"
  - "tarjeta revolving|usura" → "tarjeta de crédito y extracto bancario en primer plano sobre mesa"
  - "reunificar|refinanciar|cuota" → "persona revisando varios recibos en la mesa del salón"
  - default → escena neutra basada en `subject` aleatorio + objeto genérico (carpeta/documento).
- Se combina con los pools existentes (`light`, `lens`, `mood`, `subject`) para variedad, pero el "qué se ve" sale del título sin coste de IA.

Esto elimina 100% del coste de texto por imagen.

### 2. Modelo de imagen más barato
Cambiar el modelo por defecto a `google/gemini-3.1-flash-lite-image` (Nano Banana 2 Lite, el más económico del catálogo Gemini image) manteniendo la misma llamada al endpoint `/v1/images/generations`. Se ajusta el body a la forma Vertex `generateContent` que este modelo requiere (`contents` + `generationConfig.responseModalities: ["TEXT","IMAGE"]`), no la de chat.

Fallback: si devuelve error, reintentar 1 vez con `google/gemini-2.5-flash-image` (el actual). Sin más reintentos para no inflar coste.

### 3. Ahorros menores
- Bajar `optimize()` a máx. 1000px de ancho y `quality: 78` en JPEG (hoy 1200/82). Diferencia visual imperceptible en tarjetas de blog, menos bytes en storage/CDN.
- Prompt algo más corto (quitar frases redundantes de "no HDR / no filtro / no golden hour" duplicadas — dejar una sola línea de prohibiciones).

### 4. Aplicar a los posts pendientes
- Desplegar los cambios en `generate-daily-posts/index.ts` y `regenerate-blog-hero/index.ts`.
- Ejecutar `regenerate-blog-hero` en lotes de 5, avanzando por los posts publicados más antiguos que aún tengan el estilo viejo (excluyendo los 4 ya refrescados). Parar tras cada lote para revisar resultado y coste antes de seguir.

## Detalles técnicos
- Ficheros a tocar: `supabase/functions/generate-daily-posts/index.ts`, `supabase/functions/regenerate-blog-hero/index.ts`.
- Nuevo helper compartido `sceneFromTitle(title, keywords)` inline en ambos (mismos diccionarios).
- El body para `gemini-3.1-flash-lite-image` sigue exactamente la forma documentada en `ai-image-generation` (Vertex `generateContent`, no chat).
- No se toca frontend, ni tipos, ni migraciones.

## Fuera de alcance
- Cambiar el cron de posts diarios o el número objetivo.
- Rediseñar las tarjetas del blog.
- Añadir alt-text nuevo (se reutiliza el existente).
