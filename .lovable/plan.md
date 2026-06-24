# Objetivo: meter todo el catálogo en el índice de Google

Diagnóstico confirmado vía Google Search Console:
- Search Console verificado ✅, sitemap enviado ✅, **home indexada** ✅.
- **Resto de páginas: "URL desconocida para Google"** (ni rastreadas ni indexadas).
- Solo apareces para búsquedas de marca. Cero keywords no-marca.

El cuello de botella NO es producir más contenido: es que Google solo conoce 1 de tus ~200 páginas. Este plan ataca eso.

## 1. Auditar y reforzar el sitemap

- Verificar que `public/sitemap.xml` lista las ~214 URLs reales (en vivo se leen ~200; cuadrar la diferencia).
- Añadir `<lastmod>` real y `<priority>` coherente a cada URL (las páginas dinámicas deben llevar fecha para que Google priorice rastreo).
- Confirmar que el sitemap de blog (`sitemap-blog` edge function) devuelve todas las URLs de posts y está bien formado.
- Reenviar ambos sitemaps a Search Console vía API tras los cambios.

## 2. Maximizar la descubribilidad de enlaces internos (clave en una SPA)

Google descubre páginas siguiendo enlaces, no solo el sitemap. En una SPA React esto es crítico:

- Asegurar que desde la **home y el footer** haya enlaces `<a href>` reales (no solo `onClick`) hacia los hubs principales: Ley Segunda Oportunidad, blog, reunificación, y los índices de ciudades/entidades.
- Crear/verificar **páginas índice rastreables** que enlacen a las 200+ páginas hijas (ej. `/abogados-segunda-oportunidad` listando todas las ciudades, índice de entidades), para que Googlebot las alcance en 1-2 saltos desde la home.
- Revisar que los enlaces internos existentes usen `<Link>`/`<a href>` que renderizan a `<a>` con href crawleable.

## 3. Forzar indexación de las páginas prioritarias

- Usar la inspección de URL de Search Console para comprobar el estado de un lote de páginas clave (money pages + top ciudades).
- Entregarte la lista exacta de URLs prioritarias para que pulses **"Solicitar indexación"** en Search Console (la API de indexación no está disponible por el gateway; este paso es manual pero rapidísimo para 10-15 URLs top).

## 4. Verificar render para Googlebot

- Confirmar que las money pages devuelven `<title>`, meta description y contenido en el HTML renderizado (react-helmet-async es client-side: validar que Googlebot, que sí ejecuta JS, ve el contenido correcto).
- Comprobar que cada página tiene canonical auto-referente y JSON-LD válido (ya implementado en fases previas; revalidar en 3-4 páginas).

## 5. Medición

- Dejar establecida una comprobación periódica (vía Search Console API) de:
  - nº de páginas indexadas (objetivo: pasar de 1 hacia las 200),
  - primeras impresiones de keywords no-marca.
- Repetir inspección en 1-2 semanas para confirmar que el rastreo avanza.

## Expectativa realista

- Indexación del grueso del catálogo: días a pocas semanas tras estos cambios.
- Primeras impresiones no-marca: 2-6 semanas.
- Rankings competitivos (LSO, reunificación): meses, a medida que el dominio gana autoridad.

---

### Detalles técnicos
- Archivos probables a tocar: `scripts/` o generador de `public/sitemap.xml`, `supabase/functions/sitemap-blog/index.ts`, componentes de footer/home e índices de ciudades/entidades (`src/pages/seo/*`, `src/data/seo/*`).
- Sin cambios de lógica de negocio: solo SEO técnico (sitemap, enlazado interno, validación de render).
- Búsquedas de marca actuales: posición ~3.4 — conviene también reforzar la consistencia de marca para captar esas navegacionales.
