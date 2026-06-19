## Goal
Start populating the blog following the master plan (the **Mapa SEO Total**, encoded in `src/data/seo/architecture.ts`: 3 money hubs + 12 satellite clusters). The blog's job is to add **informational/long-form** support content that feeds the money/landing pages, without cannibalizing existing posts.

## Current state
Blog has 7 posts (`src/data/blog/posts/*.tsx`), registered in `src/data/blog/index.ts`:
- `guia-ley-segunda-oportunidad` (pillar), `cancelar-deudas-requisitos`, `embargos-segunda-oportunidad`, `salir-asnef`, `autonomos-con-deudas`, `renegociar-acreedores`, `vida-despues-deuda`.

Clusters with **no dedicated blog post yet**: tarjetas-revolving, microcréditos, deudas-hacienda-seguridad-social, juicio-monitorio-recobro, bancos-hipoteca-vivienda, empresas-de-recobro, situaciones personales, estafas-fraude, guías (educación financiera).

## Approach
Map each new blog post to a cluster gap, with one clear unique search intent each. Blog posts stay **informational** and interlink to the matching **money landing page** (transactional) + 2+ existing posts — so the blog feeds conversions instead of competing with the money pages.

### First batch (this round): 4 posts
Prioritizing highest-volume / highest-intent gaps:
1. **Tarjetas revolving** (cluster topics: 255) — "Cómo reclamar y cancelar una tarjeta revolving por usura" → links to revolving money page + salir-asnef.
2. **Microcréditos** (561) — "Cancelar microcréditos y préstamos rápidos: qué hacer cuando no puedes pagar" → links to microcréditos money page + revolving post.
3. **Juicio monitorio / embargos** (66/123) — "Me ha llegado un juicio monitorio por una deuda: qué hacer en cada plazo" → links to parar-embargo money page + embargos post.
4. **Deudas con Hacienda y Seguridad Social** (50) — "Deudas con Hacienda y Seguridad Social: opciones reales para resolverlas" → links to autónomos post + relevant money page.

(After your review of batch 1, continue ~1–2/day through the remaining cluster gaps.)

### Each post follows the established rules (blog-strategy memory)
- One unique intent, long-form SEO copy, multiple paragraphs per H2 (never an H2 with only a diagram).
- Diagrams adapted per-article from the existing library; **no image + diagram in the same H2**; no gradients in CTAs.
- Min 2 internal links + relevant external authority links (BOE, AEAT, Seguridad Social, Banco de España…) opening in new tab.
- CTA buttons scroll to `#hero-form` (via existing `InlineCTA`).
- Triage respected (LSO vs reunificar vs reclamación). Reunificar described as negociación extrajudicial, never refinanciar.
- Hero image = same image used on the blog index card; generated with `standard` model, photojournalism prompt (real camera, natural light, Spanish setting, unretouched).
- **SEO title <60 chars, meta desc <160**, unique, no "| Calma" branding, each with a differentiating CTR hook (study top results per keyword before finalizing).

## Technical details
- New files: `src/data/blog/posts/<slug>.tsx` (4), each exporting a `BlogPost` per `src/data/blog/types.ts`.
- Register each in `src/data/blog/index.ts` (`blogPosts` array).
- Generate 4 hero images into `src/assets/blog/` and import them into the posts.
- Update `public/sitemap.xml` (run `scripts/generate-sitemap.ts` if it covers blog routes) so the new posts are discoverable.
- No backend/schema changes; pure content + assets.

## Verification
- Build passes; visit `/blog` (cards render with hero images) and each new `/blog/<slug>` (sidebar, reading bar, diagrams, CTAs to `#hero-form`, interlinks resolve).
- Confirm titles/meta length limits and no cannibalization vs existing slugs.
