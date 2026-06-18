import type { MoneyContent } from "./types";
import type { MoneyModuleKey } from "./types";
import { enrichmentByPath } from "./enrichment";
import { leySegundaOportunidad } from "./leySegundaOportunidad";
import { abogadosLeySegundaOportunidad } from "./abogadosLeySegundaOportunidad";
import { cancelarDeudas } from "./cancelarDeudas";
import { cancelacionDeDeudas } from "./cancelacionDeDeudas";
import { reunificacionDeudas } from "./reunificacionDeudas";
import { reunificarDeudas } from "./reunificarDeudas";
import { salirDeAsnef } from "./salirDeAsnef";
import { pararEmbargo } from "./pararEmbargo";
import { cancelarTarjetasRevolving } from "./cancelarTarjetasRevolving";
import { cancelarMicrocreditos } from "./cancelarMicrocreditos";
import { exoneracionPasivoInsatisfecho } from "./exoneracionPasivoInsatisfecho";
import { concursoPersonaFisica } from "./concursoPersonaFisica";
import { juicioMonitorioDeuda } from "./juicioMonitorioDeuda";
import { deudasHacienda } from "./deudasHacienda";
import { deudasSeguridadSocial } from "./deudasSeguridadSocial";

/** Registro de copy comercial por path de money page. */
const contents: MoneyContent[] = [
  leySegundaOportunidad,
  abogadosLeySegundaOportunidad,
  cancelarDeudas,
  cancelacionDeDeudas,
  reunificacionDeudas,
  reunificarDeudas,
  salirDeAsnef,
  pararEmbargo,
  cancelarTarjetasRevolving,
  cancelarMicrocreditos,
  exoneracionPasivoInsatisfecho,
  concursoPersonaFisica,
  juicioMonitorioDeuda,
  deudasHacienda,
  deudasSeguridadSocial,
];

/** Inserta una clave de módulo en el layout (antes de `faq`, o de `closing`, o al final). */
const insertKey = (layout: MoneyModuleKey[], key: MoneyModuleKey): MoneyModuleKey[] => {
  if (layout.includes(key)) return layout;
  const anchor = layout.indexOf("faq");
  const at = anchor >= 0 ? anchor : layout.indexOf("closing");
  if (at < 0) return [...layout, key];
  return [...layout.slice(0, at), key, ...layout.slice(at)];
};

/** Fusiona el contenido base con el enriquecimiento SEO (FAQs, glosario, mitos). */
const mergeEnrichment = (c: MoneyContent): MoneyContent => {
  const e = enrichmentByPath[c.path];
  if (!e) return c;
  const interactive = { ...(c.interactive ?? {}) };
  let layout = c.layout ? [...c.layout] : undefined;

  if (e.conceptGlossary && !interactive.conceptGlossary) {
    interactive.conceptGlossary = e.conceptGlossary;
    if (layout) layout = insertKey(layout, "conceptGlossary");
  }
  if (e.mythVsReality && !interactive.mythVsReality) {
    interactive.mythVsReality = e.mythVsReality;
    if (layout) layout = insertKey(layout, "mythVsReality");
  }

  const faq = e.faq ? [...(c.faq ?? []), ...e.faq] : c.faq;
  if (faq && faq.length > 0 && layout && !layout.includes("faq")) {
    layout = insertKey(layout, "faq");
  }

  return { ...c, interactive, faq, ...(layout ? { layout } : {}) };
};

export const moneyContentByPath: Record<string, MoneyContent> = contents.reduce(
  (acc, c) => {
    acc[c.path] = mergeEnrichment(c);
    return acc;
  },
  {} as Record<string, MoneyContent>,
);

export const getMoneyContent = (path: string): MoneyContent | undefined =>
  moneyContentByPath[path];

export type { MoneyContent } from "./types";