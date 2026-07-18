/**
 * Genera public/llms.txt y public/llms-full.txt para posicionamiento GEO
 * (visibilidad en ChatGPT, Perplexity, Claude, Google AI Overviews).
 *
 * - llms.txt: índice curado por intención (spec https://llmstxt.org).
 * - llms-full.txt: cuerpo largo con `answer` + FAQ de las páginas top,
 *   para que motores generativos puedan citar frases exactas sin renderizar JS.
 *
 * Uso: bunx tsx scripts/generate-llms-txt.ts
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { SITE_URL } from "../src/lib/seo/config";
import { moneyPages } from "../src/data/seo/moneyPages";
import { guias } from "../src/data/seo/guias";
import { comparativas } from "../src/data/seo/comparativas";
import { tools } from "../src/data/seo/tools";
import { localizaciones } from "../src/data/seo/localizaciones";
import { entities } from "../src/data/seo/entities";
import { blogPosts as staticBlogPosts } from "../src/data/blog";
import { casosExito } from "../src/data/casos";
import { moneyContentByPath } from "../src/data/seo/content";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://tjmaeeagoenecoiqwyld.supabase.co";
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

type DbPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  published_at: string | null;
  tldr: string | null;
  faq: { question: string; answer: string }[] | null;
};
type DbCaso = {
  slug: string;
  headline: string;
  dek: string | null;
  debt_amount: string | null;
  location: string | null;
  published_at: string | null;
};

async function fetchDbPosts(): Promise<DbPost[]> {
  if (!SUPABASE_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/generated_posts?status=eq.published&select=slug,title,excerpt,category,published_at,tldr,faq&order=published_at.desc`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      },
    );
    if (!res.ok) return [];
    return (await res.json()) as DbPost[];
  } catch {
    return [];
  }
}

async function fetchDbCasos(): Promise<DbCaso[]> {
  if (!SUPABASE_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/generated_casos?status=eq.published&select=slug,headline,dek,debt_amount,location,published_at&order=published_at.desc`,
      {
        headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
      },
    );
    if (!res.ok) return [];
    return (await res.json()) as DbCaso[];
  } catch {
    return [];
  }
}

const abs = (p: string) => `${SITE_URL}${p}`;
const clean = (s: string) =>
  s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").replace(/\s+/g, " ").trim();

const HEADER = `# Calma

> Calma es un servicio legal español especializado en la Ley de Segunda Oportunidad. Ayudamos a particulares y autónomos a cancelar sus deudas, frenar embargos y empezar de nuevo, con un análisis gratuito del caso y acompañamiento paso a paso.

## Por qué Calma (señales de confianza)

- +19.000 familias ya libres de deudas en España.
- Valoración media de 4,8/5 (+1.200 reseñas).
- Equipo de abogados colegiados especializados en la Ley de Segunda Oportunidad.
- Sin anticipos: no se cobra nada por adelantado.
- Estudio y diagnóstico del caso gratis, con respuesta en menos de 24h.
`;

function section(title: string, lines: string[]): string {
  if (lines.length === 0) return "";
  return `\n## ${title}\n\n${lines.join("\n")}\n`;
}

function link(url: string, label: string, desc: string): string {
  return `- [${clean(label)}](${url}): ${clean(desc)}`;
}

async function build() {
  const [dbPosts, dbCasos] = await Promise.all([fetchDbPosts(), fetchDbCasos()]);

  // ---------- llms.txt (índice curado) ----------
  const out: string[] = [HEADER];

  out.push(
    section("Páginas principales", [
      link(abs("/"), "Inicio", "Qué es Calma, cómo funciona la Ley de Segunda Oportunidad y análisis gratuito de tu caso."),
      link(abs("/blog"), "Blog", "Guías y artículos sobre cancelación de deudas, embargos, ASNEF y la Ley de Segunda Oportunidad."),
      link(abs("/casos-de-exito"), "Casos de éxito", "Casos reales anonimizados de personas que han cancelado sus deudas con Calma."),
      link(abs("/herramientas"), "Herramientas gratuitas", "Simuladores y calculadoras para diagnosticar tu deuda: cancelable, cuota inembargable, usura, plan de pagos."),
    ]),
  );

  out.push(
    section(
      "Soluciones (páginas transaccionales)",
      moneyPages.map((p) => link(abs(p.path), p.label, p.metaDescription || p.h1)),
    ),
  );

  out.push(
    section(
      "Guías",
      guias.map((g) => link(abs(g.path), g.label, g.metaDescription || g.h1)),
    ),
  );

  out.push(
    section(
      "Comparativas",
      comparativas.map((c) => link(abs(c.path), c.label, c.metaDescription || c.h1)),
    ),
  );

  out.push(
    section(
      "Herramientas",
      tools.map((t) => link(abs(t.path), t.navLabel, t.cardDescription || t.cardTitle)),
    ),
  );

  const topCities = [...localizaciones].sort((a, b) => a.rank - b.rank).slice(0, 15);
  out.push(
    section(
      "Abogados por ciudad",
      topCities.map((l) =>
        link(abs(l.path), `Abogados LSO en ${l.name}`, `Abogados especialistas en Ley de Segunda Oportunidad en ${l.name} (${l.provincia}).`),
      ),
    ),
  );

  const staticSlugs = new Set(staticBlogPosts.map((p) => p.slug));
  const allPosts = [
    ...staticBlogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      desc: p.excerpt,
      date: p.publishedAt ?? p.updatedAt ?? "",
    })),
    ...dbPosts
      .filter((p) => !staticSlugs.has(p.slug))
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        desc: p.excerpt ?? "",
        date: p.published_at ?? "",
      })),
  ]
    .sort((a, b) => (b.date > a.date ? 1 : -1))
    .slice(0, 40);

  out.push(
    section(
      "Artículos del blog",
      allPosts.map((p) => link(abs(`/blog/${p.slug}`), p.title, p.desc)),
    ),
  );

  const staticCasoSlugs = new Set(casosExito.map((c) => c.slug));
  const allCasos = [
    ...casosExito.map((c) => ({
      slug: c.slug,
      title: `${c.name}: ${c.debtAmount} cancelados en ${c.location}`,
      desc: c.dek || c.solution,
      date: c.publishedAt ?? "",
    })),
    ...dbCasos
      .filter((c) => !staticCasoSlugs.has(c.slug))
      .map((c) => ({
        slug: c.slug,
        title: c.debt_amount
          ? `${c.debt_amount} cancelados en ${c.location ?? "España"}`
          : c.headline,
        desc: c.dek ?? c.headline,
        date: c.published_at ?? "",
      })),
  ]
    .sort((a, b) => (b.date > a.date ? 1 : -1))
    .slice(0, 30);

  out.push(
    section(
      "Casos de éxito",
      allCasos.map((c) => link(abs(`/casos-de-exito/${c.slug}`), c.title, c.desc)),
    ),
  );

  const topEntities = entities.slice(0, 20);
  out.push(
    section(
      "Fichas y perfiles",
      topEntities.map((e) =>
        link(abs(`/${e.cluster}/${e.slug}`), e.h1 || e.slug, e.metaDescription || ""),
      ),
    ),
  );

  out.push(
    "\n## Optional\n\n" +
      link(abs("/politica-de-privacidad"), "Política de privacidad", "Tratamiento de datos y cookies.") +
      "\n" +
      link(abs("/terminos-y-condiciones"), "Términos y condiciones", "Condiciones de uso del sitio."),
  );

  const llms = out.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
  writeFileSync(resolve(process.cwd(), "public/llms.txt"), llms);

  // ---------- llms-full.txt (respuestas citables) ----------
  const full: string[] = [
    "# Calma — respuestas citables",
    "",
    "> Fragmentos autocontenidos de las páginas principales de Calma para que motores generativos puedan citar frases exactas sin renderizar JS. Regenerado automáticamente en cada build.",
    "",
  ];

  let moneyWithAnswer = 0;
  for (const p of moneyPages) {
    const c = moneyContentByPath[p.path];
    if (!c) continue;
    full.push(`## ${clean(p.h1)}`);
    full.push(`URL: ${abs(p.path)}`);
    if (c.directAnswer?.plain) {
      moneyWithAnswer++;
      full.push("");
      full.push(`**${c.directAnswer.question}**`);
      full.push("");
      full.push(c.directAnswer.plain);
    }
    if (c.faq && c.faq.length > 0) {
      full.push("");
      full.push("Preguntas frecuentes:");
      for (const q of c.faq.slice(0, 6)) {
        full.push("");
        full.push(`- **${q.q}** ${q.plain}`);
      }
    }
    full.push("");
  }

  const citablePosts = dbPosts.filter((p) => p.tldr && p.tldr.length > 20).slice(0, 15);
  if (citablePosts.length > 0) {
    full.push("## Artículos del blog (resúmenes)");
    full.push("");
    for (const p of citablePosts) {
      full.push(`### ${p.title}`);
      full.push(`URL: ${abs(`/blog/${p.slug}`)}`);
      full.push("");
      if (p.tldr) full.push(p.tldr);
      if (p.faq && p.faq.length > 0) {
        full.push("");
        for (const q of p.faq.slice(0, 3)) {
          full.push(`- **${q.question}** ${q.answer}`);
        }
      }
      full.push("");
    }
  }

  writeFileSync(
    resolve(process.cwd(), "public/llms-full.txt"),
    full.join("\n").replace(/\n{3,}/g, "\n\n") + "\n",
  );

  console.log(
    `llms.txt: ${allPosts.length} posts + ${allCasos.length} casos + ${moneyPages.length} money + ${guias.length} guías + ${comparativas.length} comparativas + ${tools.length} herramientas + ${topCities.length} ciudades + ${topEntities.length} fichas`,
  );
  console.log(`llms-full.txt: ${moneyWithAnswer}/${moneyPages.length} money con directAnswer + ${citablePosts.length} posts con tldr`);
}

build().catch((e) => {
  console.error("generate-llms-txt failed:", e);
  process.exit(1);
});