import type { MoneyContent } from "./types";
import { A, KeyCallout, CheckList, WarningCallout } from "@/components/seo/modules";

/**
 * Perfil "LSO para pensionistas y jubilados". Ángulo: pensión inembargable
 * por tramos + preservación del nivel de vida.
 */
export const lsoPensionistas: MoneyContent = {
  path: "/ley-segunda-oportunidad/perfiles/pensionistas-jubilados",
  directAnswer: {
    question: "¿Un pensionista puede acogerse a la Ley de Segunda Oportunidad?",
    answer:
      "Sí. La ley ampara a cualquier persona física insolvente y de buena fe, incluidos jubilados y pensionistas. Tu pensión tiene tramos inembargables (hasta el SMI, 100% protegida) y la LSO puede cancelar deudas con bancos, tarjetas y avales firmados a familiares. Diagnóstico gratis en 24h.",
    plain:
      "Sí. La ley ampara a cualquier persona física insolvente y de buena fe. La pensión tiene tramos inembargables y la LSO puede cancelar deudas con bancos, tarjetas y avales.",
  },
  reviewed: false,
  tone: "calm",
  layout: ["benefits", "sections", "eligibility", "faq", "closing"],
  intro: (
    <>
      Si eres <strong>pensionista o jubilado con deudas</strong>, la Ley de Segunda Oportunidad
      te ampara y protege tu pensión. Hasta el SMI es 100% inembargable. Aquí te explicamos
      cómo, sin arriesgar tu tranquilidad.
    </>
  ),
  hero: {
    badge: "LSO Pensionistas 2026",
    titleLead: "Protege tu pensión y cancela tus",
    titleAccent: "deudas con la LSO.",
    subtitle: (
      <>
        La <strong>pensión hasta el SMI es 100% inembargable</strong>. La LSO además cancela
        deudas con bancos, tarjetas y avales firmados a familiares.
      </>
    ),
    trustNote: "Análisis gratis · Pensión protegida",
  },
  benefitsTitle: "Qué te aporta como pensionista",
  benefits: [
    { icon: "shield", title: "Pensión inembargable hasta el SMI", text: "El primer tramo (~1.184 €/mes en 2026) está 100% protegido." },
    { icon: "gavel", title: "Frena embargos activos", text: "Suspende embargos sobre pensión, cuentas y bienes desde el inicio." },
    { icon: "wallet", title: "Cancela deuda privada", text: "Bancos, tarjetas revolving, microcréditos, avales firmados a familiares." },
    { icon: "landmark", title: "Vivienda habitual protegible", text: "Si está hipotecada al día, muchos juzgados permiten conservarla." },
    { icon: "sparkles", title: "Sales de ASNEF", text: "Salen los ficheros de morosidad vinculados a la deuda exonerada." },
    { icon: "clock", title: "Reconstruyes tu tranquilidad", text: "Cancelado el pasivo, vuelves a vivir con la pensión sin descontar cuotas." },
  ],
  sections: [
    {
      title: "La pensión siempre tiene un tramo protegido",
      body: (
        <KeyCallout eyebrow="Sueldo/pensión inembargable" headline="Hasta el SMI la pensión es intocable, con o sin LSO.">
          <p>La escala inembargable protege el <strong>primer tramo hasta el SMI</strong> (~1.184 €/mes en 2026). Por encima se aplica una escala progresiva. Con la LSO, además, los embargos activos se suspenden.</p>
          <p>Puedes ver tu tramo real con nuestro <A to="/herramientas/calculadora-sueldo-inembargable">calculador de sueldo inembargable</A>, que también sirve para pensiones.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Deudas típicas que la LSO cancela a un pensionista",
      body: (
        <CheckList
          variant="check"
          items={[
            "Tarjetas revolving con TAE superior al 20%.",
            "Préstamos personales para cubrir gastos familiares.",
            "Microcréditos en cadena para imprevistos médicos o de vivienda.",
            "Avales firmados a hijos que impagan.",
            "Deudas heredadas por aceptación pura y simple.",
          ]}
        />
      ),
    },
    {
      title: "Antes de firmar cualquier reunificación privada",
      body: (
        <WarningCallout title="Ojo con las 'reunificaciones milagro'">
          <p>Muchos pensionistas caen en refinanciaciones agresivas con hipoteca sobre la vivienda o con TAE altísimo. Antes de firmar, <strong>compárate con la LSO</strong>: en muchos casos es mejor cancelar que arrastrar la deuda 20 años más.</p>
          <p>Lo comparamos gratis en el diagnóstico.</p>
        </WarningCallout>
      ),
    },
  ],
  eligibility: {
    title: "¿Encaja la LSO en tu situación?",
    intro: <>Estas señales dicen que sí:</>,
    requirements: [
      "Eres pensionista de jubilación, invalidez, viudedad u orfandad.",
      "Tienes deudas con bancos, tarjetas, microcréditos o avales.",
      "Tu pensión no llega para cubrir todas las cuotas.",
      "Estás en ASNEF o con embargos sobre la pensión.",
      "No has ocultado bienes ni ingresos.",
    ],
  },
  closing: {
    title: "Tu jubilación no debería ser una cárcel",
    text: "Cancela las deudas y vive tu pensión en paz. Diagnóstico gratis en 24h para pensionistas.",
  },
  faq: [
    { q: "¿Se puede embargar toda mi pensión?", a: (<>No. Hasta el SMI es 100% inembargable. Por encima, la escala progresiva protege un porcentaje.</>), plain: "No. Hasta el SMI es 100% inembargable. Por encima, la escala progresiva protege un porcentaje." },
    { q: "¿La LSO afecta al cobro futuro de mi pensión?", a: (<>No. La pensión sigue igual: la LSO cancela deudas, no toca prestaciones.</>), plain: "No. La pensión sigue igual: la LSO cancela deudas, no toca prestaciones." },
    { q: "¿Puedo acogerme si tengo poca deuda?", a: (<>Depende. Si tu pensión no llega para las cuotas, sí. La LSO se aplica por insolvencia, no por importe absoluto.</>), plain: "Depende. Si tu pensión no llega para las cuotas, sí. La LSO se aplica por insolvencia, no por importe absoluto." },
    { q: "¿Y si tengo una vivienda pagada?", a: (<>La <A to='/ley-segunda-oportunidad/pierdo-mi-casa'>página sobre la vivienda</A> lo explica en detalle. En muchos casos hay estrategias para conservarla.</>), plain: "La página sobre la vivienda lo explica en detalle. En muchos casos hay estrategias para conservarla." },
  ],
};