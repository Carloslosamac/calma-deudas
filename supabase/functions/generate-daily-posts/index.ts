import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

// Extrae el primer objeto JSON balanceado dentro de un string. Aguanta:
//  - bloques ```json ... ``` alrededor.
//  - texto pegado tras el `}` final (causa habitual de "Unexpected non-whitespace character after JSON").
//  - llaves dentro de strings escapadas.
function extractFirstJsonObject(raw: string): Record<string, unknown> | null {
  if (!raw) return null;
  // 1) intento directo
  try { return JSON.parse(raw); } catch (_e) { /* seguir */ }
  const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; continue; }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        try { return JSON.parse(text.slice(start, i + 1)); } catch { return null; }
      }
    }
  }
  return null;
}

// fetch con timeout duro. Sin esto, una llamada a IA/imagen que se cuelga
// consume TODO el presupuesto del edge function.
async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

// Marca una fila de roadmap como fallida. Tras 3 intentos consecutivos, la saca
// de la cola (estado="fallo_generacion") para que el cron no la vuelva a coger
// al día siguiente y así bloquear a las siguientes.
async function markRoadmapFailure(
  supabase: ReturnType<typeof createClient>,
  id: number,
  errorMsg: string,
): Promise<void> {
  try {
    const { data } = await supabase
      .from("seo_roadmap")
      .select("attempts")
      .eq("id", id)
      .maybeSingle();
    const next = ((data?.attempts as number | null) ?? 0) + 1;
    const patch: Record<string, unknown> = {
      attempts: next,
      last_attempt_at: new Date().toISOString(),
      last_error: errorMsg.slice(0, 500),
    };
    if (next >= 3) patch.estado = "fallo_generacion";
    await supabase.from("seo_roadmap").update(patch).eq("id", id);
  } catch (e) {
    console.error(`markRoadmapFailure(${id}) error: ${String(e)}`);
  }
}

// Avisa a IndexNow (Bing/Yandex/etc.) de las URLs nuevas. Fire-and-forget:
// nunca debe romper la generación si falla.
async function notifyIndexNow(slugs: string[]): Promise<void> {
  if (!slugs.length) return;
  try {
    const urls = slugs.map((s) => `/blog/${s}`);
    await fetch(`${SUPABASE_URL}/functions/v1/indexnow-submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ urls }),
    });
  } catch (e) {
    console.error("notifyIndexNow (posts) error:", String(e));
  }
}

const AUTHOR_IDS = [
  "marta-belmonte",
  "javier-ferrer",
  "lucia-ordonez",
  "andres-solis",
  "sara-belda",
  "carlos-rivas",
];

const CATEGORIES = [
  "Microcréditos",
  "Tarjetas revolving",
  "Embargos",
  "Segunda oportunidad",
  "Hipotecas",
  "Juicio monitorio",
  "Autónomos",
  "Deudas públicas",
  "ASNEF",
  "Finanzas familiares",
  "Reunificación",
  "Consejos",
];

// Cadencia por invocación: valores bajos para que quepamos en el timeout
// de 150s del edge function (cada post ~30-40s: texto + imagen + upload).
// Con 3-5 posts/invocación cerramos siempre limpio; si se quiere más
// volumen diario, hay que programar más invocaciones o refactorizar.
// Artículos long-form (2.500–3.500 palabras) → más tokens y latencia por
// post. Bajamos la cadencia por invocación para caber en el timeout de 150s.
const DAILY_DISTRIBUTION = [2, 2, 3, 3, 3, 4];

function pickDailyCount(): number {
  return DAILY_DISTRIBUTION[Math.floor(Math.random() * DAILY_DISTRIBUTION.length)];
}

function pickAuthors(): string[] {
  const shuffled = [...AUTHOR_IDS].sort(() => Math.random() - 0.5);
  const n = 1 + Math.floor(Math.random() * 2); // 1-2 firmantes
  return shuffled.slice(0, n);
}

function slugFromUrl(url: string | null, titulo: string): string {
  if (url) {
    const parts = url.split("/").filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Garantiza que cada artículo termine con un CTA claro hacia el formulario,
// incluso si el modelo no lo incluye. Se añade al final de la última sección.
function ensureFinalCta(
  sections: { id: string; title: string; html: string }[] | undefined,
  topic: string,
): { id: string; title: string; html: string }[] {
  const list = Array.isArray(sections) ? [...sections] : [];
  if (list.length === 0) return list;
  const joined = list.map((s) => s.html ?? "").join("\n");
  const hasCta = /class=["']blog-cta["']/i.test(joined);
  if (hasCta) return list;
  const last = list[list.length - 1];
  const safeTopic = (topic ?? "").replace(/["<>]/g, "").trim() || "tu situación";
  const ctaHtml = `\n<div class="blog-cta"><h3>¿Te reconoces en este caso?</h3><p>Analizamos ${safeTopic.toLowerCase()} en una valoración gratuita y te decimos qué solución encaja con tu perfil.</p><a href="#hero-form">Solicitar valoración gratuita</a></div>`;
  list[list.length - 1] = { ...last, html: (last.html ?? "") + ctaHtml };
  return list;
}

// El roadmap se importó scrapeando SERPs, así que muchos títulos arrastran el
// sufijo de marca del competidor de origen. Nunca debe aparecer en NUESTRO blog.
// Lista de marcas de competidores (regex fragments, case-insensitive, con \s+ tolerante).
const COMPETITOR_BRANDS = [
  "Soluciona\\s+Mi\\s+Deuda",
  "MiSolvencia(?:\\.es)?",
  "Abogados\\s+para\\s+tus\\s+deudas",
  "Repara\\s+tu\\s+Deuda",
  "Quita\\s+Deudas",
  "Deudae",
  "MundoJur[ií]dico",
  "Solvento",
  "Reparaty",
  "Deudafix",
  "Legaliboo",
];
const COMPETITOR_ANY = new RegExp(`\\b(?:${COMPETITOR_BRANDS.join("|")})\\b`, "iu");
function containsCompetitor(text: unknown): boolean {
  if (text == null) return false;
  const s = typeof text === "string" ? text : JSON.stringify(text);
  return COMPETITOR_ANY.test(s);
}
// Elimina marcas de competidores en cualquier posición del texto y colapsa
// conectores huérfanos que quedan tras el borrado.
function stripCompetitorBrands(raw: string): string {
  let t = raw ?? "";
  // 1) Quita "con/de/gracias a/con el asesoramiento de/etc + MARCA"
  const withPrefix = new RegExp(
    `\\s+(?:con(?:\\s+el\\s+asesoramiento\\s+de)?|de|gracias\\s+a|junto\\s+a|en)\\s+(?:${COMPETITOR_BRANDS.join("|")})\\b`,
    "giu",
  );
  t = t.replace(withPrefix, "");
  // 2) Quita ocurrencias sueltas de la marca
  t = t.replace(new RegExp(`\\b(?:${COMPETITOR_BRANDS.join("|")})\\b`, "giu"), "");
  // 3) Limpia separadores/espacios colgantes
  t = t.replace(/\s{2,}/g, " ").replace(/\s+([,.;:!?])/g, "$1").trim();
  t = t.replace(/[\s\-–—|·:]+$/g, "").trim();
  return t;
}
function sanitizeTitle(raw: string): string {
  let t = (raw ?? "").trim();
  const brandSuffix =
    /\s*[-–—|·:]\s*(MiSolvencia(\.es)?|Abogados\s+para\s+tus\s+deudas|Repara\s+tu\s+Deuda|Quita\s+Deudas|Deudae|MundoJur[ií]dico|MundoJuridico)\s*$/i;
  // Aplica dos veces por si hay sufijos encadenados.
  t = t.replace(brandSuffix, "").replace(brandSuffix, "").trim();
  // Además, elimina cualquier marca competidora dentro del título (no solo sufijo).
  t = stripCompetitorBrands(t);
  return t;
}

// Recorta meta descriptions a ≤160 chars sin cortar palabras a la mitad.
// La taxonomía CTR exige meta < 160 para evitar que Google la trunque en la SERP.
function sanitizeMetaDescription(raw: string): string {
  const cleaned = stripCompetitorBrands((raw ?? "").trim());
  if (cleaned.length <= 160) return cleaned;
  const cutoff = cleaned.slice(0, 158);
  const lastSpace = cutoff.lastIndexOf(" ");
  const base = (lastSpace > 120 ? cutoff.slice(0, lastSpace) : cutoff).replace(
    /[\s,;:.\-–—]+$/,
    "",
  );
  return `${base}…`;
}

interface RoadmapRow {
  id: number;
  titulo: string;
  cluster: string | null;
  intencion: string | null;
  tipo_pagina: string | null;
  prioridad: string | null;
  url_sugerida: string | null;
  entidad: string | null;
  keywords: string[] | null;
}

const SYSTEM_PROMPT = `Eres redactor jurídico SEO sénior de Calma (antes "Adiós Deudas"), una firma española de abogados especializada en insolvencia, segunda oportunidad y derecho bancario. Escribes artículos de blog LONG-FORM (2.500–3.500 palabras), rigurosos, detallados y en español de España. Escribes al nivel de las guías manuales de referencia del blog (Guía LSO, Guía Reunificar, Guía Cancelar Microcréditos): profundidad, matices, ejemplos ilustrativos y cero relleno.

REGLAS EDITORIALES INNEGOCIABLES:
- NUNCA inventes ni infles cifras, estadísticas, número de casos o porcentajes de Calma. Si no tienes un dato verificable, no lo cites.
- Contenido long-form y útil: explica con profundidad, sin relleno. Prohibido el estilo "en este artículo veremos…" y las transiciones vacías.
- LONGITUD MÍNIMA: 8–12 secciones H2, 2.500–3.500 palabras totales, cada sección de 300–500 palabras con al menos una lista o un blockquote y H3 internos cuando aporte. FAQ: 8–12 preguntas con respuestas de 3–5 frases. keyTakeaways: 6–8. keywords: 10–15.
- Triage de soluciones: LSO (Ley de Segunda Oportunidad) = persona insolvente SIN bienes pagados de valor; reunificar = insolvente CON bienes de valor pagados (una casa/terreno pagado bloquea la LSO en la práctica); reclamación judicial = persona solvente + usura + deuda baja.
- Reunificar = negociación extrajudicial que baja la cuota Y el total adeudado, SIN préstamo nuevo. NUNCA lo describas como agrupar, pedir un préstamo, hipotecar o alargar el plazo (eso es refinanciar, que es lo contrario).
- Tono empático, claro, sin tecnicismos innecesarios. Cero promesas garantizadas.
- Rigor jurídico: cita artículos concretos cuando sean estables y aplicables (p. ej. arts. 486–502 y 486 bis TRLC para segunda oportunidad, art. 1 Ley Azcárate para usura, Ley 16/2022 de reforma concursal, art. 20 LCCC para intereses de demora, art. 815 LEC para monitorio). NUNCA inventes sentencias, ponentes ni números de recurso.
- Todo CTA invita a la valoración gratuita; el botón lleva al formulario (#hero-form).
- ESTRUCTURA DE SECCIONES obligatoria (adapta los títulos al tema, pero cubre TODAS estas dimensiones en este orden lógico):
  1) Contexto: a quién afecta el problema y por qué duele ahora
  2) Marco legal aplicable con artículos citados
  3) Cómo saber si te aplica (checklist de señales, usa <ul>)
  4) Requisitos y letra pequeña
  5) Paso a paso del proceso (usa blog-timeline)
  6) Costes, plazos y qué esperar realmente
  7) Errores frecuentes o mitos (usa blog-myth-reality)
  8) Alternativas y triage LSO/reunificar/reclamación (usa blog-comparison)
  9) Ejemplo ilustrativo anónimo con cifras hipotéticas etiquetadas como "ejemplo ilustrativo, no un caso real de Calma" (usa blog-before-after)
  10) Qué hacer esta semana / próximos pasos concretos
  11) Recursos y enlaces internos: menciona 2–3 artículos hermanos del blog con <a href="/blog/slug"> relativos (usa slugs plausibles: guia-ley-segunda-oportunidad, guia-reunificar-deudas, guia-cancelar-microcreditos, guia-cancelar-revolving, embargos-segunda-oportunidad, juicio-monitorio-deuda, salir-asnef, autonomos-con-deudas)
- DIAGRAMAS Y CTAs OBLIGATORIOS DENTRO DEL HTML DE LAS SECCIONES:
  Como el contenido se renderiza como HTML crudo, usa SIEMPRE estos bloques semánticos (NO Tailwind inline, NO estilos inline). Debes incluir, repartidos por el artículo:
  * MÍNIMO 3 diagramas visuales, MÁXIMO 5, elegidos ENTRE ESTOS 10 tipos según lo que aporte el tema (no repitas tipo dentro del mismo post, no metas los 4 por defecto en todos los artículos):
    A) Antes vs. Después — SOLO si el post habla de una transformación, cifras o resultados:
       <div class="blog-before-after"><div class="before"><h4>Antes</h4><ul><li>...</li></ul></div><div class="after"><h4>Después</h4><ul><li>...</li></ul></div></div>
    B) Mito vs. Realidad — SOLO si el post desmonta creencias o errores comunes (mínimo 3 filas):
       <div class="blog-myth-reality"><div class="row"><div class="myth"><span class="label">Mito</span><p>...</p></div><div class="reality"><span class="label">Realidad</span><p>...</p></div></div>...</div>
    C) Cronología / pasos — SOLO si explicas un procedimiento con orden temporal:
       <div class="blog-timeline"><div class="step"><span class="num">1</span><h4>...</h4><p>...</p></div>...</div>
    D) Comparativa — SOLO si contrastas 3+ opciones/soluciones (no la uses si ya hay antes/después):
       <div class="blog-comparison"><table><thead><tr><th>Opción</th><th>Ventaja</th><th>Inconveniente</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td></tr></tbody></table></div>
    E) Callout / aviso destacado — para datos legales críticos, plazos o advertencias. Usa "warning" cuando sea un riesgo:
       <div class="blog-callout warning"><div class="icon">!</div><div><h4>Ojo con este plazo</h4><p>...</p></div></div>
       <div class="blog-callout"><div class="icon">i</div><div><h4>Dato clave</h4><p>...</p></div></div>
    F) Checklist accionable — para pre-requisitos, documentación o verificaciones (mín 4 items):
       <div class="blog-checklist"><h4>Antes de reclamar, verifica que:</h4><ul><li>...</li><li>...</li></ul></div>
     G) Estadísticas destacadas — para cifras clave del tema (3–6 números con etiqueta):
        <div class="blog-stats"><div class="stat"><span class="num">70%</span><span class="label">de los casos ...</span></div>...</div>
     H) Pros y contras — para valorar UNA opción concreta (no comparativa entre opciones):
        <div class="blog-pros-cons"><div class="pros"><h4>A favor</h4><ul><li>...</li></ul></div><div class="cons"><h4>En contra</h4><ul><li>...</li></ul></div></div>
     I) Cita destacada — para una frase legal, principio jurídico o resumen potente (una sola por post):
        <div class="blog-quote"><blockquote>«...»</blockquote><span class="author">Fuente / referencia</span></div>
     J) Mini FAQ inline — 2–4 preguntas cortas dentro de una sección concreta (independiente del bloque final de FAQ):
        <div class="blog-faq-inline"><div class="qa"><p class="q">¿Pregunta?</p><p class="a">Respuesta breve.</p></div>...</div>
  * Cada post debe combinar 3–5 tipos DISTINTOS del pool de 10. Elige los que encajen con el tema real, no siempre los mismos. Ejemplos: post de plazos → timeline + callout warning + checklist + stats; post de reclamación → checklist + myth-reality + before-after + quote; post de comparativas → comparison + pros-cons + callout; post explicativo → stats + faq-inline + quote + timeline.
  * Todos los diagramas deben tener el div raíz con clase EXACTA (blog-timeline, blog-myth-reality, blog-comparison, blog-before-after, blog-callout, blog-checklist, blog-stats, blog-pros-cons, blog-quote, blog-faq-inline) para que hereden estilo. Nunca uses estilos inline.
  * Al menos 2 CTAs inline dentro de secciones intermedias distintas (NO al final: el final lo añade el sistema):
      <div class="blog-cta"><h3>Título específico del CTA (alineado con el tema del post)</h3><p>Descripción breve orientada a valoración gratuita.</p><a href="#hero-form">Etiqueta de acción específica</a></div>
  El título/descripción del CTA deben ser específicos del tema del artículo, nunca genéricos.
  * Usa <blockquote> en al menos 2 secciones para citas legales, datos clave o frases resumen, y <strong> para destacar términos importantes dentro de los párrafos.
- TÍTULOS (seoTitle) — reglas duras:
  * 1 emoji temático al inicio (⚖️ legal, 💳 tarjetas, 📉 deuda, 🏠 vivienda, 🛑 embargo, ✅ requisitos, 🧾 Hacienda, 🤝 acreedores, 💼 autónomos, ⏱️ plazos, 💸 dinero).
  * Máx 60 caracteres visuales contando el emoji. Sin marca, sin «| Calma».
  * Prohibido empezar tras el emoji con «Guía», «Requisitos», «Documentación», «Cómo».
  * PROHIBIDAS las muletillas clickbait repetidas: «YA», «TODO lo que debes saber», «CERO riesgo», «PASO A PASO», «AHORA», «¡...!», mayúsculas gritadas de palabras genéricas. NO uses ninguna de esas coletillas.
  * Cada título debe tener un GANCHO ESPECÍFICO al tema (una cifra, una consecuencia concreta, una pregunta afilada, un contraste, un plazo, un "sí/no"). Nada de fórmulas intercambiables.
  * Ejemplos del nivel esperado: «💼 Autónomos con deudas: cancela y vuelve a empezar», «📉 Cancela tus microcréditos y frena la bola», «🤝 ¿Renegociar o vía legal? Lo que de verdad funciona», «🛑 Te embargan la nómina: qué puedes hacer esta semana», «💳 Revolving: cómo saber si te cobraron de más», «🏠 Reunificar sin perder tu piso: qué mirar antes de firmar».

FORMATO DE SALIDA: devuelve ÚNICAMENTE JSON válido (sin markdown, sin comentarios) con esta forma exacta:
{
  "category": "una de las categorías permitidas",
  "seoTitle": "Título de CTR con emoji al inicio + gancho ESPECÍFICO al tema. Máx 60 caracteres visuales. Sin marca. Prohibidas las coletillas «YA», «TODO lo que debes saber», «CERO», «PASO A PASO», «AHORA» y las mayúsculas gritadas. Prohibidos arranques planos tras el emoji («Guía», «Requisitos», «Documentación», «Cómo»).",
  "metaDescription": "meta descripción < 160 caracteres, persuasiva para CTR, que EMPIECE con 1 emoji temático",
  "excerpt": "entradilla de 1-2 frases",
  "readTime": "p.ej. '7 min'",
  "heroAlt": "texto alternativo descriptivo de la imagen",
  "tldr": "respuesta directa de 2-3 frases que resume la solución a la pregunta del título (answer-first para motores de IA)",
  "keyTakeaways": ["4-6 puntos clave concretos y accionables"],
  "keywords": ["6-10 keywords/temas tratados"],
  "sections": [{ "id": "slug-seccion", "title": "Título H2", "html": "<p>...</p> párrafos, <ul>/<ol>, <h3>, <blockquote>. HTML semántico, sin estilos inline." }],
  "faq": [{ "question": "Pregunta frecuente", "answer": "Respuesta clara de 2-4 frases" }],
  "sidebar": { "ctaTitle": "...", "ctaDescription": "...", "ctaLabel": "...", "benefits": ["3-4 beneficios"] }
}
Genera 8–12 secciones H2 y 8–12 FAQ. Los campos tldr y keyTakeaways son obligatorios. Ningún atajo en la longitud: prefiere quedarte largo antes que corto.`;

async function generateArticle(row: RoadmapRow): Promise<Record<string, unknown> | null> {
  const userPrompt = `Redacta el artículo de blog para esta entrada del masterplan SEO:
- Título objetivo: ${row.titulo}
- Cluster temático: ${row.cluster ?? "—"}
- Intención de búsqueda: ${row.intencion ?? "—"}
- Tipo de página: ${row.tipo_pagina ?? "—"}
- Entidad relacionada: ${row.entidad || "—"}
- Keywords sugeridas: ${(row.keywords ?? []).join(", ") || "—"}

Categorías permitidas (elige la más adecuada): ${CATEGORIES.join(", ")}.
Optimiza para GEO/AEO: el tldr debe responder directamente la pregunta del título en las primeras frases.

CHECKLIST OBLIGATORIO antes de devolver el JSON (auto-verifica cada punto):
- ≥ 8 secciones H2 cubriendo las 11 dimensiones de la estructura obligatoria.
- ≥ 2.500 palabras totales sumando todas las secciones.
- 3-5 diagramas visuales combinando tipos DISTINTOS del pool de 10 (blog-timeline / blog-myth-reality / blog-comparison / blog-before-after / blog-callout / blog-checklist / blog-stats / blog-pros-cons / blog-quote / blog-faq-inline) elegidos por lo que encaje con el tema. NUNCA los mismos por defecto.
- ≥ 2 CTAs intermedios (.blog-cta) con títulos específicos del tema.
- ≥ 8 preguntas FAQ con respuestas de 3–5 frases.
- ≥ 1 ejemplo ilustrativo con cifras etiquetadas como "ejemplo ilustrativo".
- 2–3 enlaces internos relativos a /blog/... dentro de una sección "Recursos".
- Citas de artículos legales concretos donde apliquen (TRLC, LEC, Ley Azcárate, Ley 16/2022, LCCC).`;

  // Reintento único con prompt reforzado si el modelo devuelve texto no-JSON.
  for (let attempt = 0; attempt < 2; attempt++) {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ];
    if (attempt === 1) {
      messages.push({
        role: "user",
        content: "Tu respuesta anterior no era JSON válido. Devuelve SOLO un único objeto JSON, sin texto antes ni después, sin comentarios, sin ```.",
      });
    }
    let res: Response;
    try {
      res = await fetchWithTimeout(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages,
            response_format: { type: "json_object" },
          }),
        },
        60_000,
      );
    } catch (e) {
      console.error(`AI fetch aborted for roadmap ${row.id} (attempt ${attempt + 1}): ${String(e)}`);
      continue;
    }
    if (!res.ok) {
      const body = await res.text();
      console.error(`AI error ${res.status} for roadmap ${row.id} (attempt ${attempt + 1}): ${body.slice(0, 300)}`);
      continue;
    }
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) continue;
    const parsed = extractFirstJsonObject(content);
    if (parsed) return parsed;
    console.error(`JSON parse failed for roadmap ${row.id} (attempt ${attempt + 1})`);
  }
  return null;
}

// ---- Validación dura del seoTitle (patrón agresivo de CTR) ----
// Cuenta caracteres VISUALES (grafemas) para respetar el límite de 60 con emojis.
const graphemeSeg = typeof Intl !== "undefined" && "Segmenter" in Intl
  ? new Intl.Segmenter("es", { granularity: "grapheme" })
  : null;
function visualLength(s: string): number {
  if (graphemeSeg) return [...graphemeSeg.segment(s)].length;
  return [...s].length;
}
// ¿Empieza por emoji? (símbolos/pictogramas fuera del rango ASCII/letras)
const EMOJI_START = /^(?:\p{Extended_Pictographic}|\p{Emoji_Presentation})/u;
function startsWithEmoji(s: string): boolean {
  return EMOJI_START.test(s.trim());
}
const FLAT_START = /^\s*(gu[ií]a|requisitos|documentaci[oó]n|introducci[oó]n|c[oó]mo\b)/i;
// Coletillas clickbait prohibidas (case-insensitive, palabra completa)
const CLICHE_PATTERNS = [
  /\bYA\b/,
  /\bAHORA\b/,
  /\bCERO\b/,
  /\bTODO\b\s+lo\s+que\s+debes\s+saber/i,
  /\bPASO\s+A\s+PASO\b/i,
];
function hasCliche(s: string): boolean {
  return CLICHE_PATTERNS.some((r) => r.test(s));
}
function isCompliantTitle(t: string): boolean {
  const clean = (t ?? "").trim();
  if (!clean) return false;
  if (!startsWithEmoji(clean)) return false;
  if (visualLength(clean) > 60) return false;
  // El arranque plano se evalúa tras el emoji.
  const afterEmoji = clean.replace(EMOJI_START, "").trim();
  if (FLAT_START.test(afterEmoji)) return false;
  if (hasCliche(clean)) return false;
  return true;
}

// Reescribe un título no conforme con una llamada corta al modelo.
async function rewriteTitle(rawTitle: string, topic: string, category: string): Promise<string | null> {
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "Eres copywriter SEO senior. Devuelve SOLO el título reescrito, sin comillas ni explicación. Reglas: 1 emoji temático al inicio + gancho ESPECÍFICO al tema (cifra, plazo, consecuencia concreta, pregunta afilada, contraste). Máx 60 caracteres visuales contando el emoji. Sin marca, sin «| Calma», sin arranques planos (Guía/Requisitos/Documentación/Cómo). PROHIBIDAS las coletillas «YA», «AHORA», «CERO», «TODO lo que debes saber», «PASO A PASO» y las mayúsculas gritadas de palabras genéricas.",
          },
          {
            role: "user",
            content: `Tema: ${topic}\nCategoría: ${category}\nTítulo actual (no conforme): ${rawTitle}\nReescríbelo cumpliendo el patrón.`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const out = (data?.choices?.[0]?.message?.content ?? "").trim().replace(/^["“”']|["“”']$/g, "").trim();
    return out || null;
  } catch (_e) {
    return null;
  }
}

// Recorte seguro como último recurso: no parte palabras y conserva el emoji.
function safeTruncate(t: string, max = 60): string {
  if (visualLength(t) <= max) return t;
  const words = t.split(/\s+/);
  let acc = "";
  for (const w of words) {
    const candidate = acc ? `${acc} ${w}` : w;
    if (visualLength(candidate) > max) break;
    acc = candidate;
  }
  return (acc || t).trim();
}

// Garantiza un seoTitle conforme: valida → reescribe → recorta.
async function enforceTitle(rawTitle: string, topic: string, category: string): Promise<{ title: string; rewritten: boolean }> {
  const sanitized = sanitizeTitle(rawTitle ?? "").trim();
  if (isCompliantTitle(sanitized)) return { title: sanitized, rewritten: false };
  const rewritten = await rewriteTitle(sanitized || topic, topic, category);
  if (rewritten) {
    const clean = sanitizeTitle(rewritten);
    if (isCompliantTitle(clean)) return { title: clean, rewritten: true };
    return { title: safeTruncate(clean, 60), rewritten: true };
  }
  return { title: safeTruncate(sanitized || topic, 60), rewritten: true };
}

// Redimensiona a un ancho máximo razonable para web (1200px) y recomprime a
// JPEG de calidad alta (82) para que las portadas carguen rápido sin pérdida
// de calidad visible. Devuelve los bytes JPEG o null si falla (entonces se
// sube el PNG original).
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;
async function optimizeImage(pngBytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const img = await Image.decode(pngBytes);
    if (img.width > MAX_WIDTH) {
      img.resize(MAX_WIDTH, Image.RESIZE_AUTO);
    }
    return await img.encodeJPEG(JPEG_QUALITY);
  } catch (e) {
    console.error(`optimizeImage failed: ${String(e)}`);
    return null;
  }
}

// Derivador local (sin llamada IA) de escena literal ligada al título.
// Cada regla tiene varias variantes; se elige de forma determinista por slug
// para variar entre posts sin que una portada concreta cambie al reintentar.
// Solo una minoría de variantes contiene papeles/facturas para evitar el
// cliché de "mesa llena de papeleo" repetido en todas las portadas.
function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}
function pick<T>(arr: T[], seed: number): T { return arr[seed % arr.length]; }

const SCENE_RULES: { re: RegExp; variants: string[] }[] = [
  { re: /burofax|carta certificad|requerimiento|notificaci[oó]n/, variants: [
    "manos de una persona española sosteniendo un sobre certificado en el recibidor de casa",
    "buzón metálico de portal en un bloque de pisos español, con un sobre asomando",
    "cartero español dejando un sobre en el buzón de un portal de vecinos",
    "sobre cerrado sin abrir apoyado en el felpudo de la entrada de un piso",
  ]},
  { re: /juzgado|demanda|sentencia|judicial|monitorio/, variants: [
    "fachada de un juzgado español visto desde la acera, con el cartel institucional en piedra",
    "pasillo vacío de un juzgado español con bancos de madera pegados a la pared",
    "persona española esperando sentada en el banco del pasillo de un juzgado, con las manos cruzadas",
    "puerta cerrada de una sala de vistas con la placa del número en la pared",
  ]},
  { re: /embargo|n[oó]mina|sueldo|salario/, variants: [
    "móvil en la mano mostrando la pantalla de una app bancaria con el saldo",
    "cajero automático encastrado en la fachada de una sucursal en una calle española",
    "ticket de compra arrugado sobre la encimera de una cocina corriente",
    "monedas y algún billete pequeño sueltos sobre la mesa del comedor",
  ]},
  { re: /hipoteca|vivienda|piso|casa|inmueble|desahucio/, variants: [
    "portal de un bloque de viviendas español visto desde la acera",
    "ventana de un piso con las persianas medio bajadas vista desde la calle",
    "llaves con llavero corriente sobre la encimera de una cocina española",
    "balcón de un piso con un cartel de 'Se vende' colgado, calle de barrio",
  ]},
  { re: /tarjeta|revolving|usura|cr[eé]dito/, variants: [
    "tarjeta bancaria apoyada sobre la mesa del salón junto a un móvil",
    "TPV de una cafetería española con una tarjeta apoyada encima",
    "móvil pagando contactless en el datáfono de una tienda de barrio",
    "cajero automático de una calle española con una persona de espaldas usándolo",
  ]},
  { re: /reunific|refinanc|cuota|consolidar|mensualidad/, variants: [
    "persona española hablando por teléfono sentada en el sofá del salón",
    "calendario de pared en una cocina, con marcas hechas a bolígrafo en varios días",
    "hucha de cerámica sobre una estantería del salón, junto a un marco de foto",
    "calculadora doméstica sola sobre la mesa del comedor, sin nada más alrededor",
  ]},
  { re: /concurso|ley de la segunda oportunidad|lso|insolvenc/, variants: [
    "fachada de un despacho de abogados corriente en una calle española",
    "sala de espera vacía con sillas de plástico y una revista sobre una mesa baja",
    "persona española sentada frente a un abogado en un despacho normal, vista desde atrás",
    "placa institucional de 'Juzgado de lo Mercantil' en la pared exterior de un edificio",
  ]},
  { re: /banco|entidad|sucursal/, variants: [
    "fachada corriente de una oficina bancaria en una calle española con transeúntes pasando",
    "cajero automático empotrado en la pared exterior de una sucursal",
    "cola de personas esperando dentro de una oficina bancaria corriente",
    "letrero genérico de un banco en la fachada visto desde la acera opuesta",
  ]},
  { re: /deuda|impago|moros|asnef/, variants: [
    "móvil sobre una mesa mostrando una notificación push de una app bancaria",
    "buzón de portal a rebosar, con sobres asomando por la ranura",
    "timbre y placa metálica de un portal de vecinos en una calle española",
    "manos de una persona mirando el móvil sentada en el bordillo de una acera",
  ]},
  { re: /pensi[oó]n|jubilaci[oó]n|mayor/, variants: [
    "persona mayor española sentada en un banco de una plaza de barrio",
    "persona mayor con gafas mirando su móvil en el sofá del salón",
    "cartilla del banco antigua sobre la mesa camilla del comedor",
    "pareja mayor española caminando por la acera de una calle corriente",
  ]},
  { re: /aut[oó]nomo|freelance|hacienda|impuesto|iva|irpf/, variants: [
    "autónomo español detrás del mostrador de su tienda de barrio",
    "portátil abierto sobre una mesa de bar con un café al lado",
    "furgoneta comercial pequeña aparcada en una calle española",
    "mecánico o electricista trabajando en su taller corriente, herramientas a la vista",
  ]},
];

const DEFAULT_VARIANTS = [
  "cocina de un piso español corriente, sin personas, luz suave de ventana",
  "salón de una casa española con la tele encendida de fondo",
  "calle de barrio español con transeúntes al fondo",
  "mesa de un bar de barrio español con un café servido",
  "portal de vecinos español visto desde dentro hacia la calle",
  "acera de una calle española a media mañana, sin nadie en primer plano",
];

function sceneFromTitle(title: string, category: string, slug: string): string {
  const t = `${title} ${category}`.toLowerCase();
  const h = hashSlug(slug);
  for (const r of SCENE_RULES) if (r.re.test(t)) return pick(r.variants, h);
  return pick(DEFAULT_VARIANTS, h);
}

// Pide a un modelo de texto barato UNA escena literal y única por título.
// Devuelve null si falla; el llamante hace fallback a sceneFromTitle().
async function sceneFromLLM(title: string, category: string): Promise<string | null> {
  const sys = `Eres director de fotografía documental. Devuelves UNA sola escena visual concreta para la portada de un artículo del blog Calma (deudas y finanzas personales en España). Responde SOLO con la escena en UNA línea, en español, sin comillas, entre 80 y 200 caracteres.`;
  const usr = `Título del artículo: ${title}
Categoría: ${category}

Requisitos ESTRICTOS:
- La escena debe ser inequívocamente reconocible y específica del título (no una escena genérica de "finanzas" o "deudas").
- Contexto España: gente, edificios, objetos y comercios corrientes.
- Si aparece una persona, descríbela de espaldas, de perfil o mostrando solo manos. NUNCA mirando a cámara.
- Si aparece un móvil, NUNCA con la pantalla enfocada de frente a cámara. Móvil visto de lado, en un bolsillo, boca abajo o desde detrás del hombro.
- Prohibido por defecto: montones de papeles/facturas sobre una mesa, cocinas como escenario, familias sonrientes, salones de anuncio, calculadoras solas, tickets arrugados.
- Prefiere lugares u objetos ESPECÍFICOS del tema: p. ej. oficina del SEPE para paro, notaría para herencia, sede de Hacienda o gestoría para autónomos, sala de vistas para juicio monitorio, sucursal bancaria concreta para embargo de cuenta, taller mecánico para autónomo, portal de vecinos para requerimiento, cajero automático para saldo, mostrador de un ayuntamiento para trámite, sala de espera de un juzgado de lo mercantil para concurso/LSO.
- Solo escena, sin adjetivos de estilo fotográfico (esos se añaden aparte).`;
  try {
    const res = await fetchWithTimeout("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-lite",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: usr },
        ],
      }),
    }, 20000);
    if (!res.ok) { console.error(`sceneFromLLM ${res.status}: ${await res.text()}`); return null; }
    const data = await res.json();
    const raw: string | undefined = data?.choices?.[0]?.message?.content;
    if (!raw) return null;
    const line = raw.replace(/^["'`\s]+|["'`\s]+$/g, "").split("\n")[0].trim();
    if (line.length < 40 || line.length > 260) return null;
    return line;
  } catch (e) { console.error(`sceneFromLLM threw: ${String(e)}`); return null; }
}

// Llama al modelo de imagen más barato (Nano Banana 2 Lite) con fallback a
// gemini-2.5-flash-image si el primero falla. Un solo intento por modelo.
async function generateImageBytes(prompt: string, slug: string): Promise<Uint8Array | null> {
  const attempts: { model: string; body: unknown }[] = [
    {
      model: "google/gemini-3.1-flash-lite-image",
      body: {
        model: "google/gemini-3.1-flash-lite-image",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
      },
    },
    {
      model: "google/gemini-2.5-flash-image",
      body: {
        model: "google/gemini-2.5-flash-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      },
    },
  ];
  for (const a of attempts) {
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(a.body),
      });
      if (!res.ok) {
        console.error(`image AI ${a.model} ${res.status} for ${slug}: ${await res.text()}`);
        continue;
      }
      const data = await res.json();
      const b64: string | undefined = data?.data?.[0]?.b64_json;
      if (!b64) { console.error(`image AI ${a.model} for ${slug}: no b64_json`); continue; }
      return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    } catch (e) {
      console.error(`image AI ${a.model} threw for ${slug}: ${String(e)}`);
    }
  }
  return null;
}

// Genera una imagen de portada ÚNICA por artículo (estética coherente de foto
// hecha con móvil, escena derivada del título) y la sube al bucket público
// blog-images. Devuelve la URL pública o null si algo falla.
async function generateAndUploadHero(
  supabase: ReturnType<typeof createClient>,
  slug: string,
  title: string,
  category: string,
): Promise<string | null> {
  try {
    const llmScene = await sceneFromLLM(title, category);
    const scene = llmScene ?? sceneFromTitle(title, category, slug);
    const paperWords = /papel|carta|factura|recibo|extracto|carpeta|sobre|ticket|documento/;
    const banPapers = !paperWords.test(scene);
    const prompt = `Fotografía casual tomada con un teléfono móvil moderno (iPhone/Samsung), estilo snapshot cotidiano español. NO profesional, NO editorial, NO publicidad, NO stock.

Escena literal (debe reconocerse a simple vista y coincidir con el título "${title}"): ${scene}

Estética coherente en todas las portadas:
- Smartphone a mano, ligera imperfección de encuadre, focal ~24-28mm, profundidad de campo amplia sin bokeh cinematográfico.
- Solo luz natural existente (ventana, calle, lámpara doméstica). Balance de blancos neutro. Colores apagados y reales tal cual salen del móvil.
- Personas y espacios españoles corrientes, ropa normal, objetos con uso real, casas normales no de revista.
- Si hay una persona, aparece de espaldas, de perfil o solo sus manos. NUNCA mira al objetivo.
- Si aparece un móvil, se ve de lado, boca abajo o desde detrás del hombro. NUNCA con la pantalla encarada a cámara.

Prohibido: HDR, filtros, viñeteo, golden hour, dominantes amarillas o cinematográficas, sonrisas de catálogo, familia perfecta con tablet, salones blancos de anuncio, plantas decorativas exageradas, texto o logos en la imagen, marcas de agua, collages, pantallas de móvil orientadas a cámara, personas mirando al objetivo${banPapers ? ", montones de papeles/facturas/documentos desperdigados sobre mesas (cliché a evitar salvo que la escena lo pida explícitamente)" : ""}.`;
    const rawBytes = await generateImageBytes(prompt, slug);
    if (!rawBytes) {
      console.error(`No image returned for ${slug}`);
      return null;
    }
    const optimized = await optimizeImage(rawBytes);
    const isJpeg = optimized !== null;
    const bytes = optimized ?? rawBytes;
    const path = `${slug}.${isJpeg ? "jpg" : "png"}`;
    const { error: upErr } = await supabase.storage
      .from("blog-images")
      .upload(path, bytes, {
        contentType: isJpeg ? "image/jpeg" : "image/png",
        upsert: true,
        cacheControl: "31536000",
      });
    if (upErr) {
      console.error(`Upload failed for ${slug}: ${upErr.message}`);
      return null;
    }
    const { data: signed } = await supabase.storage
      .from("blog-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10); // 10 años
    return signed?.signedUrl ?? null;
  } catch (e) {
    console.error(`generateAndUploadHero error for ${slug}: ${String(e)}`);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Auth gate: cron calls without a user token are allowed (trusted scheduler).
  // Any call carrying a real user JWT must belong to an admin.
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (token && token !== Deno.env.get("SUPABASE_ANON_KEY")) {
    const { data: userData } = await supabase.auth.getUser(token);
    const user = userData?.user;
    if (user) {
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleRow) {
        return new Response(JSON.stringify({ ok: false, error: "Solo administradores" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
  }

  // Determine the call source for the run log.
  let runSource = "cron";
  try {
    const cloned = req.clone();
    const parsed = await cloned.json();
    if (parsed?.source) runSource = String(parsed.source);
  } catch (_e) {
    // no body / not JSON — keep default
  }

  // Open a run record so the health dashboard can track every execution.
  const { data: runRow } = await supabase
    .from("generator_runs")
    .insert({ status: "running", source: runSource })
    .select("id")
    .single();
  const runId = runRow?.id as string | undefined;

  try {
    const target = pickDailyCount();
    // Presupuesto de tiempo: los edge functions de Supabase tienen un límite
    // wall-clock ~150s. Cada post cuesta ~30-40s (texto + imagen + upload),
    // así que reservamos margen para cerrar el run limpiamente.
    const startedAt = Date.now();
    // Cada iteración tarda ~30-45s. Damos margen respecto al timeout wall-clock
    // de los edge functions (~150s) para el UPDATE final. Con 130s cabe ~1 post
    // más de los que cabían antes.
    const TIME_BUDGET_MS = 130_000;

    const { data: rows, error: selErr } = await supabase
      .from("seo_roadmap")
      .select("id,titulo,cluster,intencion,tipo_pagina,prioridad,url_sugerida,entidad,keywords")
      .eq("estado", "en_cola")
      .order("prioridad", { ascending: true }) // Alta < Baja < Media alfabéticamente, reordenamos abajo
      .order("id", { ascending: true })
      .limit(60);

    if (selErr) throw selErr;
    if (!rows || rows.length === 0) {
      if (runId) {
        await supabase
          .from("generator_runs")
          .update({
            status: "success",
            finished_at: new Date().toISOString(),
            target,
            published_count: 0,
            failed_count: 0,
          })
          .eq("id", runId);
      }
      return new Response(JSON.stringify({ ok: true, published: 0, reason: "cola vacía" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Prioridad: Alta > Media > Baja
    const rank: Record<string, number> = { Alta: 0, Media: 1, Baja: 2 };
    const ordered = (rows as RoadmapRow[]).sort(
      (a, b) => (rank[a.prioridad ?? "Baja"] ?? 2) - (rank[b.prioridad ?? "Baja"] ?? 2) || a.id - b.id,
    );
    // Barrera pre-generación: bloquea filas cuyo título ya contiene marca de
    // competidor para no gastar créditos de IA. Se marcan con estado propio
    // y NO entran en el batch.
    const filtered: RoadmapRow[] = [];
    const blockedForCompetitor: number[] = [];
    for (const r of ordered) {
      if (containsCompetitor(r.titulo) || containsCompetitor(r.keywords)) {
        blockedForCompetitor.push(r.id);
      } else {
        filtered.push(r);
      }
    }
    if (blockedForCompetitor.length) {
      await supabase
        .from("seo_roadmap")
        .update({ estado: "bloqueado_competidor" })
        .in("id", blockedForCompetitor);
      console.warn(
        `Bloqueadas ${blockedForCompetitor.length} filas de roadmap por marca de competidor: ${blockedForCompetitor.join(", ")}`,
      );
    }
    // Cogemos hasta 3x el target para que, si algunas filas fallan (JSON, imagen,
    // etc.), aún tengamos candidatas para intentar cumplir el objetivo del día.
    const batch = filtered.slice(0, Math.max(target * 3, target + 3));

    const published: string[] = [];
    const failed: number[] = [];
    let titlesRewritten = 0;
    let stoppedByBudget = false;

    // Persistir el target desde el inicio para que el dashboard lo vea aunque
    // el edge function muera por timeout antes de terminar.
    if (runId) {
      await supabase
        .from("generator_runs")
        .update({ target })
        .eq("id", runId);
    }

    for (const row of batch) {
      // Si nos acercamos al timeout, salimos limpiamente y cerramos el run
      // con lo que ya se ha publicado. Sin esto, el run queda huérfano en
      // "running" y el próximo día se acumulan runs stale.
      if (Date.now() - startedAt > TIME_BUDGET_MS) {
        stoppedByBudget = true;
        console.warn(
          `Time budget reached after ${published.length}/${batch.length} posts. Stopping.`,
        );
        break;
      }
      // Si ya cumplimos el objetivo del día, cerramos sin gastar más presupuesto.
      if (published.length >= target) break;
      const article = await generateArticle(row);
      if (!article) {
        failed.push(row.id);
        // Marca en el roadmap: incrementa intentos y guarda el error. Tras 3
        // intentos fallidos deja de aparecer en la cola para no bloquear el
        // cron mañana con la misma fila envenenada.
        await markRoadmapFailure(supabase, row.id, "IA no devolvió JSON válido");
        // Heartbeat: guarda el fallo en el run para que no quede huérfano.
        if (runId) {
          await supabase
            .from("generator_runs")
            .update({
              target,
              published_count: published.length,
              failed_count: failed.length,
            })
            .eq("id", runId);
        }
        continue;
      }

      // Barrera post-generación: si el modelo introdujo cualquier marca de
      // competidor en cualquier campo, descartamos el post y marcamos la
      // fila para revisión. No se inserta ni se paga imagen.
      if (containsCompetitor(article)) {
        console.warn(`Roadmap ${row.id}: salida contiene marca de competidor, descartado.`);
        failed.push(row.id);
        await supabase
          .from("seo_roadmap")
          .update({ estado: "fallo_competidor" })
          .eq("id", row.id);
        if (runId) {
          await supabase
            .from("generator_runs")
            .update({ target, published_count: published.length, failed_count: failed.length })
            .eq("id", runId);
        }
        continue;
      }

      const category = CATEGORIES.includes(article.category as string)
        ? (article.category as string)
        : "Consejos";
      const slug = slugFromUrl(row.url_sugerida, row.titulo);
      const now = new Date().toISOString();
      const cleanTitle = sanitizeTitle(row.titulo);
      const enforced = await enforceTitle(
        (article.seoTitle as string) ?? row.titulo,
        cleanTitle,
        category,
      );
      const cleanSeoTitle = enforced.title;
      if (enforced.rewritten) titlesRewritten++;
      const heroUrl = await generateAndUploadHero(supabase, slug, cleanTitle, category);

      // Validación no bloqueante: solo loguea si el artículo se quedó corto.
      // No reintentamos para no reventar el presupuesto de tiempo.
      try {
        const secs = (article.sections as { html?: string }[] | undefined) ?? [];
        const joined = secs.map((s) => s?.html ?? "").join("\n");
        const diagramMatches = joined.match(/blog-(timeline|myth-reality|comparison|before-after|callout|checklist|stats|pros-cons|quote|faq-inline)/g) ?? [];
        const diagramCount = diagramMatches.length;
        const uniqueDiagramTypes = new Set(diagramMatches).size;
        const ctaCount = (joined.match(/class=["']blog-cta["']/g) ?? []).length;
        const faqCount = Array.isArray(article.faq) ? (article.faq as unknown[]).length : 0;
        const wordCount = joined.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
        const warn: string[] = [];
        if (secs.length < 8) warn.push(`sections=${secs.length}<8`);
        if (diagramCount < 3) warn.push(`diagrams=${diagramCount}<3`);
        if (uniqueDiagramTypes < 3) warn.push(`diagram_types=${uniqueDiagramTypes}<3 (repetitivo)`);
        if (ctaCount < 1) warn.push(`ctas=${ctaCount}<1`);
        if (faqCount < 6) warn.push(`faq=${faqCount}<6`);
        if (wordCount < 2000) warn.push(`words=${wordCount}<2000`);
        if (warn.length) {
          console.warn(`Post ${slug} debajo del listón long-form: ${warn.join(", ")}`);
        }
      } catch (_e) { /* no-op */ }

      const { error: insErr } = await supabase.from("generated_posts").insert({
        slug,
        category,
        title: cleanTitle,
        excerpt: (article.excerpt as string) ?? "",
        read_time: (article.readTime as string) ?? "7 min",
        authors: pickAuthors(),
        hero_image: heroUrl,
        hero_alt: (article.heroAlt as string) ?? cleanTitle,
        sections: ensureFinalCta(
          article.sections as { id: string; title: string; html: string }[] | undefined,
          cleanTitle,
        ),
        faq: article.faq ?? [],
        keywords: article.keywords ?? [],
        seo_title: cleanSeoTitle,
        meta_description: sanitizeMetaDescription(
          (article.metaDescription as string) ?? "",
        ),
        tldr: (article.tldr as string) ?? null,
        key_takeaways: article.keyTakeaways ?? [],
        sidebar: article.sidebar ?? null,
        roadmap_id: row.id,
        status: "published",
        published_at: now,
      });

      if (insErr) {
        console.error(`Insert failed for roadmap ${row.id}: ${insErr.message}`);
        failed.push(row.id);
        await markRoadmapFailure(supabase, row.id, `insert: ${insErr.message}`);
        if (runId) {
          await supabase
            .from("generator_runs")
            .update({
              target,
              published_count: published.length,
              failed_count: failed.length,
            })
            .eq("id", runId);
        }
        continue;
      }

      await supabase
        .from("seo_roadmap")
        .update({ estado: "publicado", post_slug: slug })
        .eq("id", row.id);

      published.push(slug);
      // Heartbeat tras cada post exitoso: si el edge function muere por
      // timeout después de este punto, el run queda con el progreso real.
      if (runId) {
        await supabase
          .from("generator_runs")
          .update({
            target,
            published_count: published.length,
            failed_count: failed.length,
          })
          .eq("id", runId);
      }
    }

    if (runId) {
      await supabase
        .from("generator_runs")
        .update({
          status: failed.length && published.length === 0 ? "failed" : "success",
          finished_at: new Date().toISOString(),
          target,
          published_count: published.length,
          failed_count: failed.length,
          error: failed.length
            ? `Fallaron roadmap ids: ${failed.join(", ")}${stoppedByBudget ? " (parado por presupuesto de tiempo)" : ""}`
            : stoppedByBudget
              ? "Parado por presupuesto de tiempo antes de completar el batch"
              : null,
        })
        .eq("id", runId);
    }
    console.log(`Títulos reescritos para cumplir el patrón CTR: ${titlesRewritten}/${published.length}`);

    await notifyIndexNow(published);

    return new Response(
      JSON.stringify({ ok: true, target, published: published.length, slugs: published, failed, titlesRewritten }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("generate-daily-posts error:", e);
    if (runId) {
      await supabase
        .from("generator_runs")
        .update({
          status: "failed",
          finished_at: new Date().toISOString(),
          error: String(e),
        })
        .eq("id", runId);
    }
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});