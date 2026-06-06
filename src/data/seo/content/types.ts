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
  | "lock";

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
  steps?: MoneyStep[];
  stepsTitle?: string;
  stepsSubtitle?: string;
  metrics?: MoneyMetric[];
  eligibility?: MoneyEligibility;
  closing?: MoneyClosing;
};