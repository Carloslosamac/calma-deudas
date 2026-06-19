import type { MoneyContent } from "./types";
import { A, KeyCallout, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/person-couple-sofa.jpg";
import p2 from "@/assets/person-family-table.jpg";
import p3 from "@/assets/person-woman-walking.jpg";
import p4 from "@/assets/avatar-2.jpg";

/**
 * Money page "Concurso de persona física". Ángulo jurídico post-reforma concursal.
 * Módulo: línea temporal legal. Sub-página del cluster autónomos. Revisión legal.
 */
export const concursoPersonaFisica: MoneyContent = {
  path: "/autonomos-concurso-acreedores/concurso-persona-fisica",
  directAnswer: {
    question: "¿Cuándo y cómo se solicita el concurso de persona física?",
    answer: "El concurso de acreedores de persona física se solicita cuando un particular o autónomo es insolvente y no puede pagar sus deudas. Tras la reforma concursal se tramita ante el juzgado y puede terminar con la exoneración de las deudas pendientes. Requiere abogado y reunir documentación; en Calma estudiamos tu caso gratis antes de iniciarlo.",
    plain: "El concurso de acreedores de persona física se solicita cuando un particular o autónomo es insolvente y no puede pagar sus deudas. Tras la reforma concursal se tramita ante el juzgado y puede terminar con la exoneración de las deudas pendientes. Requiere abogado y reunir documentación; en Calma estudiamos tu caso gratis antes de iniciarlo.",
  },
  reviewed: false,
  tone: "legal",
  layout: [
    "benefits",
    "legalTimeline",
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
      El <strong>concurso de persona física</strong> es el procedimiento legal para particulares
      y autónomos insolventes. Tras la reforma concursal, es la vía para reorganizar o cancelar
      tus deudas. Estudiamos tu caso gratis.
    </>
  ),
  hero: {
    badge: "Concurso de persona física",
    titleLead: "Concurso de persona física:",
    titleAccent: "una salida legal a la insolvencia.",
    subtitle: (
      <>
        Si eres particular o autónomo y no puedes pagar, el concurso permite <strong>reorganizar
        o cancelar tus deudas</strong> bajo amparo judicial. Te explicamos cómo y si encajas,
        gratis.
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
  benefitsTitle: "Qué te aporta el concurso de persona física",
  benefits: [
    { icon: "scale", title: "Amparo judicial", text: "El procedimiento se desarrolla bajo control del juzgado, con garantías legales." },
    { icon: "shield", title: "Cancelación de deudas", text: "Puede terminar con la exoneración del pasivo que no puedes pagar." },
    { icon: "gavel", title: "Suspensión de embargos", text: "Durante el concurso pueden frenarse los embargos y ejecuciones en curso." },
    { icon: "users", title: "Un solo procedimiento", text: "Concentra a todos tus acreedores en un único proceso ordenado." },
    { icon: "wallet", title: "Plan de pagos viable", text: "Si procede, se fija un plan adaptado a lo que realmente puedes pagar." },
    { icon: "sparkles", title: "Empiezas de nuevo", text: "Recuperas el control de tu economía personal o de tu actividad." },
  ],
  testimonialsTitle: "Personas que salieron con el concurso",
  testimonialsSubtitle: "Casos reales de particulares y autónomos que reorganizaron o cancelaron su deuda.",
  testimonialsMoreHref: "/casos-de-exito",
  testimonials: [
    { name: "Víctor R.", amount: "112.000 €", location: "Madrid", text: "Como autónomo lo perdí todo. El concurso me dio una salida ordenada.", photo: p1 },
    { name: "Sonia P.", amount: "47.300 €", location: "Valencia", text: "Pude reorganizar mis deudas con un plan que sí podía pagar.", photo: p2 },
    { name: "Gonzalo L.", amount: "88.600 €", location: "Sevilla", text: "Frenaron los embargos y al final exoneraron lo pendiente.", photo: p4 },
    { name: "Marina C.", amount: "61.400 €", location: "Bilbao", text: "Un solo procedimiento para todos mis acreedores. Un alivio.", photo: p3 },
  ],
  stepsTitle: "Cómo se tramita el concurso",
  stepsSubtitle: "Las etapas del procedimiento",
  steps: [
    { title: "Diagnóstico gratuito", text: "Analizamos tu insolvencia y la mejor estrategia para tu caso." },
    { title: "Solicitud de concurso", text: "Preparamos y presentamos la solicitud ante el juzgado." },
    { title: "Tramitación", text: "Plan de pagos o liquidación, según tu situación, con los embargos suspendidos." },
    { title: "Exoneración o cierre", text: "El proceso termina con la cancelación de la deuda pendiente.", highlight: true },
  ],
  metrics: [
    { value: "Gratis", label: "Estudiamos tu caso sin compromiso" },
    { value: "24h", label: "Te llamamos en menos de un día" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Me conviene el concurso de persona física?",
    intro: (
      <>
        El concurso encaja si eres insolvente y actúas de buena fe. Esto es lo que valoramos
        gratis:
      </>
    ),
    requirements: [
      "Eres particular o autónomo y no puedes atender tus deudas.",
      "Tu insolvencia es actual o inminente.",
      "Actúas de buena fe y colaboras con el procedimiento.",
      "Buscas una solución legal y ordenada para todos tus acreedores.",
    ],
    trustTitle: "Pendiente de revisión legal",
    trustText: "Contenido en revisión por abogado especialista en concursal.",
  },
  closing: {
    title: "La insolvencia tiene una salida legal",
    text: "No cargues solo con la deuda. Pide tu diagnóstico gratis y te diremos si el concurso es tu mejor vía.",
  },
  interactive: {
    legalTimeline: {
      title: "Fases del concurso de persona física",
      subtitle: "Un procedimiento ordenado y bajo control judicial.",
      phases: [
        { title: "Solicitud y auto de declaración", duration: "Inicio", text: "Se presenta la solicitud de concurso ante el juzgado mercantil o de primera instancia y el juez dicta el auto que declara la insolvencia." },
        { title: "Administración concursal", duration: "Primeras semanas", text: "Se nombra al administrador concursal, que verifica el activo y el pasivo y elabora el inventario de la masa." },
        { title: "Fase común", duration: "Meses", text: "Se determinan los créditos y su orden de prelación. Los embargos quedan suspendidos mientras dura el procedimiento." },
        { title: "Convenio o liquidación", duration: "Variable", text: "O bien un convenio con quitas y esperas, o bien la liquidación ordenada de los bienes no necesarios para la actividad." },
        { title: "Conclusión y exoneración", duration: "Resolución", text: "El juez declara concluido el concurso y exonera el pasivo insatisfecho restante. Cierras el procedimiento sin deuda." },
      ],
    },
    quiz: {
      title: "¿Encaja el concurso contigo? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Eres particular o autónomo insolvente?", goodAnswer: "yes" },
        { text: "¿No puedes atender tus deudas actuales?", goodAnswer: "yes" },
        { text: "¿Actúas de buena fe?", goodAnswer: "yes" },
        { text: "¿Tienes vivienda u otros bienes de valor totalmente pagados?", goodAnswer: "no" },
        { text: "¿Has provocado la insolvencia de forma fraudulenta?", goodAnswer: "no" },
      ],
      resultPass: { title: "El concurso podría ser tu vía", text: "Tu caso encaja. Pide tu diagnóstico gratis y te trazamos la estrategia." },
      resultDoubt: { title: "No te quedes con la duda", text: "Si tienes bienes de valor pagados, la liquidación podría afectarlos y quizá te compense reunificar para protegerlos. Lo valoramos gratis en 24h." },
    },
  },
  sections: [
    {
      title: "¿Qué es el concurso de persona física?",
      body: (
        <KeyCallout
          eyebrow="En una frase"
          headline={
            <>
              Un cauce judicial para que un insolvente{" "}
              <span className="text-accent-deep">reorganice o cancele</span> sus deudas.
            </>
          }
        >
          <p>Es el procedimiento para que un <strong>particular o autónomo insolvente</strong> resuelva sus deudas bajo control judicial. Tras la reforma concursal se ha agilizado y conecta directamente con la exoneración del pasivo.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Relación con la Ley de Segunda Oportunidad",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>El concurso de persona física es la vía judicial por la que se llega a la <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">exoneración del pasivo insatisfecho</A>, dentro del marco de la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>.</p>
        </div>
      ),
    },
    {
      title: "Coste y duración",
      body: (
        <FactGrid
          items={[
            { value: "Gratis", label: "Diagnóstico", detail: "Estudiamos tu insolvencia sin coste ni compromiso." },
            { value: "Según caso", label: "Duración", detail: "Depende de si hay convenio o liquidación." },
            { value: "Cerrado", label: "Presupuesto", detail: "Precio fijo con pago fraccionable." },
          ]}
        />
      ),
    },
  ],
  faq: [
    { q: "¿Quién puede pedir el concurso de persona física?", a: (<>Cualquier particular o autónomo en situación de insolvencia actual o inminente que actúe de buena fe.</>), plain: "Cualquier particular o autónomo en situación de insolvencia actual o inminente que actúe de buena fe." },
    { q: "¿Termina con la cancelación de la deuda?", a: (<>Puede terminar con la exoneración del pasivo insatisfecho, que cancela las deudas pendientes que no puedes pagar.</>), plain: "Puede terminar con la exoneración del pasivo insatisfecho, que cancela las deudas pendientes que no puedes pagar." },
    { q: "¿Se paran los embargos durante el concurso?", a: (<>Durante el procedimiento pueden suspenderse los embargos y ejecuciones en curso.</>), plain: "Durante el procedimiento pueden suspenderse los embargos y ejecuciones en curso." },
    { q: "¿El diagnóstico tiene coste?", a: (<>No. El diagnóstico es gratuito y sin compromiso.</>), plain: "No. El diagnóstico es gratuito y sin compromiso." },
  ],
};