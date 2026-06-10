## Objetivo

Reforzar `/cancelar-deudas` con cuatro añadidos que ayudan a quien aún no sabe qué hacer: confianza (equipo), claridad del proceso (timeline), orientación inicial (mini-guía) y garantías (sellos). Solo se edita `src/data/seo/content/cancelarDeudas.tsx` (más imports de imágenes de equipo ya existentes). No se tocan componentes ni tipos: `teamCredentials` y `legalTimeline` ya existen en `MoneyJourney`.

## Cambios en `cancelarDeudas.tsx`

1. **Equipo y credenciales (`interactive.teamCredentials`)**
   - Reutilizar fotos `@/assets/team-lawyer-*.jpg` (subconjunto de ~6 miembros para no recargar).
   - Título reorientado a la decisión: "El equipo que elige la vía correcta por ti".
   - `highlights`: "+19.000 familias sin deudas", "Abogados colegiados", "Presupuesto cerrado desde el inicio".

2. **Fases del proceso (`interactive.legalTimeline`)**
   - 4 fases del recorrido multi-vía: Diagnóstico gratuito → Elegimos la vía (cancelar/reclamar/reunificar/refinanciar) → Puesta en marcha y freno a la presión → Deuda eliminada. Con `duration` orientativa.
   - Título: "Cómo es el proceso, paso a paso".

3. **Mini-guía "¿Por dónde empiezo?" (nueva `MoneySection`)**
   - Sección de texto que guía a quien está perdido: 3 preguntas que se haga ("¿puedo pagar algo?", "¿mis intereses son abusivos?", "¿me reclaman?") y a dónde lleva cada respuesta, con enlaces internos a LSO, revolving, microcréditos, reunificar y la guía `/cancelacion-de-deudas`.
   - Se inserta al inicio de `sections`.

4. **Garantías / sellos (nueva `MoneySection`)**
   - Bloque "Nuestro compromiso contigo" con bullets de confianza: diagnóstico gratis, sin compromiso, contenido revisado por abogado, presupuesto cerrado, respuesta en 24h, sin letra pequeña.
   - Se inserta al final de `sections`, antes del cierre.

5. **`layout`**: añadir `teamCredentials` y `legalTimeline` en el orden:
   `simulator → debtTypes → comparisonTable → benefits → urgencyTimeline → legalTimeline → steps → quiz → metrics → teamCredentials → testimonials → sections → beforeAfter → eligibility → faq → closing`.

## Detalles técnicos

- Imports nuevos de imágenes de equipo (mismos assets que usa `abogadosLeySegundaOportunidad.tsx`).
- Sin cambios en routing, sitemap, schema ni componentes. Todos los CTAs siguen llevando a `#hero-form`; los enlaces internos usan el helper `A`.

## Verificación

- Revisar build y preview de `/cancelar-deudas`: que aparezcan el timeline legal, el bloque de equipo y las dos secciones nuevas en el orden previsto.
