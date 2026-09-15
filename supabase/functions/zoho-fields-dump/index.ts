// Temporal: lista los campos del módulo Leads de Zoho para mapear nombres de API.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { zohoFetch } from "../_shared/zoho-auth.ts";

serve(async () => {
  try {
    const res = await zohoFetch("/crm/v2/settings/fields?module=Leads", { method: "GET" });
    const json = await res.json();
    const fields = (json.fields ?? []).map((f: Record<string, unknown>) => ({
      api_name: f.api_name,
      label: f.field_label,
      type: f.data_type,
    }));
    return new Response(JSON.stringify({ count: fields.length, fields }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
});
