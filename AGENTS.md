# AGENTS.md

- Static SEO fallback tags in `index.html` must carry `data-rh="true"` so react-helmet-async replaces them per route instead of duplicating them.
- Local cases come only from the explicit documented catalogue in `localCases.ts`; never generate or template cases. Cities without one omit the cases block, FAQ and counts.
- City-to-city links come only from `territorialNeighbors()` in `src/lib/seo/localLinks.ts`; national pages link to `LOCAL_HUB`. Why: one deterministic territorial rule, no manual city picks.
- Editorial review state (`reviewed`, `legalReviewPending`) is internal and never written into public titles or meta descriptions.
- Web lead channel classification is centralized in webLeadAnalytics.ts for filters, charts and exports; missing attribution stays unknown rather than being assumed direct. Why: historical untagged leads cannot establish their acquisition channel.
- Web lead Excel exports prepare a persistent file with explicit download/save actions and a user-clicked top-level panel link preserving filters; never access window.top or automatically open popups. Why: hosted preview restrictions can silently block iframe downloads despite successful local tests.
