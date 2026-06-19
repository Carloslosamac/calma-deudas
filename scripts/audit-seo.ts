import { moneyPages } from "@/data/seo/moneyPages";
import { clusters, getCluster } from "@/data/seo/architecture";
import { guias } from "@/data/seo/guias";
import { comparativas } from "@/data/seo/comparativas";
import { entities, getCluster as _gc } from "@/data/seo/entities";
import { localizaciones } from "@/data/seo/localizaciones";
import { getHubContent } from "@/data/seo/content/hubContent";
import { getEntityProfile } from "@/data/seo/content/entityProfiles";
import { getClusterContent } from "@/data/seo/content/hubContent";

type Page = { canonical: string; title: string; desc: string; tpl: string };
const pages: Page[] = [];

// Money pages
for (const p of moneyPages) pages.push({ canonical: p.path, title: p.seoTitle, desc: p.metaDescription, tpl: "money" });

// Clusters (hubs + satellites)
for (const c of clusters) {
  const content = getHubContent(c.slug);
  const title = content?.seoTitle ?? `${c.title} | Calma`;
  const desc = content?.metaDescription ?? c.description;
  pages.push({ canonical: `/${c.slug}`, title, desc, tpl: `cluster:${c.role}` });
}

// Guias
for (const g of guias) pages.push({ canonical: g.path, title: g.seoTitle, desc: g.metaDescription, tpl: "guia" });
// Comparativas
for (const c of comparativas) pages.push({ canonical: c.path, title: c.seoTitle, desc: c.metaDescription, tpl: "comparativa" });

// Entities
for (const e of entities) {
  const rich = `Deudas con ${e.name}: soluciones | Calma`;
  const title = rich.length <= 60 ? rich : `Deudas con ${e.name} | Calma`;
  const prof = getEntityProfile(e.slug);
  const desc = prof?.metaDescription ?? `¿Deuda o reclamación de ${e.name}? Resolvemos tus miedos reales (embargo, ASNEF, llamadas) y te explicamos con calma cómo cancelarla. Análisis gratis.`;
  pages.push({ canonical: `/${e.cluster}/${e.slug}`, title, desc, tpl: "entidad" });
}

// Localizaciones
for (const city of localizaciones) {
  const cands = [
    `Abogados Ley Segunda Oportunidad en ${city.name} | Calma`,
    `Abogados Segunda Oportunidad en ${city.name} | Calma`,
    `Abogados Segunda Oportunidad en ${city.name}`,
  ];
  const title = cands.find((t) => t.length <= 60) ?? cands[2];
  pages.push({ canonical: city.path, title, desc: "(hash variant)", tpl: "localizacion" });
}

console.log("TOTAL pages audited:", pages.length);

// Length checks
const longTitles = pages.filter((p) => p.title.length > 60);
const longDesc = pages.filter((p) => p.desc !== "(hash variant)" && p.desc.length > 160);
const shortDesc = pages.filter((p) => p.desc !== "(hash variant)" && p.desc.length < 70);

console.log("\n== TITLES > 60 chars:", longTitles.length);
longTitles.forEach((p) => console.log(`  [${p.title.length}] ${p.canonical} :: ${p.title}`));

console.log("\n== DESCRIPTIONS > 160 chars:", longDesc.length);
longDesc.forEach((p) => console.log(`  [${p.desc.length}] ${p.canonical} :: ${p.desc.slice(0,80)}...`));

console.log("\n== DESCRIPTIONS < 70 chars:", shortDesc.length);
shortDesc.forEach((p) => console.log(`  [${p.desc.length}] ${p.canonical} :: ${p.desc}`));

// Duplicate titles
const byTitle = new Map<string, string[]>();
for (const p of pages) { const a = byTitle.get(p.title) ?? []; a.push(p.canonical); byTitle.set(p.title, a); }
const dupT = [...byTitle.entries()].filter(([,v]) => v.length > 1);
console.log("\n== DUPLICATE TITLES:", dupT.length);
dupT.forEach(([t,v]) => console.log(`  "${t}" -> ${v.join(", ")}`));

// Duplicate descriptions (excluding hash variant)
const byDesc = new Map<string, string[]>();
for (const p of pages) { if (p.desc==="(hash variant)") continue; const a = byDesc.get(p.desc) ?? []; a.push(p.canonical); byDesc.set(p.desc, a); }
const dupD = [...byDesc.entries()].filter(([,v]) => v.length > 1);
console.log("\n== DUPLICATE DESCRIPTIONS:", dupD.length);
dupD.forEach(([d,v]) => console.log(`  "${d.slice(0,60)}..." -> ${v.join(", ")}`));

// Duplicate canonicals
const byCanon = new Map<string, number>();
for (const p of pages) byCanon.set(p.canonical, (byCanon.get(p.canonical)??0)+1);
const dupC = [...byCanon.entries()].filter(([,n]) => n>1);
console.log("\n== DUPLICATE CANONICALS:", dupC.length);
dupC.forEach(([c,n]) => console.log(`  ${c} x${n}`));
