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

/** Conjunto de módulos interactivos de una money page. */
export type MoneyInteractive = {
  simulator?: MoneySimulator;
  debtTypes?: MoneyDebtType[];
  debtTypesTitle?: string;
  debtTypesSubtitle?: string;
  quiz?: MoneyQuiz;
  beforeAfter?: MoneyBeforeAfter;
};

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
  /** marca el contenido como revisado por abogado (E-E-A-T) */
  reviewed?: boolean;

  /** ----- Módulos visuales del journey (opcionales) ----- */
  /** si está presente, la página se renderiza con el layout "journey" */
  hero?: MoneyHero;
  benefits?: MoneyBenefit[];
  benefitsTitle?: string;
  steps?: MoneyStep[];
  stepsTitle?: string;
  stepsSubtitle?: string;
  metrics?: MoneyMetric[];
  eligibility?: MoneyEligibility;
  closing?: MoneyClosing;
  /** módulos interactivos (simulador, selector, quiz, antes/después) */
  interactive?: MoneyInteractive;
};