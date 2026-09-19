# Local SEO v2 para las landings de ciudad

Ampliar las 41 landings existentes de `/abogados-ley-segunda-oportunidad/{ciudad}` sin crear URLs nuevas ni rediseñar nada: más cobertura semántica local, datos locales centralizados en un único dataset y un bloque de "Caso real" integrado en la propia página.

## Situación actual (verificada)

- Hay 41 ciudades en `src/data/seo/localizaciones.ts` con: provincia, comunidad, tribunal, sede judicial, zonas, perfil de deuda, prefijo, audiencia provincial, nota local y ejemplo de caso.
- La plantilla `src/pages/seo/LocalizacionPage.tsx` genera title, meta, TL;DR, datos estructurados y enlaces.
- El contenido lo construye `src/data/seo/content/localizacionContent.tsx`, con un bloque de enriquecimiento manual solo para unas pocas ciudades (A Coruña, Málaga…).
- Existen 16 casos de éxito reales en `src/data/casos/posts/` (Barcelona, Sabadell, Sevilla, Bilbao, Valencia x3, Madrid x3, Zaragoza, Murcia, Málaga, Alicante, Valladolid, Granada). Hoy no se muestran dentro de las landings de ciudad.
- No hay aliases geográficos ni municipios cercanos como campos estructurados: las "zonas" mezclan barrios y municipios.

## Qué se va a hacer

### 1. Un único dataset local ampliado

Añadir a cada ciudad, en el mismo archivo de datos, los campos:
`geoAliases`, `nearbyMunicipalities`, `localIntentVariants`, `courtInfo`, `localResources`, `localFaqs`, `localStats`, `localCase`.

Todos opcionales: si una ciudad no tiene un dato, la sección simplemente no aparece. Añadir una ciudad nueva será rellenar una ficha; no habrá que tocar componentes.

### 2. Aliases geográficos

Cada ciudad absorbe sus variantes en su única URL (A Coruña / La Coruña / Coruña; Donostia / San Sebastián / Donostia-San Sebastián; Vitoria / Vitoria-Gasteiz; Girona / Gerona; Lleida / Lérida; Ourense / Orense; A Coruña → Galicia; etc.), más provincia en sus dos denominaciones cuando existan (Gipuzkoa/Guipúzcoa, Araba/Álava). Los aliases se usan de forma natural en texto, FAQs y metadatos, nunca en lista repetida.

### 3. Cobertura semántica ampliada

Sin cambiar la estructura de secciones, se enriquece la redacción para cubrir las familias de intención: ley segunda oportunidad, abogado/abogados segunda oportunidad, cancelar deudas, cancelación de deudas, abogado/abogados deudas, abogado insolvencia — cada una en su ciudad, provincia y comunidad. Se revisan H2/H3 existentes y el cuerpo, sin keyword stuffing.

### 4. Municipios cercanos

Lista real de municipios del área de influencia por ciudad (ej. Ferrol, Santiago, Arteixo, Oleiros para A Coruña). Se integran en la sección de zonas y en una FAQ de tipo "¿también atendéis {municipio}?". No se crean URLs.

### 5. FAQ local

Se amplía el bloque de FAQ actual con preguntas locales por ciudad: tramitación viviendo en {ciudad}, qué juzgado la tramita, cancelar deudas sin vivienda, atención a municipios cercanos, necesidad de acudir presencialmente. Respuestas jurídicamente correctas y sin inventar diferencias legales entre ciudades. Las FAQ siguen alimentando los datos estructurados de la página.

### 6. Bloque "Caso real" dentro de la landing

Nuevo componente integrado en el flujo de la página (no enlaza fuera, no parece testimonio publicitario), con el modelo pedido: `isReal`, `city`, `province`, `profile`, `age`, `debtAmount`, `cancelledAmount`, `creditors[]`, `income`, `assets`, `initialSituation`, `solution`, `outcome`.

- Los 16 casos reales existentes se mapean a su ciudad o provincia correspondiente y se marcan `isReal: true`.
- Las demás ciudades quedan con un registro creado y marcado como borrador (`isReal: false`): no se muestra nada en la página hasta que se sustituyan los datos por reales.
- Misma estructura y mismo componente para todas: sustituir un caso será solo editar datos.

### 7. Titles y metas

Revisión de los títulos y descripciones de las 41 landings para cubrir el cluster completo (ley de segunda oportunidad + cancelar deudas + abogados + ciudad), usando alias cuando aporta (ej. "San Sebastián" junto a "Donostia"), respetando los límites de longitud y sin branding en el título.

### 8. Diferenciación real entre ciudades

Las diferencias vendrán de los datos: aliases, provincia y comunidad, municipios, juzgado, recursos, FAQs y caso. No se añaden estadísticas, plazos, costes ni datos administrativos que no puedan verificarse.

## Detalles técnicos

- `src/data/seo/localizaciones.ts`: ampliar el tipo `Localizacion` con los campos nuevos (opcionales) y rellenar las 41 fichas.
- Nuevo `src/data/seo/localCases.ts`: tipo `LocalCase` + registro por slug de ciudad; casos reales derivados de los existentes en `src/data/casos/`, resto como borradores.
- Nuevo `src/components/seo/LocalCaseBlock.tsx`: renderiza el caso solo si `isReal`, con el estilo actual de las secciones.
- `src/data/seo/content/localizacionContent.tsx`: consumir los campos nuevos para enriquecer intro, secciones, FAQ y añadir el bloque de caso, recursos y estadísticas cuando existan; mantener el enriquecimiento manual ya escrito para las ciudades que lo tienen.
- `src/pages/seo/LocalizacionPage.tsx`: titles/metas con cobertura de cluster y aliases; FAQ ampliada alimentando el schema `FAQPage`; `alternateName` con aliases en el schema `LegalService`.
- Sin cambios de rutas, sitemap ni diseño.

## Entrega final

Al terminar se reporta: archivos modificados, estructura del dataset, ciudades cubiertas, aliases y municipios añadidos, clusters de intención incorporados, FAQs añadidas, casos reales asociados, casos pendientes de sustituir, titles/metas modificados e inconsistencias detectadas.
