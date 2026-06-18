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
  { slug: "gescobro", name: "Gescobro", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "hoist-finance", name: "Hoist Finance", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "servdebt", name: "Servdebt", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "gesif", name: "Gesif", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "procobro", name: "Procobro", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "iberia-collections", name: "Iberia Collections", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "garnet", name: "Garnet", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "medina-cuadros", name: "Medina Cuadros", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "gcbe", name: "GCBE", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "prime-credit", name: "Prime Credit", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "hipoges", name: "Hipoges", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "solvia-servicer", name: "Solvia Servicer", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "pepper-advantage", name: "Pepper Advantage", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "abanca-servicing", name: "Abanca Servicios Financieros", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "dovalue", name: "doValue", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "lindorff", name: "Lindorff", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "debt-consulting", name: "Debt Consulting", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "collectia", name: "Collectia", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "an-cobros", name: "AN Cobros", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  { slug: "norfin-holder", name: "Norfin Holder", kind: "recobro", cluster: "empresas-de-recobro", solutionPath: "/cancelar-deudas" },
  // Microcréditos
  { slug: "vivus", name: "Vivus", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "moneyman", name: "Moneyman", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "mykredit", name: "MyKredit", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "dineo", name: "Dineo", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "cofidis", name: "Cofidis", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "creditea", name: "Creditea", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "cashper", name: "Cashper", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "quebueno", name: "QueBueno", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "wandoo", name: "Wandoo", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "ferratum", name: "Ferratum", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "prestamer", name: "Préstamer", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "kviku", name: "Kviku", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "zaplo", name: "Zaplo", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "contante", name: "Contante", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "okmoney", name: "OkMoney", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "solcredito", name: "Solcrédito", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "fidinda", name: "Fidinda", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "prestalo", name: "Préstalo", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "credy", name: "Credy", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "monedo-now", name: "Monedo Now", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "ibancar", name: "Ibancar", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "credito-si", name: "CréditoSí", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "cashgo", name: "CashGo", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "money24", name: "Money24", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  { slug: "creditomovil", name: "Crédito Móvil", kind: "microcredito", cluster: "microcreditos-prestamos", solutionPath: "/microcreditos-prestamos/cancelar-microcreditos" },
  // Tarjetas revolving
  { slug: "wizink", name: "WiZink", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "cetelem", name: "Cetelem", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "oney", name: "Oney", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "carrefour", name: "Tarjeta Carrefour (Oney)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "klarna", name: "Klarna", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "caixabank-payments", name: "CaixaBank Payments", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "santander-consumer", name: "Santander Consumer", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "bankintercard", name: "Bankinter Consumer Finance", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "carrefour-pass", name: "Tarjeta PASS Carrefour", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "alcampo-oney", name: "Tarjeta Alcampo (Oney)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "leroy-merlin-oney", name: "Tarjeta Leroy Merlin (Oney)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "ikea-cetelem", name: "Tarjeta IKEA VISA (Cetelem)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "mediamarkt-card", name: "MediaMarkt Club Card", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "fnac-card", name: "Tarjeta FNAC", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "ae-card", name: "American Express (Pago aplazado)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "ing-credit-card", name: "ING (Pago aplazado)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "bbva-aqua", name: "BBVA Aqua (Pago fraccionado)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "openbank-card", name: "Openbank (Pago aplazado)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "tarjeta-you", name: "Tarjeta YOU", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "creditis-card", name: "Tarjeta Créditis", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "union-financiera-asturiana", name: "Unión Financiera Asturiana", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "evo-card", name: "EVO Banco (Pago aplazado)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "imagin-card", name: "imagin (Pago a plazos)", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "repsol-mastercard", name: "Repsol Mastercard", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { slug: "cepsa-starresa", name: "Tarjeta Cepsa StarRessa", kind: "revolving", cluster: "tarjetas-revolving", solutionPath: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  // Bancos
  { slug: "santander", name: "Banco Santander", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "bbva", name: "BBVA", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "caixabank", name: "CaixaBank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "bankinter", name: "Bankinter", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "sabadell", name: "Banco Sabadell", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "abanca", name: "Abanca", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "openbank", name: "Openbank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "unicaja", name: "Unicaja", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "ibercaja", name: "Ibercaja", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "kutxabank", name: "Kutxabank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "cajamar", name: "Cajamar", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "ing", name: "ING", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "evo-banco", name: "EVO Banco", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "myinvestor", name: "MyInvestor", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "deutsche-bank", name: "Deutsche Bank España", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "mediolanum", name: "Banco Mediolanum", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "pichincha", name: "Banco Pichincha", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "banca-march", name: "Banca March", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "laboral-kutxa", name: "Laboral Kutxa", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "cajasur", name: "Cajasur", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "bankoa-abanca", name: "Bankoa Abanca", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "imagin", name: "imagin", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "self-bank-singular", name: "Self Bank / Singular Bank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "revolut-bank", name: "Revolut Bank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "n26", name: "N26", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "wizink-bank", name: "WiZink Bank", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
  { slug: "cooperativo-caja-rural", name: "Caja Rural", kind: "banco", cluster: "bancos-hipoteca-vivienda", solutionPath: "/cancelar-deudas" },
];

export const entitiesByCluster = (clusterSlug: string): Entity[] =>
  entities.filter((e) => e.cluster === clusterSlug);

export const getEntity = (cluster?: string, slug?: string): Entity | undefined =>
  entities.find((e) => e.cluster === cluster && e.slug === slug);