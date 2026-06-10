import { Link } from "react-router-dom";
import type { MoneyContent } from "./types";
import { localizaciones } from "@/data/seo/localizaciones";
import CityMap from "@/components/seo/CityMap";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";
import t4 from "@/assets/testimonial-4.jpg";
import t5 from "@/assets/testimonial-5.jpg";
import t6 from "@/assets/testimonial-6.jpg";
import team1 from "@/assets/team-lawyer-1.jpg";
import team2 from "@/assets/team-lawyer-2.jpg";
import team3 from "@/assets/team-lawyer-3.jpg";
import team4 from "@/assets/team-lawyer-4.jpg";
import team5 from "@/assets/team-lawyer-5.jpg";
import team6 from "@/assets/team-lawyer-6.jpg";
import team7 from "@/assets/team-lawyer-7.jpg";
import team8 from "@/assets/team-lawyer-8.jpg";
import team9 from "@/assets/team-lawyer-9.jpg";
import team10 from "@/assets/team-lawyer-10.jpg";
import team11 from "@/assets/team-lawyer-11.jpg";
import team12 from "@/assets/team-lawyer-12.jpg";
import team13 from "@/assets/team-lawyer-13.jpg";
import team14 from "@/assets/team-lawyer-14.jpg";
import team15 from "@/assets/team-lawyer-15.jpg";
import team16 from "@/assets/team-lawyer-16.jpg";
import team17 from "@/assets/team-lawyer-17.jpg";
import team18 from "@/assets/team-lawyer-18.jpg";
import team19 from "@/assets/team-lawyer-19.jpg";
import team20 from "@/assets/team-lawyer-20.jpg";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Money page de Abogados de la Ley de Segunda Oportunidad.
 * Ángulo: equipo de abogados especialistas, autoridad jurídica (E-E-A-T).
 * El hub maestro es /ley-segunda-oportunidad, al que enlaza para no canibalizar.
 */
export const abogadosLeySegundaOportunidad: MoneyContent = {
  path: "/abogados-ley-segunda-oportunidad",
  reviewed: true,
  tone: "transactional",
  layout: [
    "simulator",
    "benefits",
    "teamCredentials",
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
      Detrás de cada caso cancelado hay un <strong>abogado especialista</strong> que
      conoce el procedimiento al detalle. En Calma no contratas un formulario: te asigna
      un equipo jurídico que lleva tu expediente de principio a fin.
    </>
  ),
  hero: {
    badge: "Abogados Ley de Segunda Oportunidad",
    titleLead: "Abogados que cancelan deudas",
    titleAccent: "de verdad, no promesas.",
    subtitle: (
      <>
        Un equipo de <strong>abogados especialistas</strong> en la Ley de Segunda
        Oportunidad estudia tu caso, prepara el expediente y te representa ante el
        juzgado. Primer diagnóstico gratis y sin compromiso, hoy mismo.
      </>
    ),
    trustNote: "Abogados colegiados · Gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Abogados colegiados · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Qué hace por ti un abogado especialista",
  benefits: [
    {
      icon: "scale",
      title: "Estrategia legal a medida",
      text: "Analizamos tu caso y elegimos la vía (plan de pagos o liquidación) que más te protege.",
    },
    {
      icon: "gavel",
      title: "Representación ante el juzgado",
      text: "Presentamos y defendemos tu expediente en el juzgado competente. No vas solo.",
    },
    {
      icon: "shield",
      title: "Exoneración del pasivo",
      text: "Buscamos la cancelación del máximo de deuda posible, incluida la pública con límites.",
    },
    {
      icon: "users",
      title: "Protección de avalistas",
      text: "Estudiamos cómo proteger también a quienes te avalaron en tus préstamos.",
    },
    {
      icon: "lock",
      title: "Presupuesto cerrado",
      text: "Honorarios claros desde el inicio, con opción de pago fraccionado. Sin sorpresas.",
    },
    {
      icon: "clock",
      title: "Acompañamiento real",
      text: "Un interlocutor que conoce tu caso resuelve tus dudas durante todo el proceso.",
    },
  ],
  testimonialsTitle: "Casos llevados por nuestros abogados",
  testimonialsSubtitle:
    "Personas reales que pusieron su caso en manos de abogados especialistas y hoy no deben nada.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    {
      name: "Raúl P.",
      amount: "61.200 €",
      location: "Madrid",
      text: "Pensaba que un caso tan grande era imposible. El abogado lo llevó todo y hoy estoy a cero.",
      photo: t1,
    },
    {
      name: "Lorena C.",
      amount: "34.870 €",
      location: "Valencia",
      text: "Me explicaron cada paso del procedimiento. Saber que un abogado iba al juzgado por mí me dio paz.",
      photo: t2,
    },
    {
      name: "Miguel Á. F.",
      amount: "48.540 €",
      location: "Sevilla",
      text: "Honorarios claros desde el principio y pago a plazos. Canceló deudas de cinco financieras.",
      photo: t3,
    },
    {
      name: "Patricia G.",
      amount: "29.350 €",
      location: "Bilbao",
      text: "Tenía miedo del juzgado. El equipo legal preparó todo y el proceso fue mucho más sencillo de lo que creía.",
      photo: t4,
    },
    {
      name: "Sergio M.",
      amount: "53.910 €",
      location: "Málaga",
      text: "Como autónomo arrastraba deudas con Hacienda. Mi abogada consiguió exonerar gran parte.",
      photo: t5,
    },
    {
      name: "Elena R.",
      amount: "26.700 €",
      location: "Zaragoza",
      text: "Profesionales de verdad. Protegieron a mi avalista y cancelaron toda mi deuda.",
      photo: t6,
    },
  ],
  stepsTitle: "Cómo trabaja tu abogado",
  stepsSubtitle: "Cuatro pasos con un especialista al frente de tu caso",
  steps: [
    {
      title: "Diagnóstico gratuito",
      text: "Un abogado revisa tus deudas e ingresos y confirma si puedes acogerte.",
    },
    {
      title: "Preparación del expediente",
      text: "Reunimos la documentación y diseñamos la estrategia legal óptima para tu caso.",
    },
    {
      title: "Presentación y representación",
      text: "Presentamos el expediente y te representamos ante el juzgado competente.",
    },
    {
      title: "Exoneración total",
      text: "El juez acuerda la cancelación de las deudas. Empiezas de cero.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Colegiados", label: "Abogados especialistas en derecho concursal" },
    { value: "+19.000", label: "Familias ya libres de deudas en España" },
    { value: "Gratis", label: "Primer diagnóstico con un abogado, sin compromiso" },
  ],
  eligibility: {
    title: "¿Tu caso es para un abogado de la LSO?",
    intro: (
      <>
        Si eres particular o autónomo, no puedes pagar tus deudas y actúas de buena fe,
        un abogado especialista puede ayudarte a cancelarlas. Lo confirmamos gratis.
      </>
    ),
    requirements: [
      "Eres particular o autónomo en situación de insolvencia.",
      "Actúas de buena fe: no has ocultado bienes ni provocado tu insolvencia de forma fraudulenta.",
      "No has sido condenado por determinados delitos socioeconómicos en los últimos diez años.",
      "Tus deudas no provienen, en su mayoría, de sanciones o conductas dolosas.",
    ],
    trustTitle: "Contenido revisado por abogado",
    trustText: "Actualizado según la última reforma concursal.",
  },
  closing: {
    title: "Pon tu caso en manos de un especialista",
    text: "Un abogado que conoce el procedimiento marca la diferencia entre intentarlo y conseguirlo. Pide tu diagnóstico gratis y deja que un especialista te diga hoy cuánto puedes cancelar.",
  },
  interactive: {
    teamCredentials: {
      title: "Un equipo jurídico real detrás de tu caso",
      subtitle:
        "No eres un número de expediente. Abogados especialistas en insolvencia llevan tu procedimiento de principio a fin.",
      members: [
        {
          name: "Marta Belmonte",
          role: "Directora del área concursal",
          credential: "Abogada colegiada · 15 años en insolvencia",
          photo: team1,
        },
        {
          name: "Javier Ferrer",
          role: "Abogado concursal sénior",
          credential: "Especialista en exoneración del pasivo",
          photo: team2,
        },
        {
          name: "Lucía Ordóñez",
          role: "Abogada de admisión",
          credential: "Diagnóstico y viabilidad del caso",
          photo: team3,
        },
        {
          name: "Andrés Solís",
          role: "Responsable de litigación",
          credential: "Representación ante el juzgado",
          photo: team4,
        },
        {
          name: "Nuria Cano",
          role: "Gestora de expedientes",
          credential: "Coordinación documental del proceso",
          photo: team5,
        },
        {
          name: "Diego Marín",
          role: "Abogado concursal",
          credential: "Autónomos y concurso de persona física",
          photo: team6,
        },
        {
          name: "Marcos Vidal",
          role: "Abogado concursal",
          credential: "Exoneración del pasivo insatisfecho",
          photo: team7,
        },
        {
          name: "Sara Belda",
          role: "Abogada de litigación",
          credential: "Oposición a embargos y ejecuciones",
          photo: team8,
        },
        {
          name: "Raúl Torres",
          role: "Abogado de admisión",
          credential: "Análisis de viabilidad del caso",
          photo: team9,
        },
        {
          name: "Elena Ruiz",
          role: "Gestora de expedientes",
          credential: "Seguimiento documental del proceso",
          photo: team10,
        },
        {
          name: "Carmen Navarro",
          role: "Abogada concursal sénior",
          credential: "12 años en derecho de insolvencia",
          photo: team11,
        },
        {
          name: "Adrián Gil",
          role: "Abogado concursal",
          credential: "Negociación con entidades financieras",
          photo: team12,
        },
        {
          name: "Ramón Castro",
          role: "Asesor jurídico sénior",
          credential: "20 años en derecho mercantil y concursal",
          photo: team13,
        },
        {
          name: "Patricia León",
          role: "Asistente legal",
          credential: "Atención y coordinación de clientes",
          photo: team14,
        },
        {
          name: "Héctor Ramos",
          role: "Abogado de litigación",
          credential: "Representación ante el juzgado mercantil",
          photo: team15,
        },
        {
          name: "Beatriz Campos",
          role: "Directora de operaciones",
          credential: "Coordinación del equipo jurídico",
          photo: team16,
        },
        {
          name: "Iván Moreno",
          role: "Abogado de admisión",
          credential: "Diagnóstico inicial y documentación",
          photo: team17,
        },
        {
          name: "Cristina Herrero",
          role: "Abogada concursal",
          credential: "Particulares y exoneración de deudas",
          photo: team18,
        },
        {
          name: "Sergio Lozano",
          role: "Abogado concursal sénior",
          credential: "Especialista en plan de pagos",
          photo: team19,
        },
        {
          name: "Alicia Méndez",
          role: "Abogada de litigación",
          credential: "Defensa frente a acreedores",
          photo: team20,
        },
      ],
      highlights: [
        "+19.000 familias sin deudas",
        "Abogados colegiados",
        "Presupuesto cerrado desde el inicio",
      ],
    },
    simulator: {
      title: "¿Cuánta deuda podrías cancelar?",
      subtitle: "Mueve los controles y un abogado te confirmará la cifra real en tu diagnóstico gratis.",
      maxDebt: 150000,
      maxMonthly: 2500,
      defaultDebt: 30000,
      defaultMonthly: 500,
    },
    debtTypesTitle: "¿Qué tipo de deuda tienes?",
    debtTypesSubtitle: "Elige tu caso y te orientamos sobre el enfoque legal.",
    debtTypes: [
      {
        label: "Tarjetas revolving",
        message:
          "Antes de la LSO, muchas veces se pueden anular por usura. Tu abogado valora reclamar y cancelar.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Cancelar tarjetas revolving",
      },
      {
        label: "Microcréditos",
        message:
          "Los microcréditos entran de lleno en la Ley de Segunda Oportunidad. Tu abogado los incluye en el expediente.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cancelar microcréditos",
      },
      {
        label: "Préstamos bancarios",
        message:
          "Préstamos personales y descubiertos también se cancelan si no puedes asumirlos.",
        to: "/cancelar-deudas",
        linkLabel: "Cancelar deudas con el banco",
      },
      {
        label: "Hacienda / Seg. Social",
        message:
          "La deuda pública se exonera con límites. Tu abogado calcula cuánto en tu caso concreto.",
        to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
        linkLabel: "Exoneración del pasivo insatisfecho",
      },
      {
        label: "Como autónomo",
        message:
          "Si eres autónomo, valoramos también el concurso de persona física como vía legal.",
        to: "/autonomos-concurso-acreedores/concurso-persona-fisica",
        linkLabel: "Concurso de persona física",
      },
      {
        label: "Varias a la vez",
        message:
          "Lo más habitual: varias deudas. Tu abogado las unifica en una única estrategia legal.",
        to: "/ley-segunda-oportunidad",
        linkLabel: "Ver la Ley de Segunda Oportunidad",
      },
    ],
    quiz: {
      title: "¿Necesitas un abogado de la LSO? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿No puedes pagar tus deudas con tus ingresos actuales?", goodAnswer: "yes" },
        { text: "¿Tus deudas suman más de 5.000 €?", goodAnswer: "yes" },
        { text: "¿Has actuado de buena fe (sin ocultar bienes)?", goodAnswer: "yes" },
        { text: "¿Has sido condenado por delitos económicos en los últimos 10 años?", goodAnswer: "no" },
      ],
      resultPass: {
        title: "Tu caso es para un abogado especialista",
        text: "Cumples las condiciones clave. Un abogado puede empezar tu expediente esta misma semana. Pide tu diagnóstico gratis ahora.",
      },
      resultDoubt: {
        title: "Probablemente sí. Que lo valore un abogado.",
        text: "Casos muy parecidos al tuyo se resuelven cada semana. No pierdas un mes: un abogado lo confirma gratis en 24h.",
      },
    },
    beforeAfter: {
      title: "Con un abogado al frente, cambia todo",
      subtitle: "La diferencia entre pelear solo y tener un especialista en tu caso.",
      beforeLabel: "Solo, sin abogado",
      afterLabel: "Con los abogados de Calma",
      before: [
        "Dudas sobre plazos, requisitos y papeleo",
        "Miedo a presentarte ante el juzgado",
        "Riesgo de errores que tumben el expediente",
        "Acreedores que te presionan sin freno",
        "Sensación de no avanzar",
      ],
      after: [
        "Un especialista que conoce el procedimiento",
        "Representación legal ante el juzgado",
        "Expediente preparado para que prospere",
        "Embargos suspendidos durante el proceso",
        "Avanzas con un plan claro hacia el cero",
      ],
    },
  },
  sections: [
    {
      title: "¿Por qué acudir a un abogado especialista?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            La Ley de Segunda Oportunidad es un procedimiento <strong>judicial</strong>: no
            basta con rellenar un formulario. Un abogado especializado en derecho concursal
            conoce los requisitos, los plazos y la jurisprudencia de cada juzgado, y eso
            multiplica las probabilidades de que tu expediente prospere.
          </p>
          <p>
            En Calma cada caso lo lleva un abogado colegiado que decide contigo la vía más
            protectora, prepara la documentación y te representa ante el juez. Para entender
            la ley en profundidad, consulta el hub de la{" "}
            <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Honorarios: cuánto cuesta un abogado de la LSO",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            El <strong>primer diagnóstico es gratuito</strong>. Si decides seguir, trabajamos
            con un presupuesto cerrado desde el inicio y opción de pago fraccionado, para que
            los honorarios nunca sean el motivo de no empezar.
          </p>
          <p>
            Desconfía de quien promete cancelar deudas "sin coste" o "en un mes": el
            procedimiento es judicial y tiene unos plazos. La transparencia en los honorarios
            es la primera señal de un buen profesional.
          </p>
        </div>
      ),
    },
    {
      title: "El procedimiento paso a paso",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Con un abogado al frente, el proceso sigue estas fases:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Diagnóstico y verificación de requisitos (buena fe, insolvencia).</li>
            <li>Intento de acuerdo extrajudicial cuando procede.</li>
            <li>Presentación del concurso y solicitud de exoneración del pasivo.</li>
            <li>Resolución del juez: cancelación con plan de pagos o con liquidación.</li>
          </ul>
          <p>
            Los embargos suelen suspenderse mucho antes de la resolución final. Te lo
            explicamos en detalle en la{" "}
            <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">exoneración del pasivo insatisfecho</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Cómo elegir un buen abogado",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Antes de poner tu caso en manos de nadie, comprueba:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Que sea <strong>abogado colegiado</strong> y especializado en derecho concursal.</li>
            <li>Que te dé un presupuesto cerrado y por escrito.</li>
            <li>Que estudie tu caso antes de prometer resultados.</li>
            <li>Que tenga casos y valoraciones reales que lo respalden.</li>
          </ul>
          <p>
            ¿Tu deuda viene de productos abusivos? Mira también cómo{" "}
            <A to="/cancelar-deudas">cancelar deudas</A> o{" "}
            <A to="/reunificar-deudas">reunificar deudas</A> si aún puedes pagar.
          </p>
        </div>
      ),
    },
    {
      title: "Abogados de la Ley de Segunda Oportunidad por ciudad",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Atendemos casos en toda España. Consulta la página de tu ciudad para conocer los
            juzgados competentes y cómo trabajamos en tu zona:
          </p>
          <CityMap />
          <ul className="grid gap-2 sm:grid-cols-2">
            {localizaciones.map((l) => (
              <li key={l.slug}>
                <A to={l.path}>Abogados Ley de Segunda Oportunidad en {l.name}</A>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿Necesito un abogado para acogerme a la Ley de Segunda Oportunidad?",
      a: (
        <>Sí. Es un procedimiento judicial y la intervención de abogado es necesaria para presentar y defender el expediente correctamente.</>
      ),
      plain:
        "Sí. Es un procedimiento judicial y la intervención de abogado es necesaria para presentar y defender el expediente correctamente.",
    },
    {
      q: "¿Cuánto cuestan los honorarios?",
      a: (
        <>El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado desde el inicio y opción de pago fraccionado.</>
      ),
      plain:
        "El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado desde el inicio y opción de pago fraccionado.",
    },
    {
      q: "¿El abogado me representa ante el juzgado?",
      a: (
        <>Sí. Preparamos el expediente y te representamos ante el juzgado competente durante todo el procedimiento.</>
      ),
      plain:
        "Sí. Preparamos el expediente y te representamos ante el juzgado competente durante todo el procedimiento.",
    },
    {
      q: "¿Cuánto tarda el proceso con un abogado?",
      a: (
        <>Entre 6 y 18 meses según la complejidad y el juzgado, aunque los embargos pueden suspenderse mucho antes.</>
      ),
      plain:
        "Entre 6 y 18 meses según la complejidad y el juzgado, aunque los embargos pueden suspenderse mucho antes.",
    },
  ],
};