## Objetivo

Quitar el emoji inicial de la `metaDescription` de los 11 posts del blog, manteniendo intactos los emojis y separadores de los `seoTitle`.

## Cambios

En cada `src/data/blog/posts/*.tsx`, eliminar el emoji + espacio del inicio del campo `metaDescription`:

```text
guia-ley-segunda-oportunidad        🟢 -> (quitar)
reclamar-tarjeta-revolving          ⚖️ -> (quitar)
cancelar-microcreditos              🛑 -> (quitar)
juicio-monitorio-deuda              📩 -> (quitar)
deudas-hacienda-seguridad-social    ✅ -> (quitar)
embargos-segunda-oportunidad        🛡️ -> (quitar)
cancelar-deudas-requisitos          📋 -> (quitar)
salir-asnef                         ✅ -> (quitar)
autonomos-con-deudas                💼 -> (quitar)
renegociar-acreedores               🤝 -> (quitar)
vida-despues-deuda                  🌱 -> (quitar)
```

Los `seoTitle` (con su emoji y 【 】) no se tocan.

## Notas técnicas

- Solo se editan los campos `metaDescription` de los archivos de datos de posts.
- Actualizar la memoria `mem://design/ctr-title-meta-rule` para reflejar: emoji permitido en title, NO en description.
