// Control de calidad del contenido generado automáticamente.
//
// Dos barreras:
//  1) `topicIssues`  -> antes de gastar créditos de IA. Descarta temas basura
//     que entraron en `seo_roadmap` al importarlo scrapeando SERPs de la
//     competencia (menús, avisos de cookies, temas ajenos, duplicados).
//  2) `postQualityIssues` -> antes de publicar. Si el artículo no cumple el
//     listón, NO se publica: queda retenido con el motivo.

export const STOPWORDS = new Set([
  "a","al","ante","como","con","cual","cuando","de","del","desde","donde","el","ella","ellos","en","entre","es","esta","este","hasta","la","las","lo","los","mas","me","mi","mis","no","o","para","pero","por","que","se","si","sin","sobre","su","sus","te","tu","tus","un","una","uno","unos","unas","y","ya","le","les","hay","ser","son","the","of","and",
]);

export function normalizeText(raw: string | null | undefined): string {
  return (raw ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenSet(raw: string | null | undefined): Set<string> {
  return new Set(
    normalizeText(raw)
      .split(" ")
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
}

// Textos de navegación / legales / basura de scraping que nunca son un tema.
const JUNK_PATTERNS: RegExp[] = [
  /\butilizamos cookies\b/i,
  /\bpolitica de (cookies|privacidad)\b/i,
  /\baviso legal\b/i,
  /\bterminos y condiciones\b/i,
  /\bmas temas\b/i,
  /\bver (todo|mas)\b/i,
  /\bleer mas\b/i,
  /\bmenu\b/i,
  /\b(pagina )?(siguiente|anterior)\b/i,
  /\bcategorias?\b$/i,
  /\bcontinuar\b.*\brechazar\b/i,
  /\bacepta(r|mos)? (todas las )?cookies\b/i,
  /\bsuscribete\b/i,
  /\bcomparte (este|el) (articulo|post)\b/i,
  /\bhaz clic aqui\b/i,
];

// Temas que no son de nuestro negocio (deuda, insolvencia, embargos…).
const OFF_TOPIC_PATTERNS: RegExp[] = [
  /\bcompro oro\b/i,
  /\bvender (oro|plata|joyas)\b/i,
  /\bcasas? de empeno\b/i,
  /\bhoroscopo\b/i,
  /\bloteria\b/i,
  /\bcriptomonedas? para invertir\b/i,
  /\bprecio de los alimentos\b/i,
  /\bdelitos contra los derechos de los trabajadores\b/i,
];

// El tema debe oler a deuda/insolvencia/financiación para ser nuestro.
const ON_TOPIC_HINT =
  /\b(deuda|deudas|deudor|acreedor|impago|moros|asnef|embargo|embargar|concurso|insolven|segunda oportunidad|lso|exonera|microcredito|prestamo|credito|revolving|tarjeta|hipoteca|usura|intereses|monitorio|demanda|recobro|reunifica|refinanc|quita|nomina|hacienda|seguridad social|aval|fianza|financiacion|cuota|banco|financiera|reclamar)\b/i;

export type TopicRow = {
  id: number;
  titulo: string;
  keywords?: string[] | null;
};

export type PublishedIndexEntry = {
  title: string;
  tokens: Set<string>;
};

export function buildPublishedIndex(titles: string[]): PublishedIndexEntry[] {
  return titles.map((t) => ({ title: normalizeText(t), tokens: tokenSet(t) }));
}

/**
 * Devuelve los motivos por los que un tema NO debe generarse. Vacío = apto.
 */
export function topicIssues(
  row: TopicRow,
  published: PublishedIndexEntry[] = [],
  seen: PublishedIndexEntry[] = [],
): string[] {
  const issues: string[] = [];
  const title = (row.titulo ?? "").trim();
  const norm = normalizeText(title);
  const words = norm ? norm.split(" ").length : 0;

  if (!title) return ["título vacío"];
  if (title.length > 160) issues.push("título desmesurado (texto scrapeado, no un tema)");
  if (title.length < 25 || words < 4) issues.push("título demasiado corto para ser una búsqueda real");
  for (const re of JUNK_PATTERNS) {
    if (re.test(norm) || re.test(title)) {
      issues.push("texto de navegación/legal, no un tema");
      break;
    }
  }
  for (const re of OFF_TOPIC_PATTERNS) {
    if (re.test(norm) || re.test(title)) {
      issues.push("tema fuera de nuestro negocio");
      break;
    }
  }
  const haystack = `${title} ${(row.keywords ?? []).join(" ")}`;
  if (!ON_TOPIC_HINT.test(normalizeText(haystack))) {
    issues.push("sin relación clara con deuda/insolvencia");
  }

  const tokens = tokenSet(haystack);
  for (const entry of [...published, ...seen]) {
    if (entry.title && entry.title === norm) {
      issues.push("tema ya publicado (título idéntico)");
      break;
    }
    if (jaccard(tokens, entry.tokens) >= 0.75) {
      issues.push(`tema casi idéntico a uno existente ("${entry.title}")`);
      break;
    }
  }
  return Array.from(new Set(issues));
}

const VOID_TAGS = new Set(["br", "hr", "img", "input", "meta", "link", "source", "col"]);

/** Comprueba que las etiquetas HTML abren y cierran correctamente. */
export function htmlIsBalanced(html: string): boolean {
  const stack: string[] = [];
  const re = /<\s*(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)\s*>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();
    const selfClosed = m[3] === "/";
    if (VOID_TAGS.has(tag) || selfClosed) continue;
    if (closing) {
      const idx = stack.lastIndexOf(tag);
      if (idx === -1) return false;
      stack.length = idx;
    } else {
      stack.push(tag);
    }
  }
  return stack.length === 0;
}

const UNSAFE_RE = /<\s*(script|iframe|object|embed|style)\b[\s\S]*?<\s*\/\s*\1\s*>|<\s*(script|iframe|object|embed)\b[^>]*>|\son[a-z]+\s*=\s*(".*?"|'.*?'|[^\s>]+)|javascript:/gi;

/** Elimina cualquier HTML peligroso antes de guardarlo. */
export function stripUnsafeHtml(html: string): string {
  return (html ?? "").replace(UNSAFE_RE, "");
}

export type ArticleLike = {
  sections?: { id?: string; title?: string; html?: string }[];
  faq?: unknown[];
  excerpt?: string;
  metaDescription?: string;
  keywords?: unknown[];
};

export type QualityReport = { score: number; issues: string[] };

const DIAGRAM_RE =
  /blog-(timeline|myth-reality|comparison|before-after|callout|checklist|stats|pros-cons|quote|faq-inline)/g;

/**
 * Examen bloqueante del artículo ya generado. `issues` vacío = publicable.
 */
export function postQualityIssues(article: ArticleLike): QualityReport {
  const issues: string[] = [];
  const secs = Array.isArray(article.sections) ? article.sections : [];
  const joined = secs.map((s) => s?.html ?? "").join("\n");
  const text = joined.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const diagrams = joined.match(DIAGRAM_RE) ?? [];
  const uniqueDiagrams = new Set(diagrams).size;
  const ctas = (joined.match(/class=["']blog-cta["']/g) ?? []).length;
  const faqCount = Array.isArray(article.faq) ? article.faq.length : 0;

  if (secs.length < 8) issues.push(`solo ${secs.length} apartados (mínimo 8)`);
  const emptySections = secs.filter(
    (s) => !s?.html || s.html.replace(/<[^>]+>/g, "").trim().length < 120,
  );
  if (emptySections.length) {
    issues.push(`${emptySections.length} apartado(s) vacíos o de relleno`);
  }
  if (secs.some((s) => !s?.title || String(s.title).trim().length < 8)) {
    issues.push("hay apartados sin encabezado válido");
  }
  if (words < 1800) issues.push(`solo ${words} palabras (mínimo 1800)`);
  if (faqCount < 6) issues.push(`solo ${faqCount} preguntas frecuentes (mínimo 6)`);
  if (ctas < 1) issues.push("sin llamada a la acción");
  if (diagrams.length < 3) issues.push(`solo ${diagrams.length} bloques visuales (mínimo 3)`);
  if (uniqueDiagrams < 3) issues.push("bloques visuales repetitivos (menos de 3 tipos)");
  if (!htmlIsBalanced(joined)) issues.push("HTML mal cerrado (rompería la página)");
  if (UNSAFE_RE.test(joined)) issues.push("HTML con código no permitido");
  UNSAFE_RE.lastIndex = 0;
  if (!article.excerpt || article.excerpt.trim().length < 60) issues.push("entradilla insuficiente");
  if (!article.metaDescription || article.metaDescription.trim().length < 60) {
    issues.push("meta descripción insuficiente");
  }

  const penalty = issues.length * 12;
  return { score: Math.max(0, 100 - penalty), issues };
}
