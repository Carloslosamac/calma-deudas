# Ficha de valoración por entidad (semáforo)

Cada una de las 102 fichas de entidad mostrará un módulo visual nuevo que la valora en varios aspectos con etiquetas semáforo (verde / ámbar / rojo) y una frase corta de contexto. Los valores son **curados por entidad** (criterio editorial, no cifras numéricas inventadas), respetando la regla del proyecto de no fabricar estadísticas.

## Aspectos valorados
Para cada entidad, 4 indicadores:

1. **Tipología de entidad** — chip informativo neutro (no semáforo): "Empresa de recobro", "Microcréditos", "Tarjeta revolving", "Banco". Da contexto inmediato del tipo de reclamación.
2. **Presión de recobro** — qué tan insistentes/agresivas suelen ser sus comunicaciones (verde = baja, ámbar = media, rojo = alta).
3. **Margen de negociación** — probabilidad real de cerrar con quita/descuento (verde = alto, ámbar = medio, rojo = bajo).
4. **Riesgo de intereses abusivos / usura** — probabilidad de que la deuda incluya intereses reclamables o nulos (verde = bajo, ámbar = medio, rojo = alto). Aquí el color rojo es *bueno para el usuario* (más opciones de defensa), por eso cada indicador lleva su frase de contexto para evitar lecturas equívocas.

Cada indicador combina: nivel (color) + etiqueta corta + una frase explicativa de una línea, escrita por entidad.

## Diseño visual
- Tarjeta `rounded-3xl border border-border bg-surface-elevated shadow-soft` coherente con `FactGrid`/módulos existentes.
- Cabecera con el chip de tipología.
- Lista de 3 indicadores, cada uno con: punto/pastilla de color semáforo, etiqueta del aspecto, badge de nivel ("Bajo/Medio/Alto") y la frase de contexto.
- Colores vía tokens existentes (`accent`/`accent-deep` para verde positivo, `orange-deep` para alerta, ámbar derivado) — sin hardcodear `text-white`/hex; se añadirán tokens si hace falta un ámbar dedicado.
- Pequeña nota al pie: "Valoración orientativa del equipo de Calma según el perfil de la entidad; cada caso se estudia de forma individual." (transparencia + coherencia con E-E-A-T).

## Dónde aparece
- Se inserta como una sección con su `H2` ("Valoración rápida de {entidad}") justo después de la sección de origen ("Quién es… y por qué te afecta"), al principio de la ficha, donde aporta más valor de escaneo rápido.

## Implementación técnica
1. **Componente** `src/components/seo/modules/EntityRating.tsx`: recibe `{ kind, indicators }` y renderiza la tarjeta semáforo. Reutilizable y exportado desde `src/components/seo/modules/index.ts`.
2. **Datos curados** `src/data/seo/content/entityRatings.ts`:
   - Tipo `EntityRating` con los 3 indicadores (`level: "verde"|"ambar"|"rojo"`, `label`, `note`).
   - `Record<slug, EntityRating>` con entrada **única por cada una de las 102 entidades**, redactada según su perfil real (recobro agresivo vs. banco, revolving con alto riesgo de usura, microcréditos con TAE elevada, etc.).
   - Helper `getEntityRating(entity)` con *fallback* por `kind` por si faltara alguna entrada, para no romper nunca el render.
3. **Integración** en `src/data/seo/content/entityContent.tsx`: nueva `ratingSection(entity)` insertada en `mergeProfile` tras `originSection`. La tarjeta se renderiza dentro del `body` de esa sección, así hereda el render existente del scaffold (H2 + contenido) sin tocar `SeoPageScaffold` ni `EntityPage`.
4. **Tokens (si necesario)**: añadir un token ámbar semáforo en `index.css` + `tailwind.config.ts` si no hay uno adecuado; reutilizar `accent`/`orange-deep` para verde/rojo.

## Verificación
- Revisar 3-4 fichas representativas (`/empresas-de-recobro/axactor`, una de microcrédito, una revolving, un banco) con screenshot del preview.
- Confirmar que no hay regresión de build y que el error runtime actual ("Importing a module script failed") queda resuelto tras los cambios/refresh.

## Notas
- No se añaden cifras numéricas ni porcentajes (regla anti-stats): solo niveles cualitativos + texto.
- No altera títulos/metadatos SEO existentes ni el contenido único anti-duplicado ya implementado; añade contenido diferenciado adicional por entidad.