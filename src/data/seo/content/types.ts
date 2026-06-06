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
};