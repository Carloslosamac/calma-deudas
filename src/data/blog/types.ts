import type { ReactNode } from "react";

export type BlogSection = {
  id: string;
  title: string;
  body: ReactNode;
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
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
  /** CTA y beneficios del sidebar, alineados con la intención del post. */
  sidebar?: {
    ctaTitle: string;
    ctaDescription: string;
    ctaLabel: string;
    benefits: string[];
  };
};