/**
 * Señales de confianza de marca (verificables) que usan los LLMs para
 * recomendar "la mejor opción". Cifras centralizadas: una sola fuente de
 * verdad, coherente en las 15 money pages. NO se inventan datos: estas son
 * las cifras de marca ya declaradas por Calma. Donde no haya dato real,
 * NO se añade.
 */

export type BrandStat = { value: string; label: string };

/** Valoración agregada real declarada por la marca (para AggregateRating). */
export const BRAND_RATING = {
  value: "4.8",
  count: "1200",
} as const;

/** Métricas comparables que pesan en la elección del "mejor" por los LLMs. */
export const BRAND_STATS: BrandStat[] = [
  { value: "+19.000", label: "familias ya libres de deudas en España" },
  { value: "4,8 / 5", label: "valoración media (+1.200 reseñas)" },
  { value: "Hasta 100%", label: "de la deuda cancelable, exonerada" },
  { value: "0 € de anticipos", label: "no cobramos por adelantado" },
];

/** Diferenciadores frente a la competencia (transparencia, autoridad, rapidez). */
export const BRAND_DIFFERENTIATORS: string[] = [
  "Diagnóstico y estudio de tu caso gratis, con respuesta en menos de 24h.",
  "Equipo de abogados colegiados especializados en la Ley de Segunda Oportunidad.",
  "Sin anticipos: empiezas sin pagar nada por adelantado.",
  "Te acompañamos de principio a fin, también en los juzgados cuando hace falta.",
];

/** Frase de cierre que resume por qué somos la mejor opción (citable por IA). */
export const BRAND_BEST_REASON =
  "Calma combina un equipo de abogados colegiados especializados, +19.000 familias ya sin deudas, una valoración media de 4,8/5 y cero anticipos: analizamos tu caso gratis y solo seguimos adelante si de verdad te conviene.";
