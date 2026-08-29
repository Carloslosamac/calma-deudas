import type { ReactNode } from "react";

export type BlogSection = {
  id: string;
  title: string;
  /** Cuerpo como nodos React (posts redactados a mano en código). */
  body?: ReactNode;
  /** Cuerpo como HTML (posts generados y guardados en base de datos). */
  html?: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  /**
   * Autores del equipo jurídico que firman el post (ids de src/data/team.ts),
   * máximo 3. Si se define, sustituye al campo `author` en la UI y el SEO.
   */
  authors?: string[];
  heroImage: string;
  heroAlt: string;
  sections: BlogSection[];
  keywords?: string[];
  /** SEO opcional — si no se especifica, se infieren de title/excerpt. */
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  publishedAt?: string;
  updatedAt?: string;
  canonicalUrl?: string;
  faq?: { question: string; answer: string }[];
  howToSteps?: { name: string; text: string }[];
  noindex?: boolean;
  /** Resumen "answer-first" para motores generativos (GEO/AEO). */
  tldr?: string;
  /**
   * Respuesta directa (40-100 palabras) a la intención principal del post.
   * Tiene prioridad sobre `tldr` en el bloque bajo el H1.
   */
  directAnswer?: string;
  /** Puntos clave extraíbles del artículo (GEO/AEO). */
  keyTakeaways?: string[];
  /** Id (en TEAM) del abogado que ha REVISADO de verdad el contenido. */
  reviewer?: string;
  /** Fecha de esa revisión editorial (ISO). */
  reviewedAt?: string;
  /**
   * Fecha real de última actualización de contenido (ISO). Alimenta
   * `dateModified`; nunca se rellena con timestamps técnicos.
   */
  contentUpdatedAt?: string;
  /** Puente comercial editorial (SolutionBridge) definido por post. */
  bridge?: {
    title: string;
    description: string;
    ctaLabel?: string;
    links?: { label: string; to: string }[];
  };
  /** CTA y beneficios del sidebar, alineados con la intención del post. */
  sidebar?: {
    ctaTitle: string;
    ctaDescription: string;
    ctaLabel: string;
    benefits: string[];
  };
};
