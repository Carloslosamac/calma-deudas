import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// =============================================================
// Herramienta interna de ventas: genera Diagnóstico (consecuencias
// de no actuar, miedo/dolor) y Solución (alivio + plan de acción)
// a partir del caso de una persona endeudada. Usa Lovable AI.
// =============================================================

type Housing = "propiedad" | "hipoteca" | "alquiler" | "";
type Vehicle = "propiedad" | "financiado" | "no" | "";

interface DebtEntry {
  type?: string;
  entity?: string;
  amount?: number;
}

interface GuideFields {
  debtAmount?: number;
  isDefault?: boolean;
  entities?: string[];
  debts?: DebtEntry[];
  housing?: Housing;
  housingValue?: number;
  mortgagePaid?: number;
  mortgageRemaining?: number;
  vehicle?: Vehicle;
  vehicleValue?: number;
  vehiclePaid?: number;
  vehicleRemaining?: number;
  employment?: string;
  monthlyIncome?: number;
}

// --- Triaje de marca (réplica de src/lib/seo/triage.ts) ---
const USURY_ENTITIES = ["tarjetas", "microcreditos"];

function hasValuableAssets(g: GuideFields): boolean {
  // Vivienda en propiedad sin deuda = bien de valor que bloquea la LSO.
  if (g.housing === "propiedad") return true;
  // Hipoteca con patrimonio neto positivo (valor > pendiente) también es bien de valor.
  if (
    g.housing === "hipoteca" &&
    (g.housingValue ?? 0) - (g.mortgageRemaining ?? 0) >= 20000
  ) {
    return true;
  }
  if (g.vehicle === "propiedad" && (g.vehicleValue ?? 0) >= 4000) return true;
  return false;
}

function triage(g: GuideFields): { solution: string; title: string } {
  const insolvent = !!g.isDefault || (g.debtAmount ?? 0) >= 15000;
  const hasUsury = (g.entities ?? []).some((e) => USURY_ENTITIES.includes(e));

  if (!insolvent && hasUsury && (g.debtAmount ?? 0) < 15000) {
    return { solution: "reclamacion", title: "Reclamación judicial por usura" };
  }
  if (insolvent && hasValuableAssets(g)) {
    return { solution: "reunificar", title: "Reunificación de deudas" };
  }
  if (insolvent) {
    return { solution: "lso", title: "Ley de Segunda Oportunidad" };
  }
  return { solution: "reunificar", title: "Reunificación de deudas" };
}

const SOLUTION_BRIEF: Record<string, string> = {
  lso: "Ley de Segunda Oportunidad: si hay insolvencia real y NO hay bienes de valor que proteger, se puede cancelar legalmente la deuda y empezar de cero.",
  reunificar:
    "Reunificación de deudas = negociación EXTRAJUDICIAL para bajar la cuota mensual Y el total que se debe, SIN pedir un préstamo nuevo, SIN agrupar en una hipoteca y SIN alargar plazos. NUNCA la describas como un préstamo nuevo ni como agrupar deudas.",
  reclamacion:
    "Reclamación judicial por usura: si la TAE de tarjetas revolving o microcréditos es desproporcionada, la deuda puede anularse por usura y se recupera lo pagado de más.",
};

function buildPrompt(caseText: string, g: GuideFields, t: { solution: string; title: string }): string {
  const labels: Record<string, string> = {
    prestamos: "Préstamos",
    tarjetas: "Tarjetas / revolving",
    microcreditos: "Microcréditos",
    hacienda: "Hacienda / Seguridad Social",
    hipoteca: "Hipoteca",
    otros: "Otros",
  };
  const empLabels: Record<string, string> = {
    empleado_indefinido: "Empleado/a (indefinido)",
    empleado_temporal: "Empleado/a (temporal)",
    autonomo: "Autónomo/a",
    desempleado: "Desempleado/a",
    pension: "Pensionista",
    otros: "Otros",
  };
  const debtsList = (g.debts ?? [])
    .filter((d) => d.entity || d.amount != null)
    .map(
      (d) =>
        `  - ${labels[d.type ?? ""] ?? d.type ?? "Deuda"}${
          d.entity ? ` (${d.entity})` : ""
        }: ${d.amount != null ? `${d.amount} €` : "importe sin definir"}`,
    )
    .join("\n");

  const campos = [
    g.debtAmount != null ? `Deuda total aprox: ${g.debtAmount} €` : null,
    debtsList ? `Desglose de deudas:\n${debtsList}` : null,
    g.isDefault != null ? `En impago: ${g.isDefault ? "sí" : "no"}` : null,
    g.employment ? `Situación laboral: ${empLabels[g.employment] ?? g.employment}` : null,
    g.housing === "hipoteca"
      ? `Vivienda: hipoteca (valor ~${g.housingValue ?? "?"} €, pagado ~${g.mortgagePaid ?? "?"} €, pendiente ~${g.mortgageRemaining ?? "?"} €)`
      : g.housing === "propiedad"
        ? `Vivienda: en propiedad (valor ~${g.housingValue ?? "?"} €, sin hipoteca)`
        : g.housing
          ? `Vivienda: ${g.housing}`
          : null,
    g.vehicle === "financiado"
      ? `Vehículo: financiado (valor ~${g.vehicleValue ?? "?"} €, pagado ~${g.vehiclePaid ?? "?"} €, pendiente ~${g.vehicleRemaining ?? "?"} €)`
      : g.vehicle === "propiedad"
        ? `Vehículo: en propiedad (valor ~${g.vehicleValue ?? "?"} €)`
        : g.vehicle === "no"
          ? "Vehículo: no tiene"
          : null,
    g.monthlyIncome != null ? `Ingresos mensuales aprox: ${g.monthlyIncome} €` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `Eres un consultor experto de Calma, empresa española que ayuda a personas con deudas. Trabajas para el equipo comercial.

CASO DE LA PERSONA (escrito por el comercial):
"""
${caseText}
"""

DATOS GUÍA:
${campos || "(sin datos estructurados adicionales)"}

SOLUCIÓN RECOMENDADA POR EL TRIAJE: ${t.title}
${SOLUTION_BRIEF[t.solution]}

Genera CUATRO textos en español de España:

1. diagnosis_internal (GUION INTERNO para el comercial): puntos de dolor y consecuencias REALES de NO actuar (embargos de nómina/cuentas, inclusión en ASNEF, intereses de demora que disparan la deuda, llamadas y presión de acreedores, posibles demandas/monitorios, estrés familiar). Tono directo, con argumentos y posibles objeciones a anticipar. Crea urgencia con la realidad, sin mentir ni inventar cifras.

2. diagnosis_client (TEXTO PARA ENVIAR AL CLIENTE por WhatsApp/email): mismas consecuencias pero en segunda persona ("tú"), empático pero honesto sobre la gravedad. Listo para copiar y pegar.

3. solution_internal (GUION INTERNO): cómo presentar la solución (${t.title}), el alivio que aporta, qué hacemos exactamente y los siguientes pasos. Incluye cómo conectar el dolor del diagnóstico con el alivio.

4. solution_client (TEXTO PARA ENVIAR AL CLIENTE): en segunda persona, transmite alivio y esperanza realista, explica qué podemos hacer y el siguiente paso (análisis gratuito). Listo para copiar y pegar.

REGLAS:
- No inventes datos concretos de Calma (porcentajes, número de clientes, etc.).
- Respeta estrictamente la descripción de la solución recomendada.
- Devuelve SOLO un objeto JSON válido con las claves: diagnosis_internal, diagnosis_client, solution_internal, solution_client. Sin markdown, sin texto extra.`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "Falta LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const caseText = typeof body.caseText === "string" ? body.caseText.trim() : "";
    const guide: GuideFields = (body.guide && typeof body.guide === "object") ? body.guide : {};

    if (!caseText || caseText.length < 10) {
      return new Response(JSON.stringify({ error: "Describe el caso (mínimo 10 caracteres)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const t = triage(guide);
    const prompt = buildPrompt(caseText, guide, t);

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    if (aiRes.status === 429) {
      return new Response(JSON.stringify({ error: "Límite de uso alcanzado. Inténtalo en unos momentos." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiRes.status === 402) {
      return new Response(JSON.stringify({ error: "Sin créditos de IA. Añade créditos para continuar." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiRes.ok) {
      const txt = await aiRes.text();
      return new Response(JSON.stringify({ error: "Error de la IA", detail: txt }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const content = aiData?.choices?.[0]?.message?.content ?? "{}";
    let parsed: Record<string, string> = {};
    try {
      parsed = JSON.parse(content);
    } catch (_e) {
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : {};
    }

    return new Response(
      JSON.stringify({
        triage: t,
        diagnosis_internal: parsed.diagnosis_internal ?? "",
        diagnosis_client: parsed.diagnosis_client ?? "",
        solution_internal: parsed.solution_internal ?? "",
        solution_client: parsed.solution_client ?? "",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});