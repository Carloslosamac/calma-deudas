## Objetivo

Alinear los 11 posts del blog al estándar SEO/CTR de las money pages, e incorporar recursos visuales de CTR en el SERP (emoji + separadores decorativos) como hacen competidores como Reparatudeuda (ej. "🥇 Ley segunda oportunidad 【 ACTUALIZACIÓN 2026 】").

## 1. Eliminar el sufijo "| Calma" en los posts

En `src/pages/BlogPost.tsx`, pasar `appendSiteName={false}` al `<Seo>` del artículo (línea ~93). Así liberamos caracteres para hook + decoración y el `seoTitle` es exactamente lo que ve Google.

## 2. Reescribir cada title/description contra el SERP real

Para cada post, estudiar el top 10 de su keyword principal (SERP analysis) e integrar+batir. Reglas: title <60 (contando emoji/símbolos), description <160, único, con hook diferenciador.

```text
guia-ley-segunda-oportunidad        -> ley de segunda oportunidad
reclamar-tarjeta-revolving          -> reclamar tarjeta revolving  (desc 195 -> recortar)
cancelar-microcreditos              -> cancelar microcreditos      (desc 163 -> recortar)
juicio-monitorio-deuda              -> juicio monitorio deuda      (desc 165 -> recortar)
deudas-hacienda-seguridad-social    -> deudas hacienda seguridad social (desc 176 -> recortar)
embargos-segunda-oportunidad        -> parar embargo               (desc 161 -> recortar)
cancelar-deudas-requisitos          -> cancelar deudas requisitos
salir-asnef                         -> salir de asnef
autonomos-con-deudas                -> autonomos con deudas
renegociar-acreedores               -> renegociar deudas
vida-despues-deuda                  -> vida despues de las deudas
```

Cada cambio toca solo `seoTitle` y `metaDescription` en `src/data/blog/posts/*.tsx`.

## 3. Recursos visuales de CTR en el title (emoji + separadores)

Confirmado por el SERP del competidor: Google sí muestra emoji y separadores 【 】 en titles. Aplicar con criterio:
- **Emoji**: 1 al inicio del title, temático y sobrio (⚖️ legal, 🛡️ embargo, ✅ requisitos, 📉 deuda, 🥇 guía de referencia). No abusar ni encadenar.
- **Separador decorativo**: usar 【 】 (u otro como «») para destacar el gancho de actualidad/valor, ej. "Ley de Segunda Oportunidad 【 2026 】". Solo cuando aporte (actualización, año, cifra), no en todos.
- **Aviso**: Google los renderiza de forma inconsistente y puede recortarlos; por eso el title debe leerse perfectamente igual aunque los quite. Nunca depender del emoji/símbolo para el significado.
- Vigilar la longitud real: emoji y 【 】 cuentan y pueden empujar al truncado.

## 4. Emoji también en la meta description

Un emoji relevante por description (Google los muestra), contando dentro de los 160 caracteres. Uno solo, temático, discreto.

## 5. Recorte inmediato de las 5 descriptions >160

reclamar-revolving (195), hacienda (176), monitorio (165), microcreditos (163), embargos (161) se recortan sí o sí, ya con emoji incluido en el conteo.

## Alcance / notas técnicas

- Se editan `BlogPost.tsx` (1 línea) y los campos `seoTitle`/`metaDescription` de los posts. No se toca cuerpo, imágenes ni lógica.
- Memoria respetada: sin marca "| Calma" en titles, hook diferenciador, title<60 / desc<160.
- Opcional: lanzar SEO scan tras los cambios para validar.
