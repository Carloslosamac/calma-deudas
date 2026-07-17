## Por qué no cuadran los números

- **GSC**: 232 indexadas + 58 no indexadas = **290 URLs** conocidas por Google (incluye URLs históricas, redirecciones, parámetros, variantes fuera del sitemap actual).
- **/admin**: parte del `sitemap.xml` (**240 URLs**) y solo inspecciona **80 por ejecución** vía URL Inspection API. El resto queda "sin comprobar", así que los totales indexada/no indexada nunca se acercan a los de GSC hasta pasar varios días.
- Además, `/admin` usa `verdict === "PASS"` como "indexada"; GSC usa `coverageState` (más granular: "Indexada", "Duplicada canónica seleccionada por Google", "Excluida noindex", "Descubierta - actualmente sin indexar", "Rastreada - actualmente sin indexar", "Página con redirección"). Por eso una URL puede aparecer como "indexada" en GSC y "no indexada" (o al revés) en `/admin`.

## Qué haré (solo UI + edge function, sin cambios de datos)

### 1. Alinear la métrica con GSC

En `supabase/functions/gsc-index-status/index.ts`:

- Guardar también las URLs **conocidas por Google pero NO en el sitemap** (las descubro consultando la Index Coverage / listándolas desde `searchAnalytics` como fallback: URLs con impresiones en 90d que no estén en el sitemap).
- Nuevos campos en `seo_index_checks` (via migration): `discovered_outside_sitemap boolean`, `google_canonical text`, `user_canonical text`.
- Considerar "indexada" cuando `coverageState` empiece por `"Submitted and indexed"`, `"Indexed"` o `"Indexed, not submitted in sitemap"` (mapear como en GSC), en lugar de fiarnos solo del `verdict`.
- Subir el batch por defecto a **200** y añadir modo "full sweep" (paginado hasta cubrir todo el sitemap en una sola ejecución, respetando 2.000/día).

### 2. Nueva vista en `/admin/contenido/indexacion`

Rediseño ligero para que se lea como GSC:

- **Cabecera resumen** con las mismas 2 cifras que GSC:
  - Indexadas / No indexadas (total = suma).
  - Diferencia con GSC destacada: "Comprobadas X de Y del sitemap · Google conoce además Z URLs fuera del sitemap".
- **Desglose por motivo** (tipo tabla de GSC "¿Por qué hay páginas que no se indexan?"): agrupar las no indexadas por `coverage_state` con contador y expandible para ver URLs. Motivos típicos: `noindex`, `Duplicate without canonical`, `Page with redirect`, `Alternate page with canonical tag`, `Discovered - not indexed`, `Crawled - not indexed`.
- **Sección "Fuera del sitemap"**: URLs que Google conoce pero no están en `sitemap.xml` (para decidir si añadirlas o dejarlas 410/301).
- Mantengo el checklist manual y el buscador; solo cambia la parte superior y añado el desglose.

### 3. Aclarar en la UI qué mide cada tarjeta

Texto explícito bajo cada tarjeta:
- Manual: "Tu checklist de solicitudes en Search Console".
- Estado real: "Estado de la última comprobación vía URL Inspection API. Puede tardar 24-48 h en igualar al informe de Páginas de Google Search Console porque GSC muestra datos consolidados diarios."

## Detalles técnicos

- Migración: `alter table public.seo_index_checks add column discovered_outside_sitemap boolean default false, add column google_canonical text, add column user_canonical text;` (+ GRANTs ya existentes).
- `gsc-index-status`: nuevo paso previo `fetchIndexedFromSearchAnalytics()` que llama `POST /webmasters/v3/sites/{site}/searchAnalytics/query` con `dimensions:["page"]` últimos 90 días, y hace `upsert` de las que no estén ya en la tabla marcándolas `discovered_outside_sitemap = true` si no aparecen en el sitemap actual.
- Frontend `AdminIndexacion.tsx`: nuevas cifras derivadas de `checks` + agrupación por `coverage_state`; una `Card` extra con URLs fuera del sitemap.
- Sin cambios en rutas ni en la lógica del checklist manual.

## Fuera del alcance

- No fuerzo indexación por API (Google no lo permite salvo Job Posting / Broadcast Event).
- No toco el sitemap ni añado/borro URLs; solo lo reporto.
- No cambio la estructura del panel /admin.