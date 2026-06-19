# Verificación técnica SEO (lote grande)

Objetivo: auditar y corregir la base técnica de todo lo ya construido (money pages, hubs, 102 fichas, guías, comparativas, blog, localizaciones) antes de seguir creciendo en volumen.

## Diagnóstico inicial detectado

- **Sitemap desincronizado**: `public/sitemap.xml` tiene solo **88 URLs**, pero el generador (`scripts/generate-sitemap.ts`) ya cubre money pages + clusters + 102 entidades + guías + comparativas + localizaciones + blog. El archivo estático está obsoleto.
- **Sitemap no automatizado**: existe el script `sitemap` pero no hay hooks `predev`/`prebuild`, así que el XML no se regenera solo y vuelve a quedarse atrás en cada cambio.
- **Posible inconsistencia trailing-slash**: el sitemap emite URLs con barra final (`/empresas-de-recobro/kruk/`) mientras las rutas y canonicals probablemente van sin barra. Hay que unificar para no enviar señales contradictorias a Google.
- A favor: `Seo.tsx` está bien (canonical, OG, hreflang, robots, JSON-LD, noindex fuera del dominio canónico) y `robots.txt` es correcto.

## Fases

### 1. Sincronizar y automatizar el sitemap
- Regenerar `public/sitemap.xml` con el generador para reflejar las URLs reales (102 fichas + resto).
- Añadir hooks `predev` y `prebuild` en `package.json` para que el sitemap se regenere antes de cada dev y build.
- Verificar que el generador incluye TODO lo indexable: 3 hubs principales, 12 clusters satélite, money pages, fichas, guías, comparativas, localizaciones, blog, `/servicios`, `/ley-segunda-oportunidad/casos`. Excluir `/call/*`, legales si procede, y catch-all.

### 2. Unificar canonicals y trailing slash
- Decidir una convención (sin barra final, que es lo que usan las rutas de React Router) y aplicarla de forma consistente entre sitemap y `canonical`/`og:url`.
- Revisar que cada plantilla (`MoneyLanding`, `ClusterHub`, `EntityPage`, `GuiaPage`, `ComparativaPage`, blog, localización) pasa un `canonical` self-referente correcto.

### 3. Auditar metadatos únicos por plantilla
- Recorrer programáticamente todas las páginas y comprobar:
  - `title` < 60 caracteres y único.
  - `meta description` < 160 caracteres y única.
  - Un único H1 por página.
  - `Seo` presente en todas las rutas (sin páginas sin metadatos).
- Generar un informe de duplicados/longitudes fuera de rango y corregir los casos detectados.

### 4. Validar datos estructurados (JSON-LD)
- Confirmar que cada tipo de página emite el schema adecuado: `Organization`/`WebSite` sitewide, `FAQPage` donde hay FAQ, `BreadcrumbList` en páginas internas, `Article` en blog.
- Detectar y corregir schemas faltantes o mal formados.

### 5. Auditar enlazado interno (anti-canibalización)
- Verificar el enlazado vertical (hub → cluster → ficha) y horizontal (entre clusters relacionados) definido en la arquitectura.
- Detectar páginas huérfanas (sin enlaces entrantes internos) y enlaces rotos a rutas inexistentes.

### 6. Informe y QA final
- Entregar un informe `.md` en `/mnt/documents` con: cobertura de sitemap, issues de metadatos detectados/corregidos, estado de JSON-LD y mapa de enlazado interno.
- Verificar que el proyecto compila y que una muestra de páginas (1 money, 1 hub, 1 ficha, 1 guía, 1 comparativa) renderiza con metadatos correctos.

## Detalles técnicos
- Archivos clave: `scripts/generate-sitemap.ts`, `package.json`, `public/sitemap.xml`, `src/components/seo/Seo.tsx`, `src/lib/seo/config.ts`, plantillas en `src/pages/seo/*`, datos en `src/data/seo/*`.
- La auditoría de metadatos/enlazado se hará con un script de Node que importa los registros de datos y reporta longitudes, duplicados y huérfanos, sin tocar lógica de negocio.
- No se añade `og:image` salvo que lo pidas (un placeholder previsualiza peor que nada).
