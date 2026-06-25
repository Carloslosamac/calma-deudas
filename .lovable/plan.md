## Objetivo

Añadir a la cola de generación (`seo_roadmap`, estado `en_cola`) un artículo de blog sobre **deudas contraídas por la pareja que después hay que afrontar en solitario**, con enfoque completo: responsabilidad legal por las deudas del cónyuge/pareja, reparto de deudas tras ruptura/divorcio, y solución vía Ley de Segunda Oportunidad.

El generador diario (`generate-daily-posts`) lo recogerá automáticamente, lo redactará con IA siguiendo las reglas del proyecto (título agresivo <60 chars + emoji, contenido long-form SEO, FAQ con schema, CTA al `#hero-form`, imagen hero hiperrealista) y lo publicará en su turno por prioridad **Media**.

## Implementación

Insertar una fila en `seo_roadmap` mediante una migración con estos valores:

- **titulo:** `⚖️ Deudas de tu pareja: ¿las pagas tú solo?`
  (cumple <60 chars, 1 emoji legal, sin branding, con gancho de pregunta)
- **cluster:** `ley-segunda-oportunidad`
- **intencion:** `informacional-transaccional`
- **tipo_pagina:** `blog`
- **prioridad:** `Media`
- **estado:** `en_cola`
- **url_sugerida:** `/blog/deudas-pareja-afrontar-solo`
- **entidad:** (vacío)
- **keywords:** términos de cola larga del ángulo elegido, p. ej.:
  `soy responsable de las deudas de mi pareja`, `deudas del cónyuge tras divorcio`, `quién paga las deudas comunes en una separación`, `deudas gananciales vs privativas`, `cancelar deudas de mi expareja segunda oportunidad`

El brief temático que se inyectará (vía `titulo` + `intencion` + `keywords`) cubrirá los tres bloques acordados:
1. **Responsabilidad legal** — deudas gananciales vs. privativas, qué te pueden reclamar, aval/codeudor.
2. **Ruptura/divorcio** — cómo se reparten las deudas comunes y qué pasa si te quedas pagando solo.
3. **Solución** — usar la Ley de Segunda Oportunidad para exonerar deudas asumidas por la pareja/ex (alineado con el triaje del proyecto: insolvente + sin bienes pagados → LSO).

## Notas técnicas

- Cambio mínimo: una sola fila insertada en `seo_roadmap`. No se toca el código del generador ni componentes.
- Como es una inserción de datos en tabla existente, se hará vía migración (operación de escritura).
- La redacción real (secciones, FAQ, meta, hero) la produce la IA del generador cuando llegue su turno; no se escribe contenido a mano.
- Opcional: si quieres verlo publicado ya, se puede lanzar la generación manualmente desde `/admin` ("Lanzar generación") tras encolarlo, aunque al ser prioridad Media saldrá después de las de prioridad Alta pendientes.
