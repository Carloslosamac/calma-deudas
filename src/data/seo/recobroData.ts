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
    "Gestiona el cobro en nombre del acreedor original, que sigue siendo el titular: cualquier acuerdo debe quedar por escrito y a nombre de quien es realmente el acreedor.",
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

export const RECOBRO_DATA: Record<string, RecobroEntityData> = {};

export const HISTORICAL_BRANDS: HistoricalBrand[] = [];

export const getRecobroData = (slug: string): RecobroEntityData | undefined =>
  RECOBRO_DATA[slug];

/** Marcas históricas absorbidas por una ficha concreta. */
export const historicalBrandsFor = (slug: string): HistoricalBrand[] =>
  HISTORICAL_BRANDS.filter((b) => b.currentSlug === slug);

/** true si la entidad compra deuda (es o puede ser el acreedor). */
export const buysDebt = (d?: RecobroEntityData): boolean =>
  !!d && (d.roles.includes("comprador") || d.roles.includes("fondo"));
