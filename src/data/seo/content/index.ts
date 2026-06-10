import type { MoneyContent } from "./types";
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

export const moneyContentByPath: Record<string, MoneyContent> = contents.reduce(
  (acc, c) => {
    acc[c.path] = c;
    return acc;
  },
  {} as Record<string, MoneyContent>,
);

export const getMoneyContent = (path: string): MoneyContent | undefined =>
  moneyContentByPath[path];

export type { MoneyContent } from "./types";