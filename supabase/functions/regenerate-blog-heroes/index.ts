import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

function buildPrompt(title: string, category: string) {
  return `Fotografía editorial hiperrealista, estilo fotoperiodismo premium y sobrio, para un artículo sobre "${title}" (tema: ${category}, finanzas personales y deudas en España). ILUMINACIÓN OBLIGATORIA: luz diurna suave y difusa (día nublado o interior amplio con ventana grande), temperatura de color neutra 5200-5600K, exposición equilibrada en toda la escena, sin zonas quemadas ni negros aplastados, sombras muy suaves. Balance de blancos completamente neutro, tonos naturales y fieles a la realidad. PROHIBIDO explícitamente: golden hour, luz dorada/naranja/amarillenta, hora azul, atardecer, amanecer, filtro sepia, dominante cálida, tinte ámbar, claroscuro, chiaroscuro, iluminación dramática, contraste alto, luz lateral dura, luz de contra, rayos de sol atravesando la escena, callejones oscuros, paredes de ladrillo con sombras marcadas, ambiente cinematográfico oscuro, look "moody", estética Instagram estilizada. Composición limpia, natural y documental, sin texto, sin logos, sin marcas de agua, sin collage. Escena humana o documental concreta española (viviendas, oficinas, calles diurnas normales) con luz plana y realista.`;
}

async function optimize(pngBytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const img = await Image.decode(pngBytes);
    if (img.width > MAX_WIDTH) img.resize(MAX_WIDTH, Image.RESIZE_AUTO);
    return await img.encodeJPEG(JPEG_QUALITY);
  } catch { return null; }
}

async function generateHero(slug: string, title: string, category: string, supabase: ReturnType<typeof createClient>): Promise<string | null> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [{ role: "user", content: buildPrompt(title, category) }],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) { console.error(`AI ${res.status} ${slug}: ${await res.text()}`); return null; }
  const data = await res.json();
  const dataUrl: string | undefined = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!dataUrl?.includes(",")) return null;
  const base64 = dataUrl.split(",")[1];
  const raw = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const opt = await optimize(raw);
  const bytes = opt ?? raw;
  const path = `${slug}.${opt ? "jpg" : "png"}`;
  const { error: upErr } = await supabase.storage.from("blog-images").upload(path, bytes, {
    contentType: opt ? "image/jpeg" : "image/png", upsert: true, cacheControl: "31536000",
  });
  if (upErr) { console.error(`Upload ${slug}: ${upErr.message}`); return null; }
  const { data: signed } = await supabase.storage.from("blog-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  return signed?.signedUrl ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  const url = new URL(req.url);
  const limit = Math.min(20, Math.max(1, Number(url.searchParams.get("limit") ?? "8")));
  const slugsParam = url.searchParams.get("slugs");
  const onlyStale = url.searchParams.get("onlyStale") !== "false"; // default true

  let query = supabase
    .from("generated_posts")
    .select("slug,title,category,hero_regenerated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (slugsParam) {
    query = supabase
      .from("generated_posts")
      .select("slug,title,category,hero_regenerated_at")
      .in("slug", slugsParam.split(",").map((s) => s.trim()).filter(Boolean))
      .limit(limit);
  } else if (onlyStale) {
    query = query.is("hero_regenerated_at", null);
  }

  const { data: posts, error } = await query;
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const results: { slug: string; ok: boolean; error?: string }[] = [];
  for (const p of posts ?? []) {
    try {
      const heroUrl = await generateHero(p.slug as string, p.title as string, (p.category as string) ?? "Consejos", supabase);
      if (!heroUrl) { results.push({ slug: p.slug as string, ok: false, error: "no_image" }); continue; }
      const { error: updErr } = await supabase.from("generated_posts").update({
        hero_image: heroUrl,
        hero_regenerated_at: new Date().toISOString(),
      }).eq("slug", p.slug as string);
      results.push({ slug: p.slug as string, ok: !updErr, error: updErr?.message });
    } catch (e) {
      results.push({ slug: p.slug as string, ok: false, error: String(e) });
    }
  }

  const { count: remaining } = await supabase
    .from("generated_posts")
    .select("slug", { count: "exact", head: true })
    .eq("status", "published")
    .is("hero_regenerated_at", null);

  return new Response(JSON.stringify({ ok: true, processed: results.length, remaining, results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});