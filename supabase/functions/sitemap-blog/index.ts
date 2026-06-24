import { createClient } from "npm:@supabase/supabase-js@2";

// Sitemap dinámico del contenido generado automáticamente (posts de blog
// y casos de éxito). Se referencia desde robots.txt para que Google indexe
// el contenido nuevo sin regenerar el sitemap estático en cada publicación.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = "https://mi-calma.es";

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  const [postsRes, casosRes] = await Promise.all([
    supabase
      .from("generated_posts")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase
      .from("generated_casos")
      .select("slug, published_at, updated_at")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
  ]);

  const toUrl = (loc: string, lastmodRaw: string | null | undefined, priority: string) => {
    const lastmod = (lastmodRaw ?? new Date().toISOString()).slice(0, 10);
    return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  };

  const postUrls = (postsRes.data ?? []).map((p) =>
    toUrl(`/blog/${p.slug}`, p.updated_at ?? p.published_at, "0.7"),
  );
  const casoUrls = (casosRes.data ?? []).map((c) =>
    toUrl(`/casos-de-exito/${c.slug}`, c.updated_at ?? c.published_at, "0.6"),
  );

  const urls = [...postUrls, ...casoUrls].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});