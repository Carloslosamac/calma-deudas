import type { MoneyContent } from "./types";
import { A, OptionCards, WarningCallout, CheckList, FactGrid } from "@/components/seo/modules";
import lso1 from "@/assets/casos/lso-1.jpg";
import lso2 from "@/assets/casos/lso-2.jpg";
import lso3 from "@/assets/casos/lso-3.jpg";
import lso4 from "@/assets/casos/lso-4.jpg";
import lso5 from "@/assets/casos/lso-5.jpg";
import lso6 from "@/assets/casos/lso-6.jpg";

/**
 * Money page comercial de la Ley de Segunda Oportunidad.
 * Intención TRANSACCIONAL: captar el lead. La profundidad informativa
 * vive en el post pilar /blog/guia-ley-segunda-oportunidad (enlazado),
 * para no canibalizar.
 */
export const leySegundaOportunidad: MoneyContent = {
  path: "/ley-segunda-oportunidad",
  directAnswer: {
    question: "¿Qué es la Ley de Segunda Oportunidad y a quién le sirve?",
    answer: "La Ley de Segunda Oportunidad es el mecanismo legal que permite a una persona física insolvente y de buena fe, sea o no empresaria, pedir al juez la exoneración de las deudas que no puede pagar. Hay dos vías: con liquidación de bienes o con un plan de pagos sin liquidación previa, que permite conservar bienes como la vivienda. Si el juez concede la exoneración, se cancelan las deudas exonerables, con las excepciones y límites que fija la ley. En Calma analizamos tu caso gratis para decirte si puedes acogerte.",
    plain: "La Ley de Segunda Oportunidad es el mecanismo legal que permite a una persona física insolvente y de buena fe, sea o no empresaria, pedir al juez la exoneración de las deudas que no puede pagar. Hay dos vías: con liquidación de bienes o con un plan de pagos sin liquidación previa, que permite conservar bienes como la vivienda. Si el juez concede la exoneración, se cancelan las deudas exonerables, con las excepciones y límites que fija la ley. En Calma analizamos tu caso gratis para decirte si puedes acogerte.",
  },
  reviewed: true,
  tone: "transactional",
  layout: [
    "simulator",
    "benefits",
    "debtTypes",
    "steps",
    "legalTimeline",
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
      Llevas años pagando deudas que <strong>la ley te permite cancelar</strong>. Cada
      mes que pasa pierdes dinero que no vas a recuperar. En Calma te decimos hoy,
      gratis, cuánto deberías haber dejado de pagar ya.
    </>
  ),
  hero: {
    badge: "Ley de Segunda Oportunidad",
    titleLead: "Llevas años pagando una deuda",
    titleAccent: "que la ley puede borrar.",
    subtitle: (
      <>
        Miles de personas como tú ya cancelaron sus deudas <strong>legalmente</strong> y
        se preguntan por qué no lo hicieron antes. Cada mes que esperas, regalas tu
        nómina a los bancos. Te decimos hoy mismo, gratis, cuánto puedes dejar de pagar.
      </>
    ),
    trustNote: "Respuesta en 24h · Gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Respuesta en 24h · Gratis · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Beneficios de la Ley de Segunda Oportunidad",
  benefits: [
    {
      icon: "shield",
      title: "Exoneración de deudas",
      text: "Si el juez la concede, se cancelan las deudas exonerables que no puedes pagar, con las excepciones legales.",
    },
    {
      icon: "users",
      title: "Si alguien te avaló",
      text: "Tu exoneración no libera a tus avalistas (art. 492 TRLC). Lo valoramos para buscar la mejor salida también para ellos.",
    },
    {
      icon: "landmark",
      title: "Hacienda y Seguridad Social",
      text: "La deuda pública solo se exonera hasta los límites del art. 489 TRLC. Te decimos qué parte en tu caso.",
    },
    {
      icon: "phone-off",
      title: "Menos presión de acreedores",
      text: "Con el concurso, las reclamaciones de los acreedores se canalizan en el procedimiento judicial.",
    },
    {
      icon: "gavel",
      title: "Ejecuciones y embargos",
      text: "Con la declaración de concurso, por regla general se suspenden las ejecuciones en curso, con excepciones legales.",
    },
    {
      icon: "ban",
      title: "Ficheros de morosos",
      text: "Las deudas exoneradas dejan de ser exigibles, así que no deberían seguir constando como impagadas.",
    },
  ],
  testimonialsTitle: "Personas que ya empezaron de cero",
  testimonialsSubtitle:
    "Casos reales de personas que dejaron de pagar deudas que la ley les permitía cancelar. Tú puedes ser el próximo.",
  testimonialsMoreHref: "/casos-de-exito",
  testimonials: [
    {
      name: "Noemí V.",
      amount: "48.310 €",
      location: "Barcelona",
      text: "Arrastraba tarjetas, microcréditos e hipoteca. Hoy no debe nada y vuelve a dormir tranquila.",
      photo: lso1,
    },
    {
      name: "Antonio R.",
      amount: "22.179 €",
      location: "Sabadell",
      text: "Minicréditos que se le fueron de las manos. Canceló toda su deuda con la Ley de Segunda Oportunidad.",
      photo: lso2,
    },
    {
      name: "Juan Vicente T.",
      amount: "57.640 €",
      location: "Valencia",
      text: "Deudas con bancos y financieras. Empezó de cero y recuperó su nómina por completo.",
      photo: lso4,
    },
    {
      name: "Marta L.",
      amount: "31.890 €",
      location: "Madrid",
      text: "Préstamos personales que la asfixiaban. Hoy vuelve a tener margen para vivir y para los suyos.",
      photo: lso3,
    },
    {
      name: "David S.",
      amount: "44.250 €",
      location: "Sevilla",
      text: "Acumuló deudas con varias financieras. Empezó de cero y dejó atrás las llamadas y la presión.",
      photo: lso6,
    },
    {
      name: "Cristina M.",
      amount: "27.500 €",
      location: "Zaragoza",
      text: "Tarjetas y microcréditos que crecían cada mes. Canceló todo y recuperó la tranquilidad.",
      photo: lso5,
    },
  ],
  stepsTitle: "Tu camino hacia la libertad",
  stepsSubtitle: "Cuatro pasos claros para recuperar tu tranquilidad",
  steps: [
    {
      title: "Diagnóstico gratuito",
      text: "Analizamos tus deudas e ingresos para confirmar si puedes acogerte.",
    },
    {
      title: "Preparación del expediente",
      text: "Reunimos la documentación y diseñamos la mejor estrategia legal.",
    },
    {
      title: "Presentación judicial",
      text: "Solicitamos el concurso ante el Juzgado de lo Mercantil competente.",
    },
    {
      title: "Resolución de exoneración",
      text: "El juez decide sobre la exoneración. Si la concede, quedas libre de las deudas exonerables.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Hasta 100%", label: "De la deuda exonerable, si el juez concede la exoneración" },
    { value: "+19.000", label: "Familias ya libres de deudas en España" },
    { value: "Gratis", label: "Sabes hoy mismo cuánto puedes dejar de pagar" },
  ],
  eligibility: {
    title: "¿Es para mí?",
    intro: (
      <>
        Si eres particular o autónomo, actúas de buena fe y no tienes condenas por
        delitos económicos en los últimos 10 años, lo más probable es que sí.
      </>
    ),
    requirements: [
      "Eres particular o autónomo en situación de insolvencia (no puedes pagar tus deudas).",
      "Actúas de buena fe: no has ocultado bienes ni provocado tu insolvencia de forma fraudulenta.",
      "No has sido condenado por determinados delitos socioeconómicos en los últimos diez años.",
      "Tus deudas no provienen, en su mayoría, de sanciones o conductas dolosas.",
      "Tener bienes no te excluye: existe la exoneración con plan de pagos sin liquidación previa. Pero si tienes vivienda, terreno u otros bienes de valor totalmente pagados, valoramos contigo si te protege más reunificar.",
    ],
    trustTitle: "Contenido actualizado a la normativa vigente",
    trustText: "Redactado sobre el texto consolidado de la Ley Concursal (TRLC) tras la reforma de la Ley 16/2022.",
  },
  closing: {
    title: "Cada mes que esperas, regalas tu nómina",
    text: "La gente que ya se acogió solo se arrepiente de una cosa: no haberlo hecho antes. Mientras lo piensas, los intereses crecen y los embargos avanzan. Pide tu estudio gratis ahora y deja de pagar lo que la ley puede borrar.",
  },
  interactive: {
    legalTimeline: {
      title: "Las fases de la Ley de Segunda Oportunidad",
      subtitle: "Un procedimiento judicial reglado. Te acompañamos en cada fase.",
      phases: [
        {
          title: "Diagnóstico y preparación",
          duration: "Inicio",
          text: "Estudiamos tus deudas, ingresos y bienes, comprobamos si cumples los requisitos y reunimos la documentación.",
        },
        {
          title: "Solicitud de concurso",
          duration: "Juzgado de lo Mercantil",
          text: "Desde la reforma de 2022 ya no hay acuerdo extrajudicial previo con mediador: se solicita directamente el concurso. Con su declaración, por regla general se suspenden las ejecuciones en curso, con excepciones legales.",
        },
        {
          title: "Plan de pagos o liquidación",
          duration: "Variable",
          text: "Según tu caso, se pide la exoneración con un plan de pagos sin liquidar bienes (normalmente 3 años, 5 en los supuestos del art. 497 TRLC) o tras la liquidación de la masa activa o en un concurso sin masa.",
        },
        {
          title: "Exoneración del pasivo (EPI)",
          duration: "Resolución",
          text: "El juez resuelve sobre la exoneración. Si la concede, se cancelan las deudas exonerables; con plan de pagos, la exoneración definitiva llega al terminar el plan.",
        },
      ],
    },
    simulator: {
      title: "¿Cuánto llevas pagando de más?",
      subtitle: "Mueve los controles y descubre en 10 segundos lo que la ley puede borrar.",
      maxDebt: 120000,
      maxMonthly: 2000,
      defaultDebt: 25000,
      defaultMonthly: 450,
    },
    debtTypesTitle: "¿De dónde vienen tus deudas?",
    debtTypesSubtitle: "Elige lo que más se parece a tu caso y te decimos por dónde empezar.",
    debtTypes: [
      {
        label: "Tarjetas revolving",
        message:
          "Las revolving suelen tener intereses abusivos. Muchas veces se pueden anular y, con la Ley de Segunda Oportunidad, cancelar por completo.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Cómo cancelar tarjetas revolving",
      },
      {
        label: "Microcréditos",
        message:
          "Los microcréditos se acumulan rápido y ahogan. Entran de lleno en la Ley de Segunda Oportunidad y se pueden cancelar.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cómo cancelar microcréditos",
      },
      {
        label: "Préstamos bancarios",
        message:
          "Préstamos personales y descubiertos con el banco también se cancelan si no puedes asumirlos. Lo estudiamos gratis.",
        to: "/cancelar-deudas",
        linkLabel: "Cancelar deudas con el banco",
      },
      {
        label: "Hipoteca",
        message:
          "La hipoteca es delicada: no siempre implica perder la vivienda. Valoramos tu caso para protegerla en lo posible.",
      },
      {
        label: "Hacienda / Seg. Social",
        message:
          "La deuda pública con Hacienda y Seguridad Social también se exonera, con ciertos límites. Te decimos cuánto en tu caso.",
        to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
        linkLabel: "Exoneración del pasivo insatisfecho",
      },
      {
        label: "Varias a la vez",
        message:
          "Lo más habitual: varias deudas a la vez. Las unificamos en una única estrategia para cancelar el máximo posible.",
        to: "/reunificar-deudas",
        linkLabel: "Ver opciones para varias deudas",
      },
    ],
    quiz: {
      title: "¿Tu caso encaja? Descúbrelo en 30 segundos",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        {
          text: "¿No puedes pagar tus deudas con tus ingresos actuales?",
          goodAnswer: "yes",
        },
        {
          text: "¿Tus deudas suman más de 5.000 €?",
          goodAnswer: "yes",
        },
        {
          text: "¿Has actuado de buena fe (sin ocultar bienes ni provocar la insolvencia)?",
          goodAnswer: "yes",
        },
        {
          text: "¿Tienes vivienda u otros bienes de valor totalmente pagados?",
          goodAnswer: "no",
        },
        {
          text: "¿Has sido condenado por delitos económicos en los últimos 10 años?",
          goodAnswer: "no",
        },
      ],
      resultPass: {
        title: "Tu caso encaja. ¿A qué esperas?",
        text: "Cumples las condiciones clave para cancelar tus deudas. Cada mes que sigues pagando es dinero perdido. Pide tu estudio gratis ahora y confirma cuánto puedes borrar.",
      },
      resultDoubt: {
        title: "Probablemente sí. No te quedes con la duda.",
        text: "Si tienes bienes de valor totalmente pagados, la LSO podría liquidarlos y quizá te convenga más reunificar para protegerlos. Casos muy parecidos al tuyo se resuelven cada semana: te decimos la vía exacta gratis en 24h.",
      },
    },
    beforeAfter: {
      title: "Esto es lo que te estás perdiendo",
      subtitle: "La diferencia entre seguir pagando y haber dado el paso hace tiempo.",
      beforeLabel: "Hoy, con deudas",
      afterLabel: "Después, con Calma",
      before: [
        "Llamadas y cartas de acreedores cada semana",
        "Sueldo que se va entero en cuotas e intereses",
        "Miedo constante a un embargo",
        "Sin margen para imprevistos ni para tu familia",
        "Estrés y noches sin dormir",
      ],
      after: [
        "Se acaban las llamadas y la presión",
        "Recuperas tu nómina para vivir",
        "Ejecuciones suspendidas, por regla general, durante el concurso",
        "Si se concede la exoneración, empiezas sin esas deudas",
        "Tranquilidad para volver a respirar",
      ],
    },
  },
  sections: [
    {
      title: "¿Qué pasa con tu vivienda y tus bienes?",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            La duda que más frena a la gente es perder la casa. La realidad es que{" "}
            <strong>acogerse a la ley no significa quedarte sin nada</strong>. La ley
            distingue entre dos vías y elegimos contigo la que más te protege.
          </p>
          <OptionCards
            columns={2}
            items={[
              {
                icon: "scale",
                title: "Con liquidación",
                text: "Se realizan los bienes para pagar lo posible y el resto de la deuda se cancela. Útil si no tienes vivienda o ya está sobre-endeudada.",
              },
              {
                icon: "lock",
                title: "Con plan de pagos",
                text: "Sin liquidar tus bienes: pagas una parte adaptada a tus ingresos durante el plan (por regla general 3 años, 5 si no se realiza la vivienda habitual) y el resto exonerable se cancela al obtener la exoneración definitiva.",
              },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            En muchos casos la vivienda <strong>sí se puede mantener</strong>, sobre todo
            cuando la hipoteca está casi pagada o cuando el valor de la casa no supera lo
            que aún debes. Antes de presentar nada analizamos tu situación para proteger lo
            máximo posible. Nada se decide sin ti.
          </p>
          <WarningCallout title="Si tienes bienes de valor totalmente pagados">
            <p>
              Si tienes una <strong>vivienda, terreno u otros bienes de valor totalmente
              pagados</strong> (sin hipoteca y con valor real), la fase de liquidación de la LSO
              podría realizarlos para pagar a los acreedores. En esa situación suele compensar más{" "}
              <A to="/reunificar-deudas">reunificar</A> tus deudas en una sola cuota y conservar
              ese patrimonio. Lo valoramos contigo gratis antes de elegir vía.
            </p>
          </WarningCallout>
        </div>
      ),
    },
    {
      title: "Cómo afecta a tu día a día",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            Algunos efectos llegan antes de la resolución final del juez, aunque dependen
            de cada caso:
          </p>
          <CheckList
            items={[
              "Las reclamaciones de los acreedores pasan a canalizarse en el procedimiento.",
              "Por regla general, las ejecuciones y embargos en curso se suspenden con la declaración de concurso, con excepciones legales.",
              "Recuperas el control de tu sueldo para llegar a fin de mes.",
              "Las deudas exoneradas no deberían seguir constando en ASNEF u otros ficheros de morosos.",
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            Es importante saberlo: durante el procedimiento tu vida sigue. Puedes
            trabajar, cobrar tu nómina y volver a respirar mientras avanzamos.
          </p>
        </div>
      ),
    },
    {
      title: "Coste y plazos",
      body: (
        <div className="space-y-5">
          <FactGrid
            items={[
              { value: "Gratis", label: "Diagnóstico inicial", detail: "Te decimos en 24h si encajas, sin compromiso." },
              { value: "6–18 meses", label: "Duración", detail: "Orientativo: depende de la complejidad, la vía elegida y el juzgado." },
              { value: "Cerrado", label: "Presupuesto", detail: "Precio fijo con opción de pago fraccionado." },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            ¿Tu deuda viene sobre todo de productos abusivos? Mira también cómo{" "}
            <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>{" "}
            o <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Otras vías que valoramos contigo",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            La Ley de Segunda Oportunidad no siempre es la única opción. Según tu caso,
            también estudiamos:
          </p>
          <OptionCards
            items={[
              {
                icon: "wallet",
                title: "Reunificar tus deudas",
                text: "Unificar todo en una sola cuota si aún puedes pagar y quieres proteger tu patrimonio.",
                links: <A to="/reunificar-deudas">Reunificar deudas</A>,
              },
              {
                icon: "ban",
                title: "Cancelar deudas",
                text: "Cancelar deudas concretas con bancos y financieras.",
                links: <A to="/cancelar-deudas">Cancelar deudas</A>,
              },
              {
                icon: "scale",
                title: "Exoneración del pasivo",
                text: "El corazón legal de la ley: la resolución judicial que cancela lo que no puedes pagar.",
                links: <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">Exoneración del pasivo</A>,
              },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            ¿Prefieres entender la ley en profundidad antes de decidir? Lee nuestra{" "}
            <A to="/blog/guia-ley-segunda-oportunidad">guía completa de la Ley de Segunda Oportunidad</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Qué necesitas para empezar hoy",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            No hace falta que lo tengas todo ordenado. Para el{" "}
            <strong>diagnóstico gratuito</strong> basta con una idea aproximada de tu
            situación; los documentos los reunimos contigo después.
          </p>
          <CheckList
            items={[
              "Un listado, aunque sea aproximado, de tus deudas y acreedores.",
              "Tus ingresos actuales (nómina, prestación o ingresos como autónomo).",
              "Si tienes vivienda u otros bienes a tu nombre.",
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            Con eso te decimos en 24h si encajas y cuánto puedes dejar de pagar. Sin
            compromiso y sin coste. Cada mes que esperas es dinero que no recuperas.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿Qué deudas se pueden cancelar con la Ley de Segunda Oportunidad?",
      a: (
        <>La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda con Hacienda y Seguridad Social solo se exonera hasta los límites del art. 489 TRLC, y hay deudas no exonerables como las de alimentos.</>
      ),
      plain:
        "La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda con Hacienda y Seguridad Social solo se exonera hasta los límites del art. 489 TRLC, y hay deudas no exonerables como las de alimentos.",
    },
    {
      q: "¿Cuánto cuesta acogerse?",
      a: (
        <>El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado desde el inicio y opción de pago fraccionado.</>
      ),
      plain:
        "El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado desde el inicio y opción de pago fraccionado.",
    },
    {
      q: "¿Pierdo mi vivienda si me acojo?",
      a: (
        <>No necesariamente. Depende del valor de la vivienda, la deuda pendiente y tu situación. Lo analizamos en el diagnóstico gratuito antes de tomar cualquier decisión.</>
      ),
      plain:
        "No necesariamente. Depende del valor de la vivienda, la deuda pendiente y tu situación. Lo analizamos en el diagnóstico gratuito antes de tomar cualquier decisión.",
    },
    {
      q: "¿Cuánto tarda el procedimiento?",
      a: (
        <>Como orientación, entre 6 y 18 meses según la complejidad y el juzgado. Si eliges plan de pagos, la exoneración definitiva llega al terminar el plan (por regla general 3 años, 5 en los supuestos del art. 497 TRLC).</>
      ),
      plain:
        "Como orientación, entre 6 y 18 meses según la complejidad y el juzgado. Si eliges plan de pagos, la exoneración definitiva llega al terminar el plan (por regla general 3 años, 5 en los supuestos del art. 497 TRLC).",
    },
    {
      q: "¿Puedo acogerme si soy autónomo?",
      a: (
        <>Sí. La ley está pensada tanto para particulares como para autónomos de buena fe en situación de insolvencia. Valoramos también el concurso de persona física cuando encaja mejor.</>
      ),
      plain:
        "Sí. La ley está pensada tanto para particulares como para autónomos de buena fe en situación de insolvencia. Valoramos también el concurso de persona física cuando encaja mejor.",
    },
    {
      q: "¿Qué es exactamente la Ley de Segunda Oportunidad?",
      a: (
        <>Es el mecanismo legal que permite a una persona física insolvente y de buena fe pedir al juez la exoneración de las deudas que no puede pagar, con liquidación de bienes o con un plan de pagos. Si se concede, se cancelan las deudas exonerables, con las excepciones y límites legales.</>
      ),
      plain:
        "Es el mecanismo legal que permite a una persona física insolvente y de buena fe pedir al juez la exoneración de las deudas que no puede pagar, con liquidación de bienes o con un plan de pagos. Si se concede, se cancelan las deudas exonerables, con las excepciones y límites legales.",
    },
    {
      q: "¿Qué requisitos hay que cumplir?",
      a: (
        <>Ser insolvente (no poder pagar tus deudas), actuar de buena fe, no haber sido condenado por ciertos delitos económicos en los 10 años previos y no haber obtenido una exoneración dentro de los plazos del art. 488 TRLC. En el diagnóstico gratuito confirmamos si cumples.</>
      ),
      plain:
        "Ser insolvente (no poder pagar tus deudas), actuar de buena fe, no haber sido condenado por ciertos delitos económicos en los 10 años previos y no haber obtenido una exoneración dentro de los plazos del art. 488 TRLC. En el diagnóstico gratuito confirmamos si cumples.",
    },
    {
      q: "¿Es fiable la Ley de Segunda Oportunidad?",
      a: (
        <>Sí. Es una ley estatal en vigor desde 2015 (y reforzada por la reforma concursal de 2022) que han aplicado miles de personas en España a través de los juzgados. No es una promesa comercial: es un procedimiento judicial real.</>
      ),
      plain:
        "Sí. Es una ley estatal en vigor desde 2015 (y reforzada por la reforma concursal de 2022) que han aplicado miles de personas en España a través de los juzgados. No es una promesa comercial: es un procedimiento judicial real.",
    },
    {
      q: "¿Quién puede acogerse a la Ley de Segunda Oportunidad?",
      a: (
        <>Cualquier persona física —particular o autónomo— que sea insolvente y actúe de buena fe. No es necesario ser empresario ni carecer de bienes: quien tiene bienes puede pedir la exoneración con plan de pagos sin liquidación previa.</>
      ),
      plain:
        "Cualquier persona física —particular o autónomo— que sea insolvente y actúe de buena fe. No es necesario ser empresario ni carecer de bienes: quien tiene bienes puede pedir la exoneración con plan de pagos sin liquidación previa.",
    },
    {
      q: "¿Me pueden embargar el coche o la nómina durante el proceso?",
      a: (
        <>Con la declaración de concurso, por regla general no pueden iniciarse nuevas ejecuciones y las que están en curso se suspenden. Hay excepciones legales (por ejemplo, ciertos procedimientos de apremio de Hacienda o Seguridad Social o algunas garantías reales), así que lo revisamos caso a caso.</>
      ),
      plain:
        "Con la declaración de concurso, por regla general no pueden iniciarse nuevas ejecuciones y las que están en curso se suspenden. Hay excepciones legales (por ejemplo, ciertos procedimientos de apremio de Hacienda o Seguridad Social o algunas garantías reales), así que lo revisamos caso a caso.",
    },
    {
      q: "¿Puedo acogerme dos veces a la Ley de Segunda Oportunidad?",
      a: (
        <>Sí, respetando los plazos del art. 488 TRLC: dos años desde una exoneración definitiva con plan de pagos o cinco desde una exoneración con liquidación. Una nueva exoneración no alcanza al crédito público.</>
      ),
      plain:
        "Sí, respetando los plazos del art. 488 TRLC: dos años desde una exoneración definitiva con plan de pagos o cinco desde una exoneración con liquidación. Una nueva exoneración no alcanza al crédito público.",
    },
    {
      q: "¿Qué pasa después de la Ley de Segunda Oportunidad?",
      a: (
        <>Quedas libre de las deudas exoneradas y sales de los ficheros de morosos vinculados a ellas, lo que te permite reconstruir tu vida financiera: abrir cuentas, ahorrar y volver a tener acceso al crédito con el tiempo.</>
      ),
      plain:
        "Quedas libre de las deudas exoneradas y sales de los ficheros de morosos vinculados a ellas, lo que te permite reconstruir tu vida financiera: abrir cuentas, ahorrar y volver a tener acceso al crédito con el tiempo.",
    },
  ],
};