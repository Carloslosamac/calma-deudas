# Plan — Next round of SEO improvements for Calma

Building on the foundation already shipped (Helmet, per-route meta, sitemap, GSC, llms.txt). This round closes the remaining failing checks and adds the structured data most likely to win rich results and AI answers. **No new blog posts; existing editorial copy stays intact.**

## 1. Fix accessibility (Lighthouse "accessibility barriers")

Two real issues flagged on the live home page:

- **Missing `<main>` landmark on the homepage.** `Index.tsx` has no `<main>` (Blog, BlogPost, Privacy, Terms already do). Wrap the homepage's primary content (between Header and Footer) in a single `<main>`.
- **Low-contrast text.** Audit muted/placeholder text that falls below 4.5:1 and bump to design-system tokens (`text-muted-foreground` / `text-foreground`) where arbitrary low-contrast shades are used.

## 2. Remove broken social-share image references

You don't want social share images. The site currently references `/og/og-default.jpg`, which **doesn't exist** (a 404), in both `index.html` and the `Seo` component defaults. I'll:

- Remove `og:image`, `og:image:width/height`, `og:image:alt`, and `twitter:image` tags from `index.html` and `src/components/seo/Seo.tsx`.
- Switch Twitter card from `summary_large_image` to `summary` (no image).
- Drop the unused `DEFAULT_OG_IMAGE` / `ogImage` plumbing.

This removes broken references while keeping og:title/description for clean text-only link unfurls.

## 3. Tailored meta descriptions for every blog post

Posts currently fall back to `excerpt` (and a few excerpts are empty). I'll add an optimized `metaDescription` (≈150–160 chars, keyword-aware) to all 7 posts so each page has a unique, compelling SERP snippet.

## 4. FAQ structured data (FAQPage) — biggest rich-result win

Add a `faq` array (3–5 real Q&As drawn from each article's own content) to the pages with the strongest snippet/AI-answer potential:

- The pillar guide (`guia-ley-segunda-oportunidad`)
- `cancelar-deudas-requisitos`
- `embargos-segunda-oportunidad`
- `salir-asnef`
- `autonomos-con-deudas`

Render a visible FAQ section (reusing the existing `FaqList` component) and emit `FAQPage` JSON-LD via the existing `buildFaq` builder in `BlogPost.tsx`. Visible + structured is required for Google to trust the markup.

## 5. HowTo structured data for the pillar guide

The guide has a step-by-step procedure section. Add a `howToSteps` array and emit `HowTo` JSON-LD (builder already exists) so the process can surface as a rich result.

## 6. Sitemap accuracy

The scanner flags `/call/*` as missing from the sitemap. These are tracking-redirect pages we intentionally `noindex,nofollow` and `Disallow` in robots.txt — they should NOT be in the sitemap. I'll leave them excluded (correct behavior) and confirm the sitemap matches the indexable route set.

## Technical notes

- Files touched: `src/pages/Index.tsx` (main landmark), `index.html` + `src/components/seo/Seo.tsx` + `src/lib/seo/config.ts` (remove image refs), the 7 files in `src/data/blog/posts/` (metaDescription, faq, howToSteps), `src/pages/BlogPost.tsx` (render FAQ + wire FAQPage/HowTo schema).
- Reuses existing builders (`buildFaq`, `buildHowTo`) and `FaqList` — no new dependencies.
- After implementation: re-run the SEO findings and mark the addressed ones fixed; changes go live on publish.

## Validation

- Confirm one `<main>` per page and no remaining low-contrast flags.
- Validate FAQPage / HowTo with a structured-data check on the guide and key posts.
- Confirm no broken `og:image` 404 remains.
