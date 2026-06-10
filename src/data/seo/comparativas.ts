/**
 * Registro de páginas comparativa (plantilla "comparativa").
 * Cada comparativa vive bajo su cluster: /<cluster>/<slug>.
 * Las rutas se generan en App.tsx por encima del catch-all /:cluster/:slug.
 */
import type { TemplateType } from "./architecture";

export type Comparativa = {
  /** slug de la comparativa (sin cluster) */
  slug: string;
  /** slug del cluster al que pertenece */
  cluster: string;
  /** path absoluto sin trailing slash, para el Router */
  path: string;
  /** H1 / título principal */
  h1: string;
  /** etiqueta corta para navegación e interlinking */
  label: string;
  template: TemplateType;
  /** title SEO (<60 car) */
  seoTitle: string;
  /** meta description (<160 car) */
  metaDescription: string;
};

export const comparativas: Comparativa[] = [
  {
    slug: "reunificar-o-cancelar",
    cluster: "reunificacion-deudas",
    path: "/reunificacion-deudas/reunificar-o-cancelar",
    h1: "Reunificar o cancelar deudas: ¿qué te conviene?",
    label: "Reunificar o cancelar deudas",
    template: "comparativa",
    seoTitle: "Reunificar o cancelar deudas: comparativa | Calma",
    metaDescription:
      "Reunificar deudas o cancelarlas con la Ley de Segunda Oportunidad: diferencias, ventajas, riesgos y cuándo conviene cada opción.",
  },
  {
    slug: "segunda-oportunidad-vs-concurso",
    cluster: "ley-segunda-oportunidad",
    path: "/ley-segunda-oportunidad/segunda-oportunidad-vs-concurso",
    h1: "Ley de Segunda Oportunidad vs concurso de acreedores",
    label: "Segunda Oportunidad vs concurso",
    template: "comparativa",
    seoTitle: "Segunda Oportunidad vs concurso de acreedores | Calma",
    metaDescription:
      "Diferencias entre la Ley de Segunda Oportunidad y el concurso de acreedores: para quién es cada uno, plazos, coste y resultado.",
  },
  {
    slug: "acuerdo-de-pago-vs-cancelacion",
    cluster: "cancelar-deudas",
    path: "/cancelar-deudas/acuerdo-de-pago-vs-cancelacion",
    h1: "Negociar un acuerdo de pago o cancelar la deuda",
    label: "Acuerdo de pago vs cancelación",
    template: "comparativa",
    seoTitle: "Acuerdo de pago o cancelar la deuda: comparativa | Calma",
    metaDescription:
      "Negociar un acuerdo de pago con tus acreedores o cancelar la deuda legalmente: ventajas, riesgos y cuándo elegir cada vía.",
  },
];

export const comparativasByPath: Record<string, Comparativa> = comparativas.reduce(
  (acc, c) => {
    acc[c.path] = c;
    return acc;
  },
  {} as Record<string, Comparativa>,
);

export const comparativasByCluster = (clusterSlug: string): Comparativa[] =>
  comparativas.filter((c) => c.cluster === clusterSlug);

export const getComparativa = (
  clusterSlug?: string,
  slug?: string,
): Comparativa | undefined =>
  comparativas.find((c) => c.cluster === clusterSlug && c.slug === slug);