## Objetivo

Activar las dos plantillas que faltan de la arquitectura SEO —`comparativa` y `guia`— creando páginas reales con datos, rutas, contenido e interlinking. Hoy ambos templates solo existen como esqueleto en `SeoPageScaffold`; no hay registros, rutas ni páginas, así que sus URLs caen en NotFound.

Set inicial de alto valor (evergreen, sin canibalizar el blog ni las money pages):

Comparativas (intención "X o Y / diferencias"):
- `/reunificacion-deudas/reunificar-o-cancelar` — Reunificar vs cancelar deudas
- `/ley-segunda-oportunidad/segunda-oportunidad-vs-concurso` — Ley de Segunda Oportunidad vs concurso de acreedores
- `/cancelar-deudas/acuerdo-de-pago-vs-cancelacion` — Negociar un acuerdo vs cancelar la deuda

Guías (educación financiera evergreen, en el cluster `/guias`):
- `/guias/como-hacer-un-presupuesto` — Cómo hacer un presupuesto familiar
- `/guias/que-es-la-tae` — Qué es la TAE y por qué importa
- `/guias/fondo-de-emergencia` — Fondo de emergencia: cuánto ahorrar
- `/guias/alternativas-a-los-microcreditos` — Alternativas a los microcréditos

Estos temas no solapan con los posts de blog existentes (salir de ASNEF, requisitos de cancelar deudas, embargos, vida después de la deuda, renegociar acreedores, autónomos, guía LSO).

## Cómo se hace

1. **Registros de datos**: `src/data/seo/comparativas.ts` y `src/data/seo/guias.ts`, con tipos `{ slug, cluster, path, h1, seoTitle, metaDescription }`, más helpers `getComparativa`/`getGuia` y arrays para generar rutas y sitemap (igual patrón que `moneyPages`/`entities`).

2. **Registros de contenido**: `src/data/seo/content/comparativaContent.tsx` y `guiaContent.tsx`, con `intro`, `sections` (`body: ReactNode`) y `faq` (`a` + `plain` para JSON-LD), mismo patrón que hubs/entidades.
   - Las comparativas incluyen una **tabla** (pros/contras, cuándo conviene cada opción) renderizada en el `body` de una sección, más recomendación final.
   - Las guías siguen el esquema del template `guia`: respuesta clara, ejemplos prácticos, contenido relacionado y FAQ.

3. **Páginas**: `src/pages/seo/ComparativaPage.tsx` y `GuiaPage.tsx`, usando `SeoPageScaffold` con `template="comparativa"` y `"guia"`, breadcrumbs, `buildBreadcrumb` + `buildLegalService` + `buildFaq`, e interlinking a su money page/hub relevante. CTAs a `#hero-form`.

4. **Rutas** en `src/App.tsx`: generar `<Route>` explícitos desde ambos registros, colocados **encima** de `/:cluster/:slug` para que no los capture `EntityPage`.

5. **Sitemap**: añadir las entradas de comparativas y guías en `scripts/generate-sitemap.ts` y regenerar `public/sitemap.xml`.

6. **Interlinking**: enlazar las nuevas páginas desde los hubs y money pages relacionados (p. ej. el hub `/guias` lista sus guías; `/reunificacion-deudas` enlaza la comparativa). El enlazado "related" de `ClusterHub` ya recoge money pages y entidades; se ampliará para incluir comparativas/guías del cluster.

## Anti-canibalización

- Comparativa = decisión entre opciones (no compite con la money page transaccional, enlaza a ella como solución).
- Guía = referencia evergreen de educación financiera (distinta del blog narrativo y de las money pages).

## Detalle técnico

- Archivos nuevos: 2 registros de datos, 2 de contenido, 2 páginas. Editar: `src/App.tsx`, `src/pages/seo/ClusterHub.tsx` (related), `scripts/generate-sitemap.ts`, `public/sitemap.xml`.
- Sin colores hardcodeados; plantilla editorial `SeoPageScaffold`.
- Verificación: `tsc` + preview de 1 comparativa y 1 guía (tabla, FAQ, enlaces) en móvil y escritorio; comprobar que las rutas resuelven y no caen en NotFound.

¿Procedo con este set inicial (3 comparativas + 4 guías)?
