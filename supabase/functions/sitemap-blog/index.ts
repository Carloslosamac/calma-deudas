import { createClient } from "npm:@supabase/supabase-js@2";

// Sitemap dinámico de los posts de blog generados automáticamente.
// Se referencia desde robots.txt para que Google indexe los posts nuevos
// sin necesidad de regenerar el sitemap estático en cada publicación.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = "https://mi-calma.es";

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
  const { data } = await supabase
    .from("generated_posts")
    .select("slug, published_at, updated_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const urls = (data ?? [])
    .map((p) => {
      const lastmod = (p.updated_at ?? p.published_at ?? new Date().toISOString()).slice(0, 10);
      return `  <url>\n    <loc>${SITE_URL}/blog/${p.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});