import type { MoneyContent } from "./types";
import { A, KeyCallout, WarningCallout, CheckList } from "@/components/seo/modules";

/**
 * Perfil "LSO para autónomos". Ángulo: AEAT y Seguridad Social + supervivencia
 * de la actividad tras exonerar.
 */
export const lsoAutonomos: MoneyContent = {
  path: "/ley-segunda-oportunidad/perfiles/autonomos",
  directAnswer: {
    question: "¿Un autónomo puede acogerse a la Ley de Segunda Oportunidad?",
    answer:
      "Sí. La LSO está pensada para particulares y autónomos de buena fe en insolvencia. Cancela la deuda privada (bancos, proveedores, tarjetas) y exonera con límites la deuda pública (Hacienda y Seguridad Social). El autónomo puede seguir trabajando durante y después del procedimiento. Analizamos gratis si la LSO o el concurso encaja mejor con tu caso.",
    plain:
      "Sí. La LSO está pensada para particulares y autónomos de buena fe en insolvencia. Cancela la deuda privada y exonera con límites la deuda pública. El autónomo puede seguir trabajando durante y después del procedimiento.",
  },
  reviewed: false,
  tone: "legal",
  layout: ["benefits", "sections", "exonerationLimits", "eligibility", "faq", "closing"],
  intro: (
    <>
      La <strong>Ley de Segunda Oportunidad para autónomos</strong> cancela la deuda privada
      completa y exonera con límites la deuda con Hacienda y Seguridad Social. Puedes seguir
      facturando durante el procedimiento. Diagnóstico gratis para tu caso.
    </>
  ),
  hero: {
    badge: "LSO Autónomos 2026",
    titleLead: "Ley de Segunda Oportunidad para",
    titleAccent: "autónomos con deudas.",
    subtitle: (
      <>
        Cancela deuda de bancos, proveedores y tarjetas. Exonera con límites la de{" "}
        <strong>AEAT y Seguridad Social</strong>. Y sigues trabajando durante todo el proceso.
      </>
    ),
    trustNote: "Análisis gratis · Compatible con la actividad",
  },
  benefitsTitle: "Qué te aporta si eres autónomo",
  benefits: [
    { icon: "wallet", title: "Cancela deuda privada", text: "Bancos, financieras, proveedores, tarjetas, particulares." },
    { icon: "landmark", title: "Exonera deuda pública con límites", text: "Hacienda y Seguridad Social se exoneran por tramos regulados." },
    { icon: "shield", title: "Sigues facturando", text: "El procedimiento no impide continuar con la actividad profesional." },
    { icon: "gavel", title: "Frena embargos y apremios", text: "Suspende embargos de nómina, cuentas y apremios administrativos." },
    { icon: "sparkles", title: "Salva la actividad", text: "En muchos casos permite conservar herramientas y bienes necesarios." },
    { icon: "scale", title: "Concurso persona física o LSO", text: "Elegimos la vía que mejor encaja con tu caso concreto." },
  ],
  interactive: {
    exonerationLimits: {
      title: "Límites de exoneración de la deuda pública",
      subtitle: "Cómo se distribuye la deuda con Hacienda y Seguridad Social.",
      items: [
        { label: "AEAT / Hacienda", text: "Se exonera hasta cierto umbral por tramos regulados; el resto se acomoda en plan de pagos asumible." },
        { label: "Seguridad Social / TGSS", text: "Mismo esquema: exoneración parcial por tramos y plan de pagos para el resto." },
        { label: "Deuda privada", text: "Sin límite de importe: si el juez concede la exoneración, se cancela en su totalidad la que reúna requisitos." },
      ],
      note: "Los tramos se actualizan por normativa; te damos el cálculo concreto de tu caso en el diagnóstico.",
    },
  },
  sections: [
    {
      title: "AEAT y TGSS: qué se cancela y qué se paga",
      body: (
        <WarningCallout title="La parte pública no desaparece entera">
          <p>Lo importante para un autónomo es entender que <strong>Hacienda y Seguridad Social se exoneran con topes</strong>. La parte que supera esos topes queda en un <strong>plan de pagos asumible</strong>, no desaparece.</p>
          <p>Pero el resto — bancos, tarjetas, proveedores, préstamos personales, avales — sí puede cancelarse por completo si se cumplen los requisitos.</p>
        </WarningCallout>
      ),
    },
    {
      title: "LSO vs. concurso de persona física para autónomos",
      body: (
        <KeyCallout eyebrow="Elegir vía" headline="No siempre es la LSO 'tal cual': a veces conviene el concurso.">
          <p>Si tu actividad tiene muchos acreedores y bienes que ordenar, el <A to="/autonomos-concurso-acreedores/concurso-persona-fisica">concurso de persona física</A> puede ser mejor. En Calma analizamos qué vía protege más tu actividad.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Sigues facturando durante el procedimiento",
      body: (
        <CheckList
          variant="check"
          items={[
            "No se te impide seguir facturando como autónomo.",
            "Los ingresos de tu actividad quedan protegidos dentro del tramo inembargable.",
            "Puedes mantener el alta en el RETA y en Hacienda.",
            "Los bienes necesarios para la actividad suelen quedar fuera de la liquidación.",
          ]}
        />
      ),
    },
  ],
  eligibility: {
    title: "¿Encaja la LSO en tu caso de autónomo?",
    intro: <>Marca cuántas de estas frases te describen:</>,
    requirements: [
      "Eres autónomo con actividad activa, suspendida o cerrada recientemente.",
      "Tienes deudas con bancos, proveedores, tarjetas o particulares.",
      "Puede que tengas deudas con AEAT o Seguridad Social.",
      "Tus ingresos actuales no llegan para pagar todo.",
      "No has ocultado bienes ni ingresos.",
    ],
  },
  closing: {
    title: "Sálvate y salva tu actividad",
    text: "Cuanto antes analizamos tu caso, más margen para conservar lo importante. Diagnóstico gratis.",
  },
  faq: [
    { q: "¿Puedo seguir siendo autónomo tras la LSO?", a: (<>Sí. Ni la LSO ni el concurso te inhabilitan como autónomo. Puedes seguir trabajando.</>), plain: "Sí. Ni la LSO ni el concurso te inhabilitan como autónomo." },
    { q: "¿Y las cuotas actuales del RETA?", a: (<>Las cuotas presentes se siguen abonando durante el procedimiento; solo se aborda la deuda acumulada.</>), plain: "Las cuotas presentes se siguen abonando durante el procedimiento; solo se aborda la deuda acumulada." },
    { q: "¿Se cancelan sanciones de Hacienda?", a: (<>Los recargos y sanciones administrativas suelen quedar fuera de la exoneración. Sí se aborda el principal por los tramos legales.</>), plain: "Los recargos y sanciones administrativas suelen quedar fuera de la exoneración. Sí se aborda el principal." },
    { q: "¿Y las deudas con proveedores?", a: (<>Deuda privada. Se cancela por completo si se cumplen los requisitos de la LSO.</>), plain: "Deuda privada. Se cancela por completo si se cumplen los requisitos de la LSO." },
  ],
};