## Objetivo

Tres ampliaciones del sistema de contenido:

1. Meter en la cola los artículos pendientes de la guía pilar de Ley de Segunda Oportunidad como **prioridad Alta**.
2. Crear **guías pilar** (como `/blog/guia-ley-segunda-oportunidad`) para las 4 money pages clave, **cada una con diagramas a medida** orientados a maximizar la ayuda según su intención.
3. Generar **casos de éxito** habitualmente (1-2 al día), al margen del blog, con ~50% Ley de Segunda Oportunidad y el resto un mix.

---

## Parte 1 — 44 artículos LSO a la cola (prioridad Alta)

El pilar `/blog/guia-ley-segunda-oportunidad` tiene un `ContentHub` con 10 grupos × 5 = 50 subtemas. 6 ya enlazan a posts existentes; quedan **44 sin realizar**.

- Insertar esos 44 títulos en `seo_roadmap` con: `cluster = 'ley-segunda-oportunidad'`, `tipo_pagina = 'blog'`, `prioridad = 'Alta'`, `estado = 'en_cola'`, `intencion = 'informativa'`.
- Antes de insertar, comprobar que el `titulo` no exista ya (evitar duplicados).
- Se publican antes en cada ejecución diaria por ser Alta.

---

## Parte 2 — Guías pilar a medida para 4 money pages (diagramas ad-hoc)

Money pages objetivo:
- `/reunificacion-deudas`
- `/cancelar-deudas`
- `/tarjetas-revolving/cancelar-tarjetas-revolving`
- `/microcreditos-prestamos/cancelar-microcreditos`

Decisión confirmada: **diagramas ad-hoc por cada guía**, diseñados para la intención concreta de cada tema (no se reutiliza un set genérico). Por eso cada pilar se construye **a mano**, igual que el de LSO (que es un `BlogPost` redactado en código con sus propios diagramas React), no por el generador automático.

Para cada una de las 4 guías:
1. Nuevo archivo `src/data/blog/posts/<slug>.tsx` con un `BlogPost` largo (estructura, FAQ, `tldr`, `keyTakeaways`, `ContentHub` de subtemas, sidebar, fuentes), siguiendo el patrón del pilar LSO.
2. **Diagramas a medida** por guía, añadidos a `src/components/blog/diagrams/` (componentes nuevos específicos del tema). Ejemplos orientados a la intención:
   - Reunificación: simulador visual cuota antes/después, barra "qué baja: cuota y total", comparativa reunificar vs refinanciar vs LSO.
   - Cancelar deudas: árbol de decisión LSO vs reunificar vs reclamación (triage), matriz insolvencia × bienes.
   - Revolving: gráfico de interés compuesto/coste real, línea temporal de reclamación, qué se recupera.
   - Microcréditos: bucle de deuda (spiral), TAE comparada, ruta de salida.
3. Registrar cada post en `src/data/blog/index.ts`, imagen hero en `src/assets`, y SEO (title <60, meta <160, sin "| Calma").
4. Enlazar cada money page a su guía pilar (como la money page LSO enlaza a `/blog/n`): añadir el enlace en el contenido de la money page correspondiente (`reunificacionDeudas.tsx` / `reunificarDeudas.tsx`, `cancelarDeudas.tsx` / `cancelacionDeDeudas.tsx`, `cancelarTarjetasRevolving.tsx`, `cancelarMicrocreditos.tsx`).
5. Cross-linking entre la guía pilar, sus subtemas y casos relacionados vía el sistema de `internalLinks`.

Nota de alcance: son 4 guías largas + sus diagramas a medida; se pueden entregar por fases (una money page por iteración) si prefieres revisarlas de una en una.

---

## Parte 3 — Casos de éxito diarios (1-2/día)

Hoy los casos son archivos `.tsx` estáticos. Para generarlos a diario sin tocar código en cada uno:

1. **Nueva tabla** `generated_casos` (espejo de `CasoExito`): `slug`, `category`, `name`, `location`, `debt_amount`, `solution`, `headline`, `dek`, `read_time`, `hero_alt`, `sections jsonb` (con `html`), `faq jsonb`, `keywords`, `seo_title`, `meta_description`, `status`, `published_at`, timestamps. Con GRANTs (`anon`/`authenticated` SELECT, `service_role` ALL), RLS y políticas (lectura pública de publicados; gestión solo service_role/admin).
2. **Capa de fetch** `src/data/casos/dbCasos.ts` (como `dbPosts.ts`) que convierte filas a `CasoExito`, con `CATEGORY_HERO` por solución.
3. **Render**: `CasosExito.tsx` y `CasoExitoPost.tsx` combinan casos estáticos + de BD; `CasoExitoPost` debe soportar `section.html` (hoy solo pinta `section.body`).
4. **Nueva edge function** `generate-daily-casos`: 1-2 casos/ejecución. Reparto: ~50% "Segunda oportunidad", resto mix (Revolving, Microcréditos, Embargos, ASNEF, Hacienda, Reunificación). Nombre de pila anonimizado + ciudad española + importe representativo, siguiendo el estilo de los casos actuales y el triage de soluciones. Registra cada ejecución en `generator_runs` con `source = 'casos'`.
5. **Cron**: programar la función con `pg_cron`/`pg_net` (1 ejecución diaria → 1-2 casos), vía herramienta de inserción (incluye URL + anon key), no por migración.
6. **Health dashboard** (`AdminHealth.tsx`): mostrar también las ejecuciones de casos filtrando por `source`.

---

## Detalles técnicos

- **Inserción de datos** (44 LSO + cron): herramienta de inserción, no migración.
- **Cambios de esquema** (tabla `generated_casos`): migración con GRANTs + RLS en el mismo paso.
- **Pilares**: hechos a mano en código (no usan `generated_posts`); por eso pueden tener diagramas React a medida.
- **No fabricar cifras agregadas de Calma**: los importes de cada caso son del caso individual representativo (como los casos actuales), no estadísticas globales.
- **SEO/CTR**: cada pilar y caso optimiza `title` (<60) y `meta_description` (<160) estudiando el top 10; sin branding en el título.

## Fuera de alcance (confirmo si lo quieres)

- Reescribir los 44 enlaces del hub LSO para apuntar a los slugs nuevos según se publiquen.
- Panel para editar/curar casos generados antes de publicarlos (se publican directos salvo que lo pidas).
