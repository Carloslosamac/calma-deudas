import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

import { buildHeroPrompt, sceneFromTitle, heroAltFromScene, PIPELINE_VERSION } from "../_shared/hero-prompt.ts";

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

console.log(`pipeline: ${PIPELINE_VERSION}`);

async function regenerate(supabase: ReturnType<typeof createClient>, slug: string, title: string, category: string) {
  const scene = sceneFromTitle(title, category, slug);
  const prompt = buildHeroPrompt(title, category, slug);
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
  let missing = false;
  try {
    const body = await req.json();
    if (Array.isArray(body?.slugs)) slugs = body.slugs;
    if (typeof body?.limit === "number") limit = body.limit;
    if (typeof body?.offset === "number") offset = body.offset;
    if (body?.order === "asc" || body?.order === "desc") order = body.order;
    if (body?.missing === true) missing = true;
  } catch { /* body opcional */ }

  let rows: { slug: string; title: string; category: string }[] = [];
  if (slugs.length > 0) {
    const { data } = await supabase
      .from("generated_posts")
      .select("slug,title,category")
      .in("slug", slugs);
    rows = (data ?? []) as typeof rows;
  } else if (missing) {
    // Modo "rellenar huecos": posts publicados sin portada (el cron de posts
    // puede publicar sin imagen si se le acaba el presupuesto de tiempo).
    const { data } = await supabase
      .from("generated_posts")
      .select("slug,title,category")
      .is("hero_image", null)
      .order("created_at", { ascending: false })
      .limit(limit > 0 ? limit : 3);
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