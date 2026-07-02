# Plan: siguiente empujón SEO (3 frentes)

Basado en datos reales de Search Console (últimos 28 días). Las ciudades con tracción real resultaron ser distintas de las que teníamos codificadas.

## Datos que mandan (GSC, impresiones · posición)
- a-coruña 122·59 · almería 79·67 · vigo 75·63 · murcia 72·78 · **donostia 70·47** · barcelona 63·84 · burgos 50·62 · sevilla 46·92 · granada 42·65 · oviedo 41·72 · alicante 34·91 · valencia 32·80 · las-palmas 20·60 · santander 13·50 · palma 12·66 · gijón 10·53
- Entidades ya en página 1 sin clics: **ING (pos 9.1, 53 impr)**, **imagin-card (pos 8.9, 39 impr)** → oro para CTR.
- Home pos 5.4 con 72 impr y solo 4 clics.

---

## Frente A — Subir posiciones locales

**A1. Corregir la lista de ciudades con tracción (bug de datos).**
`TRACTION_CITIES` en `LocalizacionPage.tsx` hoy es una suposición (granada, a-coruna, barcelona, sevilla, almeria, murcia, vigo). Sustituir por la lista real ordenada por impresiones, añadiendo las que faltan: **donostia, burgos, oviedo, alicante, valencia, las-palmas, santander, palma, gijón**. Esto reorienta el enlazado interno hacia las páginas que de verdad pueden subir.

**A2. Arreglar el duplicado de trailing slash.**
Barcelona indexa como `/barcelona` y `/barcelona/` a la vez, partiendo señales. Añadir una redirección/canonicalización sin barra final (revisar `ScrollToTop`/router y confirmar que el canonical siempre va sin `/`). Aplica a todo el cluster local.

**A3. Profundizar contenido único en las 6-8 ciudades top.**
Las locales comparten armazón con variantes → Google las hunde. Para a-coruña, almería, vigo, murcia, donostia, barcelona, burgos, sevilla añadir bloques genuinamente locales en `localizacionContent.tsx`: juzgado de lo mercantil concreto, dato económico local, FAQ específica de la ciudad y prueba social cercana. Granada ya es la más rica → usarla de plantilla.

**A4. Bloque de respuesta directa (AEO)** en las locales que aún no lo tengan, para featured snippets.

---

## Frente B — Reescribir títulos/meta CTR (páginas con impresiones)

Aplicar el patrón acordado (1 emoji + keyword + power word, <60 / <160, sin "| Calma", gancho diferenciador) a:

**B1. Páginas de entidad ya en página 1** (máxima prioridad, clics inmediatos): ING y imagin-card, y el resto de entidades bancos/revolving con impresiones. Están en pos. 9 sin un solo clic → el título es el problema.

**B2. Locales con más impresiones** (a-coruña, almería, vigo, murcia, donostia…): revisar que el título gane a los del top 10 mientras suben.

**B3. Home** (pos 5.4, 72 impr, 4 clics): reescribir title/description para exprimir más clics.

Además: **B4. Limpiar el slug con nombre de competidor** `/blog/5-maneras-frenar-embargo-misolvencia` (viola la regla de no-competidores). Renombrar slug + redirección 301 del antiguo.

---

## Frente C — Acelerar producción

Hoy `DAILY_DISTRIBUTION = [3,4,4,5,5,5,5,6,6,7]` (media ~5/día) con 998 temas en cola.

**C1. Subir la cadencia** a una media ~8-10/día (p. ej. `[7,8,8,9,9,10,10,11,12]`), priorizando los clusters con demanda real: revolving/usura, embargos, microcréditos, LSO.
**C2. Verificar** que el generador ya aplica el patrón de títulos agresivo y validación <60 (lo reforzamos antes) para no meter deuda de CTR al acelerar.
**C3. Vigilar coste/calidad**: al subir volumen, confirmar que las imágenes y el pipeline aguantan; dejar la distribución parametrizable por si hay que frenar.

---

## Orden de ejecución
1. A1 + A2 (bug de datos + duplicado) — base limpia, cambio pequeño y de alto impacto.
2. B1 + B3 + B4 (CTR de páginas en página 1 y home + slug competidor) — clics esta semana.
3. A3 + A4 (profundizar 6-8 ciudades) — subida estructural de posiciones.
4. C1-C3 (acelerar generador).
5. Reenvío de sitemap + IndexNow de las URLs tocadas y verificación en `/admin/indexacion`.

## Detalles técnicos
- `src/pages/seo/LocalizacionPage.tsx`: actualizar `TRACTION_CITIES`.
- Router/canonical: normalizar trailing slash (revisar `src/App.tsx`, `ScrollToTop`, `Seo.tsx`).
- `src/data/seo/content/localizacionContent.tsx` + `localizaciones.ts`: campos y bloques locales por ciudad.
- Entidades: `src/data/seo/entities.ts` + `EntityPage.tsx` (títulos/meta).
- Home: `index.html` / componente de Index para title-meta.
- Blog: renombrar slug en el post y añadir redirect.
- `supabase/functions/generate-daily-posts/index.ts`: `DAILY_DISTRIBUTION`.
- Cierre: `sitemap-blog`, `indexnow-submit`.
