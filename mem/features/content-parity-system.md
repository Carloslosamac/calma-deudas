---
name: Content parity system for money pages
description: How money pages reach informational parity with the Google ES top 10 via the enrichment + SectionBlocks pipeline
type: feature
---
Goal: every money page covers all content blocks present in the top 10 Google ES results for its keyword.

Architecture:
- Research (offline, Firecrawl): scrape top 10 -> exhaustive topic inventory -> diff vs current page -> original synthesized sections (never copied).
- Generated data lives in `src/data/seo/content/enrichment.ts` keyed by page path: `{ faq, conceptGlossary, mythVsReality, extraSections }`.
- `extraSections` are typed data blocks (MoneyBlock union in types.ts: paragraph/keyCallout/optionCards/factGrid/checkList/callout/table/actionLink). Paragraph text supports **bold** and [label](/path) internal links.
- `src/components/seo/SectionBlocks.tsx` renders blocks -> existing module kit.
- `src/data/seo/content/index.ts` `mergeEnrichment()` merges enrichment into each MoneyContent: appends faq, sets glossary/myths if missing, appends extraSections as MoneySection (createElement(SectionBlocks)), and injects module keys into each page's `layout`.

To add/refresh content: regenerate enrichment.ts (don't hand-edit the per-page tsx for these). Respect triage rules, CTAs -> #hero-form, semantic tokens, no gradients, original copy.
