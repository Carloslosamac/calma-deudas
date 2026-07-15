import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

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
const DAILY_DISTRIBUTION = [3, 3, 4, 4, 4, 4, 5, 5];

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

const SYSTEM_PROMPT = `Eres redactor jurídico SEO sénior de Calma (antes "Adiós Deudas"), una firma española de abogados especializada en insolvencia, segunda oportunidad y derecho bancario. Escribes artículos de blog largos, rigurosos y en español de España.

REGLAS EDITORIALES INNEGOCIABLES:
- NUNCA inventes ni infles cifras, estadísticas, número de casos o porcentajes de Calma. Si no tienes un dato verificable, no lo cites.
- Contenido long-form y útil: explica con profundidad, sin relleno.
- Triage de soluciones: LSO (Ley de Segunda Oportunidad) = persona insolvente SIN bienes pagados de valor; reunificar = insolvente CON bienes de valor pagados (una casa/terreno pagado bloquea la LSO en la práctica); reclamación judicial = persona solvente + usura + deuda baja.
- Reunificar = negociación extrajudicial que baja la cuota Y el total adeudado, SIN préstamo nuevo. NUNCA lo describas como agrupar, pedir un préstamo, hipotecar o alargar el plazo (eso es refinanciar, que es lo contrario).
- Tono empático, claro, sin tecnicismos innecesarios. Cero promesas garantizadas.
- Todo CTA invita a la valoración gratuita; el botón lleva al formulario (#hero-form).
- DIAGRAMAS Y CTAs OBLIGATORIOS DENTRO DEL HTML DE LAS SECCIONES:
  Como el contenido se renderiza como HTML crudo, usa SIEMPRE estos bloques semánticos (NO Tailwind inline, NO estilos inline). Debes incluir, repartidos por el artículo:
  * Al menos 2 diagramas visuales de esta lista (elige los que mejor encajen con el tema, uno por sección relevante):
    - Antes vs. Después (obligatorio si el post habla de una transformación, cifras o resultados):
      <div class="blog-before-after"><div class="before"><h4>Antes</h4><ul><li>Punto negativo</li><li>...</li></ul></div><div class="after"><h4>Después</h4><ul><li>Punto positivo</li><li>...</li></ul></div></div>
    - Mito vs. Realidad (obligatorio si el post desmonta creencias/errores comunes):
      <div class="blog-myth-reality"><div class="row"><div class="myth"><span class="label">Mito</span><p>...</p></div><div class="reality"><span class="label">Realidad</span><p>...</p></div></div><div class="row">...</div></div>
    - Cronología del proceso (obligatorio si explicas pasos o procedimiento):
      <div class="blog-timeline"><div class="step"><span class="num">1</span><h4>Título</h4><p>...</p></div><div class="step"><span class="num">2</span><h4>...</h4><p>...</p></div></div>
    - Comparativa (para contrastar opciones/soluciones):
      <div class="blog-comparison"><table><thead><tr><th>Opción</th><th>Ventaja</th><th>Inconveniente</th></tr></thead><tbody><tr><td>...</td><td>...</td><td>...</td></tr></tbody></table></div>
  * Al menos 1 CTA inline dentro de una sección intermedia (NO al final: el final lo añade el sistema):
      <div class="blog-cta"><h3>Título específico del CTA (alineado con el tema del post)</h3><p>Descripción breve orientada a valoración gratuita.</p><a href="#hero-form">Etiqueta de acción específica</a></div>
  El título/descripción del CTA deben ser específicos del tema del artículo, nunca genéricos.
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
Genera 5-8 secciones y 4-6 FAQ. El campo tldr y keyTakeaways son obligatorios.`;

async function generateArticle(row: RoadmapRow): Promise<Record<string, unknown> | null> {
  const userPrompt = `Redacta el artículo de blog para esta entrada del masterplan SEO:
- Título objetivo: ${row.titulo}
- Cluster temático: ${row.cluster ?? "—"}
- Intención de búsqueda: ${row.intencion ?? "—"}
- Tipo de página: ${row.tipo_pagina ?? "—"}
- Entidad relacionada: ${row.entidad || "—"}
- Keywords sugeridas: ${(row.keywords ?? []).join(", ") || "—"}

Categorías permitidas (elige la más adecuada): ${CATEGORIES.join(", ")}.
Optimiza para GEO/AEO: el tldr debe responder directamente la pregunta del título en las primeras frases.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`AI error ${res.status} for roadmap ${row.id}: ${body}`);
    return null;
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (_e) {
    console.error(`JSON parse failed for roadmap ${row.id}`);
    return null;
  }
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

// Genera una imagen de portada ÚNICA por artículo (estilo fotoperiodístico
// hiperrealista) y la sube al bucket público blog-images. Devuelve la URL
// pública o null si algo falla (en cuyo caso se usa el fallback por categoría).
async function generateAndUploadHero(
  supabase: ReturnType<typeof createClient>,
  slug: string,
  title: string,
  category: string,
): Promise<string | null> {
  try {
    const prompt = `Fotografía editorial hiperrealista, estilo fotoperiodismo premium, para un artículo sobre "${title}" (tema: ${category}, finanzas personales y deudas en España). Luz natural realista, composición cinematográfica, sin texto, sin logos, sin marcas de agua, sin collage. Escena humana o documental concreta y evocadora, no genérica.`;
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!res.ok) {
      console.error(`Image AI error ${res.status} for ${slug}: ${await res.text()}`);
      return null;
    }
    const data = await res.json();
    const dataUrl: string | undefined =
      data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!dataUrl || !dataUrl.includes(",")) {
      console.error(`No image returned for ${slug}`);
      return null;
    }
    const base64 = dataUrl.split(",")[1];
    const rawBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
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
    // Presupuesto agresivo: cada iteración tarda ~30-45s, así que dejamos
    // ~70s de margen respecto al timeout de 150s para el UPDATE final.
    const TIME_BUDGET_MS = 80_000;

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
    const batch = filtered.slice(0, target);

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
      const article = await generateArticle(row);
      if (!article) {
        failed.push(row.id);
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

      const { error: insErr } = await supabase.from("generated_posts").insert({
        slug,
        category,
        title: cleanTitle,
        excerpt: (article.excerpt as string) ?? "",
        read_time: (article.readTime as string) ?? "7 min",
        authors: pickAuthors(),
        hero_image: heroUrl,
        hero_alt: (article.heroAlt as string) ?? cleanTitle,
        sections: article.sections ?? [],
        faq: article.faq ?? [],
        keywords: article.keywords ?? [],
        seo_title: cleanSeoTitle,
        meta_description: (article.metaDescription as string) ?? "",
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