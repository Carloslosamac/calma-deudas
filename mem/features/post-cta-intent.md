---
name: Post CTA intent alignment
description: Every blog post CTA (InlineCTA) must be oriented to the post's specific intent, never generic
type: feature
---
Every blog post must include at least one `<InlineCTA>` whose `title`, `description` and especially `buttonLabel` reflect the post's specific intent — the concrete action the reader wants to take. Never ship a generic CTA like "Analizar mi caso gratis" as the button label of a post.

The CTA always links to `#hero-form` (handled by the InlineCTA component, core rule).

This applies to the STICKY sidebar too. Every post defines a `sidebar` field (`{ ctaTitle, ctaDescription, ctaLabel, benefits[] }`) on its `BlogPost`, consumed by `BlogSidebar`. The sticky CTA (title/description/label) AND the "¿Por qué Calma?" benefits list must both be aligned to the post's intent (e.g. juicio monitorio → "Expertos en oposición a juicios monitorios", revolving → "Especialistas en reclamación de revolving"). Never leave the generic default ("¿Quieres saber cuánto costaría tu procedimiento?" / "Analizar mi caso" / generic benefits) on a real post. `BlogSidebar` keeps a default only as fallback.

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
