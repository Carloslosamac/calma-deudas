/**
 * Regenera public/sitemap.xml a partir de los posts del blog.
 * Uso:  bunx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "../src/data/blog";
import { SITE_URL } from "../src/lib/seo/config";

const today = new Date().toISOString().slice(0, 10);

type Entry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

const staticEntries: Entry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { loc: "/blog", changefreq: "weekly", priority: "0.9", lastmod: today },
  {
    loc: "/politica-de-privacidad",
    changefreq: "yearly",
    priority: "0.3",
    lastmod: today,
  },
  {
    loc: "/terminos-y-condiciones",
    changefreq: "yearly",
    priority: "0.3",
    lastmod: today,
  },
];

const postEntries: Entry[] = blogPosts.map((p) => ({
  loc: `/blog/${p.slug}`,
  lastmod: (p.updatedAt ?? p.publishedAt ?? today).slice(0, 10),
  changefreq: "monthly",
  priority: p.slug === "guia-ley-segunda-oportunidad" ? "0.9" : "0.7",
}));

const entries = [...staticEntries, ...postEntries];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.loc}</loc>
    ${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}
    ${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ""}
    ${e.priority ? `<priority>${e.priority}</priority>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>
`;

const out = resolve(process.cwd(), "public/sitemap.xml");
writeFileSync(out, xml);
console.log(`Sitemap generado: ${out} (${entries.length} URLs)`);
