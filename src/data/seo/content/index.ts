import type { MoneyContent } from "./types";
import { leySegundaOportunidad } from "./leySegundaOportunidad";

/** Registro de copy comercial por path de money page. */
const contents: MoneyContent[] = [leySegundaOportunidad];

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