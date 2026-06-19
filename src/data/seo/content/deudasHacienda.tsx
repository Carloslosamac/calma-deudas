import type { MoneyContent } from "./types";
import { A, KeyCallout, OptionCards, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/casos/hacienda-1.jpg";
import p2 from "@/assets/casos/hacienda-2.jpg";
import p3 from "@/assets/casos/hacienda-3.jpg";
import p4 from "@/assets/casos/hacienda-4.jpg";
import p5 from "@/assets/casos/hacienda-5.jpg";
import p6 from "@/assets/casos/hacienda-6.jpg";

/**
 * Money page "Deudas con Hacienda". Ángulo: deuda pública con límites de exoneración.
 * Módulo exclusivo: bloque de límites de exoneración. Revisión legal pendiente.
 */
export const deudasHacienda: MoneyContent = {
  path: "/deudas-hacienda-seguridad-social/deudas-hacienda",
  directAnswer: {
    question: "¿Qué opciones tengo si tengo deudas con Hacienda?",
    answer: "Si tienes deudas con Hacienda puedes solicitar un aplazamiento o fraccionamiento del pago, y en situaciones de insolvencia parte de la deuda pública puede incluirse, con límites, en la Ley de Segunda Oportunidad. La vía adecuada depende del importe y de tu situación; en Calma la analizamos gratis.",
    plain: "Si tienes deudas con Hacienda puedes solicitar un aplazamiento o fraccionamiento del pago, y en situaciones de insolvencia parte de la deuda pública puede incluirse, con límites, en la Ley de Segunda Oportunidad. La vía adecuada depende del importe y de tu situación; en Calma la analizamos gratis.",
  },
  reviewed: false,
  tone: "legal",
  layout: [
    "benefits",
    "exonerationLimits",
    "steps",
    "quiz",
    "metrics",
    "testimonials",
    "sections",
    "eligibility",
    "faq",
    "closing",
  ],
  intro: (
    <>
      Las <strong>deudas con Hacienda</strong> tienen reglas propias: se pueden aplazar,
      negociar y, dentro de unos límites, exonerar con la Ley de Segunda Oportunidad. Te
      explicamos tus opciones gratis.
    </>
  ),
  hero: {
    badge: "Deudas con Hacienda",
    titleLead: "Deudas con Hacienda:",
    titleAccent: "tienes más opciones de las que crees.",
    subtitle: (
      <>
        Aplazamientos, fraccionamientos y, con límites, <strong>exoneración</strong> de parte
        de la deuda con Hacienda. Te decimos gratis qué puedes hacer en tu caso concreto.
      </>
    ),
    trustNote: "Diagnóstico gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Abogados especialistas · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Qué puedes hacer con tu deuda de Hacienda",
  benefits: [
    { icon: "wallet", title: "Aplazar o fraccionar", text: "Puedes solicitar pagar la deuda en plazos adaptados a tu situación." },
    { icon: "scale", title: "Revisar la deuda", text: "Comprobamos si la liquidación es correcta y si cabe recurso." },
    { icon: "shield", title: "Exoneración con límites", text: "Parte de la deuda pública puede cancelarse con la Ley de Segunda Oportunidad." },
    { icon: "gavel", title: "Frenar apremios", text: "Actuamos ante embargos y procedimientos de apremio en curso." },
    { icon: "landmark", title: "Estrategia global", text: "Combinamos deuda pública y privada en un único plan ordenado." },
    { icon: "sparkles", title: "Recuperas el control", text: "Dejas de temer al buzón y planificas con cabeza." },
  ],
  testimonialsTitle: "Personas que ordenaron su deuda con Hacienda",
  testimonialsSubtitle: "Casos reales de deuda pública aplazada, recurrida o exonerada con límites.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    { name: "Andrés P.", amount: "Aplazada", location: "Madrid", text: "Conseguimos fraccionar la deuda y frenar el apremio.", photo: p1 },
    { name: "Lucía R.", amount: "Parte exonerada", location: "Valencia", text: "Dentro de los límites, parte de mi deuda pública se canceló.", photo: p2 },
    { name: "Mateo L.", amount: "Recurrida", location: "Sevilla", text: "La liquidación tenía errores. La recurrimos con éxito.", photo: p3 },
    { name: "Eva C.", amount: "Plan global", location: "Bilbao", text: "Ordenamos deuda con Hacienda y bancos en un solo plan.", photo: p4 },
    { name: "Raúl V.", amount: "Apremio frenado", location: "Málaga", text: "Me había llegado la providencia de apremio. La paramos y aplazamos el pago.", photo: p5 },
    { name: "Marta D.", amount: "Embargo evitado", location: "Zaragoza", text: "Iban a embargarme la cuenta. Negociamos un fraccionamiento a tiempo.", photo: p6 },
  ],
  stepsTitle: "Cómo gestionamos tu deuda con Hacienda",
  stepsSubtitle: "Cuatro pasos para ordenar tu situación",
  steps: [
    { title: "Diagnóstico gratuito", text: "Analizamos el importe, el origen y la fase de tu deuda con Hacienda." },
    { title: "Estrategia", text: "Elegimos entre aplazar, recurrir, negociar o ir a la Segunda Oportunidad." },
    { title: "Gestión", text: "Tramitamos la solicitud y actuamos ante apremios o embargos." },
    { title: "Situación ordenada", text: "Pagas lo que puedes y, con límites, exoneras lo demás.", highlight: true },
  ],
  metrics: [
    { value: "Gratis", label: "Estudiamos tu deuda pública sin compromiso" },
    { value: "24h", label: "Te llamamos en menos de un día" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Puedo reducir mi deuda con Hacienda?",
    intro: (
      <>
        Depende del importe, el origen y tu capacidad de pago. Esto es lo que valoramos gratis:
      </>
    ),
    requirements: [
      "Tienes deuda con la Agencia Tributaria.",
      "Te resulta difícil o imposible pagarla de una vez.",
      "Quieres aplazar, recurrir o exonerar parte de ella.",
      "Tienes además otras deudas que conviene ordenar a la vez.",
    ],
    trustTitle: "Pendiente de revisión legal",
    trustText: "Contenido en revisión por abogado especialista en deuda pública.",
  },
  closing: {
    title: "La deuda con Hacienda no se arregla ignorándola",
    text: "Los apremios y recargos crecen. Pide tu diagnóstico gratis y ordena tu situación con un plan claro.",
  },
  interactive: {
    exonerationLimits: {
      title: "Hasta dónde se puede exonerar la deuda con Hacienda",
      subtitle: "La deuda pública se exonera con límites dentro de la Ley de Segunda Oportunidad.",
      items: [
        { label: "Parte exonerable", text: "Una parte de la deuda con Hacienda puede cancelarse dentro de los límites legales vigentes." },
        { label: "Resto en plan de pagos", text: "Lo no exonerado se reorganiza en un plan de pagos adaptado a tu capacidad." },
        { label: "Aplazamiento y fraccionamiento", text: "Al margen de la LSO, puedes solicitar pagar la deuda en plazos." },
        { label: "Revisión de la liquidación", text: "Si la deuda tiene errores o cabe recurso, se reclama antes de pagar de más." },
      ],
      note: "Los límites de exoneración de deuda pública cambian con la normativa. Confirmamos los vigentes en tu diagnóstico gratuito.",
    },
    quiz: {
      title: "¿Podemos ayudarte con Hacienda? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Tienes deuda con la Agencia Tributaria?", goodAnswer: "yes" },
        { text: "¿Te cuesta pagarla de una sola vez?", goodAnswer: "yes" },
        { text: "¿Tienes también otras deudas?", goodAnswer: "yes" },
        { text: "¿Puedes pagarla entera sin problema ahora mismo?", goodAnswer: "no" },
      ],
      resultPass: { title: "Tienes opciones con tu deuda de Hacienda", text: "Tu caso encaja. Pide tu diagnóstico gratis y te trazamos el plan." },
      resultDoubt: { title: "Vale la pena revisarlo", text: "La deuda pública tiene más salidas de las que parece. Lo vemos gratis en 24h." },
    },
  },
  sections: [
    {
      title: "¿Se puede cancelar la deuda con Hacienda?",
      body: (
        <KeyCallout
          eyebrow="En una frase"
          headline={
            <>
              La deuda con Hacienda se exonera{" "}
              <span className="text-accent-deep">con límites</span>.
            </>
          }
        >
          <p>Dentro de la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>, una parte de la deuda pública puede cancelarse y el resto se reorganiza en un plan de pagos.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Aplazar, fraccionar o recurrir",
      body: (
        <div className="space-y-5">
          <OptionCards
            items={[
              { icon: "clock", title: "Aplazar", text: "Retrasar el pago dentro de los criterios de la Agencia Tributaria." },
              { icon: "wallet", title: "Fraccionar", text: "Dividir la deuda en cuotas asumibles según tu capacidad de pago." },
              { icon: "gavel", title: "Recurrir", text: "Reclamar la liquidación si tiene errores, antes de pagar de más." },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            Si la deuda viene de tu actividad, mira también <A to="/deudas-hacienda-seguridad-social/deudas-seguridad-social">deudas con la Seguridad Social</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Coste y plazos",
      body: (
        <FactGrid
          items={[
            { value: "Gratis", label: "Diagnóstico", detail: "Estudiamos tu deuda con Hacienda sin coste." },
            { value: "Según vía", label: "Gestión", detail: "Depende de si aplazamos, recurrimos o exoneramos." },
            { value: "Cerrado", label: "Presupuesto", detail: "Precio fijo con opción de pago fraccionado." },
          ]}
        />
      ),
    },
  ],
  faq: [
    { q: "¿Se puede exonerar la deuda con Hacienda?", a: (<>Sí, con límites legales dentro de la Ley de Segunda Oportunidad. Una parte puede cancelarse y el resto se reorganiza en un plan de pagos.</>), plain: "Sí, con límites legales dentro de la Ley de Segunda Oportunidad. Una parte puede cancelarse y el resto se reorganiza en un plan de pagos." },
    { q: "¿Puedo aplazar la deuda?", a: (<>Sí. Puedes solicitar aplazamiento o fraccionamiento del pago, dentro de los criterios de la Agencia Tributaria.</>), plain: "Sí. Puedes solicitar aplazamiento o fraccionamiento del pago, dentro de los criterios de la Agencia Tributaria." },
    { q: "¿Y si la liquidación tiene errores?", a: (<>Si la deuda es incorrecta o cabe recurso, se reclama antes de pagar de más.</>), plain: "Si la deuda es incorrecta o cabe recurso, se reclama antes de pagar de más." },
    { q: "¿El diagnóstico tiene coste?", a: (<>No. El diagnóstico es gratuito y sin compromiso.</>), plain: "No. El diagnóstico es gratuito y sin compromiso." },
  ],
};