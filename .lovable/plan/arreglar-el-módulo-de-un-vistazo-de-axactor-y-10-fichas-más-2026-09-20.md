# Arreglar el módulo "de un vistazo" de Axactor (y 10 fichas más)

## Qué ha pasado

Al pasar el módulo a información factual se dejaron de mostrar las tres valoraciones antiguas (presión de recobro, margen de negociación, riesgo de intereses abusivos). Eso fue intencionado: eran juicios sobre la conducta de cada empresa sin base verificable.

Pero además hay un fallo real: **11 fichas de recobro no tienen ficha de datos en el inventario nuevo**, así que el módulo no puede decir qué papel tiene la entidad y muestra "Por confirmar". Comprobado: de las 71 fichas de recobro, 60 tienen datos y estas 11 no:

kruk, eos, axactor, hoist-finance, procobro, iberia-collections, medina-cuadros, abanca-servicing, debt-consulting, an-cobros, norfin-holder

Son justo varias de las entidades más buscadas (KRUK, EOS, Axactor, Hoist). Por eso Axactor sale peor que antes: el bloque queda con un dato sin confirmar y dos frases genéricas.

## Qué voy a hacer

1. Completar los datos de las entidades que sí se pueden verificar con fuente pública (KRUK, EOS Spain, Axactor, Hoist Finance, Procobro, Medina Cuadros, Abanca Servicios Financieros, Norfin): tipo de entidad, papel, grupo, nombres anteriores, tipo de cartera, web oficial y fuentes. Con eso el módulo deja de decir "Por confirmar" y explica si compran deuda o la gestionan.
2. Las que no se puedan identificar como sociedad real (Iberia Collections, Debt Consulting, AN Cobros) se quedan sin afirmaciones, pero el bloque dirá de forma útil qué pedir por escrito en vez de un "Por confirmar" seco.
3. Enriquecer el módulo con los datos que ya tenemos y hoy no se muestran, cuando existan: grupo empresarial, tipo de deuda que suele gestionar, entidades de origen conocidas y fecha de última verificación.
4. No recupero las tres valoraciones antiguas tal cual (presión/negociación/usura) porque son opiniones sobre una empresa concreta; si quieres, puedo reinsertar "margen de negociación" ya presente, que es el equivalente factual.

## Detalle técnico

- `src/data/seo/recobroData.ts`: añadir las entradas faltantes de `RECOBRO_DATA` con `sources` y `lastVerifiedAt`.
- `src/data/seo/content/entityRatings.ts`: ampliar `getEntityRating` para recobro con indicadores adicionales derivados de los datos disponibles (grupo/cartera/origen), sin inventar nada cuando falte el dato.
- Verificación: script que confirme 71/71 fichas de recobro con datos y revisión en navegador de `/empresas-de-recobro/axactor`.
