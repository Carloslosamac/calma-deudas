import type { CasoExito } from "./types";
import { noemiBarcelona } from "./posts/noemi-barcelona-48310";
import { antonioSabadell } from "./posts/antonio-sabadell";
import { gonzaloSevilla } from "./posts/gonzalo-sevilla";
import { marinaBilbao } from "./posts/marina-bilbao";
import { soniaValencia } from "./posts/sonia-valencia";
import { victorMadrid } from "./posts/victor-madrid";
import { danielZaragoza } from "./posts/daniel-zaragoza";
import { carmenMurcia } from "./posts/carmen-murcia";
import { hugoMalaga } from "./posts/hugo-malaga";
import { lorenaValencia } from "./posts/lorena-valencia";
import { sergioAlicante } from "./posts/sergio-alicante";
import { rubenMadrid } from "./posts/ruben-madrid";
import { patriciaValladolid } from "./posts/patricia-valladolid";
import { andresMadrid } from "./posts/andres-madrid";
import { manuelGranada } from "./posts/manuel-granada";
import { pilarValencia } from "./posts/pilar-valencia";

export const casosExito: CasoExito[] = [
  noemiBarcelona,
  antonioSabadell,
  gonzaloSevilla,
  marinaBilbao,
  soniaValencia,
  victorMadrid,
  danielZaragoza,
  carmenMurcia,
  hugoMalaga,
  lorenaValencia,
  sergioAlicante,
  rubenMadrid,
  patriciaValladolid,
  andresMadrid,
  manuelGranada,
  pilarValencia,
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