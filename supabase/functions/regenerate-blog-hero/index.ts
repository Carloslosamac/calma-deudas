import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

// Deriva localmente (sin llamada IA) una escena literal ligada al título.
// Ahorra 1 llamada de LLM por imagen sin perder relevancia visual.
function sceneFromTitle(title: string, category: string): string {
  const t = `${title} ${category}`.toLowerCase();
  const rules: { re: RegExp; scene: string }[] = [
    { re: /burofax|carta certificad|requerimiento|notificaci[oó]n/, scene: "manos de una persona española sosteniendo una carta certificada con logotipo bancario, sobre la mesa de una cocina normal" },
    { re: /juzgado|demanda|sentencia|judicial|monitorio/, scene: "persona española esperando sentada con una carpeta de papeles en el pasillo de un juzgado español corriente" },
    { re: /embargo|n[oó]mina|sueldo|salario/, scene: "recibo de nómina en papel sobre una mesa de comedor, junto a un bolígrafo y una calculadora doméstica" },
    { re: /hipoteca|vivienda|piso|casa|inmueble|desahucio/, scene: "portal de un bloque de viviendas español visto desde la acera, buzones a la vista" },
    { re: /tarjeta|revolving|usura|cr[eé]dito/, scene: "tarjeta de crédito y un extracto bancario impreso en primer plano sobre una mesa de comedor" },
    { re: /reunific|refinanc|cuota|consolidar|mensualidad/, scene: "persona española revisando varios recibos y facturas extendidos sobre la mesa del salón" },
    { re: /concurso|ley de la segunda oportunidad|lso|insolvenc/, scene: "persona española con una carpeta abierta llena de facturas encima de la mesa de la cocina" },
    { re: /banco|entidad|sucursal/, scene: "fachada corriente de una oficina bancaria en una calle española, con transeúntes pasando" },
    { re: /deuda|impago|moros|asnef/, scene: "montón de facturas y sobres sin abrir apilados en la mesa del recibidor de una casa española normal" },
    { re: /pensi[oó]n|jubilaci[oó]n|mayor/, scene: "persona mayor española sentada en el sofá revisando una carta oficial en papel" },
    { re: /aut[oó]nomo|freelance|hacienda|impuesto|iva|irpf/, scene: "autónomo español en la mesa del salón con el portátil abierto y papeles de facturas alrededor" },
  ];
  for (const r of rules) if (r.re.test(t)) return r.scene;
  return `persona española corriente en una situación cotidiana relacionada con "${title}", con documentos o facturas visibles en primer plano`;
}

function buildPrompt(title: string, category: string): string {
  const scene = sceneFromTitle(title, category);
  return `Fotografía casual tomada con un teléfono móvil moderno (iPhone/Samsung), estilo snapshot cotidiano español. NO profesional, NO editorial, NO publicidad, NO stock.

Escena literal (debe reconocerse a simple vista y coincidir con el título "${title}"): ${scene}

Estética coherente en todas las portadas:
- Smartphone a mano, ligera imperfección de encuadre, focal ~24-28mm, profundidad de campo amplia sin bokeh cinematográfico.
- Solo luz natural existente (ventana, calle, lámpara doméstica). Balance de blancos neutro. Colores apagados y reales tal cual salen del móvil.
- Personas y espacios españoles corrientes, ropa normal, objetos con uso real, casas normales no de revista.

Prohibido: HDR, filtros, viñeteo, golden hour, dominantes amarillas o cinematográficas, sonrisas de catálogo, familia perfecta con tablet, salones blancos de anuncio, plantas decorativas exageradas, texto o logos en la imagen, marcas de agua, collages.`;
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
  const prompt = buildPrompt(title, category);
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
  try {
    const body = await req.json();
    if (Array.isArray(body?.slugs)) slugs = body.slugs;
    if (typeof body?.limit === "number") limit = body.limit;
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
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(limit);
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