# Más herramientas (fase 2)

Añadir dos herramientas nuevas a la sección `/herramientas`, siguiendo exactamente el mismo patrón ya en producción (datos en `tools.ts` → `ToolWidget` en `ToolPage.tsx` → componente interactivo). Cada una con resultado en pantalla, CTA al formulario, contenido SEO/GEO, FAQ, disclaimer YMYL y enlazado interno.

## Herramienta 5 — Simulador de plan de pagos

Ruta: `/herramientas/simulador-plan-pagos`

Muestra lo lento (y caro) que es pagar deuda a base de cuotas, para empujar hacia una solución real.

- **Entradas**: deuda total (€), cuota mensual que puede pagar (€), TAE media aproximada (slider, por defecto ~22%).
- **Salidas**: meses/años hasta liquidar, intereses totales pagados, y comparación visual "pagando cuotas" vs "con una solución de Calma" (cancelar/reunificar reduce plazo y total).
- **Avisos**: estimación orientativa; si la cuota no cubre los intereses, mensaje claro de "deuda que nunca baja" → vía LSO/reunificación.
- **CTA**: `CtaButton` + `scrollToForm`.

## Herramienta 6 — Comparador de soluciones de deuda

Ruta: `/herramientas/comparador-soluciones-deuda`

Tabla interactiva que compara las 3 vías según la regla de triaje del proyecto, resaltando la recomendada según 2-3 toggles del usuario.

- **Toggles**: ¿puedes pagar tus deudas? (solvencia), ¿tienes vivienda/terreno pagado?, ¿hay tarjetas revolving / usura?
- **Salida**: tabla comparando **Ley de Segunda Oportunidad**, **Reunificación** (negociación extrajudicial que baja cuota y total, sin préstamo nuevo) y **Reclamación judicial** por filas (qué hace, a quién conviene, qué pasa con los bienes, resultado, plazo orientativo), con la columna recomendada destacada.
- Coherente con memoria: reunificar ≠ refinanciar; casa/terreno pagado bloquea LSO en la práctica → reunificar.
- **CTA**: `CtaButton` + `scrollToForm`.

## Cambios por archivo

- `src/data/seo/tools.ts`
  - Ampliar `ToolKind` con `"paymentPlan"` y `"comparator"`.
  - Añadir 2 objetos `Tool` (slug, path, navLabel, cardTitle, cardDescription, eyebrow, h1, seoTitle <60, metaDescription <160, intro, sections, faq, related, disclaimer).
  - Añadir las nuevas `ToolKind` a `CLUSTER_TOOL_KINDS` donde aporten (p. ej. `paymentPlan` en cancelar/reunificar; `comparator` en LSO/cancelar/reunificar).
  - Centralizar constantes nuevas (TAE media de referencia para el plan de pagos) con fuente citada; sin inventar cifras de marca.
- `src/components/seo/interactive/PaymentPlanSimulator.tsx` (nuevo) — cálculo de amortización con interés mensual; maneja el caso "cuota < intereses".
- `src/components/seo/interactive/SolutionComparator.tsx` (nuevo) — toggles + tabla con columna recomendada destacada (reutiliza patrón visual de `ComparisonTable`).
- `src/pages/seo/ToolPage.tsx` — añadir los dos `case` nuevos al `switch` de `ToolWidget`.
- `src/pages/seo/HerramientasHub.tsx` — añadir iconos para `paymentPlan` y `comparator` en el mapa `ICONS` (las tarjetas se generan solas desde `tools`).
- `public/sitemap.xml` y `public/llms.txt` — añadir las 2 URLs nuevas.

## SEO por página

- Title <60 y meta description <160, únicos, optimizados para CTR (estudiar top 10 y batirlo), sin "| Calma", con hook diferenciador.
- JSON-LD: `WebPage` + `BreadcrumbList` + `WebApplication` + `FAQPage` (ya lo aplica `ToolPage` automáticamente).
- H1 único y HTML semántico (heredado del scaffold de `ToolPage`).

## Fuera de alcance

- Guardado de resultados o envío por email.
- Tests automatizados de los cálculos.
- Más herramientas adicionales más allá de estas dos.