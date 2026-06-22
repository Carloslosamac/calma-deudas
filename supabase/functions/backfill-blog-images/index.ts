import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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
    const path = `${p.slug}.png`;
    const { data: signed, error } = await supabase.storage
      .from("blog-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (error || !signed?.signedUrl) { missing.push(p.slug); continue; }
    await supabase.from("generated_posts").update({ hero_image: signed.signedUrl }).eq("slug", p.slug);
    done.push(p.slug);
  }
  return new Response(JSON.stringify({ ok: true, updated: done.length, missing }), {
    headers: { "Content-Type": "application/json" },
  });
});
