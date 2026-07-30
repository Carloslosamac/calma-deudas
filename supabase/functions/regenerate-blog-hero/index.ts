import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

// Deriva localmente (sin llamada IA) una escena literal ligada al título.
// Cada regla tiene varias variantes; la elegida es determinista por slug para
// dar variedad entre posts sin que una imagen cambie entre regeneraciones.
// Solo una minoría de variantes menciona papeles/facturas para evitar el
// cliché de "mesa llena de papeleo" en todas las portadas.
function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}
function pick<T>(arr: T[], seed: number): T { return arr[seed % arr.length]; }

const SCENE_RULES: { re: RegExp; variants: string[] }[] = [
  { re: /burofax|carta certificad|requerimiento|notificaci[oó]n/, variants: [
    "una mujer de unos 40 años abriendo su buzón en el portal de un bloque de pisos español, vista de perfil, con un sobre en la mano",
    "un hombre de espaldas revisando el correo recién sacado del buzón junto a la puerta de su portal",
    "buzones de un portal de vecinos español bien conservado, con un sobre asomando en uno de ellos",
    "una persona de perfil leyendo una carta apoyada en la encimera de su cocina, luz de ventana",
  ]},
  { re: /juzgado|demanda|sentencia|judicial|monitorio/, variants: [
    "una persona cruzando la entrada de un juzgado español, vista de espaldas desde la acera",
    "pasillo de un juzgado español con una persona sentada a media distancia mirando el móvil",
    "fachada de un juzgado español con el cartel institucional en piedra y transeúntes desenfocados",
    "un hombre de perfil esperando de pie en un pasillo institucional, carpeta bajo el brazo",
  ]},
  { re: /embargo|n[oó]mina|sueldo|salario/, variants: [
    "una persona sacando dinero en un cajero automático de calle en España, vista de espaldas",
    "un hombre de perfil consultando el móvil junto a un cajero de una sucursal en una calle con toldos",
    "una mujer revisando su nómina en papel sentada a la mesa de su comedor, luz natural de ventana",
    "cajero automático en una calle española concurrida, con gente desenfocada al fondo",
  ]},
  { re: /hipoteca|vivienda|piso|casa|inmueble|desahucio/, variants: [
    "una persona cerrando con llave la puerta de su piso, vista de espaldas en el rellano",
    "portal de un bloque de viviendas español con fachada de ladrillo y toldos rojos, una persona entrando",
    "una mujer de perfil asomada al balcón de su piso en una calle de barrio",
    "llaves sobre la encimera de una cocina española ordenada, con luz de ventana",
  ]},
  { re: /tarjeta|revolving|usura|cr[eé]dito/, variants: [
    "una persona pagando con tarjeta en el datáfono de una cafetería española, encuadre a media distancia",
    "un hombre de perfil revisando el extracto de su tarjeta en el móvil, sentado en una terraza",
    "tarjeta bancaria junto a un café cortado en la mesa de un bar español, con clientes desenfocados al fondo",
    "mostrador de una tienda de barrio con datáfono y la dependienta de perfil colocando género",
  ]},
  { re: /reunific|refinanc|cuota|consolidar|mensualidad/, variants: [
    "una mujer de perfil anotando pagos en un calendario de pared de su cocina",
    "un hombre haciendo cuentas en una libreta sentado a la mesa del comedor, luz natural",
    "calendario de cocina con varios días marcados a bolígrafo, taza de café al lado",
    "una persona de espaldas consultando la app del banco en el móvil en su salón",
  ]},
  { re: /concurso|ley de la segunda oportunidad|lso|insolvenc/, variants: [
    "una persona esperando sentada en la sala de espera sencilla de un despacho español, de perfil",
    "un hombre de espaldas entrando en un despacho de abogados de calle en España",
    "una mujer de perfil firmando unos documentos sobre una mesa de madera en un despacho modesto",
    "fachada de un despacho de abogados en una calle española con una persona pasando por delante",
  ]},
  { re: /banco|entidad|sucursal/, variants: [
    "una persona esperando su turno de pie en una oficina bancaria española, vista de espaldas",
    "un hombre de perfil hablando por teléfono en la acera frente a una sucursal bancaria",
    "interior sencillo de una oficina bancaria española con un cliente sentado a media distancia",
    "fachada de una sucursal bancaria en una calle española con transeúntes desenfocados",
  ]},
  { re: /deuda|impago|moros|asnef/, variants: [
    "una mujer de perfil mirando el móvil sentada en la terraza de un bar español",
    "un hombre revisando papeles del banco en la mesa de su cocina, visto desde un lado",
    "una persona de espaldas sacando cartas del buzón del portal",
    "móvil y cuaderno sobre la mesa de una terraza española, gente desenfocada al fondo",
  ]},
  { re: /pensi[oó]n|jubilaci[oó]n|mayor/, variants: [
    "un hombre mayor de perfil sentado en un banco de una plaza española",
    "una mujer mayor revisando su cartilla del banco en la mesa del comedor",
    "una persona mayor de espaldas entrando en una oficina de administración pública",
    "señor mayor caminando con la bolsa de la compra por una calle de barrio, visto de espaldas",
  ]},
  { re: /aut[oó]nomo|freelance|hacienda|impuesto|iva|irpf/, variants: [
    "un autónomo de perfil atendiendo el mostrador de su pequeño comercio en España",
    "una mujer trabajando con su portátil en la mesa de un bar español, vista de lado",
    "un mecánico de perfil trabajando en su taller ordenado, herramientas colgadas al fondo",
    "una persona de espaldas cargando cajas en una furgoneta comercial en una calle española",
  ]},
];

const DEFAULT_VARIANTS = [
  "una persona de perfil tomando café en la terraza de un bar español mientras mira el móvil",
  "un hombre de espaldas caminando por una calle española con toldos y comercios abiertos",
  "una mujer de perfil escribiendo en una libreta en la mesa de su comedor, luz de ventana",
  "una persona esperando en una parada de autobús de barrio, vista a media distancia",
  "mesa de cocina española ordenada con café, libreta y llaves, luz natural de mediodía",
  "una persona de espaldas abriendo la puerta de su casa en un rellano con luz natural",
];

function sceneFromTitle(title: string, category: string, slug: string): string {
  const t = `${title} ${category}`.toLowerCase();
  const h = hashSlug(slug);
  for (const r of SCENE_RULES) if (r.re.test(t)) return pick(r.variants, h);
  return pick(DEFAULT_VARIANTS, h);
}

function heroAltFromScene(title: string, scene: string): string {
  return `Fotografía documental sin personas de ${scene}, relacionada con ${title}`;
}

const PHOTO_STYLE_VARIANTS = [
  "luz natural de ventana, colores reales sin corregir en exceso, contraste medio",
  "luz lateral suave de interior, balance de blancos ligeramente imperfecto pero agradable",
  "mediodía en calle española, cielo claro, toldos y fachadas con color real",
  "interior bien iluminado de comercio o vivienda, luz mixta natural y artificial",
  "encuadre ligeramente descentrado, como una foto rápida hecha con el móvil",
  "luz de tarde normal, no dorada, ruido fino típico de sensor de móvil moderno",
];

function photoStyleForSlug(slug: string): string {
  return pick(PHOTO_STYLE_VARIANTS, hashSlug(`${slug}-style`));
}

async function buildPrompt(title: string, category: string, slug: string): Promise<string> {
  // No usamos un LLM para inventar escenas: fue la fuente de parejas,
  // consultores y fotos stock. La escena sale de reglas cerradas y baratas.
  const scene = sceneFromTitle(title, category, slug);
  const paperWords = /papel|carta|factura|recibo|extracto|carpeta|sobre|ticket|documento/;
  const banPapers = !paperWords.test(scene);
  const style = photoStyleForSlug(slug);
  return `Fotografía documental realista tomada con un teléfono móvil moderno (iPhone/Samsung) en España. Estilo snapshot cotidiano y creíble. NO publicidad, NO banco de imágenes, NO catálogo.

Escena literal (debe reconocerse a simple vista y coincidir con el título "${title}"): ${scene}

Personas: si la escena las incluye, aparece UNA sola persona (máximo dos si la escena lo exige), integrada de forma natural en el entorno y haciendo algo concreto. Puede verse de espaldas, de perfil, a media distancia o parcialmente cortada por el encuadre. PROHIBIDO: mirar a cámara, posar, sonrisa de catálogo, gesto teatral de preocupación con la cabeza entre las manos, manos entrelazadas sobre la mesa, asesor y cliente frente a un portátil, apretón de manos, familia perfecta, grupo reunido alrededor de documentos.

Estética coherente, cotidiana y DIGNA (ni lujo ni pobreza):
- Smartphone a mano, ligera imperfección de encuadre, focal ~24-28mm, profundidad de campo amplia sin bokeh cinematográfico.
- ${style}.
- Incluir al menos 2 detalles con color realista y cotidiano (toldo rojo, azulejo verde/azul, taza naranja, persiana amarilla, cartel municipal, mantel estampado), sin convertirlo en imagen saturada.
- Espacios españoles reconocibles, ordenados y cuidados: vividos pero limpios. Nada de casa de revista, y tampoco deterioro, suciedad, polvo, objetos rotos ni estética de pobreza.
- Si aparece un móvil o un portátil, la pantalla nunca está encarada a cámara.

Prohibido: fondos blancos o neutros sin contexto, oficinas acristaladas luminosas de anuncio, salas de reuniones corporativas, mobiliario de catálogo, plantas decorativas de escaparate, paleta beige/gris dominante, estética de banco de imágenes, personas posando o mirando al objetivo, sonrisas comerciales, familia perfecta con tablet, salones blancos de anuncio, HDR, filtros, viñeteo, golden hour, dominantes amarillas cinematográficas, suciedad, deterioro, abandono, objetos rotos, ambiente de pobreza, texto o logos legibles, marcas de agua, collages${banPapers ? ", montones de papeles y facturas desperdigados sobre la mesa (cliché a evitar salvo que la escena lo pida)" : ""}.`;
}

async function optimize(pngBytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const img = await Image.decode(pngBytes);
    if (img.width > MAX_WIDTH) img.resize(MAX_WIDTH, Image.RESIZE_AUTO);
    return await img.encodeJPEG(JPEG_QUALITY);
  } catch { return null; }
}

// Llama a un modelo de imagen vía /v1/images/generations. Modelo por defecto:
// gemini-3.1-flash-lite-image (Nano Banana 2 Lite, el más barato de Gemini).
// Body en formato Vertex generateContent, que es lo que este modelo requiere.
async function generateImageBytes(prompt: string): Promise<Uint8Array | null> {
  const liteBody = {
    model: "google/gemini-3.1-flash-lite-image",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  };
  const proBody = {
    model: "google/gemini-3.1-flash-image",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  };
  const tryOnce = async (model: string, body: unknown): Promise<Uint8Array | null> => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 45000);
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: ctrl.signal,
      });
      if (!res.ok) { console.error(`image AI ${model} ${res.status}: ${await res.text()}`); return null; }
      const data = await res.json();
      const b64: string | undefined = data?.data?.[0]?.b64_json;
      if (!b64) { console.error(`image AI ${model}: no b64_json`); return null; }
      return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    } catch (e) {
      console.error(`image AI ${model} threw: ${String(e)}`);
      return null;
    } finally { clearTimeout(t); }
  };
  const backoffs = [0, 1000, 3000];
  for (let i = 0; i < backoffs.length; i++) {
    if (backoffs[i] > 0) await new Promise((r) => setTimeout(r, backoffs[i]));
    const bytes = await tryOnce("google/gemini-3.1-flash-lite-image", liteBody);
    if (bytes) return bytes;
  }
  console.warn(`image AI: Lite falló 3 veces, probando Nano Banana 2 no-Lite`);
  return await tryOnce("google/gemini-3.1-flash-image", proBody);
}

async function regenerate(supabase: ReturnType<typeof createClient>, slug: string, title: string, category: string) {
  const scene = sceneFromTitle(title, category, slug);
  const prompt = await buildPrompt(title, category, slug);
  const raw = await generateImageBytes(prompt);
  if (!raw) throw new Error("no image returned");
  const optimized = await optimize(raw);
  const isJpeg = optimized !== null;
  const bytes = optimized ?? raw;
  const path = `${slug}-${Date.now()}.${isJpeg ? "jpg" : "png"}`;
  const { error: upErr } = await supabase.storage.from("blog-images").upload(path, bytes, {
    contentType: isJpeg ? "image/jpeg" : "image/png",
    upsert: true,
    cacheControl: "31536000",
  });
  if (upErr) throw new Error(`upload: ${upErr.message}`);
  const { data: signed } = await supabase.storage
    .from("blog-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  const url = signed?.signedUrl;
  if (!url) throw new Error("sign failed");
  await supabase
    .from("generated_posts")
    .update({ hero_image: url, hero_alt: heroAltFromScene(title, scene) })
    .eq("slug", slug);
  return url;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  let slugs: string[] = [];
  let limit = 0;
  let offset = 0;
  let order: "asc" | "desc" = "desc";
  try {
    const body = await req.json();
    if (Array.isArray(body?.slugs)) slugs = body.slugs;
    if (typeof body?.limit === "number") limit = body.limit;
    if (typeof body?.offset === "number") offset = body.offset;
    if (body?.order === "asc" || body?.order === "desc") order = body.order;
  } catch { /* body opcional */ }

  let rows: { slug: string; title: string; category: string }[] = [];
  if (slugs.length > 0) {
    const { data } = await supabase
      .from("generated_posts")
      .select("slug,title,category")
      .in("slug", slugs);
    rows = (data ?? []) as typeof rows;
  } else if (limit > 0) {
    const { data } = await supabase
      .from("generated_posts")
      .select("slug,title,category,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: order === "asc", nullsFirst: false })
      .range(offset, offset + limit - 1);
    rows = (data ?? []) as typeof rows;
  }

  const results: { slug: string; ok: boolean; url?: string; error?: string }[] = [];
  for (const r of rows) {
    try {
      const url = await regenerate(supabase, r.slug, r.title, r.category);
      results.push({ slug: r.slug, ok: true, url });
    } catch (e) {
      results.push({ slug: r.slug, ok: false, error: String(e) });
    }
  }
  return new Response(JSON.stringify({ ok: true, results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});