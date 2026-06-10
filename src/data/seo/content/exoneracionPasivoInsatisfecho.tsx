import { Link } from "react-router-dom";
import type { MoneyContent } from "./types";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Página "Exoneración del pasivo insatisfecho (EPI)". Ángulo INFORMATIVO /
 * AUTORIDAD JURÍDICA (no transaccional): explica el mecanismo legal con rigor
 * —qué se exonera y qué no, modalidades, límites de deuda pública y revocación—
 * y deriva el lead a la money page comercial /ley-segunda-oportunidad para no
 * canibalizarla. Sub-página del hub LSO. Pendiente de revisión legal.
 */
export const exoneracionPasivoInsatisfecho: MoneyContent = {
  path: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
  reviewed: false,
  tone: "legal",
  layout: [
    "benefits",
    "comparisonTable",
    "exonerationLimits",
    "legalTimeline",
    "sections",
    "eligibility",
    "faq",
    "closing",
  ],
  intro: (
    <>
      La <strong>exoneración del pasivo insatisfecho (EPI)</strong> es la resolución judicial
      que, dentro de la Ley de Segunda Oportunidad, cancela las deudas que no puedes pagar.
      Aquí te explicamos con rigor cómo funciona: qué deudas alcanza, sus dos modalidades, los
      límites de la deuda pública y cuándo puede revocarse.
    </>
  ),
  hero: {
    badge: "Mecanismo legal de la Ley de Segunda Oportunidad",
    titleLead: "Qué es y cómo funciona",
    titleAccent: "la exoneración del pasivo insatisfecho.",
    subtitle: (
      <>
        La EPI es el corazón jurídico de la{" "}
        <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>: la resolución por la
        que el juez <strong>cancela las deudas pendientes</strong>. Te explicamos qué cubre,
        sus límites y sus efectos, sin tecnicismos.
      </>
    ),
    trustNote: "Guía jurídica · Actualizada a la reforma concursal",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Abogados especialistas · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Qué define a la exoneración del pasivo insatisfecho",
  benefits: [
    { icon: "gavel", title: "Es una resolución judicial", text: "La dicta un juez con respaldo legal pleno; no es un acuerdo informal con los acreedores." },
    { icon: "scale", title: "Dos modalidades posibles", text: "Con plan de pagos (conservas patrimonio) o con liquidación previa de bienes." },
    { icon: "shield", title: "Alcanza la mayoría de deudas", text: "Préstamos, tarjetas, microcréditos y deudas con proveedores, entre otras." },
    { icon: "landmark", title: "Deuda pública con límites", text: "Hacienda y Seguridad Social se exoneran solo hasta los topes que fija la ley." },
    { icon: "lock", title: "Exige buena fe", text: "Requiere no haber ocultado bienes ni provocado la insolvencia de forma fraudulenta." },
    { icon: "clock", title: "Provisional o definitiva", text: "Con plan de pagos es revisable durante 3 años; tras cumplirlo se vuelve definitiva." },
  ],
  eligibility: {
    title: "¿Puedo acogerme a la EPI?",
    intro: (
      <>
        La exoneración exige actuar de buena fe y encontrarse en insolvencia. Esto es lo que
        valoramos gratis:
      </>
    ),
    requirements: [
      "No puedes pagar tus deudas con tus ingresos y patrimonio actuales.",
      "Actúas de buena fe: no has ocultado bienes ni provocado la insolvencia de forma fraudulenta.",
      "Eres particular o autónomo.",
      "Colaboras con el procedimiento y aportas la información requerida.",
    ],
    trustTitle: "Pendiente de revisión legal",
    trustText: "Contenido en revisión por abogado especialista en insolvencia.",
  },
  closing: {
    title: "¿Quieres saber si tu caso encaja en la EPI?",
    text: "Ya conoces el mecanismo; el siguiente paso es aplicarlo a tu situación. Estudiamos tu caso gratis dentro de la Ley de Segunda Oportunidad y te decimos qué deuda podrías exonerar.",
  },
  interactive: {
    comparisonTable: {
      title: "Qué deudas se exoneran y cuáles no",
      subtitle:
        "La EPI alcanza casi toda la deuda ordinaria, pero la ley deja fuera o limita algunos conceptos.",
      columns: [
        { title: "Se exoneran", highlight: true },
        { title: "Quedan fuera o con límite" },
      ],
      rows: [
        { feature: "Préstamos personales y bancarios", values: ["Sí, en su totalidad", "—"] },
        { feature: "Tarjetas y créditos revolving", values: ["Sí", "—"] },
        { feature: "Microcréditos y préstamos rápidos", values: ["Sí", "—"] },
        { feature: "Deudas con proveedores (autónomos)", values: ["Sí", "—"] },
        { feature: "Deuda pública (Hacienda y Seg. Social)", values: ["Parcial", "Solo hasta el límite legal"] },
        { feature: "Pensiones de alimentos", values: ["—", "Excluidas"] },
        { feature: "Multas y responsabilidad penal", values: ["—", "Excluidas"] },
        { feature: "Deudas por dolo o mala fe", values: ["—", "Excluidas"] },
      ],
    },
    exonerationLimits: {
      title: "Límites de la deuda pública",
      subtitle:
        "Hacienda y Seguridad Social no se exoneran por completo: la ley fija un tope por organismo.",
      items: [
        { label: "Hacienda (AEAT)", text: "Se exonera hasta el límite legal por deudor; el resto se reorganiza en un plan de pagos." },
        { label: "Seguridad Social", text: "Mismo criterio: tramo exonerable limitado y el exceso aplazado." },
        { label: "El resto de la deuda", text: "Préstamos, tarjetas y microcréditos no tienen este tope y pueden cancelarse íntegramente." },
      ],
      note: "Las cuantías concretas dependen de la normativa vigente y de tu caso. Lo confirmamos en el diagnóstico.",
    },
    legalTimeline: {
      title: "Las fases hasta la exoneración",
      subtitle: "La EPI es la resolución final de un procedimiento reglado.",
      phases: [
        { title: "Análisis de viabilidad", duration: "Semana 1", text: "Verificamos buena fe e insolvencia y preparamos la estrategia." },
        { title: "Acuerdo extrajudicial de pagos", duration: "1-2 meses", text: "Intento de acuerdo con los acreedores a través de un mediador concursal." },
        { title: "Concurso consecutivo", duration: "Variable", text: "Si no hay acuerdo, se abre la vía judicial con plan de pagos o liquidación." },
        { title: "Resolución de exoneración (EPI)", duration: "Resolución", text: "El juez cancela las deudas pendientes. Empiezas de cero." },
      ],
    },
  },
  sections: [
    {
      title: "¿Qué es la exoneración del pasivo insatisfecho?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>La EPI es la resolución judicial que, dentro de la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>, <strong>cancela las deudas que no puedes pagar</strong>. Es el resultado final del procedimiento, una vez acreditada tu insolvencia y buena fe. No es un acuerdo con los acreedores ni una quita pactada: es una decisión del juzgado con efecto pleno.</p>
          <p>Su regulación está en el Texto Refundido de la Ley Concursal, reformado en 2022 para hacer la exoneración más accesible y permitir, en muchos casos, conservar la vivienda mediante un plan de pagos.</p>
        </div>
      ),
    },
    {
      title: "Las dos modalidades de exoneración",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>La ley contempla dos vías para llegar a la exoneración, y se elige la que mejor protege tu situación:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>EPI con liquidación de bienes:</strong> se realizan los bienes embargables para pagar lo posible y el resto de la deuda se cancela de forma inmediata. Útil cuando no hay vivienda o ya está sobreendeudada.</li>
            <li><strong>EPI con plan de pagos:</strong> conservas tu patrimonio (incluida, en muchos casos, la vivienda habitual) y abonas una parte adaptada a tus ingresos durante un periodo de hasta 3 años. Cumplido el plan, el resto se exonera.</li>
          </ul>
          <p>Si todavía puedes asumir parte de la deuda, valora antes <A to="/reunificar-deudas">reunificar deudas</A> o <A to="/cancelar-deudas">cancelar deudas</A> concretas.</p>
        </div>
      ),
    },
    {
      title: "Exoneración provisional y definitiva",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>En la modalidad <strong>con liquidación</strong>, la exoneración es <strong>directa y definitiva</strong>: una vez dictada, las deudas quedan canceladas.</p>
          <p>En la modalidad <strong>con plan de pagos</strong>, la exoneración es <strong>provisional</strong> durante el periodo del plan (hasta 3 años). Si cumples el plan, se convierte en definitiva; durante ese tiempo el juez puede revisarla.</p>
        </div>
      ),
    },
    {
      title: "Cuándo puede revocarse la exoneración",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>La EPI no es irreversible si se actúa de mala fe. Un juez puede revocarla, normalmente a instancia de un acreedor, en supuestos como:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Ocultar bienes, ingresos o derechos durante el procedimiento.</li>
            <li>Una mejora sustancial de fortuna en los años siguientes (por herencia, premio o similar).</li>
            <li>Incumplir el plan de pagos en la modalidad provisional.</li>
          </ul>
          <p>Por eso la <strong>transparencia y la buena fe</strong> son determinantes. Para el detalle de la deuda pública, consulta <A to="/deudas-hacienda-seguridad-social/deudas-hacienda">deudas con Hacienda</A>.</p>
        </div>
      ),
    },
    {
      title: "Efectos de la exoneración en tu día a día",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Una vez firme la exoneración, las deudas alcanzadas <strong>dejan de ser exigibles</strong>: se acaban las reclamaciones, las llamadas y los embargos por esas deudas. Recuperas tu nómina y puedes salir del <A to="/asnef/salir-de-asnef">ASNEF</A> y otros ficheros de morosos.</p>
          <p>¿Quieres entender todo el procedimiento en profundidad? Lee la <A to="/blog/guia-ley-segunda-oportunidad">guía completa de la Ley de Segunda Oportunidad</A>.</p>
        </div>
      ),
    },
  ],
  faq: [
    { q: "¿Qué es la exoneración del pasivo insatisfecho?", a: (<>Es la resolución judicial que cancela las deudas pendientes dentro de la Ley de Segunda Oportunidad, una vez acreditada la insolvencia y la buena fe.</>), plain: "Es la resolución judicial que cancela las deudas pendientes dentro de la Ley de Segunda Oportunidad, una vez acreditada la insolvencia y la buena fe." },
    { q: "¿Incluye la deuda con Hacienda?", a: (<>Sí, con límites legales. Parte de la deuda pública puede exonerarse; el resto se reorganiza en un plan de pagos.</>), plain: "Sí, con límites legales. Parte de la deuda pública puede exonerarse; el resto se reorganiza en un plan de pagos." },
    { q: "¿La exoneración es definitiva?", a: (<>Con liquidación es inmediata y definitiva. Con plan de pagos es provisional hasta que cumples el plan (hasta 3 años); entonces se vuelve definitiva.</>), plain: "Con liquidación es inmediata y definitiva. Con plan de pagos es provisional hasta que cumples el plan (hasta 3 años); entonces se vuelve definitiva." },
    { q: "¿Aparece la exoneración en algún registro público?", a: (<>Sí, se publica en el Registro Público Concursal. Es un trámite del procedimiento y no impide rehacer tu vida financiera una vez cancelada la deuda.</>), plain: "Sí, se publica en el Registro Público Concursal. Es un trámite del procedimiento y no impide rehacer tu vida financiera una vez cancelada la deuda." },
    { q: "¿Puede revocarse una vez concedida?", a: (<>Sí, si se acredita mala fe (ocultar bienes) o una mejora sustancial de fortuna en los años siguientes, o si se incumple el plan de pagos.</>), plain: "Sí, si se acredita mala fe (ocultar bienes) o una mejora sustancial de fortuna en los años siguientes, o si se incumple el plan de pagos." },
    { q: "¿Puedo perder mi vivienda?", a: (<>Depende del caso. A veces se mantiene mediante un plan de pagos; en otros se liquida. Lo valoramos en tu diagnóstico.</>), plain: "Depende del caso. A veces se mantiene mediante un plan de pagos; en otros se liquida. Lo valoramos en tu diagnóstico." },
    { q: "¿El diagnóstico tiene coste?", a: (<>No. El diagnóstico es gratuito y sin compromiso.</>), plain: "No. El diagnóstico es gratuito y sin compromiso." },
  ],
};