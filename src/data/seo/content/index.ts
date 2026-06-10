import type { MoneyContent } from "./types";
import { leySegundaOportunidad } from "./leySegundaOportunidad";
import { abogadosLeySegundaOportunidad } from "./abogadosLeySegundaOportunidad";
import { cancelarDeudas } from "./cancelarDeudas";
import { cancelacionDeDeudas } from "./cancelacionDeDeudas";
import { reunificacionDeudas } from "./reunificacionDeudas";
import { reunificarDeudas } from "./reunificarDeudas";

/** Registro de copy comercial por path de money page. */
const contents: MoneyContent[] = [
  leySegundaOportunidad,
  abogadosLeySegundaOportunidad,
  cancelarDeudas,
  cancelacionDeDeudas,
  reunificacionDeudas,
  reunificarDeudas,
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