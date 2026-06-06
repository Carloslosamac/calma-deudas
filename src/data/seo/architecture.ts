/**
 * Arquitectura SEO de Calma — derivada del Mapa SEO Total (Excel).
 * 3 hubs principales (money) + 12 clusters satélite.
 * Esqueleto técnico data-driven: las rutas, el menú y las plantillas
 * se generan a partir de estas estructuras para escalar sin canibalización.
 */

export type SeoIntent =
  | "informativa"
  | "comparativa"
  | "transaccional"
  | "urgente";

export type TemplateType =
  | "money"
  | "hub"
  | "urgente"
  | "entidad"
  | "comparativa"
  | "guia";

export type Cluster = {
  /** slug de la carpeta raíz, ej. "asnef" */
  slug: string;
  /** etiqueta corta para navegación */
  label: string;
  /** título largo / descriptivo */
  title: string;
  /** rol en la arquitectura */
  role: "hub" | "satelite";
  /** intención dominante del cluster */
  intent: SeoIntent;
  /** breve descripción para el índice de hub (placeholder) */
  description: string;
  /** temas únicos detectados en el Excel (volumen del cluster) */
  topics: number;
  /** clusters relacionados para enlazado horizontal */
  related?: string[];
};

/** Los 3 hubs money + los 12 clusters satélite del Excel. */
export const clusters: Cluster[] = [
  {
    slug: "ley-segunda-oportunidad",
    label: "Ley de Segunda Oportunidad",
    title: "Ley de Segunda Oportunidad",
    role: "hub",
    intent: "transaccional",
    description: "Hub maestro: cancelación legal de deudas y exoneración del pasivo.",
    topics: 119,
    related: ["cancelar-deudas", "reunificacion-deudas", "autonomos-concurso-acreedores"],
  },
  {
    slug: "cancelar-deudas",
    label: "Cancelar deudas",
    title: "Cancelación de deudas",
    role: "hub",
    intent: "transaccional",
    description: "Hub: eliminar o reducir deudas con bancos y financieras.",
    topics: 3,
    related: ["ley-segunda-oportunidad", "reunificacion-deudas"],
  },
  {
    slug: "reunificacion-deudas",
    label: "Reunificar deudas",
    title: "Reunificación de deudas",
    role: "hub",
    intent: "transaccional",
    description: "Hub: unificar préstamos en una sola cuota antes de la LSO.",
    topics: 22,
    related: ["ley-segunda-oportunidad", "cancelar-deudas"],
  },
  {
    slug: "asnef",
    label: "ASNEF",
    title: "ASNEF y ficheros de morosos",
    role: "satelite",
    intent: "urgente",
    description: "Salir de ASNEF y otros ficheros de morosos.",
    topics: 49,
    related: ["microcreditos-prestamos", "tarjetas-revolving"],
  },
  {
    slug: "embargos",
    label: "Embargos",
    title: "Embargos y ejecuciones",
    role: "satelite",
    intent: "urgente",
    description: "Parar embargos de nómina, cuenta o vivienda.",
    topics: 123,
    related: ["juicio-monitorio-recobro", "empresas-de-recobro"],
  },
  {
    slug: "tarjetas-revolving",
    label: "Tarjetas revolving",
    title: "Tarjetas revolving, usura e intereses abusivos",
    role: "satelite",
    intent: "transaccional",
    description: "Reclamar y cancelar tarjetas revolving por usura.",
    topics: 255,
    related: ["microcreditos-prestamos", "asnef"],
  },
  {
    slug: "microcreditos-prestamos",
    label: "Microcréditos",
    title: "Microcréditos, préstamos y financiación",
    role: "satelite",
    intent: "transaccional",
    description: "Cancelar microcréditos y préstamos de alto interés.",
    topics: 561,
    related: ["tarjetas-revolving", "asnef"],
  },
  {
    slug: "deudas-hacienda-seguridad-social",
    label: "Deudas públicas",
    title: "Deudas con Hacienda y Seguridad Social",
    role: "satelite",
    intent: "transaccional",
    description: "Deuda pública: Hacienda, Seguridad Social y multas.",
    topics: 50,
    related: ["autonomos-concurso-acreedores", "embargos"],
  },
  {
    slug: "juicio-monitorio-recobro",
    label: "Juicio monitorio",
    title: "Juicio monitorio, demanda y recobro",
    role: "satelite",
    intent: "urgente",
    description: "Responder a un juicio monitorio o demanda por deuda.",
    topics: 66,
    related: ["embargos", "empresas-de-recobro"],
  },
  {
    slug: "bancos-hipoteca-vivienda",
    label: "Bancos e hipoteca",
    title: "Bancos, hipoteca y vivienda",
    role: "satelite",
    intent: "informativa",
    description: "Deudas hipotecarias y con bancos.",
    topics: 112,
    related: ["cancelar-deudas", "embargos"],
  },
  {
    slug: "autonomos-concurso-acreedores",
    label: "Autónomos y concurso",
    title: "Autónomos, empresas y concurso",
    role: "satelite",
    intent: "transaccional",
    description: "Concurso de persona física y deudas de autónomos.",
    topics: 51,
    related: ["ley-segunda-oportunidad", "deudas-hacienda-seguridad-social"],
  },
  {
    slug: "empresas-de-recobro",
    label: "Empresas de recobro",
    title: "Empresas de recobro",
    role: "satelite",
    intent: "urgente",
    description: "Fichas de empresas de recobro y tus derechos.",
    topics: 0,
    related: ["embargos", "juicio-monitorio-recobro"],
  },
  {
    slug: "situaciones",
    label: "Situaciones personales",
    title: "Situaciones personales y familiares",
    role: "satelite",
    intent: "informativa",
    description: "Deudas tras divorcio, paro, enfermedad o fallecimiento.",
    topics: 35,
    related: ["ley-segunda-oportunidad"],
  },
  {
    slug: "estafas-fraude",
    label: "Estafas y fraude",
    title: "Estafas, phishing y fraude",
    role: "satelite",
    intent: "informativa",
    description: "Fraudes financieros y cómo actuar.",
    topics: 9,
    related: ["empresas-de-recobro"],
  },
  {
    slug: "guias",
    label: "Guías",
    title: "Educación financiera y alternativas",
    role: "satelite",
    intent: "informativa",
    description: "Guías de educación financiera y alternativas a la deuda.",
    topics: 14,
    related: ["cancelar-deudas", "reunificacion-deudas"],
  },
];

export const clustersBySlug: Record<string, Cluster> = clusters.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, Cluster>,
);

export const hubs = clusters.filter((c) => c.role === "hub");
export const satelliteClusters = clusters.filter((c) => c.role === "satelite");

export const getCluster = (slug?: string): Cluster | undefined =>
  slug ? clustersBySlug[slug] : undefined;