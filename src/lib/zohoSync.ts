// Sincronización de datos de ventas hacia Zoho CRM (módulo Leads).
// Invoca la edge function `zoho-update-lead` con el record id de Zoho
// (guardado como `external_id` en sales_leads) y los campos mapeados.
import { supabase } from "@/integrations/supabase/client";

// Mapea la situación laboral interna a las opciones del picklist de Zoho.
// Si no hay coincidencia clara, devuelve undefined (no se envía el campo).
const EMPLOYMENT_LABELS: Record<string, string> = {
  autonomo: "Autónomo",
  empleado_indefinido: "Empleado indefinido",
  empleado_temporal: "Empleado temporal",
  desempleado: "Desempleado",
  pension: "Pensionista",
  otros: "Otros",
};

export type ZohoLeadFields = Record<string, string | number>;

// Convierte un número a texto plano (Zoho tiene estos campos como tipo text).
const s = (n: number | null | undefined): string | undefined =>
  n == null || Number.isNaN(n) ? undefined : String(Math.round(n));

export interface SalesZohoInput {
  debtTotal?: number | null;
  isDefault?: boolean | null;
  entitiesCount?: number | null;
  entitiesList?: string[] | null;
  housing?: string | null;
  mortgagePaid?: number | null;
  vehicle?: string | null;
  income?: number | null;
  expenses?: number | null;
  housingPayment?: number | null;
  vehiclePayment?: number | null;
  debtsMonthlyPaying?: number | null;
  monthlyOutflow?: number | null;
  paymentCapacity?: number | null;
  affordablePayment?: number | null;
  employment?: string | null;
  solution?: string | null;
}

// Construye el objeto de campos de Zoho a partir de los datos del caso.
export function buildZohoLeadFields(input: SalesZohoInput): ZohoLeadFields {
  const out: ZohoLeadFields = {};
  const put = (k: string, v: string | number | undefined) => {
    if (v !== undefined && v !== "") out[k] = v;
  };

  const debt = s(input.debtTotal ?? undefined);
  if (debt !== undefined) out.deuda = Number(debt);
  if (input.isDefault != null) out.impago = input.isDefault ? "Sí" : "No";
  if (input.entitiesCount != null) out.entidades = input.entitiesCount;
  if (input.entitiesList?.length) put("lista_entidades", input.entitiesList.join(", "));
  put("vivienda", input.housing ?? undefined);
  const mort = s(input.mortgagePaid ?? undefined);
  if (mort !== undefined) out.importe_pagado_hipoteca = Number(mort);
  put("vehiculo", input.vehicle ?? undefined);
  put("Ingreso", s(input.income ?? undefined));
  put("gastos_mensuales", s(input.expenses ?? undefined));
  put("cuota_vivienda", s(input.housingPayment ?? undefined));
  put("cuota_veh_culo", s(input.vehiclePayment ?? undefined));
  put("cuotas_deuda_mensual", s(input.debtsMonthlyPaying ?? undefined));
  put("salidas_mensual_total", s(input.monthlyOutflow ?? undefined));
  put("capacidad_pago", s(input.paymentCapacity ?? undefined));
  put("importe_asumible", s(input.affordablePayment ?? undefined));
  if (input.employment && EMPLOYMENT_LABELS[input.employment]) {
    put("situacion_laboral", EMPLOYMENT_LABELS[input.employment]);
  }
  put("solution_recomendada", input.solution ?? undefined);
  return out;
}

// Envía los campos a Zoho. No lanza: registra el error y devuelve false para
// no bloquear el flujo local de ventas.
export async function syncLeadToZoho(
  zohoId: string | null | undefined,
  fields: ZohoLeadFields,
): Promise<boolean> {
  if (!zohoId || Object.keys(fields).length === 0) return false;
  try {
    const { data, error } = await supabase.functions.invoke("zoho-update-lead", {
      body: { zohoId, fields },
    });
    if (error || data?.success === false) {
      console.error("No se pudo sincronizar con Zoho", error ?? data);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Error al sincronizar con Zoho", e);
    return false;
  }
}