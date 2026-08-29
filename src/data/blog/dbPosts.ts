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
  direct_answer?: string | null;
  reviewer?: string | null;
  reviewed_at?: string | null;
  content_updated_at?: string | null;
  bridge?: BlogPost["bridge"] | null;
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

/**
 * Sirve las imágenes de storage a través del transformador de imágenes
 * (WebP/AVIF automático según Accept) en lugar del JPEG original.
 * Las imágenes locales importadas por Vite se devuelven intactas.
 */
export const optimizedImage = (src?: string, width = 1200, quality = 72): string => {
  if (!src || !src.includes("/storage/v1/object/sign/")) return src ?? "";
  const url = src.replace("/storage/v1/object/sign/", "/storage/v1/render/image/sign/");
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}width=${width}&quality=${quality}`;
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
  // `dateModified` solo refleja actualizaciones editoriales reales.
  updatedAt: row.content_updated_at ?? undefined,
  faq: row.faq ?? undefined,
  sidebar: row.sidebar ?? undefined,
  tldr: row.tldr ?? undefined,
  directAnswer: row.direct_answer ?? undefined,
  keyTakeaways: row.key_takeaways ?? undefined,
  reviewer: row.reviewer ?? undefined,
  reviewedAt: row.reviewed_at ?? undefined,
  contentUpdatedAt: row.content_updated_at ?? undefined,
  bridge: row.bridge ?? undefined,
});

export const fetchGeneratedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("generated_posts")
    .select(
      "slug,category,title,excerpt,read_time,authors,hero_image,hero_alt,sections,faq,keywords,seo_title,meta_description,sidebar,published_at,tldr,key_takeaways,direct_answer,reviewer,reviewed_at,content_updated_at,bridge"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as GeneratedPostRow[]).map(rowToBlogPost);
};

/**
 * Índice ligero: solo los campos que necesitan el listado, los relacionados y
 * el enlazado interno. Evita descargar el HTML completo de todos los posts
 * (≈1 MB gzip) en cada visita.
 */
export const fetchGeneratedPostsIndex = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("generated_posts")
    .select(
      "slug,category,title,excerpt,read_time,authors,hero_image,hero_alt,keywords,published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as Partial<GeneratedPostRow>[]).map((row) =>
    rowToBlogPost({
      sections: [],
      faq: [],
      seo_title: null,
      meta_description: null,
      sidebar: null,
      tldr: null,
      key_takeaways: null,
      ...row,
    } as GeneratedPostRow)
  );
};

export const fetchGeneratedPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("generated_posts")
    .select(
      "slug,category,title,excerpt,read_time,authors,hero_image,hero_alt,sections,faq,keywords,seo_title,meta_description,sidebar,published_at,tldr,key_takeaways,direct_answer,reviewer,reviewed_at,content_updated_at,bridge"
    )
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return rowToBlogPost(data as GeneratedPostRow);
};