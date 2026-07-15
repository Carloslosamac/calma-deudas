## Diagnóstico

Revisé los 111 posts publicados en `generated_posts` frente a la regla de taxonomía CTR del proyecto (`mem://design/ctr-title-meta-rule` + `mem://design/auto-title-quality`):

- title < 60 chars, sin "| Calma"
- meta < 160 chars
- hook diferenciador (emoji + power word + CAPS/urgencia tipo "YA/HOY/PASO A PASO"), no un patrón plano "Guía / Requisitos / Cómo hacer X"

### Posts fuera de taxonomía

**A. 12 posts SIN hook (empiezan con letra/número plano, patrón "Guía / Cómo / ¿…?")** — el que salía en tu screenshot está aquí:

| slug | seo_title actual |
|---|---|
| pasa-no-recoges-notificacion-juicio-monitorio | ¿Sin recoger la notificación del monitorio? Esto te pasará |
| notifica-juicio-monitorio-abogados-tus-deudas | Notificación del Juicio Monitorio: Guía Urgente y Qué Hacer |
| 5-maneras-frenar-un-embargo | Frenar un Embargo: Guía Urgente y Soluciones Reales en España *(61c)* |
| cual-plazo-oponerse-monitorio | Plazo para oponerse a un monitorio: no pierdas tu oportunidad *(61c)* |
| embargar-transferencia | ¿Te pueden embargar una transferencia bancaria? Tu dinero a salvo *(65c, meta 194c)* |
| soy-insolvente-embargar | ¿Insolvente? Entiende si pueden embargarte y cómo evitarlo |
| embargarte-coche-mas-10-anos | ¿Te pueden embargar un coche de más de 10 años? Resuelve tus dudas *(66c)* |
| posible-declararse-insolvente-no-pagar-multa | ¿Se puede ser insolvente para evitar pagar multas? |
| embargar-llevar-juicio-empresas-recobro | ¿Una empresa de recobro puede embargarte? La verdad sin rodeos *(62c)* |
| puedo-evitar-embargo-coche-poniendolo-nombre-mi-hijo | ¿Puedo evitar embargo de coche poniendo el coche a nombre de mi hijo? *(69c)* |
| banco-embargar-cuenta-otro-banco | ¿Puede un banco embargar mi cuenta en otra entidad? Aclara tus dudas *(68c)* |
| embargos-cuando-como-actuan-y-que-hacer | Embargos en cuentas: ¿Cuándo te quitan el dinero? |

**B. 34 posts con meta description > 160 chars** (sí tienen hook + emoji, pero meta demasiado larga → Google la trunca). Ejemplos: `sacar-dinero-cuenta-embargada` (213), `invest-capital-…` (214), `concurso-…-microempresas` (199), `primer-credito-tras-la-lso` (193), etc.

**C. 7 posts con seoTitle > 60 chars** — subconjunto de A/B, ya listados arriba con longitud.

## Plan

### Fase 1 — Reescribir los 12 posts sin hook (grupo A)
Aplicar taxonomía completa: emoji + power word + CAPS + urgencia. Nueva title <60, meta <160. Ejemplos:

- `pasa-no-recoges-notificacion-juicio-monitorio` → `⚠️ Ignoras el monitorio: esto pasa en 20 días`
- `5-maneras-frenar-un-embargo` → `🛑 Frenar un embargo YA: 5 vías que funcionan`
- `cual-plazo-oponerse-monitorio` → `⏳ Monitorio: tienes 20 días para oponerte`
- `embargar-transferencia` → `🛑 ¿Pueden embargar tu transferencia? La verdad`
- `soy-insolvente-embargar` → `⚖️ Insolvente: ¿pueden embargarte igual? SÍ o NO`
- `embargarte-coche-mas-10-anos` → `🚗 ¿Coche de +10 años? Así lo salvas del embargo`
- `posible-declararse-insolvente-no-pagar-multa` → `🚦 ¿Insolvente = adiós multas? La verdad`
- `embargar-llevar-juicio-empresas-recobro` → `⚖️ Empresas de recobro: ¿te pueden embargar YA?`
- `puedo-evitar-embargo-coche-poniendolo-nombre-mi-hijo` → `🚗 ¿Coche a nombre de tu hijo? Cuidado con esto`
- `banco-embargar-cuenta-otro-banco` → `🏦 ¿Tu banco embarga cuentas en OTRO banco?`
- `embargos-cuando-como-actuan-y-que-hacer` → `💰 Embargo en tu cuenta: cuándo y cómo actúan`
- `notifica-juicio-monitorio-abogados-tus-deudas` → `📬 Notificación de monitorio: qué hacer YA`

Meta descriptions: reescritas <160 chars con emoji inicial + beneficio + CTA suave ("Analizamos tu caso gratis").

### Fase 2 — Acortar 34 metas > 160 chars (grupo B)
Truncado inteligente conservando: emoji inicial + gancho + CTA. Objetivo 140–158 chars.

### Fase 3 — Reforzar generación futura
Actualizar el prompt en la edge function `generate-daily-posts` (donde vive `sanitizeTitle`) para forzar:
- title/seoTitle ≤ 58 chars (buffer)
- meta ≤ 155 chars
- prefijo emoji obligatorio + al menos una palabra en CAPS o urgencia
- rechazar patrones planos "Guía / Cómo hacer / Qué es"

Así los próximos posts nacen con taxonomía.

## Entrega técnica

- **Una sola migración SQL** con `UPDATE generated_posts SET seo_title=…, meta_description=… WHERE slug=…` para los ~46 slugs (grupo A + B, deduplicado).
- Edición de la edge function `generate-daily-posts` (prompt + validación de longitud/emoji).
- Sin cambios en frontend: los componentes ya leen `seoTitle`/`metaDescription` del row.

## Alcance / no-alcance

- **Sí:** reescritura CTR de title + meta para los 46 posts detectados; endurecer prompt de generación.
- **No:** tocar cuerpo del artículo, H2/H3, FAQ, imágenes, ni los 15 posts estáticos de `src/data/blog/posts/*` (ya cumplen taxonomía).
- **No:** cambiar slugs (rompería URLs indexadas).

## Verificación

Tras aplicar la migración, `SELECT` que confirme: 0 posts con `length(seo_title) > 60`, 0 con `length(meta_description) > 160`, 0 sin emoji al inicio. Rescan SEO opcional para revalidar.
