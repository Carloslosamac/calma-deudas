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
    { path: "casos/hugo-a-barcelona-real.png", slugPrefix: "hugo-a-barcelona" },
    { path: "casos/hugo-r-valencia-real.png", slugPrefix: "hugo-r-valencia" },
    { path: "casos/diego-v-jaen-real.png", slugPrefix: "diego-v-jaen" },
    { path: "casos/andres-v-pamplona-real.png", slugPrefix: "andres-v-pamplona" },
    { path: "casos/manuel-g-madrid-real.png", slugPrefix: "manuel-g-madrid" },
    { path: "casos/antonio-t-burgos-real.png", slugPrefix: "antonio-t-burgos" },
    { path: "casos/adrian-c-girona-real.png", slugPrefix: "adrian-c-girona" },
    { path: "casos/daniel-r-girona-real.png", slugPrefix: "daniel-r-girona" },
    { path: "casos/lucia-d-zaragoza-real.png", slugPrefix: "lucia-d-zaragoza" },
    { path: "casos/noelia-s-lleida-real.png", slugPrefix: "noelia-s-lleida" },
    { path: "casos/nuria-b-cadiz-real.png", slugPrefix: "nuria-b-cadiz" },
    { path: "casos/nuria-d-zaragoza-real.png", slugPrefix: "nuria-d-zaragoza" },
    { path: "casos/raquel-m-lleida-real.png", slugPrefix: "raquel-m-lleida" },
    { path: "casos/sara-g-ourense-real.png", slugPrefix: "sara-g-ourense" },
    { path: "casos/sara-l-valladolid-real.png", slugPrefix: "sara-l-valladolid" },
    { path: "casos/veronica-v-bilbao-real.png", slugPrefix: "veronica-v-bilbao" },
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