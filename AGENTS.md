# AGENTS.md

- Static SEO fallback tags in `index.html` must carry `data-rh="true"` so react-helmet-async replaces them per route instead of duplicating them.
- Local cases come only from the explicit documented catalogue in `localCases.ts`; never generate or template cases. Cities without one omit the cases block, FAQ and counts.
- City-to-city links come only from `territorialNeighbors()` in `src/lib/seo/localLinks.ts`; national pages link to `LOCAL_HUB`. Why: one deterministic territorial rule, no manual city picks.
- Editorial review state (`reviewed`, `legalReviewPending`) is internal and never written into public titles or meta descriptions.
