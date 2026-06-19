import type { CasoExito } from "./types";
import { noemiBarcelona } from "./posts/noemi-barcelona-48310";

export const casosExito: CasoExito[] = [
  noemiBarcelona,
];

export const casosExitoBySlug: Record<string, CasoExito> = casosExito.reduce(
  (acc, caso) => {
    acc[caso.slug] = caso;
    return acc;
  },
  {} as Record<string, CasoExito>
);

export const getCasoBySlug = (slug?: string): CasoExito | undefined =>
  slug ? casosExitoBySlug[slug] : undefined;