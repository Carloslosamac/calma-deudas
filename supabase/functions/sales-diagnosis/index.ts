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

// --- Análisis de embargabilidad real (art. 607 LEC) ---
// SMI mensual de referencia para embargos (14 pagas). Ajustar si cambia el SMI.
const SMI_MENSUAL = 1184;

// Tramos del art. 607 LEC sobre la parte que supera el SMI.
const EMBARGO_TRAMOS: { hasta: number; pct: number }[] = [
  { hasta: 2, pct: 0.3 }, // de 1 a 2 SMI -> 30%
  { hasta: 3, pct: 0.5 }, // de 2 a 3 SMI -> 50%
  { hasta: 4, pct: 0.6 }, // de 3 a 4 SMI -> 60%
  { hasta: 5, pct: 0.75 }, // de 4 a 5 SMI -> 75%
  { hasta: Infinity, pct: 0.9 }, // a partir de 5 SMI -> 90%
];

function embargableMensual(income: number): number {
  if (income <= SMI_MENSUAL) return 0;
  let restante = income;
  let prev = SMI_MENSUAL; // el primer SMI es siempre inembargable
  let total = 0;
  for (const tramo of EMBARGO_TRAMOS) {
    const techo = tramo.hasta === Infinity ? Infinity : SMI_MENSUAL * tramo.hasta;
    const base = Math.min(restante, techo) - prev;
    if (base > 0) total += base * tramo.pct;
    prev = techo;
    if (restante <= techo) break;
  }
  return Math.round(total);
}

// Construye una guía legal precisa de qué se puede embargar y qué NO,
// para que el diagnóstico no amenace con embargos de nómina inexistentes.
function buildEmbargoGuide(g: GuideFields): string {
  const income = g.monthlyIncome;
  const lines: string[] = [];
  if (income == null) {
    lines.push(
      `INGRESOS NO INDICADOS: NO afirmes que le embargarán la nómina. Pregunta/asume con cautela y apóyate en las demás consecuencias (intereses de demora, ASNEF, demanda/monitorio con costas, embargo de cuentas y saldos, devoluciones de Hacienda).`,
    );
  } else if (income <= SMI_MENSUAL) {
    lines.push(
      `NÓMINA INEMBARGABLE: con ${income}€/mes (≤ SMI ${SMI_MENSUAL}€), la nómina es INEMBARGABLE por el art. 607 LEC. PROHIBIDO usar "te embargarán la nómina/el sueldo" como amenaza: es FALSO y suena a genérico. Las consecuencias REALES y legalmente correctas para este caso son: (1) intereses de demora que engordan la deuda cada mes; (2) ASNEF/morosidad → bloqueo para alquilar, financiar o pedir crédito; (3) demanda/monitorio con COSTAS judiciales que SUMAN a la deuda; (4) embargo de SALDOS en cuenta (lo que se acumule por encima del SML del último mes SÍ es embargable) y de devoluciones de Hacienda; (5) si en el futuro sube el sueldo o cambia de trabajo, la parte sobre el SMI pasa a ser embargable; (6) la deuda no prescribe sola y le persigue durante años.`,
    );
  } else {
    const emb = embargableMensual(income);
    lines.push(
      `NÓMINA PARCIALMENTE EMBARGABLE: con ${income}€/mes, por el art. 607 LEC le pueden embargar aprox. ${emb}€/mes de la nómina (el primer SMI de ${SMI_MENSUAL}€ es intocable; sobre el exceso se aplican tramos del 30% al 90%). Usa esta cifra REAL (~${emb}€/mes), no inventes un porcentaje plano. Añade además: intereses de demora, ASNEF, costas judiciales, embargo de cuentas/devoluciones y, en su caso, de la paga extra.`,
    );
  }
  if (g.employment === "autonomo") {
    lines.push(
      `AUTÓNOMO/A: puede sufrir embargo de facturas/clientes y de cuentas, y la AEAT/Seguridad Social embargan de forma directa sin pasar por juez. La protección del SMI sobre ingresos de autónomo es más limitada.`,
    );
  }
  if (g.vehicle === "financiado") {
    lines.push(`VEHÍCULO FINANCIADO: ante impago, la financiera puede reclamar la RETIRADA del vehículo.`);
  }
  return lines.join("\n");
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

// Regla de jerarquía de datos: los DATOS GUÍA estructurados (editados por el
// comercial) mandan sobre cualquier cifra/entidad del texto libre.
const SOURCE_OF_TRUTH_RULE =
  "JERARQUÍA DE DATOS (OBLIGATORIA): los DATOS GUÍA son la ÚNICA FUENTE DE VERDAD para cifras (deuda, cuotas, ingresos/salario), entidades, vivienda y vehículo, porque reflejan lo que el comercial ha confirmado y editado. El texto del caso es solo CONTEXTO CUALITATIVO (situación personal, emociones, tono). Si una cifra o entidad aparece en el texto libre pero difiere de los DATOS GUÍA (o no está en ellos), usa SIEMPRE el valor de los DATOS GUÍA e IGNORA el del texto libre. Nunca cites un salario, deuda o entidad que contradiga los DATOS GUÍA.";

function buildPrompt(
  caseText: string,
  g: GuideFields,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
): string {
  const campos = buildCaseData(g);

  return `Eres el MEJOR closer de ventas de Calma, empresa española que ayuda a personas con deudas. Trabajas para el equipo comercial y tu trabajo es darle munición CONCRETA para cerrar, no rellenar fichas.

DATOS GUÍA (FUENTE DE VERDAD · prioridad absoluta para cifras y entidades):
${campos}

CASO DE LA PERSONA (CONTEXTO CUALITATIVO · situación, emociones, tono; NO usar sus cifras si difieren de los DATOS GUÍA):
"""
${caseText}
"""

SOLUCIÓN RECOMENDADA POR EL TRIAJE: ${t.title}
${SOLUTION_BRIEF[t.solution]}
${SOLUTION_BENEFITS[t.solution] ?? ""}

ANÁLISIS LEGAL DE EMBARGABILIDAD (OBLIGATORIO RESPETARLO — no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

NIVEL DE ENGAGEMENT DE LA PERSONA (cómo de lista está para empezar el proceso):
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
Adapta la INTENSIDAD del discurso (más fuerte o más suave), la longitud y el número de tarjetas a este nivel de engagement. El siguiente paso debe estar preparado en función de él.
${reactionsBlock(reactions)}

Genera CINCO salidas en español de España:

1. diagnosis_internal (GUION INTERNO para el comercial, en formato de TARJETAS): un ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los MÁXIMOS posibles que sean REALES para ESTE caso (no rellenes con genéricos). Cada tarjeta es UNA consecuencia REAL y LEGALMENTE CORRECTA de NO actuar, ANCLADA en un dato del caso y respetando el ANÁLISIS LEGAL DE EMBARGABILIDAD de arriba (ej.: intereses de demora de [entidad] sobre los X €, ASNEF y bloqueo de crédito/alquiler, demanda/monitorio con costas, embargo de saldos/cuentas, embargo de devoluciones de Hacienda, embargo parcial de nómina SOLO si supera el SMI, retirada de vehículo financiado, acoso telefónico). El "title" es corto y contundente y cita el dato. El "body" es el argumento para el comercial CON la objeción a anticipar y cómo rebatirla. Nada genérico ni legalmente falso.

2. diagnosis_client (TEXTO PARA ENVIAR AL CLIENTE por WhatsApp/email): un string en segunda persona ("tú") que menciona el importe total y/o las entidades reales del caso y la consecuencia concreta sobre SU situación. Honesto sobre la gravedad, sin frases de catálogo. Listo para copiar y pegar.

3. solution_internal (GUION INTERNO en formato de TARJETAS): un ARRAY de 5 a 8 objetos { "emoji", "title", "body" }, los máximos reales para este caso. Cada tarjeta es UN BENEFICIO CONCRETO de la solución (${t.title}) aterrizado en los datos del caso (importes, entidades, cuota, nómina, vivienda/vehículo) y conectado con el dolor exacto del diagnóstico ("dejas de deber los X € a [entidad]", "se frenan los intereses de demora", "sales de ASNEF y vuelves a poder alquilar/financiar", "se paran las costas de la demanda"). Cada beneficio debe responder a una consecuencia del diagnóstico. Incluye qué hace Calma exactamente y el siguiente paso. Emojis de alivio/acción (✅ 🛡️ 🤝 💸 📋 🚀). Cero promesas vagas.

4. solution_client (TEXTO PARA ENVIAR AL CLIENTE): un string en segunda persona que cita el importe total y/o las entidades del caso y describe el resultado CONCRETO en su situación, además del siguiente paso (análisis gratuito). Esperanza realista anclada en datos, no en clichés. Listo para copiar y pegar.

5. approach (string, máx 3 frases): instrucción TÁCTICA y concreta para el comercial: qué frase exacta decir para abrir el siguiente paso, qué objeción anticipar según las reacciones marcadas y cómo rebatirla, y qué pedir explícitamente. Nada de consejos genéricos de tono.

REGLAS:
- No inventes datos concretos de Calma (porcentajes, número de clientes, resultados garantizados). Los importes que uses son los del caso, no inventados.
- Respeta estrictamente la descripción de la solución recomendada (reunificar NUNCA es préstamo/agrupar/alargar).
- ${SOURCE_OF_TRUTH_RULE}
- ${ANTI_VAGUE_RULE}
- Devuelve SOLO un objeto JSON válido con las claves: diagnosis_internal (array de tarjetas), diagnosis_client (string), solution_internal (array de tarjetas), solution_client (string), approach (string). Sin markdown, sin texto extra.`;
}

function reactionsBlock(reactions: string[]): string {
  if (!reactions.length) return "";
  const list = reactions.map((r) => `  - «${r}»`).join("\n");
  return `\nFRASES TEXTUALES DE LA PERSONA EN LA FASE ANTERIOR (úsalas para afinar el tono, anticipar y rebatir sus objeciones concretas, y conectar con lo que ha dicho; respeta el nivel de engagement):\n${list}\n`;
}

// Etiqueta corta del nivel de engagement para el itinerario.
const ENGAGEMENT_SHORT: Record<number, string> = {
  0: "listísimo, quiere empezar ya",
  1: "muy interesado/a",
  2: "dudoso/a",
  3: "quiere librarse de la llamada",
};
const PHASE_NAMES = ["Cualificación", "Diagnóstico", "Solución", "Contrato", "Firma"];

// Itinerario de engagement acumulado a lo largo de la llamada, para que el
// guion de contrato/firma tenga en cuenta la TRAYECTORIA, no solo el tier actual.
function itineraryBlock(engByPhase: number[], upToPhase: number): string {
  if (!Array.isArray(engByPhase) || !engByPhase.length) return "";
  const lines = engByPhase
    .slice(0, upToPhase + 1)
    .map((e, i) =>
      PHASE_NAMES[i]
        ? `  - ${PHASE_NAMES[i]}: ${e} (${ENGAGEMENT_SHORT[e] ?? ""})`
        : null,
    )
    .filter(Boolean)
    .join("\n");
  if (!lines) return "";
  return `\nITINERARIO DE ENGAGEMENT ACUMULADO (cómo ha evolucionado la persona fase a fase). Ten en cuenta la TENDENCIA: si ha ido a mejor, refuerza con seguridad el cierre; si ha empeorado en las últimas fases, recupera primero la confianza antes de empujar a firmar:\n${lines}\n`;
}

// Prompt para el guion de cierre de la FIRMA del contrato online.
function buildSigningPrompt(
  caseText: string,
  g: GuideFields,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
  engByPhase: number[],
): string {
  return `Eres el MEJOR closer de Calma, empresa española que ayuda a personas con deudas. Estás en la FASE FINAL de la llamada: conseguir que la persona FIRME EL CONTRATO ONLINE ahora mismo, sin aplazarlo.

DATOS GUÍA (FUENTE DE VERDAD · prioridad absoluta para cifras y entidades):
${buildCaseData(g)}

CASO DE LA PERSONA (CONTEXTO CUALITATIVO · NO usar sus cifras si difieren de los DATOS GUÍA):
"""
${caseText}
"""

SERVICIO CONTRATADO: ${t.title}

ANÁLISIS LEGAL DE EMBARGABILIDAD (respétalo: no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

NIVEL DE ENGAGEMENT:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${itineraryBlock(engByPhase, 4)}${reactionsBlock(reactions)}

Genera el guion de cierre para conseguir la firma. Devuelve SOLO un objeto JSON válido con estas claves:

1. signing_internal: ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los máximos reales para este caso. GUION INTERNO para el comercial: pasos EXACTOS para que firme online en la propia llamada (qué decir, qué pedir, cómo confirmar la firma), y rebatidos CONCRETOS de cada objeción de último momento ("me lo pienso", "lo consulto con mi pareja", "mándamelo y ya te digo", "no sé si es buen momento") apoyados en los datos REALES del caso: qué pierde por cada día que no firma, los X € en juego, los intereses/costas que siguen corriendo (y el embargo SOLO si la nómina lo permite legalmente). Frases literales que puede usar el comercial. Adapta la intensidad al engagement.
2. signing_client: STRING. Mensaje en segunda persona para enviar al cliente con instrucciones claras para firmar el contrato online (qué recibe, cómo firmarlo, por qué HOY), reforzando con su beneficio concreto del caso (la deuda/entidades que resuelve). Listo para copiar y pegar.

REGLAS:
- ${SOURCE_OF_TRUTH_RULE}
- ${ANTI_VAGUE_RULE}
Sin markdown, sin texto extra.`;
}

// Prompt para el mensaje de acompañamiento al ENVIAR el contrato.
function buildContractMessagePrompt(
  caseText: string,
  g: GuideFields,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
  engByPhase: number[],
): string {
  return `Eres un closer de Calma. Acabas de cerrar verbalmente con la persona y vas a ENVIARLE el contrato del servicio "${t.title}" para que lo firme online.

DATOS GUÍA (FUENTE DE VERDAD · prioridad absoluta para cifras y entidades):
${buildCaseData(g)}

CASO DE LA PERSONA (CONTEXTO CUALITATIVO · NO usar sus cifras si difieren de los DATOS GUÍA):
"""
${caseText}
"""

ANÁLISIS LEGAL DE EMBARGABILIDAD (respétalo: no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

NIVEL DE ENGAGEMENT:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${itineraryBlock(engByPhase, 3)}${reactionsBlock(reactions)}

Devuelve SOLO un objeto JSON válido con la clave:
Devuelve SOLO un objeto JSON válido con las claves:
1. contract_internal: ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los máximos reales para este caso. GUION INTERNO para el comercial durante la llamada en el momento de ENVIAR el contrato: qué decir exactamente mientras lo manda, cómo reafirmar la decisión, cómo confirmar los datos del firmante, cómo crear urgencia para que lo revise y firme YA, y rebatidos CONCRETOS a las dudas que surgen al recibir el contrato ("déjame leerlo con calma", "esto qué me compromete", "y si luego me arrepiento", "el precio") apoyados en los datos reales del caso (los X € y entidades que resuelve). Frases literales. Adapta la intensidad al engagement.
2. contract_message: STRING. Mensaje breve y profesional para WhatsApp/email que acompaña el envío del contrato, reafirma la decisión citando el servicio (${t.title}) y el beneficio CONCRETO para esta persona (la deuda/entidades reales del caso que se resuelven) y empuja con naturalidad a firmarlo HOY. Segunda persona, listo para copiar y pegar. ${SOURCE_OF_TRUTH_RULE} ${ANTI_VAGUE_RULE} Sin markdown.`;
}

// Objetivo concreto de cada fase, para que el refuerzo sepa hacia DÓNDE empujar.
const PHASE_GOAL: Record<number, string> = {
  0: "que la persona se abra, cuente su situación real y acepte que tiene un problema que merece la pena resolver, para poder pasar al diagnóstico",
  1: "que la persona ENTIENDA y CREA la gravedad real de su situación (consecuencias concretas de no actuar) y quiera escuchar la solución",
  2: "que la persona ACEPTE la solución recomendada como la salida buena para ella y diga que sí a empezar",
  3: "que la persona acepte recibir y revisar el contrato y se comprometa a firmarlo HOY",
  4: "que la persona FIRME el contrato online ahora mismo, sin aplazarlo",
};

// Prompt de REFUERZO: la persona NO quiere avanzar (duda, "me lo tengo que
// pensar", quiere colgar). Genera munición de manejo de objeciones para
// QUEDARSE en la fase actual y reintentar el avance sin presionar de golpe.
function buildReinforcePrompt(
  caseText: string,
  g: GuideFields,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
  engByPhase: number[],
  currentStep: number,
): string {
  const phaseName = PHASE_NAMES[currentStep] ?? "la fase actual";
  const goal = PHASE_GOAL[currentStep] ?? PHASE_GOAL[1];
  return `Eres el MEJOR closer de Calma, empresa española que ayuda a personas con deudas. Estás en la fase "${phaseName}" y la persona NO quiere avanzar todavía: ha puesto una pega, dice que se lo tiene que pensar, quiere consultarlo o quiere colgar. Tu trabajo NO es forzar el salto a la siguiente fase, sino DARLE LA VUELTA a la objeción y reintentar el avance con naturalidad.

OBJETIVO DE ESTA FASE: ${goal}.

DATOS GUÍA (FUENTE DE VERDAD · prioridad absoluta para cifras y entidades):
${buildCaseData(g)}

CASO DE LA PERSONA (CONTEXTO CUALITATIVO · NO usar sus cifras si difieren de los DATOS GUÍA):
"""
${caseText}
"""

SOLUCIÓN RECOMENDADA POR EL TRIAJE: ${t.title}
${SOLUTION_BRIEF[t.solution]}

ANÁLISIS LEGAL DE EMBARGABILIDAD (respétalo: no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

NIVEL DE ENGAGEMENT ACTUAL:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${itineraryBlock(engByPhase, currentStep)}${reactionsBlock(reactions)}

Devuelve SOLO un objeto JSON válido con estas claves:

1. reinforce_internal: ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los máximos REALES para este caso (sin relleno). Cada tarjeta es UNA técnica de manejo de objeciones para QUEDARSE en la fase "${phaseName}" y rebatir EXACTAMENTE lo que está frenando a la persona (las frases marcadas arriba: "me lo tengo que pensar" → aterriza cuál es la duda REAL detrás; "lo consulto con mi pareja" → ofrece incluir a la pareja o cierre condicional; "quiere colgar" → reenganche corto de bajo compromiso). Ancla cada rebatido en un DATO REAL del caso (los X €, entidades, intereses/costas que siguen corriendo, embargo SOLO si es legalmente viable). El "body" incluye frases LITERALES que el comercial puede decir y TERMINA con una pregunta de avance suave para reintentar el cierre sin presionar de golpe. Adapta la intensidad al engagement: en "dudoso/a" más empatía y menos presión; en "quiere colgar" reenganche muy breve.

2. reinforce_client: STRING (opcional, puede ir vacío). Mensaje corto en segunda persona para enviar a la persona por WhatsApp tras la objeción, que retome la conversación anclado en su dato real, baje la presión y deje la puerta abierta al siguiente paso. Listo para copiar y pegar.

REGLAS:
- ${SOURCE_OF_TRUTH_RULE}
- ${ANTI_VAGUE_RULE}
Sin markdown, sin texto extra.`;
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
    const engagementByPhase: number[] = Array.isArray(body.engagementByPhase)
      ? body.engagementByPhase
          .map((n: unknown) => {
            const v = Number(n);
            return Number.isFinite(v) && v >= 0 && v <= 3 ? Math.round(v) : 1;
          })
          .slice(0, 5)
      : [];
    const phase = typeof body.phase === "string" ? body.phase : "";
    const currentStep = (() => {
      const n = Number(body.currentStep);
      return Number.isFinite(n) && n >= 0 && n <= 4 ? Math.round(n) : 1;
    })();

    if (!caseText || caseText.length < 10) {
      return new Response(JSON.stringify({ error: "Describe el caso (mínimo 10 caracteres)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const t = triage(guide);
    const prompt =
      phase === "signing"
        ? buildSigningPrompt(caseText, guide, t, engagement, reactions, engagementByPhase)
        : phase === "contract_message"
          ? buildContractMessagePrompt(caseText, guide, t, engagement, reactions, engagementByPhase)
          : phase === "reinforce"
            ? buildReinforcePrompt(caseText, guide, t, engagement, reactions, engagementByPhase, currentStep)
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
          contract_internal: asCards(parsed.contract_internal),
          contract_message: asText(parsed.contract_message),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (phase === "reinforce") {
      return new Response(
        JSON.stringify({
          triage: t,
          engagement,
          step: currentStep,
          reinforce_internal: asCards(parsed.reinforce_internal),
          reinforce_client: asText(parsed.reinforce_client),
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