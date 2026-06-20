---
name: Internal linking system (cross-type, intent-based)
description: How posts, casos and tools cross-link by intent without cannibalization
type: feature
---
Internal cross-linking lives in `src/data/seo/internalLinks.ts` and renders via `src/components/seo/RelatedResources.tsx`.

Model: every content item maps to ONE `LinkTopic` (lso, requisitos, revolving, microcreditos, embargos, asnef, hacienda, autonomos, juicio-monitorio, reunificar, consejos). Maps: `POST_TOPIC` (by slug), `CASO_CATEGORY_TOPIC` (by caso.category), `TOOL_TOPIC` (by tool.path). `RELATED_TOPICS` is the affinity graph used as fallback to fill slots.

Anti-cannibalization rules (keep these):
- Cross-links connect DIFFERENT content types on the same topic (post↔caso↔tool). Same-type related lists stay separate (BlogPost keeps "Artículos relacionados", CasoExitoPost keeps "Otros casos reales", ToolPage keeps money-page "Contenido relacionado").
- `buildCrossLinks({ topic, origin, excludeSlug })` excludes the origin's own type, so a post never cross-links to other posts via this system (avoids duplicate post→post and exact-match anchor competition).
- Anchors are descriptive/contextual, NOT exact-match of the target H1. Tools use curated action anchors in `TOOL_ANCHOR`; casos use `headline`; posts use `title`.

When adding a new post/caso/tool: add its slug/category/path to the matching topic map (and a `TOOL_ANCHOR` entry for tools). RelatedResources is already wired into BlogPost, CasoExitoPost and ToolPage.