## Estado actual

Ya hecho en la ronda anterior: imágenes de 160 MB → 23 MB, WebP/AVIF con imagetools, `width`/`height`, `loading="lazy"` y `fetchPriority`. Eso aún **no se refleja en PageSpeed** porque el informe mide mi-calma.es y hay que publicar.

Lo que queda pendiente, verificado en el código:

1. **`src/App.tsx` importa de forma eager `moneyPages`, `comparativas`, `guias` y `tools`** desde `src/data/seo` (1,1 MB de datos) solo para generar las rutas. Todo eso viaja en el bundle inicial de la home, aunque el visitante nunca entre en esas páginas. Es la mayor fuga de JS actual.
2. **Fuentes desde Google Fonts** (`fonts.googleapis.com`, Poppins 4 pesos): dos preconnect + dos round-trips de red en la ruta crítica y riesgo de FOUT/CLS.
3. **La imagen LCP de la home no se precarga** en `index.html`.
4. Componentes de la home (`Pricing`, `Testimonials`, `Footer`, badges) se montan todos en el primer render aunque estén muy por debajo del pliegue.

## Cambios propuestos

### 1. Sacar los datos SEO del bundle inicial
- Crear un módulo ligero con solo los `slug` necesarios para declarar rutas (o pasar a rutas paramétricas tipo `/:slug` resueltas dentro de cada página lazy).
- Cada página SEO (`MoneyLanding`, `ComparativaPage`, `GuiaPage`, `ToolPage`, `ClusterHub`) importa su propio dataset dentro del chunk lazy.
- Impacto esperado: varios cientos de KB menos de JS inicial y menos tiempo de parse/execute (TBT).

### 2. Auto-hospedar Poppins
- Descargar los subsets latin de Poppins (400/500/600/700) en `woff2`, servirlos como asset y declarar `@font-face` con `font-display: swap` y `size-adjust` para evitar salto de layout.
- Quitar los `preconnect` y el `link` a Google Fonts de `index.html`; añadir `preload` del peso usado en el título del hero.
- Elimina 2 conexiones externas de la ruta crítica.

### 3. Precargar la imagen LCP
- Identificar la imagen del hero de la home y añadir `<link rel="preload" as="image" fetchpriority="high">` con la variante WebP en `index.html` (solo un candidato LCP).

### 4. Diferir el contenido bajo el pliegue
- `React.lazy` + `Suspense` con reserva de altura para `TestimonialsSection`, `PricingSection`, `TrustBadges` y `Footer` en la home, para que no bloqueen el primer render.
- Reservar altura explícita en cada bloque diferido para no introducir CLS.

### 5. Verificación
- Build de producción y medición del tamaño real de los chunks (antes/después).
- Playwright en el preview: peso total de la home, LCP y CLS con throttling móvil.
- Reporte con las cifras y, a partir de ahí, publicar y relanzar PageSpeed sobre mi-calma.es.

## Notas técnicas

- No se toca el diseño ni el contenido; todo es carga y entrega.
- Las rutas SEO seguirán funcionando igual: cambia dónde se carga el dataset, no su contenido ni las URLs.
- Los datos de campo (CrUX) de PageSpeed tardan ~28 días en reflejar la mejora; los de laboratorio son inmediatos tras publicar.
