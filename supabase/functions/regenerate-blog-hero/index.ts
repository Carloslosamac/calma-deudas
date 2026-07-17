import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildPrompt(title: string, category: string): string {
  const framing = pick([
    "primer plano cerrado de manos sosteniendo una carta o factura, cara fuera de encuadre",
    "retrato medio ligeramente descentrado, mirada perdida hacia una ventana",
    "plano cenital de un escritorio real con papeles, bolígrafo y taza a medio terminar",
    "plano medio en escorzo por detrás del hombro, viendo una pantalla de móvil con un SMS bancario",
    "detalle macro de un extracto bancario impreso con anotaciones a mano",
    "plano general sobrio con la persona pequeña dentro del encuadre y mucho aire alrededor",
    "retrato cuadrado tipo reportaje, luz lateral dura, expresión pensativa",
    "plano contrapicado desde el suelo mirando hacia una figura de pie leyendo un documento",
    "detalle de un buzón real con cartas certificadas asomando",
    "plano medio caminando por la calle con carpeta bajo el brazo, motion blur ligero",
  ]);
  const location = pick([
    "cocina antigua de piso español con azulejos gastados",
    "acera de barrio obrero de Madrid a media tarde",
    "portal de finca antigua con buzones metálicos",
    "oficina de sucursal bancaria vista desde la calle a través del cristal",
    "juzgado o pasillo institucional con bancos de madera",
    "bar de barrio con luz de fluorescente",
    "salón modesto con muebles de los 90 y luz de ventana única",
    "estación de metro o autobús interurbano",
    "coche aparcado, plano interior desde el asiento del copiloto",
    "pequeña asesoría o gestoría con papeles apilados",
    "terraza de bloque de pisos periférico al atardecer nublado",
    "mesa de camping en un piso a medio amueblar",
  ]);
  const light = pick([
    "luz de ventana lateral, día nublado, sombras suaves, 5500K",
    "luz cenital fría de fluorescente de oficina, ligeramente verdosa",
    "luz mixta de tarde con neones cálidos de fondo pero sujeto en sombra neutra",
    "contraluz duro con silueta parcial, sin dominante de color",
    "luz de mañana muy tenue, casi monocroma, tonos apagados",
    "luz de calle nocturna con farolas frías, sin filtro naranja",
  ]);
  const lens = pick([
    "35mm, ligera distorsión de perspectiva",
    "50mm, compresión natural",
    "85mm, fondo desenfocado suave",
    "28mm gran angular, sensación documental",
    "lente macro para detalle",
  ]);
  const mood = pick([
    "tensión contenida, no dramática",
    "cansancio silencioso",
    "alivio sobrio recién estrenado",
    "concentración analítica",
    "espera burocrática",
    "determinación tranquila",
  ]);
  const subject = pick([
    "mujer de unos 40, ropa de calle sin marcas",
    "hombre de unos 50, camisa arrugada",
    "persona joven de unos 30 sin género evidente",
    "señor mayor de unos 65",
    "trabajadora autónoma con delantal o uniforme",
    "ninguna persona en cámara, solo objetos y contexto",
  ]);
  return `Fotografía documental española real, estilo reportaje periodístico de prensa nacional (no stock, no publicidad, no IA). Artículo: "${title}" (categoría: ${category}). Escena concreta: ${framing}. Ubicación: ${location}. Sujeto: ${subject}. Luz: ${light}. Óptica: ${lens}. Ambiente: ${mood}. Detalles físicos verosímiles: objetos gastados, ligeras imperfecciones, texturas reales, ropa arrugada, pelo despeinado, superficies con marcas de uso. Grano fotográfico sutil. Balance de blancos neutro (evita explícitamente: filtro amarillo/dorado, golden hour, dominante cálida, look Instagram, HDR, estética "familia perfecta con tablet", salones neutros idénticos, sonrisas de catálogo, ropa impecable, plantas decorativas obvias, iluminación difusa uniforme). Sin texto, sin logos, sin marcas de agua, sin collage, sin tipografías inventadas. Composición asimétrica y decidida, no simétrica de catálogo.`;
}

async function optimize(pngBytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const img = await Image.decode(pngBytes);
    if (img.width > MAX_WIDTH) img.resize(MAX_WIDTH, Image.RESIZE_AUTO);
    return await img.encodeJPEG(JPEG_QUALITY);
  } catch { return null; }
}

async function regenerate(supabase: ReturnType<typeof createClient>, slug: string, title: string, category: string) {
  const prompt = buildPrompt(title, category);
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) throw new Error(`AI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const dataUrl: string | undefined = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!dataUrl || !dataUrl.includes(",")) throw new Error("no image returned");
  const raw = Uint8Array.from(atob(dataUrl.split(",")[1]), (c) => c.charCodeAt(0));
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