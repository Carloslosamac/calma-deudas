import type { Entity, EntityKind } from "@/data/seo/entities";
import type { RatingIndicator, RatingLevel } from "@/components/seo/modules/EntityRating";

/**
 * Valoración cualitativa por entidad (etiquetas semáforo, sin cifras inventadas).
 * Cada entidad tiene un trío de niveles CURADO según su perfil real; las frases de
 * contexto se generan combinando nivel + tipo + nombre con variantes rotadas por
 * slug para evitar contenido duplicado entre las 100+ fichas.
 *
 * Ejes valorados:
 *  - presion:     presión / agresividad del recobro
 *  - negociacion: margen real para cerrar con quita o acuerdo
 *  - usura:       riesgo de intereses abusivos / deuda reclamable (rojo = MÁS
 *                 opciones de defensa para la persona; por eso lleva nota propia)
 */

type Levels = { presion: RatingLevel; negociacion: RatingLevel; usura: RatingLevel };

const BASE_BY_KIND: Record<EntityKind, Levels> = {
  recobro: { presion: "rojo", negociacion: "verde", usura: "ambar" },
  microcredito: { presion: "ambar", negociacion: "verde", usura: "rojo" },
  revolving: { presion: "ambar", negociacion: "ambar", usura: "rojo" },
  banco: { presion: "ambar", negociacion: "ambar", usura: "ambar" },
  publica: { presion: "ambar", negociacion: "rojo", usura: "verde" },
};

/** Ajustes finos curados por entidad concreta (sobrescriben la base de su tipo). */
const OVERRIDES: Record<string, Partial<Levels>> = {
  // Recobro muy insistentes y con amplio margen (compran cartera muy barata)
  kruk: { presion: "rojo", negociacion: "verde", usura: "ambar" },
  intrum: { presion: "rojo", negociacion: "verde", usura: "ambar" },
  eos: { presion: "rojo", negociacion: "verde", usura: "ambar" },
  axactor: { presion: "rojo", negociacion: "verde", usura: "ambar" },
  gescobro: { presion: "rojo", negociacion: "verde", usura: "verde" },
  "hoist-finance": { presion: "ambar", negociacion: "verde", usura: "ambar" },
  // Microcréditos con TAE típicamente desorbitada → usura muy reclamable
  vivus: { presion: "ambar", negociacion: "verde", usura: "rojo" },
  moneyman: { presion: "ambar", negociacion: "verde", usura: "rojo" },
  cashper: { presion: "ambar", negociacion: "verde", usura: "rojo" },
  quebueno: { presion: "ambar", negociacion: "verde", usura: "rojo" },
  // Revolving de manual (caso WiZink) → alto riesgo de nulidad por usura
  wizink: { presion: "ambar", negociacion: "ambar", usura: "rojo" },
  cofidis: { presion: "ambar", negociacion: "verde", usura: "rojo" },
  cetelem: { presion: "ambar", negociacion: "ambar", usura: "rojo" },
  // Bancos: trato más institucional, menos presión directa
  santander: { presion: "verde", negociacion: "ambar", usura: "ambar" },
  bbva: { presion: "verde", negociacion: "ambar", usura: "ambar" },
  caixabank: { presion: "verde", negociacion: "ambar", usura: "ambar" },
};

const LEVEL_LABEL: Record<"presion" | "negociacion" | "usura", Record<RatingLevel, string>> = {
  presion: { verde: "Baja", ambar: "Media", rojo: "Alta" },
  negociacion: { verde: "Alto", ambar: "Medio", rojo: "Bajo" },
  usura: { verde: "Bajo", ambar: "Medio", rojo: "Alto" },
};

/** Hash determinista por slug para rotar variantes de copy (anti-duplicados). */
const slugIndex = (slug: string, mod: number): number => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % mod;
};

const NOTES: Record<"presion" | "negociacion" | "usura", Record<RatingLevel, ((n: string) => string)[]>> = {
  presion: {
    rojo: [
      (n) => `${n} suele recurrir a llamadas y cartas insistentes; recuerda que solo un juez puede embargar.`,
      (n) => `Es habitual recibir un goteo de comunicaciones de ${n}; la presión no equivale a una orden judicial.`,
      (n) => `${n} aprieta con avisos frecuentes, pero amenazar con el juzgado no es lo mismo que tener sentencia.`,
    ],
    ambar: [
      (n) => `${n} contacta para reclamar, sin un acoso extremo; conviene responder por escrito y con calma.`,
      (n) => `La presión de ${n} es moderada: gestionan el cobro, pero el ritmo es más institucional.`,
      (n) => `${n} reclama de forma regular; mantener la comunicación por escrito te da control.`,
    ],
    verde: [
      (n) => `${n} actúa por cauces formales y rara vez con acoso telefónico directo.`,
      (n) => `El trato de ${n} es institucional; las reclamaciones llegan por vías oficiales, no a base de llamadas.`,
      (n) => `${n} no suele presionar con llamadas agresivas; el contacto es más formal.`,
    ],
  },
  negociacion: {
    verde: [
      (n) => `Como ${n} suele haber comprado la deuda muy barata, hay margen real para cerrar con una quita.`,
      (n) => `Con ${n} se puede negociar un pago único con descuento; cualquier cobro les resulta rentable.`,
      (n) => `Existe recorrido para acordar una rebaja del total con ${n}, sobre todo en pago único.`,
    ],
    ambar: [
      (n) => `Con ${n} hay margen para acordar, aunque depende del importe y del estado del expediente.`,
      (n) => `${n} puede aceptar un acuerdo, pero la negociación es más exigente que con un fondo de recobro.`,
      (n) => `Se puede plantear una propuesta a ${n}; el resultado varía según tu situación concreta.`,
    ],
    rojo: [
      (n) => `${n} deja poco margen para rebajas; la vía más sólida suele ser legal, no la negociación directa.`,
      (n) => `Negociar a la baja con ${n} es difícil; conviene estudiar primero la defensa jurídica.`,
      (n) => `Con ${n} el descuento por acuerdo es limitado; revisar la legalidad de la deuda da más palanca.`,
    ],
  },
  usura: {
    rojo: [
      (n) => `Alto: las deudas con ${n} suelen incluir intereses muy elevados, a menudo reclamables o nulos.`,
      (n) => `Alto, y eso juega a tu favor: si ${n} aplicó intereses abusivos, se puede anular esa parte o el total.`,
      (n) => `Alto riesgo de usura en ${n}; merece la pena revisar el contrato porque puede ser impugnable.`,
    ],
    ambar: [
      (n) => `Medio: conviene revisar el contrato de ${n} por si hay comisiones o intereses de demora reclamables.`,
      (n) => `Medio; según el origen de la deuda con ${n}, puede haber cláusulas discutibles que revisar.`,
      (n) => `Medio: parte de lo que reclama ${n} (intereses, comisiones) puede ser objeto de revisión.`,
    ],
    verde: [
      (n) => `Bajo: la deuda con ${n} suele ser ordinaria, pero igualmente es exonerable si no puedes pagarla.`,
      (n) => `Bajo riesgo de usura con ${n}; aun así, la deuda se puede cancelar con la Ley de Segunda Oportunidad.`,
      (n) => `Bajo: lo habitual con ${n} no es usura, aunque la deuda sigue siendo cancelable si no puedes asumirla.`,
    ],
  },
};

const note = (axis: "presion" | "negociacion" | "usura", level: RatingLevel, e: Entity): string => {
  const variants = NOTES[axis][level];
  return variants[slugIndex(e.slug + axis, variants.length)](e.name);
};

export const getEntityRating = (e: Entity): RatingIndicator[] => {
  const levels: Levels = { ...BASE_BY_KIND[e.kind], ...(OVERRIDES[e.slug] ?? {}) };
  return [
    {
      label: "Presión de recobro",
      level: levels.presion,
      levelLabel: LEVEL_LABEL.presion[levels.presion],
      note: note("presion", levels.presion, e),
    },
    {
      label: "Margen de negociación",
      level: levels.negociacion,
      levelLabel: LEVEL_LABEL.negociacion[levels.negociacion],
      note: note("negociacion", levels.negociacion, e),
    },
    {
      label: "Riesgo de intereses abusivos",
      level: levels.usura,
      levelLabel: LEVEL_LABEL.usura[levels.usura],
      note: note("usura", levels.usura, e),
    },
  ];
};