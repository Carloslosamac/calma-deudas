import type { MoneyContent } from "./types";
import { A, KeyCallout, FactGrid } from "@/components/seo/modules";

/**
 * Sub-pillar "Cuánto dura la Ley de Segunda Oportunidad". Ángulo: expectativa
 * realista de plazos por fase y suspensión de embargos.
 */
export const lsoPlazos: MoneyContent = {
  path: "/ley-segunda-oportunidad/plazos-duracion",
  directAnswer: {
    question: "¿Cuánto dura la Ley de Segunda Oportunidad?",
    answer:
      "Como orientación, el trámite inicial de un expediente de Ley de Segunda Oportunidad (de la presentación a la resolución sobre la exoneración) suele llevar entre 6 y 18 meses, según el juzgado y la complejidad. En la modalidad con plan de pagos esa resolución es provisional: la exoneración definitiva depende de cumplir el plan, que normalmente dura 3 años o 5 en los supuestos del art. 497 TRLC. Por regla general, las ejecuciones en curso se suspenden con la declaración de concurso, con excepciones legales. La duración depende del juzgado, del número de acreedores y de si hay plan de pagos o liquidación. Te damos plazos realistas caso a caso.",
    plain:
      "Como orientación, el trámite inicial de un expediente de Ley de Segunda Oportunidad (de la presentación a la resolución sobre la exoneración) suele llevar entre 6 y 18 meses, según el juzgado y la complejidad. En la modalidad con plan de pagos esa resolución es provisional: la exoneración definitiva depende de cumplir el plan, que normalmente dura 3 años o 5 en los supuestos del art. 497 TRLC. Por regla general, las ejecuciones en curso se suspenden con la declaración de concurso, con excepciones legales. La duración depende del juzgado, del número de acreedores y de si hay plan de pagos o liquidación.",
  },
  reviewed: false,
  tone: "legal",
  layout: ["benefits", "legalTimeline", "sections", "faq", "closing"],
  intro: (
    <>
      El <strong>tiempo real de la Ley de Segunda Oportunidad</strong> tiene dos velocidades:
      la del alivio (los embargos se paran pronto) y la de la resolución final. Aquí te contamos
      los plazos de cada fase para que sepas qué esperar cada mes.
    </>
  ),
  hero: {
    badge: "Plazos LSO 2026",
    titleLead: "Cuánto dura la",
    titleAccent: "Ley de Segunda Oportunidad.",
    subtitle: (
      <>
        Orientativamente, <strong>6 a 18 meses</strong> de trámite inicial (con plan de pagos, la exoneración definitiva llega al cumplirlo), y los embargos pueden frenarse en semanas.
        Te desglosamos la duración de cada fase con datos reales.
      </>
    ),
    trustNote: "Plazos realistas · Diagnóstico gratis",
  },
  benefitsTitle: "Puntos clave del calendario",
  benefits: [
    { icon: "clock", title: "6–18 meses de trámite inicial", text: "Orientación según juzgado y complejidad; con plan de pagos, la exoneración definitiva llega al cumplirlo." },
    { icon: "shield", title: "Suspensión de ejecuciones", text: "Por regla general, con la declaración de concurso, salvo las excepciones legales." },
    { icon: "gavel", title: "Fase judicial larga", text: "El grueso del tiempo es la instrucción y el turno del administrador concursal." },
    { icon: "wallet", title: "Plan de pagos: 3 años", text: "Si hay plan, dura 3 años de cumplimiento antes de la exoneración definitiva." },
    { icon: "sparkles", title: "Exoneración provisional temprana", text: "En casos con liquidación directa, la exoneración puede llegar en meses." },
    { icon: "scale", title: "Reforma concursal: más ágil", text: "La reforma de 2022 acortó plazos y clarificó los pasos judiciales." },
  ],
  interactive: {
    legalTimeline: {
      title: "Fases del procedimiento y duración",
      subtitle: "Un cronograma orientativo.",
      phases: [
        { title: "1. Análisis y documentación", duration: "2–6 semanas", text: "Preparamos el expediente completo: deudas, ingresos, patrimonio, acreedores." },
        { title: "2. Solicitud al juzgado", duration: "Inicio", text: "Presentamos la solicitud. Con la declaración de concurso, por regla general se suspenden las ejecuciones en curso." },
        { title: "3. Fase de instrucción", duration: "3–9 meses", text: "El juez o administrador concursal analiza el caso y da audiencia a los acreedores." },
        { title: "4. Plan de pagos o liquidación", duration: "Variable", text: "Se decide la vía: plan de pagos (3 años) o liquidación de bienes no esenciales." },
        { title: "5. Exoneración del pasivo", duration: "Resolución", text: "El juez cancela la deuda insatisfecha. En plan de pagos, se vuelve definitiva a los 3 años." },
      ],
    },
  },
  sections: [
    {
      title: "El plazo real es un rango, no un número",
      body: (
        <KeyCallout eyebrow="Realidad judicial" headline="Trámite inicial de 6 a 18 meses, según juzgado y complejidad.">
          <p>Un caso limpio en un juzgado ágil puede resolverse en 6–8 meses. Uno con muchos acreedores, deuda pública elevada o litigios abiertos puede alargarse a 18. Con plan de pagos, la exoneración definitiva depende de cumplir el plan (normalmente 3 años, o 5 en los supuestos del art. 497 TRLC). Antes de presentar te damos un plazo estimado real para tu caso.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Los embargos se paran antes de la resolución",
      body: (
        <FactGrid
          items={[
            { value: "Semanas", label: "Suspensión de embargos", detail: "Con la admisión de la solicitud pueden pararse los embargos en curso." },
            { value: "Meses", label: "Fase judicial", detail: "El grueso del tiempo es la instrucción por el juzgado." },
            { value: "3 años", label: "Plan de pagos (si aplica)", detail: "Solo si se opta por conservar patrimonio con plan de pagos." },
          ]}
        />
      ),
    },
    {
      title: "Qué acelera y qué ralentiza el proceso",
      body: (
        <ul className="space-y-2 list-disc pl-5 text-base leading-relaxed text-foreground/85">
          <li><strong>Acelera:</strong> documentación completa desde el día 1, acreedores privados sencillos, patrimonio claro.</li>
          <li><strong>Ralentiza:</strong> deuda pública elevada (AEAT, TGSS), litigios abiertos, vivienda con hipoteca activa, tribunales saturados.</li>
          <li>El <A to="/ley-segunda-oportunidad/coste-precio">coste</A> no depende del tiempo: es cerrado desde el inicio.</li>
        </ul>
      ),
    },
  ],
  closing: {
    title: "Frenar el reloj empieza hoy",
    text: "Cuanto antes iniciemos, antes se paran los embargos. Pide tu diagnóstico gratis y ponemos fecha al primer paso.",
  },
  faq: [
    { q: "¿Cuándo se paran los embargos exactamente?", a: (<>Por regla general, con la declaración de concurso: desde entonces no pueden iniciarse nuevas ejecuciones y las que están en curso se suspenden, con excepciones legales (por ejemplo, ciertos apremios públicos o garantías reales). El momento depende del juzgado.</>), plain: "Por regla general, con la declaración de concurso: desde entonces no pueden iniciarse nuevas ejecuciones y las que están en curso se suspenden, con excepciones legales (por ejemplo, ciertos apremios públicos o garantías reales). El momento depende del juzgado." },
    { q: "¿Puedo elegir plan de pagos o liquidación?", a: (<>Depende de tu patrimonio y capacidad de pago. Con vivienda que quieras conservar, el plan de pagos suele ser la vía.</>), plain: "Depende de tu patrimonio y capacidad de pago. Con vivienda que quieras conservar, el plan de pagos suele ser la vía." },
    { q: "¿Qué pasa en el plan de pagos de 3 años?", a: (<>El plan dura normalmente 3 años, o 5 en los supuestos del art. 497 TRLC. Si lo cumples, se solicita la exoneración definitiva de las deudas exonerables pendientes.</>), plain: "El plan dura normalmente 3 años, o 5 en los supuestos del art. 497 TRLC. Si lo cumples, se solicita la exoneración definitiva de las deudas exonerables pendientes." },
    { q: "¿Puedo trabajar durante el procedimiento?", a: (<>Sí. La LSO no restringe tu actividad laboral ni profesional; sigues cobrando tu sueldo o facturando como autónomo.</>), plain: "Sí. La LSO no restringe tu actividad laboral ni profesional; sigues cobrando tu sueldo o facturando como autónomo." },
  ],
};