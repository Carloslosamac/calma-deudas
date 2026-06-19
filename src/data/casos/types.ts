import type { ReactNode } from "react";

export type CasoSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export type CasoExito = {
  slug: string;
  /** Solución aplicada, usada como "categoría" visible (LSO, ASNEF, Revolving…). */
  category: string;
  /** Nombre (anonimizado) de la persona del caso. */
  name: string;
  location: string;
  /** Importe cancelado / resuelto, formateado (ej. "48.310 €"). */
  debtAmount: string;
  /** Solución legal aplicada, en una línea. */
  solution: string;
  /** Titular tipo noticia. */
  headline: string;
  /** Entradilla / dek de la noticia. */
  dek: string;
  date: string;
  readTime: string;
  heroImage: string;
  heroAlt: string;
  sections: CasoSection[];
  keywords?: string[];
  faq?: { question: string; answer: string }[];
  /** SEO opcional — si no se especifica, se infieren de headline/dek. */
  seoTitle?: string;
  metaDescription?: string;
  publishedAt?: string;
  updatedAt?: string;
};