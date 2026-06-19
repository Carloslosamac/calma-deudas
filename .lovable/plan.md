# Emojis en los 15 títulos de money pages

Aplicar tu decisión: incluir un emoji en **cada uno** de los 15 `seoTitle` de las money pages, manteniendo títulos sin branding "| Calma", con su gancho diferenciador y por debajo de 60 caracteres (el emoji cuenta ~2).

## Aviso honesto (que ya hablamos)
Google filtra los emojis del título en la mayoría de SERPs YMYL (legal/financiero), así que es probable que muchos usuarios no los vean en los resultados. Aun así se implementa porque es tu decisión; si tras unas semanas en Search Console no se reflejan, lo revisamos.

## Títulos propuestos (con emoji, sin "| Calma", <60 car)

| Ruta | Nuevo title |
|---|---|
| /ley-segunda-oportunidad | 🕊️ Ley de Segunda Oportunidad: cancela tus deudas |
| /abogados-ley-segunda-oportunidad | ⚖️ Abogados de Segunda Oportunidad: análisis gratis |
| /cancelar-deudas | ✅ Cancelar deudas: qué salida legal te conviene |
| /cancelacion-de-deudas | ✅ Cancelación de deudas: cuándo puedes y cómo |
| /reunificacion-deudas | 🔗 Reunifica tus deudas sin pedir otro préstamo |
| /reunificar-deudas | 📉 Reunificar deudas: baja tu cuota y lo que debes |
| /asnef/salir-de-asnef | 🧹 Salir de ASNEF para siempre: pasos que funcionan |
| /embargos/parar-embargo | 🛑 Parar un embargo: qué hacer hoy para frenarlo |
| /tarjetas-revolving/cancelar-tarjetas-revolving | 💳 Cancela tu tarjeta revolving y recupera lo pagado |
| /microcreditos-prestamos/cancelar-microcreditos | 🔁 Cancelar microcréditos abusivos y salir del bucle |
| /ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho | 🧾 Exoneración del pasivo: qué borra y cómo |
| /autonomos-concurso-acreedores/concurso-persona-fisica | ⚖️ Concurso de persona física: cuándo y cómo pedirlo |
| /juicio-monitorio-recobro/juicio-monitorio-deuda | ⏳ Juicio monitorio: cómo responder antes de 20 días |
| /deudas-hacienda-seguridad-social/deudas-hacienda | 🏛️ Deudas con Hacienda: cómo aplazarlas o cancelarlas |
| /deudas-hacienda-seguridad-social/deudas-seguridad-social | 🏛️ Deudas con la Seguridad Social: opciones reales |

## Cambios técnicos
- Editar los 15 campos `seoTitle` en `src/data/seo/moneyPages.ts`.
- No se tocan los builders de JSON-LD ni los componentes; los títulos fluyen por Helmet automáticamente.
- Verificar que cada título queda <60 caracteres y renderiza en `<head>` en una money page de muestra.

## Memoria
- Actualizar `mem://design/ctr-title-meta-rule`: registrar la preferencia del usuario de incluir emoji en los títulos de money pages (decisión explícita pese al aviso de filtrado en SERPs YMYL).

Si quieres ajustar algún emoji concreto antes de implementar, dímelo; si no, lo aplico tal cual.