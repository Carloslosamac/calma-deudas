import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

async function generateAndUploadHero(
  supabase: ReturnType<typeof createClient>,
  slug: string,
  title: string,
  category: string,
): Promise<string | null> {
  try {
    const prompt = `Fotografía editorial hiperrealista, estilo fotoperiodismo premium, para un artículo sobre "${title}" (tema: ${category}, finanzas personales y deudas en España). Luz natural realista, composición cinematográfica, sin texto, sin logos, sin marcas de agua, sin collage. Escena humana o documental concreta y evocadora, no genérica.`;
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!res.ok) { console.error(`img err ${res.status} ${slug}: ${await res.text()}`); return null; }
    const data = await res.json();
    const dataUrl: string | undefined = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!dataUrl || !dataUrl.includes(",")) { console.error(`no img ${slug}`); return null; }
    const bytes = Uint8Array.from(atob(dataUrl.split(",")[1]), (c) => c.charCodeAt(0));
    const path = `${slug}.png`;
    const { error: upErr } = await supabase.storage.from("blog-images").upload(path, bytes, { contentType: "image/png", upsert: true });
    if (upErr) { console.error(`upload err ${slug}: ${upErr.message}`); return null; }
    return supabase.storage.from("blog-images").getPublicUrl(path).data?.publicUrl ?? null;
  } catch (e) { console.error(`hero err ${slug}: ${String(e)}`); return null; }
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  const { data: posts } = await supabase
    .from("generated_posts")
    .select("slug,title,category")
    .eq("status", "published")
    .is("hero_image", null)
    .limit(50);
  const done: string[] = [];
  for (const p of posts ?? []) {
    const url = await generateAndUploadHero(supabase, p.slug, p.title, p.category);
    if (url) {
      await supabase.from("generated_posts").update({ hero_image: url }).eq("slug", p.slug);
      done.push(p.slug);
    }
  }
  return new Response(JSON.stringify({ ok: true, updated: done.length, slugs: done }), {
    headers: { "Content-Type": "application/json" },
  });
});
