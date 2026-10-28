# AGENTS.md

- Static SEO fallback tags in `index.html` must carry `data-rh="true"` so react-helmet-async replaces them per route instead of duplicating them.
- Public local case surfaces (components, intros, counts, FAQs, schema) must read cases through `publicLocalCases()`; drafts (`isReal: false`) stay in data only.
- City-to-city links come only from `territorialNeighbors()` in `src/lib/seo/localLinks.ts`; national pages link to `LOCAL_HUB`. Why: one deterministic territorial rule, no manual city picks.
- Editorial review state (`reviewed`, `legalReviewPending`) is internal and never written into public titles or meta descriptions.
