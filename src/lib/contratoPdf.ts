import { jsPDF } from "jspdf";

export type ContractFields = {
  fullName: string;
  dni: string;
  address: string;
  email: string;
  phone: string;
  service: string;
  /** Honorarios libres (texto). Respaldo si no hay desglose de pago. */
  fee: string;
  /** Pago inicial / provisión de fondos (€). */
  initialPayment: string;
  /** Número de cuotas mensuales. */
  installments: string;
  /** Importe de cada cuota mensual (€). */
  installmentAmount: string;
  /** Localidad de firma. */
  signCity: string;
};

export const emptyContract = (): ContractFields => ({
  fullName: "",
  dni: "",
  address: "",
  email: "",
  phone: "",
  service: "",
  fee: "",
  initialPayment: "150",
  installments: "30",
  installmentAmount: "99",
  signCity: "",
});

// Datos del despacho (entidad jurídica real detrás de Calma).
const FIRM = {
  brand: "LEXITIA",
  legal: "NOVA INITIA SERVICIOS JURIDICOS, S.L.",
  nif: "B22497283",
  address: "C/ Litio, 10, 28946 Fuenlabrada (Madrid)",
  email: "hola@lexitia.com",
};

const eur = (n: number): string =>
  new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);

const num = (v: string): number => {
  const n = parseFloat(
    String(v).replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", "."),
  );
  return Number.isFinite(n) ? n : 0;
};

/** Calcula el total del encargo: pago inicial + (nº cuotas × importe cuota). */
export const computeContractTotal = (c: ContractFields) => {
  const initial = num(c.initialPayment);
  const installments = Math.max(0, Math.round(num(c.installments)));
  const amount = num(c.installmentAmount);
  const installmentsTotal = installments * amount;
  const total = initial + installmentsTotal;
  return { initial, installments, amount, installmentsTotal, total };
};

/** Texto legible de la modalidad de pago. */
export const paymentSummary = (c: ContractFields): string => {
  const { initial, installments, amount, total } = computeContractTotal(c);
  if (total <= 0) return c.fee || "según condiciones acordadas entre las partes";
  return `${eur(total)} € IVA incluido — ${eur(initial)} € iniciales y ${installments} cuotas mensuales de ${eur(amount)} €`;
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  lso: "tramitación del procedimiento de la Ley de Segunda Oportunidad (mecanismo de segunda oportunidad para la exoneración del pasivo insatisfecho)",
  reunificar:
    "negociación extrajudicial con las entidades acreedoras para la reducción de la cuota mensual y del importe total de la deuda",
  reclamacion:
    "reclamación judicial por usura frente a las entidades financieras correspondientes y recuperación de las cantidades pagadas en exceso",
};

const serviceLine = (service: string): string =>
  SERVICE_DESCRIPTIONS[service] ||
  service ||
  "servicios profesionales de asesoramiento en materia de deudas";

// Fuente embebida (Arimo, métrica compatible con Helvetica). Se embebe en el
// PDF para evitar el bug de solapamiento de glifos de la Helvetica no embebida
// de jsPDF. Se cachea tras la primera carga.
let fontCache: { regular: string; bold: string } | null = null;

const toBase64 = (buf: ArrayBuffer): string => {
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

const loadFonts = async (): Promise<{ regular: string; bold: string }> => {
  if (fontCache) return fontCache;
  const [reg, bold] = await Promise.all([
    fetch("/fonts/Arimo-Regular.ttf").then((r) => r.arrayBuffer()),
    fetch("/fonts/Arimo-Bold.ttf").then((r) => r.arrayBuffer()),
  ]);
  fontCache = { regular: toBase64(reg), bold: toBase64(bold) };
  return fontCache;
};

const registerFonts = async (doc: jsPDF): Promise<string> => {
  try {
    const fonts = await loadFonts();
    doc.addFileToVFS("Arimo-Regular.ttf", fonts.regular);
    doc.addFont("Arimo-Regular.ttf", "Arimo", "normal");
    doc.addFileToVFS("Arimo-Bold.ttf", fonts.bold);
    doc.addFont("Arimo-Bold.ttf", "Arimo", "bold");
    return "Arimo";
  } catch {
    // Si falla la carga de la fuente, usa la fuente estándar como respaldo.
    return "helvetica";
  }
};

// Genera la HOJA DE ENCARGO PROFESIONAL (Ley de Segunda Oportunidad)
// con los datos del caso, replicando la plantilla legal de LEXITIA.
export const generateContractPdf = async (c: ContractFields): Promise<jsPDF> => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const FONT = await registerFonts(doc);
  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const today = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const ensureSpace = (needed = 60) => {
    if (y > 800 - needed) {
      doc.addPage();
      y = margin;
    }
  };

  const heading = (text: string) => {
    doc.setFont(FONT, "bold");
    doc.setFontSize(11);
    ensureSpace(46);
    y += 10;
    doc.text(text, margin, y);
    y += 16;
  };

  const paragraph = (
    text: string,
    opts?: { bullet?: boolean; bold?: boolean },
  ) => {
    doc.setFont(FONT, opts?.bold ? "bold" : "normal");
    doc.setFontSize(10);
    const indent = opts?.bullet ? 14 : 0;
    const lines = doc.splitTextToSize(text, maxWidth - indent) as string[];
    lines.forEach((line, i) => {
      ensureSpace(24);
      if (opts?.bullet && i === 0) doc.text("•", margin, y);
      doc.text(line, margin + indent, y);
      y += 14;
    });
    y += 6;
  };

  // Encabezado del despacho
  doc.setFont(FONT, "bold");
  doc.setFontSize(10);
  doc.text(`${FIRM.brand} — ${FIRM.legal}`, margin, y);
  y += 13;
  doc.setFont(FONT, "normal");
  doc.setFontSize(8.5);
  doc.text(`${FIRM.address} | NIF ${FIRM.nif} | ${FIRM.email}`, margin, y);
  y += 24;

  // Título
  doc.setFont(FONT, "bold");
  doc.setFontSize(14);
  doc.text("HOJA DE ENCARGO PROFESIONAL", margin, y);
  y += 18;
  doc.text("LEY DE SEGUNDA OPORTUNIDAD", margin, y);
  y += 22;

  // Encabezado del encargo (datos del cliente)
  paragraph(
    `D./Dña. ${c.fullName || "_____________________"}, mayor de edad, con domicilio en ${
      c.address || "_____________________"
    }, teléfono ${c.phone || "___________"}, correo electrónico ${
      c.email || "___________"
    } y NIF nº ${c.dni || "_____________"}, encarga profesionalmente a ${FIRM.legal} (${
      FIRM.brand
    }), con NIF ${FIRM.nif} y domicilio social en ${FIRM.address}, la asistencia jurídica para la ${serviceLine(
      c.service,
    )}.`,
  );

  heading("OBJETO DEL ENCARGO");
  paragraph(
    "La prestación se realiza en régimen de arrendamiento de servicios profesionales y comprende el análisis de viabilidad, revisión documental, preparación de la demanda, presentación ante el juzgado competente y asesoramiento durante la fase principal del procedimiento hasta su resolución judicial, de conformidad con la normativa concursal aplicable.",
  );

  heading("DECLARACIONES Y OBLIGACIONES DEL CLIENTE");
  paragraph(
    "El CLIENTE declara encontrarse en situación de insolvencia actual o inminente y haber sido informado de los requisitos, límites y consecuencias del procedimiento.",
    { bullet: true },
  );
  paragraph(
    "El CLIENTE se compromete a facilitar información completa, veraz y actualizada sobre sus ingresos, bienes, deudas, antecedentes y documentación requerida.",
    { bullet: true },
  );
  paragraph(
    "El CLIENTE asume la responsabilidad sobre la autenticidad e integridad de la documentación aportada y se obliga a colaborar diligentemente durante toda la tramitación.",
    { bullet: true },
  );
  paragraph(
    "El CLIENTE reconoce que determinadas deudas pueden no ser exonerables conforme a la Ley Concursal, entre ellas las legalmente excluidas y los créditos públicos en los límites establecidos.",
    { bullet: true },
  );

  heading("HONORARIOS PROFESIONALES");
  paragraph(
    "Los honorarios incluyen la asistencia letrada y el asesoramiento profesional en la fase principal del procedimiento, conforme a la siguiente modalidad de pago:",
  );
  const pay = computeContractTotal(c);
  if (pay.total > 0) {
    paragraph(`Importe total: ${eur(pay.total)} € (IVA incluido).`, {
      bullet: true,
      bold: true,
    });
    paragraph(
      `Forma de pago: ${eur(pay.initial)} € iniciales (provisión de fondos) y ${pay.installments} cuotas mensuales de ${eur(
        pay.amount,
      )} € (total cuotas: ${eur(pay.installmentsTotal)} €).`,
      { bullet: true },
    );
  } else {
    paragraph(`Honorarios: ${c.fee || "_____________"}.`, { bullet: true });
  }

  heading("CONDICIONES DE PAGO");
  paragraph(
    `El pago inicial de ${pay.initial > 0 ? eur(pay.initial) : "___"} € tendrá la consideración de provisión de fondos para apertura de expediente y primeras actuaciones, y no será reembolsable una vez iniciadas las actuaciones, salvo supuestos legalmente previstos.`,
    { bullet: true },
  );
  paragraph(
    "Las cuotas se cargarán dentro de los cinco primeros días de cada mes mediante tarjeta bancaria o domiciliación bancaria SEPA, según el método autorizado por el CLIENTE.",
    { bullet: true },
  );
  paragraph(
    "En caso de impago o devolución de cuotas, LEXITIA podrá suspender el servicio, resolver el encargo y reclamar las cantidades vencidas o pendientes que correspondan.",
    { bullet: true },
  );

  heading("GASTOS, SUPLIDOS Y PROFESIONALES EXTERNOS");
  paragraph(
    "Quedan excluidos y se facturan aparte los costes de obtención de documentos oficiales, certificados, notas registrales, burofaxes u otros gastos necesarios para el expediente.",
    { bullet: true },
  );
  paragraph(
    "No se incluyen los honorarios de profesionales externos a LEXITIA, tales como procurador, notario o administrador concursal, si fueran necesarios o fueran designados durante la tramitación.",
    { bullet: true },
  );
  paragraph(
    "Los honorarios del letrado, procurador y administrador concursal, si lo hubiere, tendrán la consideración que corresponda conforme a la normativa concursal y deberán satisfacerse según lo pactado.",
    { bullet: true },
  );

  heading("DURACIÓN, DESISTIMIENTO Y ALCANCE");
  paragraph(
    "El encargo se mantendrá vigente durante la tramitación del procedimiento hasta su finalización, sin perjuicio del cumplimiento íntegro de las obligaciones económicas asumidas por el CLIENTE.",
    { bullet: true },
  );
  paragraph(
    "Si el contrato se formaliza a distancia o fuera de establecimiento mercantil, el CLIENTE podrá ejercitar el derecho de desistimiento en el plazo legal de catorce días naturales desde la firma.",
    { bullet: true },
  );
  paragraph(
    "Una vez presentada la demanda ante el juzgado competente, el desistimiento unilateral del CLIENTE no extingue la obligación de pago del precio pactado, salvo acuerdo expreso o causa legal aplicable.",
    { bullet: true },
  );
  paragraph(
    "Quedan excluidos los incidentes concursales, procedimientos accesorios y recursos que pudieran plantearse, salvo pacto escrito específico entre las partes.",
    { bullet: true },
  );

  heading("GARANTÍA COMERCIAL DE ÉXITO");
  paragraph(
    "LEXITIA ofrece una garantía comercial vinculada al cumplimiento diligente del encargo y al resultado jurídicamente viable previamente informado al CLIENTE según su situación personal, patrimonial y económica.",
    { bullet: true },
  );
  paragraph(
    "La garantía no constituye una obligación de resultado absoluto ni asegura necesariamente la exoneración total del pasivo, al depender el procedimiento de requisitos legales, resoluciones judiciales y circunstancias propias del CLIENTE.",
    { bullet: true },
  );
  paragraph(
    "En todo caso, tendrá carácter no reembolsable la cantidad de 500 €, correspondiente a costes administrativos, análisis de viabilidad, preparación documental inicial y gastos estructurales del expediente.",
    { bullet: true },
  );

  heading("PROTECCIÓN DE DATOS DE CARÁCTER PERSONAL");
  paragraph(
    `En cumplimiento del Reglamento (UE) 2016/679 y de la Ley Orgánica 3/2018, los datos facilitados serán tratados por ${FIRM.legal}, con NIF ${FIRM.nif} y domicilio en ${FIRM.address}, como responsable del tratamiento, con la finalidad de gestionar la relación contractual, tramitar el expediente, realizar la facturación y cumplir las obligaciones legales aplicables. Los datos podrán comunicarse, cuando resulte necesario, a órganos judiciales, notarios, procuradores, administradores concursales y otros profesionales intervinientes. El CLIENTE podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad dirigiéndose al domicilio social indicado o al correo ${FIRM.email}.`,
  );

  heading("JURISDICCIÓN");
  paragraph(
    "Para cualquier controversia derivada del presente encargo, las partes se someten a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable, con preferencia por los del domicilio del CLIENTE cuando proceda legalmente.",
  );

  ensureSpace(110);
  y += 6;
  paragraph(`En ${c.signCity || "____________________"}, a ${today}.`);

  y += 24;
  ensureSpace(80);
  doc.setFont(FONT, "bold");
  doc.setFontSize(10);
  doc.text("EL CLIENTE", margin, y);
  doc.text("LEXITIA", pageWidth / 2 + 20, y);
  y += 50;
  doc.setFont(FONT, "normal");
  doc.text(`Fdo.: ${c.fullName || "____________________"}`, margin, y);
  doc.text(`Fdo.: ${FIRM.legal}`, pageWidth / 2 + 20, y);

  return doc;
};

export const downloadContractPdf = async (c: ContractFields) => {
  const doc = await generateContractPdf(c);
  const safe = (c.fullName || "cliente")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .toLowerCase();
  doc.save(`hoja-encargo-${safe}.pdf`);
};
