import type { ReactNode } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export type CheckListProps = {
  items: ReactNode[];
  /** icono: check verde (sí) o cruz (no) */
  variant?: "check" | "cross";
};

/** Lista con iconos para requisitos / criterios, sustituye a <ul> de prosa. */
const CheckList = ({ items, variant = "check" }: CheckListProps) => {
  const Icon = variant === "check" ? CheckCircle2 : XCircle;
  const color = variant === "check" ? "text-accent-deep" : "text-orange-deep";
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} aria-hidden />
          <span className="text-base leading-relaxed text-foreground/85">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default CheckList;