/**
 * Herramientas gratuitas para personas con deuda.
 * Hub en /herramientas + una página SEO por herramienta.
 * Las constantes legales (SMI, tramos del art. 607 LEC) se centralizan aquí
 * con su fuente citada; no se inventan cifras de marca.
 */

export type ToolKind =
  | "diagnosis"
  | "cancelable"
  | "salary"
  | "revolving"
  | "paymentPlan"
  | "comparator";

export type ToolFaq = { q: string; a: string };
export type ToolSection = { title: string; body: string[] };
export type ToolRelated = { label: string; to: string };

export type Tool = {
  slug: string;
  path: string;
  kind: ToolKind;
  /** etiqueta corta para navegación */
  navLabel: string;
  /** título de tarjeta en el hub */
  cardTitle: string;
  cardDescription: string;
  eyebrow: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  sections: ToolSection[];
  faq: ToolFaq[];
  related: ToolRelated[];
  /** aviso legal/YMYL bajo la herramienta */
  disclaimer: string;
};

/**
 * Salario Mínimo Interprofesional de referencia (mensual, base del cálculo
 * de embargos del art. 607 LEC). Actualizar cuando cambie el SMI.
 */
export const SMI_MENSUAL = 1184; // SMI 2025: 1.184 €/mes
export const SMI_ANIO = "2025";

/** Tramos de embargabilidad sobre el SMI (art. 607 LEC). */
export const TRAMOS_EMBARGO = [
  { hasta: 1, porcentaje: 0, etiqueta: "1.ª cuantía igual al SMI" },
  { hasta: 2, porcentaje: 30, etiqueta: "2.º tramo (del SMI al doble)" },
  { hasta: 3, porcentaje: 50, etiqueta: "3.º tramo (del doble al triple)" },
  { hasta: 4, porcentaje: 60, etiqueta: "4.º tramo (del triple al cuádruple)" },
  { hasta: 5, porcentaje: 75, etiqueta: "5.º tramo (del cuádruple al quíntuple)" },
  { hasta: Infinity, porcentaje: 90, etiqueta: "Resto (por encima de 5 SMI)" },
] as const;

/** TAE media de referencia para detectar usura en revolving (Banco de España). */
export const REVOLVING_LEGAL_APR = 20; // referencia orientativa
export const REVOLVING_CARD_APR = 26; // TAE típica de una revolving

/**
 * TAE media orientativa de la deuda al consumo (préstamos personales + tarjetas)
 * usada como valor por defecto del simulador de plan de pagos. Referencia: tipos
 * medios del crédito al consumo publicados por el Banco de España.
 */
export const CONSUMER_AVG_APR = 22;

export const tools: Tool[] = [
  {
    slug: "test-solucion-deuda",
    path: "/herramientas/test-solucion-deuda",
    kind: "diagnosis",
    navLabel: "Test: ¿qué solución necesito?",
    cardTitle: "Test de diagnóstico de tu deuda",
    cardDescription:
      "Responde 3 preguntas y descubre qué vía te conviene: Ley de Segunda Oportunidad, reunificación o reclamación.",
    eyebrow: "Herramientas",
    h1: "Test: ¿qué solución necesitas para tus deudas?",
    seoTitle: "Test de deudas: ¿qué solución te conviene? (gratis)",
    metaDescription:
      "Responde 3 preguntas y descubre en 1 minuto si te conviene la Ley de Segunda Oportunidad, reunificar o reclamar por usura. Gratis y sin registro.",
    intro:
      "No todas las deudas se resuelven igual. Este test orientativo analiza tu situación y te indica la vía con más sentido para tu caso, con su explicación.",
    sections: [
      {
        title: "Cómo decide el test cuál es tu mejor opción",
        body: [
          "El test cruza tres factores que determinan la vía legal adecuada: si puedes o no pagar tus deudas (solvencia), si tienes bienes valiosos ya pagados, y si tus deudas vienen de intereses abusivos.",
          "Si no puedes pagar y no tienes bienes valiosos que perder, la Ley de Segunda Oportunidad permite cancelar la deuda y empezar de cero. Si no puedes pagar pero tienes una vivienda o terreno ya pagado que quieres proteger, suele encajar mejor una reunificación que rebaje la cuota. Y si puedes pagar pero arrastras tarjetas revolving o microcréditos con intereses desproporcionados, la vía es reclamar por usura.",
        ],
      },
      {
        title: "Por qué el resultado es solo orientativo",
        body: [
          "Cada caso depende de detalles que un test no puede valorar por completo: el origen exacto de la deuda, los plazos, los avalistas o el histórico de cada contrato. Por eso el resultado es un punto de partida, no un dictamen.",
          "El paso definitivo es un estudio gratuito de tu caso: revisamos tus deudas concretas y te confirmamos qué solución te conviene de verdad, sin compromiso.",
        ],
      },
    ],
    faq: [
      {
        q: "¿El test tiene algún coste o hay que registrarse?",
        a: "No. El test es totalmente gratuito y anónimo: no pedimos datos para mostrarte el resultado.",
      },
      {
        q: "¿Sirve si tengo deudas con Hacienda o la Seguridad Social?",
        a: "Sí. La deuda pública tiene límites de exoneración, pero también puede aplazarse o recurrirse. El test te orienta y en el estudio gratuito valoramos tu caso concreto.",
      },
      {
        q: "¿Qué pasa después de hacer el test?",
        a: "Te mostramos la vía recomendada con su explicación y puedes solicitar un estudio gratuito de tu caso para confirmarlo con un abogado especialista.",
      },
    ],
    related: [
      { label: "Ley de Segunda Oportunidad", to: "/ley-segunda-oportunidad" },
      { label: "Reunificar deudas", to: "/reunificar-deudas" },
      { label: "Cancelar tarjetas revolving", to: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
    ],
    disclaimer:
      "Resultado orientativo basado en tus respuestas. No constituye asesoramiento legal. Confirma tu caso con un estudio gratuito.",
  },
  {
    slug: "calculadora-deuda-cancelable",
    path: "/herramientas/calculadora-deuda-cancelable",
    kind: "cancelable",
    navLabel: "Calculadora de deuda cancelable",
    cardTitle: "Calculadora de deuda cancelable",
    cardDescription:
      "Estima cuánto de tu deuda podrías cancelar y el alivio mensual aproximado según el tipo de deuda.",
    eyebrow: "Herramientas",
    h1: "Calculadora: ¿cuánta deuda puedes cancelar?",
    seoTitle: "Calculadora de deuda cancelable: cuánto puedes quitarte",
    metaDescription:
      "Calcula gratis cuánto de tu deuda podrías cancelar y el alivio mensual estimado según el tipo de deuda. Sin registro y en menos de un minuto.",
    intro:
      "Introduce tu deuda y su origen para ver una estimación de cuánto podrías cancelar con las herramientas legales disponibles en España.",
    sections: [
      {
        title: "Qué deudas suelen ser cancelables",
        body: [
          "Con la Ley de Segunda Oportunidad pueden exonerarse la mayoría de deudas privadas: préstamos personales, tarjetas, microcréditos, descubiertos o avales. La deuda pública (Hacienda y Seguridad Social) tiene límites de exoneración, por lo que la calculadora la pondera de forma más conservadora.",
          "Las deudas por intereses abusivos (revolving, microcréditos con TAE desproporcionada) pueden además anularse por usura, recuperando parte de lo pagado de más.",
        ],
      },
      {
        title: "Cómo interpretar el resultado",
        body: [
          "El importe que ves es un rango orientativo: el porcentaje real cancelable depende de tu insolvencia, del tipo de cada deuda y de tu situación patrimonial.",
          "Para saber tu cifra exacta necesitas un estudio del caso. Es gratuito, sin compromiso y con respuesta en menos de 24 horas.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Se puede cancelar el 100% de la deuda?",
        a: "En muchos casos de insolvencia sí se exonera la totalidad de la deuda cancelable. La deuda pública con Hacienda y Seguridad Social tiene topes legales de exoneración.",
      },
      {
        q: "¿La estimación es vinculante?",
        a: "No. Es orientativa para que te hagas una idea. La cifra real se determina tras estudiar tu caso concreto.",
      },
      {
        q: "¿Necesito dejar de pagar para cancelar mi deuda?",
        a: "No necesariamente. Cada estrategia es distinta; en el estudio gratuito te explicamos los pasos sin que tomes decisiones a ciegas.",
      },
    ],
    related: [
      { label: "Cancelar deudas", to: "/cancelar-deudas" },
      { label: "Ley de Segunda Oportunidad", to: "/ley-segunda-oportunidad" },
      { label: "Cancelar microcréditos", to: "/microcreditos-prestamos/cancelar-microcreditos" },
    ],
    disclaimer:
      "Estimación orientativa, no constituye asesoramiento legal ni una oferta. El importe cancelable real depende de tu caso.",
  },
  {
    slug: "calculadora-sueldo-inembargable",
    path: "/herramientas/calculadora-sueldo-inembargable",
    kind: "salary",
    navLabel: "Calculadora de sueldo inembargable",
    cardTitle: "Calculadora de sueldo inembargable",
    cardDescription:
      "Calcula cuánto de tu nómina está protegido frente a un embargo según los tramos del SMI (art. 607 LEC).",
    eyebrow: "Herramientas",
    h1: "Calculadora de sueldo inembargable (art. 607 LEC)",
    seoTitle: "Sueldo inembargable: calcula qué parte protege la ley",
    metaDescription:
      "Calcula gratis qué parte de tu nómina es inembargable y cuánto pueden retenerte según los tramos del SMI del art. 607 LEC. Resultado al instante.",
    intro:
      "Indica tu salario neto mensual y verás cuánto está protegido por ley frente a un embargo y cuánto sería embargable, tramo a tramo.",
    sections: [
      {
        title: "Cómo funciona el sueldo inembargable",
        body: [
          "El artículo 607 de la Ley de Enjuiciamiento Civil protege tu salario hasta el Salario Mínimo Interprofesional (SMI): esa parte es totalmente inembargable. A partir de ahí, el exceso se embarga por tramos crecientes.",
          `Tomando como referencia el SMI ${SMI_ANIO} (${SMI_MENSUAL.toLocaleString("es-ES")} €/mes): el primer SMI no se embarga; del SMI al doble se retiene un 30%; del doble al triple un 50%; del triple al cuádruple un 60%; del cuádruple al quíntuple un 75%; y por encima de cinco veces el SMI un 90%.`,
        ],
      },
      {
        title: "Qué hacer si te están embargando la nómina",
        body: [
          "Si te retienen más de lo que marca la ley, el embargo puede recurrirse. Y si lo que tienes es un problema de deuda de fondo, frenar el embargo es solo el primer paso: la solución es cancelar la deuda que lo origina.",
          "Revisamos tu situación gratis y te decimos si el embargo es correcto y cómo dejar de tenerlo encima.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Pueden embargarme toda la nómina?",
        a: "No. La parte equivalente al SMI es inembargable por ley. Solo se puede embargar el exceso por tramos, nunca el sueldo completo.",
      },
      {
        q: "¿Y si cobro el SMI o menos?",
        a: "Si tu salario es igual o inferior al SMI, en principio es totalmente inembargable salvo casos especiales como las pensiones de alimentos.",
      },
      {
        q: "¿Cuenta el sueldo neto o el bruto?",
        a: "Se calcula sobre el líquido que percibes (neto), después de impuestos y cotizaciones.",
      },
    ],
    related: [
      { label: "Parar un embargo", to: "/embargos/parar-embargo" },
      { label: "Ley de Segunda Oportunidad", to: "/ley-segunda-oportunidad" },
      { label: "Cancelar deudas", to: "/cancelar-deudas" },
    ],
    disclaimer:
      "Cálculo orientativo según el art. 607 LEC y el SMI de referencia. No constituye asesoramiento legal; existen excepciones (p. ej. pensiones de alimentos).",
  },
  {
    slug: "simulador-revolving-usura",
    path: "/herramientas/simulador-revolving-usura",
    kind: "revolving",
    navLabel: "Simulador revolving / usura",
    cardTitle: "Simulador de tarjetas revolving",
    cardDescription:
      "Comprueba si la TAE de tu tarjeta o microcrédito es potencialmente usuraria y cuánto pagas de más.",
    eyebrow: "Herramientas",
    h1: "Simulador de revolving: ¿pagas usura?",
    seoTitle: "Revolving: calcula si tu TAE es usura y cuánto reclamar",
    metaDescription:
      "Comprueba gratis si la TAE de tu tarjeta revolving o microcrédito es usuraria y estima cuánto pagas de más al año. Resultado inmediato.",
    intro:
      "Introduce el saldo pendiente para ver cuánto interés pagas de más frente al tipo legal de referencia y si tu deuda podría anularse por usura.",
    sections: [
      {
        title: "Cuándo una tarjeta revolving es usuraria",
        body: [
          "El Tribunal Supremo considera usurarios los créditos cuya TAE es notablemente superior al tipo medio de mercado de ese tipo de producto. En las tarjetas revolving, las TAE suelen rondar el 23-27%, muy por encima del interés legal del dinero.",
          "Cuando un crédito se declara usurario, el contrato es nulo: solo tienes que devolver el capital prestado y se anulan los intereses, comisiones y gastos. Si ya pagaste de más, puedes recuperarlo.",
        ],
      },
      {
        title: "Cómo reclamar tu tarjeta revolving",
        body: [
          "Reclamar requiere analizar el contrato y el histórico de pagos para acreditar la TAE real y compararla con la referencia de mercado en la fecha de contratación.",
          "Nosotros lo revisamos gratis: si tu tarjeta es reclamable, te decimos cuánto puedes recuperar y nos encargamos del proceso.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Qué TAE se considera usura en una revolving?",
        a: "No hay un número fijo: se compara con el tipo medio de ese producto cuando contrataste. Como referencia, TAE muy por encima del 20% suelen ser reclamables.",
      },
      {
        q: "¿Qué recupero si gano la reclamación?",
        a: "Si el crédito se declara usurario, solo devuelves el capital prestado. Los intereses, comisiones y lo pagado de más se anulan o se te devuelven.",
      },
      {
        q: "¿Sirve también para microcréditos?",
        a: "Sí. Los microcréditos con intereses desproporcionados pueden anularse por usura igual que las tarjetas revolving.",
      },
    ],
    related: [
      { label: "Cancelar tarjetas revolving", to: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
      { label: "Cancelar microcréditos", to: "/microcreditos-prestamos/cancelar-microcreditos" },
      { label: "Juicio monitorio por deuda", to: "/juicio-monitorio-recobro/juicio-monitorio-deuda" },
    ],
    disclaimer:
      "Estimación orientativa. La declaración de usura depende del contrato y del tipo medio de mercado en la fecha de contratación.",
  },
];

export const toolsByPath: Record<string, Tool> = Object.fromEntries(
  tools.map((t) => [t.path, t]),
);

export const getTool = (path: string): Tool | undefined =>
  toolsByPath[path.replace(/\/$/, "")];

const toolByKind = (kind: ToolKind): Tool | undefined =>
  tools.find((t) => t.kind === kind);

/**
 * Herramientas relevantes por cluster de money page, para el bloque
 * "Calcula tu caso". El orden importa: la primera es la más específica.
 */
const CLUSTER_TOOL_KINDS: Record<string, ToolKind[]> = {
  "ley-segunda-oportunidad": ["diagnosis", "cancelable"],
  "cancelar-deudas": ["cancelable", "diagnosis"],
  "reunificacion-deudas": ["cancelable", "diagnosis"],
  asnef: ["diagnosis", "cancelable"],
  embargos: ["salary", "diagnosis"],
  "tarjetas-revolving": ["revolving", "diagnosis"],
  "microcreditos-prestamos": ["revolving", "diagnosis"],
  "autonomos-concurso-acreedores": ["diagnosis", "cancelable"],
  "juicio-monitorio-recobro": ["salary", "diagnosis"],
  "deudas-hacienda-seguridad-social": ["salary", "diagnosis"],
};

/** Devuelve las herramientas relevantes para un cluster de money page. */
export const toolsForCluster = (cluster: string): Tool[] => {
  const kinds = CLUSTER_TOOL_KINDS[cluster] ?? ["diagnosis", "cancelable"];
  return kinds.map(toolByKind).filter((t): t is Tool => Boolean(t));
};