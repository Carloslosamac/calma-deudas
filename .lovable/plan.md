## Objetivo

Dos frentes en paralelo, con mezcla de quick wins y mejora estructural:
1. **Cerrar el panel de indexación** — que los números cuadren y signifiquen algo claro.
2. **Subir posiciones SEO** — reforzar las páginas que ya reciben impresiones (pos. 50-90) y consolidar las que ya rankean (pos. 2-3).

---

## Frente 1 — Panel de indexación coherente

### El problema real
El panel usa un único campo `done` con dos significados a la vez:
- "La he solicitado manualmente en Search Console" (lo marcas tú con el check).
- "Google dice que está indexada" (lo escribe el proceso automático).

El cron/`gsc-index-status` hace `done = indexed`, así que pisa tus marcas manuales. Por eso el contador de arriba ("X de 214 solicitadas") no cuadra con el desglose de abajo ("indexadas / no indexadas / sin comprobar"). Hoy hay 43 inspeccionadas (27 indexadas, 10 no, 6 sin veredicto) pero 32 marcadas como "done".

### Solución
Separar los dos conceptos para que cada número signifique una sola cosa:

- **`requested` (manual)**: solo lo cambias tú con el check. El proceso automático **no lo toca**.
- **`indexed` (real, de Google)**: solo lo escribe la inspección automática.

Cambios:
1. **Migración**: añadir columna `requested` (boolean) + `requested_at` a `seo_index_checks`; copiar a `requested` las marcas manuales actuales (las que tienen `done_at` pero no provienen de inspección no se pueden distinguir perfectamente; se hace mejor esfuerzo: `requested = done`). El proceso automático deja de escribir `done`.
2. **Edge function `gsc-index-status`**: dejar de escribir `done`/`done_at`. Solo actualiza `indexed`, `verdict`, `coverage_state`, `last_crawl_time`, `last_inspected_at`.
3. **Panel `/admin/indexacion`**: reescribir el resumen para que sea inequívoco:
   - Tarjeta 1 — **Solicitudes manuales**: "X de 214 solicitadas en GSC" (campo `requested`), barra de progreso. Esto es tu checklist de trabajo.
   - Tarjeta 2 — **Estado real en Google**: "Indexadas: 27 · No indexadas: 10 · Sin comprobar: 177" (campo `indexed`). Cuadrará siempre: indexadas + no_indexadas + sin_comprobar = 214.
   - El check de cada fila controla `requested`; el badge (Indexada / No indexada) refleja `indexed`. Conceptos visualmente separados.
4. Texto de ayuda actualizado para explicar la diferencia entre las dos columnas.

Resultado: dos contadores que nunca se contradicen.

---

## Frente 2 — Subir posiciones SEO

Estrategia: concentrar autoridad interna en las páginas que **ya tienen impresiones** para empujarlas de página 5-9 a página 1, y blindar las que ya ganan.

### Quick wins (esta semana)
1. **Enlazado interno dirigido**: añadir enlaces contextuales desde las páginas fuertes (home pos. 2,9; `/reunificar-deudas`; `/asnef/salir-de-asnef`) y desde el cluster LSO hacia las **páginas locales con tracción** (Granada, A Coruña, Barcelona, Sevilla, Almería, Murcia, Vigo). Usar `internalLinks.ts` + `RelatedResources`, respetando las reglas anti-canibalización ya definidas.
2. **CTR en SERP**: revisar y reescribir títulos/meta de las páginas locales que ya reciben impresiones para ganar clics mientras suben (patrón ya acordado: hook diferenciador, <60 / <160, sin "| Calma").
3. **Página modelo (Granada)**: enriquecer la localización con más contenido único (datos locales, FAQ específica, prueba social) y usarla como plantilla para el resto del cluster local.

### Mejora estructural
4. **Profundidad de contenido en el cluster local**: las páginas locales son casi idénticas salvo el nombre de ciudad → Google las posiciona bajo. Añadir bloques de contenido genuinamente local (juzgados de lo mercantil de la zona, datos, casos cercanos) a las ciudades con impresiones para diferenciarlas.
5. **Bloques de respuesta directa (AEO)** en las locales y money pages que aún no los tengan, para captar featured snippets / respuestas IA.
6. **Verificación**: tras los cambios, reenviar sitemap, lanzar IndexNow para las URLs tocadas y comprobar estado en el panel ya saneado.

---

## Orden de ejecución sugerido
1. Migración + edge function + panel (Frente 1) — base limpia de medición.
2. Enlazado interno dirigido + CTR locales (quick wins Frente 2).
3. Enriquecer Granada como modelo y replicar a 2-3 ciudades con más impresiones.
4. Reenvío de sitemap + IndexNow + verificación en el panel.

## Detalles técnicos
- `seo_index_checks`: nueva columna `requested boolean default false`, `requested_at timestamptz`. RLS ya existente se mantiene.
- `supabase/functions/gsc-index-status/index.ts`: quitar `done`/`done_at` del upsert.
- `src/pages/AdminIndexacion.tsx`: query incluye `requested`; `toggle` escribe `requested`/`requested_at`; resumen con dos tarjetas independientes.
- SEO: `src/data/seo/internalLinks.ts`, `src/data/seo/localizaciones.ts`, `src/data/seo/content/localizacionContent.tsx`, componentes `RelatedResources`/`SeoPageScaffold`.
