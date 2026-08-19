import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { formatEsNumber, parseFlexibleNumber } from "@/lib/numberFormat";

/**
 * Campo de importe tolerante al formato español: "14.000", "14.000,50",
 * "14000 €" se interpretan todos como 14000/14000,5. Un `<input type="number">`
 * leía "14.000" como 14, lo que enviaba cifras erróneas al CRM.
 */
export const parseEsNumber = parseFlexibleNumber;
const format = formatEsNumber;

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
