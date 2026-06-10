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
  intro: (
    <>
      Hay deudas que <strong>no tienes por qué seguir pagando</strong>. Si no llegas a
      fin de mes por las cuotas, existen vías legales para eliminarlas. Te decimos hoy,
      gratis, cuáles puedes cancelar en tu caso.
    </>
  ),
  hero: {
    badge: "Cancelar deudas",
    titleLead: "Cancela las deudas",
    titleAccent: "que te están ahogando.",
    subtitle: (
      <>
        Tarjetas, microcréditos, préstamos, descubiertos… Si tus deudas crecen más rápido
        de lo que puedes pagar, la ley te permite <strong>eliminarlas</strong>. Te decimos
        hoy mismo, gratis, cuánto puedes dejar de pagar.
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
  benefitsTitle: "Qué consigues al cancelar tus deudas",
  benefits: [
    {
      icon: "shield",
      title: "Eliminación de la deuda",
      text: "Borramos legalmente las deudas que no puedes asumir. Definitivo y sin que vuelvan.",
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
  stepsTitle: "Tu camino para cancelar deudas",
  stepsSubtitle: "Cuatro pasos claros para quitarte la carga",
  steps: [
    {
      title: "Diagnóstico gratuito",
      text: "Analizamos tus deudas e ingresos para ver cuáles puedes cancelar.",
    },
    {
      title: "Estrategia a medida",
      text: "Elegimos la mejor vía legal: reclamación, LSO o negociación.",
    },
    {
      title: "Inicio del proceso",
      text: "Ponemos en marcha la cancelación y frenamos la presión de los acreedores.",
    },
    {
      title: "Deuda cancelada",
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
    title: "¿Puedo cancelar mis deudas?",
    intro: (
      <>
        Si no puedes pagar tus deudas con tus ingresos actuales y actúas de buena fe, lo
        más probable es que puedas cancelar buena parte de ellas. Lo confirmamos gratis.
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
    title: "Cada mes que pagas, es dinero que no recuperas",
    text: "Mientras lo piensas, los intereses crecen y los embargos avanzan. Pide tu estudio gratis ahora y descubre cuánta deuda puedes cancelar legalmente.",
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
    debtTypesTitle: "¿Qué deudas quieres cancelar?",
    debtTypesSubtitle: "Elige lo que más se parece a tu caso y te decimos por dónde empezar.",
    debtTypes: [
      {
        label: "Tarjetas revolving",
        message:
          "Suelen tener intereses abusivos: muchas veces se anulan por usura y se pueden cancelar.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Cómo cancelar tarjetas revolving",
      },
      {
        label: "Microcréditos",
        message:
          "Se acumulan rápido y ahogan. Se pueden cancelar con la Ley de Segunda Oportunidad.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cómo cancelar microcréditos",
      },
      {
        label: "Préstamos bancarios",
        message:
          "Préstamos personales y descubiertos también se cancelan si no puedes asumirlos.",
        to: "/ley-segunda-oportunidad",
        linkLabel: "Ley de Segunda Oportunidad",
      },
      {
        label: "Aún puedo pagar algo",
        message:
          "Si todavía puedes pagar una cuota asumible, quizá te convenga reunificar antes de cancelar.",
        to: "/reunificar-deudas",
        linkLabel: "Ver reunificación de deudas",
      },
      {
        label: "Hacienda / Seg. Social",
        message:
          "La deuda pública también se exonera, con límites. Te decimos cuánto en tu caso.",
        to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
        linkLabel: "Exoneración del pasivo insatisfecho",
      },
      {
        label: "Varias a la vez",
        message:
          "Lo más habitual. Las unificamos en una estrategia para cancelar el máximo posible.",
        to: "/cancelacion-de-deudas",
        linkLabel: "Guía de cancelación de deudas",
      },
    ],
    quiz: {
      title: "¿Puedes cancelar tus deudas? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿No puedes pagar tus deudas con tus ingresos actuales?", goodAnswer: "yes" },
        { text: "¿Tus deudas suman más de 5.000 €?", goodAnswer: "yes" },
        { text: "¿Vienen de préstamos, tarjetas o microcréditos?", goodAnswer: "yes" },
        { text: "¿Has ocultado bienes o provocado tu insolvencia a propósito?", goodAnswer: "no" },
      ],
      resultPass: {
        title: "Puedes cancelar buena parte de tu deuda",
        text: "Cumples las condiciones clave. Cada mes que sigues pagando es dinero perdido. Pide tu estudio gratis y confirma cuánto puedes borrar.",
      },
      resultDoubt: {
        title: "Probablemente sí. No te quedes con la duda.",
        text: "Casos muy parecidos al tuyo cancelan deuda cada semana. Lo resolvemos gratis en 24h.",
      },
    },
    beforeAfter: {
      title: "Esto es lo que te estás perdiendo",
      subtitle: "La diferencia entre seguir pagando y cancelar de una vez.",
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