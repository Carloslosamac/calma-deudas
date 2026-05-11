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
};