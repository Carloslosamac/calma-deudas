/**
 * Triaje de soluciones de deuda (regla de marca, ver memoria del proyecto):
 * - LSO  = insolvente + SIN bienes pagados de valor.
 * - Reunificar = insolvente PERO con bienes pagados de valor que conviene proteger
 *   (negociación extrajudicial que baja cuota y total, NO un préstamo nuevo).
 * - Reclamación judicial = al corriente + usura (tarjetas/microcréditos) + deuda baja.
 */

export type Housing = "propiedad" | "hipoteca" | "alquiler";
export type Vehicle = "propiedad" | "financiado" | "no";
export type Solution = "lso" | "reunificar" | "reclamacion";

export interface TriageInput {
  debtAmount: number;
  isDefault: boolean;
  entities: string[]; // p. ej. ["prestamos", "tarjetas", ...]
  housing: Housing | "";
  mortgagePaid?: number; // importe ya pagado de hipoteca
  vehicle: Vehicle | "";
  vehicleValue?: number; // valor estimado (en propiedad)
  vehiclePaid?: number; // importe pagado (financiado)
}

export interface TriageResult {
  solution: Solution;
  title: string;
  description: string;
  highlights: string[];
}

const USURY_ENTITIES = ["tarjetas", "microcreditos"];

/** ¿Tiene bienes pagados de valor que bloquean la LSO en la práctica? */
const hasValuableAssets = (input: TriageInput): boolean => {
  // Vivienda en propiedad (pagada) es un activo de valor.
  if (input.housing === "propiedad") return true;
  // Vehículo en propiedad con valor relevante.
  if (input.vehicle === "propiedad" && (input.vehicleValue ?? 0) >= 4000) return true;
  return false;
};

export const triage = (input: TriageInput): TriageResult => {
  const insolvent = input.isDefault || input.debtAmount >= 15000;
  const hasUsury = input.entities.some((e) => USURY_ENTITIES.includes(e));

  // Solvente + usura + deuda baja → reclamación judicial.
  if (!insolvent && hasUsury && input.debtAmount < 15000) {
    return {
      solution: "reclamacion",
      title: "Reclamación judicial por usura",
      description:
        "Tu situación apunta a poder reclamar lo pagado de más: si la TAE de tus tarjetas o microcréditos es desproporcionada, la deuda puede anularse por usura y recuperas intereses.",
      highlights: [
        "Estás al corriente de pago",
        "Deuda de tarjetas/microcréditos con TAE alta",
        "Posible nulidad por usura",
      ],
    };
  }

  // Insolvente con bienes pagados de valor → reunificar (proteger el patrimonio).
  if (insolvent && hasValuableAssets(input)) {
    return {
      solution: "reunificar",
      title: "Reunificación de deudas",
      description:
        "Como tienes bienes pagados que conviene proteger, lo más probable es negociar tus deudas de forma extrajudicial para bajar la cuota y el total que debes, sin pedir un préstamo nuevo ni poner en riesgo tu patrimonio.",
      highlights: [
        "Negociación extrajudicial (no es un préstamo nuevo)",
        "Baja la cuota y el total que debes",
        "Protege tu vivienda o vehículo pagado",
      ],
    };
  }

  // Insolvente sin bienes de valor → Ley de Segunda Oportunidad.
  if (insolvent) {
    return {
      solution: "lso",
      title: "Ley de Segunda Oportunidad",
      description:
        "Tu perfil encaja con la Ley de Segunda Oportunidad: si tu situación es de insolvencia y no tienes bienes de valor que proteger, puedes llegar a cancelar legalmente tus deudas y empezar de cero.",
      highlights: [
        "Cancelación legal de deudas",
        "Para situaciones de insolvencia real",
        "Sin bienes de valor que bloqueen el proceso",
      ],
    };
  }

  // Resto (al corriente, sin usura clara): reunificar como vía conservadora.
  return {
    solution: "reunificar",
    title: "Reunificación de deudas",
    description:
      "Lo más probable es negociar tus deudas de forma extrajudicial para bajar la cuota y el total que debes, sin pedir un préstamo nuevo. Lo confirmamos en tu análisis gratuito.",
    highlights: [
      "Negociación extrajudicial (no es un préstamo nuevo)",
      "Baja la cuota y el total que debes",
      "Una sola gestión con tus acreedores",
    ],
  };
};