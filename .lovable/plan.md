## Objetivo

Convertir la guía en la pieza de referencia más directa, actualizada y enfocada a la **Ley de Segunda Oportunidad** (no a "cancelar deudas" en general), reforzando la keyword principal y sus variantes, eliminando enlaces a empresas competidoras y enmarcando todo el hub editorial alrededor del término.

---

## 1. Nuevo título (y meta)

Cambiar el título a uno muy directo, con año, posicionando la pieza como "la más completa":

- **Título nuevo:** `Ley de Segunda Oportunidad 2026: la guía más completa y actualizada para cancelar tus deudas`
- **Excerpt nuevo:** reescrito para incluir 2 veces "Ley de Segunda Oportunidad" + año 2026, mencionar requisitos, fases, embargos, vivienda, deuda pública y autónomos.

---

## 2. Refuerzo de keyword principal y variantes

Pasar la keyword principal de **15 → ~35-40 apariciones**, sembrando estas variantes de forma natural en encabezados, intros y cierres de sección:

- `Ley de Segunda Oportunidad` (forma canónica, prioridad máxima)
- `Ley Segunda Oportunidad` (sin "de", muy buscada)
- `Ley de la Segunda Oportunidad`
- `LSO` (acrónimo, 2-3 apariciones)
- `Ley de Segunda Oportunidad 2026`

Refuerzo secundario de `cancelar deudas` (de 2 → ~6-8 apariciones) y de keywords infrarrepresentadas: `exoneración del pasivo insatisfecho`, `BEPI`, `Ley 25/2015`. Sin keyword stuffing: solo donde encaje en frase natural.

Actualizar el array `keywords` del post para incluir las variantes nuevas.

---

## 3. Eliminar enlaces a despachos competidores

Quitar de la introducción (y de cualquier otra sección donde aparezcan) las menciones y enlaces a empresas que compiten con Calma en Ley de Segunda Oportunidad:

- Repara tu Deuda
- Libertad Sin Deudas
- reclamador.es
- Arriaga Asociados
- Deudafix

Sustituir el párrafo de "fuentes" por uno centrado en fuentes oficiales y prensa: BOE, EUR-Lex, Tribunal Supremo (vía abogacia.es), análisis legal especializado (lawandtrends), Agencia Tributaria, Seguridad Social, Banco de España y prensa generalista (La Razón). Mantener únicamente referencias institucionales y de medios, no de competidores.

---

## 4. Reescritura del hub de 50 ángulos

Reordenar y reescribir los 50 ítems para que **cada título** mencione la Ley de Segunda Oportunidad (o variante), dejándolos como artículos hijos claros del pilar. Mismos 10 bloques temáticos, mismos 6 enlaces internos a posts existentes; cambia el copy de los títulos.

Ejemplos del nuevo enfoque (no la lista completa, va en la implementación):

- "Requisitos de la Ley de Segunda Oportunidad en 2026: lista actualizada"
- "Buena fe del deudor en la Ley de Segunda Oportunidad: cómo se interpreta"
- "Cancelar microcréditos con la Ley de Segunda Oportunidad"
- "Tarjetas revolving y Ley de Segunda Oportunidad: cómo se incluyen"
- "Ley de Segunda Oportunidad paso a paso: del análisis previo a la EPI"
- "Embargo de nómina y Ley de Segunda Oportunidad: cuándo vuelve íntegra"
- "Vivienda habitual en la Ley de Segunda Oportunidad: cuándo se conserva"
- "Autónomos en activo y Ley de Segunda Oportunidad: compatibilidad"
- "Cancelar deuda con Hacienda con la Ley de Segunda Oportunidad: límites"
- "ASNEF después de la Ley de Segunda Oportunidad: cómo limpiar el historial"
- "Vida después de la Ley de Segunda Oportunidad: 5 hábitos clave"
- "Concurso de acreedores vs. Ley de Segunda Oportunidad: diferencias"

Reescritura aplicada a los 50, manteniendo grupos: Requisitos, Tipos de deuda, Procedimiento, Embargos, Vivienda, Autónomos, Deuda pública, ASNEF, Después y Casos especiales.

---

## 5. Nuevas fuentes externas (oficiales / institucionales)

Integrar las dos referencias en secciones temáticamente coherentes:

- **lawandtrends.com** ("La revolución silenciosa de la Ley de la Segunda Oportunidad 2026 – exoneración del crédito público"): citar en la sección **"Origen y evolución"** y en **"Qué deudas se pueden cancelar y cuáles no"** (apartado de deuda pública), reforzando la idea de "guía actualizada 2026".
- **abogacia.es** ("Innovaciones del Tribunal Supremo sobre exoneración y buena fe"): citar en la sección **"Requisitos"** (concepto de buena fe del deudor), apoyando la explicación con la interpretación reciente del TS.

Ambas se añaden con el componente `ExtLink` ya existente (mismo patrón que BOE / EUR-Lex).

---

## Archivos afectados

- `src/data/blog/posts/guia-ley-segunda-oportunidad.tsx` — único archivo a editar.
  - Cambio de `title` y `excerpt`.
  - Ampliación del array `keywords`.
  - Reescritura de la introducción (quitando despachos competidores).
  - Reescritura de "Origen y evolución", "Requisitos" y "Qué deudas se pueden cancelar".
  - Reescritura completa del bloque `ContentHub` (los 50 títulos).
  - Sembrado controlado de variantes a lo largo de todas las secciones.

No hace falta tocar componentes, ni rutas, ni datos. La página `/blog/guia-ley-segunda-oportunidad` se actualiza en sitio.

---

## Validación posterior

Tras los cambios, volveré a contar:

- Palabras totales (objetivo: mantenernos ≥ 4.000).
- Apariciones de cada variante de la keyword principal.
- Apariciones de `cancelar deudas`, `EPI`, `BEPI`, `exoneración del pasivo insatisfecho`.
- Confirmar que ya no aparecen enlaces a Repara tu Deuda, Libertad Sin Deudas, reclamador.es, Arriaga Asociados ni Deudafix.

Y te devuelvo la tabla actualizada para comparar contra la anterior.
