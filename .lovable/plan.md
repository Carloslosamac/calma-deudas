## Objetivo

Los posts que ahora crea el generador diario son cortos y planos comparados con los manuales (`guia-cancelar-microcreditos`, `guia-ley-segunda-oportunidad`, etc., de 500–1.100 líneas). Quiero que la IA produzca artículos igual de largos, densos y detallados: mismos módulos visuales, ejemplos, cifras cuando existan, matices legales, callouts, checklists y estructura long-form.

Todos los cambios viven en **`supabase/functions/generate-daily-posts/index.ts`** (system prompt + user prompt + validación mínima). No toco el frontend ni el CSS (`.blog-cta`, `.blog-before-after`, `.blog-timeline`, `.blog-myth-reality`, `.blog-comparison` ya existen y funcionan).

## Qué cambia en el `SYSTEM_PROMPT`

1. **Longitud y profundidad**
   - Subir el mínimo de secciones de "5–8" a **8–12 secciones H2**.
   - Cada sección debe tener **300–500 palabras**, dos o tres H3 internos cuando aporte, y al menos una lista (`<ul>`/`<ol>`) o un `<blockquote>` con ejemplo real.
   - Total objetivo: **2.500–3.500 palabras** por artículo.
   - FAQ: subir de 4–6 a **8–12 preguntas** con respuestas de 3–5 frases.
   - `keyTakeaways`: 6–8 puntos concretos.
   - `keywords`: 10–15.

2. **Estructura obligatoria de secciones** (en este orden lógico, adaptando los títulos al tema):
   1. Contexto / a quién afecta y por qué duele
   2. Marco legal aplicable (Ley 16/2022, art. relevantes del TRLC, sentencias TS/TJUE cuando encajen)
   3. Cómo saber si te aplica (checklist de señales)
   4. Requisitos y letra pequeña
   5. Paso a paso del proceso (con `blog-timeline`)
   6. Costes, plazos y qué esperar
   7. Errores frecuentes / mitos (con `blog-myth-reality`)
   8. Alternativas y triage (con `blog-comparison`) — respetando la regla LSO / reunificar / reclamación
   9. Ejemplo real anónimo (perfil + cifras hipotéticas etiquetadas como "ejemplo ilustrativo") con `blog-before-after`
   10. Qué hacer esta semana / próximos pasos
   11. Recursos y enlaces internos (mencionar 2–3 artículos hermanos del blog en `<a>` relativos `/blog/slug`)

3. **Módulos visuales — mínimos reforzados**
   - Al menos **4 diagramas** (antes ≥2): 1 timeline + 1 mito/realidad + 1 comparativa + 1 antes/después, salvo que el tema no lo admita y se justifique con otro tipo.
   - Al menos **2 CTAs intermedios** con `.blog-cta` (antes 1), específicos del tema y con `href="#hero-form"`. El sistema sigue añadiendo el CTA final si falta.
   - Añadir uso de `<blockquote>` para citas legales / dato clave y `<strong>` para remarcar en cada sección.

4. **Rigor jurídico**
   - Citar artículos concretos cuando sean estables (p.ej. arts. 486–502 y 486 bis TRLC para segunda oportunidad, art. 1 Ley Azcárate para usura, art. 20 LCS/L16-2022 para intereses). Sin inventar sentencias.
   - Mantener las reglas ya existentes: no inflar cifras de Calma, triage LSO/reunificar/reclamación, reunificar ≠ refinanciar, cero promesas garantizadas, sin marcas de competidores.

5. **Estilo**
   - Frases medias, párrafos de 2–4 frases, español de España, tono empático y directo.
   - Prohibido el relleno tipo "en este artículo veremos…" y las transiciones vacías.

## Qué cambia en el `userPrompt`

- Añadir un checklist explícito: "El artículo debe tener ≥8 H2, ≥2500 palabras totales, ≥4 diagramas, ≥2 CTAs intermedios, ≥8 FAQ y un ejemplo ilustrativo con cifras etiquetadas."
- Recordar la obligación de enlaces internos relativos a `/blog/...` cuando el tema tenga hermanos.

## Validación mínima post-generación

Añadir una comprobación barata antes del `insert` (sin volver a llamar al modelo salvo caso extremo):

- Contar secciones: si `< 8`, loggear warning pero no reintentar (para no romper el timeout).
- Contar diagramas via regex sobre el HTML concatenado (`blog-timeline|blog-myth-reality|blog-comparison|blog-before-after`): si `< 3`, loggear warning.
- Contar `blog-cta` intermedios (el `ensureFinalCta` no cuenta): si `0`, loggear warning.
- Contar FAQ: si `< 6`, loggear warning.

Estos warnings sirven para diagnóstico, sin bloquear la publicación (evitamos regenerar y agotar el timeout de 150s).

## Ajuste de cadencia

Los artículos más largos consumen más tokens y tiempo por post. Bajar `DAILY_DISTRIBUTION` de `[3,3,4,4,4,4,5,5]` a **`[2,2,3,3,3,4]`** para no reventar el timeout del edge function. La frecuencia diaria total se mantiene programando más invocaciones si hace falta (fuera de scope).

## Fuera de scope

- No se re-generan los posts ya publicados (111 posts) — solo afecta a los nuevos.
- No se tocan componentes React, CSS ni el pipeline de imágenes.
- No se cambia el modelo (`google/gemini-2.5-flash` sigue igual; es el que ya da mejor coste/latencia).

## Archivos a editar

- `supabase/functions/generate-daily-posts/index.ts` — `SYSTEM_PROMPT`, `userPrompt`, `DAILY_DISTRIBUTION` y bloque de validación previo al `insert`.
