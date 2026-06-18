import type { MoneyContent } from "./types";
import { A, KeyCallout, OptionCards, WarningCallout, CheckList } from "@/components/seo/modules";

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
        "Hacienda y Seguridad Social no se exoneran por completo. La ley concursal (art. 489 TRLC) fija un tope de 10.000 € por organismo.",
      items: [
        { label: "Hacienda (AEAT): hasta 10.000 €", text: "Los primeros 5.000 € se exoneran al 100 %; del tramo de 5.000 € a 10.000 € se exonera el 50 %." },
        { label: "Seguridad Social: hasta 10.000 €", text: "Mismo criterio e independiente del de Hacienda: hasta 10.000 € adicionales con la misma escala (100 % / 50 %)." },
        { label: "Tope conjunto: 20.000 €", text: "Sumando ambos organismos, se puede exonerar un máximo de 20.000 € de deuda pública por deudor." },
        { label: "El exceso, en plan de pagos", text: "Lo que supere esos límites no se cancela: se reorganiza y aplaza en un plan de pagos." },
        { label: "El resto de la deuda", text: "Préstamos, tarjetas y microcréditos no tienen este tope y pueden cancelarse íntegramente." },
      ],
      note: "Importes de la reforma concursal de 2022. Las sentencias del Tribunal Supremo de 18 de febrero de 2026 amplían su alcance (ver más abajo). Lo confirmamos en tu diagnóstico.",
    },
    legalTimeline: {
      title: "Las fases hasta la exoneración",
      subtitle: "La EPI es la resolución final de un procedimiento reglado.",
      phases: [
        { title: "Requisitos de acceso", duration: "Punto de partida", text: "Se acredita la insolvencia real y la buena fe del deudor: son la llave que abre el derecho a la exoneración." },
        { title: "Modalidad sin liquidación", duration: "Vía 1", text: "Exoneración con plan de pagos cuando conservas patrimonio o ingresos: cancelas el resto que no puedes asumir." },
        { title: "Modalidad con liquidación", duration: "Vía 2", text: "Exoneración inmediata tras liquidar los bienes no esenciales, cuando no hay capacidad de pago." },
        { title: "Alcance de la exoneración", duration: "Qué cubre", text: "Se exonera el pasivo insatisfecho privado en su totalidad; la deuda pública (Hacienda y Seg. Social) hasta el límite legal." },
        { title: "Resolución y efectos", duration: "Definitivo", text: "La EPI es firme: las deudas no vuelven, sales de los ficheros de morosos y solo se revoca en supuestos tasados de mala fe." },
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
          <p>Si todavía puedes asumir parte de la deuda, o tienes <strong>vivienda o terreno totalmente pagados</strong> que la EPI con liquidación podría realizar, valora antes <A to="/reunificar-deudas">reunificar deudas</A> para proteger ese patrimonio; si no tienes bienes de valor que perder, <A to="/cancelar-deudas">cancelar</A> suele ser la vía más limpia.</p>
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
      title: "Actualización 2026: el Supremo amplía la exoneración del crédito público",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Las <strong>sentencias del Tribunal Supremo de 18 de febrero de 2026</strong> (SSTS 254/2026, 259/2026 y 260/2026) marcan un punto de inflexión: amplían de forma sustancial cuánta deuda pública puede cancelarse en la EPI. Tres claves:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Intereses y recargos al 100 %:</strong> los créditos públicos subordinados (intereses de demora y recargos de apremio) pasan a exonerarse <strong>íntegramente</strong>, sin el tope de 10.000 €. En muchas deudas esto es una parte enorme del total.</li>
            <li><strong>El principal mantiene el límite:</strong> la deuda principal sigue con el tope del art. 489 TRLC (hasta 10.000 € por organismo: 100 % los primeros 5.000 € y 50 % el tramo de 5.000 € a 10.000 €).</li>
            <li><strong>Vale para todas las administraciones:</strong> el régimen ya no se limita a Hacienda y Seguridad Social; alcanza también a administraciones autonómicas y entidades locales (ayuntamientos, diputaciones…).</li>
          </ul>
          <p><strong>Ejemplo:</strong> con 44.000 € de deuda pública (24.000 € con Hacienda y 20.000 € con Seguridad Social, parte intereses y parte principal), aplicando esta doctrina podrías llegar a pagar solo unos 7.500 €: una exoneración cercana al 83 %.</p>
          <p>Por eso ahora es clave <strong>analizar la naturaleza de cada deuda</strong> (principal ordinario vs. intereses/recargos subordinados) en cada caso. Lo hacemos en tu diagnóstico.</p>
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
    { q: "¿Qué cambia con las sentencias del Tribunal Supremo de 2026?", a: (<>Las sentencias de 18 de febrero de 2026 amplían la exoneración del crédito público: los intereses y recargos (crédito subordinado) se exoneran al 100 % sin el límite de 10.000 €, el principal mantiene ese tope, y el régimen se aplica también a administraciones autonómicas y locales.</>), plain: "Las sentencias de 18 de febrero de 2026 amplían la exoneración del crédito público: los intereses y recargos (crédito subordinado) se exoneran al 100 % sin el límite de 10.000 €, el principal mantiene ese tope, y el régimen se aplica también a administraciones autonómicas y locales." },
    { q: "¿La exoneración es definitiva?", a: (<>Con liquidación es inmediata y definitiva. Con plan de pagos es provisional hasta que cumples el plan (hasta 3 años); entonces se vuelve definitiva.</>), plain: "Con liquidación es inmediata y definitiva. Con plan de pagos es provisional hasta que cumples el plan (hasta 3 años); entonces se vuelve definitiva." },
    { q: "¿Aparece la exoneración en algún registro público?", a: (<>Sí, se publica en el Registro Público Concursal. Es un trámite del procedimiento y no impide rehacer tu vida financiera una vez cancelada la deuda.</>), plain: "Sí, se publica en el Registro Público Concursal. Es un trámite del procedimiento y no impide rehacer tu vida financiera una vez cancelada la deuda." },
    { q: "¿Puede revocarse una vez concedida?", a: (<>Sí, si se acredita mala fe (ocultar bienes) o una mejora sustancial de fortuna en los años siguientes, o si se incumple el plan de pagos.</>), plain: "Sí, si se acredita mala fe (ocultar bienes) o una mejora sustancial de fortuna en los años siguientes, o si se incumple el plan de pagos." },
    { q: "¿Puedo perder mi vivienda?", a: (<>Depende del caso. A veces se mantiene mediante un plan de pagos; en otros se liquida. Lo valoramos en tu diagnóstico.</>), plain: "Depende del caso. A veces se mantiene mediante un plan de pagos; en otros se liquida. Lo valoramos en tu diagnóstico." },
    { q: "¿El diagnóstico tiene coste?", a: (<>No. El diagnóstico es gratuito y sin compromiso.</>), plain: "No. El diagnóstico es gratuito y sin compromiso." },
  ],
};