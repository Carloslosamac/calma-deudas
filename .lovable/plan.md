# Money pages: "readable modules + interactives" as the standard

## Goal
Make every money page render like `/cancelacion-de-deudas`: prose broken into scannable, attractive modules (callout cards, option grids, fact tiles, warning notes) plus the right interactive widgets — instead of walls of text. Turn the one-off inline JSX into a reusable kit so all 14 remaining pages and all future content stay consistent.

## Part 1 — Build the reusable module kit
New folder `src/components/seo/modules/` with small presentational components (semantic tokens only, no hardcoded colors), each accepting plain data props so content files stay clean:

- `KeyCallout` — the highlighted "En una frase" card (eyebrow + bold one-liner with accent span + supporting paragraph). For the core takeaway of a section.
- `OptionCards` — responsive icon-card grid (1/2/3 cols). Each card: lucide icon, title, description, optional internal links. Reuses the existing `MoneyIcon` name set so icons stay consistent.
- `ActionLink` — the bordered arrow link box ("¿Prefieres pasar a la acción?").
- `InfoCallout` / `WarningCallout` — note boxes for caveats (e.g. the paid-asset / liquidation warning from the triage rule), with info vs warning variants.
- `FactGrid` — compact stat/fact tiles (e.g. "6–18 meses", "Coste", limits) for plazos/coste-type sections.
- `CheckList` — styled check/icon bullet list to replace plain `<ul>` prose lists.

A shared `A` internal-link helper currently duplicated in content files moves into a tiny `src/components/seo/modules/Link.tsx` (or `index.ts` barrel) so pages import from one place. A barrel `modules/index.ts` re-exports everything.

`cancelacion-de-deudas` is refactored to consume the kit (same look, less inline markup) so it becomes the canonical reference.

## Part 2 — Audit & convert all 14 money pages
For each page, convert the prose-heavy sections (especially the opening "qué es / cómo funciona / vías / requisitos / plazos" sections) into kit modules, and confirm it has the interactives that fit its intent. Pages:

- ley-segunda-oportunidad
- abogados-ley-segunda-oportunidad
- cancelar-deudas
- reunificacion-deudas
- reunificar-deudas
- salir-de-asnef
- parar-embargo
- cancelar-tarjetas-revolving
- cancelar-microcreditos
- exoneracion-pasivo-insatisfecho
- concurso-persona-fisica
- juicio-monitorio-deuda
- deudas-hacienda
- deudas-seguridad-social

### Conversion rules (applied per page)
- Lead section → `KeyCallout` with the page's core promise.
- "Vías / opciones / tipos" prose → `OptionCards`.
- "Requisitos" / qualifying lists → `CheckList`, with a `WarningCallout` for the paid-asset → reunificar caveat where the triage rule applies.
- "Plazos y coste" → `FactGrid` tiles.
- Cross-sell / next-step prose → `ActionLink`.
- Keep all CTAs scrolling to `#hero-form` (per project rule). Keep solution-triage steering intact (LSO vs reunificar vs reclamación).

### Interactives coverage
Confirm each page exposes the interactive(s) that match its job and isn't identical to siblings (avoid duplicate-content risk):
- LSO / exoneración / concurso → simulator (compareSolutions), eligibility quiz, legalTimeline, conceptGlossary/mythVsReality.
- reunificación/reunificar → simulator + comparisonTable (reunificar vs LSO) + asset-focused quiz.
- tarjetas-revolving → usuryCalculator; microcréditos → valueComparison.
- parar-embargo / juicio-monitorio → urgencyTimeline.
- salir-de-asnef → beforeAfter.
- hacienda / seguridad-social → exonerationLimits.
Where a fitting interactive is missing, add it via the existing `interactive` config (data only — no new widget code unless a page needs one that doesn't exist yet).

## Out of scope
- No new routes, no architecture/cluster changes, no copy rewrites beyond reshaping existing text into modules.
- No changes to `legalTimeline` content logic, backend, or design tokens/fonts (palette and typography stay as-is).
- Non-money templates (hub, guia, comparativa, entidad, localizacion) are untouched.

## Technical notes
- All work stays in `src/components/seo/modules/` (new) and `src/data/seo/content/*.tsx` (data). `MoneyJourney.tsx` already renders `sections[].body` as JSX, so no journey changes are required.
- Components use only semantic Tailwind tokens (`accent`, `surface-elevated`, `border`, `foreground/80`, etc.) and `framer-motion` is already handled by the `Reveal` wrapper at the journey level.
- TypeScript must compile cleanly; module props are typed.
- Verify a sample of converted pages in the preview after rollout.
