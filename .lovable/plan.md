# Cancelar deudas vs Cancelación de deudas: diferenciar el ángulo

## Recomendación

**Mantener las dos páginas, no fusionarlas.** Los datos de búsqueda confirman que tienen intención distinta, así que cada una puede posicionar para su SERP sin competir:

- **"cancelar deuda(s)"** → 590/mo (plural), intención de **acción** ("quiero hacerlo"). Preguntas operativas: *cómo cancelar deudas en España, qué deudas puedo cancelar*.
- **"cancelación de deuda"** → 30–90/mo, dificultad baja (8/100), intención **conceptual** ("qué es"). Pregunta estrella: *qué es la cancelación de una deuda*.

La arquitectura actual ya las etiqueta bien (cluster `cancelar-deudas`; una `transaccional`, otra `informativa`). Lo que falta es que el **contenido y el enfoque** lo reflejen con claridad para no canibalizar.

## Regla rectora

> Una página **actúa**, la otra **explica**. La guía informativa enlaza hacia la landing transaccional (no al revés como página principal), canalizando el tráfico educativo hacia conversión.

## `/cancelar-deudas` — Landing comercial (transaccional)

Enfoque: "te ayudamos a hacerlo".
- H1 orientado a acción y resultado ("Cancelar deudas: la solución que te conviene").
- Bloques: solución (Ley Segunda Oportunidad), beneficios, para quién, casos/prueba social, pasos del servicio.
- CTAs al formulario (`#hero-form`, según regla del proyecto).
- Lenguaje directo, sin convertirse en glosario teórico.

## `/cancelacion-de-deudas` — Guía informativa

Enfoque: "qué es y cómo funciona".
- H1 explicativo ("Cancelación de deudas en España: qué es y cómo funciona").
- Bloques: definición, tipos (total/parcial, judicial/extrajudicial), marco legal, requisitos, diferencias con reunificar/refinanciar, FAQ que responda *qué es la cancelación de una deuda*.
- Enlace interno claro hacia `/cancelar-deudas` como siguiente paso ("¿listo para empezar?").
- CTA presente pero secundario respecto al contenido educativo.

## Anti-canibalización (checklist)

- `seoTitle` y meta description **distintos** en intención (uno "qué solución te conviene", otro "guía: qué es y cómo funciona") — ya están así, revisar que el cuerpo lo acompañe.
- Evitar repetir los mismos H2 en ambas; la landing no debe llevar un glosario largo ni la guía un muro de CTAs.
- Un único enlace interno fuerte guía → landing; desde la landing, enlace contextual suave a la guía ("¿quieres entender el proceso?").
- Confirmar que ninguna de las dos canonicaliza a la otra (deben ser canónicas independientes).

## Detalles técnicos

- Archivo de configuración: `src/data/seo/moneyPages.ts` (entradas `path: "/cancelar-deudas"` y `path: "/cancelacion-de-deudas"`).
- Ajustar `h1`, `seoTitle`, `description` e `intent` si hace falta para reforzar la divergencia.
- El contenido renderizado de cada money page (plantilla SEO) es donde se materializan los bloques descritos; ahí se editan secciones y enlaces internos.
- Respetar reglas del proyecto: CTAs sin gradiente y que apuntan a `#hero-form`; no mezclar imágenes y diagramas en un mismo H2.

## Resultado esperado

Dos páginas con SERP propia: la guía capta búsquedas informativas de baja dificultad y las deriva a la landing transaccional, que concentra la conversión. Sin solapamiento de intención = sin canibalización.