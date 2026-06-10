/**
 * Regenera public/sitemap.xml a partir de los posts del blog.
 * Uso:  bunx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { blogPosts } from "../src/data/blog";
import { SITE_URL } from "../src/lib/seo/config";
import { moneyPages } from "../src/data/seo/moneyPages";
import { satelliteClusters } from "../src/data/seo/architecture";
import { entities } from "../src/data/seo/entities";
import { comparativas } from "../src/data/seo/comparativas";
import { guias } from "../src/data/seo/guias";
import { localizaciones } from "../src/data/seo/localizaciones";

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
  { loc: "/servicios", changefreq: "weekly", priority: "0.8", lastmod: today },
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

// Money pages (carpeta-cluster, prioridad SEO alta).
const moneyEntries: Entry[] = moneyPages.map((p) => ({
  loc: `${p.path}/`,
  lastmod: today,
  changefreq: "weekly",
  priority: p.priority === "critica" ? "0.9" : "0.8",
}));

// Índices de cluster satélite.
const clusterEntries: Entry[] = satelliteClusters.map((c) => ({
  loc: `/${c.slug}/`,
  lastmod: today,
  changefreq: "weekly",
  priority: "0.6",
}));

// Fichas de entidad.
const entityEntries: Entry[] = entities.map((e) => ({
  loc: `/${e.cluster}/${e.slug}/`,
  lastmod: today,
  changefreq: "monthly",
  priority: "0.5",
}));

// Comparativas.
const comparativaEntries: Entry[] = comparativas.map((c) => ({
  loc: `${c.path}/`,
  lastmod: today,
  changefreq: "monthly",
  priority: "0.6",
}));

// Guías de educación financiera.
const guiaEntries: Entry[] = guias.map((g) => ({
  loc: `${g.path}/`,
  lastmod: today,
  changefreq: "monthly",
  priority: "0.6",
}));

// Cluster local: abogados LSO por ciudad.
const localizacionEntries: Entry[] = localizaciones.map((l) => ({
  loc: `${l.path}/`,
  lastmod: today,
  changefreq: "monthly",
  priority: "0.7",
}));

const entries = [
  ...staticEntries,
  ...moneyEntries,
  ...clusterEntries,
  ...entityEntries,
  ...comparativaEntries,
  ...guiaEntries,
  ...localizacionEntries,
  ...postEntries,
];

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
