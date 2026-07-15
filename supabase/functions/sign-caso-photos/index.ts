import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const files = [
    "casos/daniel-s-santander-real.jpg",
    "casos/antonio-a-cordoba-real.jpg",
    "casos/marta-d-girona-real.jpg",
    "casos/sara-l-murcia-real.jpg",
    "casos/lucia-n-barcelona-real.jpg",
    "casos/raquel-b-ourense-real.jpg",
  ];
  const results: Record<string, string> = {};
  for (const path of files) {
    const { data, error } = await supabase.storage
      .from("blog-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (error || !data) {
      results[path] = `ERR: ${error?.message}`;
      continue;
    }
    results[path] = data.signedUrl;
    const publicUrl = `https://${Deno.env.get("SUPABASE_URL")!.replace("https://", "").split(".")[0]}.supabase.co/storage/v1/object/public/blog-images/${encodeURIComponent(path)}`;
    const { error: upErr } = await supabase
      .from("generated_casos")
      .update({ hero_image: data.signedUrl })
      .eq("hero_image", publicUrl);
    if (upErr) results[path] += ` | updateErr: ${upErr.message}`;
  }
  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});