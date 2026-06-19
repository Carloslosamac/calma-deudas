import type { MoneyContent } from "./types";
import { A, KeyCallout, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/person-family-table.jpg";
import p2 from "@/assets/person-woman-walking.jpg";
import p3 from "@/assets/avatar-1.jpg";
import p4 from "@/assets/avatar-2.jpg";

/**
 * Money page "Deudas con la Seguridad Social". Ángulo: autónomos y deuda pública.
 * Módulo exclusivo: bloque de límites de exoneración. Revisión legal pendiente.
 */
export const deudasSeguridadSocial: MoneyContent = {
  path: "/deudas-hacienda-seguridad-social/deudas-seguridad-social",
  directAnswer: {
    question: "¿Qué puedo hacer si debo dinero a la Seguridad Social?",
    answer: "Ante una deuda con la Seguridad Social puedes pedir un aplazamiento o fraccionamiento para pagarla poco a poco, y si eres insolvente parte de esa deuda pública puede tratarse, con límites, dentro de la Ley de Segunda Oportunidad. En Calma estudiamos tu caso gratis y te decimos qué opción real tienes.",
    plain: "Ante una deuda con la Seguridad Social puedes pedir un aplazamiento o fraccionamiento para pagarla poco a poco, y si eres insolvente parte de esa deuda pública puede tratarse, con límites, dentro de la Ley de Segunda Oportunidad. En Calma estudiamos tu caso gratis y te decimos qué opción real tienes.",
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
      Las <strong>deudas con la Seguridad Social</strong> afectan sobre todo a autónomos. Se
      pueden aplazar y, con límites, exonerar dentro de la Ley de Segunda Oportunidad. Te
      explicamos tus opciones gratis.
    </>
  ),
  hero: {
    badge: "Deudas con la Seguridad Social",
    titleLead: "Deudas con la Seguridad Social:",
    titleAccent: "una salida para autónomos.",
    subtitle: (
      <>
        Cuotas de autónomo atrasadas, recargos y apremios. Puedes <strong>aplazar y, con
        límites, exonerar</strong> parte de la deuda. Te decimos gratis qué hacer en tu caso.
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
  benefitsTitle: "Qué puedes hacer con tu deuda de la Seguridad Social",
  benefits: [
    { icon: "wallet", title: "Aplazar las cuotas", text: "Puedes solicitar aplazar las cuotas de autónomo y otras deudas pendientes." },
    { icon: "shield", title: "Exoneración con límites", text: "Parte de la deuda pública puede cancelarse con la Ley de Segunda Oportunidad." },
    { icon: "scale", title: "Revisar recargos", text: "Comprobamos recargos y apremios y si cabe oposición o reducción." },
    { icon: "gavel", title: "Frenar embargos", text: "Actuamos ante embargos de cuenta o ingresos por deuda con la TGSS." },
    { icon: "landmark", title: "Plan global", text: "Combinamos deuda con la Seguridad Social, Hacienda y bancos en un solo plan." },
    { icon: "sparkles", title: "Sigues adelante", text: "Ordenas tu situación para poder continuar con tu actividad o empezar de cero." },
  ],
  testimonialsTitle: "Autónomos que ordenaron su deuda",
  testimonialsSubtitle: "Casos reales de deuda con la Seguridad Social aplazada o exonerada con límites.",
  testimonialsMoreHref: "/casos-de-exito",
  testimonials: [
    { name: "Rafa P.", amount: "Aplazada", location: "Madrid", text: "Arrastraba cuotas de autónomo. Las aplazamos y frené el apremio.", photo: p1 },
    { name: "Nuria R.", amount: "Parte exonerada", location: "Valencia", text: "Cerré mi negocio con deuda. Parte se canceló con la LSO.", photo: p2 },
    { name: "Óscar L.", amount: "Embargo frenado", location: "Sevilla", text: "Me embargaban ingresos. Lo paramos y ordenamos la deuda.", photo: p3 },
    { name: "Belén C.", amount: "Plan global", location: "Bilbao", text: "Junté deuda de Seguridad Social y bancos en un único plan.", photo: p4 },
  ],
  stepsTitle: "Cómo gestionamos tu deuda con la TGSS",
  stepsSubtitle: "Cuatro pasos para ordenar tu situación",
  steps: [
    { title: "Diagnóstico gratuito", text: "Analizamos las cuotas, recargos y la fase de tu deuda con la Seguridad Social." },
    { title: "Estrategia", text: "Elegimos entre aplazar, recurrir recargos o ir a la Segunda Oportunidad." },
    { title: "Gestión", text: "Tramitamos la solicitud y actuamos ante apremios o embargos." },
    { title: "Situación ordenada", text: "Pagas lo que puedes y, con límites, exoneras lo demás.", highlight: true },
  ],
  metrics: [
    { value: "Gratis", label: "Estudiamos tu deuda con la TGSS sin compromiso" },
    { value: "24h", label: "Te llamamos en menos de un día" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Puedo reducir mi deuda con la Seguridad Social?",
    intro: (
      <>
        Depende del importe, los recargos y tu capacidad de pago. Esto es lo que valoramos gratis:
      </>
    ),
    requirements: [
      "Tienes deuda con la Tesorería General de la Seguridad Social.",
      "Provienen de cuotas de autónomo u otras obligaciones.",
      "Te resulta difícil o imposible pagarla de una vez.",
      "Quieres aplazar, recurrir recargos o exonerar parte de ella.",
    ],
    trustTitle: "Pendiente de revisión legal",
    trustText: "Contenido en revisión por abogado especialista en deuda pública.",
  },
  closing: {
    title: "La deuda con la Seguridad Social crece con recargos",
    text: "Cuanto antes actúes, mejores condiciones. Pide tu diagnóstico gratis y ordena tu situación.",
  },
  interactive: {
    exonerationLimits: {
      title: "Hasta dónde se exonera la deuda con la Seguridad Social",
      subtitle: "La deuda pública se exonera con límites dentro de la Ley de Segunda Oportunidad.",
      items: [
        { label: "Parte exonerable", text: "Una parte de la deuda con la Seguridad Social puede cancelarse dentro de los límites legales vigentes." },
        { label: "Resto en plan de pagos", text: "Lo no exonerado se reorganiza en un plan de pagos adaptado a tu capacidad." },
        { label: "Aplazamiento de cuotas", text: "Al margen de la LSO, puedes solicitar aplazar las cuotas de autónomo pendientes." },
        { label: "Revisión de recargos", text: "Si los recargos o apremios son incorrectos, se reclaman antes de pagar de más." },
      ],
      note: "Los límites de exoneración de deuda pública cambian con la normativa. Confirmamos los vigentes en tu diagnóstico gratuito.",
    },
    quiz: {
      title: "¿Podemos ayudarte con la TGSS? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Tienes deuda con la Seguridad Social?", goodAnswer: "yes" },
        { text: "¿Eres o has sido autónomo?", goodAnswer: "yes" },
        { text: "¿Te cuesta pagarla de una sola vez?", goodAnswer: "yes" },
        { text: "¿Puedes pagarla entera sin problema ahora mismo?", goodAnswer: "no" },
      ],
      resultPass: { title: "Tienes opciones con tu deuda de la Seguridad Social", text: "Tu caso encaja. Pide tu diagnóstico gratis y te trazamos el plan." },
      resultDoubt: { title: "Vale la pena revisarlo", text: "La deuda pública tiene más salidas de las que parece. Lo vemos gratis en 24h." },
    },
  },
  sections: [
    {
      title: "¿Se puede cancelar la deuda con la Seguridad Social?",
      body: (
        <KeyCallout
          eyebrow="En una frase"
          headline={
            <>
              La deuda con la Seguridad Social se exonera{" "}
              <span className="text-accent-deep">con límites</span>.
            </>
          }
        >
          <p>Dentro de la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>, una parte de la deuda pública puede cancelarse y el resto se reorganiza en un plan de pagos.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Especialmente para autónomos",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>La mayoría de estas deudas son cuotas de autónomo atrasadas. Si has cerrado o vas a cerrar tu actividad, el <A to="/autonomos-concurso-acreedores/concurso-persona-fisica">concurso de persona física</A> puede ser la vía para reorganizar o cancelar la deuda.</p>
          <p>Si también debes a Hacienda, mira <A to="/deudas-hacienda-seguridad-social/deudas-hacienda">deudas con Hacienda</A>.</p>
        </div>
      ),
    },
    {
      title: "Coste y plazos",
      body: (
        <FactGrid
          items={[
            { value: "Gratis", label: "Diagnóstico", detail: "Estudiamos tus cuotas pendientes sin coste." },
            { value: "Según vía", label: "Gestión", detail: "Depende de si aplazamos o vamos a exoneración." },
            { value: "Cerrado", label: "Presupuesto", detail: "Precio fijo con opción de pago fraccionado." },
          ]}
        />
      ),
    },
  ],
  faq: [
    { q: "¿Se puede exonerar la deuda con la Seguridad Social?", a: (<>Sí, con límites legales dentro de la Ley de Segunda Oportunidad. Una parte puede cancelarse y el resto se reorganiza en un plan de pagos.</>), plain: "Sí, con límites legales dentro de la Ley de Segunda Oportunidad. Una parte puede cancelarse y el resto se reorganiza en un plan de pagos." },
    { q: "¿Puedo aplazar las cuotas de autónomo?", a: (<>Sí. Puedes solicitar aplazar las cuotas pendientes, dentro de los criterios de la Tesorería General de la Seguridad Social.</>), plain: "Sí. Puedes solicitar aplazar las cuotas pendientes, dentro de los criterios de la Tesorería General de la Seguridad Social." },
    { q: "¿Y si he cerrado mi negocio?", a: (<>Aunque hayas cesado tu actividad, puedes acogerte a la Ley de Segunda Oportunidad para reorganizar o cancelar la deuda.</>), plain: "Aunque hayas cesado tu actividad, puedes acogerte a la Ley de Segunda Oportunidad para reorganizar o cancelar la deuda." },
    { q: "¿El diagnóstico tiene coste?", a: (<>No. El diagnóstico es gratuito y sin compromiso.</>), plain: "No. El diagnóstico es gratuito y sin compromiso." },
  ],
};