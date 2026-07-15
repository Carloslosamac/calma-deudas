import type { MoneyContent } from "./types";
import { A, KeyCallout, CheckList, WarningCallout } from "@/components/seo/modules";

/**
 * Sub-pillar "Requisitos de la Ley de Segunda Oportunidad". Ángulo: quién
 * califica de verdad. Objetivo SEO: "requisitos ley segunda oportunidad".
 */
export const lsoRequisitos: MoneyContent = {
  path: "/ley-segunda-oportunidad/requisitos",
  directAnswer: {
    question: "¿Qué requisitos exige la Ley de Segunda Oportunidad?",
    answer:
      "Necesitas ser persona física insolvente (particular o autónomo), actuar de buena fe, no haber sido condenado por ciertos delitos económicos en los 10 años previos y no haberte exonerado ya en el plazo mínimo legal. La deuda pública se exonera con límites. En Calma valoramos gratis si calificas.",
    plain:
      "Necesitas ser persona física insolvente (particular o autónomo), actuar de buena fe, no haber sido condenado por ciertos delitos económicos en los 10 años previos y no haberte exonerado ya en el plazo mínimo legal. La deuda pública se exonera con límites. En Calma valoramos gratis si calificas.",
  },
  reviewed: false,
  tone: "legal",
  layout: ["benefits", "sections", "eligibility", "quiz", "faq", "closing"],
  intro: (
    <>
      Los <strong>requisitos de la Ley de Segunda Oportunidad</strong> no son un checklist rígido:
      son criterios que el juez valora en conjunto. Aquí te explicamos qué exige la ley de verdad
      y qué errores tumban un expediente. Diagnóstico gratis.
    </>
  ),
  hero: {
    badge: "Requisitos LSO 2026",
    titleLead: "Requisitos reales para acogerte a la",
    titleAccent: "Ley de Segunda Oportunidad.",
    subtitle: (
      <>
        Insolvencia, buena fe y ausencia de fraude. Suenan simples, pero cada uno
        tiene matices que <strong>deciden si tu caso avanza o se cae</strong>. Los desmontamos
        uno a uno.
      </>
    ),
    trustNote: "Análisis gratis · Sin compromiso",
  },
  benefitsTitle: "Los cinco requisitos clave",
  benefits: [
    { icon: "scale", title: "Ser persona física", text: "Vale para particulares y autónomos; no para sociedades." },
    { icon: "wallet", title: "Situación de insolvencia", text: "No puedes pagar tus deudas con tus ingresos y patrimonio actuales." },
    { icon: "shield", title: "Buena fe", text: "No has ocultado bienes, no has generado la insolvencia de forma fraudulenta." },
    { icon: "gavel", title: "Sin condenas económicas recientes", text: "Sin sentencias firmes por ciertos delitos económicos en los últimos 10 años." },
    { icon: "clock", title: "Sin exoneración reciente", text: "No haber obtenido ya la exoneración dentro del plazo legal mínimo." },
    { icon: "sparkles", title: "Colaboración activa", text: "Aportas la documentación completa y colaboras con el procedimiento." },
  ],
  sections: [
    {
      title: "Insolvencia: la clave que casi todos entienden mal",
      body: (
        <KeyCallout eyebrow="Requisito nº1" headline="Insolvencia = no poder pagar, no 'estar sin blanca'.">
          <p>Insolvencia significa que tus ingresos y bienes actuales <strong>no llegan</strong> para atender tus deudas vencidas. Puede ser <strong>actual</strong> (ya no pagas) o <strong>inminente</strong> (sabes que en pocos meses no podrás).</p>
          <p>No hace falta estar arruinado ni haber vendido todo: hace falta que la aritmética no cuadre con la deuda que tienes encima.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Buena fe: qué demuestra y qué la tumba",
      body: (
        <CheckList
          variant="check"
          items={[
            "No has ocultado bienes ni ingresos.",
            "No has agravado la insolvencia con nuevos préstamos sabiendo que no ibas a poder pagarlos.",
            "Has colaborado con acreedores, negociando antes de la vía legal cuando era razonable.",
            "Aportas la documentación completa al procedimiento.",
          ]}
        />
      ),
    },
    {
      title: "Deuda pública: los límites que sí existen",
      body: (
        <WarningCallout title="Hacienda y Seguridad Social">
          <p>La deuda con Hacienda y con la Seguridad Social <strong>se exonera con límites</strong> (topes por tramos). El resto se puede acomodar en un plan de pagos. No es "todo o nada": la ley reparte.</p>
          <p>En el <A to="/ley-segunda-oportunidad/coste-precio">análisis de coste</A> te explicamos cómo se calcula tu caso real.</p>
        </WarningCallout>
      ),
    },
    {
      title: "Errores frecuentes que tumban expedientes",
      body: (
        <CheckList
          variant="cross"
          items={[
            "Ocultar cuentas o transferencias a familiares en los meses previos.",
            "Pedir microcréditos nuevos justo antes de iniciar el procedimiento.",
            "No declarar bienes a nombre propio (aunque estén 'apalabrados' con terceros).",
            "No colaborar con el administrador concursal cuando se pide información.",
          ]}
        />
      ),
    },
  ],
  eligibility: {
    title: "¿Cumples los requisitos?",
    intro: <>Marca mentalmente cuántos de estos criterios encajan contigo:</>,
    requirements: [
      "Eres particular o autónomo (persona física).",
      "Tus ingresos no cubren tus deudas actuales.",
      "No has ocultado bienes ni actuado de forma fraudulenta.",
      "No tienes condenas firmes por delitos económicos recientes.",
      "No te has acogido a la LSO en los últimos años.",
    ],
    trustTitle: "Diagnóstico jurídico gratis",
    trustText: "Si dudas en algún punto, lo revisamos contigo en 24h sin compromiso.",
  },
  interactive: {
    quiz: {
      title: "Test de requisitos en 30 segundos",
      subtitle: "Sin dar tus datos.",
      questions: [
        { text: "¿Eres particular o autónomo?", goodAnswer: "yes" },
        { text: "¿No puedes pagar tus deudas actuales con tus ingresos?", goodAnswer: "yes" },
        { text: "¿Actúas de buena fe (sin ocultar bienes)?", goodAnswer: "yes" },
        { text: "¿Has sido condenado por delitos económicos en 10 años?", goodAnswer: "no" },
        { text: "¿Te has acogido ya a la LSO recientemente?", goodAnswer: "no" },
      ],
      resultPass: { title: "Cumples los requisitos", text: "Tu caso encaja. Pide tu diagnóstico gratis y trazamos la estrategia." },
      resultDoubt: { title: "Hay dudas que aclarar", text: "Algún criterio necesita revisión — lo vemos gratis en 24h y te decimos cómo enfocarlo." },
    },
  },
  closing: {
    title: "Comprueba si calificas hoy",
    text: "No adivines: cinco minutos con un abogado te dicen si la LSO es tu vía. Gratis y sin compromiso.",
  },
  faq: [
    { q: "¿Puedo acogerme si tengo deudas con Hacienda?", a: (<>Sí. La deuda pública se exonera con límites por tramos y el resto puede acomodarse en un plan de pagos.</>), plain: "Sí. La deuda pública se exonera con límites por tramos y el resto puede acomodarse en un plan de pagos." },
    { q: "¿Hay un mínimo de deuda para poder acogerte?", a: (<>No hay mínimo legal fijo. Lo que importa es la insolvencia, no el importe.</>), plain: "No hay mínimo legal fijo. Lo que importa es la insolvencia, no el importe." },
    { q: "¿Puedo acogerme si tengo trabajo?", a: (<>Sí. La insolvencia se mide por si los ingresos cubren la deuda, no por si trabajas.</>), plain: "Sí. La insolvencia se mide por si los ingresos cubren la deuda, no por si trabajas." },
    { q: "¿Y si soy avalista de otro deudor?", a: (<>También puedes acogerte. Lo revisamos en la <A to="/ley-segunda-oportunidad/perfiles/avalistas">página de LSO para avalistas</A>.</>), plain: "También puedes acogerte. Lo revisamos en la página de LSO para avalistas." },
    { q: "¿Cuánto tarda comprobar si califico?", a: (<>El diagnóstico gratuito se hace en 24 horas. Te llamamos y te lo confirmamos.</>), plain: "El diagnóstico gratuito se hace en 24 horas. Te llamamos y te lo confirmamos." },
  ],
};