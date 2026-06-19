# Estrategia GEO para preguntas transaccionales

Objetivo: que cuando alguien pregunte a una IA "¿cómo cancelo mis microcréditos abusivos?", "¿qué abogado me conviene para la Ley de Segunda Oportunidad?", "¿puedo parar un embargo?", **Calma sea la fuente citada y recomendada**. GEO no es SEO clásico: los motores generativos extraen y citan frases concretas, priorizan respuestas directas, datos con fuente, autoridad declarada (E-E-A-T) y contenido fácil de "trocear".

Tu base ya es fuerte (FAQ + JSON-LD + módulos + llms.txt). Faltan las piezas específicas de GEO. Lo abordamos en 4 frentes.

## 1. Crawlabilidad para motores de IA (rápido, alto impacto)

`public/robots.txt` hoy solo nombra Googlebot/Bingbot/redes. Los crawlers de IA crawlean bajo `*` pero conviene declararlos explícitamente para no quedar fuera si endurecen reglas:
- Permitir `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI), `PerplexityBot`, `ClaudeBot`/`Claude-Web` (Anthropic), `Google-Extended` (Gemini/AI Overviews), `Amazonbot`, `Bytespider`.
- Mantener `Disallow: /call/`.

Decisión a confirmar contigo: ¿permitimos a todos (máxima visibilidad GEO) o bloqueamos los que entrenan modelos sin citar? Recomiendo permitir todos: en este nicho la visibilidad en respuestas IA pesa más que el control de entrenamiento.

## 2. Bloque "Respuesta directa" extraíble en cada money page

Los motores generativos citan el primer fragmento que responde la pregunta de forma autónoma. Añadir un módulo nuevo al kit (`MoneyBlock` tipo `answerBox` / nuevo `MoneyDirectAnswer`):
- Caja al inicio del journey: pregunta transaccional literal como encabezado + respuesta de 2-3 frases autocontenida (sin "como vimos antes"), con el dato/condición clave y el siguiente paso.
- Redactada para ser citada tal cual: sujeto explícito ("La Ley de Segunda Oportunidad permite…"), sin pronombres ambiguos.
- Se renderiza visible (no oculto) y alimenta un `speakable`/FAQ en JSON-LD.

Aplicar a las 15 money pages, una pregunta transaccional por página alineada con la query objetivo.

## 3. Señales que los motores generativos premian (contenido + datos)

Investigación GEO (Princeton) muestra que **citar fuentes, incluir estadísticas y citas textuales** sube la visibilidad en respuestas IA hasta un 30-40%. En cada money page:
- **Datos con fuente**: cifras legales reales (ej. umbral de exoneración, plazos del art. X de la Ley 16/2022, TAE de usura del Banco de España) con enlace/atribución a la fuente oficial. Reaprovecha el módulo `FactGrid` existente.
- **Citas de norma**: micro-citas textuales del BOE/jurisprudencia en los puntos clave (refuerza E-E-A-T y da material citable).
- **Lenguaje natural conversacional** en los H2: usar las preguntas tal como se le hacen a una IA, no keywords secas.
- Reforzar las FAQ existentes con preguntas transaccionales de cola larga ("¿cuánto cuesta…?", "¿cuánto tarda…?", "¿me pueden embargar la nómina si…?").

## 4. Autoridad / entidad (E-E-A-T para IA) en JSON-LD

Ampliar `src/lib/seo/structuredData.ts` (los builders ya están centralizados):
- **`Service` + `Offer`** por money page (servicio = "Cancelación de deudas vía LSO", área = España, proveedor = Organization). Las IA usan esto para entender qué ofreces y recomendarte.
- **Autor/revisor con credenciales**: builder `buildReviewedBy` (Person abogado colegiado + `sameAs`) enlazado a las páginas marcadas `reviewed: true`. La autoría experta es señal GEO de primer orden en nichos YMYL legales.
- **`speakable`** en WebPage apuntando a la "Respuesta directa".
- **`AggregateRating`** solo si las valoraciones (4,8 · +1.200) son reales y verificables; si no, se omite (no inventamos rating en JSON-LD).
- Reforzar `Organization` con `sameAs` a perfiles reales (Google Business, redes, medios) para anclar la entidad en el grafo de conocimiento.

## 5. llms.txt: incluir las páginas transaccionales

`public/llms.txt` solo lista home + blog. Añadir una sección "## Soluciones" con las 15 money pages y una descripción transaccional de una línea cada una, para que los crawlers de IA mapeen directamente intención → URL.

## Orden de ejecución
1. robots.txt + llms.txt (minutos, desbloquea todo).
2. Builders JSON-LD nuevos (Service/Offer, reviewedBy, speakable).
3. Módulo "Respuesta directa" en el kit + tipos.
4. Aplicar respuesta directa + datos con fuente a las 15 money pages (por lotes).
5. Lanzar SEO review y, tras publicar, validar con Rich Results y una pregunta real en Perplexity/ChatGPT.

## Cambios técnicos
- `public/robots.txt`, `public/llms.txt`
- `src/lib/seo/structuredData.ts` (nuevos builders)
- `src/data/seo/content/types.ts` + `src/components/seo/modules` (módulo answerBox) + `SectionBlocks.tsx`
- Los 15 archivos de `src/data/seo/content/*.tsx` (respuesta directa + datos con fuente)
- `MoneyLanding.tsx` para inyectar los nuevos JSON-LD

## A confirmar antes de implementar
1. **robots.txt**: ¿permitir todos los bots de IA (recomendado) o bloquear los de entrenamiento sin cita?
2. **Datos legales con fuente**: ¿tienes las cifras/artículos ya validados por tu abogado, o los redacto con marcador `[pendiente revisión legal]` como en las páginas actuales?
3. **AggregateRating**: ¿las valoraciones (4,8 · +1.200) son reales y verificables para declararlas en JSON-LD?
4. ¿Empezamos por los frentes 1+5 (rápidos) y luego el resto, o vamos a por todo de una?