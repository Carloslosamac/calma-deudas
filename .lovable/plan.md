# Cobertura total de contenido en las 15 money pages (paridad con el top 10)

Objetivo real: que ninguna de nuestras money pages omita **ningún bloque de información** que esté presente en las 10 páginas mejor posicionadas de Google España para su keyword. No un añadido suave (glosario/mitos/FAQ), sino **secciones completas** con toda la información relevante, redactada original y renderizada con el kit visual existente.

## Por qué el enfoque anterior se quedó corto

Solo añadí 3 módulos de datos (glosario, mitos, FAQ) y scrapeé 6 resultados con texto truncado. Para "paridad con el top 10" necesito: (1) scrape real y completo del top 10, (2) inventario exhaustivo de bloques, (3) diff contra TODO el contenido actual de cada página, (4) redactar cada bloque que falte como sección completa.

## Pieza técnica nueva: secciones data-driven

Hoy las `sections` usan JSX a mano, que no escala ni se genera de forma fiable. Crearé un renderizador **`SectionBlocks`** que convierte datos tipados (JSON) en los módulos ya existentes. Así el contenido generado es **datos tipados, no JSX suelto** (robusto y type-safe).

Esquema de bloque (mapea 1:1 al kit actual):
```text
paragraph   -> <p> con texto (admite negritas e enlaces internos)
keyCallout  -> KeyCallout (idea-fuerza "en una frase")
optionCards -> OptionCards (vías / tipos / opciones, con enlaces internos)
factGrid    -> FactGrid (cifras: plazos, costes, límites)
checkList   -> CheckList (requisitos / criterios; variante check o cross)
callout     -> Info/WarningCallout (avisos, matices de triaje)
table       -> tabla comparativa simple dentro de sección
actionLink  -> ActionLink (cross-sell a otra money page)
```
Cada `extraSection = { title, blocks: Block[] }` se renderiza con `SectionBlocks` y se inyecta en `sections`, que ya está en el `layout` de todas las páginas.

## Proceso por página (las 15)

1. **Scrape profundo del top 10** (Firecrawl, Google España, `country: es`): 10 resultados por keyword, contenido completo (markdown sin truncar + headings + FAQs), no 6 truncados.
2. **Inventario exhaustivo**: extraer TODOS los bloques temáticos del top 10 (definición, requisitos, tipos de deuda, plazos, costes/honorarios, fases del proceso, documentación necesaria, ventajas/inconvenientes, riesgos de no actuar, casos/ejemplos, normativa aplicable, diferencias con otras vías, preguntas, etc.).
3. **Diff contra nuestra página**: comparar el inventario con TODO lo que ya cubre el contenido actual (secciones + módulos + FAQ + glosario + mitos). Marcar solo lo que falta o está flojo.
4. **Redacción original** (sintetizada y reescrita, nunca copiada; voz de Calma; marco legal español real): convertir cada hueco en `extraSection` con sus bloques, o en datos para módulos interactivos cuando aplique (comparisonTable, urgencyTimeline, legalTimeline, exonerationLimits, beforeAfter).
5. **Inyección** vía el registro (`enrichment` + merge en `index.ts`): se añaden las nuevas secciones y módulos sin reescribir los archivos a mano.

## Reglas que se respetan (memoria del proyecto)

- Triaje intacto: LSO = insolvente + SIN bienes pagados; reunificar = insolvente + CON bienes valiosos; reclamación judicial = solvente + usura + deuda baja.
- Todos los CTA siguen a `#hero-form`. Sin gradientes en CTAs.
- Módulos legibles, nunca muros de prosa (cada sección troceada en bloques del kit).
- Anti-canibalización: respetar la intención de cada página (acción vs guía) y enlazar entre ellas en vez de duplicar.
- Marca "Calma". Tokens semánticos, nada hardcodeado. Sin inventar cifras: rangos prudentes.
- Contenido original (anti-duplicado SEO y legalmente seguro).

## Entregables

1. `src/components/seo/SectionBlocks.tsx` — renderizador de bloques → kit.
2. Tipos de bloque en `types.ts` (o archivo de bloques).
3. `enrichment` ampliado: por página, `sections` completas + módulos interactivos que falten + FAQ/glosario/mitos ya hechos.
4. Merge en `index.ts` que inyecta todo en el `layout` correcto.
5. Verificación: compilación TS limpia + revisión visual de 2-3 páginas (incl. ley de segunda oportunidad).

## Alcance / expectativas

- Las páginas crecerán bastante (es el objetivo: paridad informativa con el top 10).
- Es un volumen grande; lo ejecuto página por página dentro del trabajo para mantener calidad.
- No se crean rutas nuevas ni se toca backend ni tokens de diseño; solo contenido + un renderizador.

## Nota técnica

- Firecrawl solo se usa en investigación (no entra código de Firecrawl en la app).
- Si un bloque encaja en un módulo interactivo ya soportado por `types.ts`, se rellena ese módulo; si es prosa estructurada, va como `extraSection` con bloques.