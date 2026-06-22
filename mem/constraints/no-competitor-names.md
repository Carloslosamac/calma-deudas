---
name: No competitor names in titles/content
description: Never let competitor brand suffixes leak into blog titles or content; roadmap was scraped from SERPs
type: constraint
---
Competitor brand names must NEVER appear in our blog titles, visible slugs text, or content.

**Why:** The `seo_roadmap` was bootstrapped by scraping competitor SERPs, so many `titulo` values carried suffixes like " - MiSolvencia.es" and " - Abogados para tus deudas". These leaked into published post titles.

**How to apply:**
- `generate-daily-posts` has a `sanitizeTitle()` that strips brand suffixes (MiSolvencia.es, Abogados para tus deudas, Repara tu Deuda, Quita Deudas, Deudae, MundoJurídico). Keep/extend it; apply to both title and seo_title.
- When adding new roadmap data, clean competitor suffixes first.
