/**
 * Parser numérico tolerante a formatos españoles e ingleses:
 *   "14.000" → 14000 · "14.000,50" → 14000.5 · "14000.00" → 14000 · "1,234.56" → 1234.56
 * Evita el error clásico de leer "14.000" como 14.
 */
export function parseFlexibleNumber(raw: string | number | null | undefined): number | undefined {
  if (raw == null || raw === "") return undefined;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : undefined;
  let s = raw.replace(/[^\d,.-]/g, "").trim();
  if (!s || s === "-") return undefined;

  const hasComma = s.includes(",");
  const hasDot = s.includes(".");
  if (hasComma && hasDot) {
    // El último separador que aparece es el decimal.
    const dec = s.lastIndexOf(",") > s.lastIndexOf(".") ? "," : ".";
    const thou = dec === "," ? "." : ",";
    s = s.split(thou).join("").replace(dec, ".");
  } else if (hasComma) {
    s = s.replace(/,/g, ".");
  } else if (hasDot) {
    const parts = s.split(".");
    const decimals = parts[parts.length - 1];
    // "14.000" o "1.234.567" → separador de miles; "14.5" o "14.00" → decimal.
    if (parts.length > 2 || decimals.length === 3) s = parts.join("");
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

export const formatEsNumber = (n: number | undefined): string =>
  n === undefined ? "" : new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(n);
