## Filtrar bots del analytics de Lovable

### Diagnóstico

Las 6 visitas de hoy tienen firma inequívoca de bots: 100% bounce, 0s sesión, 5/6 Direct, geo US, URLs SEO dispersas. Son crawlers (GPTBot, ClaudeBot, Perplexity, Ahrefs, Semrush, GoogleBot US) rastreando `/sitemap.xml` y `llms.txt`.

### Limitación importante

El widget de Analytics que ves (`totalVisits`, fuentes, países) es el **analytics gestionado de Lovable** (server-side, basado en logs de la CDN). **No lo controlamos desde el código** — no hay hook cliente que podamos manipular para excluir bots, y no expone filtro por user-agent en el panel.

Por tanto solo hay dos vías reales:

### Opción implementable: bloquear scrapers en `robots.txt`

Filtramos por la fuente: si los bots no entran, no aparecen en analytics. Esto sí lo controlamos.

Añadir al `public/robots.txt` actual bloques `Disallow: /` para crawlers de scraping SEO comercial y LLM-scrapers no útiles, manteniendo los útiles (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended — necesarios para SEO y AI search).

Bots a bloquear (sin valor para nosotros, solo ruido):
- `AhrefsBot`, `SemrushBot`, `MJ12bot`, `DotBot`, `BLEXBot` — SEO scrapers de terceros
- `Bytespider` (TikTok), `Amazonbot`, `Applebot-Extended` — poco valor
- `CCBot` (Common Crawl) — rastreador masivo genérico
- Genéricos: `PetalBot`, `DataForSeoBot`, `SEOkicks`

Mantenidos (importantes):
- `Googlebot`, `Bingbot`, `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `OAI-SearchBot`
- Facebook/Twitter para previews

### Lo que NO se puede hacer

- Añadir un filtro de user-agent en el analytics UI (no expuesto).
- Interceptar server-side los eventos ya registrados (el pipeline es interno de Lovable).

### Efecto esperado

- Los scrapers respetuosos de `robots.txt` (mayoría) dejarán de golpear el sitio → desaparecen de los totales.
- Los que ignoran robots seguirán apareciendo (pocos). Para esos, la única vía sería un WAF/regla en Cloudflare a nivel de dominio, fuera del alcance de este proyecto.
- Tráfico humano real (poco por ahora) queda intacto.

### Archivos a tocar

- `public/robots.txt` — añadir bloques `User-agent` con `Disallow: /` para los scrapers listados, preservando los bloques existentes y el `Sitemap:`.

### Alternativa complementaria (opcional)

Si además quieres, puedo dejar una nota en `README.md` explicando por qué los primeros meses el analytics de Lovable inflará números con bots hasta que el tráfico humano crezca — así no te descolocan las métricas.
