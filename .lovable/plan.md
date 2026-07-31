## Respuesta corta

No. La home ya va fina (LCP 0,87 s), pero **/blog y cada /blog/:slug no**. Medido ahora mismo contra la base de datos:

- Cada visita a un artículo descarga **los 136 posts completos con todo su HTML**: 987 KB comprimidos / 2,5 MB sin comprimir. Y lo hace dos veces de origen (una consulta para el post, otra para "todos") .
- El listado `/blog` hace exactamente la misma consulta gigante, solo para pintar título, extracto e imagen.
- La imagen hero del artículo (`<img src={post.heroImage}>`) va **sin `width`/`height`, sin `fetchPriority`, sin decodificación prioritaria** → es el LCP y además provoca layout shift.
- Cada hero pesa **130–190 KB en JPEG** servido desde storage sin variantes WebP/AVIF ni redimensionado.

## Qué haría

### 1. Partir la consulta en dos (el mayor impacto, ~95 % menos datos)
- Nueva función `fetchGeneratedPostsIndex()` que selecciona solo campos de listado: `slug, category, title, excerpt, read_time, authors, hero_image, hero_alt, published_at`. Medido: **84 KB en crudo (~15 KB gzip) frente a 987 KB**.
- `/blog` y los bloques de "relacionados"/enlazado interno de `BlogPost` pasan a usar el índice ligero.
- `fetchGeneratedPostBySlug` (contenido completo) se queda solo para el artículo abierto.
- Mantener `staleTime` alto y `gcTime` para que navegar entre artículos no repita la consulta.

### 2. Imagen hero del artículo
- Añadir `width={1200} height={675}`, `fetchPriority="high"`, `decoding="async"`, sin `loading="lazy"` (es el LCP).
- Contenedor con `aspect-[16/9]` reservado para CLS 0.
- Servir la variante optimizada del transformador de imágenes del storage (`?width=1200&quality=72&format=origin` → WebP automático cuando el navegador lo acepta). Pasa de ~160 KB a ~45–60 KB.
- En el listado, pedir la miniatura a **`width=480`** en lugar del original de 1200 px: hoy `/blog` puede llegar a bajar decenas de MB si el usuario hace scroll.

### 3. Listado `/blog`
- Paginar o "cargar más" a partir de 24 tarjetas (hoy se renderizan las 136 de golpe, con 136 `<img>` y 136 nodos de tarjeta).
- `width`/`height` en las miniaturas de tarjeta y de artículos relacionados.

### 4. Verificación
- Medir con Playwright `/blog` y un artículo antes/después: bytes transferidos, LCP, CLS y número de peticiones.

## Detalle técnico

Archivos a tocar:
- `src/data/blog/dbPosts.ts` — nueva consulta de índice + helper `storageImage(url, width)` que añade parámetros de transformación solo a URLs de storage (las imágenes locales importadas se dejan igual).
- `src/pages/BlogPost.tsx` — hero LCP, uso del índice ligero para relacionados.
- `src/pages/Blog.tsx` — índice ligero, miniaturas 480 px, paginación.

Sin cambios de contenido, de SEO ni del pipeline de generación: solo entrega.

Estimación: ~130 KB gzip menos por artículo, LCP del blog previsiblemente por debajo de 1,5 s en móvil y CLS 0.
