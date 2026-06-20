import type { MoneyContent } from "./types";
import { A, KeyCallout, OptionCards, ActionLink, WarningCallout, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/casos/cancelacion-1.jpg";
import p2 from "@/assets/casos/cancelacion-2.jpg";
import p3 from "@/assets/casos/cancelacion-3.jpg";
import p4 from "@/assets/casos/cancelacion-4.jpg";
import p5 from "@/assets/casos/cancelacion-5.jpg";
import p6 from "@/assets/casos/cancelacion-6.jpg";

/**
 * Money page "Cancelación de deudas". Ángulo informativo/guía: vías legales,
 * requisitos y plazos. Pilar del cluster que deriva a /cancelar-deudas (acción)
 * y al hub LSO, para no canibalizar con la variante de acción.
 */
export const cancelacionDeDeudas: MoneyContent = {
  path: "/cancelacion-de-deudas",
  directAnswer: {
    question: "¿Cuándo se pueden cancelar las deudas en España?",
    answer: "En España puedes cancelar tus deudas cuando eres insolvente, es decir, no puedes hacer frente a lo que debes, y actúas de buena fe, a través de la Ley de Segunda Oportunidad. También puedes anular deudas concretas si proceden de intereses usurarios. No todas las situaciones encajan igual; lo confirmamos con un análisis gratuito de tu caso.",
    plain: "En España puedes cancelar tus deudas cuando eres insolvente, es decir, no puedes hacer frente a lo que debes, y actúas de buena fe, a través de la Ley de Segunda Oportunidad. También puedes anular deudas concretas si proceden de intereses usurarios. No todas las situaciones encajan igual; lo confirmamos con un análisis gratuito de tu caso.",
  },
  reviewed: true,
  tone: "calm",
  layout: [
    "sections",
    "conceptGlossary",
    "mythVsReality",
    "benefits",
    "exonerationLimits",
    "debtTypes",
    "eligibility",
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
  testimonialsMoreHref: "/casos-de-exito",
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
      name: "Sergio V.",
      amount: "58.900 €",
      location: "Málaga",
      text: "Arrastraba deudas de varios años. Saber cómo funcionaba me quitó el miedo y empecé.",
      photo: p4,
    },
    {
      name: "Pilar N.",
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
    conceptGlossary: {
      title: "Conceptos clave para entenderlo",
      subtitle:
        "Los términos que aparecen una y otra vez al informarte, explicados sin jerga.",
      terms: [
        {
          term: "Insolvencia",
          definition:
            "Situación en la que tus ingresos y bienes no alcanzan para pagar tus deudas. Es el punto de partida para poder cancelarlas legalmente.",
        },
        {
          term: "Buena fe",
          definition:
            "Haber actuado con honestidad: no ocultar bienes ni provocar el sobreendeudamiento de forma fraudulenta. Es un requisito imprescindible.",
        },
        {
          term: "Pasivo insatisfecho",
          definition:
            "El conjunto de deudas que quedan sin pagar. La Ley de Segunda Oportunidad permite su exoneración cuando se cumplen los requisitos.",
        },
        {
          term: "Exoneración (EPI / BEPI)",
          definition:
            "La cancelación firme y definitiva de las deudas que dicta el juez. Una vez exoneradas, no se pueden volver a reclamar.",
        },
        {
          term: "Acuerdo extrajudicial de pagos",
          definition:
            "Intento previo de pactar con todos los acreedores un plan de pago. Si fracasa, se abre la vía judicial de exoneración.",
        },
      ],
    },
    mythVsReality: {
      title: "Mitos sobre la cancelación de deudas",
      subtitle: "Lo que se dice por ahí frente a lo que dice la ley.",
      items: [
        {
          myth: "“Cancelar deudas es un timo, no es legal.”",
          reality:
            "Es un mecanismo regulado por la Ley de Segunda Oportunidad desde 2015 y por la normativa de consumo. Lo aplican los juzgados.",
        },
        {
          myth: "“La deuda con Hacienda nunca se cancela.”",
          reality:
            "La deuda pública también se exonera, con unos límites establecidos por ley que se calculan según tu caso.",
        },
        {
          myth: "“Perderé mi casa y todos mis bienes.”",
          reality:
            "No siempre. Existe la vía sin liquidación de patrimonio, y la vivienda puede protegerse en muchos casos según tu situación.",
        },
        {
          myth: "“Quedaré marcado para siempre.”",
          reality:
            "Al cerrar el proceso sales de los ficheros de morosos como ASNEF y puedes reconstruir tu vida financiera.",
        },
      ],
    },
    exonerationLimits: {
      title: "Hasta dónde se cancela la deuda pública",
      subtitle:
        "Hacienda y Seguridad Social también se exoneran, pero con límites concretos.",
      items: [
        {
          label: "Hacienda (AEAT)",
          text: "La deuda con la Agencia Tributaria es exonerable hasta el límite legal previsto; el resto puede aplazarse o fraccionarse.",
        },
        {
          label: "Seguridad Social",
          text: "Las deudas con la Seguridad Social se exoneran con el mismo criterio de límite máximo establecido por la reforma concursal.",
        },
        {
          label: "Deuda privada",
          text: "Préstamos, tarjetas y microcréditos no tienen ese tope: pueden exonerarse en su totalidad.",
        },
        {
          label: "Cálculo en tu caso",
          text: "El límite exacto depende del importe y del tipo de deuda. Te lo calculamos gratis en el diagnóstico.",
        },
      ],
      note: "Los límites se actualizan según la última reforma concursal. Confirmamos las cifras vigentes aplicadas a tu situación.",
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
        label: "No puedo pagar, pero tengo bienes pagados",
        message:
          "Si aún puedes asumir una cuota, o tienes vivienda o terreno totalmente pagados que la LSO podría liquidar, suele convenir reunificar para protegerlos.",
        to: "/reunificacion-deudas",
        linkLabel: "Reunificación de deudas",
      },
    ],
  },
  sections: [
    {
      title: "¿Qué es la cancelación de deudas?",
      body: (
        <div className="space-y-5">
          <KeyCallout
            eyebrow="En una frase"
            headline={
              <>
                Cancelar una deuda significa que{" "}
                <span className="text-accent-deep">dejas de deberla legalmente</span>.
              </>
            }
          >
            <p>
              En España, la principal vía es la <strong>Ley de Segunda Oportunidad</strong>, que
              permite exonerar las deudas que un particular o autónomo no puede pagar. Existen
              otras vías, como la reclamación por intereses abusivos.
            </p>
          </KeyCallout>
          <ActionLink to="/cancelar-deudas">
            ¿Prefieres pasar directamente a la acción?{" "}
            <span className="text-accent-deep">Cancelar deudas</span>
          </ActionLink>
          <ActionLink to="/blog/guia-cancelar-deudas">
            Lee la guía pilar completa:{" "}
            <span className="text-accent-deep">Cancelar deudas en 2026: qué vía te conviene</span>
          </ActionLink>
        </div>
      ),
    },
    {
      title: "Vías legales de cancelación",
      body: (
        <OptionCards
          items={[
            {
              icon: "scale",
              title: "Ley de Segunda Oportunidad",
              text: "Exonera el pasivo insatisfecho. Es la vía más amplia para cancelar lo que no puedes pagar.",
              links: (
                <>
                  <A to="/ley-segunda-oportunidad">Hub de la LSO</A>
                  <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">Exoneración del pasivo</A>
                </>
              ),
            },
            {
              icon: "gavel",
              title: "Reclamación por usura",
              text: "Anula los intereses abusivos en tarjetas revolving y microcréditos.",
              links: <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">Tarjetas revolving</A>,
            },
            {
              icon: "users",
              title: "Acuerdos y quitas",
              text: "Reducción negociada de la deuda cuando todavía hay margen para pagar una parte.",
            },
          ]}
        />
      ),
    },
    {
      title: "Requisitos y buena fe",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            La cancelación por Segunda Oportunidad exige <strong>insolvencia</strong> y{" "}
            <strong>buena fe</strong>: no haber ocultado bienes ni haber provocado el
            sobreendeudamiento de forma fraudulenta. También se valora no tener condenas por
            ciertos delitos económicos recientes.
          </p>
          <WarningCallout title="Si tienes bienes de valor totalmente pagados">
            <p>
              Si tienes <strong>vivienda, terreno u otros bienes de valor totalmente
              pagados</strong>, la fase de liquidación de la LSO podría realizarlos para pagar a
              los acreedores. En esos casos suele ser preferible{" "}
              <A to="/reunificacion-deudas">reunificar</A> para proteger ese patrimonio.
            </p>
          </WarningCallout>
        </div>
      ),
    },
    {
      title: "Plazos y coste",
      body: (
        <div className="space-y-5">
          <FactGrid
            items={[
              { value: "6–18 meses", label: "Duración", detail: "Según complejidad y juzgado. Los embargos se suspenden antes." },
              { value: "Gratis", label: "Diagnóstico", detail: "Analizamos tu caso sin coste ni compromiso." },
              { value: "Cerrado", label: "Presupuesto", detail: "Precio fijo con opción de pago fraccionado." },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            ¿No estás seguro de si cancelar o <A to="/reunificacion-deudas">reunificar</A>? Lo
            valoramos gratis en tu caso.
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