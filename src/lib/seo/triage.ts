/**
 * Triaje de soluciones de deuda basado en el flowchart real de la LSO.
 *
 * Ejes:
 * - Administrador de sociedad → derivar (concurso ordinario, no LSO estándar).
 * - Deuda pública >10.000€ con un mismo organismo → warning (esa parte no se cancela).
 * - Perfil (individual / conjunta / autónomo) fija umbral de ingresos (1.700€ / 3.000€).
 * - Ingresos ≥ umbral: ratio gastos/ingresos decide plan_pagos / no_insolvente.
 * - Ingresos < umbral (o sin dato): modalidad por activos.
 * - Activos pagados de valor + insolvente → reunificar (proteger patrimonio).
 * - Al corriente + usura + deuda baja → reclamación judicial.
 *
 * El motor se replica en supabase/functions/sales-diagnosis/index.ts. Si tocas uno, toca el otro.
 */

export type Housing = "propiedad" | "hipoteca" | "alquiler";
export type Vehicle = "propiedad" | "financiado" | "no";
export type Solution =
  | "lso"
  | "reunificar"
  | "reclamacion"
  | "derivar"
  | "no_insolvente";
export type Profile =
  | "particular_soltero"
  | "particular_gananciales"
  | "autonomo"
  | "administrador_sociedad";
export type Variant = "individual" | "conjunta" | "autonomo";
export type Modality = "sin_masa" | "liquidacion" | "plan_pagos";

export interface TriageInput {
  debtAmount: number;
  isDefault: boolean;
  entities: string[];
  profile?: Profile;
  publicDebtAmount?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number; // gastos SIN cuotas de deudas
  housing: Housing | "";
  housingValue?: number;
  mortgagePaid?: number;
  mortgageRemaining?: number;
  isPrimaryResidence?: boolean;
  vehicle: Vehicle | "";
  vehicleValue?: number;
  vehiclePaid?: number;
  vehicleRemaining?: number;
  wantsToKeepVehicle?: boolean;
}

export interface TriageResult {
  solution: Solution;
  variant?: Variant;
  modality?: Modality;
  estimatedInstallment?: number; // €/mes plan de pagos
  warnings: string[];
  title: string;
  description: string;
  highlights: string[];
}

const USURY_ENTITIES = ["tarjetas", "microcreditos"];

const hasValuableAssets = (i: TriageInput): boolean => {
  if (i.housing === "propiedad") return true;
  if (i.vehicle === "propiedad" && (i.vehicleValue ?? 0) >= 5000) return true;
  return false;
};

export const VARIANT_LABEL: Record<Variant, string> = {
  individual: "Individual",
  conjunta: "Conjunta (gananciales)",
  autonomo: "Autónomo",
};

export const MODALITY_LABEL: Record<Modality, string> = {
  sin_masa: "Sin masa",
  liquidacion: "Con liquidación",
  plan_pagos: "Plan de pagos",
};

export const triage = (i: TriageInput): TriageResult => {
  const warnings: string[] = [];
  const debt = i.debtAmount ?? 0;
  const insolventClassic = i.isDefault || debt >= 15000;
  const hasUsury = i.entities.some((e) => USURY_ENTITIES.includes(e));

  // 1. Administrador de sociedad → derivar (STOP)
  if (i.profile === "administrador_sociedad") {
    return {
      solution: "derivar",
      warnings,
      title: "Derivar a abogado concursal",
      description:
        "Como administrador/a de sociedad, tu caso encaja con un concurso de acreedores ordinario y se deriva a un abogado especializado en concursal. No aplica LSO estándar.",
      highlights: [
        "Concurso de acreedores ordinario",
        "No aplica LSO estándar",
        "Derivación a abogado concursal",
      ],
    };
  }

  // 2. Reclamación por usura (regla de marca: al día + TAE abusiva + deuda baja)
  if (!insolventClassic && hasUsury && debt < 15000) {
    return {
      solution: "reclamacion",
      warnings,
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

  // 3. Aviso de deuda pública (no descarta)
  if ((i.publicDebtAmount ?? 0) > 10000) {
    warnings.push(
      "Deuda pública >10.000€ con un mismo organismo: la parte que exceda ese umbral (Hacienda o Seguridad Social) NO se cancela con LSO.",
    );
  }

  // 4. Solvente sin datos financieros → reunificar (fallback conservador form público)
  if (!insolventClassic && i.monthlyIncome == null) {
    return {
      solution: "reunificar",
      warnings,
      title: "Reunificación de deudas",
      description:
        "Lo más probable es negociar tus deudas de forma extrajudicial para bajar la cuota y el total que debes, sin pedir un préstamo nuevo. Lo confirmamos en tu análisis gratuito.",
      highlights: [
        "Negociación extrajudicial (no es un préstamo nuevo)",
        "Baja la cuota y el total que debes",
        "Una sola gestión con tus acreedores",
      ],
    };
  }

  // 5. Insolvente con activos pagados de valor → reunificar (proteger patrimonio)
  if (insolventClassic && hasValuableAssets(i)) {
    return {
      solution: "reunificar",
      warnings,
      title: "Reunificación de deudas",
      description:
        "Como tienes bienes pagados que conviene proteger, lo más probable es negociar tus deudas de forma extrajudicial para bajar la cuota y el total, sin pedir un préstamo nuevo ni poner en riesgo tu patrimonio.",
      highlights: [
        "Negociación extrajudicial (no es un préstamo nuevo)",
        "Baja la cuota y el total que debes",
        "Protege tu vivienda o vehículo pagado",
      ],
    };
  }

  // 6. Variant + umbral según perfil
  const variant: Variant =
    i.profile === "autonomo"
      ? "autonomo"
      : i.profile === "particular_gananciales"
        ? "conjunta"
        : "individual";
  const incomeThreshold = variant === "conjunta" ? 3000 : 1700;

  // 7. Modalidad
  const income = i.monthlyIncome;
  const expenses = i.monthlyExpenses;
  let modality: Modality;

  const modalityByAssets = (): Modality => {
    if (
      i.housing === "hipoteca" &&
      (i.housingValue ?? 0) - (i.mortgageRemaining ?? 0) > 0 &&
      i.isPrimaryResidence
    ) {
      return "plan_pagos";
    }
    if (
      i.vehicle === "financiado" &&
      (i.vehicleValue ?? 0) - (i.vehicleRemaining ?? 0) > 0
    ) {
      return i.wantsToKeepVehicle ? "plan_pagos" : "liquidacion";
    }
    return "sin_masa";
  };

  if (
    income != null &&
    income > 0 &&
    income >= incomeThreshold &&
    expenses != null
  ) {
    const ratio = expenses / income;
    if (ratio > 0.75) {
      modality = "plan_pagos";
    } else if (ratio >= 0.5) {
      modality = "plan_pagos";
      warnings.push(
        "Zona gris (gastos entre 50–75% de ingresos): confirmar viabilidad con el abogado.",
      );
    } else {
      return {
        solution: "no_insolvente",
        warnings,
        title: "No insolvente",
        description:
          "Con este nivel de ingresos frente a gastos, no encaja en insolvencia real. Valorar reunificación o reclamación por usura si aplica.",
        highlights: [
          "Capacidad de pago suficiente",
          "Fuera del criterio de insolvencia LSO",
        ],
      };
    }
  } else {
    modality = modalityByAssets();
  }

  const estimatedInstallment =
    modality === "plan_pagos" && income != null && expenses != null
      ? Math.max(0, Math.round((income - expenses) / 10) * 10)
      : undefined;

  const modalityHighlight: Record<Modality, string> = {
    sin_masa: "Sin masa: proceso rápido y directo, sin bienes que liquidar",
    liquidacion: "Con liquidación: se liquida el bien financiado sin equity",
    plan_pagos: "Plan de pagos de 3 a 5 años ajustado a tu capacidad",
  };

  return {
    solution: "lso",
    variant,
    modality,
    estimatedInstallment,
    warnings,
    title: "Ley de Segunda Oportunidad",
    description:
      "Tu perfil encaja con la Ley de Segunda Oportunidad. Podemos cancelar legalmente tus deudas en la modalidad que corresponde a tu caso.",
    highlights: [
      "Cancelación legal de deudas",
      "Para situaciones de insolvencia real",
      modalityHighlight[modality],
    ],
  };
};