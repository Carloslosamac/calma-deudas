import type { MoneyContent } from "./types";
import { A, KeyCallout, CheckList, FactGrid } from "@/components/seo/modules";

/**
 * Sub-pillar "Cómo funciona la LSO". Ángulo: explicativo transaccional, paso
 * a paso desde el diagnóstico a la exoneración.
 */
export const lsoComoFunciona: MoneyContent = {
  path: "/ley-segunda-oportunidad/como-funciona",
  directAnswer: {
    question: "¿Cómo funciona la Ley de Segunda Oportunidad?",
    answer:
      "Es un procedimiento judicial en tres fases: análisis y documentación, tramitación ante el juzgado (con posibilidad de plan de pagos o liquidación) y resolución con exoneración del pasivo insatisfecho. Requiere abogado, procurador en muchos trámites y demostrar insolvencia y buena fe. Los embargos pueden frenarse desde el inicio.",
    plain:
      "Es un procedimiento judicial en tres fases: análisis y documentación, tramitación ante el juzgado (con posibilidad de plan de pagos o liquidación) y resolución con exoneración del pasivo insatisfecho. Requiere abogado y demostrar insolvencia y buena fe.",
  },
  reviewed: false,
  tone: "legal",
  layout: ["benefits", "steps", "legalTimeline", "sections", "faq", "closing"],
  intro: (
    <>
      Aquí tienes <strong>cómo funciona la Ley de Segunda Oportunidad</strong> paso a paso,
      desde el primer análisis hasta la resolución que cancela las deudas. Sin tecnicismos,
      con el detalle que necesitas para saber qué esperar.
    </>
  ),
  hero: {
    badge: "Guía completa 2026",
    titleLead: "Cómo funciona la",
    titleAccent: "Ley de Segunda Oportunidad.",
    subtitle: (
      <>
        Un procedimiento judicial claro, en <strong>fases medibles</strong>, con el objetivo
        de cancelar las deudas que ya no puedes pagar. Sin marketing, con criterio jurídico.
      </>
    ),
    trustNote: "Análisis gratis · Abogados colegiados",
  },
  benefitsTitle: "Los pilares del procedimiento",
  benefits: [
    { icon: "scale", title: "Procedimiento judicial", text: "Se desarrolla ante el juzgado, con garantías legales plenas." },
    { icon: "gavel", title: "Amparo del juez", text: "El juez controla cada paso y dicta la resolución final." },
    { icon: "shield", title: "Suspensión de embargos", text: "Los embargos en curso pueden frenarse desde la admisión de la solicitud." },
    { icon: "wallet", title: "Plan de pagos o liquidación", text: "Dos modalidades: conservar patrimonio con plan o liquidar bienes no necesarios." },
    { icon: "landmark", title: "Exoneración del pasivo", text: "Cancela la deuda pendiente que no puedas pagar tras el procedimiento." },
    { icon: "sparkles", title: "Nueva partida", text: "Sales sin las deudas exoneradas y con historial reconstruible." },
  ],
  stepsTitle: "Cómo lo hacemos en Calma",
  stepsSubtitle: "El proceso paso a paso desde tu llamada.",
  steps: [
    { title: "1. Diagnóstico gratis", text: "En 24h te decimos si calificas y qué vía encaja mejor." },
    { title: "2. Presupuesto cerrado", text: "Firmamos el presupuesto por escrito antes de empezar." },
    { title: "3. Preparación del expediente", text: "Recopilamos deudas, ingresos, patrimonio y acreedores con detalle." },
    { title: "4. Solicitud al juzgado", text: "Presentamos la solicitud y pedimos la suspensión de embargos." },
    { title: "5. Tramitación", text: "Instrucción judicial, administrador concursal y plan de pagos o liquidación." },
    { title: "6. Exoneración", text: "El juez cancela la deuda insatisfecha. Reconstruyes tu vida financiera.", highlight: true },
  ],
  interactive: {
    legalTimeline: {
      title: "Fases legales del procedimiento",
      subtitle: "Cronograma orientativo.",
      phases: [
        { title: "Análisis previo", duration: "2–6 semanas", text: "Diagnóstico jurídico y preparación de la documentación completa." },
        { title: "Solicitud y admisión", duration: "Inicio", text: "Presentación en el juzgado. Con la admisión pueden suspenderse los embargos." },
        { title: "Instrucción y administrador concursal", duration: "3–9 meses", text: "El juez y el administrador analizan el patrimonio y el pasivo." },
        { title: "Plan de pagos o liquidación", duration: "Variable", text: "Decisión sobre la vía según patrimonio y capacidad de pago." },
        { title: "Exoneración del pasivo", duration: "Resolución", text: "El juez cancela la deuda pendiente. Provisional si hay plan; definitiva al cumplirlo." },
      ],
    },
  },
  sections: [
    {
      title: "Qué deudas se cancelan y cuáles no",
      body: (
        <FactGrid
          items={[
            { value: "Sí", label: "Deudas privadas", detail: "Bancos, financieras, tarjetas, microcréditos, proveedores, particulares." },
            { value: "Con límites", label: "Deuda pública", detail: "Hacienda y Seguridad Social se exoneran por tramos regulados." },
            { value: "No", label: "Ciertas deudas especiales", detail: "Pensiones alimenticias, sanciones penales y responsabilidad civil por delito." },
          ]}
        />
      ),
    },
    {
      title: "Qué necesitas para iniciar",
      body: (
        <CheckList
          variant="check"
          items={[
            "Listado de todas las deudas con su acreedor, importe y estado.",
            "Últimas nóminas o declaraciones de renta (3 años).",
            "Titularidades de cuentas, vehículos y viviendas.",
            "Extractos bancarios de los últimos meses.",
            "Reclamaciones o embargos que ya te hayan notificado.",
          ]}
        />
      ),
    },
    {
      title: "Enlaces internos útiles",
      body: (
        <ul className="space-y-2 list-disc pl-5 text-base leading-relaxed text-foreground/85">
          <li><A to="/ley-segunda-oportunidad/requisitos">Requisitos completos</A> con criterios reales del juzgado.</li>
          <li><A to="/ley-segunda-oportunidad/coste-precio">Coste real</A> por tramo de complejidad.</li>
          <li><A to="/ley-segunda-oportunidad/plazos-duracion">Plazos por fase</A> con expectativa realista.</li>
          <li><A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">Exoneración del pasivo</A> explicada con rigor jurídico.</li>
        </ul>
      ),
    },
  ],
  closing: {
    title: "Empieza por el diagnóstico gratis",
    text: "Antes de decidir nada, sabe si calificas. Análisis jurídico gratis en 24h y sin compromiso.",
  },
  faq: [
    { q: "¿Cuánto tarda todo el proceso?", a: (<>Entre 6 y 18 meses. Los embargos pueden pararse mucho antes. Detalle en la <A to="/ley-segunda-oportunidad/plazos-duracion">página de plazos</A>.</>), plain: "Entre 6 y 18 meses. Los embargos pueden pararse mucho antes." },
    { q: "¿Necesito abogado y procurador?", a: (<>Abogado siempre. Procurador es obligatorio en muchos trámites. Nosotros nos ocupamos de ambos.</>), plain: "Abogado siempre. Procurador es obligatorio en muchos trámites." },
    { q: "¿Puedo hacerlo yo mismo?", a: (<>Legalmente necesitas abogado. Además, un expediente mal preparado puede rechazarse y perder tiempo valioso.</>), plain: "Legalmente necesitas abogado. Un expediente mal preparado puede rechazarse." },
    { q: "¿Se paran los embargos desde el primer día?", a: (<>La suspensión llega con la admisión de la solicitud, normalmente en las primeras semanas.</>), plain: "La suspensión llega con la admisión de la solicitud, normalmente en las primeras semanas." },
  ],
};