import { jsPDF } from "jspdf";

export type ContractFields = {
  fullName: string;
  dni: string;
  address: string;
  email: string;
  phone: string;
  service: string;
  fee: string;
};

export const emptyContract = (): ContractFields => ({
  fullName: "",
  dni: "",
  address: "",
  email: "",
  phone: "",
  service: "",
  fee: "",
});

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  lso: "tramitación del procedimiento de la Ley de Segunda Oportunidad (mecanismo de segunda oportunidad para la exoneración del pasivo insatisfecho)",
  reunificar:
    "negociación extrajudicial con las entidades acreedoras para la reducción de la cuota mensual y del importe total de la deuda",
  reclamacion:
    "reclamación judicial por usura frente a las entidades financieras correspondientes y recuperación de las cantidades pagadas en exceso",
};

const serviceLine = (service: string): string =>
  SERVICE_DESCRIPTIONS[service] ??
  service ||
  "servicios profesionales de asesoramiento en materia de deudas";

// Genera un PDF base de contrato de prestación de servicios profesionales
// con los datos del caso. Es una PLANTILLA editable, no asesoría legal final.
export const generateContractPdf = (c: ContractFields): jsPDF => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const today = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const heading = (text: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    if (y > 760) {
      doc.addPage();
      y = margin;
    }
    y += 8;
    doc.text(text, margin, y);
    y += 16;
  };

  const paragraph = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    lines.forEach((line) => {
      if (y > 780) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 14;
    });
    y += 6;
  };

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Calma", margin, y);
  doc.setFontSize(13);
  y += 26;
  doc.text("CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES", margin, y);
  y += 22;

  paragraph(`En España, a ${today}.`);

  heading("REUNIDOS");
  paragraph(
    "De una parte, Calma (en adelante, «el Prestador»), con domicilio profesional en España, que presta servicios de asesoramiento y gestión en materia de deudas.",
  );
  paragraph(
    `Y de otra parte, D./Dª. ${c.fullName || "_____________________"}, con DNI/NIE ${
      c.dni || "_____________"
    }, con domicilio en ${c.address || "_____________________"}, teléfono ${
      c.phone || "___________"
    } y correo electrónico ${c.email || "___________"} (en adelante, «el Cliente»).`,
  );
  paragraph(
    "Ambas partes se reconocen mutuamente capacidad legal suficiente para contratar y obligarse y, a tal efecto,",
  );

  heading("EXPONEN");
  paragraph(
    `Que el Cliente está interesado en contratar los servicios profesionales del Prestador consistentes en la ${serviceLine(
      c.service,
    )}.`,
  );
  paragraph(
    "Que ambas partes acuerdan suscribir el presente contrato con arreglo a las siguientes",
  );

  heading("CLÁUSULAS");
  paragraph(
    `PRIMERA. Objeto. El Prestador se compromete a realizar para el Cliente la ${serviceLine(
      c.service,
    )}, con la diligencia profesional exigible.`,
  );
  paragraph(
    `SEGUNDA. Honorarios. El Cliente abonará al Prestador en concepto de honorarios la cantidad de ${
      c.fee || "_____________"
    }, en las condiciones y plazos que se acuerden entre las partes.`,
  );
  paragraph(
    "TERCERA. Obligaciones del Cliente. El Cliente facilitará al Prestador toda la documentación e información veraz necesaria para la correcta prestación del servicio y colaborará activamente durante todo el procedimiento.",
  );
  paragraph(
    "CUARTA. Duración. El presente contrato estará vigente desde su firma hasta la finalización del servicio contratado.",
  );
  paragraph(
    "QUINTA. Protección de datos. Los datos personales facilitados serán tratados por el Prestador conforme al Reglamento (UE) 2016/679 (RGPD) y la normativa española de protección de datos, con la finalidad de prestar el servicio contratado.",
  );
  paragraph(
    "SEXTA. Desistimiento. El Cliente podrá ejercer su derecho de desistimiento en los términos previstos en la normativa de consumidores y usuarios aplicable.",
  );
  paragraph(
    "Y en prueba de conformidad, ambas partes firman el presente contrato por duplicado y a un solo efecto en el lugar y fecha indicados.",
  );

  y += 24;
  if (y > 720) {
    doc.addPage();
    y = margin;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("El Prestador (Calma)", margin, y);
  doc.text("El Cliente", pageWidth / 2 + 20, y);
  y += 50;
  doc.setFont("helvetica", "normal");
  doc.text("Fdo.: ____________________", margin, y);
  doc.text(
    `Fdo.: ${c.fullName || "____________________"}`,
    pageWidth / 2 + 20,
    y,
  );

  return doc;
};

export const downloadContractPdf = (c: ContractFields) => {
  const doc = generateContractPdf(c);
  const safe = (c.fullName || "cliente").replace(/[^\p{L}\p{N}]+/gu, "-").toLowerCase();
  doc.save(`contrato-calma-${safe}.pdf`);
};