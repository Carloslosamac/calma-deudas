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

// Nivel de engagement: 0 = listísimo para contratar/pagar ya,
// 3 = quiere colgar / librarse de la llamada cuanto antes.
const ENGAGEMENT_GUIDE: Record<number, string> = {
  0: "ENGAGEMENT 0 (LISTÍSIMO – quiere empezar/pagar ya): NO satures de dolor. Sé directo y breve, confirma que es la decisión correcta y ve al cierre y al siguiente paso de inmediato. Tono seguro y resolutivo.",
  1: "ENGAGEMENT 1 (MUY INTERESADO/A): Refuerza el valor y resuelve dudas con seguridad. Algo de urgencia, cierre suave pero firme. Mensajes claros y motivadores.",
  2: "ENGAGEMENT 2 (DUDOSO/A): Aplica un diagnóstico MÁS DURO. Todo tiene que sonar URGENTE: el tiempo juega en su contra, cada día que pasa empeora su situación (intereses, embargos, demandas más cerca). Rompe la duda con consecuencias concretas e inmediatas, deja claro que esperar es la peor decisión. Empatía mínima, urgencia máxima.",
  3: "ENGAGEMENT 3 (QUIERE LIBRARSE DE LA LLAMADA): Sé TOTALMENTE TAJANTE. Plantéalo como un punto de no retorno: o asume la responsabilidad de actuar AHORA, o lo da todo por perdido y las consecuencias caerán enteras sobre ella (embargos, deuda creciendo, sin salida). Mensajes cortos, directos y sin rodeos, sin suavizar. Confronta la evasión: no actuar es elegir perderlo todo.",
};

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
  lso: "Ley de Segunda Oportunidad: si hay insolvencia real y NO hay bienes de valor que proteger, se puede CANCELAR LEGALMENTE la deuda y empezar de cero.",
  reunificar:
    "Reunificación de deudas = negociación EXTRAJUDICIAL para bajar la cuota mensual Y el total que se debe, SIN pedir un préstamo nuevo, SIN agrupar en una hipoteca y SIN alargar plazos. NUNCA la describas como un préstamo nuevo ni como agrupar deudas.",
  reclamacion:
    "Reclamación judicial por usura: si la TAE de tarjetas revolving o microcréditos es desproporcionada, la deuda puede anularse por usura y se recupera lo pagado de más.",
};

// Beneficios concretos que la IA DEBE aterrizar con los datos reales del caso.
const SOLUTION_BENEFITS: Record<string, string> = {
  lso: "Beneficios a aterrizar con los datos del caso: (1) los X € exactos de deuda quedan CANCELADOS por sentencia judicial; (2) dejas de pagar las cuotas mensuales que hoy te ahogan; (3) se PARA el embargo sobre la nómina/ingresos indicados y sobre tus cuentas; (4) SALES de ASNEF y recuperas acceso al crédito; (5) se acaban las llamadas y la presión de [entidades concretas del caso]. Nombra los importes y entidades reales, no hables en abstracto.",
  reunificar:
    "Beneficios a aterrizar con los datos del caso: (1) BAJA la cuota mensual que hoy pagas y el TOTAL que debes, mediante negociación extrajudicial con [entidades concretas]; (2) pasas de lidiar con N acreedores a una sola gestión que llevamos nosotros; (3) frenas el deterioro (intereses de demora, ASNEF, embargos) que crece cada mes sobre los X € de deuda; (4) conservas tu vivienda/vehículo. Nunca lo describas como préstamo nuevo, agrupar ni alargar plazos.",
  reclamacion:
    "Beneficios a aterrizar con los datos del caso: (1) se ANULA la deuda usuraria de [entidad concreta] por TAE abusiva; (2) recuperas el dinero pagado de más en intereses desproporcionados; (3) se detiene el cobro y la presión de esa entidad. Cita la entidad y el importe reales del caso.",
};

const TYPE_LABELS: Record<string, string> = {
  prestamos: "Préstamos",
  tarjetas: "Tarjetas / revolving",
  microcreditos: "Microcréditos",
  hacienda: "Hacienda / Seguridad Social",
  hipoteca: "Hipoteca",
  otros: "Otros",
};

const EMP_LABELS: Record<string, string> = {
  empleado_indefinido: "Empleado/a (indefinido)",
  empleado_temporal: "Empleado/a (temporal)",
  autonomo: "Autónomo/a",
  desempleado: "Desempleado/a",
  pension: "Pensionista",
  otros: "Otros",
};

// Bloque de datos estructurados del caso, reutilizable en TODOS los prompts.
function buildCaseData(g: GuideFields): string {
  const debtsList = (g.debts ?? [])
    .filter((d) => d.entity || d.amount != null)
    .map(
      (d) =>
        `  - ${TYPE_LABELS[d.type ?? ""] ?? d.type ?? "Deuda"}${
          d.entity ? ` (${d.entity})` : ""
        }: ${d.amount != null ? `${d.amount} €` : "importe sin definir"}`,
    )
    .join("\n");

  const campos = [
    g.debtAmount != null ? `Deuda total aprox: ${g.debtAmount} €` : null,
    debtsList ? `Desglose de deudas:\n${debtsList}` : null,
    g.isDefault != null ? `En impago: ${g.isDefault ? "sí" : "no"}` : null,
    g.employment ? `Situación laboral: ${EMP_LABELS[g.employment] ?? g.employment}` : null,
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

  return campos || "(sin datos estructurados adicionales)";
}

// Regla común anti-relleno para todos los prompts.
const ANTI_VAGUE_RULE =
  "REGLA ANTIVAGUEDAD (OBLIGATORIA): cada afirmación debe apoyarse en un DATO REAL del caso (importe, entidad, cuota, nómina, vivienda/vehículo) o en un argumento concreto y accionable. PROHIBIDO el relleno administrativo y las frases de catálogo ('estamos para ayudarte', 'tranquilidad', 'empezar de cero', 'situación complicada', 'cuanto antes mejor') si no van seguidas de un dato o consecuencia concreta. Habla como un cierre comercial afilado, no como un folleto. Nombra las entidades y cifras del caso siempre que existan.";

function buildPrompt(
  caseText: string,
  g: GuideFields,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
): string {
  const campos = buildCaseData(g);

  return `Eres el MEJOR closer de ventas de Calma, empresa española que ayuda a personas con deudas. Trabajas para el equipo comercial y tu trabajo es darle munición CONCRETA para cerrar, no rellenar fichas.

CASO DE LA PERSONA (escrito por el comercial):
"""
${caseText}
"""

DATOS GUÍA:
${campos}

SOLUCIÓN RECOMENDADA POR EL TRIAJE: ${t.title}
${SOLUTION_BRIEF[t.solution]}
${SOLUTION_BENEFITS[t.solution] ?? ""}

NIVEL DE ENGAGEMENT DE LA PERSONA (cómo de lista está para empezar el proceso):
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
Adapta la INTENSIDAD del discurso (más fuerte o más suave), la longitud y el número de tarjetas a este nivel de engagement. El siguiente paso debe estar preparado en función de él.
${reactionsBlock(reactions)}

Genera CINCO salidas en español de España:

1. diagnosis_internal (GUION INTERNO para el comercial, en formato de TARJETAS): un ARRAY de 3 a 5 objetos { "emoji": string, "title": string, "body": string }. Cada tarjeta es UNA consecuencia REAL de NO actuar, ANCLADA en un dato del caso (ej.: "Embargo sobre tu nómina indicada", "Los X € de [entidad] generan intereses de demora cada mes", inclusión en ASNEF, demandas/monitorios de [entidad], presión telefónica). El "title" es corto y contundente y cita el dato. El "body" es el argumento para el comercial CON la objeción a anticipar y cómo rebatirla. Nada genérico: usa importes y entidades reales del caso.

2. diagnosis_client (TEXTO PARA ENVIAR AL CLIENTE por WhatsApp/email): un string en segunda persona ("tú") que menciona el importe total y/o las entidades reales del caso y la consecuencia concreta sobre SU situación. Honesto sobre la gravedad, sin frases de catálogo. Listo para copiar y pegar.

3. solution_internal (GUION INTERNO en formato de TARJETAS): un ARRAY de 3 a 5 objetos { "emoji", "title", "body" }. Cada tarjeta es UN BENEFICIO CONCRETO de la solución (${t.title}) aterrizado en los datos del caso (importes, entidades, cuota, nómina, vivienda/vehículo) y conectado con el dolor exacto del diagnóstico ("dejas de deber los X € a [entidad]", "tu nómina de Y € queda a salvo del embargo"). Incluye qué hace Calma exactamente y el siguiente paso. Emojis de alivio/acción (✅ 🛡️ 🤝 💸 📋 🚀). Cero promesas vagas.

4. solution_client (TEXTO PARA ENVIAR AL CLIENTE): un string en segunda persona que cita el importe total y/o las entidades del caso y describe el resultado CONCRETO en su situación, además del siguiente paso (análisis gratuito). Esperanza realista anclada en datos, no en clichés. Listo para copiar y pegar.

5. approach (string, máx 3 frases): instrucción TÁCTICA y concreta para el comercial: qué frase exacta decir para abrir el siguiente paso, qué objeción anticipar según las reacciones marcadas y cómo rebatirla, y qué pedir explícitamente. Nada de consejos genéricos de tono.

REGLAS:
- No inventes datos concretos de Calma (porcentajes, número de clientes, resultados garantizados). Los importes que uses son los del caso, no inventados.
- Respeta estrictamente la descripción de la solución recomendada (reunificar NUNCA es préstamo/agrupar/alargar).
- ${ANTI_VAGUE_RULE}
- Devuelve SOLO un objeto JSON válido con las claves: diagnosis_internal (array de tarjetas), diagnosis_client (string), solution_internal (array de tarjetas), solution_client (string), approach (string). Sin markdown, sin texto extra.`;
}

function reactionsBlock(reactions: string[]): string {
  if (!reactions.length) return "";
  const list = reactions.map((r) => `  - «${r}»`).join("\n");
  return `\nFRASES TEXTUALES DE LA PERSONA EN LA FASE ANTERIOR (úsalas para afinar el tono, anticipar y rebatir sus objeciones concretas, y conectar con lo que ha dicho; respeta el nivel de engagement):\n${list}\n`;
}

// Prompt para el guion de cierre de la FIRMA del contrato online.
function buildSigningPrompt(
  caseText: string,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
): string {
  return `Eres un consultor experto de Calma, empresa española que ayuda a personas con deudas. Trabajas para el equipo comercial y estás en la FASE FINAL de la llamada: conseguir que la persona FIRME EL CONTRATO ONLINE ahora mismo.

CASO DE LA PERSONA:
"""
${caseText}
"""

SERVICIO CONTRATADO: ${t.title}

NIVEL DE ENGAGEMENT:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${reactionsBlock(reactions)}

Genera el guion de cierre para conseguir la firma. Devuelve SOLO un objeto JSON válido con estas claves:

1. signing_internal: ARRAY de 3 a 5 objetos { "emoji": string, "title": string, "body": string }. GUION INTERNO para el comercial: cómo guiar paso a paso a la persona a firmar online en la propia llamada, cómo crear urgencia sana, cómo rebatir las objeciones de último momento típicas ("me lo pienso", "lo consulto con mi pareja", "mándamelo y ya te digo", "no sé si es buen momento") y cómo confirmar la firma. Adapta la intensidad al engagement.
2. signing_client: STRING. Mensaje claro y sencillo para enviar al cliente con las instrucciones para firmar el contrato en línea (qué va a recibir, cómo firmarlo y por qué hacerlo ya). Listo para copiar y pegar, en segunda persona y tono cercano.

Sin markdown, sin texto extra.`;
}

// Prompt para el mensaje de acompañamiento al ENVIAR el contrato.
function buildContractMessagePrompt(
  caseText: string,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
): string {
  return `Eres un consultor de Calma. Acabas de cerrar verbalmente con la persona y vas a ENVIARLE el contrato del servicio "${t.title}" para que lo firme online.

CASO DE LA PERSONA:
"""
${caseText}
"""

NIVEL DE ENGAGEMENT:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${reactionsBlock(reactions)}

Devuelve SOLO un objeto JSON válido con la clave:
- contract_message: STRING. Mensaje breve, cálido y profesional para WhatsApp/email que acompaña el envío del contrato, reafirma la buena decisión y empuja con naturalidad a firmarlo cuanto antes. Segunda persona, listo para copiar y pegar. Sin markdown.`;
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
    const engagement = (() => {
      const n = Number(body.engagement);
      return Number.isFinite(n) && n >= 0 && n <= 3 ? Math.round(n) : 1;
    })();
    const reactions: string[] = Array.isArray(body.reactions)
      ? body.reactions
          .filter((r: unknown) => typeof r === "string")
          .map((r: string) => r.trim())
          .filter((r: string) => r.length > 0)
          .slice(0, 12)
      : [];
    const phase = typeof body.phase === "string" ? body.phase : "";

    if (!caseText || caseText.length < 10) {
      return new Response(JSON.stringify({ error: "Describe el caso (mínimo 10 caracteres)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const t = triage(guide);
    const prompt =
      phase === "signing"
        ? buildSigningPrompt(caseText, t, engagement, reactions)
        : phase === "contract_message"
          ? buildContractMessagePrompt(caseText, t, engagement, reactions)
          : buildPrompt(caseText, guide, t, engagement, reactions);

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
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(content);
    } catch (_e) {
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : {};
    }

    const asCards = (v: unknown) =>
      Array.isArray(v)
        ? v
            .filter((c) => c && typeof c === "object")
            .map((c) => ({
              emoji: String((c as Record<string, unknown>).emoji ?? "•"),
              title: String((c as Record<string, unknown>).title ?? ""),
              body: String((c as Record<string, unknown>).body ?? ""),
            }))
        : [];
    const asText = (v: unknown) => (typeof v === "string" ? v : "");

    if (phase === "signing") {
      return new Response(
        JSON.stringify({
          triage: t,
          engagement,
          signing_internal: asCards(parsed.signing_internal),
          signing_client: asText(parsed.signing_client),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (phase === "contract_message") {
      return new Response(
        JSON.stringify({
          triage: t,
          engagement,
          contract_message: asText(parsed.contract_message),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        triage: t,
        engagement,
        diagnosis_internal: asCards(parsed.diagnosis_internal),
        diagnosis_client: asText(parsed.diagnosis_client),
        solution_internal: asCards(parsed.solution_internal),
        solution_client: asText(parsed.solution_client),
        approach: asText(parsed.approach),
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