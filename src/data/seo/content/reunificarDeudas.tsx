import type { MoneyContent } from "./types";
import { A, CheckList, WarningCallout, ActionLink } from "@/components/seo/modules";
import p1 from "@/assets/testimonial-1.jpg";
import p2 from "@/assets/testimonial-2.jpg";
import p3 from "@/assets/testimonial-3.jpg";
import p4 from "@/assets/testimonial-4.jpg";
import p5 from "@/assets/testimonial-5.jpg";
import p6 from "@/assets/testimonial-6.jpg";

/**
 * Money page "Reunificar deudas". Ángulo acción paso a paso: cómo reunificar hoy.
 * Enlaza a /reunificacion-deudas (pilar comparativo) para profundizar y al hub
 * LSO cuando reunificar no basta, para no canibalizar.
 */
export const reunificarDeudas: MoneyContent = {
  path: "/reunificar-deudas",
  reviewed: true,
  tone: "transactional",
  layout: [
    "steps",
    "simulator",
    "benefits",
    "debtTypes",
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
      ¿Pagas varios préstamos y no te aclaras? Te explicamos <strong>cómo reunificar tus
      deudas hoy</strong>: negociamos con tus entidades para bajar la cuota <strong>y</strong> el
      total, paso a paso. No es un préstamo nuevo. Vemos gratis si es lo mejor para ti.
    </>
  ),
  hero: {
    badge: "Reunificar deudas",
    titleLead: "Reunifica tus deudas",
    titleAccent: "negociando cuota y total.",
    subtitle: (
      <>
        Negociamos extrajudicialmente con tus acreedores para rebajar <strong>la cuota y el
        importe total</strong> que debes. No firmas otro préstamo. Te guiamos paso a paso y, si
        sale mejor cancelar, también te lo decimos. Estudio gratis.
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
  benefitsTitle: "Qué consigues al reunificar",
  benefits: [
    {
      icon: "wallet",
      title: "Menos total",
      text: "Negociamos con tus entidades para rebajar el importe global, no solo aplazarlo.",
    },
    {
      icon: "clock",
      title: "Cuota más baja",
      text: "Reduces el pago mensual y recuperas margen para llegar a fin de mes.",
    },
    {
      icon: "sparkles",
      title: "Sin préstamo nuevo",
      text: "No firmas otro crédito ni alargas el plazo: mejoramos la deuda que ya tienes.",
    },
    {
      icon: "scale",
      title: "Sin pasarte de la raya",
      text: "Si vemos que no puedes asumir ni una cuota, te recomendamos cancelar.",
    },
    {
      icon: "users",
      title: "Un solo trato",
      text: "Negociamos por ti con cada acreedor: dejas de lidiar con todos a la vez.",
    },
    {
      icon: "lock",
      title: "Todo claro antes de firmar",
      text: "Te enseñamos cuota, plazo y coste total. Tú decides con los números delante.",
    },
  ],
  testimonialsTitle: "Personas que dieron el paso",
  testimonialsSubtitle:
    "Casos reales de personas que reunificaron sus deudas y volvieron a respirar.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    {
      name: "Pablo S.",
      amount: "4 cuotas → 1",
      location: "Madrid",
      text: "Reuní cuatro préstamos en una sola cuota. Fue más rápido y sencillo de lo que creía.",
      photo: p1,
    },
    {
      name: "Laura G.",
      amount: "-38% de cuota",
      location: "Valencia",
      text: "Bajé bastante el pago mensual y dejé de hacer malabares con los recibos.",
      photo: p2,
    },
    {
      name: "Víctor M.",
      amount: "5 cuotas → 1",
      location: "Sevilla",
      text: "Me guiaron paso a paso. Ahora un único pago y mucha más tranquilidad.",
      photo: p3,
    },
    {
      name: "Cristina B.",
      amount: "-42% de cuota",
      location: "Bilbao",
      text: "Tenía varias deudas pequeñas. Reunificarlas me devolvió el control de mi sueldo.",
      photo: p4,
    },
    {
      name: "Hugo P.",
      amount: "3 cuotas → 1",
      location: "Málaga",
      text: "Antes de firmar me enseñaron todos los números. Sin sorpresas y todo claro.",
      photo: p5,
    },
    {
      name: "Ana T.",
      amount: "-30% de cuota",
      location: "Zaragoza",
      text: "Reuní préstamos y tarjeta. Una sola cuota asumible y por fin duermo tranquila.",
      photo: p6,
    },
  ],
  stepsTitle: "Cómo reunificar tus deudas paso a paso",
  stepsSubtitle: "Cuatro pasos para negociar y rebajar tu deuda",
  steps: [
    {
      title: "Reúne tus deudas",
      text: "Anota tus préstamos, tarjetas y cuotas actuales, aunque sea de forma aproximada.",
    },
    {
      title: "Estudio gratuito",
      text: "Analizamos tus números y vemos si reunificar te conviene o si es mejor cancelar.",
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
    { value: "Paso a paso", label: "Te guiamos en todo el proceso" },
    { value: "Menos total", label: "Negociamos para rebajar lo que debes" },
    { value: "Gratis", label: "Estudiamos tu caso sin compromiso" },
  ],
  eligibility: {
    title: "¿Puedo reunificar mis deudas?",
    intro: (
      <>
        Reunificar encaja en dos perfiles: cuando <strong>todavía puedes pagar</strong> una
        cuota única más baja, o cuando <strong>no puedes pagar pero tienes bienes de valor
        pagados</strong> (vivienda, terreno) que la cancelación por LSO podría liquidar. Esto
        es lo que tenemos en cuenta:
      </>
    ),
    requirements: [
      "Tienes dos o más préstamos o deudas con cuotas distintas.",
      "Cuentas con ingresos para asumir una cuota única, o tienes patrimonio pagado que quieres proteger.",
      "Quieres simplificar y reducir el pago mensual.",
      "Buscas una guía clara, paso a paso, para hacerlo bien.",
    ],
    trustTitle: "Asesoramiento honesto",
    trustText: "Si reunificar no es lo mejor para ti, te lo diremos.",
  },
  closing: {
    title: "Da el paso hoy: una cuota en lugar de varias",
    text: "Cuanto antes lo veas, antes recuperas margen. Pide tu estudio gratis y te guiamos paso a paso para reunificar (o cancelar, si te conviene más).",
  },
  interactive: {
    simulator: {
      title: "¿Cuál sería tu nueva cuota única?",
      subtitle: "Mueve los controles para hacerte una idea. La cifra exacta la vemos gratis.",
      maxDebt: 120000,
      maxMonthly: 2500,
      defaultDebt: 25000,
      defaultMonthly: 700,
    },
    debtTypesTitle: "¿Qué quieres reunificar?",
    debtTypesSubtitle: "Elige tu caso y te decimos por dónde empezar.",
    debtTypes: [
      {
        label: "Varios préstamos",
        message:
          "El caso ideal para reunificar: juntamos todos tus préstamos en una sola cuota más baja.",
        to: "/reunificacion-deudas",
        linkLabel: "Más sobre reunificación de deudas",
      },
      {
        label: "Préstamos + tarjetas",
        message:
          "Se pueden incluir tarjetas, pero antes revisamos si tienen intereses abusivos.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Revisar tarjetas revolving",
      },
      {
        label: "Microcréditos",
        message:
          "Con interés muy alto, a veces conviene cancelar el microcrédito antes que reunificarlo.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cancelar microcréditos",
      },
      {
        label: "Ya no puedo pagar",
        message:
          "Si no puedes asumir ninguna cuota y no tienes bienes de valor que perder, reunificar no basta: mejor cancelar con la Ley de Segunda Oportunidad.",
        to: "/ley-segunda-oportunidad",
        linkLabel: "Ley de Segunda Oportunidad",
      },
      {
        label: "No puedo pagar, pero tengo bienes pagados",
        message:
          "Si tienes vivienda o terreno totalmente pagados, cancelar con la LSO podría liquidarlos. Reunificar te permite proteger ese patrimonio agrupando todo en una cuota.",
      },
      {
        label: "No lo tengo claro",
        message:
          "Te hacemos la comparativa reunificar vs cancelar, gratis y sin compromiso.",
        to: "/cancelar-deudas",
        linkLabel: "Ver opción de cancelar",
      },
    ],
    quiz: {
      title: "¿Te conviene reunificar? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Tienes dos o más deudas con cuotas distintas?", goodAnswer: "yes" },
        { text: "¿Tienes ingresos estables o bienes de valor pagados que quieras proteger?", goodAnswer: "yes" },
        { text: "¿Quieres bajar y simplificar tu pago mensual?", goodAnswer: "yes" },
        { text: "¿Te resulta imposible pagar ninguna cuota?", goodAnswer: "no" },
      ],
      resultPass: {
        title: "Reunificar puede funcionar contigo",
        text: "Tu perfil encaja con la reunificación. Pide tu estudio gratis y te damos la nueva cuota real, paso a paso.",
      },
      resultDoubt: {
        title: "Puede que te convenga cancelar",
        text: "Si las cuotas te superan y no tienes bienes de valor que proteger, reunificar quizá no baste y cancelar con la LSO sea mejor. Te comparamos ambas vías gratis.",
      },
    },
    beforeAfter: {
      title: "Antes y después de reunificar",
      subtitle: "Lo que cambia al juntar tus deudas en una sola cuota.",
      beforeLabel: "Hoy, con varias cuotas",
      afterLabel: "Después de reunificar",
      before: [
        "Varios recibos cada mes",
        "Suma de cuotas que ahoga",
        "Despistes y riesgo de impago",
        "Varios acreedores",
        "Cero margen a fin de mes",
      ],
      after: [
        "Un único pago mensual",
        "Cuota más baja y asumible",
        "Todo bajo control",
        "Un solo interlocutor",
        "Algo de margen recuperado",
      ],
    },
  },
  sections: [
    {
      title: "Cómo reunificar deudas paso a paso",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">Reunificar es más sencillo de lo que parece si sigues estos pasos:</p>
          <ol className="space-y-3">
            {[
              "Haz un listado de tus deudas, cuotas y plazos actuales.",
              "Calcula cuánto pagas en total cada mes.",
              "Pide un estudio para ver tu nueva cuota única y el coste total.",
              "Compara reunificar con cancelar y elige con los números delante.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4 rounded-2xl border border-border bg-surface-elevated p-4 shadow-soft">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                  {i + 1}
                </span>
                <span className="text-base leading-relaxed text-foreground/85">{step}</span>
              </li>
            ))}
          </ol>
          <ActionLink to="/reunificacion-deudas">
            ¿Quieres entender ventajas y riesgos a fondo?{" "}
            <span className="text-accent-deep">Guía de reunificación de deudas</span>
          </ActionLink>
        </div>
      ),
    },
    {
      title: "Qué necesitas para empezar",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">No hace falta tenerlo todo perfecto. Para el estudio gratuito basta con:</p>
          <CheckList
            items={[
              "Un listado aproximado de tus préstamos y tarjetas.",
              "La cuota que pagas por cada uno al mes.",
              "Tus ingresos mensuales actuales.",
            ]}
          />
        </div>
      ),
    },
    {
      title: "Cuándo NO conviene reunificar",
      body: (
        <WarningCallout title="Reunificar no siempre es la mejor idea">
          <p>
            Si ya <strong>no puedes pagar ninguna cuota</strong> y <strong>no tienes bienes de
            valor que perder</strong>, juntarlas solo alarga el problema y encarece la deuda. En
            ese caso suele ser mejor cancelar con la <A to="/ley-segunda-oportunidad">Ley de
            Segunda Oportunidad</A>.
          </p>
          <p>
            En cambio, si no puedes pagar pero sí tienes vivienda o terreno pagados, reunificar
            es la vía que protege ese patrimonio. Evita reunificar poniendo tu vivienda como
            garantía sin valorarlo bien.
          </p>
        </WarningCallout>
      ),
    },
    {
      title: "Coste y siguiente paso",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            El <strong>estudio es gratuito y sin compromiso</strong>. Te mostramos la cuota,
            el plazo y el coste total, y lo comparamos con{" "}
            <A to="/cancelar-deudas">cancelar tus deudas</A> para que elijas con seguridad.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿Cómo se reunifican las deudas?",
      a: (
        <>Se juntan tus préstamos y deudas en una sola operación con una única cuota mensual. Hacemos un estudio, te proponemos la nueva cuota y, si encaja, se formaliza.</>
      ),
      plain:
        "Se juntan tus préstamos y deudas en una sola operación con una única cuota mensual. Hacemos un estudio, te proponemos la nueva cuota y, si encaja, se formaliza.",
    },
    {
      q: "¿Qué necesito para reunificar?",
      a: (
        <>Un listado aproximado de tus deudas y cuotas, y tus ingresos mensuales. Con eso hacemos el estudio gratuito.</>
      ),
      plain:
        "Un listado aproximado de tus deudas y cuotas, y tus ingresos mensuales. Con eso hacemos el estudio gratuito.",
    },
    {
      q: "¿Cuándo no conviene reunificar?",
      a: (
        <>Cuando ya no puedes pagar ninguna cuota: juntarlas solo alarga el problema. En ese caso suele ser mejor cancelar con la Ley de Segunda Oportunidad.</>
      ),
      plain:
        "Cuando ya no puedes pagar ninguna cuota: juntarlas solo alarga el problema. En ese caso suele ser mejor cancelar con la Ley de Segunda Oportunidad.",
    },
    {
      q: "¿El estudio cuesta algo?",
      a: (
        <>No. El estudio es gratuito y sin compromiso, y te damos una comparativa honesta entre reunificar y cancelar.</>
      ),
      plain:
        "No. El estudio es gratuito y sin compromiso, y te damos una comparativa honesta entre reunificar y cancelar.",
    },
  ],
};