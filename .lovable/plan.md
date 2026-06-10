## Objetivo

Dotar de contenido comercial completo (layout "journey", como la de Ley de Segunda Oportunidad) a las **money pages de prioridad crítica** que hoy siguen con placeholder. La página `/ley-segunda-oportunidad` queda como referencia de estructura y tono.

## Páginas a desarrollar (en este orden)

1. `/abogados-ley-segunda-oportunidad` — Abogados LSO (intención jurídica directa)
2. `/cancelar-deudas` — Cancelar deudas (acción transaccional)
3. `/cancelacion-de-deudas` — Cancelación de deudas (variante semántica)
4. `/reunificacion-deudas` — Reunificación de deudas (pilar del cluster)
5. `/reunificar-deudas` — Reunificar deudas (acción directa)

Las 4 últimas son pares de variantes muy parecidas, así que el riesgo principal es la **canibalización**. Cada página tendrá un ángulo, copy y módulos diferenciados (ver más abajo).

## Cómo se construye cada página

Cada money page es un archivo nuevo en `src/data/seo/content/` que exporta un objeto `MoneyContent` (mismo tipo que `leySegundaOportunidad.tsx`), registrado en `src/data/seo/content/index.ts`. Como cada objeto incluye `hero`, `MoneyLanding` lo renderiza automáticamente con el layout journey. No hay que tocar rutas ni el menú (ya existen).

Cada objeto incluirá, igual que la de LSO:
- `intro`, `hero` (con badge, titleLead/titleAccent, subtitle, trustNote)
- `socialProof` (valoración, casos, sello, medios)
- `benefits` (6 tarjetas con icono), `benefitsTitle`
- `testimonials` adaptados al tema, `testimonialsTitle`/`Subtitle`
- `steps` (camino en 4 pasos), `metrics`
- `eligibility`, `closing`
- `interactive`: simulador, selector de tipo de deuda, quiz y antes/después adaptados
- `sections` (4-5 H2 de copy SEO) y `faq` (4-6 preguntas con `plain` para JSON-LD)
- `reviewed: true` solo cuando el copy legal sea correcto; las páginas con afirmaciones legales sensibles llevarán el aviso de revisión hasta validar.

Todos los CTA scrollean a `#hero-form` (ya lo gestiona el scaffold/journey). Sin gradientes en CTAs.

## Diferenciación por página (anti-canibalización)

- **Abogados LSO**: ángulo "equipo de abogados especialistas", E-E-A-T, autoridad jurídica, proceso legal, honorarios. Enlaza a `/ley-segunda-oportunidad` como hub. Canonical propio.
- **Cancelar deudas**: ángulo acción/resultado ("elimina lo que no puedes pagar"), abanico de tipos de deuda; deriva a LSO, revolving y microcréditos.
- **Cancelación de deudas**: ángulo más informativo/guía (vías legales, requisitos, plazos), funciona como pilar del cluster que enlaza a `/cancelar-deudas` como página de acción.
- **Reunificación de deudas**: pilar del cluster, ángulo comparativo "reunificar vs. cancelar (LSO)", cuándo conviene cada una.
- **Reunificar deudas**: ángulo acción paso a paso ("cómo reunificar hoy"), enlaza a `/reunificacion-deudas` para profundizar.

Cada par variante usará intros, H2 y FAQ distintos para no competir entre sí, e interlinking horizontal entre ambas y con el hub correspondiente.

## Testimonios

Se adaptan por tema reutilizando las fotos existentes en `src/assets/` (hay retratos suficientes: `person-*`, `testimonial-*`, además de `lso-*`). Los textos de cada testimonio se reescriben para encajar con el tema de la página (p. ej. reunificación → "pasó de 5 cuotas a una sola"). Importes y nombres coherentes con los casos reales de Calma.

## Detalles técnicos

- Archivos nuevos: `src/data/seo/content/abogadosLeySegundaOportunidad.tsx`, `cancelarDeudas.tsx`, `cancelacionDeDeudas.tsx`, `reunificacionDeudas.tsx`, `reunificarDeudas.tsx`.
- Editar `src/data/seo/content/index.ts` para importarlos y añadirlos al array `contents`.
- Reutilizar el helper `A` (enlace interno) y el tipado `MoneyContent` de `./types`.
- No se modifica `moneyPages.ts`, `architecture.ts`, `MoneyLanding.tsx` ni `MoneyJourney.tsx` (la infraestructura ya soporta el journey).
- Verificación: build + revisión visual de cada ruta en preview (móvil y escritorio).

## Entrega por fases

Para no saturar una sola entrega, propongo construir primero **Abogados LSO** completa como segundo precedente validado, y a continuación las 4 restantes. Puedo hacerlas todas en esta tanda o ir confirmando contigo página a página; por defecto avanzaré con las 5.
