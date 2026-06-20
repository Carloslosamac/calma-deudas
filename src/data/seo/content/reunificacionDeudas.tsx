import type { MoneyContent } from "./types";
import { A, KeyCallout, OptionCards, CheckList, ActionLink } from "@/components/seo/modules";
import p1 from "@/assets/casos/reunificacion-2.jpg";
import p2 from "@/assets/casos/reunificacion-1.jpg";
import p3 from "@/assets/casos/reunificacion-4.jpg";
import p4 from "@/assets/casos/reunificacion-3.jpg";
import p5 from "@/assets/casos/reunificacion-6.jpg";
import p6 from "@/assets/casos/reunificacion-5.jpg";

/**
 * Money page "Reunificación de deudas". Pilar del cluster, ángulo comparativo:
 * reunificar (negociamos extrajudicialmente con las entidades para bajar cuota
 * Y total) vs cancelar (LSO). NO es refinanciar (préstamo nuevo que alarga el
 * plazo). Deriva a /reunificar-deudas (acción paso a paso) y al hub LSO.
 */
export const reunificacionDeudas: MoneyContent = {
  path: "/reunificacion-deudas",
  directAnswer: {
    question: "¿Qué es reunificar deudas y cuándo conviene?",
    answer: "Reunificar deudas con Calma es negociar de forma extrajudicial con tus acreedores para reducir tanto tu cuota mensual como el total que debes, sin pedir un préstamo nuevo ni hipotecar tu casa. Conviene cuando tienes ingresos o bienes que quieres conservar pero las cuotas te ahogan. Estudiamos tu caso gratis para ver si es tu mejor opción.",
    plain: "Reunificar deudas con Calma es negociar de forma extrajudicial con tus acreedores para reducir tanto tu cuota mensual como el total que debes, sin pedir un préstamo nuevo ni hipotecar tu casa. Conviene cuando tienes ingresos o bienes que quieres conservar pero las cuotas te ahogan. Estudiamos tu caso gratis para ver si es tu mejor opción.",
  },
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
      Si pagas varias cuotas cada mes y te asfixian, con la <strong>reunificación de deudas</strong>{" "}
      negociamos con tus entidades para rebajar tu cuota mensual <strong>y</strong> el total que
      debes. No es un préstamo nuevo. Te decimos gratis si te conviene o si es mejor cancelar.
    </>
  ),
  hero: {
    badge: "Reunificación de deudas",
    titleLead: "Negociamos tu deuda:",
    titleAccent: "menos cuota y menos total.",
    subtitle: (
      <>
        Reunificar no es pedir un préstamo: <strong>negociamos extrajudicialmente</strong> con tus
        acreedores para bajar la cuota mensual <strong>y</strong> el importe total que pagas. Te
        decimos gratis si te conviene reunificar o si en tu caso sale mejor cancelar la deuda.
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
      title: "Menos total a pagar",
      text: "Negociamos con tus entidades para rebajar el importe global de tu deuda, no solo aplazarla.",
    },
    {
      icon: "clock",
      title: "Cuota más baja",
      text: "Reordenamos los pagos para bajar la cuota mensual y que recuperes oxígeno cada mes.",
    },
    {
      icon: "scale",
      title: "Te decimos la verdad",
      text: "Comparamos reunificar y cancelar y te recomendamos lo que más te conviene a ti.",
    },
    {
      icon: "users",
      title: "Un solo interlocutor",
      text: "Negociamos por ti con cada acreedor: dejas de lidiar con todos a la vez.",
    },
    {
      icon: "sparkles",
      title: "Recuperas margen",
      text: "Liberas parte de tu sueldo para llegar a fin de mes sin agobios.",
    },
    {
      icon: "lock",
      title: "Sin préstamo nuevo",
      text: "No firmas otro crédito ni pones tu vivienda en garantía: mejoramos la deuda que ya tienes.",
    },
  ],
  testimonialsTitle: "Personas que recuperaron el control",
  testimonialsSubtitle:
    "Casos reales de personas que pasaron de varias cuotas asfixiantes a un único pago asumible.",
  testimonialsMoreHref: "/casos-de-exito",
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
      amount: "-30% del total",
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
  stepsSubtitle: "Cuatro pasos para negociar y rebajar tu deuda",
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
      title: "Negociación con tus acreedores",
      text: "Negociamos extrajudicialmente con cada entidad para rebajar cuota y total.",
    },
    {
      title: "Deuda rebajada",
      text: "Pasas a un pago mensual más bajo y un importe total menor.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Menos total", label: "Negociamos para rebajar lo que debes" },
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
      "Buscas rebajar el pago mensual y el total negociando, no necesariamente eliminar la deuda.",
      "Quieres una comparativa honesta antes de decidir entre reunificar y cancelar.",
    ],
    trustTitle: "Asesoramiento honesto",
    trustText: "Si en tu caso es mejor cancelar, te lo diremos sin rodeos.",
  },
  closing: {
    title: "Negociar tu deuda o cancelar: te decimos qué te conviene",
    text: "No todas las situaciones se resuelven igual. Pide tu estudio gratis y te diremos con honestidad si lo tuyo es reunificar (negociar y rebajar) o cancelar la deuda.",
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
        { feature: "Negociamos cuota y total con las entidades", values: ["sí", "no"] },
        { feature: "Elimina la deuda", values: ["no", "sí"] },
        { feature: "Ideal si aún puedes pagar", values: ["sí", "no"] },
        { feature: "Ideal si no puedes pagar y no tienes bienes", values: ["no", "sí"] },
        { feature: "Protege bienes de valor pagados", values: ["sí", "no"] },
        { feature: "Frena embargos", values: ["no", "sí"] },
        { feature: "Coste total a largo plazo", values: ["Baja (negociado)", "Se cancela"] },
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
    debtTypesTitle: "¿Qué deudas quieres negociar?",
    debtTypesSubtitle: "Elige tu situación y te orientamos.",
    debtTypes: [
      {
        label: "Varios préstamos",
        message:
          "El caso típico de reunificación: negociamos con cada entidad para rebajar cuota y total.",
        to: "/reunificar-deudas",
        linkLabel: "Cómo reunificar deudas",
      },
      {
        label: "Préstamos + tarjetas",
        message:
          "También negociamos tarjetas, aunque antes conviene revisar si hay intereses abusivos.",
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
          "Si tienes vivienda o terreno pagados, cancelar con la LSO podría liquidarlos. Reunificar protege ese patrimonio negociando una rebaja con tus acreedores.",
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
        text: "Tu perfil cuadra con reunificar: negociamos para bajar tu cuota y tu total. Pide tu estudio gratis y te damos la cifra real, sin compromiso.",
      },
      resultDoubt: {
        title: "Quizá te convenga cancelar",
        text: "Si las cuotas te superan y no tienes bienes de valor que proteger, reunificar puede no bastar y cancelar con la LSO sea mejor. Te comparamos ambas vías gratis.",
      },
    },
    beforeAfter: {
      title: "Antes y después de reunificar",
      subtitle: "Lo que cambia al negociar y rebajar tus deudas.",
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
        "Pago mensual más bajo",
        "Importe total rebajado",
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
        <div className="space-y-5">
          <KeyCallout
            eyebrow="En una frase"
            headline={
              <>
                Negociar con tus entidades para{" "}
                <span className="text-accent-deep">bajar la cuota y el total</span>.
              </>
            }
          >
            <p>No es un préstamo nuevo. Negociamos extrajudicialmente con cada acreedor para rebajar tanto tu pago mensual como el importe total que debes. No elimina la deuda, pero la mejora.</p>
          </KeyCallout>
          <ActionLink to="/reunificar-deudas">
            ¿Prefieres pasar directamente a la acción?{" "}
            <span className="text-accent-deep">Reunificar deudas paso a paso</span>
          </ActionLink>
          <ActionLink to="/blog/guia-reunificar-deudas">
            Lee la guía pilar completa:{" "}
            <span className="text-accent-deep">Reunificar deudas en 2026 paso a paso</span>
          </ActionLink>
        </div>
      ),
    },
    {
      title: "Reunificar vs cancelar: cuándo cada una",
      body: (
        <div className="space-y-5">
          <OptionCards
            columns={2}
            items={[
              {
                icon: "wallet",
                title: "Reunificar",
                text: "Si todavía puedes pagar y solo necesitas bajar la cuota, o si no puedes pagar pero tienes bienes de valor pagados (vivienda, terreno) que quieres proteger de una liquidación.",
              },
              {
                icon: "scale",
                title: "Cancelar (LSO)",
                text: "Mejor si ya no puedes asumir las cuotas y no tienes patrimonio de valor que perder, por mucho que las juntes.",
                links: <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>,
              },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            Ojo: reunificar (negociar y rebajar) no es <strong>refinanciar</strong>, que es pedir un
            préstamo nuevo que alarga el plazo y encarece el total. Por eso te damos una comparativa
            honesta antes de decidir.
          </p>
        </div>
      ),
    },
    {
      title: "Reunificar no es refinanciar",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">Es la diferencia clave que casi nadie te explica:</p>
          <CheckList
            items={[<><strong>Reunificar (lo nuestro):</strong> negociamos con las entidades y baja tu cuota <strong>y</strong> el total que debes. Sin préstamo nuevo.</>]}
          />
          <CheckList
            variant="cross"
            items={[
              <><strong>Refinanciar (lo que evitamos):</strong> pedir un préstamo nuevo que agrupa todo, baja la cuota pero alarga el plazo y encarece el total.</>,
              <><strong>Cuidado:</strong> desconfía de quien te ofrezca reunificar poniendo tu vivienda como garantía. Eso es refinanciar.</>,
            ]}
          />
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
        <>Es negociar extrajudicialmente con tus entidades para rebajar tu cuota mensual y el importe total que debes. No es un préstamo nuevo ni elimina la deuda: la mejora.</>
      ),
      plain:
        "Es negociar extrajudicialmente con tus entidades para rebajar tu cuota mensual y el importe total que debes. No es un préstamo nuevo ni elimina la deuda: la mejora.",
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
      q: "¿Reunificar es lo mismo que refinanciar?",
      a: (
        <>No. Refinanciar es pedir un préstamo nuevo que alarga el plazo y encarece el total. Reunificar, como lo hacemos nosotros, es negociar con las entidades para bajar la cuota y el total sin firmar otro crédito.</>
      ),
      plain:
        "No. Refinanciar es pedir un préstamo nuevo que alarga el plazo y encarece el total. Reunificar, como lo hacemos nosotros, es negociar con las entidades para bajar la cuota y el total sin firmar otro crédito.",
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