// Auditoría de campos con Zoho CRM: devuelve el valor actual de un lead y los
// metadatos (tipo, opciones de picklist) de los campos que sincronizamos.
// Solo administradores.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { zohoFetch } from "../_shared/zoho-auth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TRACKED = [
  "Lead_Status", "Fecha_hora_cita", "deuda", "impago", "entidades", "lista_entidades",
  "vivienda", "importe_pagado_hipoteca", "vehiculo", "Ingreso", "gastos_mensuales",
  "cuota_vivienda", "cuota_veh_culo", "cuotas_deuda_mensual", "salidas_mensual_total",
  "capacidad_pago", "importe_asumible", "situacion_laboral", "solution_recomendada",
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: claims } = await supabase.auth.getClaims(authHeader.replace("Bearer ", ""));
    const userId = claims?.claims?.sub;
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const zohoId = String(body.zohoId ?? "").replace(/\D/g, "");

    const metaRes = await zohoFetch("/crm/v2/settings/fields?module=Leads", { method: "GET" });
    const meta = await metaRes.json().catch(() => ({}));
    const fields = (meta.fields ?? [])
      .filter((f: Record<string, unknown>) => TRACKED.includes(String(f.api_name)))
      .map((f: Record<string, unknown>) => ({
        api_name: f.api_name,
        data_type: f.data_type,
        length: f.length,
        picklist: (f.pick_list_values as { display_value: string }[] | undefined)?.map(
          (p) => p.display_value,
        ),
      }));

    let record: Record<string, unknown> | null = null;
    if (/^\d+$/.test(zohoId)) {
      const recRes = await zohoFetch(
        `/crm/v2/Leads/${zohoId}?fields=${encodeURIComponent(TRACKED.join(","))}`,
        { method: "GET" },
      );
      const rec = await recRes.json().catch(() => ({}));
      record = rec.data?.[0] ?? null;
    }

    return new Response(JSON.stringify({ success: true, fields, record }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
