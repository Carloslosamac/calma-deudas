import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { ICONS, type MoneyIcon } from "./icons";

export type OptionCard = {
  icon?: MoneyIcon;
  title: string;
  text: ReactNode;
  /** enlaces internos opcionales al pie de la tarjeta */
  links?: ReactNode;
};

export type OptionCardsProps = {
  items: OptionCard[];
  /** columnas en desktop (por defecto 3) */
  columns?: 2 | 3;
};

const COLS: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

/** Rejilla de tarjetas con icono para "vías / opciones / tipos". */
const OptionCards = ({ items, columns = 3 }: OptionCardsProps) => (
  <div className={`grid gap-4 ${COLS[columns]}`}>
    {items.map((item) => {
      const Icon = item.icon ? ICONS[item.icon] ?? Sparkles : Sparkles;
      return (
        <div
          key={item.title}
          className="flex flex-col rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="mt-4 font-poppins text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">{item.text}</p>
          {item.links && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">{item.links}</div>
          )}
        </div>
      );
    })}
  </div>
);

export default OptionCards;