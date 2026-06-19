import type { MoneyContent } from "./types";
import { A, KeyCallout, OptionCards, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/casos/asnef-1.jpg";
import p2 from "@/assets/casos/asnef-2.jpg";
import p3 from "@/assets/casos/asnef-3.jpg";
import p4 from "@/assets/casos/asnef-4.jpg";
import p5 from "@/assets/casos/asnef-5.jpg";
import p6 from "@/assets/casos/asnef-6.jpg";

/**
 * Money page "Salir de ASNEF". Ángulo urgente: estar en un fichero de morosos
 * te bloquea financiación. Diferenciada con timeline de urgencia. Deriva a
 * microcréditos y revolving (origen frecuente de la morosidad).
 */
export const salirDeAsnef: MoneyContent = {
  path: "/asnef/salir-de-asnef",
  directAnswer: {
    question: "¿Cómo puedo salir de ASNEF?",
    answer: "Para salir de ASNEF debes resolver el origen de la deuda que te incluyó: pagándola, demostrando que es errónea o cancelándola por la vía legal correspondiente. Una vez extinguida la deuda, la entidad está obligada a retirar tus datos del fichero. En Calma analizamos gratis por qué estás en ASNEF y la forma más rápida y legal de salir.",
    plain: "Para salir de ASNEF debes resolver el origen de la deuda que te incluyó: pagándola, demostrando que es errónea o cancelándola por la vía legal correspondiente. Una vez extinguida la deuda, la entidad está obligada a retirar tus datos del fichero. En Calma analizamos gratis por qué estás en ASNEF y la forma más rápida y legal de salir.",
  },
  reviewed: true,
  tone: "urgent",
  layout: [
    "urgencyTimeline",
    "benefits",
    "steps",
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
      Estar en <strong>ASNEF</strong> te cierra puertas: ni préstamos, ni financiación, ni a
      veces un simple contrato de móvil. Te ayudamos a salir del fichero atacando la raíz: la
      deuda que te metió en él.
    </>
  ),
  hero: {
    badge: "Salir de ASNEF",
    titleLead: "Sal de ASNEF",
    titleAccent: "y recupera tu vida financiera.",
    subtitle: (
      <>
        Aparecer en un fichero de morosos te bloquea créditos y financiación. Te decimos hoy,
        gratis, cómo salir de ASNEF de forma legal y, sobre todo, cómo <strong>eliminar la
        deuda</strong> que te puso ahí.
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
  benefitsTitle: "Qué consigues al salir de ASNEF",
  benefits: [
    { icon: "ban", title: "Fuera del fichero", text: "Trabajamos para que tus datos salgan de ASNEF y otros ficheros de morosos." },
    { icon: "wallet", title: "Vuelves a financiarte", text: "Recuperas el acceso a créditos, hipotecas y contratos que hoy te niegan." },
    { icon: "shield", title: "Atacamos la deuda", text: "No solo el síntoma: eliminamos legalmente la deuda que te metió en el fichero." },
    { icon: "phone-off", title: "Se acaba la presión", text: "Paramos las llamadas de recobro que acompañan a la morosidad." },
    { icon: "scale", title: "Revisamos si es legal", text: "Comprobamos si te incluyeron correctamente; muchas inclusiones son impugnables." },
    { icon: "sparkles", title: "Empiezas de nuevo", text: "Limpias tu historial y recuperas la tranquilidad financiera." },
  ],
  testimonialsTitle: "Personas que salieron de ASNEF",
  testimonialsSubtitle: "Casos reales de personas que limpiaron su historial al resolver la deuda.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    { name: "Rubén A.", amount: "Fuera de ASNEF", location: "Madrid", text: "Un microcrédito impagado me bloqueaba todo. Lo resolví y salí del fichero.", photo: p2 },
    { name: "Elena C.", amount: "Fuera de ASNEF", location: "Valencia", text: "No podía ni cambiar de compañía de móvil. Hoy vuelvo a tener crédito.", photo: p1 },
    { name: "Jorge M.", amount: "Fuera de ASNEF", location: "Sevilla", text: "Me incluyeron por una deuda que ni reconocía. La impugnamos y desapareció.", photo: p4 },
    { name: "Lucía F.", amount: "Fuera de ASNEF", location: "Bilbao", text: "Cancelé mis deudas y, con ellas, mi rastro en los ficheros de morosos.", photo: p3 },
    { name: "Marcos R.", amount: "Fuera de ASNEF", location: "Málaga", text: "El banco me negaba la hipoteca por una anotación antigua. Hoy ya no aparezco.", photo: p6 },
    { name: "Patricia L.", amount: "Fuera de ASNEF", location: "Zaragoza", text: "Resolvimos la deuda de origen y mis datos salieron del fichero en semanas.", photo: p5 },
  ],
  stepsTitle: "Cómo te ayudamos a salir de ASNEF",
  stepsSubtitle: "Cuatro pasos para limpiar tu historial",
  steps: [
    { title: "Diagnóstico gratuito", text: "Revisamos por qué estás en ASNEF y si la inclusión es correcta." },
    { title: "Estrategia a medida", text: "Decidimos si impugnar la inclusión o cancelar la deuda de raíz." },
    { title: "Resolución de la deuda", text: "Reclamamos o cancelamos la deuda que originó tu entrada en el fichero." },
    { title: "Fuera del fichero", text: "Tus datos salen de ASNEF y recuperas el acceso a financiación.", highlight: true },
  ],
  metrics: [
    { value: "Gratis", label: "Revisamos tu caso sin compromiso" },
    { value: "24h", label: "Te llamamos en menos de un día" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Puedo salir de ASNEF?",
    intro: (
      <>
        Sí, casi siempre. La clave es resolver la deuda que originó la inclusión o impugnarla
        si no es correcta. Esto es lo que valoramos gratis:
      </>
    ),
    requirements: [
      "Estás incluido en ASNEF u otro fichero de morosos.",
      "La deuda proviene de un préstamo, tarjeta, microcrédito o servicio impagado.",
      "Quieres recuperar el acceso a financiación.",
      "Buscas resolver la causa, no solo borrar el rastro temporalmente.",
    ],
    trustTitle: "Asesoramiento honesto",
    trustText: "Si la inclusión es legal, te decimos la vía real para salir.",
  },
  closing: {
    title: "Cada día en ASNEF es una puerta que se te cierra",
    text: "Mientras sigues en el fichero, no puedes financiarte. Pide tu estudio gratis y empieza hoy a limpiar tu historial.",
  },
  interactive: {
    urgencyTimeline: {
      title: "Qué te pasa mientras sigues en ASNEF",
      subtitle: "Cuanto más tiempo pasa, más se complica tu vida financiera.",
      items: [
        { time: "Hoy", title: "Crédito bloqueado", text: "No puedes pedir préstamos, financiar compras ni a veces contratar servicios básicos." },
        { time: "Semanas", title: "Intereses que crecen", text: "La deuda original sigue generando intereses y recargos mientras no se resuelve.", danger: true },
        { time: "Meses", title: "Más ficheros, más recobro", text: "Pueden ampliarse las anotaciones y aumentar las llamadas de empresas de recobro.", danger: true },
        { time: "Con Calma", title: "Resolución de la deuda", text: "Atacamos el origen y tus datos salen del fichero. Recuperas tu vida financiera." },
      ],
    },
    debtTypesTitle: "¿De qué viene tu deuda en ASNEF?",
    debtTypesSubtitle: "Elige el origen y te decimos por dónde empezar.",
    debtTypes: [
      { label: "Microcréditos", message: "El origen más común. Muchos tienen intereses abusivos y la deuda puede anularse.", to: "/microcreditos-prestamos/cancelar-microcreditos", linkLabel: "Cancelar microcréditos" },
      { label: "Tarjetas revolving", message: "Si la TAE es desproporcionada, se puede reclamar por usura y cancelar.", to: "/tarjetas-revolving/cancelar-tarjetas-revolving", linkLabel: "Cancelar tarjetas revolving" },
      { label: "Préstamos bancarios", message: "Préstamos personales impagados que se pueden negociar o cancelar.", to: "/cancelar-deudas", linkLabel: "Cancelar deudas" },
      { label: "No sé / varias", message: "Lo más habitual. Revisamos todas tus inclusiones gratis y trazamos un plan.", to: "/ley-segunda-oportunidad", linkLabel: "Ley de Segunda Oportunidad" },
    ],
    quiz: {
      title: "¿Puedes salir de ASNEF? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Estás incluido en ASNEF u otro fichero de morosos?", goodAnswer: "yes" },
        { text: "¿La deuda viene de un préstamo, tarjeta o microcrédito?", goodAnswer: "yes" },
        { text: "¿Te están negando financiación por estar fichado?", goodAnswer: "yes" },
        { text: "¿Crees que la deuda ya está pagada o es incorrecta?", goodAnswer: "no" },
      ],
      resultPass: { title: "Podemos ayudarte a salir de ASNEF", text: "Tu caso encaja. Pide tu estudio gratis y empieza a limpiar tu historial." },
      resultDoubt: { title: "Probablemente sí. No te quedes con la duda.", text: "Casos como el tuyo salen del fichero cada semana. Lo revisamos gratis en 24h." },
    },
    beforeAfter: {
      title: "Antes y después de salir de ASNEF",
      subtitle: "Lo que cambia cuando limpias tu historial.",
      beforeLabel: "Hoy, en ASNEF",
      afterLabel: "Después, con Calma",
      before: ["Sin acceso a crédito", "Financiación denegada", "Llamadas de recobro", "Deuda que crece", "Bloqueado para contratar servicios"],
      after: ["Fuera del fichero", "Vuelves a financiarte", "Se acaban las llamadas", "Deuda resuelta de raíz", "Recuperas tu normalidad"],
    },
  },
  sections: [
    {
      title: "¿Qué es ASNEF y por qué te bloquea?",
      body: (
        <KeyCallout
          eyebrow="En una frase"
          headline={
            <>
              ASNEF es el fichero de morosos que hace que te{" "}
              <span className="text-accent-deep">denieguen crédito</span>.
            </>
          }
        >
          <p>Si una empresa te incluye por una deuda impagada, los bancos y financieras lo consultan y te cierran el grifo de forma casi automática.</p>
          <p>Salir no es solo borrar el dato: lo eficaz es resolver la deuda que originó la inclusión. Si viene de productos abusivos, puede anularse. Mira cómo <A to="/cancelar-deudas">cancelar deudas</A>.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Cómo salir de ASNEF de forma legal",
      body: (
        <OptionCards
          items={[
            {
              icon: "wallet",
              title: "Pagar o cancelar la deuda",
              text: "Al resolverla, la empresa debe dar de baja tus datos del fichero.",
            },
            {
              icon: "shield",
              title: "Impugnar la inclusión",
              text: "Si la deuda no existe, está pagada o caducada, se reclama su retirada.",
            },
            {
              icon: "gavel",
              title: "Reclamar por usura",
              text: "En microcréditos y revolving, la deuda puede anularse por intereses abusivos.",
              links: <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">Tarjetas revolving</A>,
            },
          ]}
        />
      ),
    },
    {
      title: "¿Cuánto tarda y cuánto cuesta?",
      body: (
        <FactGrid
          items={[
            { value: "Pocos días", label: "Baja del fichero", detail: "Una vez resuelta la deuda, tus datos salen rápido." },
            { value: "Gratis", label: "Diagnóstico", detail: "Estudiamos tu caso sin coste ni compromiso." },
            { value: "Cerrado", label: "Presupuesto", detail: "Precio fijo si hay que impugnar o reclamar." },
          ]}
        />
      ),
    },
  ],
  faq: [
    { q: "¿Cuánto tardo en salir de ASNEF?", a: (<>Una vez resuelta o cancelada la deuda, la baja suele producirse en pocos días. Si hay que impugnar, depende del caso.</>), plain: "Una vez resuelta o cancelada la deuda, la baja suele producirse en pocos días. Si hay que impugnar, depende del caso." },
    { q: "¿Puedo salir sin pagar la deuda?", a: (<>Sí, si la deuda es incorrecta, está pagada o caducada, o si proviene de un producto abusivo que se anula por usura.</>), plain: "Sí, si la deuda es incorrecta, está pagada o caducada, o si proviene de un producto abusivo que se anula por usura." },
    { q: "¿Volver a tener crédito es inmediato?", a: (<>Al salir del fichero recuperas el acceso a financiación, aunque cada entidad tiene sus propios criterios de concesión.</>), plain: "Al salir del fichero recuperas el acceso a financiación, aunque cada entidad tiene sus propios criterios de concesión." },
    { q: "¿El estudio tiene coste?", a: (<>No. El estudio es gratuito y sin compromiso.</>), plain: "No. El estudio es gratuito y sin compromiso." },
  ],
};