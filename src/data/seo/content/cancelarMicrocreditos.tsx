import type { MoneyContent } from "./types";
import { A, KeyCallout, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/casos/microcreditos-1.jpg";
import p2 from "@/assets/casos/microcreditos-2.jpg";
import p3 from "@/assets/casos/microcreditos-3.jpg";
import p4 from "@/assets/casos/microcreditos-4.jpg";
import p5 from "@/assets/casos/microcreditos-5.jpg";
import p6 from "@/assets/casos/microcreditos-6.jpg";

/**
 * Money page "Cancelar microcréditos". Ángulo: deuda pequeña que se multiplica.
 * Módulo exclusivo: comparador "lo que pediste vs lo que devuelves".
 */
export const cancelarMicrocreditos: MoneyContent = {
  path: "/microcreditos-prestamos/cancelar-microcreditos",
  reviewed: true,
  tone: "transactional",
  layout: [
    "valueComparison",
    "benefits",
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
      Los <strong>microcréditos</strong> prometen dinero rápido, pero sus intereses son tan
      altos que una deuda pequeña se convierte en una bola imposible. Muchos se pueden anular
      por usura. Revisamos los tuyos gratis.
    </>
  ),
  hero: {
    badge: "Cancelar microcréditos",
    titleLead: "Pediste poco,",
    titleAccent: "devuelves una fortuna.",
    subtitle: (
      <>
        Los microcréditos y préstamos rápidos aplican intereses desorbitados. Cuando son
        abusivos, la deuda puede <strong>anularse</strong>. Te decimos hoy, gratis, cuáles
        puedes dejar de pagar.
      </>
    ),
    trustNote: "Revisión gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Revisión gratis · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Qué consigues al cancelar tus microcréditos",
  benefits: [
    { icon: "shield", title: "Anulación por usura", text: "Si el interés es abusivo, la deuda se anula y dejas de pagar intereses." },
    { icon: "wallet", title: "Frenas la bola", text: "Cortas el círculo de pedir un microcrédito para pagar otro." },
    { icon: "ban", title: "Sales del ASNEF", text: "Al resolver la deuda, desaparece el motivo de tu inclusión en morosos." },
    { icon: "phone-off", title: "Se acaba la presión", text: "Paramos las llamadas y mensajes de las financieras y recobros." },
    { icon: "scale", title: "Respaldo legal", text: "La ley de usura y la de consumo amparan la anulación de estos contratos." },
    { icon: "sparkles", title: "Recuperas el control", text: "Dejas atrás la deuda que crecía sola y respiras de nuevo." },
  ],
  testimonialsTitle: "Personas que cancelaron sus microcréditos",
  testimonialsSubtitle: "Casos reales de deuda rápida anulada por intereses abusivos.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    { name: "Noelia G.", amount: "8.400 €", location: "Madrid", text: "Pedí 600 € y acabé debiendo miles. Los anularon y salí del bucle.", photo: p1 },
    { name: "Raúl D.", amount: "11.200 €", location: "Valencia", text: "Tenía seis microcréditos encadenados. Hoy no debo nada.", photo: p2 },
    { name: "Paula M.", amount: "5.700 €", location: "Sevilla", text: "Los intereses eran un disparate. La deuda se canceló entera.", photo: p3 },
    { name: "Iker S.", amount: "9.950 €", location: "Bilbao", text: "Pagaba y pagaba sin que bajara. Reclamamos y dejé de deber.", photo: p4 },
    { name: "Vanesa M.", amount: "6.300 €", location: "Málaga", text: "Un préstamo rápido se convirtió en cuatro. Anularon los intereses abusivos.", photo: p5 },
    { name: "Adrián P.", amount: "10.480 €", location: "Zaragoza", text: "Pedía uno para pagar otro. Frenamos la bola y cancelé la deuda.", photo: p6 },
  ],
  stepsTitle: "Cómo cancelamos tus microcréditos",
  stepsSubtitle: "Cuatro pasos para frenar la bola de deuda",
  steps: [
    { title: "Revisión gratuita", text: "Analizamos cada microcrédito y su TAE para detectar usura." },
    { title: "Estrategia", text: "Reclamamos por usura o, si hay muchas deudas, vamos a la LSO." },
    { title: "Reclamación o proceso", text: "Exigimos la nulidad o iniciamos el procedimiento que más te conviene." },
    { title: "Deuda cancelada", text: "Dejas de pagar y cierras el círculo de los préstamos rápidos.", highlight: true },
  ],
  metrics: [
    { value: "Hasta 100%", label: "De los intereses, anulables si hay usura" },
    { value: "Gratis", label: "Revisamos tus microcréditos sin compromiso" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Puedo cancelar mis microcréditos?",
    intro: (
      <>
        Si tus microcréditos tienen intereses desorbitados o ya no puedes asumirlos, lo más
        probable es que puedas cancelarlos. Esto es lo que revisamos gratis:
      </>
    ),
    requirements: [
      "Tienes uno o varios microcréditos o préstamos rápidos.",
      "Los intereses (TAE) son muy elevados.",
      "La deuda crece o se encadena con nuevos préstamos.",
      "No puedes asumirla con tus ingresos actuales.",
    ],
    trustTitle: "Ley de usura y consumo",
    trustText: "Estos contratos suelen ser anulables por intereses abusivos.",
  },
  closing: {
    title: "Un microcrédito hoy, una bola mañana",
    text: "No alimentes más la deuda. Pide tu revisión gratis y descubre cuántos microcréditos puedes anular.",
  },
  interactive: {
    valueComparison: {
      title: "Lo que pediste vs lo que acabas devolviendo",
      subtitle: "Mueve el importe y mira cuánto se multiplica con intereses de microcrédito.",
      borrowedLabel: "Pediste",
      repaidLabel: "Puedes recuperar",
      defaultBorrowed: 1000,
      maxBorrowed: 10000,
      factor: 2.6,
    },
    quiz: {
      title: "¿Puedes cancelar tus microcréditos? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Tienes microcréditos o préstamos rápidos?", goodAnswer: "yes" },
        { text: "¿Los intereses te parecen desorbitados?", goodAnswer: "yes" },
        { text: "¿Has pedido uno para pagar otro?", goodAnswer: "yes" },
        { text: "¿Puedes pagarlos sin problema con tu sueldo?", goodAnswer: "no" },
      ],
      resultPass: { title: "Puedes cancelar buena parte de tu deuda", text: "Tu caso encaja con los microcréditos que se anulan. Pide tu revisión gratis ahora." },
      resultDoubt: { title: "Merece la pena revisarlo", text: "Muchos microcréditos son anulables aunque no lo parezca. Lo vemos gratis en 24h." },
    },
    beforeAfter: {
      title: "Antes y después de cancelar",
      subtitle: "Lo que cambia al frenar la bola de los microcréditos.",
      beforeLabel: "Con microcréditos",
      afterLabel: "Después, con Calma",
      before: ["Deuda que se multiplica", "Préstamos encadenados", "Riesgo de ASNEF", "Llamadas constantes", "Sin salida a la vista"],
      after: ["Intereses abusivos anulados", "Se rompe el bucle", "Historial limpio", "Se acaban los recobros", "Empiezas de cero"],
    },
  },
  sections: [
    {
      title: "Por qué los microcréditos se hacen una bola",
      body: (
        <KeyCallout
          eyebrow="En una frase"
          headline={
            <>
              Dinero al instante que se convierte en una{" "}
              <span className="text-accent-deep">bola imposible</span>.
            </>
          }
        >
          <p>Los microcréditos tienen <strong>TAE altísimas</strong> y plazos cortos. Si no puedes devolver, se acumulan comisiones por demora y muchas personas piden otro para tapar el anterior.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Cómo se anulan por usura",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            Cuando el interés es desproporcionado, el contrato es <strong>nulo por usura</strong>: solo devuelves el capital, sin intereses. Si tienes muchas deudas a la vez, la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A> puede cancelarlas todas.
          </p>
          <p className="text-base leading-relaxed text-foreground/85">
            ¿También tarjetas? Mira cómo <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Coste y plazos",
      body: (
        <FactGrid
          items={[
            { value: "Gratis", label: "Revisión", detail: "Estudiamos tus microcréditos sin coste ni compromiso." },
            { value: "A medida", label: "Estrategia", detail: "Reclamamos la nulidad o iniciamos la Segunda Oportunidad." },
            { value: "Cerrado", label: "Presupuesto", detail: "Precio fijo con opción de pago fraccionado." },
          ]}
        />
      ),
    },
  ],
  faq: [
    { q: "¿Se pueden anular los microcréditos?", a: (<>Sí, cuando los intereses son abusivos el contrato puede declararse nulo por usura y solo devuelves el capital.</>), plain: "Sí, cuando los intereses son abusivos el contrato puede declararse nulo por usura y solo devuelves el capital." },
    { q: "Tengo varios encadenados, ¿qué hago?", a: (<>Lo valoramos en conjunto: reclamación por usura de cada uno o Ley de Segunda Oportunidad si la deuda total es inasumible.</>), plain: "Lo valoramos en conjunto: reclamación por usura de cada uno o Ley de Segunda Oportunidad si la deuda total es inasumible." },
    { q: "¿Saldré de ASNEF si los cancelo?", a: (<>Al resolver la deuda desaparece el motivo de la inclusión y tus datos deben salir del fichero.</>), plain: "Al resolver la deuda desaparece el motivo de la inclusión y tus datos deben salir del fichero." },
    { q: "¿La revisión tiene coste?", a: (<>No. Revisamos tus microcréditos gratis y sin compromiso.</>), plain: "No. Revisamos tus microcréditos gratis y sin compromiso." },
  ],
};