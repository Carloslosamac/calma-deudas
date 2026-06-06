import { Link } from "react-router-dom";
import type { MoneyContent } from "./types";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Money page comercial de la Ley de Segunda Oportunidad.
 * Intención TRANSACCIONAL: captar el lead. La profundidad informativa
 * vive en el post pilar /blog/guia-ley-segunda-oportunidad (enlazado),
 * para no canibalizar.
 */
export const leySegundaOportunidad: MoneyContent = {
  path: "/ley-segunda-oportunidad",
  reviewed: true,
  intro: (
    <>
      La Ley de Segunda Oportunidad te permite <strong>cancelar legalmente las deudas
      que no puedes pagar</strong> y empezar de cero. En Calma estudiamos tu caso
      gratis y sin compromiso, y te decimos con claridad si puedes acogerte.
    </>
  ),
  hero: {
    badge: "Ley de Segunda Oportunidad",
    titleLead: "Cancela tus deudas y",
    titleAccent: "empieza de cero.",
    subtitle: (
      <>
        Deja de pagar deudas que te ahogan. Con la Ley de Segunda Oportunidad
        las <strong>cancelamos legalmente</strong> y recuperas tu vida. Te
        decimos hoy mismo, gratis, cuánto puedes dejar de pagar.
      </>
    ),
    trustNote: "Respuesta en 24h · Sin compromiso",
  },
  benefits: [
    {
      icon: "shield",
      title: "Cancelación legal",
      text: "Borramos las deudas que no puedes pagar. De forma legal y definitiva.",
    },
    {
      icon: "phone-off",
      title: "Adiós al acoso",
      text: "Se acaban las llamadas, las cartas y la presión de los acreedores.",
    },
    {
      icon: "gavel",
      title: "Suspende embargos",
      text: "Frenamos los embargos en curso desde el primer paso del proceso.",
    },
    {
      icon: "users",
      title: "Lo hacemos por ti",
      text: "Abogados que llevan todo el proceso. Tú solo recuperas tu tranquilidad.",
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
      text: "Iniciamos el proceso formal ante el juzgado correspondiente.",
    },
    {
      title: "Exoneración total",
      text: "El juez acuerda la cancelación de las deudas. Empiezas de cero.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Gratis", label: "Estudiamos tu caso hoy mismo" },
    { value: "6–18 meses", label: "Y vuelves a empezar de cero" },
    { value: "Hasta 100%", label: "De tus deudas, canceladas" },
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
    ],
    trustTitle: "Contenido revisado por abogado",
    trustText: "Actualizado según la última reforma concursal.",
  },
  closing: {
    title: "Cada día que esperas, sigues pagando",
    text: "Mientras lo piensas, los intereses crecen y los embargos avanzan. Pide tu estudio gratis ahora y empieza a librarte de tus deudas hoy.",
  },
  interactive: {
    simulator: {
      title: "¿Cuánto podrías dejar de pagar?",
      subtitle: "Mueve los controles y hazte una idea en 10 segundos.",
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
          text: "¿Has sido condenado por delitos económicos en los últimos 10 años?",
          goodAnswer: "no",
        },
      ],
      resultPass: {
        title: "Tu caso encaja. Vamos a por ello.",
        text: "Cumples las condiciones clave para acogerte a la Ley de Segunda Oportunidad. El siguiente paso es un estudio gratis para confirmar cuánto puedes cancelar.",
      },
      resultDoubt: {
        title: "Puede que sí. Lo vemos contigo, gratis.",
        text: "Algunos puntos requieren una mirada experta, pero muchos casos parecidos terminan cancelando sus deudas. Cuéntanos el tuyo sin compromiso.",
      },
    },
    beforeAfter: {
      title: "Tu vida antes y después de Calma",
      subtitle: "Esto es lo que cambia cuando das el paso.",
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
        "Embargos suspendidos durante el proceso",
        "Empiezas de cero, sin esas deudas",
        "Tranquilidad para volver a respirar",
      ],
    },
  },
  sections: [
    {
      title: "Coste y plazos",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            El <strong>diagnóstico inicial es gratuito</strong>. Si decides seguir adelante,
            te ofrecemos un presupuesto claro y cerrado desde el principio, con la
            posibilidad de pago fraccionado para que el coste no sea un obstáculo.
          </p>
          <p>
            El procedimiento suele resolverse en un plazo aproximado de{" "}
            <strong>6 a 18 meses</strong> según la complejidad del caso y el juzgado,
            aunque los embargos pueden suspenderse mucho antes.
          </p>
          <p>
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
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            La Ley de Segunda Oportunidad no siempre es la única opción. Según tu caso,
            también estudiamos:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><A to="/reunificar-deudas">Reunificar tus deudas</A> en una sola cuota si aún puedes pagar.</li>
            <li><A to="/cancelar-deudas">Cancelar deudas</A> concretas con bancos y financieras.</li>
            <li>La <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">exoneración del pasivo insatisfecho</A>, el corazón legal de la ley.</li>
          </ul>
          <p>
            ¿Prefieres entender la ley en profundidad antes de decidir? Lee nuestra{" "}
            <A to="/blog/guia-ley-segunda-oportunidad">guía completa de la Ley de Segunda Oportunidad</A>.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿Qué deudas se pueden cancelar con la Ley de Segunda Oportunidad?",
      a: (
        <>La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites de exoneración.</>
      ),
      plain:
        "La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites de exoneración.",
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
        <>Entre 6 y 18 meses según la complejidad y el juzgado, aunque los embargos pueden suspenderse mucho antes de la resolución final.</>
      ),
      plain:
        "Entre 6 y 18 meses según la complejidad y el juzgado, aunque los embargos pueden suspenderse mucho antes de la resolución final.",
    },
    {
      q: "¿Puedo acogerme si soy autónomo?",
      a: (
        <>Sí. La ley está pensada tanto para particulares como para autónomos de buena fe en situación de insolvencia. Valoramos también el concurso de persona física cuando encaja mejor.</>
      ),
      plain:
        "Sí. La ley está pensada tanto para particulares como para autónomos de buena fe en situación de insolvencia. Valoramos también el concurso de persona física cuando encaja mejor.",
    },
  ],
};