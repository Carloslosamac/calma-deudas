import { Link } from "react-router-dom";
import type { MoneyContent } from "./types";
import p1 from "@/assets/person-man-portrait.jpg";
import p2 from "@/assets/person-woman-window.jpg";
import p3 from "@/assets/person-woman-walking.jpg";
import p4 from "@/assets/person-couple-sofa.jpg";
import p5 from "@/assets/person-family-table.jpg";
import p6 from "@/assets/avatar-1.jpg";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Money page "Cancelación de deudas". Ángulo informativo/guía: vías legales,
 * requisitos y plazos. Pilar del cluster que deriva a /cancelar-deudas (acción)
 * y al hub LSO, para no canibalizar con la variante de acción.
 */
export const cancelacionDeDeudas: MoneyContent = {
  path: "/cancelacion-de-deudas",
  reviewed: true,
  tone: "calm",
  layout: [
    "sections",
    "legalTimeline",
    "benefits",
    "eligibility",
    "debtTypes",
    "steps",
    "metrics",
    "faq",
    "testimonials",
    "closing",
  ],
  intro: (
    <>
      La <strong>cancelación de deudas</strong> es real y está regulada por ley en España.
      Aquí te explicamos qué vías existen, qué requisitos hay y cuánto tardan, para que
      decidas con información. Y, si quieres, lo aplicamos a tu caso gratis.
    </>
  ),
  hero: {
    badge: "Cancelación de deudas",
    titleLead: "Cancelación de deudas:",
    titleAccent: "vías, requisitos y plazos.",
    subtitle: (
      <>
        Existe un marco legal para <strong>cancelar deudas</strong> que no puedes pagar.
        Te explicamos cómo funciona y, si encajas, te decimos gratis cuánto puedes dejar
        de pagar en tu caso concreto.
      </>
    ),
    trustNote: "Contenido revisado por abogado · Gratis",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Contenido revisado por abogado · Gratis · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Qué permite la cancelación de deudas",
  benefits: [
    {
      icon: "scale",
      title: "Respaldo legal",
      text: "La cancelación se apoya en la Ley de Segunda Oportunidad y en normas de consumo.",
    },
    {
      icon: "shield",
      title: "Cancelación definitiva",
      text: "Las deudas exoneradas no vuelven: la cancelación es firme tras la resolución.",
    },
    {
      icon: "landmark",
      title: "Incluye deuda pública",
      text: "Hacienda y Seguridad Social se exoneran con límites establecidos por ley.",
    },
    {
      icon: "gavel",
      title: "Suspensión de embargos",
      text: "Durante el procedimiento, los embargos en curso pueden suspenderse.",
    },
    {
      icon: "ban",
      title: "Salida de ficheros",
      text: "Al cerrar el proceso, sales del ASNEF y otros ficheros de morosos.",
    },
    {
      icon: "sparkles",
      title: "Nuevo comienzo",
      text: "El objetivo de la ley es darte una segunda oportunidad real.",
    },
  ],
  testimonialsTitle: "Personas que entendieron sus opciones y actuaron",
  testimonialsSubtitle:
    "Casos reales de personas que se informaron, vieron que encajaban y cancelaron su deuda.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    {
      name: "Jorge A.",
      amount: "39.700 €",
      location: "Madrid",
      text: "Leí sobre la ley, vi que cumplía los requisitos y di el paso. Hoy no debo nada.",
      photo: p1,
    },
    {
      name: "Marina S.",
      amount: "23.450 €",
      location: "Valencia",
      text: "No sabía que la cancelación existía de verdad. Me lo explicaron claro y funcionó.",
      photo: p2,
    },
    {
      name: "Lucía D.",
      amount: "31.120 €",
      location: "Sevilla",
      text: "Entender los plazos me dio seguridad para empezar. En menos de un año, a cero.",
      photo: p3,
    },
    {
      name: "Pareja en Málaga",
      amount: "58.900 €",
      location: "Málaga",
      text: "Cancelamos las deudas de los dos. Saber cómo funcionaba nos quitó el miedo.",
      photo: p4,
    },
    {
      name: "Familia en Bilbao",
      amount: "46.300 €",
      location: "Bilbao",
      text: "Con hijos pequeños, recuperar la nómina lo cambió todo. La deuda quedó cancelada.",
      photo: p5,
    },
    {
      name: "Roberto C.",
      amount: "27.800 €",
      location: "Zaragoza",
      text: "Comparé reunificar y cancelar. Me explicaron que lo mío era cancelar y acerté.",
      photo: p6,
    },
  ],
  stepsTitle: "Cómo es el proceso de cancelación",
  stepsSubtitle: "De informarte a empezar de cero, en cuatro pasos",
  steps: [
    {
      title: "Diagnóstico gratuito",
      text: "Confirmamos qué deudas son cancelables en tu caso y por qué vía.",
    },
    {
      title: "Preparación del expediente",
      text: "Reunimos documentación y definimos la estrategia legal adecuada.",
    },
    {
      title: "Tramitación",
      text: "Iniciamos el procedimiento (judicial o reclamación) según corresponda.",
    },
    {
      title: "Deudas exoneradas",
      text: "La resolución cancela las deudas. Empiezas de cero.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Regulado", label: "La cancelación de deudas está amparada por ley" },
    { value: "+19.000", label: "Familias ya libres de deudas en España" },
    { value: "Gratis", label: "Te decimos hoy si tu caso encaja" },
  ],
  eligibility: {
    title: "Requisitos para cancelar deudas",
    intro: (
      <>
        La cancelación por la vía de la Ley de Segunda Oportunidad exige cumplir unas
        condiciones básicas. Estas son las principales:
      </>
    ),
    requirements: [
      "Situación de insolvencia: no puedes pagar tus deudas con tus ingresos.",
      "Buena fe: no has ocultado bienes ni provocado la insolvencia de forma fraudulenta.",
      "Sin condena por determinados delitos socioeconómicos en los últimos diez años.",
      "Las deudas no provienen mayoritariamente de sanciones o conductas dolosas.",
    ],
    trustTitle: "Contenido revisado por abogado",
    trustText: "Actualizado según la última reforma concursal.",
  },
  closing: {
    title: "Ya sabes que se puede. El siguiente paso es tu caso",
    text: "Conocer las vías es el principio; aplicarlas a tu situación es lo que cancela la deuda. Pide tu estudio gratis y te decimos exactamente qué puedes cancelar y cómo.",
  },
  interactive: {
    legalTimeline: {
      title: "Vías legales para cancelar deudas y sus plazos",
      subtitle: "Según tu caso, se elige la vía más adecuada. Estos son los caminos posibles.",
      phases: [
        {
          title: "Reclamación por usura o cláusulas abusivas",
          duration: "Meses",
          text: "En tarjetas revolving y microcréditos con interés desproporcionado, la deuda puede anularse total o parcialmente.",
        },
        {
          title: "Negociación con acreedores",
          duration: "Variable",
          text: "Quitas y acuerdos de pago cuando todavía hay margen para asumir parte de la deuda.",
        },
        {
          title: "Acuerdo extrajudicial de pagos",
          duration: "1-2 meses",
          text: "Paso previo de la Ley de Segunda Oportunidad para intentar un acuerdo global con todos los acreedores.",
        },
        {
          title: "Exoneración judicial (LSO)",
          duration: "Resolución",
          text: "Si no puedes pagar, el juez cancela las deudas pendientes y empiezas de cero.",
        },
      ],
    },
    simulator: {
      title: "¿Cuánta deuda sería cancelable?",
      subtitle: "Una estimación rápida. La cifra real la confirmamos en tu diagnóstico gratis.",
      maxDebt: 120000,
      maxMonthly: 2000,
      defaultDebt: 28000,
      defaultMonthly: 450,
    },
    debtTypesTitle: "¿De qué tipo es tu deuda?",
    debtTypesSubtitle: "Cada tipo tiene su vía de cancelación. Elige el tuyo.",
    debtTypes: [
      {
        label: "Tarjetas revolving",
        message:
          "Vía habitual: reclamación por usura. Si los intereses son abusivos, la deuda puede anularse.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Cancelar tarjetas revolving",
      },
      {
        label: "Microcréditos",
        message:
          "Se cancelan vía reclamación o dentro de la Ley de Segunda Oportunidad.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cancelar microcréditos",
      },
      {
        label: "Préstamos y bancos",
        message:
          "Préstamos personales y descubiertos se exoneran con la Ley de Segunda Oportunidad.",
        to: "/ley-segunda-oportunidad",
        linkLabel: "Ley de Segunda Oportunidad",
      },
      {
        label: "Hacienda / Seg. Social",
        message:
          "La deuda pública se exonera con límites. Te explicamos cuáles se aplican a tu caso.",
        to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
        linkLabel: "Exoneración del pasivo insatisfecho",
      },
      {
        label: "Quiero pasar a la acción",
        message:
          "Si ya lo tienes claro, ve directamente a la página de acción para cancelar tu deuda.",
        to: "/cancelar-deudas",
        linkLabel: "Cancelar deudas ahora",
      },
      {
        label: "Aún puedo pagar algo",
        message:
          "Si puedes asumir una cuota razonable, valora reunificar antes de cancelar.",
        to: "/reunificacion-deudas",
        linkLabel: "Reunificación de deudas",
      },
    ],
    quiz: {
      title: "¿Cumples los requisitos? Compruébalo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Estás en situación de insolvencia (no puedes pagar)?", goodAnswer: "yes" },
        { text: "¿Actúas de buena fe?", goodAnswer: "yes" },
        { text: "¿Tus deudas vienen de préstamos, tarjetas o microcréditos?", goodAnswer: "yes" },
        { text: "¿Tienes condenas por delitos económicos recientes?", goodAnswer: "no" },
      ],
      resultPass: {
        title: "Cumples los requisitos clave",
        text: "Tu caso encaja con las condiciones de la cancelación de deudas. Confírmalo gratis y te decimos cuánto puedes exonerar.",
      },
      resultDoubt: {
        title: "Probablemente encajas",
        text: "Tu perfil se parece al de muchos casos que cancelan deuda. Lo verificamos gratis en 24h, sin compromiso.",
      },
    },
    beforeAfter: {
      title: "Antes y después de la cancelación",
      subtitle: "Lo que cambia cuando la deuda queda exonerada.",
      beforeLabel: "Con la deuda activa",
      afterLabel: "Tras la cancelación",
      before: [
        "Intereses que siguen creciendo",
        "Presión de acreedores y recobro",
        "Riesgo de embargo",
        "Datos en ficheros de morosos",
        "Sin capacidad de ahorro",
      ],
      after: [
        "Deuda exonerada de forma firme",
        "Sin llamadas ni reclamaciones",
        "Embargos suspendidos en el proceso",
        "Fuera del ASNEF al cerrar el caso",
        "Margen para reconstruir tu economía",
      ],
    },
  },
  sections: [
    {
      title: "¿Qué es la cancelación de deudas?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Cancelar una deuda significa que <strong>dejas de deberla legalmente</strong>.
            En España, la principal vía es la Ley de Segunda Oportunidad, que permite
            exonerar las deudas que un particular o autónomo no puede pagar. Existen otras
            vías, como la reclamación por intereses abusivos.
          </p>
          <p>
            Si prefieres pasar directamente a la acción, visita{" "}
            <A to="/cancelar-deudas">cancelar deudas</A>. Si quieres el detalle legal,
            sigue leyendo esta guía.
          </p>
        </div>
      ),
    },
    {
      title: "Vías legales de cancelación",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Ley de Segunda Oportunidad:</strong> exonera el pasivo insatisfecho.
              Es la vía más amplia. Detalle en el{" "}
              <A to="/ley-segunda-oportunidad">hub de la LSO</A> y en la{" "}
              <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">exoneración del pasivo</A>.
            </li>
            <li>
              <strong>Reclamación por usura:</strong> anula intereses abusivos en revolving
              y microcréditos.
            </li>
            <li>
              <strong>Acuerdos y quitas:</strong> reducción negociada cuando aún hay margen.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Requisitos y buena fe",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            La cancelación por Segunda Oportunidad exige <strong>insolvencia</strong> y
            <strong> buena fe</strong>: no haber ocultado bienes ni haber provocado el
            sobreendeudamiento de forma fraudulenta. También se valora no tener condenas por
            ciertos delitos económicos recientes.
          </p>
        </div>
      ),
    },
    {
      title: "Plazos y coste",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            El procedimiento judicial suele durar entre <strong>6 y 18 meses</strong>, según
            la complejidad y el juzgado. Los embargos pueden suspenderse mucho antes. El
            diagnóstico es gratuito y, si sigues, el presupuesto es cerrado con opción de
            pago fraccionado.
          </p>
          <p>
            ¿No estás seguro de si cancelar o{" "}
            <A to="/reunificacion-deudas">reunificar</A>? Lo valoramos gratis en tu caso.
          </p>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿La cancelación de deudas es legal en España?",
      a: (
        <>Sí. Está amparada principalmente por la Ley de Segunda Oportunidad y por la normativa de consumo frente a intereses abusivos.</>
      ),
      plain:
        "Sí. Está amparada principalmente por la Ley de Segunda Oportunidad y por la normativa de consumo frente a intereses abusivos.",
    },
    {
      q: "¿Qué requisitos hay para cancelar deudas?",
      a: (
        <>Estar en situación de insolvencia, actuar de buena fe y no tener condenas por determinados delitos económicos en los últimos diez años.</>
      ),
      plain:
        "Estar en situación de insolvencia, actuar de buena fe y no tener condenas por determinados delitos económicos en los últimos diez años.",
    },
    {
      q: "¿Cuánto tarda la cancelación?",
      a: (
        <>El procedimiento judicial suele durar de 6 a 18 meses, aunque los embargos pueden suspenderse mucho antes.</>
      ),
      plain:
        "El procedimiento judicial suele durar de 6 a 18 meses, aunque los embargos pueden suspenderse mucho antes.",
    },
    {
      q: "¿Se cancela también la deuda con Hacienda?",
      a: (
        <>Sí, con límites de exoneración establecidos por ley. Te calculamos cuánto en tu caso concreto durante el diagnóstico gratuito.</>
      ),
      plain:
        "Sí, con límites de exoneración establecidos por ley. Te calculamos cuánto en tu caso concreto durante el diagnóstico gratuito.",
    },
  ],
};