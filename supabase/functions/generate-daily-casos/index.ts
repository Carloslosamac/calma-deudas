import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

// Extrae el primer objeto JSON balanceado. Aguanta ```json fences y texto extra
// después del `}` final (causa habitual de fallos de parseo).
function extractFirstJsonObject(raw: string): Record<string, unknown> | null {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (_e) { /* seguir */ }
  const text = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  const start = text.indexOf("{");
  if (start === -1) return null;
  let depth = 0, inStr = false, esc = false;
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

async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

// Marcas de competidores que jamás deben aparecer en nuestro contenido.
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

// Avisa a IndexNow (Bing/Yandex/etc.) de las URLs nuevas. Fire-and-forget.
async function notifyIndexNow(slugs: string[]): Promise<void> {
  if (!slugs.length) return;
  try {
    const urls = slugs.map((s) => `/casos-de-exito/${s}`);
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
    console.error("notifyIndexNow (casos) error:", String(e));
  }
}

// Categorías de caso y su solución típica. La mitad de los casos deben ser LSO.
const LSO_CATEGORY = "Ley de Segunda Oportunidad";
const OTHER_CATEGORIES = [
  "Tarjetas revolving",
  "Microcréditos",
  "Embargos",
  "ASNEF",
  "Deudas con Hacienda",
  "Reunificación de deudas",
];

const CITIES = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia",
  "Bilbao", "Alicante", "Valladolid", "Vigo", "Gijón", "Granada", "Córdoba",
  "Santander", "Pamplona", "Logroño", "Albacete", "Badajoz", "Tarragona",
  "Castellón", "Almería", "Salamanca", "Huelva", "León", "Cádiz", "Lugo",
  "Ourense", "Jaén", "Lleida", "Girona", "Cáceres", "Burgos", "Toledo",
];

const FIRST_NAMES = [
  "Marta", "Javier", "Lucía", "Andrés", "Sara", "Carlos", "Elena", "Diego",
  "Raquel", "Pablo", "Nuria", "Sergio", "Ana", "Iván", "Cristina", "Rubén",
  "Patricia", "Hugo", "Marina", "Daniel", "Noelia", "Adrián", "Beatriz",
  "Óscar", "Silvia", "Gonzalo", "Verónica", "Manuel", "Pilar", "Antonio",
];

const SURNAME_INITIALS = "ABCDFGLMNPRSTV".split("");

// Variedad visual para evitar caras repetidas. El sexo visual SIEMPRE sale del
// nombre del caso; el hash solo diversifica rasgos, edad, encuadre y entorno.
const AGE_BANDS = [
  "unos 28 años",
  "unos 34 años",
  "unos 41 años",
  "unos 47 años",
  "unos 55 años",
  "unos 62 años",
];
const FEMALE_NAMES = new Set([
  "marta", "lucia", "lucía", "sara", "elena", "raquel", "nuria", "ana",
  "cristina", "patricia", "marina", "noelia", "beatriz", "silvia", "veronica",
  "verónica", "pilar",
]);
const MALE_NAMES = new Set([
  "javier", "andres", "andrés", "carlos", "diego", "pablo", "sergio", "ivan",
  "iván", "ruben", "rubén", "hugo", "daniel", "adrian", "adrián", "oscar",
  "óscar", "gonzalo", "manuel", "antonio",
]);
const ETHNIC_LOOKS = [
  "rasgos mediterráneos españoles",
  "rasgos latinoamericanos",
  "rasgos del norte de España",
  "rasgos morenos del sur de España",
  "rasgos magrebíes",
];
const FEMALE_SETTINGS = [
  "sentada en una silla de cocina de su casa, fondo doméstico desenfocado",
  "de pie junto a una ventana del salón, pared sencilla y luz natural",
  "sentada en el borde de un sofá usado, sala modesta de vivienda española",
  "apoyada en la mesa de comedor con un vaso de agua, casa real sin decorar",
  "en un balcón pequeño de piso, barandilla y ropa tendida desenfocadas",
  "en la entrada de un edificio de viviendas antiguo, luz de portal",
];
const MALE_SETTINGS = [
  "sentado en una silla de cocina de su casa, fondo doméstico desenfocado",
  "de pie junto a una ventana del salón, pared sencilla y luz natural",
  "sentado en el borde de un sofá usado, sala modesta de vivienda española",
  "apoyado en la mesa de comedor con un vaso de agua, casa real sin decorar",
  "en un balcón pequeño de piso, barandilla y ropa tendida desenfocadas",
  "en la entrada de un edificio de viviendas antiguo, luz de portal",
];
const EXPRESSIONS = [
  "expresión serena y cansada, mirada a cámara",
  "media sonrisa tímida de alivio, mirada real",
  "expresión pensativa, mirada ligeramente baja",
  "rostro tranquilo tras una etapa difícil, sonrisa mínima",
  "mirada directa a cámara, gesto digno y natural",
  "expresión reflexiva, sin posar",
];
const HAIR_DETAILS = [
  "pelo castaño oscuro con textura natural",
  "pelo corto con algunas canas visibles",
  "pelo moreno ligeramente despeinado",
  "pelo castaño claro recogido de forma informal",
  "cabello con entradas o canas naturales",
  "pelo ondulado sin peinar de peluquería",
];
const FACE_DETAILS = [
  "ojeras leves y líneas de expresión reales",
  "piel natural con poros visibles, sin retoque beauty",
  "rostro ancho y nariz marcada, facciones comunes",
  "mejillas algo cansadas y gesto contenido",
  "barbilla y pómulos asimétricos, apariencia cotidiana",
  "marcas pequeñas de piel y textura humana",
];
const CLOTHES = [
  "jersey básico de punto",
  "camiseta lisa de algodón",
  "sudadera sencilla sin logos",
  "camisa informal arrugada sin marca visible",
  "chaqueta de casa o rebeca básica",
  "ropa cotidiana de estar por casa, sin glamour",
];
const CAMERA_DETAILS = [
  "foto hecha con móvil por un familiar, no por fotógrafo profesional",
  "encuadre ligeramente imperfecto, como foto casera real",
  "luz ambiente de ventana, balance de blancos imperfecto",
  "fondo real de casa española desenfocado, nada de estudio",
  "profundidad de campo natural y grano sutil de móvil",
  "composición íntima de cabeza y hombros, rostro ocupando casi todo el encuadre",
];

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function pickBy<T>(arr: T[], seed: number, salt: number): T {
  return arr[(seed + salt) % arr.length];
}

type PersonGender = "mujer" | "hombre";

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zñ]/g, "");
}

function inferGenderFromName(name: string): PersonGender {
  const first = normalizeName(name.split(/\s+/)[0] ?? "");
  if (FEMALE_NAMES.has(first)) return "mujer";
  if (MALE_NAMES.has(first)) return "hombre";
  return first.endsWith("a") ? "mujer" : "hombre";
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ------- Generación de la foto única del caso -------
// Foto ÚNICA por caso: sexo coherente con el nombre y retrato casero en primer
// plano; el hash diversifica rasgos, edad, entorno y microdetalles.
async function generateAndUploadCasoHero(
  supabase: ReturnType<typeof createClient>,
  slug: string,
  seed: CasoSeed,
): Promise<string | null> {
  try {
    const h = hashSeed(slug);
    const gender = inferGenderFromName(seed.name);
    const age = pickBy(AGE_BANDS, h, 0);
    const looks = pickBy(ETHNIC_LOOKS, h, 2);
    const setting = pickBy(gender === "mujer" ? FEMALE_SETTINGS : MALE_SETTINGS, h, 3);
    const expression = pickBy(EXPRESSIONS, h, 4);
    const hair = pickBy(HAIR_DETAILS, h, 5);
    const face = pickBy(FACE_DETAILS, h, 6);
    const clothes = pickBy(CLOTHES, h, 7);
    const camera = pickBy(CAMERA_DETAILS, h, 8);
    const prompt = [
      "Genera una fotografía hiperrealista, NO ilustración, NO render, NO imagen de stock.",
      `Caso: ${seed.name}, ${seed.location}. La persona de la foto debe ser inequívocamente ${gender}; el sexo visual debe coincidir con el nombre del caso.`,
      `Retrato casero en primer plano/primerísimo primer plano de una sola persona adulta: ${gender} de ${age}, ${looks}, ${hair}, ${face}, ${expression}.`,
      `Escena: ${setting}, en ${seed.location}, España. Ropa: ${clothes}.`,
      `${camera}. Formato horizontal 3:2, cabeza y hombros, rostro ocupando el 65-75% de la imagen.`,
      "Debe parecer una foto real tomada en casa con móvil: luz natural, pequeñas imperfecciones, piel real, cero retoque publicitario.",
      "Prohibido: cara repetida o genérica, estética corporativa, pose de catálogo, traje, glamour, sonrisa de anuncio, oficina moderna, manos deformes, texto, logos, marcas de agua, collage, carteles, celebridades o personas identificables reales.",
    ].join(" ");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!res.ok) {
      console.error(`Caso image AI error ${res.status} for ${slug}: ${await res.text()}`);
      return null;
    }
    const data = await res.json();
    const base64: string | undefined = data?.data?.[0]?.b64_json;
    if (!base64) {
      console.error(`No caso image returned for ${slug}`);
      return null;
    }
    const rawBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const path = `casos/${slug}-retrato-casero-v2.png`;
    const { error: upErr } = await supabase.storage
      .from("blog-images")
      .upload(path, rawBytes, {
        contentType: "image/png",
        upsert: true,
        cacheControl: "31536000",
      });
    if (upErr) {
      console.error(`Upload caso failed for ${slug}: ${upErr.message}`);
      return null;
    }
    const { data: signed } = await supabase.storage
      .from("blog-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    return signed?.signedUrl ?? null;
  } catch (e) {
    console.error(`generateAndUploadCasoHero error for ${slug}: ${String(e)}`);
    return null;
  }
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

interface CasoSeed {
  category: string;
  name: string;
  location: string;
}

function buildSeed(forceLso: boolean): CasoSeed {
  const category = forceLso ? LSO_CATEGORY : pick(OTHER_CATEGORIES);
  const name = `${pick(FIRST_NAMES)} ${pick(SURNAME_INITIALS)}.`;
  const location = pick(CITIES);
  return { category, name, location };
}

const SYSTEM_PROMPT = `Eres redactor de Calma (antes "Adiós Deudas"), una firma española de abogados especializada en insolvencia, segunda oportunidad y derecho bancario. Escribes "casos de éxito" en estilo reportaje humano, en español de España, sobre personas reales anonimizadas que resolvieron sus deudas con Calma.

REGLAS EDITORIALES INNEGOCIABLES:
- El caso es ILUSTRATIVO y representativo del tipo de resultados que Calma consigue; mantén nombre (solo nombre de pila + inicial), ciudad e importe que se te indican.
- NUNCA inventes estadísticas globales de Calma (número de casos totales, porcentajes de éxito, dinero total cancelado por la firma). El único importe que puedes citar es el del caso concreto.
- Triage de soluciones: LSO (Ley de Segunda Oportunidad) = persona insolvente SIN bienes pagados de valor; reunificar = insolvente CON bienes de valor pagados; reclamación judicial = persona solvente + usura + deuda baja.
- Reunificar = negociación extrajudicial que baja la cuota Y el total adeudado, SIN préstamo nuevo. NUNCA lo describas como agrupar, pedir un préstamo, hipotecar o alargar el plazo.
- Tono empático, cercano y honesto. Cero promesas garantizadas. El CTA invita a la valoración gratuita.

REGLAS DE TITULARES (INNEGOCIABLES — la mayoría de titulares automáticos que hemos rechazado incumplen esto):
- El "headline" es un titular de reportaje humano, tipo prensa larga, NO un anuncio ni una ficha ("Nombre X. de Ciudad cancela N € con LSO" está PROHIBIDO).
- Patrón obligatorio: una escena, síntoma o momento concreto + dos puntos + el desenlace/solución. Concreto, sensorial, humano. Puede incluir el importe o la ciudad, pero NO puede reducirse a "Nombre + Ciudad + Importe + Ley".
- Prohibido: empezar con el nombre + apellido inicial; frases tipo "logra reducir su deuda", "adiós a X €", "caso de éxito", "gracias a Calma", "¡Calma!", "libérate", "empezar de cero" y cualquier eslogan de firma.
- Prohibido usar la marca Calma en el headline o en el seoTitle. Nada de "| Calma", "con Calma", "Caso Calma".
- Longitud del headline: 60–95 caracteres. Sin emojis. Sin mayúsculas gritadas.
- seoTitle: < 60 caracteres, con gancho, SIN marca, SIN emoji, SIN "| Calma". Debe diferenciarse del headline (más corto y más SEO), no ser una copia recortada.

EJEMPLOS DE HEADLINES DEL NIVEL QUE ESPERAMOS (imita el ESTILO, no copies literal):
- "Le congelaron la cuenta un viernes: cómo Pilar actuó el fin de semana y evitó perder sus ahorros en Valencia"
- "De pedir microcréditos para pagar microcréditos a cancelar 22.179 € en Sabadell"
- "Le embargaban la nómina cada mes: cómo Gonzalo canceló 88.600 € y recuperó su sueldo"
- "Siete acreedores distintos, una sola solución: Marina cancela 61.400 € en Bilbao"
- "La carta de Hacienda que le heló la sangre a Andrés: cómo paró el apremio a tiempo y ordenó su deuda"
- "Pagaba a cinco entidades y llegaba al límite cada mes: cómo Daniel bajó su cuota un 45% sin pedir ningún préstamo nuevo"
- "Pagó durante años y la deuda no bajaba: reclamó por usura y recuperó 5.120 €"

FORMATO DE SALIDA: devuelve ÚNICAMENTE JSON válido (sin markdown) con esta forma exacta:
{
  "debtAmount": "ETIQUETA de resultado para la badge de la card. DEBE incluir siempre su sufijo/contexto, NUNCA solo la cifra. Variar según categoría: LSO/Concurso persona física → 'X € cancelados'; Reclamación revolving/usura → 'X € recuperados'; Reunificación → una de: 'Cuota -N%', 'N cuotas → 1', 'X €/mes menos'; Salir de ASNEF → 'Fuera de ASNEF'; Hacienda/Seguridad Social → 'Apremio parado' o 'Aplazado a N meses'; Embargo → 'Embargo levantado' o 'Nómina liberada'. Máx 24 caracteres.",
  "solution": "solución legal aplicada en una línea",
  "headline": "titular tipo reportaje humano de 60–95 caracteres siguiendo el patrón escena/síntoma + ':' + desenlace. Sin marca, sin emojis, sin fórmulas tipo 'Nombre de Ciudad cancela X €'.",
  "dek": "entradilla/dek de 1-2 frases",
  "readTime": "p.ej. '6 min'",
  "heroAlt": "texto alternativo descriptivo de una foto de la persona",
  "seoTitle": "título SEO < 60 caracteres, con gancho de CTR, SIN marca, SIN emoji, SIN '| Calma'. Diferente del headline.",
  "metaDescription": "meta descripción < 160 caracteres, persuasiva",
  "keywords": ["5-8 keywords"],
  "sections": [{ "id": "slug-seccion", "title": "Título H2", "html": "<p>...</p> párrafos y listas. HTML semántico, sin estilos inline." }],
  "faq": [{ "question": "Pregunta", "answer": "Respuesta de 2-4 frases" }]
}
Genera 4-6 secciones (punto de quiebre, qué debía, qué solución aplicamos y por qué, cómo fue el proceso, vida después) y 3-4 FAQ.`;

async function generateCaso(seed: CasoSeed): Promise<Record<string, unknown> | null> {
  const userPrompt = `Redacta un caso de éxito real anonimizado de Calma con estos datos fijos:
- Persona: ${seed.name}
- Ciudad: ${seed.location}
- Tipo de caso / categoría: ${seed.category}

Elige un importe de deuda realista y coherente con la categoría (no exagerado) y la solución legal adecuada según el triage. Escribe el reportaje completo.`;

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
    console.error(`AI error ${res.status}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (_e) {
    console.error("JSON parse failed for caso");
    return null;
  }
}

async function uniqueSlug(supabase: ReturnType<typeof createClient>, base: string): Promise<string> {
  let slug = base;
  for (let i = 0; i < 6; i++) {
    const { data } = await supabase.from("generated_casos").select("slug").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    slug = `${base}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  return `${base}-${Date.now()}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Auth gate: cron/trusted scheduler con anon key pasa; un JWT real debe ser admin.
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

  let runSource = "cron-casos";
  try {
    const parsed = await req.clone().json();
    if (parsed?.source) runSource = String(parsed.source);
  } catch (_e) {
    // no body
  }

  const { data: runRow } = await supabase
    .from("generator_runs")
    .insert({ status: "running", source: runSource })
    .select("id")
    .single();
  const runId = runRow?.id as string | undefined;

  try {
    // 1 o 2 casos por ejecución (sesgo a 1).
    const target = Math.random() < 0.6 ? 1 : 2;
    // ~50% LSO: para 2, uno LSO y uno mix; para 1, 50/50.
    const lsoFlags = target === 2 ? [true, Math.random() < 0.5] : [Math.random() < 0.5];

    const published: string[] = [];
    let failed = 0;

    for (const forceLso of lsoFlags) {
      const seed = buildSeed(forceLso);
      const article = await generateCaso(seed);
      if (!article) {
        failed++;
        continue;
      }

      // Barrera anti-competidor: si el modelo introdujo alguna marca ajena,
      // descartamos el caso completo.
      if (containsCompetitor(article)) {
        console.warn(`Caso descartado: salida contiene marca de competidor.`);
        failed++;
        continue;
      }

      const headline = (article.headline as string) ?? `${seed.name} resuelve sus deudas en ${seed.location}`;
      const base = slugify(`${seed.name.replace(/\.$/, "")}-${seed.location}-${(article.debtAmount as string) ?? ""}`);
      const slug = await uniqueSlug(supabase, base || slugify(headline));
      const now = new Date().toISOString();

      // Foto única obligatoria: sexo coherente con el nombre, primer plano
      // casero-realista y rostro diversificado por hash del slug.
      const heroUrl = await generateAndUploadCasoHero(supabase, slug, seed);
      if (!heroUrl) {
        console.error(`Caso descartado: no se pudo generar retrato válido para ${slug}`);
        failed++;
        continue;
      }

      const { error: insErr } = await supabase.from("generated_casos").insert({
        slug,
        category: seed.category,
        name: seed.name,
        location: seed.location,
        debt_amount: (article.debtAmount as string) ?? "—",
        solution: (article.solution as string) ?? seed.category,
        headline,
        dek: (article.dek as string) ?? "",
        read_time: (article.readTime as string) ?? "6 min",
        hero_alt: (article.heroAlt as string) ?? headline,
        hero_image: heroUrl,
        sections: article.sections ?? [],
        faq: article.faq ?? [],
        keywords: article.keywords ?? [],
        seo_title: (article.seoTitle as string) ?? null,
        meta_description: (article.metaDescription as string) ?? null,
        status: "published",
        published_at: now,
      });

      if (insErr) {
        console.error(`Insert caso failed: ${insErr.message}`);
        failed++;
        continue;
      }
      published.push(slug);
    }

    if (runId) {
      await supabase
        .from("generator_runs")
        .update({
          status: failed && published.length === 0 ? "failed" : "success",
          finished_at: new Date().toISOString(),
          target,
          published_count: published.length,
          failed_count: failed,
          error: failed ? `Fallaron ${failed} casos` : null,
        })
        .eq("id", runId);
    }

    await notifyIndexNow(published);

    return new Response(
      JSON.stringify({ ok: true, target, published: published.length, slugs: published, failed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("generate-daily-casos error:", e);
    if (runId) {
      await supabase
        .from("generator_runs")
        .update({ status: "failed", finished_at: new Date().toISOString(), error: String(e) })
        .eq("id", runId);
    }
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});