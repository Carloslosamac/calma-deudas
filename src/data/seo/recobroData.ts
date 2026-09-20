/**
 * Capa de datos estructurados para el vertical de recobro.
 *
 * Modelo único y escalable: cada empresa de recobro, comprador de deuda,
 * servicer o despacho se describe con datos VERIFICABLES. La ficha de entidad
 * (EntityPage + entityContent) se adapta automáticamente a lo que haya aquí.
 *
 * Regla dura: nada de relaciones comerciales, compras de cartera ni
 * comportamientos inventados. Si un dato no tiene fuente, no se publica.
 */

/** Papel real que juega la compañía respecto a la deuda reclamada. */
export type RecobroRole =
  /** ha comprado la deuda: es el nuevo acreedor */
  | "comprador"
  /** agencia de recobro (reclamación extrajudicial) */
  | "recobro"
  /** servicer: administra carteras por cuenta del titular */
  | "servicer"
  /** gestiona el cobro por cuenta de un tercero, sin ser titular */
  | "gestor-terceros"
  /** fondo o vehículo de adquisición de carteras */
  | "fondo"
  /** despacho de abogados / recobro judicial */
  | "despacho";

export type RecobroSource = { label: string; url: string };

export type RecobroEntityData = {
  slug: string;
  name: string;
  legalName?: string;
  aliases?: string[];
  formerNames?: string[];
  group?: string;
  /** papel principal */
  entityType: RecobroRole;
  /** todos los papeles conocidos (puede ser varios a la vez) */
  roles: RecobroRole[];
  /** entidades de origen de la deuda, SOLO con fuente pública */
  knownOriginators?: string[];
  /** tipo de cartera habitual, solo si está documentado */
  debtTypes?: string[];
  officialWebsite?: string;
  sources?: RecobroSource[];
  /** fecha (ISO) de la última verificación documental */
  lastVerifiedAt?: string;
  /** 1-2 frases factuales adicionales, útiles para quien recibe la reclamación */
  notes?: string;
  /** marca histórica: hoy la actividad la desarrolla otra entidad */
  nowOperatesAs?: { name: string; slug?: string; note: string };
};

/** Etiqueta legible de cada papel. */
export const ROLE_LABEL: Record<RecobroRole, string> = {
  comprador: "Comprador de deuda (nuevo acreedor)",
  recobro: "Empresa de recobro",
  servicer: "Servicer de carteras",
  "gestor-terceros": "Gestor de cobro por cuenta de terceros",
  fondo: "Fondo o vehículo de adquisición",
  despacho: "Despacho jurídico / recobro judicial",
};

/** Explicación en una frase de qué implica ese papel para la persona. */
export const ROLE_MEANING: Record<RecobroRole, string> = {
  comprador:
    "Si compró tu deuda, es ahora el acreedor: puede reclamarte, pero debe poder acreditar la cesión y el importe exacto que reclama.",
  recobro:
    "Reclama el pago por vía extrajudicial: llamadas, cartas, correos. No tiene ninguna potestad para embargar ni para entrar en tu domicilio.",
  servicer:
    "Administra la cartera por cuenta de quien es titular de la deuda: negocia y gestiona, pero el acreedor es otro y puedes pedir que te lo identifiquen.",
  "gestor-terceros":
    "Gestiona el cobro en nombre del acreedor, que sigue siendo el titular: cualquier acuerdo debe quedar por escrito y a nombre de quien es realmente el acreedor.",
  fondo:
    "Es el vehículo que ha adquirido la cartera. Normalmente no te contacta directamente: lo hace el servicer o la agencia de recobro que trabaja para él.",
  despacho:
    "Interviene por la vía jurídica y puede presentar una demanda o un juicio monitorio en nombre del acreedor. Una carta de un despacho no es todavía una notificación judicial.",
};

/**
 * Alias y marcas históricas: nombres por los que la gente busca y que hoy
 * corresponden a otra entidad. No generan URL propia; se absorben en la ficha
 * de la entidad vigente.
 */
export type HistoricalBrand = {
  /** nombre por el que se busca */
  name: string;
  /** slug de la ficha vigente que absorbe esa intención */
  currentSlug: string;
  /** qué pasó realmente (adquisición, cambio de marca, integración) */
  note: string;
  source?: RecobroSource;
};

const V = "2026-09-20";
const src = (label: string, url: string): RecobroSource => ({ label, url });

export const RECOBRO_DATA: Record<string, RecobroEntityData> = {
  /* ---------------- fichas existentes ---------------- */
  intrum: {
    slug: "intrum",
    name: "Intrum",
    legalName: "Intrum Holding Spain, S.A.U.",
    formerNames: ["Intrum Justitia", "Lindorff"],
    aliases: ["Intrum Justitia", "Lindorff España"],
    group: "Intrum AB (Suecia)",
    entityType: "servicer",
    roles: ["servicer", "comprador", "recobro"],
    debtTypes: ["crédito al consumo", "tarjetas", "hipotecario", "carteras NPL"],
    officialWebsite: "https://www.intrum.es/",
    notes:
      "Intrum nació de la combinación de Intrum Justitia y Lindorff (2017). En España integra también Solvia (2019), Haya Real Estate (2023), Aktua (100 % desde 2024) y la plataforma Ophelos.",
    sources: [
      src("Nuestra historia — Intrum España", "https://www.intrum.es/empresas/sobre-intrum/nuestra-historia/"),
      src("Intrum compra Haya Real Estate (El País, 2023)", "https://elpais.com/economia/2023-05-11/intrum-compra-haya-real-estate-al-fondo-cerberus-por-140-millones-de-euros.html"),
      src("Santander vende su 15 % de Aktua a Intrum (Cinco Días, 2024)", "https://cincodias.elpais.com/companias/2024-07-03/santander-sale-de-aktua-al-vender-a-intrum-su-15-del-gestor-bancario.html"),
    ],
    lastVerifiedAt: V,
  },
  lindorff: {
    slug: "lindorff",
    name: "Lindorff",
    group: "Intrum AB",
    entityType: "servicer",
    roles: ["servicer", "comprador"],
    nowOperatesAs: {
      name: "Intrum",
      slug: "intrum",
      note: "La combinación de Lindorff e Intrum Justitia se cerró el 27 de junio de 2017 y desde octubre de ese año la compañía opera bajo la marca Intrum.",
    },
    notes: "Marca histórica. En España la sociedad se denomina hoy Intrum Holding Spain, S.A.U.",
    sources: [
      src("Intrum Justitia y Lindorff (Intrum, relación con inversores)", "https://www.intrum.com/investors/financial-information/intrum-justitia-and-lindorff/"),
      src("La combinación Lindorff–Intrum Justitia (Europa Press, 2017)", "https://www.europapress.es/economia/noticia-combinacion-lindorff-intrum-justitia-crea-compania-8000-empleados-presente-toda-europa-20170627142032.html"),
    ],
    lastVerifiedAt: V,
  },
  gescobro: {
    slug: "gescobro",
    name: "Gescobro",
    legalName: "Gescobro Collection Services, S.L.U.",
    aliases: ["GCBE", "GCBE Advanced Solutions"],
    group: "Cerberus Capital Management",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "comprador", "servicer", "recobro"],
    debtTypes: ["deuda sin garantía", "deuda con garantía", "particulares y pymes"],
    officialWebsite: "https://gcbe.es",
    notes:
      "Fundada en Barcelona en 1987; Miura entró en 2010 y Cerberus la adquirió en 2015. Opera comercialmente como GCBE Advanced Solutions.",
    sources: [src("Sobre nosotros — GCBE", "https://gcbe.es/sobre-nosotros/")],
    lastVerifiedAt: V,
  },
  gcbe: {
    slug: "gcbe",
    name: "GCBE",
    legalName: "GCBE Advanced Solutions (Gescobro Collection Services, S.L.U.)",
    formerNames: ["Gescobro"],
    aliases: ["Gescobro Collection Services", "GCBE Advanced Solutions"],
    group: "Cerberus Capital Management",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "comprador", "servicer"],
    debtTypes: ["deuda sin garantía", "deuda con garantía", "particulares y pymes"],
    officialWebsite: "https://gcbe.es",
    notes:
      "Marca actual de Gescobro (1987). En 2024 el grupo incorporó a Zolva en España y Portugal.",
    sources: [
      src("Sobre nosotros — GCBE", "https://gcbe.es/sobre-nosotros/"),
      src("Cerberus compra Zolva (El Economista, 2024)", "https://www.eleconomista.es/banca-finanzas/noticias/12936428/08/24/cerberus-compra-zolva-en-espana-y-portugal-y-su-cartera-de-6000-millones-en-morosos.html"),
    ],
    lastVerifiedAt: V,
  },
  gesif: {
    slug: "gesif",
    name: "Gesif",
    legalName: "Cabot Financial Spain, S.A.U.",
    formerNames: ["GESIF (1991–2017)"],
    group: "Encore Capital Group",
    entityType: "servicer",
    roles: ["servicer", "comprador", "recobro"],
    officialWebsite: "https://cabotfinancial.es",
    nowOperatesAs: {
      name: "Cabot Financial Spain",
      slug: "cabot",
      note: "GESIF fue adquirida por Cabot Credit Management en noviembre de 2015 y pasó a denominarse Cabot Financial Spain en marzo de 2017.",
    },
    sources: [src("Nuestra historia — Cabot Financial Spain", "https://www.cabotfinancial.es/nuestra-historia/")],
    lastVerifiedAt: V,
  },
  dovalue: {
    slug: "dovalue",
    name: "doValue",
    aliases: ["Altamira", "Altamira doValue", "Altamira Asset Management"],
    group: "doValue S.p.A.",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    debtTypes: ["NPL", "activos inmobiliarios (REO)"],
    officialWebsite: "https://www.dovalue.es/",
    notes:
      "doValue (antes doBank) compró el 85 % de Altamira Asset Management en 2019; la marca Altamira se mantiene como submarca en España.",
    sources: [src("doValue cierra la compra del 85 % de Altamira (La Vanguardia, 2019)", "https://www.lavanguardia.com/vida/20190627/463138191673/dovalue-cierra-la-compra-del-85--de-altamira-por-360-millones-de-euros.html")],
    lastVerifiedAt: V,
  },
  hipoges: {
    slug: "hipoges",
    name: "Hipoges",
    legalName: "Hipoges Iberia, S.L.U.",
    group: "Pollen Street Capital (desde 2025, junto a Finsolutia)",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    debtTypes: ["hipotecario", "préstamo promotor", "consumo", "corporate"],
    knownOriginators: ["Sareb"],
    officialWebsite: "https://www.hipoges.com",
    notes: "Fundada en 2008; gestiona activos y préstamos por cuenta de fondos y entidades, no compra deuda con capital propio.",
    sources: [
      src("La compañía — Hipoges", "https://www.hipoges.com/la-compania/"),
      src("Pollen Street compra Hipoges (Cinco Días, 2025)", "https://cincodias.elpais.com/companias/2025-11-14/el-fondo-britanico-pollen-street-compra-la-gestora-inmobiliaria-hipoges.html"),
    ],
    lastVerifiedAt: V,
  },
  "solvia-servicer": {
    slug: "solvia-servicer",
    name: "Solvia Servicer",
    legalName: "Solvia Servicios Inmobiliarios, S.L.U.",
    aliases: ["Solvia"],
    group: "Intrum",
    entityType: "servicer",
    roles: ["servicer"],
    knownOriginators: ["Banco Sabadell"],
    debtTypes: ["activos inmobiliarios adjudicados"],
    notes: "Banco Sabadell vendió el 80 % de Solvia a Intrum (acuerdo de diciembre de 2018, cierre en abril de 2019).",
    sources: [src("Sabadell vende Solvia a Intrum (El País, 2018)", "https://elpais.com/economia/2018/12/14/actualidad/1544779400_277230.html")],
    lastVerifiedAt: V,
  },
  "pepper-advantage": {
    slug: "pepper-advantage",
    name: "Pepper Advantage",
    group: "Pepper Advantage (grupo global)",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    knownOriginators: ["Abanca", "Cajamar", "Banco Sabadell"],
    debtTypes: ["hipotecario", "consumo", "inmobiliario comercial"],
    officialWebsite: "https://es.pepper-advantage.com/pepper-advantage-spain",
    notes: "Activa en España desde 2006. Gestiona préstamos al corriente y morosos por cuenta de entidades; no compra la deuda.",
    sources: [src("Pepper Advantage Spain", "https://es.pepper-advantage.com/pepper-advantage-spain")],
    lastVerifiedAt: V,
  },
  servdebt: {
    slug: "servdebt",
    name: "Servdebt",
    legalName: "Servdebt España, S.L.",
    group: "Servdebt Group (Lisboa)",
    entityType: "servicer",
    roles: ["servicer", "comprador"],
    debtTypes: ["NPL", "REO", "exposiciones garantizadas y no garantizadas"],
    officialWebsite: "https://servdebt.com/espana",
    notes: "Grupo portugués fundado en 2007, con oficina en Madrid (Alcobendas) y certificación Fitch como special servicer.",
    sources: [src("Servdebt España", "https://servdebt.com/espana")],
    lastVerifiedAt: V,
  },
  "link-finanzas": {
    slug: "link-finanzas",
    name: "Link Finanzas",
    legalName: "Link Financial",
    aliases: ["Link Finanz", "Link Financial"],
    group: "Link Financial Group (Reino Unido)",
    entityType: "comprador",
    roles: ["comprador", "gestor-terceros", "servicer"],
    debtTypes: ["tarjetas revolving", "préstamos personales", "líneas de crédito"],
    officialWebsite: "https://linkfinancial.eu/es/customer-spanish/",
    notes: "Su propia web indica que bancos y financieras le asignan préstamos, tanto en gestión como mediante cesión de la cartera.",
    sources: [src("Link Financial — información para clientes en España", "https://linkfinancial.eu/es/customer-spanish/")],
    lastVerifiedAt: V,
  },
  garnet: {
    slug: "garnet",
    name: "Garnet",
    aliases: ["Garnet Invest", "Garnet Management, S.L.", "Garnet Finance"],
    entityType: "fondo",
    roles: ["fondo", "comprador", "recobro"],
    knownOriginators: ["4Finance Spain (marca Vivus), acreditado en resolución judicial"],
    debtTypes: ["microcréditos y préstamos rápidos", "crédito al consumo"],
    notes:
      "En los expedientes documentados la cesión se produce en cadena: del prestamista original a una sociedad Garnet y de esta a otra del mismo grupo. Conviene exigir la cadena completa de cesiones.",
    sources: [
      src("Garnet Finance (perfil corporativo)", "https://es.linkedin.com/company/garnetfinance"),
      src("Monitorio con cesión en cadena (resolución publicada)", "https://reclamacioneszero.com/wp-content/uploads/2023/09/10427-MONITORIO-GARNET-VIZCAYA.pdf"),
    ],
    lastVerifiedAt: V,
  },
  "prime-credit": {
    slug: "prime-credit",
    name: "Prime Credit",
    legalName: "Prime Credit 3, S.à r.l. (serie Prime Credit)",
    entityType: "fondo",
    roles: ["fondo", "comprador"],
    debtTypes: ["impagos bancarios cedidos"],
    notes:
      "Vehículo luxemburgués que adquirió carteras de impagados de banca española. Parte de esas carteras fueron revendidas en 2018 a Cabot Asset Purchases, con sucesión procesal en los juzgados.",
    sources: [src("Compra de la cartera de Prime Credit 3 por Cabot (La Voz de Galicia, 2018)", "https://www.lavozdegalicia.es/noticia/vigo/vigo/2018/09/10/fondo-buitre-irlanda-recompra-luxemburgo-deudas-vigueses/0003_201809V10C3992.htm")],
    lastVerifiedAt: V,
  },
  collectia: {
    slug: "collectia",
    name: "Collectia",
    legalName: "Collectia, S.L.",
    entityType: "despacho",
    roles: ["despacho", "recobro"],
    debtTypes: ["facturas", "efectos comerciales", "préstamos y créditos"],
    notes:
      "Sociedad con CIF B06871842, constituida en Barcelona en 2021 y registrada bajo actividades jurídicas. No debe confundirse con Colektia, compañía distinta.",
    sources: [src("Ficha registral de Collectia, S.L.", "https://empresite.eleconomista.es/COLLECTIA.html")],
    lastVerifiedAt: V,
  },

  /* ---------------- altas nuevas verificadas ---------------- */
  cabot: {
    slug: "cabot",
    name: "Cabot Financial Spain",
    legalName: "Cabot Financial Spain, S.A.U.",
    formerNames: ["GESIF (1991–2017)"],
    aliases: ["Cabot", "Cabot Financial"],
    group: "Encore Capital Group (NASDAQ: ECPG)",
    entityType: "comprador",
    roles: ["comprador", "servicer", "recobro"],
    debtTypes: ["cartera de particulares", "pymes"],
    officialWebsite: "https://cabotfinancial.es",
    notes:
      "GESIF (1991) fue comprada por Cabot Credit Management en 2015 y renombrada Cabot Financial Spain en 2017; desde 2018 el grupo pertenece a Encore Capital.",
    sources: [src("Nuestra historia — Cabot Financial Spain", "https://www.cabotfinancial.es/nuestra-historia/")],
    lastVerifiedAt: V,
  },
  "pra-group": {
    slug: "pra-group",
    name: "PRA Group",
    legalName: "PRA Iberia, S.L.U.",
    aliases: ["PRA Iberia", "PRA Group Spain"],
    group: "PRA Group Inc. (NASDAQ: PRAA)",
    entityType: "comprador",
    roles: ["comprador", "servicer"],
    debtTypes: ["crédito al consumo", "tarjetas"],
    officialWebsite: "https://pragroup.es/",
    notes: "Filial española de uno de los mayores compradores de deuda impagada del mundo: si te reclama, es porque tu acreedor vendió la deuda.",
    sources: [src("PRA Group España", "https://pragroup.es/")],
    lastVerifiedAt: V,
  },
  "b2-impact": {
    slug: "b2-impact",
    name: "B2 Impact",
    legalName: "B2 Impact España, S.A.U.",
    formerNames: ["B2Holding España"],
    group: "B2 Impact ASA (Oslo)",
    entityType: "comprador",
    roles: ["comprador", "servicer", "recobro"],
    debtTypes: ["crédito al consumo", "tarjetas", "hipotecario", "NPL"],
    officialWebsite: "https://www.b2-impact.es/",
    sources: [src("B2 Impact España", "https://www.b2-impact.es/")],
    lastVerifiedAt: V,
  },
  zolva: {
    slug: "zolva",
    name: "Zolva",
    legalName: "Zolva Platform, S.L.U.",
    group: "Cerberus / GCBE Advanced Solutions (desde 2024)",
    entityType: "comprador",
    roles: ["comprador", "recobro"],
    knownOriginators: ["Banco Sabadell", "Bankinter", "Unicaja", "El Corte Inglés"],
    debtTypes: ["consumo", "pymes", "hipotecario"],
    officialWebsite: "https://www.zolva.com/",
    notes: "Compra carteras de impagados a bancos. En agosto de 2024 Cerberus adquirió su negocio en España y Portugal.",
    sources: [src("Cerberus compra Zolva (El Economista, 2024)", "https://www.eleconomista.es/banca-finanzas/noticias/12936428/08/24/cerberus-compra-zolva-en-espana-y-portugal-y-su-cartera-de-6000-millones-en-morosos.html")],
    lastVerifiedAt: V,
  },
  investcapital: {
    slug: "investcapital",
    name: "InvestCapital Ltd",
    legalName: "Invest Capital, Ltd.",
    aliases: ["Invest Capital", "Investcapital Ltd"],
    entityType: "fondo",
    roles: ["fondo", "comprador"],
    knownOriginators: ["4Finance Spain Financial Services, S.A.U. (acreditado en resolución del Tribunal Supremo)"],
    debtTypes: ["microcréditos y préstamos rápidos", "crédito al consumo"],
    notes:
      "Aparece de forma habitual como demandante en procedimientos monitorios por créditos cedidos. Puedes exigir que acredite la cesión concreta de tu contrato.",
    sources: [
      src("Sentencia del Tribunal Supremo sobre cesión de crédito (comentario)", "https://zsasociados.com/sts_226_2024_sentencia-de-la-sala-1a-del-ts/"),
      src("Cesión de crédito y legitimación (análisis jurídico)", "https://www.legalhabitat.es/cesion-del-credito-y-legitimacion-pasiva/"),
    ],
    lastVerifiedAt: V,
  },
  "promontoria-ares": {
    slug: "promontoria-ares",
    name: "Promontoria Ares DAC",
    aliases: ["Promontoria Ares"],
    group: "Cerberus Capital Management (vehículos Promontoria)",
    entityType: "fondo",
    roles: ["fondo", "comprador"],
    debtTypes: ["préstamos personales e hipotecarios impagados"],
    notes:
      "Sociedad irlandesa (DAC) de adquisición de carteras. Existen varias sociedades Promontoria distintas: comprueba cuál figura exactamente en tu reclamación.",
    sources: [src("Reclamaciones de Promontoria Ares DAC (análisis de despacho)", "https://www.abogadosbancarios.es/promontoria-ares-dac/")],
    lastVerifiedAt: V,
  },
  recoverit: {
    slug: "recoverit",
    name: "Recoverit",
    legalName: "Recoverit Management & Collection, S.L.U.",
    formerNames: ["Working Capital Management España (WCM España)"],
    aliases: ["WCM España", "WCM"],
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "comprador", "recobro"],
    debtTypes: ["consumo", "carteras de crédito", "B2B"],
    officialWebsite: "https://recoveritw.com/",
    notes: "WCM España pasó a denominarse Recoverit en noviembre de 2025. Su objeto social incluye compra y gestión de carteras de crédito.",
    sources: [
      src("WCM España se transforma en Recoverit (Europa Press / Bolsamanía)", "https://www.bolsamania.com/noticias/mercados/economiafinanzas--wcm-espana-se-transforma-en-recoverit-para-arrancar-proceso-de-expansion-y-diversificacion--21185976.html"),
      src("Recoverit Management & Collection", "https://recoveritw.com/"),
    ],
    lastVerifiedAt: V,
  },
  "furio-capital": {
    slug: "furio-capital",
    name: "Furio Capital",
    legalName: "Furio Capital, S.L.",
    group: "Forlione International, S.A.",
    entityType: "comprador",
    roles: ["comprador", "servicer", "gestor-terceros"],
    debtTypes: ["carteras de crédito"],
    officialWebsite: "https://www.furio.es",
    notes: "CIF B88438536, constituida en Madrid en 2019. Su objeto social incluye gestión extrajudicial de cobros y administración de carteras de crédito.",
    sources: [src("Aviso legal — Furio Capital", "https://www.furio.es/aviso.html")],
    lastVerifiedAt: V,
  },
  cobratis: {
    slug: "cobratis",
    name: "Cobratis",
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["facturas", "alquileres", "préstamos", "cuotas de comunidad"],
    officialWebsite: "https://www.cobratis.es",
    notes: "Servicio online de recobro por encargo del acreedor; no compra la deuda.",
    sources: [src("Cobratis — cobro de deudas", "https://www.cobratis.es/cobro-de-deudas")],
    lastVerifiedAt: V,
  },
  "cobrador-del-frac": {
    slug: "cobrador-del-frac",
    name: "El Cobrador del Frac",
    legalName: "El Cobrador del Frac, S.A.",
    entityType: "recobro",
    roles: ["recobro"],
    debtTypes: ["deudas comerciales y de consumo"],
    officialWebsite: "https://www.elcobradordelfrac.com",
    notes:
      "Agencia conocida por la presencia física y la presión reputacional. Esa presión tiene límites legales: no puede revelar tu deuda a terceros ni acosarte.",
    sources: [src("El Cobrador del Frac entra en beneficios (El País, 2021)", "https://elpais.com/economia/2021-10-14/el-cobrador-del-frac-entra-en-beneficios-en-el-ano-de-la-pandemia.html")],
    lastVerifiedAt: V,
  },
  "bulnes-capital": {
    slug: "bulnes-capital",
    name: "Bulnes Capital",
    legalName: "Bulnes Capital, S.L.",
    entityType: "comprador",
    roles: ["comprador", "fondo", "recobro"],
    debtTypes: ["préstamos personales", "tarjetas de crédito", "pólizas de crédito"],
    notes: "CIF B88343900, sede en Madrid. Figura como demandante en procedimientos monitorios y juicios verbales por créditos cedidos.",
    sources: [src("Ficha registral de Bulnes Capital, S.L.", "https://openmercantil.es/empresa/bulnes-capital-sl")],
    lastVerifiedAt: V,
  },
  "grove-capital": {
    slug: "grove-capital",
    name: "Grove Capital Management",
    group: "Encore Capital Group / Blenheim Chalcot",
    entityType: "fondo",
    roles: ["fondo", "comprador", "servicer"],
    knownOriginators: ["Vodafone", "Banco Sabadell"],
    debtTypes: ["consumo", "facturas de telecomunicaciones"],
    officialWebsite: "https://www.grove-cm.com/",
    sources: [
      src("Grove Capital Management", "https://www.grove-cm.com/"),
      src("Sabadell vende fallidos a Grove y Lindorff (Capital & Corporate)", "https://capital-riesgo.es/es/articles/sabadell-vende-1-000-millones-en-fallidos-a-grove-y-lindorff-/"),
    ],
    lastVerifiedAt: V,
  },
  finsolutia: {
    slug: "finsolutia",
    name: "Finsolutia",
    legalName: "Finsolutia, S.A.",
    group: "Pollen Street Capital",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    debtTypes: ["hipotecario", "NPL", "activos inmobiliarios"],
    officialWebsite: "https://www.finsolutia.com/",
    notes: "Servicer ibérico desde 2007, inscrito como intermediario de crédito inmobiliario. Gestiona por cuenta de terceros, no compra deuda con capital propio.",
    sources: [src("Finsolutia", "https://www.finsolutia.com/")],
    lastVerifiedAt: V,
  },
  "hispania-asset-management": {
    slug: "hispania-asset-management",
    name: "Hispania Asset Management",
    entityType: "servicer",
    roles: ["servicer", "comprador"],
    debtTypes: ["NPL", "hipotecario", "auto", "deuda garantizada de empresas"],
    officialWebsite: "https://www.hispania-am.com/",
    notes: "Servicer independiente (2013) que gestiona carteras para fondos internacionales y también invierte con capital propio.",
    sources: [src("Hispania Asset Management", "https://www.hispania-am.com/?lang=es")],
    lastVerifiedAt: V,
  },
  "savia-asset-management": {
    slug: "savia-asset-management",
    name: "Savia Asset Management",
    legalName: "Savia Asset Management, S.L.",
    formerNames: ["Savia Gestión de Activos, S.L."],
    group: "JB Capital Markets",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    debtTypes: ["NPL", "hipotecario", "consumo", "auto", "telecomunicaciones"],
    officialWebsite: "https://www.saviaam.com/",
    sources: [src("Savia Asset Management — servicios", "https://www.saviaam.com/servicios/")],
    lastVerifiedAt: V,
  },
  bcmglobal: {
    slug: "bcmglobal",
    name: "BCMGlobal",
    aliases: ["Redwood"],
    group: "LC Financial Holdings",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    debtTypes: ["hipotecario", "pymes", "NPL", "REO"],
    officialWebsite: "https://bcmglobal.es/",
    notes: "Gestiona préstamos y activos por cuenta de bancos y fondos; no compra la deuda. Integró al servicer Redwood.",
    sources: [src("BCMGlobal y Redwood", "https://bcmglobal.es/bcmglobal-redwood/")],
    lastVerifiedAt: V,
  },
  "copernicus-servicing": {
    slug: "copernicus-servicing",
    name: "Copernicus Servicing",
    group: "Copernicus Group",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    debtTypes: ["hipotecario", "pymes", "corporate"],
    officialWebsite: "https://copernicusservicing.com/es/",
    notes: "Gestiona (no compra) préstamos garantizados y carteras inmobiliarias; inscrita en el registro de intermediarios del Banco de España.",
    sources: [src("Copernicus Servicing España", "https://copernicusservicing.com/es/")],
    lastVerifiedAt: V,
  },
  diglo: {
    slug: "diglo",
    name: "Diglo",
    legalName: "Diglo Servicer Company 2021, S.L.",
    group: "Grupo Santander",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    knownOriginators: ["Banco Santander"],
    debtTypes: ["NPL hipotecario", "activos inmobiliarios"],
    officialWebsite: "https://digloservicer.com/",
    notes: "Servicer vinculado a Banco Santander; dispone de un portal propio para consultar y gestionar la posición deudora.",
    sources: [src("Diglo Servicer — corporativo", "https://digloservicer.com/diglo-corporate")],
    lastVerifiedAt: V,
  },
  servihabitat: {
    slug: "servihabitat",
    name: "Servihabitat",
    legalName: "Servihabitat Servicios Inmobiliarios, S.L.",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    knownOriginators: ["CaixaBank"],
    debtTypes: ["hipotecario", "promotor", "activos inmobiliarios"],
    officialWebsite: "https://www.servihabitat.com/",
    notes: "Uno de los grandes servicers españoles de crédito y activos inmobiliarios. Gestiona por cuenta del titular de la deuda.",
    sources: [src("Servihabitat — la compañía", "https://www.servihabitat.com/es/corporate/compania")],
    lastVerifiedAt: V,
  },
  aliseda: {
    slug: "aliseda",
    name: "Aliseda",
    group: "Blackstone (51 %) y Banco Santander (49 %)",
    entityType: "servicer",
    roles: ["servicer"],
    knownOriginators: ["Banco Popular"],
    debtTypes: ["activos inmobiliarios y suelo"],
    officialWebsite: "https://aliseda.com/",
    sources: [src("Aliseda — nosotros", "https://aliseda.com/es/nosotros")],
    lastVerifiedAt: V,
  },
  anticipa: {
    slug: "anticipa",
    name: "Anticipa Real Estate",
    aliases: ["Anticipa"],
    group: "Blackstone",
    entityType: "servicer",
    roles: ["servicer", "gestor-terceros"],
    knownOriginators: ["Sareb"],
    debtTypes: ["hipotecario", "activos inmobiliarios"],
    officialWebsite: "https://www.anticipa.com/",
    notes: "Gestiona préstamos hipotecarios y activos por cuenta de fondos; tramita daciones en pago y reestructuraciones de hipoteca.",
    sources: [src("Anticipa Real Estate — quiénes somos", "https://www.anticipa.com/en/who-we-are")],
    lastVerifiedAt: V,
  },
  "ahora-asset-management": {
    slug: "ahora-asset-management",
    name: "Ahora Asset Management",
    legalName: "Ahora Asset Management, S.L.",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "servicer"],
    debtTypes: ["hipotecario", "NPL con garantía real"],
    officialWebsite: "https://www.ahoramanagement.com/",
    notes: "Gestora que administra carteras hipotecarias y de activos por cuenta de fondos, actuando como apoderada del titular.",
    sources: [src("Ahora Asset Management — compañía", "https://www.ahoramanagement.com/compania/")],
    lastVerifiedAt: V,
  },
  lexer: {
    slug: "lexer",
    name: "Lexer",
    legalName: "Lexer, S.L.",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "despacho", "servicer"],
    knownOriginators: ["Endesa", "Movistar"],
    debtTypes: ["telecomunicaciones", "energía", "banca"],
    officialWebsite: "https://www.lexer.es/",
    notes: "Reclama en nombre de la compañía acreedora, no como titular de la deuda.",
    sources: [src("Lexer — recuperación extrajudicial", "https://www.lexer.es/recuperacion-extrajudicial/")],
    lastVerifiedAt: V,
  },
  libroley: {
    slug: "libroley",
    name: "Libroley",
    entityType: "despacho",
    roles: ["despacho", "recobro"],
    debtTypes: ["deuda de entidades financieras y fondos"],
    officialWebsite: "https://libroley.com/",
    sources: [src("Libroley — quiénes somos", "https://libroley.com/libroley-quienes-somos/")],
    lastVerifiedAt: V,
  },
  "acuerdo-ejaso": {
    slug: "acuerdo-ejaso",
    name: "Acuerdo Servicios Jurídicos",
    legalName: "Acuerdo Servicios Jurídicos, S.L.",
    aliases: ["Acuerdo by EJASO", "ACUERDO"],
    group: "EJASO / ETL Global",
    entityType: "despacho",
    roles: ["despacho", "recobro", "comprador"],
    debtTypes: ["préstamos", "tarjetas", "facturas", "carteras bancarias"],
    officialWebsite: "https://acuerdosj.com/",
    sources: [src("Acuerdo Servicios Jurídicos — recobro de deudas", "https://acuerdosj.com/servicios/recobro-de-deudas/")],
    lastVerifiedAt: V,
  },
  zelsior: {
    slug: "zelsior",
    name: "Zelsior",
    aliases: ["Zelsior Smart Legal"],
    group: "Cleon Capital",
    entityType: "despacho",
    roles: ["despacho", "gestor-terceros"],
    debtTypes: ["hipotecario", "consumo"],
    officialWebsite: "https://zelsior.es/",
    notes: "Firma legaltech especializada en la fase judicial del recobro para bancos, fondos y servicers; no compra deuda.",
    sources: [src("Zelsior Smart Legal", "https://zelsior.es/")],
    lastVerifiedAt: V,
  },
  "ka-recovering": {
    slug: "ka-recovering",
    name: "KA Recovering Services",
    legalName: "KA Recovering Services, S.L.",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "despacho"],
    debtTypes: ["hipotecario", "consumo", "telecomunicaciones"],
    officialWebsite: "https://karecovering.com/",
    sources: [src("KA Recovering Services", "https://karecovering.com/")],
    lastVerifiedAt: V,
  },
  "gap-recovery": {
    slug: "gap-recovery",
    name: "GAP Recovery",
    legalName: "GAP Recovery, S.L.",
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["microcréditos", "préstamos", "financiación de vehículos"],
    officialWebsite: "https://gaprecovery.net/",
    notes: "Recobro amistoso con visitas presenciales y gestión de vehículos financiados. Una visita a domicilio no autoriza a entrar ni a llevarse nada.",
    sources: [src("GAP Recovery", "https://gaprecovery.net/")],
    lastVerifiedAt: V,
  },
  isgf: {
    slug: "isgf",
    name: "ISGF",
    legalName: "ISGF Informes Comerciales, S.L.",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "recobro"],
    knownOriginators: ["TTI Finance", "Salus Inversiones"],
    debtTypes: ["consumo", "telecomunicaciones"],
    officialWebsite: "https://www.isgf.es/",
    sources: [src("ISGF — gestión de cobros", "https://www.isgf.es/GestionCobros")],
    lastVerifiedAt: V,
  },
  "geri-espana": {
    slug: "geri-espana",
    name: "GERI España",
    legalName: "Geri.Esp, S.L.U.",
    aliases: ["Ge.Ri.", "GERI"],
    group: "Geri Holding (Italia)",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "recobro"],
    debtTypes: ["consumo", "NPL", "B2B"],
    officialWebsite: "https://www.geri.es/",
    sources: [src("GERI España", "https://www.geri.es/esp/")],
    lastVerifiedAt: V,
  },
  agesco: {
    slug: "agesco",
    name: "AGESCO",
    legalName: "AGESCO, S.L.",
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["consumo", "B2B"],
    officialWebsite: "https://www.agesco.eu/",
    notes: "Agencia histórica (1961) con oficinas en Barcelona y Madrid, asociada a ANGECO.",
    sources: [src("AGESCO — empresa", "https://www.agesco.eu/empresa/")],
    lastVerifiedAt: V,
  },
  "esco-expansion": {
    slug: "esco-expansion",
    name: "ESCO Expansión",
    legalName: "ESCO Expansión, S.L.",
    group: "Grupo ESCO",
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["banca", "consumo", "empresas"],
    officialWebsite: "https://www.escoexpansion.com/",
    sources: [src("ESCO Expansión", "https://www.escoexpansion.com/")],
    lastVerifiedAt: V,
  },
  "team4-collection": {
    slug: "team4-collection",
    name: "TEAM4 Collection & Consulting",
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["consumo", "empresas"],
    officialWebsite: "https://team4collection.com/",
    notes: "Gestiona el cobro por encargo de un acreedor, con actuación amistosa y judicial.",
    sources: [src("TEAM4 Collection & Consulting", "https://team4collection.com/")],
    lastVerifiedAt: V,
  },
  "formax-recoveries": {
    slug: "formax-recoveries",
    name: "Formax Recoveries",
    legalName: "Formax Recoveries, S.L.",
    formerNames: ["Zahori Investments, S.L."],
    group: "Formax Iberia",
    entityType: "comprador",
    roles: ["comprador", "recobro"],
    debtTypes: ["carteras de deuda", "NPL"],
    officialWebsite: "https://formaxrecoveries.com/",
    sources: [src("Formax Recoveries", "https://formaxrecoveries.com/")],
    lastVerifiedAt: V,
  },
  "hg-cobros": {
    slug: "hg-cobros",
    name: "HG Cobros",
    legalName: "Hispania de Gestión y Cobros, S.L.",
    formerNames: ["Bufete HGC, S.L."],
    entityType: "despacho",
    roles: ["despacho", "recobro"],
    debtTypes: ["consumo", "B2B"],
    officialWebsite: "https://hgcobros.com/",
    sources: [src("HG Cobros", "https://hgcobros.com/")],
    lastVerifiedAt: V,
  },
  "dominus-recobros": {
    slug: "dominus-recobros",
    name: "Dominus Recobros",
    entityType: "recobro",
    roles: ["recobro", "comprador"],
    debtTypes: ["alquileres", "préstamos", "deudas entre particulares"],
    officialWebsite: "https://www.dominusrecobros.es/",
    notes: "Trabaja tanto por encargo del acreedor como mediante cesión de la deuda, según su propia web.",
    sources: [src("Dominus Recobros", "https://www.dominusrecobros.es/")],
    lastVerifiedAt: V,
  },
  collecta: {
    slug: "collecta",
    name: "Collecta",
    legalName: "Collecta Servicios de Gestión de Cobro, S.A.",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "recobro"],
    debtTypes: ["consumo", "B2B"],
    officialWebsite: "https://collecta.es/",
    notes: "CIF A83380337, constituida en Madrid en 2002 y asociada a ANGECO. Gestiona cobro por cuenta de terceros.",
    sources: [src("Collecta Servicios de Gestión de Cobro", "https://collecta.es/")],
    lastVerifiedAt: V,
  },
  cir: {
    slug: "cir",
    name: "CIR",
    legalName: "Compañía de Investigación y Recobro, S.L.",
    aliases: ["CIR SL"],
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["bancario", "suministros", "B2B"],
    officialWebsite: "https://www.cirsl.es/",
    notes: "Asociada a ANGECO desde 1992; gestiona recobro amistoso y judicial para bancos y compañías de suministros.",
    sources: [src("CIR — Compañía de Investigación y Recobro", "https://www.cirsl.es/")],
    lastVerifiedAt: V,
  },
  ari: {
    slug: "ari",
    name: "Acción de Recupero Ibérica",
    legalName: "Acción de Recupero Ibérica, S.L.",
    aliases: ["ARI"],
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["crédito al consumo"],
    officialWebsite: "https://www.accionrecuperoiberica.com/",
    notes: "CIF B87344180, Barcelona. Su objeto social incluye la gestión de carteras crediticias propias o de terceros.",
    sources: [src("Acción de Recupero Ibérica", "https://www.accionrecuperoiberica.com/")],
    lastVerifiedAt: V,
  },
  emergia: {
    slug: "emergia",
    name: "Emergia Smart Collections",
    group: "Grupo Emergia",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "recobro"],
    debtTypes: ["banca", "seguros", "telecomunicaciones", "suministros"],
    officialWebsite: "https://www.emergiacc.com/es/servicios/especialistas-en-cobros",
    notes: "Marca de recobro del grupo BPO Emergia: la gestión se hace por encargo del acreedor.",
    sources: [src("Emergia — especialistas en cobros", "https://www.emergiacc.com/es/servicios/especialistas-en-cobros")],
    lastVerifiedAt: V,
  },
  "tuscany-adquisiciones": {
    slug: "tuscany-adquisiciones",
    name: "Tuscany Adquisiciones",
    entityType: "comprador",
    roles: ["comprador", "fondo"],
    debtTypes: ["NPL con garantía hipotecaria", "activos adjudicados", "cesiones de remate"],
    officialWebsite: "https://tuscanyadquisiciones.es/",
    sources: [src("Tuscany Adquisiciones", "https://tuscanyadquisiciones.es/")],
    lastVerifiedAt: V,
  },
  gestimed: {
    slug: "gestimed",
    name: "Gestimed",
    legalName: "Bufete Jurídico Gestimed, S.L.",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "despacho"],
    debtTypes: ["hipotecario", "activos adjudicados"],
    officialWebsite: "https://www.gestimed.net/",
    sources: [src("Gestimed", "https://www.gestimed.net/")],
    lastVerifiedAt: V,
  },
  ges40: {
    slug: "ges40",
    name: "GES40",
    entityType: "despacho",
    roles: ["despacho", "recobro"],
    debtTypes: ["facturas", "primas de seguro", "bancario"],
    officialWebsite: "https://ges40.com/",
    sources: [src("GES40 — recuperación de impagados", "https://ges40.com/recuperacion-impagados/")],
    lastVerifiedAt: V,
  },
  "bjs-legal": {
    slug: "bjs-legal",
    name: "BJS Legal Services",
    legalName: "Gestión Saldos Deudores BJS, S.L.",
    entityType: "gestor-terceros",
    roles: ["gestor-terceros", "despacho"],
    knownOriginators: ["Nexus Energía"],
    debtTypes: ["energía", "consumo", "B2B"],
    officialWebsite: "https://www.bjslegalservices.com/",
    sources: [src("BJS Legal Services", "https://www.bjslegalservices.com/")],
    lastVerifiedAt: V,
  },
  "atradius-collections": {
    slug: "atradius-collections",
    name: "Atradius Collections",
    legalName: "Atradius Collections, S.L., sucursal en España",
    group: "Atradius / Crédito y Caución",
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["deuda comercial entre empresas"],
    officialWebsite: "https://atradiuscollections.com/es/",
    notes: "Reclama deuda comercial por cuenta de empresas acreedoras; no compra la deuda.",
    sources: [src("Atradius Collections España", "https://atradiuscollections.com/es/")],
    lastVerifiedAt: V,
  },
  "coface-collections": {
    slug: "coface-collections",
    name: "Coface Collections",
    group: "Coface (Francia)",
    entityType: "recobro",
    roles: ["recobro", "gestor-terceros"],
    debtTypes: ["deuda comercial entre empresas"],
    officialWebsite: "https://www.coface.es/recobro-de-deudas",
    notes: "Servicio de recobro de deuda comercial de la aseguradora de crédito Coface; cobra a comisión sobre lo recuperado.",
    sources: [src("Coface — recobro de deudas", "https://www.coface.es/recobro-de-deudas")],
    lastVerifiedAt: V,
  },
};

export const HISTORICAL_BRANDS: HistoricalBrand[] = [
  {
    name: "Lindorff",
    currentSlug: "intrum",
    note: "Lindorff se fusionó con Intrum Justitia en junio de 2017 y la compañía resultante opera como Intrum.",
    source: src("Intrum Justitia y Lindorff", "https://www.intrum.com/investors/financial-information/intrum-justitia-and-lindorff/"),
  },
  {
    name: "Intrum Justitia",
    currentSlug: "intrum",
    note: "Intrum Justitia pasó a llamarse Intrum tras la fusión de 2017.",
    source: src("Nuestra historia — Intrum España", "https://www.intrum.es/empresas/sobre-intrum/nuestra-historia/"),
  },
  {
    name: "Haya Real Estate",
    currentSlug: "intrum",
    note: "Intrum adquirió Haya Real Estate en 2023 e integró su actividad de servicing.",
    source: src("Intrum compra Haya Real Estate (El País, 2023)", "https://elpais.com/economia/2023-05-11/intrum-compra-haya-real-estate-al-fondo-cerberus-por-140-millones-de-euros.html"),
  },
  {
    name: "Aktua",
    currentSlug: "intrum",
    note: "Intrum consolidó el 100 % de Aktua en julio de 2024 tras comprar a Santander el 15 % restante.",
    source: src("Santander sale de Aktua (Cinco Días, 2024)", "https://cincodias.elpais.com/companias/2024-07-03/santander-sale-de-aktua-al-vender-a-intrum-su-15-del-gestor-bancario.html"),
  },
  {
    name: "Solvia",
    currentSlug: "intrum",
    note: "Intrum compró el 80 % de Solvia a Banco Sabadell (acuerdo de 2018, cierre en 2019).",
    source: src("Sabadell vende Solvia a Intrum (El País, 2018)", "https://elpais.com/economia/2018/12/14/actualidad/1544779400_277230.html"),
  },
  {
    name: "Ophelos",
    currentSlug: "intrum",
    note: "Ophelos es la plataforma de resolución de deuda propiedad de Intrum, operativa en España desde 2025.",
    source: src("Ophelos (Intrum)", "https://www.intrum.com/business-solutions/debt-recovery-services/ai-driven-debt-collection-from-ophelos/"),
  },
  {
    name: "GESIF",
    currentSlug: "cabot",
    note: "GESIF fue adquirida por Cabot Credit Management en 2015 y renombrada Cabot Financial Spain en 2017.",
    source: src("Nuestra historia — Cabot Financial Spain", "https://www.cabotfinancial.es/nuestra-historia/"),
  },
  {
    name: "Lucania Gestión",
    currentSlug: "cabot",
    note: "Lucania Gestión fue adquirida por Cabot Financial España en 2019 y la sociedad figura extinguida en el registro.",
    source: src("BCMGlobal y Redwood / registro mercantil", "https://www.apiempresas.es/B83107185-lucania-gestion-sl"),
  },
  {
    name: "Altamira",
    currentSlug: "dovalue",
    note: "doValue compró el 85 % de Altamira Asset Management en 2019; Altamira se mantiene como submarca.",
    source: src("doValue compra Altamira (La Vanguardia, 2019)", "https://www.lavanguardia.com/vida/20190627/463138191673/dovalue-cierra-la-compra-del-85--de-altamira-por-360-millones-de-euros.html"),
  },
  {
    name: "Redwood",
    currentSlug: "bcmglobal",
    note: "BCMGlobal completó la adquisición de Redwood e integró ambas plataformas de servicing.",
    source: src("BCMGlobal y Redwood", "https://bcmglobal.es/bcmglobal-redwood/"),
  },
  {
    name: "WCM España",
    currentSlug: "recoverit",
    note: "Working Capital Management España pasó a denominarse Recoverit en noviembre de 2025.",
    source: src("WCM España se transforma en Recoverit (Europa Press)", "https://www.bolsamania.com/noticias/mercados/economiafinanzas--wcm-espana-se-transforma-en-recoverit-para-arrancar-proceso-de-expansion-y-diversificacion--21185976.html"),
  },
  {
    name: "Gescobro",
    currentSlug: "gcbe",
    note: "Gescobro (Barcelona, 1987) opera comercialmente como GCBE Advanced Solutions dentro del grupo Cerberus.",
    source: src("Sobre nosotros — GCBE", "https://gcbe.es/sobre-nosotros/"),
  },
  {
    name: "Zolva",
    currentSlug: "gcbe",
    note: "Cerberus adquirió Zolva en España y Portugal en agosto de 2024, integrándola en su plataforma de recobro.",
    source: src("Cerberus compra Zolva (El Economista, 2024)", "https://www.eleconomista.es/banca-finanzas/noticias/12936428/08/24/cerberus-compra-zolva-en-espana-y-portugal-y-su-cartera-de-6000-millones-en-morosos.html"),
  },
];

export const getRecobroData = (slug: string): RecobroEntityData | undefined =>
  RECOBRO_DATA[slug];

/** Marcas históricas absorbidas por una ficha concreta. */
export const historicalBrandsFor = (slug: string): HistoricalBrand[] =>
  HISTORICAL_BRANDS.filter((b) => b.currentSlug === slug);

/** true si la entidad compra deuda (es o puede ser el acreedor). */
export const buysDebt = (d?: RecobroEntityData): boolean =>
  !!d && (d.roles.includes("comprador") || d.roles.includes("fondo"));
