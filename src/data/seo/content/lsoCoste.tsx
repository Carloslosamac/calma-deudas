import type { MoneyContent } from "./types";
import { A, KeyCallout, WarningCallout, FactGrid } from "@/components/seo/modules";

/**
 * Sub-pillar "Coste de la Ley de Segunda Oportunidad". Ángulo: transparencia
 * de honorarios + desmontar el "gratis" del marketing agresivo.
 */
export const lsoCoste: MoneyContent = {
  path: "/ley-segunda-oportunidad/coste-precio",
  directAnswer: {
    question: "¿Cuánto cuesta acogerse a la Ley de Segunda Oportunidad?",
    answer:
      "El coste real oscila entre 2.000 € y 4.500 € en honorarios de abogado y procurador (según complejidad, número de acreedores y tribunal), más tasas judiciales moderadas. La 'LSO gratis' con la que anuncian algunas firmas es marketing: alguien paga el proceso, pero el trabajo jurídico no es gratis. En Calma damos presupuesto cerrado y pago fraccionable.",
    plain:
      "El coste real oscila entre 2.000 € y 4.500 € en honorarios de abogado y procurador (según complejidad, número de acreedores y tribunal), más tasas judiciales moderadas. La 'LSO gratis' con la que anuncian algunas firmas es marketing: alguien paga el proceso, pero el trabajo jurídico no es gratis. En Calma damos presupuesto cerrado y pago fraccionable.",
  },
  reviewed: false,
  tone: "transactional",
  layout: ["benefits", "sections", "faq", "closing"],
  intro: (
    <>
      El <strong>coste de la Ley de Segunda Oportunidad</strong> no es un misterio: son
      honorarios de abogado, procurador y tasas judiciales. Aquí te contamos el rango real y
      por qué "gratis" casi nunca lo es. Presupuesto cerrado sin sorpresas.
    </>
  ),
  hero: {
    badge: "Coste real LSO 2026",
    titleLead: "Cuánto cuesta de verdad la",
    titleAccent: "Ley de Segunda Oportunidad.",
    subtitle: (
      <>
        Rango de honorarios, tasas y por qué la publicidad de <strong>"LSO 100% gratis"</strong> es
        casi siempre un reclamo. Te damos el presupuesto cerrado antes de empezar.
      </>
    ),
    trustNote: "Presupuesto cerrado · Pago fraccionable",
  },
  benefitsTitle: "Qué compone el precio",
  benefits: [
    { icon: "scale", title: "Honorarios de abogado", text: "El grueso del coste: análisis, expediente y defensa." },
    { icon: "gavel", title: "Procurador", text: "Obligatorio para representarte ante el juzgado en muchos trámites." },
    { icon: "landmark", title: "Tasas judiciales", text: "Reducidas o exentas para personas físicas insolventes." },
    { icon: "clock", title: "Complejidad del caso", text: "Nº de acreedores, deuda pública, activos y tribunal condicionan el precio." },
    { icon: "wallet", title: "Pago fraccionable", text: "En Calma dividimos el presupuesto para que no sea un obstáculo." },
    { icon: "shield", title: "Sin costes ocultos", text: "Presupuesto cerrado por escrito antes de iniciar el expediente." },
  ],
  sections: [
    {
      title: "Rangos reales del mercado en España",
      body: (
        <FactGrid
          columns={3}
          items={[
            { value: "2.000–2.800 €", label: "Caso sencillo", detail: "Particular con pocos acreedores privados y sin deuda pública compleja." },
            { value: "2.800–3.800 €", label: "Caso medio", detail: "Autónomo con deudas mixtas o algún activo que valorar." },
            { value: "3.800–4.500 €+", label: "Caso complejo", detail: "Múltiples acreedores, deuda pública alta, vivienda con hipoteca activa." },
          ]}
        />
      ),
    },
    {
      title: "El mito de la 'LSO gratis'",
      body: (
        <WarningCallout title="Cuidado con la publicidad engañosa">
          <p>Algunas firmas anuncian "cancelación de deudas gratis". La ley no permite trabajo jurídico sin remunerar, así que <strong>el coste está en algún lado</strong>: dilatado en el tiempo, condicionado a resultado o recuperado con comisiones.</p>
          <p>Preguntas que debes exigir: <em>¿me firmas presupuesto cerrado por escrito?</em> · <em>¿qué pasa si el juzgado no exonera?</em> · <em>¿hay penalizaciones por pausar el caso?</em></p>
        </WarningCallout>
      ),
    },
    {
      title: "Cuánto ahorras vs. cuánto pagas",
      body: (
        <KeyCallout eyebrow="La aritmética" headline="Cancelar 60.000 € pagando 3.000 € es cambiar el 5%.">
          <p>La LSO tiene sentido cuando la deuda cancelada supera con claridad el coste del procedimiento. Si tu deuda es baja o negociable, hay <A to="/reunificar-deudas">otras vías</A> más razonables — y te lo diremos gratis.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Cómo pagamos en Calma",
      body: (
        <ul className="space-y-2 list-disc pl-5 text-base leading-relaxed text-foreground/85">
          <li><strong>Presupuesto cerrado</strong> firmado antes de iniciar.</li>
          <li><strong>Pago fraccionable</strong> en cuotas mensuales adaptadas.</li>
          <li><strong>Sin comisiones por resultado</strong>: el precio no cambia si se exonera todo o parte.</li>
          <li><strong>Sin penalización</strong> si decides no continuar tras el diagnóstico.</li>
        </ul>
      ),
    },
  ],
  closing: {
    title: "Presupuesto claro antes de decidir",
    text: "Te decimos exactamente cuánto costaría tu caso y cuánto deuda podrías cancelar. Análisis gratis en 24h.",
  },
  faq: [
    { q: "¿Es cierto que la LSO puede ser gratis?", a: (<>La justicia gratuita puede cubrirla si cumples requisitos de renta muy exigentes. Fuera de ese supuesto, "gratis" suele ser marketing.</>), plain: "La justicia gratuita puede cubrirla si cumples requisitos de renta muy exigentes. Fuera de ese supuesto, gratis suele ser marketing." },
    { q: "¿Puedo pagar a plazos los honorarios?", a: (<>Sí. En Calma fraccionamos el presupuesto para que no sea un obstáculo mientras dura el proceso.</>), plain: "Sí. En Calma fraccionamos el presupuesto para que no sea un obstáculo mientras dura el proceso." },
    { q: "¿Qué pasa si el juzgado no exonera todo?", a: (<>El coste del procedimiento no cambia. Si el juez concede exoneración parcial o plan de pagos, te acompañamos en la ejecución.</>), plain: "El coste del procedimiento no cambia. Si el juez concede exoneración parcial o plan de pagos, te acompañamos en la ejecución." },
    { q: "¿Cuánto cobra el procurador?", a: (<>Los aranceles del procurador están regulados y son moderados. Van incluidos en el presupuesto cerrado que firmamos.</>), plain: "Los aranceles del procurador están regulados y son moderados. Van incluidos en el presupuesto cerrado que firmamos." },
  ],
};