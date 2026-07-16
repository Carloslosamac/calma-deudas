import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zoho EU data center
const ACCOUNTS_DOMAIN = "https://accounts.zoho.eu";
const API_DOMAIN = "https://www.zohoapis.eu";

interface FormData {
  debt_amount?: string;
  loan_number?: string;
  default?: string;
  fullName: string;
  email: string;
  phone: string;
  entities?: string[];
  housing?: string | null;
  mortgage_paid?: string | null;
  vehicle?: string | null;
  vehicle_value?: string | null;
  vehicle_paid?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  page?: string | null;
}

interface RetryRequest {
  submissionId: string;
}

type RequestBody = FormData | RetryRequest;

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

// Exchange the one-time grant token for a permanent refresh token (+ first access token)
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody: RequestBody = await req.json();

    // Modo reintento: si viene submissionId, releemos el payload guardado.
    let formData: FormData;
    let submissionId: string | null = null;
    let isRetry = false;

    if ("submissionId" in rawBody && rawBody.submissionId) {
      isRetry = true;
      submissionId = rawBody.submissionId;
      const { data: sub, error: subErr } = await supabase
        .from("web_submissions")
        .select("payload")
        .eq("id", submissionId)
        .maybeSingle();
      if (subErr || !sub) {
        throw new Error(`Submission ${submissionId} no encontrada`);
      }
      formData = sub.payload as FormData;
    } else {
      formData = rawBody as FormData;
    }

    console.log("zoho-lead invoked", { ...formData, phone: "***", email: "***" });

    if (!formData.fullName || !formData.email || !formData.phone) {
      throw new Error("Missing required fields: fullName, email, or phone");
    }
    if (
      formData.fullName.length > 100 ||
      formData.email.length > 255 ||
      formData.phone.length > 30
    ) {
      throw new Error("Input exceeds maximum length");
    }

    // Persistimos la submission ANTES de tocar Zoho, para no perder el lead
    // aunque Zoho falle. En reintento reutilizamos la fila existente.
    const userAgent = req.headers.get("user-agent");
    if (!isRetry) {
      const debtNumeric = parseInt(formData.debt_amount ?? "0") || null;
      const { data: created, error: insErr } = await supabase
        .from("web_submissions")
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          debt_amount: debtNumeric,
          entities: formData.entities ?? null,
          payload: formData as unknown as Record<string, unknown>,
          page: formData.page ?? null,
          utm_source: formData.utm_source ?? null,
          utm_medium: formData.utm_medium ?? null,
          utm_campaign: formData.utm_campaign ?? null,
          utm_term: formData.utm_term ?? null,
          utm_content: formData.utm_content ?? null,
          user_agent: userAgent,
          zoho_status: "pending",
        })
        .select("id")
        .single();
      if (insErr) {
        console.error("Failed to persist web submission:", insErr);
      } else {
        submissionId = created.id;
      }
    } else if (submissionId) {
      await supabase
        .from("web_submissions")
        .update({
          zoho_status: "pending",
          zoho_error: null,
          retry_count: (
            await supabase
              .from("web_submissions")
              .select("retry_count")
              .eq("id", submissionId)
              .maybeSingle()
          ).data?.retry_count != null
            ? ((await supabase
                .from("web_submissions")
                .select("retry_count")
                .eq("id", submissionId)
                .maybeSingle()).data!.retry_count as number) + 1
            : 1,
        })
        .eq("id", submissionId);
    }

    const name = formData.fullName.trim();
    const [firstName, ...rest] = name.split(" ");
    const lastName = rest.join(" ").trim() || firstName;

    const debtAmount = parseInt(formData.debt_amount ?? "0") || 0;
    const inDefault = formData.default === "si";
    const numEntities =
      formData.entities?.length || parseInt(formData.loan_number ?? "") || null;
    const mortgagePaid = formData.mortgage_paid
      ? parseInt(String(formData.mortgage_paid).replace(/[^\d]/g, "")) || null
      : null;

    // Map each UTM to its own dedicated Zoho field.
    const clip = (v?: string | null) => (v ? String(v).slice(0, 255) : null);
    const sourceValue = clip(formData.utm_source) ?? "Calma Web";
    const mediumValue = clip(formData.utm_medium);
    const campaignValue = clip(formData.utm_campaign);
    const contentValue = clip(formData.utm_content);
    const pageValue = clip(formData.page);

    // Extra detail that has no dedicated custom field goes to Description.
    const descriptionLines = [
      formData.utm_term ? `utm_term: ${formData.utm_term}` : null,
      formData.vehicle_value ? `Valor vehículo: ${formData.vehicle_value}` : null,
      formData.vehicle_paid ? `Vehículo pagado: ${formData.vehicle_paid}` : null,
    ].filter(Boolean);

    const leadRecord: Record<string, unknown> = {
      // Standard fields
      Last_Name: lastName,
      First_Name: firstName,
      Email: formData.email.trim().toLowerCase(),
      Phone: formData.phone.trim(),
      Company: name,
      Fuente: "Calma Web",
      // Clasificación fija para todos los leads entrantes desde la web
      Industry: "Cualificados",
      Lead_Status: "Sin contactar",
      // UTM tracking (each in its own field)
      Source: sourceValue,
      medium: mediumValue,
      campaign: campaignValue,
      content: contentValue,
      Page: pageValue,
      // Custom fields mapped from the form
      deuda: debtAmount,
      impago: inDefault ? "Sí" : "No",
      entidades: numEntities,
      lista_entidades: formData.entities?.length ? formData.entities.join(", ") : null,
      vivienda: formData.housing ?? null,
      importe_pagado_hipoteca: mortgagePaid,
      vehiculo: formData.vehicle ?? null,
      Description: descriptionLines.length ? descriptionLines.join("\n") : undefined,
    };

    // Remove null/undefined so Zoho doesn't reject empty optional fields.
    Object.keys(leadRecord).forEach((k) => {
      if (leadRecord[k] === null || leadRecord[k] === undefined) delete leadRecord[k];
    });

    const accessToken = await getAccessToken();

    let leadId: string | undefined;
    try {
      const res = await fetch(`${API_DOMAIN}/crm/v2/Leads`, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: [leadRecord], trigger: ["workflow"] }),
    });
      const json = await res.json();
      if (!res.ok || json.data?.[0]?.status === "error") {
        console.error("Zoho Leads API error:", JSON.stringify(json));
        throw new Error(`Zoho: ${JSON.stringify(json)}`);
      }
      leadId = json.data?.[0]?.details?.id;
      console.log("Zoho lead created:", leadId);
    } catch (zohoErr) {
      // Marcamos la submission como error, pero NO tiramos: preferimos devolver
      // 200 al cliente con submissionId para que el usuario no pierda el flujo,
      // y que el admin la vea en el panel y pueda reintentarla.
      const msg = zohoErr instanceof Error ? zohoErr.message : String(zohoErr);
      if (submissionId) {
        await supabase
          .from("web_submissions")
          .update({ zoho_status: "error", zoho_error: msg.slice(0, 2000) })
          .eq("id", submissionId);
      }
      return new Response(
        JSON.stringify({
          success: false,
          submissionId,
          error: "No se pudo crear el lead en el CRM, pero tu solicitud está guardada",
          details: msg,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
      );
    }

    if (submissionId) {
      await supabase
        .from("web_submissions")
        .update({ zoho_status: "ok", zoho_lead_id: leadId ?? null, zoho_error: null })
        .eq("id", submissionId);
    }

    return new Response(
      JSON.stringify({ success: true, leadId, submissionId, message: "Lead created in Zoho CRM" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (error) {
    console.error("Error in zoho-lead function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 },
    );
  }
});