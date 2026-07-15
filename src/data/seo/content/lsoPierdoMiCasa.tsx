import type { MoneyContent } from "./types";
import { A, KeyCallout, WarningCallout, CheckList } from "@/components/seo/modules";

/**
 * Sub-pillar "¿Pierdo mi casa con la LSO?". Ángulo: derribar el miedo #1
 * que bloquea la conversión. Explicar cuándo se conserva y cuándo no.
 */
export const lsoPierdoMiCasa: MoneyContent = {
  path: "/ley-segunda-oportunidad/pierdo-mi-casa",
  directAnswer: {
    question: "¿Pierdo mi casa con la Ley de Segunda Oportunidad?",
    answer:
      "No es automático. Si la vivienda está hipotecada y sigues pagando la cuota, muchos juzgados permiten conservarla. Si está totalmente pagada y su valor supera claramente la deuda, entra en la liquidación. Los criterios varían por juzgado y por tu situación. En Calma lo valoramos antes de decidir la vía.",
    plain:
      "No es automático. Si la vivienda está hipotecada y sigues pagando la cuota, muchos juzgados permiten conservarla. Si está totalmente pagada y su valor supera claramente la deuda, entra en la liquidación. Los criterios varían por juzgado y por tu situación.",
  },
  reviewed: false,
  tone: "calm",
  layout: ["benefits", "sections", "eligibility", "faq", "closing"],
  intro: (
    <>
      La duda más frecuente al plantear la Ley de Segunda Oportunidad es{" "}
      <strong>si vas a perder tu vivienda</strong>. La respuesta corta: <em>depende</em>.
      La respuesta larga, con criterios reales, la tienes aquí.
    </>
  ),
  hero: {
    badge: "El miedo nº1 aclarado",
    titleLead: "¿Pierdo mi casa con la",
    titleAccent: "Ley de Segunda Oportunidad?",
    subtitle: (
      <>
        Ni el "sí" ni el "no" categórico. Depende de <strong>si está hipotecada</strong>, de
        su valor y del criterio del juzgado. Te lo explicamos sin marketing.
      </>
    ),
    trustNote: "Análisis gratis · Sin compromiso",
  },
  benefitsTitle: "Cuándo se conserva y cuándo no",
  benefits: [
    { icon: "shield", title: "Vivienda hipotecada al día", text: "Si pagas la cuota, muchos juzgados permiten conservarla vía plan de pagos." },
    { icon: "landmark", title: "Vivienda pagada de mucho valor", text: "Suele entrar en la liquidación como bien no necesario." },
    { icon: "scale", title: "Único bien familiar", text: "Se valora la protección de la vivienda habitual, pero no es automático." },
    { icon: "gavel", title: "Criterio del juzgado", text: "Cada juzgado tiene tendencia; conocerla marca la estrategia." },
    { icon: "wallet", title: "Plan de pagos como vía", text: "Ofrecer un plan realista puede blindar la vivienda 3 años." },
    { icon: "clock", title: "Ejecución hipotecaria en curso", text: "La LSO puede frenarla y renegociarla si actúas a tiempo." },
  ],
  sections: [
    {
      title: "Vivienda hipotecada: cuándo se puede conservar",
      body: (
        <KeyCallout eyebrow="Escenario 1" headline="Pagando la cuota, la vivienda puede quedar fuera del alcance de la LSO.">
          <p>Si <strong>sigues pagando la hipoteca al día</strong> y tu ingreso cubre esa cuota, muchos juzgados permiten conservar la vivienda mediante un plan de pagos. La deuda personal se exonera; la hipoteca sigue su curso normal.</p>
          <p>Requisito clave: que la cuota sea sostenible con tu situación real, no un esfuerzo desproporcionado.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Vivienda pagada: casi siempre entra en la liquidación",
      body: (
        <WarningCallout title="Escenario 2">
          <p>Si la vivienda <strong>está totalmente pagada</strong> y su valor supera con claridad la deuda pendiente, entrará normalmente en la liquidación: se vende y con lo obtenido se paga a los acreedores.</p>
          <p>En este escenario a veces es <strong>mejor</strong> plantear una <A to="/reunificar-deudas">reunificación</A> que exonerar, para no perder la casa. Lo valoramos siempre antes de decidir la vía.</p>
        </WarningCallout>
      ),
    },
    {
      title: "Ejecución hipotecaria en curso: LSO como freno",
      body: (
        <CheckList
          variant="check"
          items={[
            "La LSO puede paralizar la ejecución hipotecaria en curso.",
            "Da margen para negociar con el banco una salida distinta (dación, alquiler social).",
            "Frena los embargos sobre otros bienes mientras se decide la vía.",
            "Cuanto antes se inicie, más margen de negociación queda.",
          ]}
        />
      ),
    },
    {
      title: "Qué mira el juzgado antes de decidir",
      body: (
        <ul className="space-y-2 list-disc pl-5 text-base leading-relaxed text-foreground/85">
          <li><strong>Valor real</strong> de la vivienda vs. deuda pendiente.</li>
          <li>Si es <strong>vivienda habitual</strong> y única del deudor y su familia.</li>
          <li><strong>Capacidad de pago</strong> del plan de pagos ofrecido.</li>
          <li>Existencia de <strong>otros bienes</strong> con los que satisfacer a los acreedores.</li>
          <li>Criterio del <strong>juzgado concreto</strong> — la jurisprudencia local pesa.</li>
        </ul>
      ),
    },
  ],
  eligibility: {
    title: "¿Tu caso permite conservar la vivienda?",
    intro: <>Estas señales apuntan a que sí:</>,
    requirements: [
      "La vivienda está hipotecada y pagas la cuota mensual.",
      "Es tu vivienda habitual y familiar.",
      "Tus ingresos permiten mantener la cuota tras cancelar el resto de deudas.",
      "El valor de mercado no supera de forma desproporcionada la deuda hipotecaria pendiente.",
    ],
    trustTitle: "Casos reales revisados por abogados",
    trustText: "Cada caso es distinto. Antes de decidir cualquier vía, lo revisamos gratis y sin compromiso.",
  },
  closing: {
    title: "Antes de firmar nada, valóralo con abogados",
    text: "La estrategia correcta protege lo importante. Diagnóstico gratis en 24h con abogados especialistas en LSO y vivienda.",
  },
  faq: [
    { q: "¿Puedo conservar mi casa aunque me acoja a la LSO?", a: (<>Sí, en muchos casos. Si está hipotecada y pagas la cuota, el juzgado suele permitirlo con un plan de pagos.</>), plain: "Sí, en muchos casos. Si está hipotecada y pagas la cuota, el juzgado suele permitirlo con un plan de pagos." },
    { q: "¿Y si la vivienda está a nombre de mi cónyuge?", a: (<>La ganancialidad y el régimen económico matrimonial cambian el análisis. Lo revisamos caso a caso.</>), plain: "La ganancialidad y el régimen económico matrimonial cambian el análisis. Lo revisamos caso a caso." },
    { q: "¿La LSO paga mi hipoteca?", a: (<>No. La LSO cancela deuda personal, no paga la hipoteca. Si la cuota es asumible, la hipoteca sigue su curso normal.</>), plain: "No. La LSO cancela deuda personal, no paga la hipoteca. Si la cuota es asumible, la hipoteca sigue su curso normal." },
    { q: "¿Y si me están ejecutando la hipoteca?", a: (<>La LSO puede frenar la ejecución y abrir margen para negociar dación, alquiler social u otras salidas. Actúa cuanto antes.</>), plain: "La LSO puede frenar la ejecución y abrir margen para negociar dación, alquiler social u otras salidas." },
    { q: "¿Es mejor reunificar que acogerme a la LSO?", a: (<>Cuando la vivienda pagada supera la deuda, a veces sí. Lo comparamos en el diagnóstico gratis.</>), plain: "Cuando la vivienda pagada supera la deuda, a veces sí. Lo comparamos en el diagnóstico gratis." },
  ],
};