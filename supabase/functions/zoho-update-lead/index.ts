import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zoho EU data center
const ACCOUNTS_DOMAIN = "https://accounts.zoho.eu";
const API_DOMAIN = "https://www.zohoapis.eu";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const CLIENT_ID = Deno.env.get("ZOHO_CLIENT_ID")!;
const CLIENT_SECRET = Deno.env.get("ZOHO_CLIENT_SECRET")!;
const GRANT_TOKEN = Deno.env.get("ZOHO_GRANT_TOKEN");

async function getStoredRefreshToken(): Promise<string | null> {
  const { data } = await supabase
    .from("zoho_tokens")
    .select("refresh_token")
    .eq("id", 1)
    .maybeSingle();
  return data?.refresh_token ?? null;
}

async function storeRefreshToken(refreshToken: string): Promise<void> {
  await supabase
    .from("zoho_tokens")
    .upsert({ id: 1, refresh_token: refreshToken, updated_at: new Date().toISOString() });
}

async function exchangeGrantToken(): Promise<string> {
  if (!GRANT_TOKEN) {
    throw new Error("No refresh token stored and ZOHO_GRANT_TOKEN is missing");
  }
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: GRANT_TOKEN,
  });
  const res = await fetch(`${ACCOUNTS_DOMAIN}/oauth/v2/token?${params.toString()}`, {
    method: "POST",
  });
  const json = await res.json();
  if (!res.ok || json.error) {
    throw new Error(`Grant token exchange failed: ${JSON.stringify(json)}`);
  }
  if (!json.refresh_token) {
    throw new Error(`No refresh_token in response: ${JSON.stringify(json)}`);
  }
  await storeRefreshToken(json.refresh_token);
  return json.access_token as string;
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: refreshToken,
  });
  const res = await fetch(`${ACCOUNTS_DOMAIN}/oauth/v2/token?${params.toString()}`, {
    method: "POST",
  });
  const json = await res.json();
  if (!res.ok || json.error || !json.access_token) {
    throw new Error(`Access token refresh failed: ${JSON.stringify(json)}`);
  }
  return json.access_token as string;
}

async function getAccessToken(): Promise<string> {
  const stored = await getStoredRefreshToken();
  if (stored) {
    return await refreshAccessToken(stored);
  }
  return await exchangeGrantToken();
}

// Campos de Zoho que aceptamos actualizar desde la herramienta de ventas.
// (allowlist para evitar escrituras accidentales en campos no previstos)
const ALLOWED_FIELDS = new Set<string>([
  "Lead_Status",
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
    const zohoId = String(body.zohoId ?? "").trim();
    const rawFields = (body.fields ?? {}) as Record<string, unknown>;

    if (!/^\d+$/.test(zohoId)) {
      throw new Error("Invalid or missing zohoId");
    }

    // Filtra a la allowlist y descarta nulos/vacíos.
    const fields: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(rawFields)) {
      if (!ALLOWED_FIELDS.has(k)) continue;
      if (v === null || v === undefined || v === "") continue;
      fields[k] = v;
    }

    if (Object.keys(fields).length === 0) {
      return new Response(
        JSON.stringify({ success: true, skipped: true, message: "No fields to update" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
      );
    }

    const accessToken = await getAccessToken();

    const res = await fetch(`${API_DOMAIN}/crm/v2/Leads/${zohoId}`, {
      method: "PUT",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [fields], trigger: ["workflow"] }),
    });
    const json = await res.json();

    if (!res.ok || json.data?.[0]?.status === "error") {
      console.error("Zoho Leads update error:", JSON.stringify(json));
      throw new Error(`Failed to update lead in Zoho: ${JSON.stringify(json)}`);
    }

    console.log("Zoho lead updated:", zohoId, Object.keys(fields).join(","));

    return new Response(
      JSON.stringify({ success: true, id: zohoId, message: "Lead updated in Zoho CRM" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
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