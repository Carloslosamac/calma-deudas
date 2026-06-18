import type { MoneyContent } from "./types";
import { A, OptionCards, KeyCallout, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/person-man-portrait.jpg";
import p2 from "@/assets/person-woman-window.jpg";
import p3 from "@/assets/person-woman-walking.jpg";
import p4 from "@/assets/person-couple-sofa.jpg";

/**
 * Money page "Parar un embargo". Ángulo urgente máximo: nómina, cuenta o vivienda.
 * Timeline de urgencia + CTA inmediato. Deriva a juicio monitorio y a la LSO.
 */
export const pararEmbargo: MoneyContent = {
  path: "/embargos/parar-embargo",
  reviewed: true,
  tone: "urgent",
  layout: [
    "urgencyTimeline",
    "benefits",
    "steps",
    "quiz",
    "metrics",
    "testimonials",
    "sections",
    "eligibility",
    "faq",
    "beforeAfter",
    "closing",
  ],
  intro: (
    <>
      Si te van a embargar la nómina, la cuenta o la vivienda, <strong>aún estás a tiempo</strong>.
      Cada día cuenta. Te decimos hoy, gratis, qué hacer para frenarlo y resolver la deuda de raíz.
    </>
  ),
  hero: {
    badge: "Parar un embargo",
    titleLead: "Frena el embargo",
    titleAccent: "antes de que sea tarde.",
    subtitle: (
      <>
        Embargo de nómina, de cuenta bancaria o de tu vivienda: hay vías legales para
        <strong> pararlo o reducirlo</strong>. Cuanto antes actúes, más opciones tienes.
        Diagnóstico urgente y gratuito.
      </>
    ),
    trustNote: "Atención urgente · Gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Atención urgente · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Cómo te ayudamos a parar el embargo",
  benefits: [
    { icon: "gavel", title: "Frenamos el embargo", text: "Actuamos sobre el procedimiento para suspender o reducir el embargo en curso." },
    { icon: "wallet", title: "Protegemos tu nómina", text: "La ley fija mínimos inembargables. Velamos por que se respeten en tu caso." },
    { icon: "shield", title: "Atacamos la deuda", text: "No solo paramos el embargo: resolvemos la deuda que lo provoca, vía LSO si procede." },
    { icon: "clock", title: "Actuamos rápido", text: "El tiempo es clave en un embargo. Te llamamos en menos de 24h." },
    { icon: "scale", title: "Revisamos su legalidad", text: "Comprobamos si el embargo se ha tramitado correctamente y si cabe oposición." },
    { icon: "phone-off", title: "Paramos la presión", text: "Frenamos también las llamadas de acreedores y empresas de recobro." },
  ],
  testimonialsTitle: "Personas que frenaron su embargo",
  testimonialsSubtitle: "Casos reales de personas que pararon el embargo y resolvieron la deuda.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    { name: "Manuel R.", amount: "Nómina protegida", location: "Madrid", text: "Me embargaban la nómina entera. Conseguimos respetar el mínimo y luego cancelar la deuda.", photo: p1 },
    { name: "Pilar G.", amount: "Embargo suspendido", location: "Valencia", text: "Frenaron el embargo de mi cuenta a tiempo. Hoy estoy libre de deudas.", photo: p2 },
    { name: "Antonio L.", amount: "Vivienda a salvo", location: "Sevilla", text: "Estaba en ejecución hipotecaria. Actuaron rápido y pudimos negociar.", photo: p3 },
    { name: "Marta S.", amount: "Sin embargos", location: "Bilbao", text: "Acumulaba varios embargos. Con la Segunda Oportunidad empecé de cero.", photo: p4 },
  ],
  stepsTitle: "Qué hacemos para parar tu embargo",
  stepsSubtitle: "Cuatro pasos, empezando hoy",
  steps: [
    { title: "Llamada urgente gratis", text: "Analizamos tu embargo y los plazos que tienes para actuar." },
    { title: "Medidas inmediatas", text: "Estudiamos la oposición, la protección de mínimos o la suspensión por insolvencia." },
    { title: "Resolución de la deuda", text: "Atacamos la causa: negociación, reclamación o Ley de Segunda Oportunidad." },
    { title: "Embargo frenado", text: "Recuperas el control de tu nómina, tu cuenta y tu tranquilidad.", highlight: true },
  ],
  metrics: [
    { value: "24h", label: "Atención urgente en menos de un día" },
    { value: "Gratis", label: "Diagnóstico de tu embargo sin compromiso" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Se puede parar mi embargo?",
    intro: (
      <>
        En muchos casos sí: oponiéndose si hay defectos, protegiendo los mínimos inembargables
        o suspendiéndolo por insolvencia. Esto es lo que valoramos gratis y con urgencia:
      </>
    ),
    requirements: [
      "Tienes un embargo en curso o una notificación de que va a producirse.",
      "El embargo afecta a tu nómina, cuenta bancaria o vivienda.",
      "No puedes asumir la deuda con tus ingresos actuales.",
      "Quieres resolver la causa, no solo retrasar el embargo.",
    ],
    trustTitle: "El tiempo importa",
    trustText: "Cuanto antes actúes, más vías legales tienes disponibles.",
  },
  closing: {
    title: "Cada día que esperas, el embargo avanza",
    text: "No lo dejes para mañana. Pide tu diagnóstico urgente gratis y empecemos a frenarlo hoy.",
  },
  interactive: {
    urgencyTimeline: {
      title: "Qué pasa si no actúas ante el embargo",
      subtitle: "El procedimiento sigue su curso aunque tú no respondas.",
      items: [
        { time: "Notificación", title: "Te avisan del embargo", text: "Recibes la notificación. Es el mejor momento para actuar y oponerte si procede." },
        { time: "Días", title: "Se traba el embargo", text: "Bloquean tu cuenta o retienen parte de tu nómina cada mes.", danger: true },
        { time: "Semanas", title: "Se amplía", text: "Pueden sumarse nuevos bienes y, en deuda hipotecaria, avanzar la ejecución de la vivienda.", danger: true },
        { time: "Con Calma", title: "Frenamos y resolvemos", text: "Actuamos sobre el procedimiento y atacamos la deuda de raíz." },
      ],
    },
    quiz: {
      title: "¿Podemos parar tu embargo? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Tienes un embargo en curso o notificado?", goodAnswer: "yes" },
        { text: "¿Afecta a tu nómina, cuenta o vivienda?", goodAnswer: "yes" },
        { text: "¿No puedes pagar la deuda con tus ingresos?", goodAnswer: "yes" },
        { text: "¿Ya ha terminado por completo el procedimiento?", goodAnswer: "no" },
      ],
      resultPass: { title: "Podemos actuar sobre tu embargo", text: "Tu caso encaja y el tiempo corre. Pide tu diagnóstico urgente gratis ahora." },
      resultDoubt: { title: "No esperes para confirmarlo", text: "En embargos cada día cuenta. Lo revisamos gratis y con urgencia en 24h." },
    },
    beforeAfter: {
      title: "Antes y después de actuar",
      subtitle: "La diferencia entre quedarte parado y frenar el embargo.",
      beforeLabel: "Sin hacer nada",
      afterLabel: "Con Calma",
      before: ["Nómina o cuenta retenida", "El embargo se amplía", "Riesgo para tu vivienda", "Intereses que crecen", "Sin control de la situación"],
      after: ["Nómina protegida", "Embargo suspendido o reducido", "Vivienda defendida", "Deuda resuelta de raíz", "Recuperas el control"],
    },
  },
  sections: [
    {
      title: "Tipos de embargo y cómo frenarlos",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>Embargo de nómina:</strong> la ley protege un mínimo inembargable según tu salario y cargas familiares.</li>
            <li><strong>Embargo de cuenta:</strong> no pueden dejarte sin el mínimo vital; revisamos que se respete.</li>
            <li><strong>Embargo de vivienda:</strong> en ejecución hipotecaria hay vías de oposición y negociación.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "La vía definitiva: resolver la deuda",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Parar el embargo es el primer paso, pero la solución duradera es eliminar la deuda. Con la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>, los embargos pueden suspenderse y la deuda cancelarse.</p>
          <p>Si el embargo viene de una demanda, mira también <A to="/juicio-monitorio-recobro/juicio-monitorio-deuda">qué hacer ante un juicio monitorio</A>.</p>
        </div>
      ),
    },
    {
      title: "¿Cuánto cuesta y cuánto tarda?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>El <strong>diagnóstico urgente es gratuito</strong>. Las medidas para frenar el embargo se valoran de inmediato; si seguimos adelante, trabajamos con presupuesto cerrado y opción de pago fraccionado.</p>
        </div>
      ),
    },
  ],
  faq: [
    { q: "¿Se puede parar un embargo de nómina?", a: (<>Sí. La ley fija un mínimo inembargable y, además, si no puedes pagar, el embargo puede suspenderse por insolvencia con la Ley de Segunda Oportunidad.</>), plain: "Sí. La ley fija un mínimo inembargable y, además, si no puedes pagar, el embargo puede suspenderse por insolvencia con la Ley de Segunda Oportunidad." },
    { q: "¿Pueden embargarme la vivienda?", a: (<>En ejecución hipotecaria es posible, pero existen vías de oposición y negociación. Cuanto antes actúes, más opciones tienes.</>), plain: "En ejecución hipotecaria es posible, pero existen vías de oposición y negociación. Cuanto antes actúes, más opciones tienes." },
    { q: "¿Cuánto tiempo tengo para actuar?", a: (<>Depende de la fase, pero siempre es mejor actuar al recibir la notificación. Por eso ofrecemos atención urgente en 24h.</>), plain: "Depende de la fase, pero siempre es mejor actuar al recibir la notificación. Por eso ofrecemos atención urgente en 24h." },
    { q: "¿El diagnóstico tiene coste?", a: (<>No. El diagnóstico urgente es gratuito y sin compromiso.</>), plain: "No. El diagnóstico urgente es gratuito y sin compromiso." },
  ],
};