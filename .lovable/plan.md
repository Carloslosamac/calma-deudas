## Diagnóstico (móvil, /blog/guia-ley-segunda-oportunidad)

76 de rendimiento con TBT 10 ms y CLS 0: no es JavaScript pesado ni saltos de layout, es **tiempo hasta pintar** (FCP 3,2 s / LCP 4,1 s / Speed Index 5,9 s). Tres causas confirmadas en el código:

1. **Hero sin versión móvil.** En los posts estáticos (como esta guía) `heroImage` es un JPEG importado por Vite (`blog-guia-segunda-oportunidad.jpg`, ~158 KB) que se sirve tal cual: `optimizedImage()` en `dbPosts.ts` solo transforma URLs de storage, así que a los posts estáticos no les aplica nada. En una pantalla móvil de 390 px se descarga la imagen completa en JPEG, sin WebP/AVIF ni `srcset`.
2. **Cadena de arranque en serie.** `/blog/:slug` es una ruta `lazy()`: el navegador descarga `index.html` → bundle principal → chunk de la ruta → módulo del post → recién entonces conoce la URL del hero y lo pide. En 4G móvil eso son 3-4 saltos antes de empezar a descargar el LCP.
3. **Tipografía.** Poppins se autohospeda por `@font-face` sin preload; en móvil el descubrimiento tardío de la fuente retrasa el pintado del H1 (que es parte de lo que mide el Speed Index).

## Qué haré

**Imagen hero (el mayor impacto sobre LCP)**
- Generar variantes responsive de las imágenes hero locales con `vite-imagetools` (ya instalado): AVIF + WebP en anchos 480/768/1200 y usar `<picture>` con `srcset`/`sizes` en el hero del artículo.
- Para los posts generados (storage), añadir `srcset` con el transformador ya existente (`optimizedImage(src, 480/768/1200)`) en lugar de un único 1200.
- Crear un componente compartido `BlogHeroImage` para no duplicar esta lógica entre `BlogPost.tsx`, `Blog.tsx` y `CasoExitoPost.tsx`.
- Bajar el hero de ~158 KB a ~25-40 KB en móvil.

**Arranque más corto**
- Preconnect al dominio de storage de imágenes en `index.html` para que las imágenes de posts generados no paguen el handshake TLS al final de la cadena.
- Precargar el chunk de la ruta de artículo con `modulepreload` cuando el HTML es de `/blog/...` no es posible sin SSR; en su lugar, prefetch del chunk `BlogPost` desde el listado `/blog` (hover/idle) para las navegaciones internas, y reducir el peso del chunk del artículo sacando del bundle las miniaturas de "Sigue explorando".
- Diferir el bloque de posts relacionados y el CTA de compartir por debajo del pliegue (carga tras el primer pintado) para que el Speed Index no espere a ellos.

**Tipografía**
- Preload de los dos `woff2` de Poppins realmente usados por encima del pliegue (400 y 600) con `font-display: swap` ya presente, solo en el `<head>`.

## Detalles técnicos

- `src/components/blog/BlogHeroImage.tsx` (nuevo): recibe `src`, `alt`, `priority`; si la URL es de storage genera `srcset` con `optimizedImage`; si es un import local usa las variantes de imagetools; siempre con `width`/`height`, `fetchPriority="high"` y `decoding="async"` para mantener CLS en 0.
- `src/data/blog/dbPosts.ts`: añadir `imageSrcSet(src)` junto a `optimizedImage`.
- `src/pages/BlogPost.tsx`: usar el nuevo componente; envolver relacionados/recursos en carga diferida.
- `index.html`: `preconnect` a storage + preload de las dos fuentes.
- No toco contenido, SEO ni estructura de datos.

## Verificación

Auditoría Lighthouse móvil en local (Playwright + throttling) sobre `/blog/guia-ley-segunda-oportunidad` antes y después, comparando FCP, LCP y Speed Index. El número real de PageSpeed solo se actualizará tras publicar.
