import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { zohoFetch } from "../_shared/zoho-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Campos de Zoho que aceptamos actualizar desde la herramienta de ventas.
// (allowlist para evitar escrituras accidentales en campos no previstos)
const ALLOWED_FIELDS = new Set<string>([
  "Lead_Status",
  "Fecha_hora_cita",
  "deuda",
  "impago",
  "entidades",
  "lista_entidades",
  "vivienda",
  "importe_pagado_hipoteca",
  "vehiculo",
  "Ingreso",
  "gastos_mensuales",
  "cuota_vivienda",
  "cuota_veh_culo",
  "cuotas_deuda_mensual",
  "salidas_mensual_total",
  "capacidad_pago",
  "importe_asumible",
  "situacion_laboral",
  "solution_recomendada",
]);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    // Los external_id importados del CSV de Zoho llevan el prefijo `zcrm_`.
    // Extraemos solo la parte numérica que espera la API de Zoho.
    const zohoId = String(body.zohoId ?? "").replace(/\D/g, "");
    const rawFields = (body.fields ?? {}) as Record<string, unknown>;

    if (!/^\d+$/.test(zohoId)) {
      throw new Error("Invalid or missing zohoId");
    }

    // Filtra a la allowlist. `null` es intencional: vacía el campo en Zoho.
    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rawFields)) {
      if (!ALLOWED_FIELDS.has(k)) continue;
      if (v === undefined || v === "") continue;
      fields[k] = v;
    }

    if (Object.keys(fields).length === 0) {
      return new Response(
        JSON.stringify({ success: true, skipped: true, message: "No fields to update" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
      );
    }

    // Zoho rechaza la actualización COMPLETA si un solo campo no le encaja
    // (p. ej. un valor fuera del picklist). Reintentamos descartando el campo
    // conflictivo para que el resto de datos sí lleguen al CRM.
    const skipped: { field: string; reason: string }[] = [];
    let payload = { ...fields };
    let json: Record<string, unknown> = {};

    for (let attempt = 0; attempt < 4; attempt++) {
      if (Object.keys(payload).length === 0) break;
      const res = await zohoFetch(`/crm/v2/Leads/${zohoId}`, {
        method: "PUT",
        body: JSON.stringify({ data: [payload], trigger: ["workflow"] }),
      });
      json = await res.json().catch(() => ({}));
      const row = (json as { data?: { status?: string; code?: string; message?: string; details?: { api_name?: string } }[] }).data?.[0];
      if (res.ok && row?.status !== "error") {
        console.log("Zoho lead updated:", zohoId, Object.keys(payload).join(","));
        return new Response(
          JSON.stringify({
            success: true,
            id: zohoId,
            updated: Object.keys(payload),
            skipped,
            message: "Lead updated in Zoho CRM",
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
        );
      }
      const badField = row?.details?.api_name;
      console.error("Zoho Leads update error:", JSON.stringify(json));
      if (badField && badField in payload) {
        skipped.push({ field: badField, reason: row?.message ?? row?.code ?? "rechazado por Zoho" });
        delete payload[badField];
        continue;
      }
      break;
    }

    throw new Error(`Failed to update lead in Zoho: ${JSON.stringify(json)}`);
  } catch (error) {
    console.error("Error in zoho-update-lead function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});