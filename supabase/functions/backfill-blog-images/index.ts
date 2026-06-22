import { createClient } from "npm:@supabase/supabase-js@2";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  const { data: posts } = await supabase
    .from("generated_posts")
    .select("slug,hero_image")
    .eq("status", "published")
    .limit(200);
  const done: string[] = [];
  const missing: string[] = [];
  for (const p of posts ?? []) {
    const jpgPath = `${p.slug}.jpg`;
    const pngPath = `${p.slug}.png`;
    let finalPath: string | null = null;

    // Si ya existe la versión optimizada .jpg, reutilízala.
    const { data: existingJpg } = await supabase.storage
      .from("blog-images")
      .download(jpgPath);
    if (existingJpg) {
      finalPath = jpgPath;
    } else {
      // Descarga el PNG original, lo redimensiona y recomprime a JPEG.
      const { data: pngBlob } = await supabase.storage.from("blog-images").download(pngPath);
      if (!pngBlob) { missing.push(p.slug); continue; }
      try {
        const img = await Image.decode(new Uint8Array(await pngBlob.arrayBuffer()));
        if (img.width > MAX_WIDTH) img.resize(MAX_WIDTH, Image.RESIZE_AUTO);
        const jpeg = await img.encodeJPEG(JPEG_QUALITY);
        const { error: upErr } = await supabase.storage
          .from("blog-images")
          .upload(jpgPath, jpeg, { contentType: "image/jpeg", upsert: true, cacheControl: "31536000" });
        if (upErr) { missing.push(p.slug); continue; }
        finalPath = jpgPath;
      } catch (_e) {
        finalPath = pngPath; // fallback al original si falla la optimización
      }
    }

    const { data: signed, error } = await supabase.storage
      .from("blog-images")
      .createSignedUrl(finalPath, 60 * 60 * 24 * 365 * 10);
    if (error || !signed?.signedUrl) { missing.push(p.slug); continue; }
    await supabase.from("generated_posts").update({ hero_image: signed.signedUrl }).eq("slug", p.slug);
    done.push(p.slug);
  }
  return new Response(JSON.stringify({ ok: true, updated: done.length, missing }), {
    headers: { "Content-Type": "application/json" },
  });
});
