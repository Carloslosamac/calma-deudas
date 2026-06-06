/**
 * Fichas de entidad (Excel — "Entidad detectada", 321 páginas long tail).
 * Esqueleto: cada entidad genera una URL /<cluster>/<slug> con plantilla EntityPage.
 * Sembramos las entidades top por volumen; el resto se añade por fases.
 */

export type EntityKind = "recobro" | "microcredito" | "revolving" | "banco" | "publica";

export type Entity = {
  slug: string;
  name: string;
  kind: EntityKind;
  /** cluster/carpeta donde vive la ficha */
  cluster: string;
  /** money page a la que enlaza la ficha como solución */
  solutionPath: string;
};

export const entities: Entity[] = [
  // Empresas de recobro
  { slug: "kruk", name: "Kruk", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "intrum", name: "Intrum", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "eos", name: "EOS Spain", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "axactor", name: "Axactor", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "link-finanzas", name: "Link Finanzas", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  // Microcréditos
  { slug: "vivus", name: "Vivus", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "moneyman", name: "Moneyman", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "mykredit", name: "MyKredit", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "dineo", name: "Dineo", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "cofidis", name: "Cofidis", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  // Tarjetas revolving
  { slug: "wizink", name: "WiZink", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "cetelem", name: "Cetelem", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "oney", name: "Oney", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "carrefour", name: "Tarjeta Carrefour (Oney)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "klarna", name: "Klarna", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  // Bancos
  { slug: "santander", name: "Banco Santander", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "bbva", name: "BBVA", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "caixabank", name: "CaixaBank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "bankinter", name: "Bankinter", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "sabadell", name: "Banco Sabadell", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "abanca", name: "Abanca", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "openbank", name: "Openbank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
];

export const entitiesByCluster = (clusterSlug: string): Entity[] =>
  entities.filter((e) => e.cluster === clusterSlug);

export const getEntity = (cluster?: string, slug?: string): Entity | undefined =>
  entities.find((e) => e.cluster === cluster && e.slug === slug);