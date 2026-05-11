import type { BlogPost } from "./types";
import { cancelarDeudasRequisitos } from "./posts/cancelar-deudas-requisitos";
import { embargosSegundaOportunidad } from "./posts/embargos-segunda-oportunidad";
import { salirAsnef } from "./posts/salir-asnef";
import { autonomosConDeudas } from "./posts/autonomos-con-deudas";
import { renegociarAcreedores } from "./posts/renegociar-acreedores";
import { vidaDespuesDeuda } from "./posts/vida-despues-deuda";

export const blogPosts: BlogPost[] = [
  cancelarDeudasRequisitos,
  embargosSegundaOportunidad,
  salirAsnef,
  autonomosConDeudas,
  renegociarAcreedores,
  vidaDespuesDeuda,
];

export const blogPostsBySlug: Record<string, BlogPost> = blogPosts.reduce(
  (acc, post) => {
    acc[post.slug] = post;
    return acc;
  },
  {} as Record<string, BlogPost>
);

export const getPostBySlug = (slug?: string): BlogPost | undefined =>
  slug ? blogPostsBySlug[slug] : undefined;
