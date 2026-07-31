import type { BlogPost } from "./types";
import { blogPostsMeta } from "./meta";

/**
 * Listado de posts estáticos SIN el cuerpo (sections vacío). El contenido
 * completo se carga bajo demanda con `loadStaticPost` para que las rutas de
 * blog y SEO no arrastren ~63 KB gzip de JSX que no se usa.
 */
export const blogPosts: BlogPost[] = blogPostsMeta;

const POST_FILES: Record<string, string> = {
  "guia-ley-segunda-oportunidad": "guia-ley-segunda-oportunidad",
  "guia-reunificar-deudas": "guia-reunificar-deudas",
  "guia-cancelar-deudas": "guia-cancelar-deudas",
  "guia-cancelar-revolving": "guia-cancelar-revolving",
  "guia-cancelar-microcreditos": "guia-cancelar-microcreditos",
  "reclamar-tarjeta-revolving": "reclamar-tarjeta-revolving",
  "cancelar-microcreditos": "cancelar-microcreditos",
  "que-hacer-juicio-monitorio-deuda": "juicio-monitorio-deuda",
  "deudas-hacienda-seguridad-social": "deudas-hacienda-seguridad-social",
  "cancelar-deudas-requisitos": "cancelar-deudas-requisitos",
  "embargos-segunda-oportunidad": "embargos-segunda-oportunidad",
  "salir-asnef": "salir-asnef",
  "autonomos-con-deudas": "autonomos-con-deudas",
  "renegociar-acreedores": "renegociar-acreedores",
  "vida-despues-deuda": "vida-despues-deuda",
};

const postModules = import.meta.glob("./posts/*.tsx") as Record<
  string,
  () => Promise<Record<string, BlogPost>>
>;

/** Carga el post estático completo (con sections) para un slug. */
export const loadStaticPost = async (slug?: string): Promise<BlogPost | null> => {
  const file = slug ? POST_FILES[slug] : undefined;
  if (!file) return null;
  const loader = postModules[`./posts/${file}.tsx`];
  if (!loader) return null;
  const mod = await loader();
  return (Object.values(mod)[0] as BlogPost) ?? null;
};

export const isStaticPost = (slug?: string): boolean => !!slug && !!POST_FILES[slug];

export const blogPostsBySlug: Record<string, BlogPost> = blogPosts.reduce(
  (acc, post) => {
    acc[post.slug] = post;
    return acc;
  },
  {} as Record<string, BlogPost>
);

export const getPostBySlug = (slug?: string): BlogPost | undefined =>
  slug ? blogPostsBySlug[slug] : undefined;
