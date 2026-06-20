---
name: Post CTA intent alignment
description: Every blog post CTA (InlineCTA) must be oriented to the post's specific intent, never generic
type: feature
---
Every blog post must include at least one `<InlineCTA>` whose `title`, `description` and especially `buttonLabel` reflect the post's specific intent — the concrete action the reader wants to take. Never ship a generic CTA like "Analizar mi caso gratis" as the button label of a post.

The CTA always links to `#hero-form` (handled by the InlineCTA component, core rule).

Intent → buttonLabel mapping in use (reuse/extend for new posts):
- microcréditos → "Cancelar mis microcréditos"
- deudas Hacienda/Seguridad Social → "Resolver mi deuda pública"
- juicio monitorio → "Frenar el juicio monitorio"
- embargos → "Parar mi embargo"
- tarjeta revolving → "Revisar mi tarjeta gratis"
- ASNEF → "Salir de ASNEF"
- renegociar → "Renegociar mi deuda"
- autónomos → "Salvar mi negocio"
- requisitos → "Comprobar requisitos"
- guía general / cancelar deuda → "Cancelar mi deuda"
- vida después → "Empezar de cero"
