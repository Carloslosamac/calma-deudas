## Objetivo

Hacer que cada landing por ciudad **rezume relevancia local verificable** y se presente ante Google como un **negocio de área de servicio (service-area business)** legítimo, sin afirmar oficina física (atendéis en remoto). El conocimiento local real y los datos estructurados correctos son lo que diferencia una página local creíble de una doorway page penalizable.

Principio rector: **nunca afirmar oficina/dirección física**. Sí afirmar "atención a [ciudad] y provincia, online y presencial cuando el juzgado lo requiere".

## 1. Enriquecer los datos locales por ciudad (`src/data/seo/localizaciones.ts`)

Hoy cada ciudad tiene `localNote`, `tribunal`, `lat/lng`. Añadiremos campos locales **verificables** que demuestran conocimiento real del territorio:

- `comarcas`/`zonas`: barrios o comarcas principales que se atienden (p. ej. Madrid → Centro, Vallecas, Carabanchel… / provincia: Alcalá, Móstoles, Getafe).
- `partidoJudicial` + `direccionJuzgado`: dirección real del juzgado de lo Mercantil/Primera Instancia de la ciudad (dato público y verificable, refuerza autenticidad).
- `localData`: 1-2 datos locales reales (sector económico predominante, tipo de deuda frecuente en la zona) — ya existe parcialmente en `localNote`, lo estructuramos.
- `prefijo`: prefijo telefónico provincial (91, 93, 96…) para mostrarlo como referencia local aunque la centralita sea única.

Todos son datos públicos reales, no inventados.

## 2. Schema `LegalService` parametrizado por ciudad (`src/lib/seo/structuredData.ts`)

`buildLegalService()` hoy es genérico y fijo a "España". Crear una variante `buildLocalLegalService(city)` que emita señales locales correctas para service-area business:

- `areaServed`: `{ "@type": "City", name, containedInPlace: { "@type": "AdministrativeArea", name: provincia } }` (en vez de Country).
- `geo`: `{ "@type": "GeoCoordinates", latitude, longitude }` con las coords de la ciudad.
- **Sin `address`** (no hay oficina). Esto es lo correcto y honesto para service-area.
- `availableChannel`: indicar atención online + teléfono.
- `serviceType`, `priceRange`, `provider` se mantienen.

`LocalizacionPage.tsx` pasará a usar `buildLocalLegalService(city)`.

## 3. Profundizar el contenido local del template (`src/data/seo/content/localizacionContent.tsx`)

Añadir secciones nuevas que solo una página con conocimiento local real tendría (esto es lo que más pesa contra el factor "doorway"):

- **"Dónde está el juzgado en {ciudad}"**: nombre y dirección real del partido judicial + cómo es el criterio de esos juzgados (ya hay base, se enriquece con dirección verificable).
- **"Zonas que atendemos en {provincia}"**: lista de comarcas/barrios reales → demuestra cobertura geográfica genuina.
- **"La situación de deuda en {ciudad}"**: párrafo con el dato económico local real (sector predominante, tipo de deuda frecuente).
- Reforzar el mensaje honesto de atención **online + provincia** en intro y FAQ (ya está, se afina).

Mantener cada bloque **único por ciudad** mediante los nuevos campos, evitando texto plantilla idéntico.

## 4. Mapa local real (`src/components/seo/CityMap.tsx` ya existe)

Verificar que el mapa centra en las coordenadas reales de la ciudad y mostrarlo de forma prominente en la landing local (señal visual de foco geográfico). Si no está incrustado en `LocalizacionPage`, añadirlo.

## 5. Honestidad anti-penalización (transversal)

- No usar la palabra "oficina" ni direcciones propias falsas en ningún sitio.
- Frase clara tipo: "Atendemos a clientes de {ciudad} y toda la provincia de {provincia}. Diagnóstico y tramitación online; acudimos al juzgado de {ciudad} cuando el procedimiento lo requiere."
- Teléfono: mostrar la centralita única (no inventar números locales), opcionalmente con el prefijo provincial como referencia informativa.

## Lo que NO se toca en código (pero es lo decisivo a futuro — fuera de la web)

Te lo dejo explícito porque sin esto ninguna mejora on-page basta para "convencer del todo" a Google de presencia local:

1. **Google Business Profile** por ciudad → requiere dirección verificable; sin oficina real no podréis verificar por ciudad. Alternativa legítima: una sola ficha en vuestra ubicación real con área de servicio amplia.
2. **NAP consistente** en directorios y colegios de abogados.
3. **Reseñas** y **backlinks locales**.

---

### Detalles técnicos (resumen)

- `localizaciones.ts`: ampliar el tipo `Localizacion` y los 20 objetos con `comarcas`, `direccionJuzgado`, `partidoJudicial`, `localData`, `prefijo`.
- `structuredData.ts`: nueva función `buildLocalLegalService(city)` con `areaServed` City + `geo`, sin `address`.
- `LocalizacionPage.tsx`: usar el nuevo schema y, si falta, incrustar `CityMap`.
- `localizacionContent.tsx`: 2-3 secciones locales nuevas alimentadas por los campos añadidos.
- Sin cambios de backend ni de routing; las 20 URLs y el sitemap ya existen.
</content>
<summary>Plan para reforzar la relevancia local de las 20 landings por ciudad como negocio de área de servicio (sin afirmar oficina física): datos locales verificables, schema LegalService local con geo/areaServed, y secciones de contenido genuinamente local.</summary>
</invoke>
