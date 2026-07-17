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
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-lite",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: usr },
        ],
      }),
    });
    if (!res.ok) { console.error(`sceneFromLLM ${res.status}: ${await res.text()}`); return null; }
    const data = await res.json();
    const raw: string | undefined = data?.choices?.[0]?.message?.content;
    if (!raw) return null;
    const line = raw.replace(/^["'`\s]+|["'`\s]+$/g, "").split("\n")[0].trim();
    if (line.length < 40 || line.length > 260) return null;
    return line;
  } catch (e) { console.error(`sceneFromLLM threw: ${String(e)}`); return null; }
}

async function buildPrompt(title: string, category: string, slug: string): Promise<string> {
  const llmScene = await sceneFromLLM(title, category);
  const scene = llmScene ?? sceneFromTitle(title, category, slug);
  const paperWords = /papel|carta|factura|recibo|extracto|carpeta|sobre|ticket|documento/;
  const banPapers = !paperWords.test(scene);
  return `Fotografía casual tomada con un teléfono móvil moderno (iPhone/Samsung), estilo snapshot cotidiano español. NO profesional, NO editorial, NO publicidad, NO stock.

Escena literal (debe reconocerse a simple vista y coincidir con el título "${title}"): ${scene}

Estética coherente en todas las portadas:
- Smartphone a mano, ligera imperfección de encuadre, focal ~24-28mm, profundidad de campo amplia sin bokeh cinematográfico.
- Solo luz natural existente (ventana, calle, lámpara doméstica). Balance de blancos neutro. Colores apagados y reales tal cual salen del móvil.
- Personas y espacios españoles corrientes, ropa normal, objetos con uso real, casas normales no de revista.
- Si hay una persona, aparece de espaldas, de perfil o solo sus manos. NUNCA mira al objetivo.
- Si aparece un móvil, se ve de lado, boca abajo o desde detrás del hombro. NUNCA con la pantalla encarada a cámara.

Prohibido: HDR, filtros, viñeteo, golden hour, dominantes amarillas o cinematográficas, sonrisas de catálogo, familia perfecta con tablet, salones blancos de anuncio, plantas decorativas exageradas, texto o logos en la imagen, marcas de agua, collages, pantallas de móvil orientadas a cámara, personas mirando al objetivo${banPapers ? ", montones de papeles/facturas/documentos desperdigados sobre mesas (cliché a evitar salvo que la escena lo pida explícitamente)" : ""}.`;
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
        console.error(`image AI ${a.model} ${res.status}: ${await res.text()}`);
        continue;
      }
      const data = await res.json();
      const b64: string | undefined = data?.data?.[0]?.b64_json;
      if (!b64) { console.error(`image AI ${a.model}: no b64_json`); continue; }
      return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    } catch (e) {
      console.error(`image AI ${a.model} threw: ${String(e)}`);
    }
  }
  return null;
}

async function regenerate(supabase: ReturnType<typeof createClient>, slug: string, title: string, category: string) {
  const prompt = await buildPrompt(title, category, slug);
  const raw = await generateImageBytes(prompt);
  if (!raw) throw new Error("no image returned");
  const optimized = await optimize(raw);
  const isJpeg = optimized !== null;
  const bytes = optimized ?? raw;
  const path = `${slug}.${isJpeg ? "jpg" : "png"}`;
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
  await supabase.from("generated_posts").update({ hero_image: url }).eq("slug", slug);
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