## Objetivo

Reducir el solapamiento textual entre las 20 landings por ciudad para alejarlas del patrón "doorway/duplicado", combinando **dos palancas**: (1) más contenido genuinamente único por ciudad y (2) rotación de la redacción del armazón para que las frases plantilla no sean clónicas. Se mantienen las 20 ciudades.

Meta práctica: pasar de ~15-20 % de texto único a ~40-50 %, y que ninguna pareja de ciudades comparta párrafos idénticos palabra por palabra.

## 1. Más datos únicos por ciudad (`src/data/seo/localizaciones.ts`)

Ampliar el tipo `Localizacion` y el objeto `localExtra` (ya existe) con 2 campos nuevos, cualitativos y verificables (sin estadísticas inventadas):

- `audienciaProvincial`: referencia real a la Audiencia Provincial / criterio judicial de esa provincia (p. ej. "la Audiencia Provincial de Valencia").
- `ejemploCaso`: caso típico anonimizado propio del tejido económico local (p. ej. en Vigo, autónomo del sector del mar; en Elche, taller de calzado). Una o dos frases únicas por ciudad.

Esto da material para un bloque que solo tiene sentido en esa ciudad.

## 2. Rotación de redacción del armazón (`src/data/seo/content/localizacionContent.tsx`)

Hoy todas las ciudades comparten exactamente las mismas frases plantilla (intro, "cómo trabajamos", "honorarios", FAQ). Introducir un **selector determinista de variante** por ciudad para que el texto base cambie entre ciudades pero sea estable para cada URL (importante: nada aleatorio en cada carga, eso confunde a Google).

- Helper `pickVariant(city, variants[])` que elige índice por el `rank` o un hash del `slug` (módulo nº de variantes). Determinista y repartido.
- Crear **3-4 variantes redactadas** para cada bloque de armazón: `intro`, cuerpo de "Abogados... en {ciudad}", "Cómo trabajamos tu caso", "Honorarios y plazos", y las respuestas de las 4 FAQ.
- Cada variante mantiene el mismo mensaje legal y los mismos CTAs/enlaces internos, solo cambia la estructura y el fraseo.

Resultado: dos ciudades cualesquiera reciben combinaciones distintas de fraseo + sus datos locales únicos.

## 3. Nuevo bloque único: "Casos frecuentes en {ciudad}"

Añadir una sección alimentada por `ejemploCaso` + `audienciaProvincial`, que describe el tipo de caso real que más se ve en esa ciudad y cómo lo aborda el criterio judicial provincial. Es contenido que no encaja en ninguna otra ciudad → máxima señal de unicidad.

## 4. Afinar metadatos por ciudad (`src/pages/seo/LocalizacionPage.tsx`)

`seoTitle` y `metaDescription` hoy son idénticos salvo el nombre de ciudad. Rotar también la `metaDescription` con 2-3 variantes (mismo `pickVariant`) e incluir la provincia, para que los snippets no sean clónicos en la SERP.

## Lo que NO cambia

- Routing, sitemap, schema (ya quedó como service-area en el paso anterior) y estructura de la plantilla.
- El mensaje honesto: atención online a ciudad y provincia, sin oficina física.

## Recordatorio (fuera de código)

La diferenciación on-page reduce el riesgo de duplicado, pero lo que **desactiva** el riesgo de doorway de raíz es la señal de entidad real: Google Business Profile, citaciones NAP y reseñas. Lo dejo anotado; no es parte de esta implementación.

---

### Detalles técnicos (resumen)

- `localizaciones.ts`: +2 campos (`audienciaProvincial`, `ejemploCaso`) en el tipo, en `localExtra` (20 entradas) y en el `Omit` de `cities`.
- `localizacionContent.tsx`: helper `pickVariant`, arrays de variantes para intro/secciones/FAQ, nueva sección "Casos frecuentes en {ciudad}".
- `LocalizacionPage.tsx`: `metaDescription` rotada por variante.
- Sin tocar backend ni rutas.
</content>
<summary>Plan para diferenciar las 20 landings por ciudad: nuevos datos únicos (audiencia provincial, caso típico local), rotación determinista del fraseo del armazón y las metadescripciones, y un bloque "Casos frecuentes en {ciudad}".</summary>
</invoke>
