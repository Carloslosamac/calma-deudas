import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const AGE_BANDS = ["unos 28 años", "unos 34 años", "unos 41 años", "unos 47 años", "unos 55 años", "unos 62 años"];
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
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zñ]/g, "");
}

function inferGenderFromName(name: string): PersonGender {
  const first = normalizeName(name.split(/\s+/)[0] ?? "");
  if (FEMALE_NAMES.has(first)) return "mujer";
  if (MALE_NAMES.has(first)) return "hombre";
  return first.endsWith("a") ? "mujer" : "hombre";
}

async function generateHero(slug: string, name: string, location: string): Promise<Uint8Array | null> {
  const h = hashSeed(slug);
  const age = pickBy(AGE_BANDS, h, 0);
  const gender = inferGenderFromName(name);
  const looks = pickBy(ETHNIC_LOOKS, h, 2);
  const setting = pickBy(gender === "mujer" ? FEMALE_SETTINGS : MALE_SETTINGS, h, 3);
  const expression = pickBy(EXPRESSIONS, h, 4);
  const hair = pickBy(HAIR_DETAILS, h, 5);
  const face = pickBy(FACE_DETAILS, h, 6);
  const clothes = pickBy(CLOTHES, h, 7);
  const camera = pickBy(CAMERA_DETAILS, h, 8);
  const prompt = [
    "Genera una fotografía hiperrealista, NO ilustración, NO render, NO imagen de stock.",
    `Caso: ${name}, ${location}. La persona de la foto debe ser inequívocamente ${gender}; el sexo visual debe coincidir con el nombre del caso.`,
    `Retrato casero en primer plano/primerísimo primer plano de una sola persona adulta: ${gender} de ${age}, ${looks}, ${hair}, ${face}, ${expression}.`,
    `Escena: ${setting}, en ${location}, España. Ropa: ${clothes}.`,
    `${camera}. Formato horizontal 3:2, cabeza y hombros, rostro ocupando el 65-75% de la imagen.`,
    "Debe parecer una foto real tomada en casa con móvil: luz natural, pequeñas imperfecciones, piel real, cero retoque publicitario.",
    "Prohibido: cara repetida o genérica, estética corporativa, pose de catálogo, traje, glamour, sonrisa de anuncio, oficina moderna, manos deformes, texto, logos, marcas de agua, collage, carteles, celebridades o personas identificables reales.",
  ].join(" ");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) {
    console.error(`Image AI error ${res.status}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  const base64: string | undefined = data?.data?.[0]?.b64_json;
  if (!base64) return null;
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Auth: admin JWT o anon (para invocación desde herramienta interna).
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (token && token !== Deno.env.get("SUPABASE_ANON_KEY")) {
    const { data: userData } = await supabase.auth.getUser(token);
    if (userData?.user) {
      const { data: roleRow } = await supabase
        .from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        return new Response(JSON.stringify({ ok: false, error: "Solo administradores" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
  }

  let limit = 1;
  let force = false;
  try {
    const b = await req.clone().json();
    if (typeof b?.limit === "number") limit = Math.max(1, Math.min(5, b.limit));
    force = b?.force === true;
  } catch (_e) { /* ignore */ }

  let query = supabase
    .from("generated_casos")
    .select("slug,name,location,hero_image")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  query = force ? query.not("hero_image", "ilike", "%retrato-casero-v2%") : query.is("hero_image", null);
  const { data: rows, error } = await query;
  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const started = Date.now();
  const done: string[] = [];
  const failed: string[] = [];
  for (const row of rows ?? []) {
    if (Date.now() - started > 120_000) break;
    const raw = await generateHero(row.slug as string, row.name as string, row.location as string);
    if (!raw) { failed.push(row.slug as string); continue; }
    const path = `casos/${row.slug}-retrato-casero-v2.png`;
    const { error: upErr } = await supabase.storage.from("blog-images").upload(path, bytes, {
      contentType: "image/png", upsert: true, cacheControl: "31536000",
    });
    if (upErr) { failed.push(row.slug as string); continue; }
    const { data: signed } = await supabase.storage.from("blog-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    const url = signed?.signedUrl ?? null;
    if (!url) { failed.push(row.slug as string); continue; }
    const { error: updErr } = await supabase.from("generated_casos").update({ hero_image: url }).eq("slug", row.slug);
    if (updErr) { failed.push(row.slug as string); continue; }
    done.push(row.slug as string);
  }

  let remainingQuery = supabase
    .from("generated_casos").select("*", { count: "exact", head: true })
    .eq("status", "published");
  remainingQuery = force
    ? remainingQuery.not("hero_image", "ilike", "%retrato-casero-v2%")
    : remainingQuery.is("hero_image", null);
  const { count: remaining } = await remainingQuery;

  return new Response(JSON.stringify({ ok: true, done, failed, remaining }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});