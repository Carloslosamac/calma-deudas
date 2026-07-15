import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  try {
    // Pick oldest draft (FIFO)
    const { data: drafts, error: selErr } = await supabase
      .from("generated_casos")
      .select("id, slug")
      .eq("status", "draft")
      .order("created_at", { ascending: true })
      .limit(1);

    if (selErr) throw selErr;

    if (!drafts || drafts.length === 0) {
      return new Response(
        JSON.stringify({ ok: true, published: 0, message: "No hay casos en borrador" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const draft = drafts[0];
    const now = new Date().toISOString();

    const { error: updErr } = await supabase
      .from("generated_casos")
      .update({ status: "published", published_at: now })
      .eq("id", draft.id);

    if (updErr) throw updErr;

    // IndexNow ping (best-effort)
    try {
      const url = `https://mi-calma.es/casos-de-exito/${draft.slug}`;
      await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: "mi-calma.es",
          key: "b7a2f4c8d1e34a5c9f2b6d0e8a1c3f5b",
          urlList: [url],
        }),
      });
    } catch (_) { /* ignore */ }

    return new Response(
      JSON.stringify({ ok: true, published: 1, slug: draft.slug }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("publish-daily-caso error:", e);
    return new Response(
      JSON.stringify({ ok: false, error: String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});