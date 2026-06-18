## Goal

Encode one consistent **solution-triage rule** that governs every money page today and all content written from now on, then fix the existing pages where the positioning contradicts it.

### The triage rule (canonical wording to reuse everywhere)

```text
Situation                                           → Right solution
Insolvent (can't pay) + NO valuable paid assets     → Ley de Segunda Oportunidad (cancelar)
Insolvent (can't pay) + HAS valuable paid assets    → Reunificar
                                                       (paid house/land/etc. blocks LSO in practice)
Solvent + usury victim + low debt amount            → Reclamación judicial
Insolvent + usury                                   → LSO or reunificar (not reclamación)
```

Key practical facts to bake in:
- A **paid-off home, land, or other valuable asset disqualifies LSO in practice** (the liquidation phase would seize it), so those users are steered to **reunificar**.
- **Reclamación judicial (usury/intereses abusivos)** is only the lead solution for **non-insolvent** people with **low debt**; insolvent usury victims belong in LSO/reunificar.

## Part 1 — Persist the rule (memory)

- New memory file `mem://features/solution-triage` (type `feature`) holding the table + facts above, so all future content follows it automatically.
- Add a one-line reference under **Memories** in `mem://index.md` and a short Core line: "Solution triage: LSO = insolvent + no paid assets; reunificar = insolvent + has paid assets; reclamación = solvent + usury + low debt."

## Part 2 — Make assets a real input in the simulator

File: `src/components/seo/interactive/DebtSimulator.tsx` (the `compareSolutions` variant).

- Add two compact yes/no toggles above the sliders:
  - "¿Tienes vivienda u otros bienes de valor totalmente pagados?" (assets)
  - "¿Puedes asumir alguna cuota mensual?" (solvency) — optional, defaults from the monthly slider.
- Add a **recommendation engine** that picks the right solution from the toggles + debt amount using the rule, shows a highlighted "Lo que más te conviene: …" badge with a one-line reason, and auto-selects that solution in the existing selector (user can still explore others).
  - paid assets + can't pay → **Reunificar**
  - no paid assets + can't pay → **LSO**
  - can pay + low debt → **Reclamación / negociar**
- Extend the `lso` solution note to mention the paid-asset caveat.

File: `src/data/seo/content/types.ts`
- No breaking changes; `compareSolutions` already exists. (Toggles are self-contained in the component, driven by internal state — no new content fields required.)

## Part 3 — Make assets a real input in the eligibility quizzes

The quiz already scores yes/no with `goodAnswer`. Add an **assets question** to the relevant pages so the result actually shifts:

- **LSO-type pages** (`leySegundaOportunidad`, `cancelarDeudas`, `cancelacionDeDeudas`, `exoneracionPasivoInsatisfecho`, `concursoPersonaFisica`, `abogadosLeySegundaOportunidad`): add "¿Tienes vivienda u otros bienes de valor totalmente pagados?" with `goodAnswer: "no"`, and reword `resultDoubt` to steer asset-owners toward reunificar.
- **Reunificar pages** (`reunificarDeudas`, `reunificacionDeudas`): add the same question with `goodAnswer: "yes"`, framing reunificar as the fit for "no puedo pagar pero tengo bienes".
- **Reclamación pages** (`cancelarTarjetasRevolving`, `juicioMonitorioDeuda`): add an insolvency question with `goodAnswer: "no"` (i.e. reclamación fits when you are NOT insolvent); `resultDoubt` points insolvent users to LSO/reunificar.

## Part 4 — Audit & fix the steering copy

Correct any text that contradicts the rule across:

- **`eligibility` blocks** on the pages above — requirements/intro must reflect the asset + insolvency split.
- **`debtTypes` selectors** (e.g. `cancelarDeudas`, `reunificarDeudas`) — the "con hipoteca / tengo bienes" and "ya no puedo pagar" branches must route correctly (assets → reunificar, no assets + insolvent → LSO).
- **`comparisonTable`** rows on `cancelarDeudas`, `reunificacionDeudas`, `exoneracionPasivoInsatisfecho` — add/clean an "Apto si tienes bienes pagados" / "Apto si eres insolvente" type row so LSO vs reunificar vs reclamación read consistently.
- **`sections` prose** that mentions "cuándo conviene/NO conviene" — align with the rule and cross-link to the right page.

## Out of scope

- No new routes, no architecture/cluster changes.
- `legalTimeline` rewrites (already done in prior turns) untouched.

## Technical notes

- All edits stay in frontend/presentation + content data files; no backend.
- The simulator change is the only component-logic edit; everything else is copy/config in `src/data/seo/content/*` and the two memory files.
- TypeScript compiles cleanly because no type signatures change (quiz/debtType/comparison shapes already support the new entries).
