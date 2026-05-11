
# Plan SEO de Calma — base técnica al nivel del mejor del sector legal

Objetivo: dejar todo el cimiento SEO listo para que cada página actual y futura ya nazca optimizada. **No tocamos copy de posts ni creamos contenido nuevo en este plan.**

---

## 1. Auditoría del estado actual (resumen rápido)

- `index.html` con título, descripción y OG genéricos y estáticos para toda la web.
- Sin metadatos por ruta: `/blog`, `/blog/:slug`, `/politica-de-privacidad`, `/terminos-y-condiciones`, `/call/*` comparten el mismo `<title>`.
- `author` = "Base44" (incorrecto), `twitter:site` = "@calma" (placeholder), `og:image` apunta a `lovable.dev`, favicon a Google Storage.
- Sin `canonical`, sin `hreflang`, sin JSON-LD, sin `sitemap.xml`.
- `robots.txt` no referencia sitemap.
- `BlogPost` no tiene campos SEO (seoTitle, metaDescription, ogImage, publishedAt, updatedAt, faqSchema).
- Páginas `/call/*` deberían ser `noindex` (son redirecciones de tracking).

---

## 2. Capa de metadatos dinámicos por ruta

### 2.1 Instalar y configurar `react-helmet-async`

- Dependencia ligera y compatible con SSR/SPA.
- Envolver `App` en `<HelmetProvider>`.

### 2.2 Crear `src/components/seo/Seo.tsx`

Componente único, reutilizable, que recibe:
```
title, description, canonical, ogImage, ogType,
keywords?, robots?, publishedAt?, updatedAt?,
author?, structuredData? (array de objetos JSON-LD)
```
Y emite:
- `<title>` con sufijo " | Calma" controlable.
- `meta description`, `meta keywords` (opcional).
- `link rel=canonical` (absoluta, basada en `https://mi-calma.es`).
- `meta robots` (default `index,follow`, `noindex,nofollow` para `/call/*` y 404).
- Open Graph completo: `og:title`, `og:description`, `og:url`, `og:image` (1200×630), `og:image:width/height`, `og:type`, `og:locale=es_ES`, `og:site_name=Calma`.
- Twitter Cards: `summary_large_image`, `twitter:title/description/image`, `twitter:site/creator` (definitivos, no placeholder).
- `<script type="application/ld+json">` por cada objeto pasado en `structuredData`.

### 2.3 Aplicar `<Seo>` por página

| Ruta | title | description | robots | Schema JSON-LD |
|---|---|---|---|---|
| `/` | "Calma — Cancela tus deudas con la Ley de Segunda Oportunidad" | propuesta de valor + CTA | index,follow | `Organization`, `WebSite` (con `SearchAction`), `LegalService`, `FAQPage` (preguntas del home), `BreadcrumbList` |
| `/blog` | "Blog de la Ley de Segunda Oportunidad — Calma" | hub editorial | index,follow | `Blog`, `BreadcrumbList`, `ItemList` de los artículos |
| `/blog/:slug` | `post.seoTitle ?? post.title` | `post.metaDescription ?? post.excerpt` | index,follow | `Article` (o `BlogPosting`) con `author`, `datePublished`, `dateModified`, `image`, `mainEntityOfPage`, `publisher`; `BreadcrumbList`; `FAQPage` si el post tiene FAQ; `HowTo` para los guías paso a paso |
| `/politica-de-privacidad` | "Política de privacidad — Calma" | resumen | index,follow | `BreadcrumbList` |
| `/terminos-y-condiciones` | "Términos y condiciones — Calma" | resumen | index,follow | `BreadcrumbList` |
| `/call/*` | "Redirigiendo… — Calma" | corta | **noindex,nofollow** | — |
| 404 (`NotFound`) | "Página no encontrada — Calma" | — | **noindex,follow** | — |

---

## 3. Limpieza y refuerzo de `index.html`

- Corregir `author` → `Calma`.
- `twitter:site` y `twitter:creator` → cuenta real (placeholder a definir).
- `og:image` y `twitter:image` → asset propio en `public/og/og-default.jpg` (1200×630).
- Favicon completo en `public/`: `favicon.ico`, `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` (180×180), `site.webmanifest`.
- `<link rel="canonical">` por defecto al home (lo sobreescribe `<Seo>`).
- `<meta name="theme-color">` con el verde de marca.
- `<html lang="es">` ya está; añadir `prefers-color-scheme` opcional.
- Preconnect a `fonts.googleapis.com` y `fonts.gstatic.com` (`crossorigin`).
- `<meta name="format-detection" content="telephone=no">` para evitar interferir con CTAs.
- Eliminar fuentes no usadas; mantener solo los pesos que el diseño consume.

---

## 4. Datos estructurados (JSON-LD) reutilizables

Crear `src/lib/seo/structuredData.ts` con builders tipados:

- `buildOrganization()` — nombre, logo, sameAs (LinkedIn/Instagram cuando existan), `contactPoint` con teléfono y email.
- `buildLegalService()` — `areaServed: ES`, `serviceType: "Ley de Segunda Oportunidad"`, `priceRange`, `aggregateRating` (cuando haya reseñas reales).
- `buildWebSite()` — con `potentialAction` de búsqueda apuntando a `/blog?q={search_term_string}`.
- `buildBreadcrumb(items)`.
- `buildArticle(post)` — usa los campos nuevos del tipo `BlogPost`.
- `buildFaq(items)`.
- `buildHowTo(steps)`.

---

## 5. Ampliar el tipo `BlogPost` (sin tocar contenido existente)

Añadir campos opcionales en `src/data/blog/types.ts`:
```
seoTitle?: string;
metaDescription?: string;
ogImage?: string;
publishedAt?: string;       // ISO
updatedAt?: string;         // ISO
canonicalUrl?: string;      // si el post se publica también fuera
faq?: { question: string; answer: string }[];
howToSteps?: { name: string; text: string }[];
noindex?: boolean;
```
Estos campos quedan **opcionales**: los posts actuales siguen funcionando.

---

## 6. Sitemap y robots

### 6.1 `public/sitemap.xml` (estático, generado una vez)

Incluir:
- `/`, `/blog`, `/politica-de-privacidad`, `/terminos-y-condiciones`.
- Cada `/blog/<slug>` existente con `lastmod`, `changefreq=monthly`, `priority` razonable (0.9 home, 0.8 guía pilar, 0.7 resto).
- Excluir `/call/*` y `/404`.

### 6.2 Script `scripts/generate-sitemap.ts`

- Lee los posts del directorio `src/data/blog/posts/` y regenera `public/sitemap.xml`.
- Se ejecuta manualmente o como `prebuild`.
- Así, al añadir un post nuevo, el sitemap se mantiene solo.

### 6.3 `public/robots.txt`

Añadir:
```
Sitemap: https://mi-calma.es/sitemap.xml
Disallow: /call/
```

---

## 7. Canonical, dominio y hosting

- Definir `https://mi-calma.es` como dominio canónico (custom domain ya configurado).
- Constante única `SITE_URL` en `src/lib/seo/config.ts` usada por `<Seo>` y el sitemap.
- Forzar canonicals absolutos hacia `mi-calma.es` para evitar duplicado con el subdominio `*.lovable.app`.
- Asegurar que la versión Lovable publicada use `noindex` (revisar `publish_settings` o añadir `<meta name="robots" content="noindex">` cuando `window.location.hostname` no sea `mi-calma.es`).

---

## 8. Accesibilidad y semántica (señales SEO)

Revisión sistemática, sin reescribir contenido:
- Un solo `<h1>` por página.
- Jerarquía `h2`/`h3` correcta en el blog.
- `alt` real en todas las imágenes (auditar `src/assets/`).
- `aria-label` en CTAs icónicos.
- `loading="lazy"` + `decoding="async"` en imágenes no críticas; `fetchpriority="high"` en hero.
- Enlaces externos con `rel="noopener"` (ya hay `ExtLink`, verificar).

---

## 9. Performance (Core Web Vitals)

- Convertir hero a `<picture>` con AVIF/WebP y `width/height` explícitos para evitar CLS.
- `font-display: swap` en Poppins (ya viene con `&display=swap`, confirmar).
- Self-host opcional de Poppins (mejora LCP).
- Auditar bundles con `vite build --report` y dividir por `React.lazy` las rutas `/call/*` y `/blog/:slug`.
- Eliminar imports no usados detectados por ESLint.
- Comprimir imágenes de `src/assets/` a WebP donde aún no estén.

---

## 10. Internacionalización (preparada, no activada)

- Añadir `<link rel="alternate" hreflang="es-ES" href="...">` y `hreflang="x-default"` apuntando al canonical.
- Dejar `<Seo locale="es_ES">` parametrizable para futuros idiomas (catalán, portugués) sin refactor.

---

## 11. Analytics / Search Console (preparación)

Sin instalar nada todavía, dejar lista la integración:
- Variable de entorno `VITE_GSC_VERIFICATION` que, si existe, inyecta `<meta name="google-site-verification">`.
- Variable `VITE_GA4_ID` que, si existe, monta GA4 vía `<script>` con `defer`.
- Variable `VITE_AHREFS_VERIFICATION` para Ahrefs Webmaster Tools.
- Documentar en `README.md` cómo añadirlas en Lovable (Secrets / env).

---

## 12. Entregables del plan

Archivos nuevos:
```
src/components/seo/Seo.tsx
src/lib/seo/config.ts
src/lib/seo/structuredData.ts
src/lib/seo/pageMeta.ts        // metadatos por ruta estática (home, blog, legal)
scripts/generate-sitemap.ts
public/sitemap.xml
public/og/og-default.jpg       // placeholder hasta tener arte final
public/favicon-32.png
public/favicon-192.png
public/apple-touch-icon.png
public/site.webmanifest
```

Archivos modificados:
```
index.html                      // limpieza meta, OG, favicon, preconnect
public/robots.txt               // sitemap + disallow /call/
src/App.tsx                     // HelmetProvider
src/pages/Index.tsx             // <Seo> + JSON-LD
src/pages/Blog.tsx              // <Seo> + JSON-LD ItemList
src/pages/BlogPost.tsx          // <Seo> dinámico + Article/FAQ/HowTo
src/pages/PrivacyPolicy.tsx     // <Seo>
src/pages/TermsAndConditions.tsx// <Seo>
src/pages/NotFound.tsx          // <Seo> noindex
src/pages/CallRedirect*.tsx     // <Seo> noindex,nofollow
src/data/blog/types.ts          // campos SEO opcionales
package.json                    // react-helmet-async
```

**No tocamos**: el contenido editorial de los posts existentes ni se crean posts nuevos.

---

## 13. Validación posterior

Al terminar la implementación correremos:
- `view-source:` de cada ruta para verificar título/canonical/OG/JSON-LD únicos.
- Validador de Schema.org (rich results) sobre `/`, `/blog`, `/blog/guia-ley-segunda-oportunidad`.
- Lighthouse SEO ≥ 100 y Best Practices ≥ 95 en home y guía pilar.
- Comprobar `sitemap.xml` y `robots.txt` accesibles en `mi-calma.es`.

---

## 14. Antes de implementar — decisiones pendientes

Cuando aceptes el plan, en la fase de build te preguntaré por:
1. Handles reales para `twitter:site` y `twitter:creator`, y `sameAs` (LinkedIn/Instagram/etc.).
2. Si quieres que el subdominio `*.lovable.app` lleve `noindex` automático.
3. Si activamos ya GA4 + Search Console (con sus IDs) o lo dejamos solo preparado.
4. Si confirmas `https://mi-calma.es` como canonical único (vs `calma-deudas.lovable.app`).
