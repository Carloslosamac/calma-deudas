# Sección "Casos de éxito" tipo noticia

Crear una sección independiente del blog donde cada caso de éxito real (a partir de los testimonios existentes) se cuenta como una noticia única, cercana y atrapante. Esta entrega deja la estructura lista + 1 caso completo como modelo, para luego mantener el ritmo de 1-2/día simplemente añadiendo objetos de datos.

## Qué se construye

```text
/casos-de-exito            -> índice (listado de casos, tipo portada de noticias)
/casos-de-exito/:slug      -> caso individual (artículo tipo noticia)
```

1. **Modelo de datos** `src/data/casos/types.ts` + `src/data/casos/index.ts`
   - Tipo `CasoExito`: `slug`, `category` (LSO, ASNEF, Revolving, Reunificación…), `name`, `location`, `debtAmount`, `solution`, `headline` (titular noticia), `dek` (entradilla), `date`, `readTime`, `heroImage`, `heroAlt`, `sections[]` (narrativa con módulos), `keywords`, `seoTitle`, `metaDescription`, `faq`.
   - Helpers `getCasoBySlug` y array ordenado por fecha (igual patrón que `blog/index.ts`).

2. **Página índice** `src/pages/CasosExito.tsx`
   - Hero corto + grid de tarjetas (titular, lugar, importe cancelado, categoría, foto).
   - Diseño coherente con la marca Calma (sin gradientes en CTAs). CTA → `#hero-form`.
   - `FormSection` + `Footer`. SEO con `Seo` + BreadcrumbList JSON-LD.

3. **Página de caso** `src/pages/CasoExitoPost.tsx`
   - Reutiliza los módulos existentes (`ProcessTimeline`, `BeforeAfterSplit`, `MythVsReality`, `DocumentsChecklist`, `InlineCTA`, `ReadingProgressBar`).
   - Estructura tipo noticia: titular grande + entradilla + ficha del caso (importe, lugar, solución) + cuerpo narrativo en secciones + FAQ + CTA final.
   - Respeta reglas de blog: nunca mezclar imagen y diagrama bajo el mismo H2; copy largo y SEO.
   - JSON-LD `NewsArticle` + `BreadcrumbList`. Title <60 y meta <160 optimizados para CTR (sin "| Calma").

4. **Rutas** en `src/App.tsx`: `/casos-de-exito` y `/casos-de-exito/:slug`.

5. **Enlace de acceso**: añadir entrada a "Casos de éxito" en el `Footer` para que la sección sea descubrible.

6. **Primer caso (modelo)** `src/data/casos/posts/noemi-barcelona-48310.tsx`
   - Basado en el testimonio existente: Noemí V., Barcelona, 48.310 €, Ley de Segunda Oportunidad (foto `assets/testimonios/lso-1.jpg`).
   - Redacción **narrativa realista**: contexto humano plausible, manteniendo cifras reales sin inventar estadísticas agregadas de Calma. Tono de reportaje cercano y atrapante.
   - Secciones: el punto de quiebre → cómo era el día a día con la deuda → la decisión de pedir ayuda → el proceso paso a paso (timeline) → antes/después → mitos que la frenaban → vida hoy + CTA.

## Notas técnicas

- Se crea un modelo `CasoExito` separado (no se reutiliza `BlogPost`) para tener campos propios de ficha (importe, lugar, solución) y schema `NewsArticle`.
- Imágenes: se usan las de `src/assets/testimonios/` ya disponibles.
- Todos los CTA hacen scroll a `#hero-form` (regla de proyecto), sin gradientes.
- La página de caso valida slug y muestra `NotFound`/redirección si no existe.
- Para mantener el ritmo 1-2/día: cada caso nuevo = un archivo en `src/data/casos/posts/` + registro en `index.ts`. Sin tocar componentes.

## Pendiente de tu lado para los siguientes

Cuando quieras los próximos casos, solo dime cuáles de los testimonios existentes priorizar (o pásame nuevos) y los voy generando 1-2/día con esta misma plantilla.