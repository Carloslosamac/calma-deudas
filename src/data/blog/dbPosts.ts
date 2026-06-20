import { supabase } from "@/integrations/supabase/client";
import type { BlogPost } from "./types";

import blogAsnef from "@/assets/blog-asnef.jpg";
import blogAutonomos from "@/assets/blog-autonomos.jpg";
import blogDeudasPublicas from "@/assets/blog-deudas-publicas.jpg";
import blogEmbargos from "@/assets/blog-embargos.jpg";
import blogGuia from "@/assets/blog-guia-segunda-oportunidad.jpg";
import blogJuicio from "@/assets/blog-juicio-monitorio.jpg";
import blogMicrocreditos from "@/assets/blog-microcreditos.jpg";
import blogRenegociar from "@/assets/blog-renegociar.jpg";
import blogRequisitos from "@/assets/blog-requisitos.jpg";
import blogRevolving from "@/assets/blog-revolving.jpg";
import blogVidaDespues from "@/assets/blog-vida-despues.jpg";

const CATEGORY_HERO: Record<string, string> = {
  "Microcréditos": blogMicrocreditos,
  "Tarjetas revolving": blogRevolving,
  "Embargos": blogEmbargos,
  "Segunda oportunidad": blogGuia,
  "Hipotecas": blogRenegociar,
  "Juicio monitorio": blogJuicio,
  "Autónomos": blogAutonomos,
  "Deudas públicas": blogDeudasPublicas,
  "ASNEF": blogAsnef,
  "Finanzas familiares": blogVidaDespues,
  "Reunificación": blogRenegociar,
  "Consejos": blogRequisitos,
};

export type GeneratedPostRow = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  read_time: string | null;
  authors: string[] | null;
  hero_image: string | null;
  hero_alt: string | null;
  sections: { id: string; title: string; html: string }[] | null;
  faq: { question: string; answer: string }[] | null;
  keywords: string[] | null;
  seo_title: string | null;
  meta_description: string | null;
  sidebar: BlogPost["sidebar"] | null;
  published_at: string | null;
  tldr: string | null;
  key_takeaways: string[] | null;
};

const formatDate = (iso?: string | null): string => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export const rowToBlogPost = (row: GeneratedPostRow): BlogPost => ({
  slug: row.slug,
  category: row.category,
  title: row.title,
  excerpt: row.excerpt,
  date: formatDate(row.published_at),
  readTime: row.read_time ?? "6 min",
  author: "Equipo legal Calma",
  authors: row.authors ?? undefined,
  heroImage: row.hero_image ?? CATEGORY_HERO[row.category] ?? blogRequisitos,
  heroAlt: row.hero_alt ?? row.title,
  sections: (row.sections ?? []).map((s) => ({ id: s.id, title: s.title, html: s.html })),
  keywords: row.keywords ?? undefined,
  seoTitle: row.seo_title ?? undefined,
  metaDescription: row.meta_description ?? undefined,
  publishedAt: row.published_at ?? undefined,
  updatedAt: row.published_at ?? undefined,
  faq: row.faq ?? undefined,
  sidebar: row.sidebar ?? undefined,
  tldr: row.tldr ?? undefined,
  keyTakeaways: row.key_takeaways ?? undefined,
});

export const fetchGeneratedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("generated_posts")
    .select(
      "slug,category,title,excerpt,read_time,authors,hero_image,hero_alt,sections,faq,keywords,seo_title,meta_description,sidebar,published_at,tldr,key_takeaways"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as GeneratedPostRow[]).map(rowToBlogPost);
};

export const fetchGeneratedPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("generated_posts")
    .select(
      "slug,category,title,excerpt,read_time,authors,hero_image,hero_alt,sections,faq,keywords,seo_title,meta_description,sidebar,published_at,tldr,key_takeaways"
    )
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return rowToBlogPost(data as GeneratedPostRow);
};