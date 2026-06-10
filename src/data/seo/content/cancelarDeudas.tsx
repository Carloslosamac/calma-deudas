import { Link } from "react-router-dom";
import type { MoneyContent } from "./types";
import p1 from "@/assets/person-closeup-man-1.jpg";
import p2 from "@/assets/person-closeup-woman-1.jpg";
import p3 from "@/assets/person-closeup-man-2.jpg";
import p4 from "@/assets/person-closeup-woman-2.jpg";
import p5 from "@/assets/person-closeup-man-3.jpg";
import p6 from "@/assets/person-closeup-woman-3.jpg";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Money page "Cancelar deudas". Ángulo acción/resultado: eliminar lo que no
 * puedes pagar. Deriva al hub LSO y a productos abusivos. La versión informativa
 * vive en /cancelacion-de-deudas (enlazada) para no canibalizar.
 */
export const cancelarDeudas: MoneyContent = {
  path: "/cancelar-deudas",
  reviewed: true,
  tone: "transactional",
  layout: [
    "simulator",
    "debtTypes",
    "comparisonTable",
    "benefits",
    "urgencyTimeline",
    "steps",
    "quiz",
    "metrics",
    "testimonials",
    "sections",
    "beforeAfter",
    "eligibility",
    "faq",
    "closing",
  ],
  intro: (
    <>
      Quieres que tu deuda <strong>desaparezca</strong>, pero no sabes por dónde empezar.
      Existen varias vías legales y la clave está en <strong>elegir la correcta para tu
      caso</strong>. Te decimos hoy, gratis, cuál es la tuya.
    </>
  ),
  hero: {
    badge: "Cancelar deudas",
    titleLead: "Quieres que tu deuda desaparezca.",
    titleAccent: "Te decimos cómo.",
    subtitle: (
      <>
        No hay una sola forma de eliminar una deuda: cancelar por ley, anular intereses
        abusivos, negociar una quita o reunificar. Lo difícil es saber{" "}
        <strong>cuál encaja contigo</strong>. Lo estudiamos hoy mismo, gratis, y te
        decimos por qué vía tu deuda puede desaparecer.
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
  benefitsTitle: "El resultado, elijas la vía que elijas",
  benefits: [
    {
      icon: "shield",
      title: "Eliminación de la deuda",
      text: "Sea por la vía que sea, el objetivo es el mismo: que la deuda desaparezca y no vuelva.",
    },
    {
      icon: "wallet",
      title: "Recuperas tu sueldo",
      text: "Sin cuotas que te asfixian, tu nómina vuelve a ser tuya para vivir.",
    },
    {
      icon: "phone-off",
      title: "Se acaban las llamadas",
      text: "Paramos la presión de acreedores y empresas de recobro.",
    },
    {
      icon: "gavel",
      title: "Embargos suspendidos",
      text: "Frenamos los embargos en curso, incluido el de la nómina, desde el primer paso.",
    },
    {
      icon: "ban",
      title: "Salida del ASNEF",
      text: "Limpiamos tus datos de los ficheros de morosos para que vuelvas a empezar.",
    },
    {
      icon: "sparkles",
      title: "Empiezas de cero",
      text: "Recuperas la tranquilidad y el control de tus finanzas sin esa carga.",
    },
  ],
  testimonialsTitle: "Personas que ya cancelaron sus deudas",
  testimonialsSubtitle:
    "Casos reales de personas que dejaron de pagar lo que la ley les permitía cancelar.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    {
      name: "Iván T.",
      amount: "37.420 €",
      location: "Madrid",
      text: "Tarjetas y dos préstamos personales. Hoy no debo nada y vuelvo a llegar a fin de mes.",
      photo: p1,
    },
    {
      name: "Sara M.",
      amount: "21.960 €",
      location: "Murcia",
      text: "Microcréditos que se multiplicaban. Los cancelé todos y recuperé mi nómina.",
      photo: p2,
    },
    {
      name: "Andrés L.",
      amount: "45.180 €",
      location: "Valencia",
      text: "Deudas con varios bancos. Empecé de cero y dejé atrás las llamadas constantes.",
      photo: p3,
    },
    {
      name: "Nuria P.",
      amount: "28.300 €",
      location: "Sevilla",
      text: "Préstamos personales que me ahogaban. Hoy tengo margen para vivir y para mis hijos.",
      photo: p4,
    },
    {
      name: "Carlos H.",
      amount: "52.040 €",
      location: "Bilbao",
      text: "Acumulé deuda con cinco financieras. Lo cancelé todo y se acabó la presión.",
      photo: p5,
    },
    {
      name: "Beatriz V.",
      amount: "24.870 €",
      location: "Zaragoza",
      text: "Tarjetas revolving que crecían cada mes. Las cancelé y recuperé la tranquilidad.",
      photo: p6,
    },
  ],
  stepsTitle: "De no saber qué hacer a tu deuda eliminada",
  stepsSubtitle: "Cuatro pasos claros, sin que tengas que decidir solo",
  steps: [
    {
      title: "Diagnóstico gratuito",
      text: "Analizamos tus deudas e ingresos para ver qué vías encajan con tu caso.",
    },
    {
      title: "Elegimos la vía correcta",
      text: "Comparamos cancelar, reclamar, negociar o reunificar y te decimos cuál te conviene.",
    },
    {
      title: "Inicio del proceso",
      text: "Ponemos en marcha la cancelación y frenamos la presión de los acreedores.",
    },
    {
      title: "Deuda eliminada",
      text: "Te quitas la carga y empiezas de cero.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Hasta 100%", label: "De tus deudas, canceladas para siempre" },
    { value: "+19.000", label: "Familias ya libres de deudas en España" },
    { value: "Gratis", label: "Sabes hoy mismo cuánto puedes dejar de pagar" },
  ],
  eligibility: {
    title: "¿Puede desaparecer mi deuda?",
    intro: (
      <>
        Casi siempre hay una vía para eliminar la deuda; lo que cambia es cuál. Si te
        reconoces en estos puntos, lo más probable es que podamos hacerla desaparecer.
        Lo confirmamos gratis.
      </>
    ),
    requirements: [
      "No puedes pagar tus deudas con tus ingresos actuales.",
      "Actúas de buena fe: no has ocultado bienes ni provocado tu insolvencia de forma fraudulenta.",
      "Tus deudas vienen de préstamos, tarjetas, microcréditos o proveedores (no solo de sanciones).",
      "Eres particular o autónomo.",
    ],
    trustTitle: "Contenido revisado por abogado",
    trustText: "Actualizado según la última reforma concursal.",
  },
  closing: {
    title: "No necesitas saber la vía. Solo dar el primer paso",
    text: "Tú nos cuentas tu situación y nosotros te decimos por dónde tu deuda puede desaparecer. Mientras lo piensas, los intereses crecen y los embargos avanzan. Pide tu estudio gratis ahora.",
  },
  interactive: {
    simulator: {
      title: "¿Cuánta deuda podrías cancelar?",
      subtitle: "Mueve los controles y descubre en 10 segundos lo que la ley puede borrar.",
      maxDebt: 120000,
      maxMonthly: 2000,
      defaultDebt: 22000,
      defaultMonthly: 400,
    },
    comparisonTable: {
      title: "¿Qué solución te conviene?",
      subtitle:
        "No todas las deudas se eliminan igual. Esta es la guía rápida para situarte; tu caso lo confirmamos gratis.",
      columns: [
        { title: "Cancelar (LSO)", highlight: true },
        { title: "Anular por usura" },
        { title: "Negociar quita" },
        { title: "Reunificar" },
      ],
      rows: [
        {
          feature: "Cuándo encaja",
          values: [
            "No puedes pagar nada",
            "Intereses abusivos",
            "Puedes pagar una parte",
            "Puedes pagar una cuota",
          ],
        },
        {
          feature: "Qué pasa con la deuda",
          values: ["Se cancela entera", "Se anula la abusiva", "Se reduce", "Se agrupa"],
        },
        {
          feature: "¿Sigues pagando?",
          values: ["no", "no", "Parte", "sí"],
        },
        {
          feature: "Para deuda pública",
          values: ["sí", "no", "Limitado", "no"],
        },
        {
          feature: "Plazo aproximado",
          values: ["6-18 meses", "Meses", "Semanas", "Inmediato"],
        },
        {
          feature: "Resultado",
          values: ["Empiezas de cero", "Deuda anulada", "Deuda menor", "Una sola cuota"],
        },
      ],
    },
    debtTypesTitle: "¿En qué situación estás?",
    debtTypesSubtitle: "Elige la que más se parece a la tuya y te decimos por dónde tu deuda puede desaparecer.",
    debtTypes: [
      {
        label: "Ya no puedo pagar nada",
        message:
          "Si tus ingresos no cubren las cuotas, la vía más potente es cancelar toda la deuda con la Ley de Segunda Oportunidad.",
        to: "/ley-segunda-oportunidad",
        linkLabel: "Cancelar con la Ley de Segunda Oportunidad",
      },
      {
        label: "Puedo pagar una cuota pequeña",
        message:
          "Si aún puedes asumir un pago razonable, valoramos reunificar en una sola cuota o negociar una quita antes de cancelar.",
        to: "/reunificar-deudas",
        linkLabel: "Ver reunificación de deudas",
      },
      {
        label: "Mis intereses son altísimos",
        message:
          "Tarjetas revolving y microcréditos suelen tener intereses abusivos: muchas veces la deuda se anula por usura.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Anular tarjetas revolving por usura",
      },
      {
        label: "Tengo deuda con Hacienda / SS",
        message:
          "La deuda pública también se exonera, con ciertos límites. Te decimos cuánto puedes eliminar en tu caso.",
        to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
        linkLabel: "Exoneración del pasivo insatisfecho",
      },
      {
        label: "Me reclaman o me embargan",
        message:
          "Si ya hay reclamación judicial o embargo, hay que actuar rápido: podemos frenarlo y cancelar la deuda de fondo.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cómo cancelar microcréditos",
      },
      {
        label: "No sé por dónde empezar",
        message:
          "Lo más habitual: varias deudas y mil dudas. Estudiamos tu caso gratis y elegimos la mejor vía por ti.",
        to: "/cancelacion-de-deudas",
        linkLabel: "Guía de cancelación de deudas",
      },
    ],
    urgencyTimeline: {
      title: "Qué pasa si no eliges una salida",
      subtitle: "Cuanto más esperas, más caro y más difícil. Esta es la línea que sigue una deuda sin solución.",
      items: [
        {
          time: "Hoy",
          title: "Los intereses siguen creciendo",
          text: "Cada mes que pasa, la deuda es mayor y tu margen para vivir, menor.",
        },
        {
          time: "Semanas",
          title: "Reclamaciones y recobro",
          text: "Llamadas, cartas y empresas de recobro presionando para que pagues.",
        },
        {
          time: "Meses",
          title: "Demanda y juicio monitorio",
          text: "El acreedor reclama judicialmente la deuda y se acumulan costas.",
          danger: true,
        },
        {
          time: "Después",
          title: "Embargo de nómina y cuentas",
          text: "Se traba tu sueldo y tus cuentas. Evitarlo es mucho más fácil antes de llegar aquí.",
          danger: true,
        },
      ],
    },
    quiz: {
      title: "¿Cuál es tu vía? Descúbrelo",
      subtitle: "4 preguntas rápidas para orientarte. Sin dar tus datos.",
      questions: [
        { text: "¿No puedes pagar tus deudas con tus ingresos actuales?", goodAnswer: "yes" },
        { text: "¿Tus deudas suman más de 5.000 €?", goodAnswer: "yes" },
        { text: "¿Vienen de préstamos, tarjetas o microcréditos (no solo sanciones)?", goodAnswer: "yes" },
        { text: "¿Has ocultado bienes o provocado tu insolvencia a propósito?", goodAnswer: "no" },
      ],
      resultPass: {
        title: "Tu deuda puede desaparecer",
        text: "Tu perfil encaja con las vías para eliminar deuda. Pide tu estudio gratis y te decimos exactamente cuál es la tuya y cuánto puedes borrar.",
      },
      resultDoubt: {
        title: "Seguramente hay una vía para ti",
        text: "Casos muy parecidos al tuyo eliminan deuda cada semana, cada uno por una vía distinta. Lo resolvemos gratis en 24h.",
      },
    },
    beforeAfter: {
      title: "Antes y después de elegir tu salida",
      subtitle: "La diferencia entre seguir atrapado y dejar que la deuda desaparezca.",
      beforeLabel: "Hoy, con deudas",
      afterLabel: "Después, con Calma",
      before: [
        "Cuotas que se comen tu sueldo",
        "Llamadas y cartas de acreedores",
        "Intereses que no paran de crecer",
        "Miedo constante a un embargo",
        "Sin margen para vivir",
      ],
      after: [
        "Deudas canceladas legalmente",
        "Recuperas tu nómina",
        "Se acaban las llamadas y la presión",
        "Embargos suspendidos durante el proceso",
        "Empiezas de cero, con tranquilidad",
      ],
    },
  },
  sections: [
    {
      title: "¿Qué deudas se pueden cancelar?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            La mayoría de deudas con bancos, financieras, tarjetas, microcréditos,
            proveedores y particulares <strong>se pueden cancelar</strong> cuando no puedes
            pagarlas. La deuda pública con Hacienda y Seguridad Social también, con ciertos
            límites de exoneración.
          </p>
          <p>
            Si quieres entender a fondo las vías legales, plazos y requisitos, lee nuestra
            guía de <A to="/cancelacion-de-deudas">cancelación de deudas</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Vías legales para cancelar deudas",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Según tu caso, estudiamos la vía que más te conviene:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Ley de Segunda Oportunidad:</strong> cancela las deudas que no puedes
              pagar. La vía más potente. Conócela en el{" "}
              <A to="/ley-segunda-oportunidad">hub de la LSO</A>.
            </li>
            <li>
              <strong>Reclamación por usura:</strong> en revolving y microcréditos con
              intereses abusivos, muchas veces la deuda se anula.
            </li>
            <li>
              <strong>Negociación con acreedores:</strong> quitas y acuerdos cuando aún hay
              margen de pago.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Cancelar o reunificar: cuál te conviene",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Si ya no puedes pagar, lo lógico es <strong>cancelar</strong>. Si todavía puedes
            asumir una cuota razonable, quizá te interese{" "}
            <A to="/reunificar-deudas">reunificar tus deudas</A> en un solo pago antes de
            cancelar. En el diagnóstico gratuito te decimos cuál encaja mejor con tu
            situación, sin compromiso.
          </p>
        </div>
      ),
    },
    {
      title: "Coste y plazos",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            El <strong>diagnóstico inicial es gratuito</strong>. Si sigues adelante, te
            damos un presupuesto cerrado desde el principio, con opción de pago fraccionado.
          </p>
          <p>
            Los plazos dependen de la vía: una reclamación por usura puede resolverse antes
            que un procedimiento de Segunda Oportunidad, que suele durar entre 6 y 18 meses.
            Los embargos pueden suspenderse mucho antes.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿Qué deudas puedo cancelar?",
      a: (
        <>La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites.</>
      ),
      plain:
        "La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites.",
    },
    {
      q: "¿Cuánto cuesta cancelar mis deudas?",
      a: (
        <>El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado y opción de pago fraccionado.</>
      ),
      plain:
        "El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado y opción de pago fraccionado.",
    },
    {
      q: "¿Es mejor cancelar o reunificar?",
      a: (
        <>Si ya no puedes pagar, lo habitual es cancelar. Si aún puedes asumir una cuota, reunificar puede ayudarte. Lo valoramos gratis en tu caso.</>
      ),
      plain:
        "Si ya no puedes pagar, lo habitual es cancelar. Si aún puedes asumir una cuota, reunificar puede ayudarte. Lo valoramos gratis en tu caso.",
    },
    {
      q: "¿Cuánto tarda?",
      a: (
        <>Depende de la vía. Una reclamación por usura es más rápida; la Ley de Segunda Oportunidad suele tardar de 6 a 18 meses, con embargos suspendidos antes.</>
      ),
      plain:
        "Depende de la vía. Una reclamación por usura es más rápida; la Ley de Segunda Oportunidad suele tardar de 6 a 18 meses, con embargos suspendidos antes.",
    },
  ],
};