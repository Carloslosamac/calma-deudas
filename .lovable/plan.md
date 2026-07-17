## Resumen de decisiones

- **Grupo 1 (telegráficos):** reescribir solo `title` / `seo_title` / `meta_description`. Mismo slug, mismo contenido interno. Cambio en `generated_posts`.
- **Grupo 3 (noticias caducadas):** regenerar completo → mando el roadmap a `pendiente` con un título evergreen y el cron los republica.
- **Grupo 4 (off-topic):** mantener como están, no toco nada.
- **Marcas/gramática (Endesa, Title Case):** no tocar.

## Grupo 1 — Reescritura de títulos (7 posts)

Actualizo `title`, `seo_title` y `meta_description` en `generated_posts`. Todos con la regla CTR (title <60, desc <160, sin "| Calma").

| Actual | Propuesto |
|---|---|
| Monedo Now cierre | Monedo Now cierra: qué pasa con tu deuda y cómo reclamar |
| Monedo Now denuncias | Denuncias contra Monedo Now: motivos frecuentes y cómo actuar |
| Twinero no funciona | Twinero no funciona: alternativas y qué hacer con tu préstamo |
| Qué significa la deuda post concursal | Deuda post concursal: qué es y cómo afecta tras la Ley de Segunda Oportunidad |
| Así podrás saber las deudas que tienes | Cómo saber todas las deudas que tienes a tu nombre en 2026 |
| Te contamos qué significa el concepto inflación | Qué es la inflación y cómo afecta a tus deudas y ahorros |
| Toda la información sobre si las pagas extras son embargables | ¿Se pueden embargar las pagas extras? Límites y protección legal |

## Grupo 3 — Regeneración a evergreen (3 posts)

Estos 3 posts son noticias caducadas. Los tira ahora, cambio el `titulo` del roadmap por uno evergreen y los devuelvo a `pendiente` para que el cron los republique como guía atemporal.

| Actual (roadmap) | Nuevo tema evergreen |
|---|---|
| El tribunal europeo respalda el doble control en situaciones específicas de cláusulas abusivas | Cláusulas abusivas en hipotecas y préstamos: cómo reclamarlas |
| Aumenta el número de personas que piden préstamos personales para poder irse de vacaciones | Préstamo personal para vacaciones: riesgos y alternativas si no puedes pagar |
| La subida de los precios impulsa a los españoles a buscar más créditos, pluriempleo y horas extras | Cómo la inflación empuja al endeudamiento: guía para no caer en la espiral |

## Ejecución

1. **Un solo insert** con 7 `UPDATE` en `generated_posts` (grupo 1) — cambio `title`, `seo_title`, `meta_description` para cada uno.
2. **Un segundo insert** con:
   - `DELETE` de los 3 posts del grupo 3 en `generated_posts`.
   - `UPDATE` en `seo_roadmap` para poner sus 3 filas a `estado='pendiente'`, `titulo=` nuevo evergreen, `attempts=0`, `last_error=NULL`, `post_slug=NULL`.
3. Sin cambios en código: el pipeline actual ya sanitiza competidores y ya aplica la política CTR en títulos.

## Verificación

Al terminar: `SELECT id, title FROM generated_posts WHERE id IN (...)` para confirmar los 7 nuevos títulos, y `SELECT id, titulo, estado FROM seo_roadmap WHERE id IN (...)` para confirmar los 3 evergreen en `pendiente`.
