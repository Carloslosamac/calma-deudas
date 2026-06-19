import type { ReactNode } from "react";

/** Una sección de contenido real para una money page. */
export type MoneySection = {
  /** título del H2 */
  title: string;
  /** cuerpo en JSX (párrafos, listas, enlaces internos…) */
  body: ReactNode;
};

/** Pregunta frecuente: `a` se muestra en UI, `plain` alimenta el JSON-LD. */
export type MoneyFaq = {
  q: string;
  a: ReactNode;
  /** texto plano para el structured data FAQPage */
  plain: string;
};

/**
 * Respuesta directa transaccional (GEO). Bloque autocontenido y citable por
 * motores generativos: `question` es la pregunta literal, `answer` el render
 * visible (JSX) y `plain` el texto plano que alimenta QAPage/speakable.
 */
export type MoneyDirectAnswer = {
  question: string;
  answer: ReactNode;
  /** texto plano (2-3 frases autocontenidas) para QAPage y speakable */
  plain: string;
};

/** Nombre de icono (lucide) soportado en los módulos visuales. */
export type MoneyIcon =
  | "shield"
  | "phone-off"
  | "gavel"
  | "users"
  | "scale"
  | "sparkles"
  | "wallet"
  | "clock"
  | "lock"
  | "landmark"
  | "ban";

/** Hero del journey. */
export type MoneyHero = {
  badge?: string;
  /** primera parte del H1 (color normal) */
  titleLead: string;
  /** parte acentuada del H1 (color de marca) */
  titleAccent: string;
  subtitle: ReactNode;
  /** nota de confianza junto al CTA, ej. "Sin DNI · Sin compromiso" */
  trustNote?: string;
};

/** Tarjeta de beneficio con icono. */
export type MoneyBenefit = { icon: MoneyIcon; title: string; text: string };

/** Paso del "camino hacia la libertad". */
export type MoneyStep = { title: string; text: string; highlight?: boolean };

/** Métrica de la banda de confianza. */
export type MoneyMetric = { value: string; label: string };

/** Bloque oscuro "¿Es para mí?". */
export type MoneyEligibility = {
  title: string;
  intro: ReactNode;
  requirements: string[];
  /** nota de autoridad al pie */
  trustTitle?: string;
  trustText?: string;
};

/** CTA de cierre del journey. */
export type MoneyClosing = { title: string; text: string };

/** Banda de prueba social de marca (valoración + casos + medios). */
export type MoneySocialProof = {
  /** nota media, ej. "4,8" */
  rating?: string;
  /** nº de valoraciones, ej. "+1.200 valoraciones" */
  ratingCount?: string;
  /** cifra de casos resueltos, ej. "+19.000 familias sin deudas" */
  casesLabel?: string;
  /** sello de confianza, ej. "Respuesta en 24h · Gratis · Sin compromiso" */
  trustSeal?: string;
  /** etiqueta sobre los logos de medios */
  mediaLabel?: string;
};

/** Testimonio real de deuda cancelada (prueba social). */
export type MoneyTestimonial = {
  /** nombre de la persona */
  name: string;
  /** importe cancelado, ej. "136.410 €" */
  amount: string;
  /** ciudad / provincia */
  location: string;
  /** descripción corta del caso */
  text: string;
  /** foto de la persona (import o URL) */
  photo?: string;
};

/** ----- Módulos interactivos ----- */

/** Simulador de deuda cancelable (sliders). */
export type MoneySimulator = {
  title: string;
  subtitle?: string;
  /** máximo del slider de deuda total (€) */
  maxDebt?: number;
  /** máximo del slider de cuota mensual (€) */
  maxMonthly?: number;
  /** valor inicial de deuda total (€) */
  defaultDebt?: number;
  /** valor inicial de cuota mensual (€) */
  defaultMonthly?: number;
  /** si está activo, muestra un selector que compara soluciones (LSO, reunificar…) */
  compareSolutions?: boolean;
};

/** Opción del selector de tipo de deuda. */
export type MoneyDebtType = {
  label: string;
  /** mensaje adaptado al elegir esta opción */
  message: string;
  /** enlace interno a la solución relevante (opcional) */
  to?: string;
  /** texto del enlace interno */
  linkLabel?: string;
};

/** Pregunta del test de elegibilidad. */
export type MoneyQuizQuestion = {
  text: string;
  /** respuesta que suma a favor de poder acogerse */
  goodAnswer: "yes" | "no";
};

/** Test de elegibilidad. */
export type MoneyQuiz = {
  title: string;
  subtitle?: string;
  questions: MoneyQuizQuestion[];
  /** resultado cuando la mayoría encaja */
  resultPass: { title: string; text: string };
  /** resultado cuando hay dudas */
  resultDoubt: { title: string; text: string };
};

/** Comparador antes / después. */
export type MoneyBeforeAfter = {
  title: string;
  subtitle?: string;
  beforeLabel: string;
  afterLabel: string;
  before: string[];
  after: string[];
};

/** ----- Módulos exclusivos por servicio ----- */

/** Miembro del equipo (E-E-A-T) para servicios jurídicos. */
export type MoneyTeamMember = {
  name: string;
  role: string;
  credential?: string;
  photo?: string;
};

/** Bloque de equipo + credenciales (autoridad jurídica). */
export type MoneyTeamCredentials = {
  title: string;
  subtitle?: string;
  members: MoneyTeamMember[];
  /** sellos / cifras de autoridad, ej. "+19.000 casos", "Abogados colegiados" */
  highlights?: string[];
};

/** Calculadora de usura (tarjetas revolving). */
export type MoneyUsuryCalculator = {
  title: string;
  subtitle?: string;
  /** TAE legal de referencia para comparar (ej. 20) */
  legalApr?: number;
  /** TAE típica de la tarjeta revolving (ej. 26) */
  cardApr?: number;
  defaultBalance?: number;
  maxBalance?: number;
};

/** Comparador "lo que pediste vs lo que devuelves" (microcréditos). */
export type MoneyValueComparison = {
  title: string;
  subtitle?: string;
  borrowedLabel: string;
  repaidLabel: string;
  defaultBorrowed?: number;
  maxBorrowed?: number;
  /** factor de devolución típico (ej. 2.6 = devuelves 2,6x) */
  factor?: number;
};

/** Tabla comparativa (reunificar vs cancelar, etc.). */
export type MoneyComparisonColumn = { title: string; highlight?: boolean };
export type MoneyComparisonRow = { feature: string; values: string[] };
export type MoneyComparisonTable = {
  title: string;
  subtitle?: string;
  columns: MoneyComparisonColumn[];
  rows: MoneyComparisonRow[];
};

/** Línea temporal de urgencia ("qué pasa si no actúas"). */
export type MoneyTimelineItem = {
  time: string;
  title: string;
  text: string;
  danger?: boolean;
};
export type MoneyUrgencyTimeline = {
  title: string;
  subtitle?: string;
  items: MoneyTimelineItem[];
};

/** Línea temporal de fases legales (LSO, EPI, concurso). */
export type MoneyLegalTimeline = {
  title: string;
  subtitle?: string;
  phases: { title: string; text: string; duration?: string }[];
};

/** Bloque de límites de exoneración (deuda pública). */
export type MoneyExonerationLimits = {
  title: string;
  subtitle?: string;
  items: { label: string; text: string }[];
  note?: string;
};

/** Glosario de conceptos clave (acordeón educativo). */
export type MoneyGlossaryTerm = { term: string; definition: ReactNode };
export type MoneyConceptGlossary = {
  title: string;
  subtitle?: string;
  terms: MoneyGlossaryTerm[];
};

/** Mitos vs realidad (tarjetas educativas que derriban bulos). */
export type MoneyMythItem = { myth: string; reality: string };
export type MoneyMythVsReality = {
  title: string;
  subtitle?: string;
  items: MoneyMythItem[];
};

/** Conjunto de módulos interactivos de una money page. */
export type MoneyInteractive = {
  simulator?: MoneySimulator;
  debtTypes?: MoneyDebtType[];
  debtTypesTitle?: string;
  debtTypesSubtitle?: string;
  quiz?: MoneyQuiz;
  beforeAfter?: MoneyBeforeAfter;
  teamCredentials?: MoneyTeamCredentials;
  usuryCalculator?: MoneyUsuryCalculator;
  valueComparison?: MoneyValueComparison;
  comparisonTable?: MoneyComparisonTable;
  urgencyTimeline?: MoneyUrgencyTimeline;
  legalTimeline?: MoneyLegalTimeline;
  exonerationLimits?: MoneyExonerationLimits;
  conceptGlossary?: MoneyConceptGlossary;
  mythVsReality?: MoneyMythVsReality;
};

/** Tono visual de la página (acento + energía). */
export type MoneyTone = "transactional" | "legal" | "urgent" | "calm";

/** ----- Bloques data-driven para secciones generadas (paridad de contenido) ----- */

/** Enlace interno simple usado dentro de bloques. */
export type MoneyBlockLink = { to: string; label: string };

/**
 * Bloque de contenido tipado que el renderizador `SectionBlocks` convierte en
 * los módulos visuales del kit. El texto admite **negritas** y enlaces internos
 * en formato [texto](/ruta).
 */
export type MoneyBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "keyCallout"; eyebrow?: string; headline: string; body?: string; tone?: "accent" | "neutral" }
  | {
      kind: "optionCards";
      columns?: 2 | 3;
      items: { icon?: MoneyIcon; title: string; text: string; links?: MoneyBlockLink[] }[];
    }
  | { kind: "factGrid"; columns?: 2 | 3; items: { value: string; label: string; detail?: string }[] }
  | { kind: "checkList"; variant?: "check" | "cross"; items: string[] }
  | { kind: "callout"; variant?: "info" | "warning"; title?: string; text: string }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "actionLink"; to: string; text: string };

/** Sección de contenido generada a partir de bloques tipados. */
export type MoneyExtraSection = { title: string; blocks: MoneyBlock[] };

/** Clave de un módulo renderizable, para ordenar el journey por página. */
export type MoneyModuleKey =
  | "simulator"
  | "benefits"
  | "debtTypes"
  | "steps"
  | "quiz"
  | "metrics"
  | "testimonials"
  | "sections"
  | "eligibility"
  | "faq"
  | "beforeAfter"
  | "closing"
  | "teamCredentials"
  | "usuryCalculator"
  | "valueComparison"
  | "comparisonTable"
  | "urgencyTimeline"
  | "legalTimeline"
  | "exonerationLimits"
  | "conceptGlossary"
  | "mythVsReality"
  | "trustStats"
  | "toolLinks";

/** Copy comercial completo de una money page. */
export type MoneyContent = {
  /** path de la money page (coincide con MoneyPage.path) */
  path: string;
  /** intro/subtítulo comercial bajo el H1 (sustituye al placeholder) */
  intro: ReactNode;
  /** secciones de contenido real (sustituyen a los bloques placeholder) */
  sections: MoneySection[];
  /** preguntas frecuentes (UI + JSON-LD) */
  faq?: MoneyFaq[];
  /** respuesta directa transaccional para GEO (caja citable al inicio) */
  directAnswer?: MoneyDirectAnswer;
  /** marca el contenido como revisado por abogado (E-E-A-T) */
  reviewed?: boolean;

  /** ----- Señales de confianza GEO ("el mejor para X") ----- */
  /** título del bloque de confianza; por defecto "Por qué Calma es la mejor opción para…". */
  trustStatsTitle?: string;
  /** métricas que sustituyen a las de marca (opcional). */
  trustStats?: { value: string; label: string }[];
  /** diferenciadores que sustituyen a los de marca (opcional). */
  trustDifferentiators?: string[];

  /** ----- Módulos visuales del journey (opcionales) ----- */
  /** si está presente, la página se renderiza con el layout "journey" */
  hero?: MoneyHero;
  /** tono visual de la página (acento dominante). Por defecto "transactional". */
  tone?: MoneyTone;
  /** orden de los módulos del journey. Si se omite, se usa el orden por defecto. */
  layout?: MoneyModuleKey[];
  benefits?: MoneyBenefit[];
  benefitsTitle?: string;
  testimonials?: MoneyTestimonial[];
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  testimonialsMoreHref?: string;
  steps?: MoneyStep[];
  stepsTitle?: string;
  stepsSubtitle?: string;
  metrics?: MoneyMetric[];
  eligibility?: MoneyEligibility;
  closing?: MoneyClosing;
  /** banda de prueba social bajo el hero */
  socialProof?: MoneySocialProof;
  /** módulos interactivos (simulador, selector, quiz, antes/después) */
  interactive?: MoneyInteractive;
};