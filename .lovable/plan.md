## Objetivo

Convertir `/cancelar-deudas` en el **pináculo** para una persona que sabe que quiere eliminar su deuda pero **aún no sabe cómo**. Todo el copy y cada módulo se reorientan a "ayúdame a elegir la vía correcta", y el **comparador de soluciones según situación** pasa a ser el corazón de la página. Mismo patrón técnico que LSO (`MoneyJourney`), solo cambia el contenido en `src/data/seo/content/cancelarDeudas.tsx`.

## Ángulo editorial

- Persona objetivo: "quiero que mi deuda desaparezca, pero no sé qué hacer".
- Mensaje rector: hay varias vías (cancelar por LSO, anular por usura, negociar quita, reunificar) y **la clave es elegir la correcta para tu caso** — eso lo decidimos juntos, gratis.
- No canibalizar: la guía profunda sigue en `/cancelacion-de-deudas`; la LSO en `/ley-segunda-oportunidad`. Esta página es la **decisión + acción**.

## Cambios módulo a módulo (en `cancelarDeudas.tsx`)

1. **Hero**: reenfocar de "cancela las deudas que te ahogan" a "tu deuda puede desaparecer; te decimos por qué vía". Título + subtítulo orientados a "no sabes cómo, nosotros te guiamos".

2. **Nuevo `comparisonTable`** (módulo estrella, hoy sin usar): tabla "¿Qué solución te conviene?" comparando las 4 vías —**Cancelar (LSO)**, **Anular por usura**, **Negociar quita**, **Reunificar**— por filas como: cuándo encaja, qué pasa con la deuda, plazos, si puedes seguir pagando, resultado. Columna destacada según el caso más común. CTA "¿Cuál es la mía? Pregúntanos gratis".

3. **`debtTypes` → selector "según tu situación"**: reescribir las opciones para que sean **situaciones** ("Ya no puedo pagar nada", "Puedo pagar una cuota pequeña", "Mis intereses son altísimos", "Tengo deuda pública", "Me reclaman/embargan", "No sé por dónde empezar"), cada una apuntando a la vía y enlace correctos.

4. **Nuevo `urgencyTimeline`**: "Qué pasa si no eliges una salida" (intereses crecen → reclamaciones → monitorio → embargo), para empujar a actuar sin saber aún la vía.

5. **`quiz`**: reorientar a "¿Qué vía es la tuya?" — preguntas que segmentan hacia cancelar/reclamar/reunificar, no solo elegibilidad LSO.

6. **`benefits`**: mantener pero reencuadrar a "resultado independientemente de la vía" (deuda fuera, recuperas nómina, paran llamadas, etc.).

7. **`steps`**: reescribir como "de no saber qué hacer → a deuda eliminada": Diagnóstico → Elegimos la vía → Ponemos en marcha → Deuda eliminada.

8. **`sections`**: reescribir hacia comparación y decisión: "Las 4 vías para que tu deuda desaparezca", "¿Cómo sé cuál es la mía?", "Cancelar vs reunificar vs reclamar", "Coste y plazos por vía". Mantener enlaces internos a LSO, revolving, microcréditos, reunificar y guía.

9. **`faq`**: añadir preguntas tipo "No sé qué vía me conviene, ¿cómo lo decido?", "¿Y si me equivoco de vía?", junto a las de coste/plazos.

10. **`beforeAfter`, `metrics`, `eligibility`, `closing`, `testimonials`, `simulator`**: ajustar copy al ángulo "elige tu vía / tu deuda desaparece", sin cambios estructurales.

11. **`layout`**: nuevo orden priorizando la decisión:
`simulator → debtTypes → comparisonTable → benefits → urgencyTimeline → steps → quiz → metrics → testimonials → sections → beforeAfter → eligibility → faq → closing`.

## Detalles técnicos

- Solo se edita `src/data/seo/content/cancelarDeudas.tsx`. No se tocan componentes ni tipos: `comparisonTable` y `urgencyTimeline` ya existen en `types.ts`, en `MoneyJourney` y como componentes (`ComparisonTable`, `UrgencyTimeline`).
- `seoTitle`/`metaDescription` viven en `src/data/seo/moneyPages.ts`; se revisarán para alinear con el ángulo "qué solución te conviene" si conviene (cambio menor, opcional).
- Sin cambios en routing, sitemap ni schema.

## Verificación

- Revisar el build y la preview de `/cancelar-deudas`: que aparezcan la tabla comparativa y el timeline, y que el orden de módulos sea el previsto.
