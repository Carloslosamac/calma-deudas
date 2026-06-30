import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// Automatiza la indexación legítima vía Google Search Console:
//  1. (Re)envía el sitemap para que Google descubra todas las URLs.
//  2. Inspecciona el estado REAL de cada URL (URL Inspection API) en lotes,
//     rotando por las menos comprobadas para respetar la cuota (~2.000/día).
//  3. Guarda el estado real (indexada / cobertura / último rastreo) en
//     seo_index_checks para mostrarlo en /admin/indexacion.
//
// Nota: Google NO ofrece API para "solicitar indexación" de páginas normales
// (la Indexing API solo cubre ofertas de empleo y vídeos en directo). Enviar el
// sitemap + monitorizar el estado es el método oficial y conforme a sus términos.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const GSC_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY")!;

const SITE = "mi-calma.es";
const SITE_URL = `https://${SITE}`;
const SC_RESOURCE = `sc-domain:${SITE}`;
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

const gscHeaders = {
  Authorization: `Bearer ${LOVABLE_API_KEY}`,
  "X-Connection-Api-Key": GSC_KEY,
  "Content-Type": "application/json",
};

async function submitSitemap(): Promise<number> {
  const path = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(
    SC_RESOURCE,
  )}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  const res = await fetch(path, { method: "PUT", headers: gscHeaders });
  return res.status;
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(SITEMAP_URL, { cache: "no-store" });
  if (!res.ok) return [];
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(locs)].filter(Boolean);
}

async function inspect(url: string) {
  const res = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
    method: "POST",
    headers: gscHeaders,
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SC_RESOURCE }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`inspect ${res.status}: ${text.slice(0, 200)}`);
  }
  const json = await res.json();
  return json?.inspectionResult?.indexStatusResult ?? {};
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    let batchSize = 80;
    try {
      const body = await req.json();
      if (typeof body?.batchSize === "number") {
        batchSize = Math.max(1, Math.min(500, body.batchSize));
      }
    } catch (_e) {
      // sin body: usar valor por defecto
    }

    // 1. Reenviar sitemap (idempotente).
    const sitemapStatus = await submitSitemap();

    // 2. URLs del sitemap.
    const urls = await fetchSitemapUrls();

    // 3. Priorizar las menos comprobadas recientemente.
    const { data: existing } = await supabase
      .from("seo_index_checks")
      .select("url, last_inspected_at");
    const lastMap = new Map<string, string | null>(
      (existing ?? []).map((r) => [r.url, r.last_inspected_at]),
    );
    const ordered = [...urls].sort((a, b) => {
      const ta = lastMap.has(a) ? (lastMap.get(a) ?? "") : "";
      const tb = lastMap.has(b) ? (lastMap.get(b) ?? "") : "";
      return ta.localeCompare(tb); // nunca comprobadas ("") primero
    });
    const batch = ordered.slice(0, batchSize);

    let indexedCount = 0;
    let inspected = 0;
    const errors: string[] = [];
    const nowIso = new Date().toISOString();

    for (const url of batch) {
      try {
        const r = await inspect(url);
        const indexed = r.verdict === "PASS";
        if (indexed) indexedCount++;
        inspected++;
        await supabase.from("seo_index_checks").upsert(
          {
            url,
            verdict: r.verdict ?? null,
            coverage_state: r.coverageState ?? null,
            indexed,
            last_crawl_time: r.lastCrawlTime ?? null,
            last_inspected_at: nowIso,
            // 'done' = solicitada/indexada (para el check manual existente)
            done: indexed,
            done_at: indexed ? nowIso : null,
          },
          { onConflict: "url" },
        );
      } catch (e) {
        errors.push(`${url}: ${String(e)}`);
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        sitemapStatus,
        totalUrls: urls.length,
        inspected,
        indexed: indexedCount,
        notIndexed: inspected - indexedCount,
        errors: errors.slice(0, 10),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("gsc-index-status error:", e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});