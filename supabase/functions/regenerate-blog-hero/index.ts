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
    "sobre certificado medio metido en un buzón metálico de portal antiguo, pared con azulejos verdes gastados",
    "buzón metálico de portal en un bloque de pisos español, con un sobre asomando",
    "sobre cerrado sin abrir apoyado en un felpudo rojo de la entrada de un piso",
    "aviso postal amarillo pegado con celo en la puerta de un portal de vecinos",
  ]},
  { re: /juzgado|demanda|sentencia|judicial|monitorio/, variants: [
    "fachada de un juzgado español visto desde la acera, con el cartel institucional en piedra",
    "pasillo vacío de un juzgado español con bancos de madera pegados a la pared",
    "puerta cerrada de una sala de vistas con una placa numerada y suelo de terrazo",
    "tablón de anuncios judicial con papeles desenfocados y una carpeta azul apoyada debajo",
  ]},
  { re: /embargo|n[oó]mina|sueldo|salario/, variants: [
    "cajero automático en una calle española con persiana de comercio azul al lado, sin personas",
    "cajero automático encastrado en la fachada de una sucursal en una calle española",
    "monedas y algún billete pequeño sobre una mesa de formica verde de bar de barrio",
    "libreta bancaria vieja junto a un bolígrafo barato sobre una mesa de comedor con mantel estampado",
  ]},
  { re: /hipoteca|vivienda|piso|casa|inmueble|desahucio/, variants: [
    "portal de un bloque de viviendas español con fachada de ladrillo y toldos rojos visto desde la acera",
    "ventana de un piso con las persianas medio bajadas vista desde la calle",
    "llaves con llavero corriente sobre la encimera de una cocina española",
    "balcón de un piso con un cartel de 'Se vende' colgado, calle de barrio",
  ]},
  { re: /tarjeta|revolving|usura|cr[eé]dito/, variants: [
    "tarjeta bancaria gastada sobre una mesa de bar junto a un café cortado y una servilleta",
    "TPV de una cafetería española con una tarjeta apoyada encima",
    "datáfono de una tienda de barrio sobre un mostrador con azulejos amarillos, sin manos",
    "cajero automático de una calle española fotografiado desde un ángulo torcido, sin personas",
  ]},
  { re: /reunific|refinanc|cuota|consolidar|mensualidad/, variants: [
    "calendario de pared en una cocina, con marcas hechas a bolígrafo en varios días",
    "hucha de cerámica sobre una estantería del salón, junto a un marco de foto",
    "pizarra pequeña de cocina con varios pagos mensuales escritos a mano y un imán de nevera",
    "sobre de banco abierto junto a una taza azul en una mesa de terraza de barrio",
  ]},
  { re: /concurso|ley de la segunda oportunidad|lso|insolvenc/, variants: [
    "fachada de un despacho de abogados corriente en una calle española",
    "sala de espera vacía con sillas de plástico y una revista sobre una mesa baja",
    "placa institucional de 'Juzgado de lo Mercantil' en la pared exterior de un edificio",
    "carpeta azul cerrada sobre una silla de plástico en una sala de espera vacía",
  ]},
  { re: /banco|entidad|sucursal/, variants: [
    "fachada corriente de una oficina bancaria en una calle española con transeúntes pasando",
    "cajero automático empotrado en la pared exterior de una sucursal",
    "cola de personas esperando dentro de una oficina bancaria corriente",
    "letrero genérico de un banco en la fachada visto desde la acera opuesta",
  ]},
  { re: /deuda|impago|moros|asnef/, variants: [
    "móvil boca abajo sobre una mesa de terraza con una notificación desenfocada de banco",
    "buzón de portal a rebosar, con sobres asomando por la ranura",
    "timbre y placa metálica de un portal de vecinos en una calle española",
    "papel de aviso doblado junto a unas llaves sobre una mesilla de entrada con pared color salmón",
  ]},
  { re: /pensi[oó]n|jubilaci[oó]n|mayor/, variants: [
    "cartilla del banco antigua sobre la mesa camilla del comedor",
    "banco vacío de una plaza de barrio con una bolsa de la compra apoyada al lado",
    "pastillero semanal y recibo doblado sobre una mesa camilla con hule de flores",
    "fachada de una oficina de pensiones o administración pública vista desde la acera",
  ]},
  { re: /aut[oó]nomo|freelance|hacienda|impuesto|iva|irpf/, variants: [
    "mostrador de una tienda de barrio con datáfono, cinta adhesiva y libreta de cuentas, sin personas",
    "portátil abierto sobre una mesa de bar con un café al lado",
    "furgoneta comercial pequeña aparcada en una calle española",
    "taller mecánico corriente con herramientas colgadas y una factura doblada en el banco de trabajo, sin personas",
  ]},
];

const DEFAULT_VARIANTS = [
  "mesa de bar de barrio con café, servilletero metálico y luz de mediodía entrando desde la calle",
  "portal de vecinos español con azulejos azules, buzones antiguos y luz fría de fluorescente",
  "fachada de una gestoría de barrio con persiana verde medio subida y papeles pegados en el cristal",
  "parada de autobús de barrio tras una lluvia ligera, con pavimento brillante y carteles pegados",
  "encimera de cocina real con llaves, una carta cerrada y una taza naranja usada",
  "mesa de comedor con mantel estampado, libreta abierta y bolígrafo rojo, sin personas",
];

function sceneFromTitle(title: string, category: string, slug: string): string {
  const t = `${title} ${category}`.toLowerCase();
  const h = hashSlug(slug);
  for (const r of SCENE_RULES) if (r.re.test(t)) return pick(r.variants, h);
  return pick(DEFAULT_VARIANTS, h);
}

const PHOTO_STYLE_VARIANTS = [
  "flash automático suave de móvil en interior, sombras pequeñas bajo los objetos, colores de barrio sin corregir",
  "luz lateral de una ventana real, una zona algo subexpuesta y balance de blancos imperfecto",
  "mediodía nublado en calle española, pavimento gris, toldos y fachadas con color real",
  "luz de fluorescente de portal o comercio, ligera dominante verdosa, textura visible en paredes y suelo",
  "foto vertical recortada después a horizontal, encuadre torcido y bordes con elementos cortados",
  "luz de tarde normal, no dorada, contraste medio y ruido fino típico de sensor de móvil",
];

function photoStyleForSlug(slug: string): string {
  return pick(PHOTO_STYLE_VARIANTS, hashSlug(`${slug}-style`));
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
- Máximo UNA persona en la escena. Prohibido parejas, familias, grupos, dos personas frente a un portátil, gestor atendiendo a cliente, cualquier interacción entre dos personas. Prioriza escenas SIN personas (objetos, lugares, exteriores, interiores vacíos) o con una sola persona de espaldas, de perfil o mostrando solo manos. NUNCA mirando a cámara.
- Si aparece un móvil, NUNCA con la pantalla enfocada de frente a cámara. Móvil visto de lado, en un bolsillo, boca abajo o desde detrás del hombro.
- Prohibido por defecto: montones de papeles/facturas sobre una mesa, cocinas como escenario, familias sonrientes, salones de anuncio, calculadoras solas, tickets arrugados, parejas o gestor+cliente frente a un ordenador, dos personas conversando en oficina, familia mirando papeles.
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
  // No usamos un LLM para inventar escenas: fue la fuente de parejas,
  // consultores y fotos stock. La escena sale de reglas cerradas y baratas.
  const scene = sceneFromTitle(title, category, slug);
  const paperWords = /papel|carta|factura|recibo|extracto|carpeta|sobre|ticket|documento/;
  const banPapers = !paperWords.test(scene);
  const style = photoStyleForSlug(slug);
  return `Fotografía documental casual tomada con un teléfono móvil moderno (iPhone/Samsung), estilo snapshot cotidiano español. NO profesional, NO editorial, NO publicidad, NO stock.

Escena literal (debe reconocerse a simple vista y coincidir con el título "${title}"): ${scene}

Restricción principal: imagen SIN personas reconocibles. No caras, no parejas, no familias, no asesor con cliente, no reunión, no dos personas. Si aparece una figura humana solo puede ser fondo lejano desenfocado o manos parciales, nunca protagonista.

Estética coherente pero NO neutra:
- Smartphone a mano, ligera imperfección de encuadre, focal ~24-28mm, profundidad de campo amplia sin bokeh cinematográfico.
- ${style}.
- Incluir al menos 2 detalles con color realista y cotidiano (toldo rojo, azulejo verde/azul, taza naranja, persiana amarilla, cartel municipal, mantel estampado), sin convertirlo en imagen saturada.
- Espacios españoles corrientes con objetos usados, marcas de desgaste, polvo leve, esquinas imperfectas, nada de casa de revista.
- Si aparece un móvil, se ve de lado, boca abajo o desde detrás del hombro. NUNCA con la pantalla encarada a cámara.

Prohibido: paleta beige/gris neutra dominante, oficinas blancas luminosas, fotos de banco de imágenes, personas posando, personas sentadas revisando papeles, HDR, filtros, viñeteo, golden hour, dominantes amarillas cinematográficas, sonrisas de catálogo, familia perfecta con tablet, salones blancos de anuncio, plantas decorativas exageradas, texto o logos legibles en la imagen, marcas de agua, collages, pantallas de móvil orientadas a cámara, personas mirando al objetivo, dos personas juntas en el encuadre, parejas, familias, gestor+cliente, cualquier interacción entre dos personas, escenas tipo consulta profesional con dos personas frente a una pantalla${banPapers ? ", montones de papeles/facturas/documentos desperdigados sobre mesas (cliché a evitar salvo que la escena lo pida explícitamente)" : ""}.`;
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