import { Link } from "react-router-dom";
import type { MoneyContent } from "./types";
import p1 from "@/assets/testimonial-5.jpg";
import p2 from "@/assets/testimonial-6.jpg";
import p3 from "@/assets/person-woman-window.jpg";
import p4 from "@/assets/person-man-portrait.jpg";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Money page "Exoneración del pasivo insatisfecho (EPI)". Ángulo jurídico:
 * el mecanismo concreto que cancela la deuda dentro de la LSO. Módulo: línea
 * temporal legal. Sub-página del hub LSO. Pendiente de revisión legal.
 */
export const exoneracionPasivoInsatisfecho: MoneyContent = {
  path: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
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
      La <strong>exoneración del pasivo insatisfecho (EPI)</strong> es el mecanismo de la Ley de
      Segunda Oportunidad por el que el juez cancela las deudas que no puedes pagar. Te
      explicamos cómo funciona y si encajas, gratis.
    </>
  ),
  hero: {
    badge: "Exoneración del pasivo insatisfecho",
    titleLead: "Cancela legalmente",
    titleAccent: "tu pasivo insatisfecho.",
    subtitle: (
      <>
        La EPI es la resolución judicial que <strong>borra las deudas pendientes</strong> dentro
        de la Ley de Segunda Oportunidad. Estudiamos tu caso gratis y te decimos si puedes
        acogerte.
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
  benefitsTitle: "Qué supone la exoneración del pasivo",
  benefits: [
    { icon: "shield", title: "Cancelación de deudas", text: "El juez exonera las deudas pendientes que no puedes asumir." },
    { icon: "scale", title: "Resolución judicial", text: "Es una decisión del juzgado con respaldo legal pleno, no un acuerdo informal." },
    { icon: "wallet", title: "Recuperas tus ingresos", text: "Sin deudas exoneradas, tu nómina vuelve a ser para vivir." },
    { icon: "landmark", title: "Incluye deuda pública", text: "Con límites, también alcanza a Hacienda y Seguridad Social." },
    { icon: "gavel", title: "Embargos suspendidos", text: "Durante el procedimiento pueden suspenderse los embargos en curso." },
    { icon: "sparkles", title: "Empiezas de cero", text: "Cierras el capítulo de la deuda y recuperas la tranquilidad." },
  ],
  testimonialsTitle: "Personas con su pasivo exonerado",
  testimonialsSubtitle: "Casos reales de deudas canceladas por resolución judicial.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    { name: "Alberto N.", amount: "68.300 €", location: "Madrid", text: "El juez exoneró mi deuda. Empecé de cero después de años atrapado.", photo: p1 },
    { name: "Rosa M.", amount: "41.500 €", location: "Valencia", text: "Incluida deuda con Hacienda, dentro de los límites. Hoy respiro.", photo: p2 },
    { name: "Tomás V.", amount: "95.200 €", location: "Sevilla", text: "Como autónomo arrastraba mucha deuda. La EPI me dio una salida real.", photo: p3 },
    { name: "Inés C.", amount: "53.800 €", location: "Bilbao", text: "Pensaba que no había solución. La exoneración cambió mi vida.", photo: p4 },
  ],
  stepsTitle: "Cómo se consigue la EPI",
  stepsSubtitle: "El camino hasta la cancelación judicial",
  steps: [
    { title: "Diagnóstico gratuito", text: "Comprobamos que cumples los requisitos de buena fe e insolvencia." },
    { title: "Preparación del expediente", text: "Reunimos documentación y planteamos plan de pagos o liquidación." },
    { title: "Procedimiento judicial", text: "Solicitamos la exoneración ante el juzgado y te representamos." },
    { title: "Pasivo exonerado", text: "El juez dicta la cancelación de las deudas pendientes.", highlight: true },
  ],
  metrics: [
    { value: "Gratis", label: "Estudiamos tu caso sin compromiso" },
    { value: "24h", label: "Te llamamos en menos de un día" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Puedo acogerme a la EPI?",
    intro: (
      <>
        La exoneración exige actuar de buena fe y encontrarse en insolvencia. Esto es lo que
        valoramos gratis:
      </>
    ),
    requirements: [
      "No puedes pagar tus deudas con tus ingresos y patrimonio actuales.",
      "Actúas de buena fe: no has ocultado bienes ni provocado la insolvencia de forma fraudulenta.",
      "Eres particular o autónomo.",
      "Colaboras con el procedimiento y aportas la información requerida.",
    ],
    trustTitle: "Pendiente de revisión legal",
    trustText: "Contenido en revisión por abogado especialista en insolvencia.",
  },
  closing: {
    title: "La exoneración existe y es para personas como tú",
    text: "No sigas cargando una deuda que la ley permite cancelar. Pide tu diagnóstico gratis y descubre si puedes acogerte.",
  },
  interactive: {
    legalTimeline: {
      title: "Las fases hasta la exoneración",
      subtitle: "La EPI es la resolución final de un procedimiento reglado.",
      phases: [
        { title: "Análisis de viabilidad", duration: "Semana 1", text: "Verificamos buena fe e insolvencia y preparamos la estrategia." },
        { title: "Acuerdo extrajudicial de pagos", duration: "1-2 meses", text: "Intento de acuerdo con los acreedores a través de un mediador concursal." },
        { title: "Concurso consecutivo", duration: "Variable", text: "Si no hay acuerdo, se abre la vía judicial con plan de pagos o liquidación." },
        { title: "Resolución de exoneración (EPI)", duration: "Resolución", text: "El juez cancela las deudas pendientes. Empiezas de cero." },
      ],
    },
    quiz: {
      title: "¿Encajas en la exoneración? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿No puedes pagar tus deudas con tus ingresos?", goodAnswer: "yes" },
        { text: "¿Actúas de buena fe?", goodAnswer: "yes" },
        { text: "¿Eres particular o autónomo?", goodAnswer: "yes" },
        { text: "¿Has ocultado bienes a propósito?", goodAnswer: "no" },
      ],
      resultPass: { title: "Podrías acogerte a la EPI", text: "Tu perfil encaja con la exoneración. Pide tu diagnóstico gratis ahora." },
      resultDoubt: { title: "No te quedes con la duda", text: "Casos parecidos consiguen la exoneración. Lo valoramos gratis en 24h." },
    },
  },
  sections: [
    {
      title: "¿Qué es la exoneración del pasivo insatisfecho?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>La EPI es la resolución judicial que, dentro de la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>, <strong>cancela las deudas que no puedes pagar</strong>. Es el resultado final del procedimiento, una vez acreditada tu insolvencia y buena fe.</p>
        </div>
      ),
    },
    {
      title: "Qué deudas alcanza y cuáles tienen límites",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Alcanza préstamos, tarjetas, microcréditos y deudas con proveedores. La <strong>deuda pública</strong> (Hacienda y Seguridad Social) se exonera con límites legales. Mira el detalle en <A to="/deudas-hacienda-seguridad-social/deudas-hacienda">deudas con Hacienda</A>.</p>
        </div>
      ),
    },
    {
      title: "Requisitos de buena fe",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Se exige no haber ocultado bienes ni provocado la insolvencia de forma fraudulenta, y colaborar con el procedimiento. Lo confirmamos en el diagnóstico gratuito.</p>
        </div>
      ),
    },
  ],
  faq: [
    { q: "¿Qué es la exoneración del pasivo insatisfecho?", a: (<>Es la resolución judicial que cancela las deudas pendientes dentro de la Ley de Segunda Oportunidad, una vez acreditada la insolvencia y la buena fe.</>), plain: "Es la resolución judicial que cancela las deudas pendientes dentro de la Ley de Segunda Oportunidad, una vez acreditada la insolvencia y la buena fe." },
    { q: "¿Incluye la deuda con Hacienda?", a: (<>Sí, con límites legales. Parte de la deuda pública puede exonerarse; el resto se reorganiza en un plan de pagos.</>), plain: "Sí, con límites legales. Parte de la deuda pública puede exonerarse; el resto se reorganiza en un plan de pagos." },
    { q: "¿Puedo perder mi vivienda?", a: (<>Depende del caso. A veces se mantiene mediante un plan de pagos; en otros se liquida. Lo valoramos en tu diagnóstico.</>), plain: "Depende del caso. A veces se mantiene mediante un plan de pagos; en otros se liquida. Lo valoramos en tu diagnóstico." },
    { q: "¿El diagnóstico tiene coste?", a: (<>No. El diagnóstico es gratuito y sin compromiso.</>), plain: "No. El diagnóstico es gratuito y sin compromiso." },
  ],
};