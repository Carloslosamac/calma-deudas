import type { BlogPost } from "./types";
import { cancelarDeudasRequisitos } from "./posts/cancelar-deudas-requisitos";
import { embargosSegundaOportunidad } from "./posts/embargos-segunda-oportunidad";
import { salirAsnef } from "./posts/salir-asnef";
import { autonomosConDeudas } from "./posts/autonomos-con-deudas";
import { renegociarAcreedores } from "./posts/renegociar-acreedores";
import { vidaDespuesDeuda } from "./posts/vida-despues-deuda";
import { guiaLeySegundaOportunidad } from "./posts/guia-ley-segunda-oportunidad";
import { reclamarTarjetaRevolving } from "./posts/reclamar-tarjeta-revolving";
import { cancelarMicrocreditos } from "./posts/cancelar-microcreditos";
import { juicioMonitorioDeuda } from "./posts/juicio-monitorio-deuda";
import { deudasHaciendaSeguridadSocial } from "./posts/deudas-hacienda-seguridad-social";

export const blogPosts: BlogPost[] = [
  guiaLeySegundaOportunidad,
  reclamarTarjetaRevolving,
  cancelarMicrocreditos,
  juicioMonitorioDeuda,
  deudasHaciendaSeguridadSocial,
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
