/**
 * Comprobación de encaje (elegibilidad) previa al diagnóstico.
 *
 * Objetivo: antes de presentar cualquier diagnóstico o marco de urgencia, el
 * comercial confirma con la MÍNIMA información necesaria que la persona encaja
 * en la vía de alivio de deuda prevista (LSO). Si no hay soporte suficiente,
 * el guion se genera en modo prudente: sin diagnóstico definitivo y sin
 * lenguaje de miedo/urgencia.
 *
 * No redefine la lógica comercial aprobada: solo decide CUÁNDO puede
 * presentarse el diagnóstico y con qué tono.
 */
import type { Solution } from "@/lib/seo/triage";

export type EligibilityStatus = "eligible" | "insufficient" | "not_eligible";

export interface EligibilityInput {
  debtAmount?: number;
  isDefault?: boolean;
  hasPaymentSituation?: boolean; // si se ha registrado la situación de pago
  monthlyIncome?: number;
  monthlyExpenses?: number;
  solution: Solution;
}

export interface EligibilityCheck {
  status: EligibilityStatus;
  /** Datos mínimos que faltan por confirmar (etiquetas para el comercial). */
  missing: string[];
  title: string;
  reason: string;
  /** Qué debe hacer el comercial ahora. */
  guidance: string;
  /** true si se puede presentar un diagnóstico definitivo. */
  canDiagnose: boolean;
}

const num = (v?: number) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

export function checkEligibility(i: EligibilityInput): EligibilityCheck {
  const missing: string[] = [];
  const debt = num(i.debtAmount);
  if (!debt || debt <= 0) missing.push("Deuda total");
  if (!i.hasPaymentSituation && i.isDefault == null) missing.push("Situación de pago (al corriente / impago)");
  if (num(i.monthlyIncome) === undefined) missing.push("Ingresos mensuales");
  if (num(i.monthlyExpenses) === undefined) missing.push("Gastos mensuales");

  if (missing.length) {
    return {
      status: "insufficient",
      missing,
      title: "Falta información para confirmar el encaje",
      reason:
        "Todavía no hay datos suficientes para saber si la persona encaja en la Ley de Segunda Oportunidad.",
      guidance:
        "Pregunta solo por lo que falta y confírmalo antes de dar ningún diagnóstico. Mientras tanto, no adelantes consecuencias ni plazos.",
      canDiagnose: false,
    };
  }

  if (i.solution === "no_insolvente") {
    return {
      status: "not_eligible",
      missing,
      title: "No encaja hoy en la vía de alivio de deuda",
      reason:
        "Con los ingresos y gastos declarados la persona no aparece como insolvente, así que no procede plantear un diagnóstico de cancelación.",
      guidance:
        "Explícalo con transparencia y sin dramatizar: revisa si hay gastos o deudas no contabilizados y, si sigue igual, cierra la llamada ofreciendo revisión futura.",
      canDiagnose: false,
    };
  }

  if (i.solution === "derivar") {
    return {
      status: "not_eligible",
      missing,
      title: "Caso a derivar, no procede diagnóstico comercial",
      reason:
        "El perfil requiere un procedimiento concursal ordinario y se deriva a abogado especializado.",
      guidance:
        "No presentes diagnóstico ni urgencia: informa de la derivación y recoge los datos de contacto.",
      canDiagnose: false,
    };
  }

  return {
    status: "eligible",
    missing,
    title: "Encaje confirmado",
    reason: "Los datos mínimos confirman que la persona encaja en la vía prevista.",
    guidance: "Puedes continuar con la conversación comercial aprobada.",
    canDiagnose: true,
  };
}
