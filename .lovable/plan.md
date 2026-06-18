# Cerrar el gap de contenido en las 15 money pages

Objetivo: que cada money page no solo tenga el mejor "continente" (UI/UX con módulos), sino también todo el "contenido" relevante que cubren las páginas que mejor rankean en Google España para su keyword principal. Resultado: cobertura temática completa, escrita original con la voz de Calma y renderizada con los módulos que ya tenemos.

## Cómo funciona

Para cada una de las 15 money pages:
1. **Investigar la SERP** (Firecrawl): `search` de la keyword principal en Google España (`country: es`, `lang: es`) y `scrape` (markdown + summary) de las páginas top que rankean.
2. **Extraer el inventario de temas**: listar los bloques de contenido / subtemas que aparecen en esas páginas (requisitos, plazos, costes, casos, FAQs, conceptos, riesgos, pasos, documentación, etc.).
3. **Diff contra nuestra página**: comparar ese inventario con lo que ya cubre nuestro contenido actual y marcar lo que falta o está flojo.
4. **Rellenar huecos**: escribir el contenido que falta **original (sintetizado y reescrito), nunca copiado**, y colocarlo en el módulo adecuado del kit existente.

## Mapa keyword → página (15)

```
ley-segunda-oportunidad ............. "ley de segunda oportunidad"
abogados-ley-segunda-oportunidad .... "abogados ley segunda oportunidad"
cancelar-deudas ..................... "cancelar deudas"
cancelacion-de-deudas ............... "cancelacion de deudas"
reunificacion-deudas ................ "reunificacion de deudas"
reunificar-deudas ................... "reunificar deudas"
salir-de-asnef ...................... "salir de asnef / quitar asnef"
parar-embargo ....................... "parar embargo / cómo parar un embargo"
cancelar-tarjetas-revolving ......... "tarjetas revolving / reclamar revolving"
cancelar-microcreditos .............. "cancelar microcreditos"
exoneracion-pasivo-insatisfecho ..... "exoneracion del pasivo insatisfecho"
concurso-persona-fisica ............. "concurso de persona fisica / acreedores"
juicio-monitorio-deuda .............. "juicio monitorio / qué es"
deudas-hacienda ..................... "deudas con hacienda"
deudas-seguridad-social ............. "deudas con la seguridad social"
```

## Reglas de mapeo de huecos → módulos (kit existente)

Cada tipo de información detectada va al módulo que ya tenemos, manteniendo el estándar visual:
- Concepto/definición nuevo → `KeyCallout` o sección con `conceptGlossary`
- Vías/opciones → `OptionCards`
- Requisitos/criterios → `CheckList` (+ `WarningCallout` cuando aplica la regla de triaje)
- Plazos, costes, cifras → `FactGrid`
- "Qué pasa si no actúas" / fases → `urgencyTimeline` o `legalTimeline`
- Bulos frecuentes en la SERP → `mythVsReality`
- Preguntas que aparecen en "People also ask" → `faq` (UI + JSON-LD)
- Cross-sell hacia otra solución → `ActionLink`
- Texto explicativo largo → `MoneySection` con el body troceado en módulos legibles (nunca muros de prosa)

## Reglas de negocio que se respetan

- Triaje de soluciones intacto: LSO = insolvente + SIN bienes pagados; reunificar = insolvente + CON bienes valiosos; reclamación judicial = solvente + usura + deuda baja.
- Todos los CTA siguen apuntando a `#hero-form`. Sin gradientes en CTAs.
- Marca "Calma". Tokens semánticos, nada de colores hardcodeados.
- Contenido reescrito y original (anti-duplicado por SEO y legalmente seguro).

## Pasos de ejecución

1. **Conectar Firecrawl** (no hay conexión activa todavía) para poder hacer search+scrape real de Google España.
2. **Investigación por lotes** con subagentes: cada subagente investiga la SERP de varias keywords y devuelve un inventario de temas + diff contra nuestro contenido actual (sin tocar archivos).
3. **Redacción y montaje**: por cada página, añadir las secciones/módulos/FAQs que falten en su archivo de `src/data/seo/content/*.tsx`, reutilizando el kit de `src/components/seo/modules`. Si algún hueco necesita un tipo de dato ya soportado por `types.ts` (faq, conceptGlossary, mythVsReality, etc.) se rellena ahí.
4. **Verificación**: compilación TypeScript limpia y revisión visual de un par de páginas representativas en el preview.

## Fuera de alcance

- No se crean rutas nuevas ni se cambia la arquitectura de clusters.
- No se tocan plantillas no-money ni el backend.
- No se cambian tokens de diseño ni la lógica de los módulos (solo se alimentan con más datos).

## Nota técnica

- Firecrawl se llama solo desde investigación (no se añade código de Firecrawl a la app).
- El trabajo de contenido vive en `src/data/seo/content/*.tsx`; si hace falta un campo nuevo en `types.ts` para un módulo ya existente, se extiende ahí de forma mínima.
- Es un volumen grande de contenido en una sola pasada; lo ejecuto página por página dentro del mismo trabajo para mantener calidad y poder revisar el resultado.