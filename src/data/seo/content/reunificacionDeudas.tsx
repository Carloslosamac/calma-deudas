import { Link } from "react-router-dom";
import type { MoneyContent } from "./types";
import p1 from "@/assets/testimonios/lso-1.jpg";
import p2 from "@/assets/testimonios/lso-2.jpg";
import p3 from "@/assets/testimonios/lso-3.jpg";
import p4 from "@/assets/testimonios/lso-4.jpg";
import p5 from "@/assets/testimonios/lso-5.jpg";
import p6 from "@/assets/testimonios/lso-6.jpg";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Money page "Reunificación de deudas". Pilar del cluster, ángulo comparativo:
 * reunificar (sigues pagando, una sola cuota) vs cancelar (LSO). Deriva a
 * /reunificar-deudas (acción paso a paso) y al hub LSO, para no canibalizar.
 */
export const reunificacionDeudas: MoneyContent = {
  path: "/reunificacion-deudas",
  reviewed: true,
  tone: "transactional",
  layout: [
    "simulator",
    "comparisonTable",
    "benefits",
    "debtTypes",
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
      Si pagas varias cuotas cada mes y te asfixian, la <strong>reunificación de deudas</strong>{" "}
      las junta en un solo pago más bajo. Te explicamos cuándo conviene y cuándo es mejor
      cancelar, y lo aplicamos a tu caso gratis.
    </>
  ),
  hero: {
    badge: "Reunificación de deudas",
    titleLead: "Varias cuotas, un solo pago",
    titleAccent: "que sí puedes asumir.",
    subtitle: (
      <>
        La reunificación junta todos tus préstamos en <strong>una única cuota mensual</strong>,
        más baja y manejable. Te decimos gratis si te conviene reunificar o si en tu caso
        sale mejor cancelar la deuda.
      </>
    ),
    trustNote: "Estudio gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias asesoradas",
    trustSeal: "Estudio gratis · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Ventajas de reunificar tus deudas",
  benefits: [
    {
      icon: "wallet",
      title: "Una sola cuota",
      text: "Juntas todos tus préstamos en un único pago mensual, más fácil de controlar.",
    },
    {
      icon: "clock",
      title: "Cuota más baja",
      text: "Al alargar el plazo, la cuota mensual baja y recuperas oxígeno cada mes.",
    },
    {
      icon: "scale",
      title: "Te decimos la verdad",
      text: "Comparamos reunificar y cancelar y te recomendamos lo que más te conviene a ti.",
    },
    {
      icon: "users",
      title: "Un solo interlocutor",
      text: "Dejas de lidiar con varios acreedores y gestionas todo en un único sitio.",
    },
    {
      icon: "sparkles",
      title: "Recuperas margen",
      text: "Liberas parte de tu sueldo para llegar a fin de mes sin agobios.",
    },
    {
      icon: "lock",
      title: "Condiciones claras",
      text: "Te explicamos el coste total y el plazo antes de decidir. Sin letra pequeña.",
    },
  ],
  testimonialsTitle: "Personas que recuperaron el control",
  testimonialsSubtitle:
    "Casos reales de personas que pasaron de varias cuotas asfixiantes a un único pago asumible.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    {
      name: "Daniel R.",
      amount: "5 cuotas → 1",
      location: "Madrid",
      text: "Pagaba a cinco entidades. Ahora una sola cuota, más baja, y vuelvo a respirar.",
      photo: p1,
    },
    {
      name: "Carmen P.",
      amount: "-40% de cuota",
      location: "Valencia",
      text: "Bajé mi pago mensual casi a la mitad. Por fin llego a fin de mes sin agobio.",
      photo: p2,
    },
    {
      name: "Óscar L.",
      amount: "4 cuotas → 1",
      location: "Sevilla",
      text: "Me explicaron que en mi caso reunificar era lo mejor. Acertaron de pleno.",
      photo: p3,
    },
    {
      name: "Isabel M.",
      amount: "-35% de cuota",
      location: "Bilbao",
      text: "Tenía tres préstamos y una tarjeta. Hoy pago una sola cuota que sí puedo asumir.",
      photo: p4,
    },
    {
      name: "Fernando G.",
      amount: "6 cuotas → 1",
      location: "Málaga",
      text: "El asesor comparó cancelar y reunificar conmigo. Elegí reunificar y fue un acierto.",
      photo: p5,
    },
    {
      name: "Rosa V.",
      amount: "-45% de cuota",
      location: "Zaragoza",
      text: "Dejé de hacer malabares con varios recibos. Un solo pago y mucha más tranquilidad.",
      photo: p6,
    },
  ],
  stepsTitle: "Cómo funciona la reunificación",
  stepsSubtitle: "Cuatro pasos para pasar de varias cuotas a una sola",
  steps: [
    {
      title: "Estudio gratuito",
      text: "Analizamos tus deudas, cuotas e ingresos y vemos si reunificar te conviene.",
    },
    {
      title: "Comparativa honesta",
      text: "Te enseñamos reunificar vs cancelar para que elijas con información clara.",
    },
    {
      title: "Propuesta a medida",
      text: "Diseñamos la operación con la cuota y el plazo que encajan contigo.",
    },
    {
      title: "Una sola cuota",
      text: "Unificas todo en un único pago mensual asumible.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "1 cuota", label: "En lugar de varios recibos cada mes" },
    { value: "Comparativa", label: "Reunificar vs cancelar, siempre honesta" },
    { value: "Gratis", label: "Estudiamos tu caso sin compromiso" },
  ],
  eligibility: {
    title: "¿Me conviene reunificar?",
    intro: (
      <>
        La reunificación encaja si <strong>todavía puedes pagar</strong> una cuota razonable, o
        si <strong>no puedes pagar pero tienes bienes de valor pagados</strong> que la
        cancelación por LSO podría liquidar. Si no puedes pagar y no tienes patrimonio que
        proteger, suele ser mejor cancelar. Esto es lo que valoramos:
      </>
    ),
    requirements: [
      "Tienes varias deudas o préstamos con cuotas que te cuesta asumir juntas.",
      "Cuentas con ingresos para una cuota única más baja, o tienes bienes pagados que quieres proteger.",
      "Buscas simplificar y reducir el pago mensual, no necesariamente eliminar la deuda.",
      "Quieres una comparativa honesta antes de decidir entre reunificar y cancelar.",
    ],
    trustTitle: "Asesoramiento honesto",
    trustText: "Si en tu caso es mejor cancelar, te lo diremos sin rodeos.",
  },
  closing: {
    title: "Una cuota asumible o cancelar: te decimos qué te conviene",
    text: "No todas las situaciones se resuelven igual. Pide tu estudio gratis y te diremos con honestidad si lo tuyo es reunificar o cancelar la deuda.",
  },
  interactive: {
    comparisonTable: {
      title: "Reunificar vs cancelar: cuál te conviene",
      subtitle: "Dos caminos distintos. Te ayudamos a elegir el que encaja con tu situación.",
      columns: [
        { title: "Reunificar" },
        { title: "Cancelar (LSO)", highlight: true },
      ],
      rows: [
        { feature: "Sigues pagando la deuda", values: ["sí", "no"] },
        { feature: "Una sola cuota mensual", values: ["sí", "no"] },
        { feature: "Elimina la deuda", values: ["no", "sí"] },
        { feature: "Ideal si aún puedes pagar", values: ["sí", "no"] },
        { feature: "Ideal si no puedes pagar y no tienes bienes", values: ["no", "sí"] },
        { feature: "Protege bienes de valor pagados", values: ["sí", "no"] },
        { feature: "Frena embargos", values: ["no", "sí"] },
        { feature: "Coste total a largo plazo", values: ["Puede subir", "Se cancela"] },
      ],
    },
    simulator: {
      title: "¿Cuánto podrías bajar tu cuota?",
      subtitle: "Mueve los controles y estima tu nueva cuota única. La cifra real la vemos gratis.",
      maxDebt: 120000,
      maxMonthly: 2500,
      defaultDebt: 30000,
      defaultMonthly: 800,
    },
    debtTypesTitle: "¿Qué cuotas quieres juntar?",
    debtTypesSubtitle: "Elige tu situación y te orientamos.",
    debtTypes: [
      {
        label: "Varios préstamos",
        message:
          "El caso típico de reunificación: varios préstamos personales en una sola cuota más baja.",
        to: "/reunificar-deudas",
        linkLabel: "Cómo reunificar deudas",
      },
      {
        label: "Préstamos + tarjetas",
        message:
          "Se pueden incluir tarjetas en la reunificación, aunque conviene revisar si hay usura.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Revisar tarjetas revolving",
      },
      {
        label: "Ya no puedo pagar",
        message:
          "Si no puedes asumir ninguna cuota y no tienes bienes de valor que perder, reunificar no es la solución: mejor cancelar la deuda.",
        to: "/ley-segunda-oportunidad",
        linkLabel: "Ley de Segunda Oportunidad",
      },
      {
        label: "No puedo pagar, pero tengo bienes pagados",
        message:
          "Si tienes vivienda o terreno pagados, cancelar con la LSO podría liquidarlos. Reunificar protege ese patrimonio en una sola cuota.",
      },
      {
        label: "Microcréditos",
        message:
          "Los microcréditos con interés muy alto a veces conviene cancelarlos antes que reunificarlos.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cancelar microcréditos",
      },
      {
        label: "No lo tengo claro",
        message:
          "Lo más común. Te hacemos la comparativa reunificar vs cancelar, gratis y sin compromiso.",
        to: "/cancelar-deudas",
        linkLabel: "Ver opción de cancelar",
      },
    ],
    quiz: {
      title: "¿Reunificar o cancelar? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Tienes dos o más deudas con cuotas distintas?", goodAnswer: "yes" },
        { text: "¿Puedes pagar una cuota razonable o tienes bienes de valor pagados que proteger?", goodAnswer: "yes" },
        { text: "¿Tu objetivo principal es bajar el pago mensual?", goodAnswer: "yes" },
        { text: "¿Es imposible que pagues ninguna cuota?", goodAnswer: "no" },
      ],
      resultPass: {
        title: "La reunificación encaja contigo",
        text: "Tu perfil cuadra con reunificar: una sola cuota más baja. Pide tu estudio gratis y te damos la cifra real, sin compromiso.",
      },
      resultDoubt: {
        title: "Quizá te convenga cancelar",
        text: "Si las cuotas te superan y no tienes bienes de valor que proteger, reunificar puede no bastar y cancelar con la LSO sea mejor. Te comparamos ambas vías gratis.",
      },
    },
    beforeAfter: {
      title: "Antes y después de reunificar",
      subtitle: "Lo que cambia al juntar tus deudas en una sola cuota.",
      beforeLabel: "Hoy, con varias cuotas",
      afterLabel: "Después de reunificar",
      before: [
        "Varios recibos en fechas distintas",
        "Suma de cuotas que asfixia",
        "Riesgo de impago por descontrol",
        "Varios acreedores que reclaman",
        "Sin margen a fin de mes",
      ],
      after: [
        "Un único pago mensual",
        "Cuota más baja y asumible",
        "Calendario claro y bajo control",
        "Un solo interlocutor",
        "Algo de margen recuperado",
      ],
    },
  },
  sections: [
    {
      title: "¿Qué es la reunificación de deudas?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Reunificar consiste en <strong>juntar varios préstamos y deudas en uno solo</strong>,
            con una única cuota mensual, normalmente más baja porque se alarga el plazo. No
            elimina la deuda: la reorganiza para que puedas pagarla con más holgura.
          </p>
          <p>
            Si quieres pasar directamente a la acción, mira{" "}
            <A to="/reunificar-deudas">cómo reunificar deudas paso a paso</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Reunificar vs cancelar: cuándo cada una",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Reunificar</strong> tiene sentido si todavía puedes pagar y solo
              necesitas bajar la cuota y simplificar, o si no puedes pagar pero tienes bienes
              de valor pagados (vivienda, terreno) que quieres proteger de una liquidación.
            </li>
            <li>
              <strong>Cancelar</strong> (vía{" "}
              <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>) es mejor si ya
              no puedes asumir las cuotas y no tienes patrimonio de valor que perder, por mucho
              que las juntes.
            </li>
          </ul>
          <p>
            Reunificar y seguir sin poder pagar solo alarga el problema y encarece la deuda.
            Por eso te damos una comparativa honesta antes de decidir.
          </p>
        </div>
      ),
    },
    {
      title: "Ventajas y riesgos a tener en cuenta",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>La reunificación tiene luces y sombras, y conviene conocerlas:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>A favor:</strong> una sola cuota, pago mensual más bajo, gestión más simple.</li>
            <li><strong>En contra:</strong> al alargar el plazo, puedes pagar más intereses totales.</li>
            <li><strong>Cuidado:</strong> evita reunificar con garantía sobre tu vivienda sin valorarlo bien.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Coste y siguiente paso",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            El <strong>estudio es gratuito</strong>. Te mostramos la cuota, el plazo y el
            coste total, y lo comparamos con la opción de{" "}
            <A to="/cancelar-deudas">cancelar deudas</A> para que elijas con todos los datos.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿Qué es reunificar deudas?",
      a: (
        <>Es juntar varios préstamos en uno solo, con una única cuota mensual normalmente más baja al alargar el plazo. No elimina la deuda, la reorganiza.</>
      ),
      plain:
        "Es juntar varios préstamos en uno solo, con una única cuota mensual normalmente más baja al alargar el plazo. No elimina la deuda, la reorganiza.",
    },
    {
      q: "¿Es mejor reunificar o cancelar?",
      a: (
        <>Reunificar conviene si aún puedes pagar y quieres bajar la cuota. Si no puedes asumir las cuotas, suele ser mejor cancelar con la Ley de Segunda Oportunidad.</>
      ),
      plain:
        "Reunificar conviene si aún puedes pagar y quieres bajar la cuota. Si no puedes asumir las cuotas, suele ser mejor cancelar con la Ley de Segunda Oportunidad.",
    },
    {
      q: "¿Reunificar sale más caro a largo plazo?",
      a: (
        <>Puede salir más caro en intereses totales porque se alarga el plazo, aunque baja la cuota mensual. Te mostramos el coste total antes de decidir.</>
      ),
      plain:
        "Puede salir más caro en intereses totales porque se alarga el plazo, aunque baja la cuota mensual. Te mostramos el coste total antes de decidir.",
    },
    {
      q: "¿El estudio tiene coste?",
      a: (
        <>No. El estudio es gratuito y sin compromiso, y te damos una comparativa honesta entre reunificar y cancelar.</>
      ),
      plain:
        "No. El estudio es gratuito y sin compromiso, y te damos una comparativa honesta entre reunificar y cancelar.",
    },
  ],
};