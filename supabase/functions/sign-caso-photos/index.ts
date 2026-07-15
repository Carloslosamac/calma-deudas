import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const mapping: Array<{ path: string; slugPrefix: string }> = [
    { path: "casos/carlos-p-santander-real.jpg", slugPrefix: "carlos-p-santander" },
    { path: "casos/andres-d-valladolid-real.jpg", slugPrefix: "andres-d-valladolid" },
    { path: "casos/hugo-a-valladolid-real.jpg", slugPrefix: "hugo-a-valladolid" },
    { path: "casos/noelia-n-castellon-real.jpg", slugPrefix: "noelia-n-castellon" },
  ];
  const results: Record<string, string> = {};
  for (const { path, slugPrefix } of mapping) {
    const { data, error } = await supabase.storage
      .from("blog-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (error || !data) {
      results[path] = `ERR: ${error?.message}`;
      continue;
    }
    results[path] = data.signedUrl;
    const { error: upErr } = await supabase
      .from("generated_casos")
      .update({ hero_image: data.signedUrl })
      .like("slug", `${slugPrefix}%`);
    if (upErr) results[path] += ` | updateErr: ${upErr.message}`;
  }
  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});