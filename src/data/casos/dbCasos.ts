import { supabase } from "@/integrations/supabase/client";
import type { CasoExito } from "./types";

// Pools de imágenes temáticas (src/assets/casos/<tema>-N.jpg) para casos generados.
import lso1 from "@/assets/casos/lso-1.jpg";
import lso2 from "@/assets/casos/lso-2.jpg";
import lso3 from "@/assets/casos/lso-3.jpg";
import lso4 from "@/assets/casos/lso-4.jpg";
import lso5 from "@/assets/casos/lso-5.jpg";
import lso6 from "@/assets/casos/lso-6.jpg";
import rev1 from "@/assets/casos/revolving-1.jpg";
import rev2 from "@/assets/casos/revolving-2.jpg";
import rev3 from "@/assets/casos/revolving-3.jpg";
import micro1 from "@/assets/casos/microcreditos-1.jpg";
import micro2 from "@/assets/casos/microcreditos-2.jpg";
import micro3 from "@/assets/casos/microcreditos-3.jpg";
import emb1 from "@/assets/casos/embargo-1.jpg";
import emb2 from "@/assets/casos/embargo-2.jpg";
import emb3 from "@/assets/casos/embargo-3.jpg";
import asnef1 from "@/assets/casos/asnef-1.jpg";
import asnef2 from "@/assets/casos/asnef-2.jpg";
import asnef3 from "@/assets/casos/asnef-3.jpg";
import hac1 from "@/assets/casos/hacienda-1.jpg";
import hac2 from "@/assets/casos/hacienda-2.jpg";
import hac3 from "@/assets/casos/hacienda-3.jpg";
import reu1 from "@/assets/casos/reunificacion-1.jpg";
import reu2 from "@/assets/casos/reunificacion-2.jpg";
import reu3 from "@/assets/casos/reunificacion-3.jpg";

const HERO_POOLS: Record<string, string[]> = {
  "Ley de Segunda Oportunidad": [lso1, lso2, lso3, lso4, lso5, lso6],
  "Tarjetas revolving": [rev1, rev2, rev3],
  "Microcréditos": [micro1, micro2, micro3],
  "Embargos": [emb1, emb2, emb3],
  "ASNEF": [asnef1, asnef2, asnef3],
  "Deudas con Hacienda": [hac1, hac2, hac3],
  "Reunificación de deudas": [reu1, reu2, reu3],
};

const FALLBACK_POOL = [lso1, lso2, lso3, lso4, lso5, lso6];

const hashString = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

const pickHero = (category: string, slug: string): string => {
  const pool = HERO_POOLS[category] ?? FALLBACK_POOL;
  return pool[hashString(slug) % pool.length];
};

type GeneratedCasoRow = {
  slug: string;
  category: string;
  name: string;
  location: string;
  debt_amount: string;
  solution: string;
  headline: string;
  dek: string;
  read_time: string | null;
  hero_alt: string | null;
  hero_image: string | null;
  sections: { id: string; title: string; html: string }[] | null;
  faq: { question: string; answer: string }[] | null;
  keywords: string[] | null;
  seo_title: string | null;
  meta_description: string | null;
  published_at: string | null;
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

export const rowToCaso = (row: GeneratedCasoRow): CasoExito => ({
  slug: row.slug,
  category: row.category,
  name: row.name,
  location: row.location,
  debtAmount: row.debt_amount,
  solution: row.solution,
  headline: row.headline,
  dek: row.dek,
  date: formatDate(row.published_at),
  readTime: row.read_time ?? "6 min",
  // Preferimos la foto única generada por IA para ese caso. Solo caemos al
  // pool temático si aún no se ha generado (backfill pendiente).
  heroImage: row.hero_image ?? pickHero(row.category, row.slug),
  heroAlt: row.hero_alt ?? row.headline,
  sections: (row.sections ?? []).map((s) => ({ id: s.id, title: s.title, html: s.html })),
  keywords: row.keywords ?? undefined,
  faq: row.faq ?? undefined,
  seoTitle: row.seo_title ?? undefined,
  metaDescription: row.meta_description ?? undefined,
  publishedAt: row.published_at ?? undefined,
  updatedAt: row.published_at ?? undefined,
});

const SELECT =
  "slug,category,name,location,debt_amount,solution,headline,dek,read_time,hero_alt,hero_image,sections,faq,keywords,seo_title,meta_description,published_at";

export const fetchGeneratedCasos = async (): Promise<CasoExito[]> => {
  const { data, error } = await supabase
    .from("generated_casos")
    .select(SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return (data as GeneratedCasoRow[]).map(rowToCaso);
};

export const fetchGeneratedCasoBySlug = async (slug: string): Promise<CasoExito | null> => {
  const { data, error } = await supabase
    .from("generated_casos")
    .select(SELECT)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return rowToCaso(data as GeneratedCasoRow);
};