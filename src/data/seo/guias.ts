/**
 * Registro de guías de educación financiera (plantilla "guia").
 * Todas viven bajo el cluster /guias: /guias/<slug>.
 * Contenido evergreen, distinto del blog narrativo y de las money pages.
 */
import type { TemplateType } from "./architecture";

export type Guia = {
  slug: string;
  cluster: string;
  path: string;
  h1: string;
  label: string;
  template: TemplateType;
  seoTitle: string;
  metaDescription: string;
};

export const guias: Guia[] = [
  {
    slug: "como-hacer-un-presupuesto",
    cluster: "guias",
    path: "/guias/como-hacer-un-presupuesto",
    h1: "Cómo hacer un presupuesto familiar paso a paso",
    label: "Cómo hacer un presupuesto",
    template: "guia",
    seoTitle: "Cómo hacer un presupuesto familiar paso a paso | Calma",
    metaDescription:
      "Aprende a hacer un presupuesto familiar realista paso a paso: ingresos, gastos, regla 50/30/20 y cómo recuperar el control de tu dinero.",
  },
  {
    slug: "que-es-la-tae",
    cluster: "guias",
    path: "/guias/que-es-la-tae",
    h1: "Qué es la TAE y por qué importa antes de pedir un préstamo",
    label: "Qué es la TAE",
    template: "guia",
    seoTitle: "Qué es la TAE y por qué importa | Calma",
    metaDescription:
      "Qué es la TAE, en qué se diferencia del TIN y cómo usarla para comparar préstamos y tarjetas sin caer en intereses abusivos.",
  },
  {
    slug: "fondo-de-emergencia",
    cluster: "guias",
    path: "/guias/fondo-de-emergencia",
    h1: "Fondo de emergencia: cuánto ahorrar y cómo crearlo",
    label: "Fondo de emergencia",
    template: "guia",
    seoTitle: "Fondo de emergencia: cuánto ahorrar | Calma",
    metaDescription:
      "Qué es un fondo de emergencia, cuánto deberías ahorrar y cómo crearlo desde cero para no volver a depender de créditos rápidos.",
  },
  {
    slug: "alternativas-a-los-microcreditos",
    cluster: "guias",
    path: "/guias/alternativas-a-los-microcreditos",
    h1: "Alternativas a los microcréditos cuando necesitas dinero",
    label: "Alternativas a los microcréditos",
    template: "guia",
    seoTitle: "Alternativas a los microcréditos | Calma",
    metaDescription:
      "Antes de pedir un microcrédito, conoce las alternativas más baratas y seguras para conseguir liquidez y evitar la espiral de deuda.",
  },
];

export const guiasByPath: Record<string, Guia> = guias.reduce(
  (acc, g) => {
    acc[g.path] = g;
    return acc;
  },
  {} as Record<string, Guia>,
);

export const guiasByCluster = (clusterSlug: string): Guia[] =>
  guias.filter((g) => g.cluster === clusterSlug);

export const getGuia = (clusterSlug?: string, slug?: string): Guia | undefined =>
  guias.find((g) => g.cluster === clusterSlug && g.slug === slug);