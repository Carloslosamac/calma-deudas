import type { MoneyContent } from "./types";
import { A, KeyCallout, OptionCards, WarningCallout } from "@/components/seo/modules";
import p1 from "@/assets/person-closeup-man-2.jpg";
import p2 from "@/assets/person-closeup-woman-2.jpg";
import p3 from "@/assets/person-closeup-man-3.jpg";
import p4 from "@/assets/person-closeup-woman-3.jpg";

/**
 * Money page "Juicio monitorio por deuda". Ángulo urgente: te ha llegado una
 * reclamación judicial y hay plazo para responder. Módulo: timeline de urgencia.
 * Pendiente de revisión legal.
 */
export const juicioMonitorioDeuda: MoneyContent = {
  path: "/juicio-monitorio-recobro/juicio-monitorio-deuda",
  reviewed: false,
  tone: "urgent",
  layout: [
    "urgencyTimeline",
    "benefits",
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
      ¿Te ha llegado un <strong>juicio monitorio</strong> por una deuda? Tienes un plazo corto
      para responder y lo que hagas ahora marca la diferencia. Te decimos hoy, gratis, qué hacer.
    </>
  ),
  hero: {
    badge: "Juicio monitorio por deuda",
    titleLead: "Te ha llegado un monitorio:",
    titleAccent: "actúa dentro de plazo.",
    subtitle: (
      <>
        Un juicio monitorio reclama una deuda con un <strong>plazo de 20 días</strong> para
        responder. Oponerse, pagar o no hacer nada tiene consecuencias muy distintas. Te
        orientamos gratis y con urgencia.
      </>
    ),
    trustNote: "Atención urgente · Gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Atención urgente · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Cómo te ayudamos ante un monitorio",
  benefits: [
    { icon: "scale", title: "Revisamos la deuda", text: "Comprobamos si la deuda reclamada es correcta, está prescrita o tiene cláusulas abusivas." },
    { icon: "gavel", title: "Preparamos la oposición", text: "Si procede, redactamos y presentamos la oposición dentro de plazo." },
    { icon: "shield", title: "Atacamos el origen", text: "Si la deuda viene de usura o no puedes pagarla, buscamos cancelarla." },
    { icon: "clock", title: "Actuamos con urgencia", text: "El plazo es corto. Te llamamos en menos de 24h para no perderlo." },
    { icon: "phone-off", title: "Frenamos el recobro", text: "Paramos la presión de la empresa que reclama mientras gestionamos tu caso." },
    { icon: "sparkles", title: "Evitas males mayores", text: "Una buena respuesta evita que el monitorio derive en embargo." },
  ],
  testimonialsTitle: "Personas que respondieron a tiempo",
  testimonialsSubtitle: "Casos reales de monitorios resueltos con la estrategia adecuada.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    { name: "Hugo R.", amount: "Deuda anulada", location: "Madrid", text: "Reclamaban una revolving abusiva. Nos opusimos y se anuló.", photo: p1 },
    { name: "Clara P.", amount: "Monitorio frenado", location: "Valencia", text: "La deuda estaba prescrita. Lo demostramos a tiempo.", photo: p2 },
    { name: "Diego L.", amount: "Sin embargo", location: "Sevilla", text: "Respondimos dentro de plazo y evité que acabara en embargo.", photo: p3 },
    { name: "Sara M.", amount: "Deuda cancelada", location: "Bilbao", text: "No podía pagar. Fuimos a la Segunda Oportunidad y se canceló.", photo: p4 },
  ],
  stepsTitle: "Qué hacer ante un juicio monitorio",
  stepsSubtitle: "Cuatro pasos, empezando hoy",
  steps: [
    { title: "Llamada urgente gratis", text: "Revisamos la notificación y los días que te quedan de plazo." },
    { title: "Análisis de la deuda", text: "Comprobamos si es correcta, prescrita o abusiva." },
    { title: "Respuesta en plazo", text: "Presentamos oposición o planteamos la mejor salida según tu caso." },
    { title: "Caso resuelto", text: "Evitas el embargo y, si procede, cancelas la deuda.", highlight: true },
  ],
  metrics: [
    { value: "20 días", label: "El plazo para responder a un monitorio" },
    { value: "Gratis", label: "Revisamos tu notificación sin compromiso" },
    { value: "24h", label: "Atención urgente en menos de un día" },
  ],
  eligibility: {
    title: "¿Puedo oponerme al monitorio?",
    intro: (
      <>
        En muchos casos sí: si la deuda no es correcta, está prescrita o tiene cláusulas
        abusivas. Esto es lo que revisamos gratis y con urgencia:
      </>
    ),
    requirements: [
      "Has recibido una notificación de juicio monitorio.",
      "Aún estás dentro del plazo de 20 días para responder.",
      "Dudas de que la deuda sea correcta o asumible.",
      "Quieres evitar que derive en un embargo.",
    ],
    trustTitle: "Pendiente de revisión legal",
    trustText: "Contenido en revisión por abogado especialista en recobro.",
  },
  closing: {
    title: "El plazo del monitorio corre desde la notificación",
    text: "No dejes pasar los días. Pide tu revisión urgente gratis y respondamos dentro de plazo.",
  },
  interactive: {
    urgencyTimeline: {
      title: "Qué pasa según lo que hagas con el monitorio",
      subtitle: "Tu respuesta dentro del plazo lo cambia todo.",
      items: [
        { time: "Día 0", title: "Recibes la notificación", text: "Empieza a contar el plazo de 20 días hábiles para responder." },
        { time: "Si no respondes", title: "Se despacha ejecución", text: "El juzgado puede dar la deuda por reconocida y abrir la vía de embargo.", danger: true },
        { time: "Si pagas sin revisar", title: "Pagas de más", text: "Podrías abonar una deuda incorrecta, prescrita o con intereses abusivos.", danger: true },
        { time: "Con Calma", title: "Respuesta a medida", text: "Revisamos la deuda y presentamos oposición o la mejor salida en plazo." },
      ],
    },
    quiz: {
      title: "¿Puedes oponerte? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Has recibido un juicio monitorio?", goodAnswer: "yes" },
        { text: "¿Estás dentro del plazo de 20 días?", goodAnswer: "yes" },
        { text: "¿Dudas de que la deuda sea correcta?", goodAnswer: "yes" },
        { text: "¿Ya ha pasado más de un mes desde la notificación?", goodAnswer: "no" },
      ],
      resultPass: { title: "Podemos ayudarte a responder", text: "Estás a tiempo. Pide tu revisión urgente gratis y respondamos en plazo." },
      resultDoubt: { title: "No pierdas el plazo", text: "Cada día cuenta en un monitorio. Lo revisamos gratis y con urgencia en 24h." },
    },
  },
  sections: [
    {
      title: "¿Qué es un juicio monitorio?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Es un procedimiento rápido para reclamar deudas dinerarias. El juzgado te requiere el pago y dispones de <strong>20 días hábiles</strong> para pagar, oponerte o no hacer nada. La opción que elijas tiene consecuencias muy distintas.</p>
        </div>
      ),
    },
    {
      title: "Qué puedes alegar al oponerte",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <ul className="list-disc space-y-2 pl-5">
            <li>Que la deuda <strong>no existe o ya está pagada</strong>.</li>
            <li>Que está <strong>prescrita</strong> por el paso del tiempo.</li>
            <li>Que incluye <strong>intereses o cláusulas abusivas</strong> (revolving, microcréditos).</li>
          </ul>
          <p>
            Oponerse al monitorio tiene sentido cuando la deuda es discutible y eres solvente.
            Si la deuda es real pero <strong>no puedes pagarla y no tienes bienes de valor</strong>,
            la vía de fondo es la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>;
            si no puedes pagar pero tienes patrimonio pagado, valora{" "}
            <A to="/reunificar-deudas">reunificar</A> para protegerlo.
          </p>
        </div>
      ),
    },
    {
      title: "Si no respondes: el embargo",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>No responder es la peor opción: el juzgado puede dar por reconocida la deuda y avanzar hacia el <A to="/embargos/parar-embargo">embargo</A> de nómina o cuenta. Por eso conviene actuar dentro de plazo.</p>
        </div>
      ),
    },
  ],
  faq: [
    { q: "¿Cuánto plazo tengo para responder?", a: (<>Dispones de 20 días hábiles desde la notificación para pagar, oponerte o, si no lo haces, exponerte a la ejecución.</>), plain: "Dispones de 20 días hábiles desde la notificación para pagar, oponerte o, si no lo haces, exponerte a la ejecución." },
    { q: "¿Qué pasa si no hago nada?", a: (<>El juzgado puede dar la deuda por reconocida y despachar ejecución, abriendo la vía del embargo.</>), plain: "El juzgado puede dar la deuda por reconocida y despachar ejecución, abriendo la vía del embargo." },
    { q: "¿Puedo oponerme si la deuda es de una revolving?", a: (<>Sí. Si los intereses son abusivos o la deuda es incorrecta o está prescrita, puede oponerse.</>), plain: "Sí. Si los intereses son abusivos o la deuda es incorrecta o está prescrita, puede oponerse." },
    { q: "¿La revisión tiene coste?", a: (<>No. Revisamos tu notificación gratis y con urgencia.</>), plain: "No. Revisamos tu notificación gratis y con urgencia." },
  ],
};