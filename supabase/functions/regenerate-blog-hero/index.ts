import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

async function describeSceneFromTitle(title: string, category: string): Promise<string> {
  const fallback = `una persona española corriente en su día a día, en una situación cotidiana que refleja directamente "${title}"`;
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "Describes en 1-2 frases (máx 60 palabras) una escena cotidiana española real que ilustre LITERALMENTE el título de un artículo de blog sobre finanzas personales. Debe reconocerse a simple vista relacionada con el tema. Nada abstracto, nada metafórico. Incluye: quién (persona genérica española), qué hace exactamente, con qué objeto o documento concreto, en qué lugar cotidiano. Nada de emociones ni estética, solo la escena. Responde SOLO con la frase, sin comillas.",
          },
          { role: "user", content: `Título: "${title}" (categoría: ${category}).` },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    if (!text || text.length < 10) return fallback;
    return text.replace(/^["'“”]|["'“”]$/g, "").slice(0, 400);
  } catch {
    return fallback;
  }
}

async function buildPrompt(title: string, category: string): Promise<string> {
  const sceneDescription = await describeSceneFromTitle(title, category);
  return `Fotografía casual tomada con un teléfono móvil moderno (iPhone/Samsung), estilo snapshot cotidiano español. NO es fotografía profesional, NO es reportaje editorial, NO es publicidad, NO es stock.

Escena literal a representar (debe reconocerse a simple vista y coincidir con el título "${title}"): ${sceneDescription}

Estética obligatoria y coherente en TODAS las portadas del blog:
- Cámara: smartphone sujeto a mano, ligera imperfección de encuadre, sin trípode.
- Óptica: focal equivalente a lente principal de móvil (~24-28mm), profundidad de campo amplia (todo razonablemente enfocado), SIN bokeh cinematográfico.
- Luz: exclusivamente luz natural existente del sitio (ventana, calle, lámpara doméstica). Sin flash, sin luces de estudio, sin difusores, sin rebotes, sin golden hour, sin dominante amarilla ni dorada. Balance de blancos neutro.
- Postproducción: ninguna evidente. Sin filtros de Instagram, sin HDR, sin viñeteo, sin desaturación estilizada, sin tinte cinematográfico.
- Colores: apagados y reales, tal cual salen del móvil.
- Sujetos y objetos: personas y espacios españoles corrientes, ropa normal ligeramente arrugada, objetos con uso real, casas normales (no pisos de revista).

Prohibido explícitamente: aspecto de anuncio, sonrisas de catálogo, composición perfectamente simétrica de portafolio, familia perfecta con tablet en salón blanco, plantas decorativas exageradas, escritorios ordenadísimos, luces cálidas naranjas, look "producción audiovisual".

Sin texto en imagen, sin logos, sin marcas de agua, sin collage, sin tipografías inventadas. La foto debe parecer que la ha tomado el propio protagonista o alguien cercano con su móvil.`;
}

async function optimize(pngBytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const img = await Image.decode(pngBytes);
    if (img.width > MAX_WIDTH) img.resize(MAX_WIDTH, Image.RESIZE_AUTO);
    return await img.encodeJPEG(JPEG_QUALITY);
  } catch { return null; }
}

async function regenerate(supabase: ReturnType<typeof createClient>, slug: string, title: string, category: string) {
  const prompt = await buildPrompt(title, category);
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