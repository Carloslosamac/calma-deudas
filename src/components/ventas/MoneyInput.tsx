import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

/**
 * Campo de importe tolerante al formato español: "14.000", "14.000,50",
 * "14000 €" se interpretan todos como 14000/14000,5. Un `<input type="number">`
 * leía "14.000" como 14, lo que enviaba cifras erróneas al CRM.
 */
export function parseEsNumber(raw: string): number | undefined {
  const cleaned = raw.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  if (cleaned === "" || cleaned === "-") return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

const format = (n: number | undefined) =>
  n === undefined ? "" : new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(n);

type Props = {
  value: number | undefined;
  onValueChange: (v: number | undefined) => void;
  placeholder?: string;
  className?: string;
  id?: string;
};

export function MoneyInput({ value, onValueChange, placeholder, className, id }: Props) {
  const [text, setText] = useState(format(value));
  const [focused, setFocused] = useState(false);

  // Sincroniza cuando el valor cambia desde fuera (carga de lead, prueba, reset).
  useEffect(() => {
    if (!focused) setText(format(value));
  }, [value, focused]);

  return (
    <Input
      id={id}
      className={className}
      inputMode="decimal"
      value={text}
      placeholder={placeholder}
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        setText(e.target.value);
        onValueChange(parseEsNumber(e.target.value));
      }}
      onBlur={() => {
        setFocused(false);
        setText(format(parseEsNumber(text)));
      }}
    />
  );
}
