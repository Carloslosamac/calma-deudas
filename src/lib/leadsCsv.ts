// Utilidades para importar CSVs de leads (export de Zoho CRM) a la lista de
// llamadas de ventas. Parser robusto (comillas dobles, comas y saltos de línea
// dentro de campos) + mapeo de columnas Zoho -> nuestros campos.

export type ParsedLead = {
  external_id: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  lead_status: string;
  debt: number | null;
  income: number | null;
  expense: number | null;
  employment: string | null;
  housing: string | null;
  vehicle: string | null;
  is_default: boolean | null;
  source: string | null;
  appointment_at: string | null;
  tier: string | null;
  raw: Record<string, string>;
};

// Estados de "Lead Status" tal cual existen en Zoho CRM (picklist real).
export const ZOHO_LEAD_STATUSES: string[] = [
  "No contactado",
  "Sin contactar",
  "IA No interesado",
  "IA No cualificado",
  "IA Buzón 1",
  "IA Buzón 2",
  "IA Buzón 3",
  "IA Llamada no atendida 1",
  "IA Llamada no atendida 2",
  "IA Llamada no atendida 3",
  "IA Llamada no atendida 4",
  "IA Llamada no atendida 5",
  "IA Llamada no atendida 6",
  "IA Llamada no atendida 7",
  "IA Llamada no atendida 8",
  "IA Llamada no atendida 9",
  "IA Llamada no atendida 10",
  "IA Reunión agendada",
  "IA Reunión no atendida 1",
  "IA Reunión no atendida 2",
  "IA Reunión no atendida 3",
  "IA Imposible reunir",
  "IA Imposible contactar",
  "IA Llamada interrumpida",
  "Whatsapp",
  "IA cualificado",
  "En duda cualificación",
  "Contrato enviado",
  "Contrato firmado",
  "Pagado",
];

// Estados que consideramos "sin trabajar" (pendientes de primera gestión).
export const PENDING_STATUSES: string[] = ["No contactado", "Sin contactar"];

// Devuelve una clase de color coherente para cada estado.
export const statusTone = (s: string): string => {
  if (s === "Pagado" || s === "Contrato firmado")
    return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
  if (s === "Contrato enviado" || s === "IA Reunión agendada" || s === "IA cualificado")
    return "bg-primary/10 text-primary border-primary/20";
  if (s === "En duda cualificación" || s === "Whatsapp")
    return "bg-accent/10 text-accent-deep border-accent/20";
  if (/No interesado|No cualificado|Imposible/.test(s))
    return "bg-destructive/10 text-destructive border-destructive/20";
  if (/Buzón|no atendida|interrumpida/.test(s))
    return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  return "bg-muted text-muted-foreground border-border";
};

// --- Parser CSV ---
export function parseCsv(text: string): Record<string, string>[] {
  // Normaliza saltos de línea.
  const src = text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (inQuotes) {
      if (c === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  // Último campo/fila.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim());
  const out: Record<string, string>[] = [];
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    // Salta filas totalmente vacías.
    if (cells.every((v) => v.trim() === "")) continue;
    const obj: Record<string, string> = {};
    header.forEach((h, idx) => {
      obj[h] = (cells[idx] ?? "").trim();
    });
    out.push(obj);
  }
  return out;
}

// --- Helpers de conversión ---
const num = (v?: string): number | null => {
  if (!v) return null;
  const n = parseFloat(String(v).replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

const boolish = (v?: string): boolean | null => {
  if (v == null || v === "") return null;
  const s = v.trim().toLowerCase();
  if (["true", "sí", "si", "yes", "1", "impago", "en impago"].includes(s)) return true;
  if (["false", "no", "0", "al día", "al dia"].includes(s)) return false;
  return null;
};

export const normalizePhone = (v?: string): string | null => {
  if (!v) return null;
  let s = v.replace(/[^\d+]/g, "");
  if (!s) return null;
  if (!s.startsWith("+") && s.length === 9) s = "+34" + s;
  return s;
};

const first = (row: Record<string, string>, keys: string[]): string | null => {
  for (const k of keys) {
    const val = row[k];
    if (val != null && val.trim() !== "") return val.trim();
  }
  return null;
};

// Mapea situación de vivienda del CSV a valores legibles.
const mapHousing = (row: Record<string, string>): string | null => {
  const v = (row["vivienda"] || "").toLowerCase();
  const alquiler = (row["Alquiler"] || "").toLowerCase();
  if (v.includes("hipot")) return "hipoteca";
  if (v.includes("propiedad") || v.includes("pagada")) return "propiedad";
  if (v.includes("alquil") || alquiler) return "alquiler";
  return row["vivienda"] || null;
};

const mapVehicle = (row: Record<string, string>): string | null => {
  const v = (row["vehiculo"] || "").toLowerCase();
  if (!v) return null;
  if (v.includes("financ")) return "financiado";
  if (v.includes("propiedad") || v.includes("pagado")) return "propiedad";
  if (v === "no" || v.includes("sin")) return "no";
  return row["vehiculo"] || null;
};

export function mapRowToLead(row: Record<string, string>): ParsedLead {
  const name =
    first(row, ["Lead Name"]) ||
    [first(row, ["First Name"]), first(row, ["Last Name"])].filter(Boolean).join(" ").trim() ||
    null;
  return {
    external_id: first(row, ["Record Id"]),
    name: name || null,
    phone: normalizePhone(first(row, ["Phone", "Mobile"]) || undefined),
    email: first(row, ["Email", "Secondary Email"]),
    lead_status: first(row, ["Lead Status"]) || "No contactado",
    debt: num(row["deuda"] || undefined),
    income: num(row["ingreso"] || undefined),
    expense: num(row["gasto"] || undefined),
    employment: first(row, ["laboral"]),
    housing: mapHousing(row),
    vehicle: mapVehicle(row),
    is_default: boolish(row["impago"]),
    source: first(row, ["Fuente", "Source"]),
    appointment_at: first(row, ["Fecha/hora cita"]),
    tier: first(row, ["Tier"]),
    raw: row,
  };
}

// Mapea situación laboral del CSV al enum de GuideFields de /ventas.
export function mapEmployment(v?: string | null): string | undefined {
  if (!v) return undefined;
  const s = v.toLowerCase();
  if (s.includes("autón") || s.includes("auton")) return "autonomo";
  if (s.includes("indefin")) return "empleado_indefinido";
  if (s.includes("tempor")) return "empleado_temporal";
  if (s.includes("desemple") || s.includes("paro")) return "desempleado";
  if (s.includes("pension") || s.includes("jubil")) return "pension";
  return "otros";
}
