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

// URLs con impresiones en 90d según Search Analytics: sirve para detectar URLs
// que Google conoce fuera del sitemap actual.
async function fetchPagesFromSearchAnalytics(): Promise<string[]> {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 90);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SC_RESOURCE)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: gscHeaders,
      body: JSON.stringify({
        startDate: iso(start),
        endDate: iso(end),
        dimensions: ["page"],
        rowLimit: 5000,
      }),
    },
  );
  if (!res.ok) return [];
  const json = await res.json();
  const rows = (json?.rows ?? []) as Array<{ keys?: string[] }>;
  return rows.map((r) => r.keys?.[0] ?? "").filter(Boolean);
}

// Coverage states que GSC contabiliza como "Indexada" en el informe de Páginas.
function isIndexedCoverage(coverage: string | null | undefined): boolean {
  if (!coverage) return false;
  const c = coverage.toLowerCase();
  return c.startsWith("submitted and indexed") || c.startsWith("indexed");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    let batchSize = 200;
    try {
      const body = await req.json();
      if (typeof body?.batchSize === "number") {
        batchSize = Math.max(1, Math.min(1000, body.batchSize));
      }
    } catch (_e) {
      // sin body: usar valor por defecto
    }

    // 1. Reenviar sitemap (idempotente).
    const sitemapStatus = await submitSitemap();

    // 2. URLs del sitemap.
    const urls = await fetchSitemapUrls();
    const sitemapSet = new Set(urls);

    // 2b. URLs con tráfico en Search Analytics (incluye descubrimientos fuera del sitemap).
    const analyticsPages = await fetchPagesFromSearchAnalytics();
    const outsideSitemap = analyticsPages.filter((u) => !sitemapSet.has(u));
    if (outsideSitemap.length) {
      await supabase.from("seo_index_checks").upsert(
        outsideSitemap.map((url) => ({ url, discovered_outside_sitemap: true })),
        { onConflict: "url", ignoreDuplicates: true },
      );
    }
    // Todas las URLs del sitemap: aseguramos que estén en la tabla marcadas como propias.
    if (urls.length) {
      await supabase.from("seo_index_checks").upsert(
        urls.map((url) => ({ url, discovered_outside_sitemap: false })),
        { onConflict: "url", ignoreDuplicates: true },
      );
    }

    // 3. Priorizar las menos comprobadas recientemente (todas: sitemap + fuera).
    const allUrls = [...new Set([...urls, ...outsideSitemap])];
    const { data: existing } = await supabase
      .from("seo_index_checks")
      .select("url, last_inspected_at");
    const lastMap = new Map<string, string | null>(
      (existing ?? []).map((r) => [r.url, r.last_inspected_at]),
    );
    const ordered = [...allUrls].sort((a, b) => {
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
        // Alineado con GSC: coverageState manda; verdict es fallback.
        const indexed = isIndexedCoverage(r.coverageState) || r.verdict === "PASS";
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
            google_canonical: r.googleCanonical ?? null,
            user_canonical: r.userCanonical ?? null,
            discovered_outside_sitemap: !sitemapSet.has(url),
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
        outsideSitemap: outsideSitemap.length,
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