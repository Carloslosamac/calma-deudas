/**
 * Sistema de enlazado interno por INTENCIÓN.
 *
 * Conecta los tres tipos de contenido (posts del blog, casos de éxito y
 * herramientas) alrededor de un mismo "topic" de intención. Como el cruce es
 * siempre entre tipos distintos —guía informacional ↔ prueba social ↔ utilidad
 * interactiva— no hay canibalización: cada destino satisface una intención
 * distinta de la misma búsqueda. Los anchors son descriptivos y contextuales
 * (no exact-match del H1 del destino) para evitar sobreoptimización.
 */
import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/data/blog/types";
import { casosExito } from "@/data/casos";
import { tools } from "@/data/seo/tools";

export type LinkTopic =
  | "lso"
  | "requisitos"
  | "revolving"
  | "microcreditos"
  | "embargos"
  | "asnef"
  | "hacienda"
  | "autonomos"
  | "juicio-monitorio"
  | "reunificar"
  | "consejos";

export type ResourceKind = "tool" | "caso" | "post";

export type ResourceLink = {
  to: string;
  label: string;
  description?: string;
  kind: ResourceKind;
};

/** Topic principal de cada post (por slug). */
const POST_TOPIC: Record<string, LinkTopic> = {
  "guia-ley-segunda-oportunidad": "lso",
  "guia-reunificar-deudas": "reunificar",
  "guia-cancelar-deudas": "requisitos",
  "guia-cancelar-tarjetas-revolving": "revolving",
  "guia-cancelar-microcreditos": "microcreditos",
  "cancelar-deudas-requisitos": "requisitos",
  "reclamar-tarjeta-revolving": "revolving",
  "cancelar-microcreditos": "microcreditos",
  "embargos-segunda-oportunidad": "embargos",
  "salir-asnef": "asnef",
  "deudas-hacienda-seguridad-social": "hacienda",
  "autonomos-con-deudas": "autonomos",
  "que-hacer-juicio-monitorio-deuda": "juicio-monitorio",
  "renegociar-acreedores": "reunificar",
  "vida-despues-deuda": "consejos",
};

/**
 * Fallback por categoría del blog para los posts auto-generados (que no están
 * en `POST_TOPIC`). Mantiene el enlazado interno funcional sin tener que dar
 * de alta cada slug a mano en el mapa.
 */
const CATEGORY_TOPIC: Record<string, LinkTopic> = {
  "Segunda oportunidad": "lso",
  "Microcréditos": "microcreditos",
  "Tarjetas revolving": "revolving",
  "Embargos": "embargos",
  "Hipotecas": "reunificar",
  "Reunificación": "reunificar",
  "Juicio monitorio": "juicio-monitorio",
  "Autónomos": "autonomos",
  "Deudas públicas": "hacienda",
  "ASNEF": "asnef",
  "Finanzas familiares": "consejos",
  "Consejos": "consejos",
};

/** Topic de cada caso a partir de su categoría (solución aplicada). */
const CASO_CATEGORY_TOPIC: Record<string, LinkTopic> = {
  "Ley de Segunda Oportunidad": "lso",
  "Concurso de persona física": "lso",
  "Reunificación de deudas": "reunificar",
  "Tarjetas revolving": "revolving",
  "Parar embargo": "embargos",
  "Salir de ASNEF": "asnef",
  "Deudas con Hacienda": "hacienda",
};

/** Topic de cada herramienta (por path). */
const TOOL_TOPIC: Record<string, LinkTopic> = {
  "/herramientas/test-solucion-deuda": "lso",
  "/herramientas/calculadora-deuda-cancelable": "requisitos",
  "/herramientas/calculadora-sueldo-inembargable": "embargos",
  "/herramientas/simulador-revolving-usura": "revolving",
  "/herramientas/simulador-plan-pagos": "reunificar",
  "/herramientas/comparador-soluciones-deuda": "lso",
};

/** Anchor descriptivo y orientado a la acción para cada herramienta. */
const TOOL_ANCHOR: Record<string, string> = {
  "/herramientas/test-solucion-deuda":
    "Haz el test y descubre qué solución encaja con tu caso",
  "/herramientas/calculadora-deuda-cancelable":
    "Calcula cuánta deuda podrías llegar a cancelar",
  "/herramientas/calculadora-sueldo-inembargable":
    "Calcula qué parte de tu sueldo es inembargable",
  "/herramientas/simulador-revolving-usura":
    "Comprueba si tu tarjeta revolving es usuraria",
  "/herramientas/simulador-plan-pagos":
    "Simula un plan de pagos asumible",
  "/herramientas/comparador-soluciones-deuda":
    "Compara las soluciones para salir de tus deudas",
};

/**
 * Grafo de afinidad entre topics. Si un topic no tiene suficientes recursos
 * propios, ampliamos con topics adyacentes (sin saltar a intenciones ajenas).
 */
const RELATED_TOPICS: Record<LinkTopic, LinkTopic[]> = {
  lso: ["requisitos", "embargos", "consejos"],
  requisitos: ["lso", "consejos"],
  revolving: ["microcreditos", "lso"],
  microcreditos: ["revolving", "lso"],
  embargos: ["hacienda", "lso"],
  asnef: ["lso", "consejos"],
  hacienda: ["embargos", "lso"],
  autonomos: ["lso", "reunificar"],
  "juicio-monitorio": ["embargos", "lso"],
  reunificar: ["lso", "consejos"],
  consejos: ["lso", "requisitos"],
};

/** Orden de preferencia: topic exacto primero, luego topics afines. */
const topicChain = (topic: LinkTopic): LinkTopic[] => [
  topic,
  ...RELATED_TOPICS[topic],
];

const postTopic = (slug: string, category?: string): LinkTopic | undefined =>
  POST_TOPIC[slug] ?? (category ? CATEGORY_TOPIC[category] : undefined);
const casoTopic = (category: string): LinkTopic | undefined =>
  CASO_CATEGORY_TOPIC[category];
const toolTopic = (path: string): LinkTopic | undefined => TOOL_TOPIC[path];

export const resolvePostTopic = postTopic;
export const resolveCasoTopic = casoTopic;
export const resolveToolTopic = toolTopic;

/**
 * Recoge elementos por topic siguiendo la cadena de afinidad, sin repetir,
 * hasta alcanzar el límite.
 */
function collectByTopic<T>(
  topic: LinkTopic,
  items: T[],
  topicOf: (item: T) => LinkTopic | undefined,
  limit: number,
): T[] {
  const out: T[] = [];
  const seen = new Set<T>();
  for (const t of topicChain(topic)) {
    for (const item of items) {
      if (out.length >= limit) return out;
      if (seen.has(item)) continue;
      if (topicOf(item) === t) {
        out.push(item);
        seen.add(item);
      }
    }
  }
  return out;
}

/** Herramientas relevantes para un topic. */
export function relatedTools(topic: LinkTopic, limit = 2): ResourceLink[] {
  return collectByTopic(topic, tools, (t) => toolTopic(t.path), limit).map(
    (t) => ({
      to: t.path,
      label: TOOL_ANCHOR[t.path] ?? t.cardTitle,
      description: t.cardDescription,
      kind: "tool" as const,
    }),
  );
}

/** Casos de éxito relevantes para un topic (excluyendo uno opcional). */
export function relatedCasos(
  topic: LinkTopic,
  opts: { excludeSlug?: string; limit?: number } = {},
): ResourceLink[] {
  const { excludeSlug, limit = 2 } = opts;
  const pool = casosExito.filter((c) => c.slug !== excludeSlug);
  return collectByTopic(topic, pool, (c) => casoTopic(c.category), limit).map(
    (c) => ({
      to: `/casos-de-exito/${c.slug}`,
      label: c.headline,
      description: `${c.name}, ${c.location} · ${c.debtAmount}`,
      kind: "caso" as const,
    }),
  );
}

/** Posts del blog relevantes para un topic (excluyendo uno opcional). */
export function relatedPosts(
  topic: LinkTopic,
  opts: { excludeSlug?: string; limit?: number; pool?: BlogPost[] } = {},
): ResourceLink[] {
  const { excludeSlug, limit = 2, pool: rawPool = blogPosts } = opts;
  const pool = rawPool.filter((p) => p.slug !== excludeSlug);
  return collectByTopic(topic, pool, (p) => postTopic(p.slug, p.category), limit).map(
    (p) => ({
      to: `/blog/${p.slug}`,
      label: p.title,
      description: p.excerpt,
      kind: "post" as const,
    }),
  );
}

/** Grupo de enlaces cruzados listo para renderizar. */
export type CrossLinkGroup = { title: string; links: ResourceLink[] };

/** Genera los grupos de enlaces cruzados para una página dada. */
export function buildCrossLinks(params: {
  topic: LinkTopic;
  /** Tipo de la página de origen: se excluye de los grupos. */
  origin: ResourceKind | "none";
  excludeSlug?: string;
  postsPool?: BlogPost[];
}): CrossLinkGroup[] {
  const { topic, origin, excludeSlug, postsPool } = params;
  const groups: CrossLinkGroup[] = [];

  if (origin !== "tool") {
    const t = relatedTools(topic, 2);
    if (t.length) groups.push({ title: "Herramientas para tu caso", links: t });
  }
  if (origin !== "caso") {
    const c = relatedCasos(topic, { excludeSlug, limit: 2 });
    if (c.length) groups.push({ title: "Casos reales como el tuyo", links: c });
  }
  if (origin !== "post") {
    const p = relatedPosts(topic, { excludeSlug, limit: 2, pool: postsPool });
    if (p.length) groups.push({ title: "Sigue informándote", links: p });
  }
  return groups;
}