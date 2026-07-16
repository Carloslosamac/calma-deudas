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
  monthlyPayment?: number;
  isDefault?: boolean;
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
  housingPayment?: number;
  isPrimaryResidence?: boolean;
  vehicle?: Vehicle;
  vehicleValue?: number;
  vehiclePaid?: number;
  vehicleRemaining?: number;
  vehiclePayment?: number;
  wantsToKeepVehicle?: boolean;
  employment?: string;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  profile?:
    | "particular_soltero"
    | "particular_gananciales"
    | "autonomo"
    | "administrador_sociedad";
  publicDebtAmount?: number;
}

// Resultado del triaje que llega ya calculado desde el cliente. La IA no lo
// recalcula: solo lo redacta. Reduce input tokens y evita divergencias.
interface TriageExtra {
  variant?: "individual" | "conjunta" | "autonomo";
  modality?: "sin_masa" | "liquidacion" | "plan_pagos";
  estimatedInstallment?: number;
  warnings?: string[];
}

const VARIANT_LABEL: Record<string, string> = {
  individual: "Individual",
  conjunta: "Conjunta (gananciales)",
  autonomo: "Autónomo",
};
const MODALITY_LABEL: Record<string, string> = {
  sin_masa: "Sin masa (sin bienes que liquidar; proceso rápido y directo)",
  liquidacion: "Con liquidación (se liquida el bien financiado sin equity)",
  plan_pagos: "Plan de pagos (3 a 5 años, cuota calculada como ingresos − gastos)",
};

function buildTriageExtraBlock(t?: TriageExtra): string {
  if (!t || (!t.variant && !t.modality && !(t.warnings?.length))) return "";
  const parts: string[] = [];
  if (t.variant) parts.push(`Variante: ${VARIANT_LABEL[t.variant] ?? t.variant}`);
  if (t.modality) parts.push(`Modalidad: ${MODALITY_LABEL[t.modality] ?? t.modality}`);
  if (t.modality === "plan_pagos" && t.estimatedInstallment != null) {
    parts.push(
      `Cuota estimada del plan de pagos: ${t.estimatedInstallment} €/mes durante 3–5 años. Menciónala con transparencia; no prometas cancelación total inmediata.`,
    );
  }
  if (t.warnings?.length) {
    parts.push(`Avisos obligatorios (mencionarlos con naturalidad):\n${t.warnings.map((w) => `  · ${w}`).join("\n")}`);
  }
  return `\nENCAJE LSO YA RESUELTO POR EL TRIAJE (úsalo tal cual, no lo cuestiones ni lo re-razones; redacta apoyándote en él):\n${parts.join("\n")}\n`;
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

// Brief de la solución. Para LSO se compone por modalidad + variante para que
// el guion no confunda "cancelación íntegra" (solo sin masa) con plan de pagos
// (cuota 3–5 años + exoneración diferida) ni con liquidación (venta del bien +
// exoneración del resto).
const REUNIFICAR_BRIEF =
  "Reunificación de deudas = negociación EXTRAJUDICIAL para bajar la cuota mensual Y el total que se debe, SIN pedir un préstamo nuevo, SIN agrupar en una hipoteca y SIN alargar plazos. NUNCA la describas como un préstamo nuevo ni como agrupar deudas.";
const RECLAMACION_BRIEF =
  "Reclamación judicial por usura: si la TAE de tarjetas revolving o microcréditos es desproporcionada, la deuda puede anularse por usura y se recupera lo pagado de más.";

function lsoBriefByModality(m?: string): string {
  if (m === "plan_pagos") {
    return "Ley de Segunda Oportunidad · modalidad PLAN DE PAGOS: durante 3 a 5 años se paga una cuota mensual asumible (ingresos − gastos) y al FINAL del plan, si se cumple, el juez EXONERA el resto de la deuda. NO es una cancelación inmediata: es un plan de pagos judicial con exoneración diferida al cumplirlo. PROHIBIDO decir 'cancelamos los X € ya', 'sentencia que elimina la deuda de golpe' o 'te libras de todo hoy'.";
  }
  if (m === "liquidacion") {
    return "Ley de Segunda Oportunidad · modalidad CON LIQUIDACIÓN: se liquida el bien con valor (vehículo financiado con equity u otros bienes) para pagar a los acreedores con lo obtenido, y lo que quede sin cubrir se EXONERA por sentencia. NO digas 'cancelamos todos los X €' de golpe: parte se cubre con la liquidación del bien y el resto se exonera.";
  }
  if (m === "sin_masa") {
    return "Ley de Segunda Oportunidad · modalidad SIN MASA: no hay bienes de valor que liquidar, el procedimiento es rápido y termina con la EXONERACIÓN íntegra de la deuda por sentencia. Esta es la única modalidad en la que sí es correcto hablar de 'cancelación total de la deuda'.";
  }
  return "Ley de Segunda Oportunidad: procedimiento judicial que, según la modalidad, termina con la exoneración de la deuda (íntegra si no hay bienes; parcial tras liquidación o plan de pagos si los hay).";
}

function lsoBenefitsByModality(m?: string): string {
  if (m === "plan_pagos") {
    return "Beneficios a aterrizar con los datos del caso: (1) cuota mensual PREVISIBLE de la estimada durante 3–5 años, muy inferior al total de cuotas que hoy paga a [entidades]; (2) durante el plan se PARAN embargos, intereses de demora y llamadas; (3) al FINALIZAR el plan, el juez EXONERA el resto de los X € pendientes; (4) SALE de ASNEF una vez concluido; (5) protege lo mínimo vital y su capacidad de trabajar. NO prometas cancelación inmediata: es cuota + exoneración diferida.";
  }
  if (m === "liquidacion") {
    return "Beneficios a aterrizar con los datos del caso: (1) el bien con valor (vehículo financiado, etc.) se liquida y con eso se cubre parte de los X €; (2) el resto de la deuda que queda sin cubrir se EXONERA por sentencia; (3) durante el proceso se paran embargos, intereses y llamadas de [entidades]; (4) SALE de ASNEF tras la exoneración. NO digas 'cancelamos todos los X €' de golpe.";
  }
  if (m === "sin_masa") {
    return "Beneficios a aterrizar con los datos del caso: (1) los X € exactos quedan CANCELADOS íntegros por sentencia judicial (sin masa: no hay bienes que liquidar); (2) se PARAN los embargos sobre nómina/cuentas indicados; (3) SALE de ASNEF y recupera acceso al crédito; (4) se acaban las llamadas y la presión de [entidades concretas]; (5) proceso rápido y directo. Nombra importes y entidades reales.";
  }
  return "Beneficios a aterrizar con los datos del caso: exoneración de la deuda con el alcance que corresponda a la modalidad, paralización de embargos e intereses durante el procedimiento y salida de ASNEF. Nombra importes y entidades reales.";
}

const VARIANT_CLAUSE: Record<string, string> = {
  individual: "",
  conjunta:
    "Variante CONJUNTA: concurso conjunto de ambos cónyuges (régimen de gananciales). Umbral de ingresos y viabilidad se calculan sobre el hogar; menciona el 'nosotros como pareja' cuando encaje.",
  autonomo:
    "Variante AUTÓNOMO: concurso consecutivo que incluye deudas de la actividad. Si hay deuda pública, respeta el aviso del triaje (parte no cancelable por encima del umbral).",
};

function solutionBrief(
  solution: string,
  modality?: string,
  variant?: string,
): string {
  if (solution === "reunificar") return REUNIFICAR_BRIEF;
  if (solution === "reclamacion") return RECLAMACION_BRIEF;
  if (solution === "lso") {
    const clause = variant ? VARIANT_CLAUSE[variant] ?? "" : "";
    return `${lsoBriefByModality(modality)}${clause ? `\n${clause}` : ""}`;
  }
  return "";
}

function solutionBenefits(solution: string, modality?: string): string {
  if (solution === "reunificar")
    return "Beneficios a aterrizar con los datos del caso: (1) BAJA la cuota mensual que hoy pagas y el TOTAL que debes, mediante negociación extrajudicial con [entidades concretas]; (2) pasas de lidiar con N acreedores a una sola gestión que llevamos nosotros; (3) frenas el deterioro (intereses de demora, ASNEF, embargos) que crece cada mes sobre los X € de deuda; (4) conservas tu vivienda/vehículo. Nunca lo describas como préstamo nuevo, agrupar ni alargar plazos.";
  if (solution === "reclamacion")
    return "Beneficios a aterrizar con los datos del caso: (1) se ANULA la deuda usuraria de [entidad concreta] por TAE abusiva; (2) recuperas el dinero pagado de más en intereses desproporcionados; (3) se detiene el cobro y la presión de esa entidad. Cita la entidad y el importe reales del caso.";
  if (solution === "lso") return lsoBenefitsByModality(modality);
  return "";
}

// Reglas duras que dependen de la modalidad LSO. Se inyectan cuando solution=lso
// para evitar que la IA prometa cancelación total cuando es plan de pagos o
// liquidación.
function lsoHardRules(modality?: string, estimatedInstallment?: number): string {
  if (modality === "plan_pagos") {
    const cuota =
      estimatedInstallment != null
        ? `Cuota estimada del plan: ${estimatedInstallment} €/mes durante 3–5 años. Cítala como la cifra a pagar, no como un ahorro. `
        : "";
    return `REGLAS DURAS LSO · PLAN DE PAGOS (obligatorias): ${cuota}PROHIBIDO usar frases tipo "cancelamos la deuda", "eliminamos los X €", "sentencia que borra la deuda", "te libras de todo hoy" o "cancelación legal de X €". Obligatorio explicar el mecanismo real: pagas una cuota mensual durante 3–5 años y, al cumplir el plan, se EXONERA el resto por sentencia. Puedes usar "exoneración diferida", "plan de pagos judicial", "al terminar el plan queda cancelado lo que reste".`;
  }
  if (modality === "liquidacion") {
    return `REGLAS DURAS LSO · LIQUIDACIÓN (obligatorias): PROHIBIDO decir "cancelamos todos los X €" de golpe. Obligatorio explicar que se liquida el bien con valor para pagar a los acreedores y que solo el REMANENTE que quede sin cubrir se EXONERA por sentencia.`;
  }
  if (modality === "sin_masa") {
    return `REGLAS DURAS LSO · SIN MASA (obligatorias): al no haber bienes que liquidar, sí es correcto hablar de "cancelación íntegra por sentencia" de los X €. Aun así, no prometas plazos exactos ni resultados garantizados por el juez.`;
  }
  return "";
}

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
        }: ${d.amount != null ? `${d.amount} €` : "importe sin definir"}${
          d.monthlyPayment != null ? `, cuota ${d.monthlyPayment} €/mes` : ""
        }${d.isDefault != null ? `, ${d.isDefault ? "EN IMPAGO" : "al día"}` : ""}`,
    )
    .join("\n");

  // Cuotas que la persona REALMENTE paga hoy (solo deudas NO impagadas):
  // es lo único que sale de su bolsillo y lo único que se "libera" al reestructurar.
  const debtsMonthlyPaying = (g.debts ?? [])
    .filter((d) => d.isDefault !== true)
    .reduce((s, d) => s + (d.monthlyPayment ?? 0), 0);
  // Cuotas YA impagadas: no salen de su bolsillo (no liberan caja), pero pesan en el diagnóstico.
  const debtsMonthlyDefaulted = (g.debts ?? [])
    .filter((d) => d.isDefault === true)
    .reduce((s, d) => s + (d.monthlyPayment ?? 0), 0);
  // Salida real mensual = solo lo que de verdad paga + cargas fijas.
  const monthlyOutflow =
    debtsMonthlyPaying +
    (g.housingPayment ?? 0) +
    (g.vehiclePayment ?? 0) +
    (g.monthlyExpenses ?? 0);

  const campos = [
    g.debtAmount != null ? `Deuda total aprox: ${g.debtAmount} €` : null,
    debtsList ? `Desglose de deudas:\n${debtsList}` : null,
    debtsMonthlyPaying > 0
      ? `Cuotas que SÍ paga hoy (al día): ${debtsMonthlyPaying} €/mes — esto es lo único que deja de pagar (libera caja) al reestructurar.`
      : null,
    debtsMonthlyDefaulted > 0
      ? `Cuotas YA impagadas: ${debtsMonthlyDefaulted} €/mes — NO salen de su bolsillo, así que NO se "liberan" ni "inyectan" al dejar de pagarlas; cuentan para el diagnóstico (intereses, ASNEF, costas, embargos), no como ahorro.`
      : null,
    g.isDefault != null ? `En impago: ${g.isDefault ? "sí" : "no"}` : null,
    g.employment ? `Situación laboral: ${EMP_LABELS[g.employment] ?? g.employment}` : null,
    g.housing === "hipoteca"
      ? `Vivienda: hipoteca (valor ~${g.housingValue ?? "?"} €, pagado ~${g.mortgagePaid ?? "?"} €, pendiente ~${g.mortgageRemaining ?? "?"} €${g.housingPayment != null ? `, cuota ${g.housingPayment} €/mes` : ""})`
      : g.housing === "propiedad"
        ? `Vivienda: en propiedad (valor ~${g.housingValue ?? "?"} €, sin hipoteca)`
        : g.housing === "alquiler"
          ? `Vivienda: alquiler${g.housingPayment != null ? ` (${g.housingPayment} €/mes)` : ""}`
          : g.housing
          ? `Vivienda: ${g.housing}`
          : null,
    g.vehicle === "financiado"
      ? `Vehículo: financiado (valor ~${g.vehicleValue ?? "?"} €, pagado ~${g.vehiclePaid ?? "?"} €, pendiente ~${g.vehicleRemaining ?? "?"} €${g.vehiclePayment != null ? `, cuota ${g.vehiclePayment} €/mes` : ""})`
      : g.vehicle === "propiedad"
        ? `Vehículo: en propiedad (valor ~${g.vehicleValue ?? "?"} €)`
        : g.vehicle === "no"
          ? "Vehículo: no tiene"
          : null,
    g.monthlyIncome != null ? `Ingresos mensuales aprox: ${g.monthlyIncome} €` : null,
    g.monthlyExpenses != null ? `Gastos mensuales de vida aprox: ${g.monthlyExpenses} €` : null,
    monthlyOutflow > 0
      ? `Total que REALMENTE paga al mes (solo cuotas al día + vivienda + vehículo + gastos): ${monthlyOutflow} €${g.monthlyIncome != null ? ` sobre ${g.monthlyIncome} € de ingresos${g.monthlyIncome - monthlyOutflow < 0 ? ` → DÉFICIT de ${Math.abs(g.monthlyIncome - monthlyOutflow)} €/mes (no llega a fin de mes)` : ` → le quedan ${g.monthlyIncome - monthlyOutflow} €/mes`}` : ""}`
      : null,
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

// Regla clave: las cuotas YA impagadas no liberan/inyectan dinero al dejar de pagarlas.
const DEFAULT_DEBTS_RULE =
  "REGLA DE IMPAGOS (OBLIGATORIA): una cuota marcada EN IMPAGO ya NO se está pagando, así que dejar de pagarla NO 'libera', NO 'inyecta' ni 'ahorra' dinero — ese importe no salía de su bolsillo. El alivio de caja REAL solo proviene de las cuotas que SÍ paga hoy (las marcadas 'al día'). Las deudas en impago se usan para el DIAGNÓSTICO (intereses de demora que crecen, ASNEF, costas, posible demanda/embargo), nunca como ahorro mensual. Si hablas de cuánto se libera/mejora al mes, usa SOLO la suma de las cuotas que actualmente paga; jamás sumes cuotas impagadas a una supuesta 'inyección' o 'ahorro'.";

// Regla de FRAME: en cada paso la persona debe confiar más en nosotros como
// EXPERTOS y como SALVADORES. Refuerzo de autoridad progresivo.
const AUTHORITY_FRAME_RULE =
  "REGLA DE FRAME/AUTORIDAD (OBLIGATORIA): quien habla es Carlos, abogado especialista en Ley de Segunda Oportunidad con más de 6 años de experiencia y cientos de casos resueltos. En CADA guion refuerza dos posiciones de forma natural (sin fanfarronear): (1) EXPERTO — demuestra dominio técnico citando el mecanismo legal exacto que aplica al caso (exoneración del pasivo insatisfecho, plan de pagos, paralización de embargos/ejecuciones, protección de la vivienda cuando proceda), anticipándote a lo que va a pasar y hablando con precisión jurídica; (2) SALVADOR — posiciónate como la persona que le saca de esto y le devuelve la tranquilidad, contrastando el escenario si no actúa (intereses, ASNEF, demanda) con el alivio concreto que le damos. Cada guion debe SUBIR la confianza respecto al anterior: usa micro-pruebas de autoridad ('en casos como el tuyo, lo que hacemos es...', 'esto lo he llevado muchas veces y sé exactamente cómo termina'). PROHIBIDO sonar como un teleoperador: hablas como el abogado que ya ha ganado este caso muchas veces. Nunca prometas resultados garantizados que dependan del juez.";

// Datos del contrato (hoja de encargo) que el comercial debe poder citar.
interface ContractInput {
  initialPayment?: string;
  installments?: string;
  installmentAmount?: string;
  fee?: string;
  service?: string;
}

const cnum = (v?: string): number => {
  if (v == null) return 0;
  const n = parseFloat(
    String(v).replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", "."),
  );
  return Number.isFinite(n) ? n : 0;
};

// Bloque con las condiciones REALES del contrato, para que los guiones de
// solución / contrato / firma / refuerzo manejen precio, pago, garantía,
// gastos y desistimiento con datos exactos (no inventados).
function buildContractTerms(c?: ContractInput): string {
  const initial = cnum(c?.initialPayment) || 150;
  const installments = Math.round(cnum(c?.installments)) || 30;
  const amount = cnum(c?.installmentAmount) || 99;
  const total = initial + installments * amount;
  const honorarios =
    total > 0
      ? `${total} € IVA incluido (${initial} € iniciales + ${installments} cuotas mensuales de ${amount} €)`
      : c?.fee || "según condiciones acordadas entre las partes";
  return `CONDICIONES REALES DEL CONTRATO (HOJA DE ENCARGO — cítalas con naturalidad cuando toque hablar de precio, pago, garantía, gastos o compromiso; NO inventes ni cambies estas cifras):
- HONORARIOS: ${honorarios}. Compáralo con lo que hoy le ahogan las deudas: la cuota de ${amount} €/mes es asumible y previsible.
- PAGO INICIAL: ${initial} € como provisión de fondos para abrir el expediente y arrancar las primeras actuaciones (no reembolsable una vez iniciadas las actuaciones, salvo supuestos legales). Es el paso que pone el caso en marcha HOY.
- FORMA DE COBRO: cuotas en los 5 primeros días de cada mes por tarjeta o domiciliación SEPA, según autorice la persona.
- GARANTÍA COMERCIAL DE ÉXITO: vinculada al cumplimiento diligente y al resultado jurídicamente viable informado según su caso. NO prometas exoneración total garantizada (depende de requisitos legales y resolución judicial). Solo 500 € tienen carácter no reembolsable (costes administrativos, análisis de viabilidad y preparación documental inicial).
- QUÉ INCLUYE: análisis de viabilidad, revisión documental, preparación y presentación de la demanda ante el juzgado y asesoramiento en la fase principal hasta resolución judicial.
- QUÉ NO INCLUYE (se factura aparte, dilo con transparencia si pregunta): documentos oficiales, certificados, notas registrales, burofaxes y honorarios de profesionales externos (procurador, notario, administrador concursal) si fueran necesarios.
- DESISTIMIENTO: 14 días naturales desde la firma si se contrata a distancia. Tras presentar la demanda, el desistimiento no extingue la obligación de pago. Úsalo para BAJAR el miedo a comprometerse ("tienes 14 días para echarte atrás"), nunca como excusa para aplazar la firma.
- COMPROMISO Y DURACIÓN: el encargo sigue vigente hasta finalizar el procedimiento; las obligaciones de pago se mantienen.
REGLA DE USO: no sueltes la lista entera de golpe; integra SOLO el dato que rebate la objeción o refuerza el cierre en ese momento (precio, "qué me compromete", "y si me arrepiento", "qué pasa si no funciona", urgencia de la provisión inicial).`;
}

function buildPrompt(
  caseText: string,
  g: GuideFields,
  t: { solution: string; title: string },
  engagement: number,
  reactions: string[],
  contract?: ContractInput,
  target: "diagnosis" | "solution" = "diagnosis",
  triageExtra?: TriageExtra,
): string {
  const campos = buildCaseData(g);

  const brief = solutionBrief(t.solution, triageExtra?.modality, triageExtra?.variant);
  const benefits = solutionBenefits(t.solution, triageExtra?.modality);
  const hardRules =
    t.solution === "lso"
      ? lsoHardRules(triageExtra?.modality, triageExtra?.estimatedInstallment)
      : "";
  const outputs =
    target === "diagnosis"
      ? `Genera TRES salidas en español de España (SOLO el diagnóstico, NO la solución):

1. diagnosis_internal (GUION INTERNO para el comercial, en formato de TARJETAS): un ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los MÁXIMOS posibles que sean REALES para ESTE caso (no rellenes con genéricos). Cada tarjeta es UNA consecuencia REAL y LEGALMENTE CORRECTA de NO actuar, ANCLADA en un dato del caso y respetando el ANÁLISIS LEGAL DE EMBARGABILIDAD de arriba (ej.: intereses de demora de [entidad] sobre los X €, ASNEF y bloqueo de crédito/alquiler, demanda/monitorio con costas, embargo de saldos/cuentas, embargo de devoluciones de Hacienda, embargo parcial de nómina SOLO si supera el SMI, retirada de vehículo financiado, acoso telefónico). El "title" es corto y contundente y cita el dato. El "body" es el argumento para el comercial CON la objeción a anticipar y cómo rebatirla. Nada genérico ni legalmente falso.

2. diagnosis_client (TEXTO PARA ENVIAR AL CLIENTE por WhatsApp/email): un string en segunda persona ("tú") que menciona el importe total y/o las entidades reales del caso y la consecuencia concreta sobre SU situación. Honesto sobre la gravedad, sin frases de catálogo. Listo para copiar y pegar.

3. approach (string, máx 3 frases): instrucción TÁCTICA y concreta para el comercial: qué frase exacta decir para abrir el siguiente paso, qué objeción anticipar según las reacciones marcadas y cómo rebatirla, y qué pedir explícitamente. Nada de consejos genéricos de tono.

REGLAS:
- No inventes datos concretos de Calma (porcentajes, número de clientes, resultados garantizados). Los importes que uses son los del caso, no inventados.
- ${SOURCE_OF_TRUTH_RULE}
- ${ANTI_VAGUE_RULE}
- ${DEFAULT_DEBTS_RULE}
- ${AUTHORITY_FRAME_RULE}
- Devuelve SOLO un objeto JSON válido con las claves: diagnosis_internal (array de tarjetas), diagnosis_client (string), approach (string). Sin markdown, sin texto extra.`
      : `Genera TRES salidas en español de España (SOLO la solución, NO el diagnóstico):

1. solution_internal (GUION INTERNO en formato de TARJETAS): un ARRAY de 5 a 8 objetos { "emoji", "title", "body" }, los máximos reales para este caso. Cada tarjeta es UN BENEFICIO CONCRETO de la solución (${t.title}) aterrizado en los datos del caso (importes, entidades, cuota, nómina, vivienda/vehículo) y conectado con el dolor exacto del diagnóstico ("dejas de deber los X € a [entidad]", "se frenan los intereses de demora", "sales de ASNEF y vuelves a poder alquilar/financiar", "se paran las costas de la demanda"). Cada beneficio debe responder a una consecuencia previsible del diagnóstico. Incluye qué hace Calma exactamente y el siguiente paso. AL MENOS UNA tarjeta debe presentar el PRECIO y la GARANTÍA con las CONDICIONES REALES DEL CONTRATO (honorarios y cuota mensual frente a lo que hoy paga, provisión inicial, garantía comercial sin prometer exoneración total). Emojis de alivio/acción (✅ 🛡️ 🤝 💸 📋 🚀). Cero promesas vagas.

2. solution_client (TEXTO PARA ENVIAR AL CLIENTE): un string en segunda persona que cita el importe total y/o las entidades del caso y describe el resultado CONCRETO en su situación, además del siguiente paso (análisis gratuito). Esperanza realista anclada en datos, no en clichés. Listo para copiar y pegar.

3. approach (string, máx 3 frases): instrucción TÁCTICA y concreta para el comercial: qué frase exacta decir para abrir el siguiente paso, qué objeción anticipar según las reacciones marcadas y cómo rebatirla, y qué pedir explícitamente. Nada de consejos genéricos de tono.

REGLAS:
- No inventes datos concretos de Calma (porcentajes, número de clientes, resultados garantizados). Los importes que uses son los del caso, no inventados.
- Respeta estrictamente la descripción de la solución recomendada (reunificar NUNCA es préstamo/agrupar/alargar).
- ${SOURCE_OF_TRUTH_RULE}
- ${ANTI_VAGUE_RULE}
- ${DEFAULT_DEBTS_RULE}
- ${AUTHORITY_FRAME_RULE}
- Devuelve SOLO un objeto JSON válido con las claves: solution_internal (array de tarjetas), solution_client (string), approach (string). Sin markdown, sin texto extra.`;

  return `Eres el MEJOR closer de ventas de Calma, empresa española que ayuda a personas con deudas. Trabajas para el equipo comercial y tu trabajo es darle munición CONCRETA para cerrar, no rellenar fichas.

DATOS GUÍA (FUENTE DE VERDAD · prioridad absoluta para cifras y entidades):
${campos}

CASO DE LA PERSONA (CONTEXTO CUALITATIVO · situación, emociones, tono; NO usar sus cifras si difieren de los DATOS GUÍA):
"""
${caseText}
"""

SOLUCIÓN RECOMENDADA POR EL TRIAJE: ${t.title}
${buildTriageExtraBlock(triageExtra)}
${hardRules ? hardRules + "\n" : ""}${brief}
${benefits}

ANÁLISIS LEGAL DE EMBARGABILIDAD (OBLIGATORIO RESPETARLO — no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

${buildContractTerms(contract)}

NIVEL DE ENGAGEMENT DE LA PERSONA (cómo de lista está para empezar el proceso):
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
Adapta la INTENSIDAD del discurso (más fuerte o más suave), la longitud y el número de tarjetas a este nivel de engagement. El siguiente paso debe estar preparado en función de él.
${reactionsBlock(reactions)}

${outputs}`;
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
  contract?: ContractInput,
  triageExtra?: TriageExtra,
): string {
  return `Eres el MEJOR closer de Calma, empresa española que ayuda a personas con deudas. Estás en la FASE FINAL de la llamada: conseguir que la persona FIRME EL CONTRATO ONLINE ahora mismo, sin aplazarlo.

DATOS GUÍA (FUENTE DE VERDAD · prioridad absoluta para cifras y entidades):
${buildCaseData(g)}

CASO DE LA PERSONA (CONTEXTO CUALITATIVO · NO usar sus cifras si difieren de los DATOS GUÍA):
"""
${caseText}
"""

SERVICIO CONTRATADO: ${t.title}
${buildTriageExtraBlock(triageExtra)}
${t.solution === "lso" ? lsoHardRules(triageExtra?.modality, triageExtra?.estimatedInstallment) : ""}

ANÁLISIS LEGAL DE EMBARGABILIDAD (respétalo: no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

${buildContractTerms(contract)}

NIVEL DE ENGAGEMENT:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${itineraryBlock(engByPhase, 4)}${reactionsBlock(reactions)}

Genera el guion de cierre para conseguir la firma. Devuelve SOLO un objeto JSON válido con estas claves:

1. signing_internal: ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los máximos reales para este caso. GUION INTERNO para el comercial: pasos EXACTOS para que firme online en la propia llamada (qué decir, qué pedir, cómo confirmar la firma), y rebatidos CONCRETOS de cada objeción de último momento ("me lo pienso", "lo consulto con mi pareja", "mándamelo y ya te digo", "no sé si es buen momento", "el precio", "y si me arrepiento") apoyados en los datos REALES del caso y en las CONDICIONES REALES DEL CONTRATO: la provisión inicial que arranca el caso HOY, la cuota mensual asumible, los 14 días de desistimiento para quitar miedo, la garantía comercial, y qué pierde por cada día que no firma (intereses/costas que siguen corriendo, embargo SOLO si la nómina lo permite legalmente). Frases literales que puede usar el comercial. Adapta la intensidad al engagement.
2. signing_client: STRING. Mensaje en segunda persona para enviar al cliente con instrucciones claras para firmar el contrato online (qué recibe, cómo firmarlo, por qué HOY), reforzando con su beneficio concreto del caso (la deuda/entidades que resuelve). Listo para copiar y pegar.

REGLAS:
- ${SOURCE_OF_TRUTH_RULE}
- ${ANTI_VAGUE_RULE}
- ${DEFAULT_DEBTS_RULE}
- ${AUTHORITY_FRAME_RULE}
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
  contract?: ContractInput,
  triageExtra?: TriageExtra,
): string {
  return `Eres un closer de Calma. Acabas de cerrar verbalmente con la persona y vas a ENVIARLE el contrato del servicio "${t.title}" para que lo firme online.

DATOS GUÍA (FUENTE DE VERDAD · prioridad absoluta para cifras y entidades):
${buildCaseData(g)}
${buildTriageExtraBlock(triageExtra)}
${t.solution === "lso" ? lsoHardRules(triageExtra?.modality, triageExtra?.estimatedInstallment) : ""}

CASO DE LA PERSONA (CONTEXTO CUALITATIVO · NO usar sus cifras si difieren de los DATOS GUÍA):
"""
${caseText}
"""

ANÁLISIS LEGAL DE EMBARGABILIDAD (respétalo: no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

${buildContractTerms(contract)}

NIVEL DE ENGAGEMENT:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${itineraryBlock(engByPhase, 3)}${reactionsBlock(reactions)}

Devuelve SOLO un objeto JSON válido con la clave:
Devuelve SOLO un objeto JSON válido con las claves:
1. contract_internal: ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los máximos reales para este caso. GUION INTERNO para el comercial durante la llamada en el momento de ENVIAR el contrato: qué decir exactamente mientras lo manda, cómo reafirmar la decisión, cómo confirmar los datos del firmante, cómo crear urgencia para que lo revise y firme YA, y rebatidos CONCRETOS a las dudas que surgen al recibir el contrato, apoyados en los datos del caso y en las CONDICIONES REALES DEL CONTRATO: "déjame leerlo con calma" → resume tú los puntos clave (honorarios, provisión inicial, garantía, 14 días de desistimiento); "esto qué me compromete" → explica objeto, duración y desistimiento; "y si luego me arrepiento" → 14 días naturales; "el precio" → desglosa honorarios vs. lo que hoy paga y la cuota mensual; "qué pasa si no funciona" → garantía comercial real (sin prometer exoneración total, solo 500 € no reembolsables). Anticipa además que ciertos gastos externos (procurador, notario, administrador concursal) se facturan aparte. Frases literales. Adapta la intensidad al engagement.
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
  contract?: ContractInput,
  triageExtra?: TriageExtra,
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
${buildTriageExtraBlock(triageExtra)}
${t.solution === "lso" ? lsoHardRules(triageExtra?.modality, triageExtra?.estimatedInstallment) + "\n" : ""}${solutionBrief(t.solution, triageExtra?.modality, triageExtra?.variant)}

ANÁLISIS LEGAL DE EMBARGABILIDAD (respétalo: no amenaces con embargos que la ley no permite):
${buildEmbargoGuide(g)}

${currentStep >= 2 ? buildContractTerms(contract) + "\n" : ""}
NIVEL DE ENGAGEMENT ACTUAL:
${ENGAGEMENT_GUIDE[engagement] ?? ENGAGEMENT_GUIDE[1]}
${itineraryBlock(engByPhase, currentStep)}${reactionsBlock(reactions)}

Devuelve SOLO un objeto JSON válido con estas claves:

1. reinforce_internal: ARRAY de 5 a 8 objetos { "emoji": string, "title": string, "body": string }, los máximos REALES para este caso (sin relleno). Cada tarjeta es UNA técnica de manejo de objeciones para QUEDARSE en la fase "${phaseName}" y rebatir EXACTAMENTE lo que está frenando a la persona (las frases marcadas arriba: "me lo tengo que pensar" → aterriza cuál es la duda REAL detrás; "lo consulto con mi pareja" → ofrece incluir a la pareja o cierre condicional; "quiere colgar" → reenganche corto de bajo compromiso). Ancla cada rebatido en un DATO REAL del caso (los X €, entidades, intereses/costas que siguen corriendo, embargo SOLO si es legalmente viable). El "body" incluye frases LITERALES que el comercial puede decir y TERMINA con una pregunta de avance suave para reintentar el cierre sin presionar de golpe. Adapta la intensidad al engagement: en "dudoso/a" más empatía y menos presión; en "quiere colgar" reenganche muy breve.

2. reinforce_client: STRING (opcional, puede ir vacío). Mensaje corto en segunda persona para enviar a la persona por WhatsApp tras la objeción, que retome la conversación anclado en su dato real, baje la presión y deje la puerta abierta al siguiente paso. Listo para copiar y pegar.

REGLAS:
- ${SOURCE_OF_TRUTH_RULE}
- ${ANTI_VAGUE_RULE}
- ${DEFAULT_DEBTS_RULE}
- ${AUTHORITY_FRAME_RULE}
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
    const contract: ContractInput =
      body.contract && typeof body.contract === "object" ? body.contract : {};
    const triageExtra: TriageExtra =
      body.triageExtra && typeof body.triageExtra === "object"
        ? {
            variant:
              body.triageExtra.variant === "individual" ||
              body.triageExtra.variant === "conjunta" ||
              body.triageExtra.variant === "autonomo"
                ? body.triageExtra.variant
                : undefined,
            modality:
              body.triageExtra.modality === "sin_masa" ||
              body.triageExtra.modality === "liquidacion" ||
              body.triageExtra.modality === "plan_pagos"
                ? body.triageExtra.modality
                : undefined,
            estimatedInstallment:
              typeof body.triageExtra.estimatedInstallment === "number"
                ? body.triageExtra.estimatedInstallment
                : undefined,
            warnings: Array.isArray(body.triageExtra.warnings)
              ? body.triageExtra.warnings
                  .filter((w: unknown) => typeof w === "string")
                  .slice(0, 6)
              : [],
          }
        : {};
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
        ? buildSigningPrompt(caseText, guide, t, engagement, reactions, engagementByPhase, contract, triageExtra)
        : phase === "contract_message"
          ? buildContractMessagePrompt(caseText, guide, t, engagement, reactions, engagementByPhase, contract, triageExtra)
          : phase === "reinforce"
            ? buildReinforcePrompt(caseText, guide, t, engagement, reactions, engagementByPhase, currentStep, contract, triageExtra)
            : phase === "solution"
              ? buildPrompt(caseText, guide, t, engagement, reactions, contract, "solution", triageExtra)
              : buildPrompt(caseText, guide, t, engagement, reactions, contract, "diagnosis", triageExtra);

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
        reasoning_effort: "low",
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
    const content: string = aiData?.choices?.[0]?.message?.content ?? "{}";
    const extractFirstJsonObject = (raw: string): string | null => {
      const cleaned = raw.replace(/```json\s*/gi, "").replace(/```/g, "");
      const start = cleaned.indexOf("{");
      if (start === -1) return null;
      let depth = 0;
      let inStr = false;
      let esc = false;
      for (let i = start; i < cleaned.length; i++) {
        const ch = cleaned[i];
        if (inStr) {
          if (esc) esc = false;
          else if (ch === "\\") esc = true;
          else if (ch === '"') inStr = false;
          continue;
        }
        if (ch === '"') inStr = true;
        else if (ch === "{") depth++;
        else if (ch === "}") {
          depth--;
          if (depth === 0) return cleaned.slice(start, i + 1);
        }
      }
      return null;
    };
    let parsed: Record<string, unknown> = {};
    try {
      parsed = JSON.parse(content);
    } catch (_e) {
      const obj = extractFirstJsonObject(content);
      try {
        parsed = obj ? JSON.parse(obj) : {};
      } catch (_e2) {
        parsed = {};
      }
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

    if (phase === "solution") {
      return new Response(
        JSON.stringify({
          triage: t,
          engagement,
          solution_internal: asCards(parsed.solution_internal),
          solution_client: asText(parsed.solution_client),
          approach: asText(parsed.approach),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // phase === "diagnosis" (o vacío): solo diagnóstico.
    return new Response(
      JSON.stringify({
        triage: t,
        engagement,
        diagnosis_internal: asCards(parsed.diagnosis_internal),
        diagnosis_client: asText(parsed.diagnosis_client),
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