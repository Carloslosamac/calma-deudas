import type { MoneyContent } from "./types";
import { A, KeyCallout, WarningCallout, FactGrid } from "@/components/seo/modules";

/**
 * Sub-pillar "¿Es fiable la LSO?". Ángulo: prueba social + marco legal
 * real, para contrarrestar la percepción de "timo".
 */
export const lsoEsFiable: MoneyContent = {
  path: "/ley-segunda-oportunidad/es-fiable",
  directAnswer: {
    question: "¿Es fiable la Ley de Segunda Oportunidad?",
    answer:
      "Sí. Es una ley estatal en vigor desde 2015 y reforzada por la reforma concursal de 2022. Miles de personas han cancelado sus deudas en juzgados españoles. Los riesgos que se le atribuyen suelen venir de firmas que venden 'gratis' y trabajan mal el expediente, no de la ley en sí. Con abogado especialista y buena documentación, funciona.",
    plain:
      "Sí. Es una ley estatal en vigor desde 2015 y reforzada por la reforma concursal de 2022. Miles de personas han cancelado sus deudas en juzgados españoles. Los riesgos que se le atribuyen suelen venir de firmas que venden 'gratis' y trabajan mal el expediente.",
  },
  reviewed: false,
  tone: "legal",
  layout: ["benefits", "sections", "mythVsReality", "faq", "closing"],
  intro: (
    <>
      Cuando lees que "la Ley de Segunda Oportunidad es un timo",{" "}
      <strong>casi siempre se está criticando a una firma concreta</strong>, no a la ley. La
      ley existe, funciona y ha resuelto miles de casos. Aquí separamos el trigo de la paja.
    </>
  ),
  hero: {
    badge: "Fiabilidad LSO 2026",
    titleLead: "¿Es fiable la",
    titleAccent: "Ley de Segunda Oportunidad?",
    subtitle: (
      <>
        Ley estatal, en vigor desde 2015, aplicada por juzgados y respaldada por{" "}
        <strong>miles de resoluciones favorables</strong>. Te contamos qué exigir para que
        funcione en tu caso.
      </>
    ),
    trustNote: "Diagnóstico gratis · Abogados colegiados",
  },
  benefitsTitle: "Por qué es fiable",
  benefits: [
    { icon: "gavel", title: "Ley estatal en vigor", text: "Aplicada por los tribunales españoles desde 2015." },
    { icon: "scale", title: "Reforma concursal 2022", text: "Refuerza y agiliza el procedimiento con más garantías." },
    { icon: "sparkles", title: "Jurisprudencia consolidada", text: "El Tribunal Supremo y las Audiencias han fijado criterios claros." },
    { icon: "users", title: "Miles de casos resueltos", text: "Familias y autónomos con exoneración total o parcial de sus deudas." },
    { icon: "shield", title: "Control judicial", text: "El juez supervisa cada paso; no es un acuerdo privado." },
    { icon: "lock", title: "Sin trampas", text: "No exige renunciar a derechos: es un procedimiento reglado y auditable." },
  ],
  interactive: {
    mythVsReality: {
      title: "Mitos que se cuentan (y realidad)",
      items: [
        { myth: "La LSO es un timo", reality: "Es una ley estatal aplicada por juzgados desde 2015. Lo que sí puede ser un timo es una firma concreta que venda 'gratis' y trabaje mal." },
        { myth: "Pierdes todo lo que tienes", reality: "Solo entran en liquidación los bienes no necesarios. Vivienda habitual hipotecada al día suele conservarse con plan de pagos." },
        { myth: "No cancela nada de Hacienda", reality: "Sí cancela deuda pública con límites por tramos. El resto se acomoda en un plan de pagos asumible." },
        { myth: "Te quedas fichado para siempre", reality: "Sales de los ficheros de morosidad vinculados a las deudas exoneradas. Reconstruyes historial en 1–3 años." },
        { myth: "Solo vale para gente sin nada", reality: "Vale para particulares y autónomos con distintos patrimonios. Se adapta según el caso." },
      ],
    },
  },
  sections: [
    {
      title: "Qué exigir a tu abogado para que funcione",
      body: (
        <KeyCallout eyebrow="Buenas prácticas" headline="La fiabilidad depende de cómo se trabaje tu expediente.">
          <ul className="space-y-2 list-disc pl-5">
            <li>Presupuesto cerrado por escrito antes de iniciar.</li>
            <li>Análisis previo real de si calificas, no promesa comercial.</li>
            <li>Documentación completa antes de presentar al juzgado.</li>
            <li>Abogado colegiado y especialista en concursal, no vendedor.</li>
            <li>Comunicación clara cada semana sobre el estado del expediente.</li>
          </ul>
        </KeyCallout>
      ),
    },
    {
      title: "Números del sistema",
      body: (
        <FactGrid
          columns={3}
          items={[
            { value: "2015", label: "Año de aprobación", detail: "Ley 25/2015 de mecanismo de segunda oportunidad." },
            { value: "2022", label: "Reforma concursal", detail: "Ley 16/2022, refuerzo del procedimiento." },
            { value: "Miles", label: "Resoluciones favorables", detail: "En juzgados de toda España." },
          ]}
        />
      ),
    },
    {
      title: "Cuándo la LSO no encaja (y hay que ser honesto)",
      body: (
        <WarningCallout title="No siempre es la mejor vía">
          <p>Si tu deuda es baja y negociable, o si tu único bien de valor es una vivienda pagada que quieres conservar, quizá <A to="/reunificar-deudas">reunificar</A> o negociar sea mejor. Un abogado honesto te lo dirá antes de cobrarte.</p>
        </WarningCallout>
      ),
    },
  ],
  closing: {
    title: "Compruébalo con abogados de verdad",
    text: "Sin promesas ni marketing. Analizamos tu caso gratis y te decimos si la LSO es tu vía real.",
  },
  faq: [
    { q: "¿La LSO está reconocida en toda España?", a: (<>Sí. Es ley estatal aplicada por todos los juzgados del territorio.</>), plain: "Sí. Es ley estatal aplicada por todos los juzgados del territorio." },
    { q: "¿Qué pasa si el abogado hace mal el expediente?", a: (<>El juzgado puede rechazarlo. Por eso exige a tu abogado colegiación, especialización y trayectoria concursal.</>), plain: "El juzgado puede rechazarlo. Por eso exige a tu abogado colegiación, especialización y trayectoria concursal." },
    { q: "¿Necesito un abogado sí o sí?", a: (<>Sí. Es obligatorio para el procedimiento, y muchas veces también procurador.</>), plain: "Sí. Es obligatorio para el procedimiento, y muchas veces también procurador." },
    { q: "¿Puedo comprobar sentencias reales?", a: (<>Sí. Las sentencias de LSO son públicas y consultables en el CENDOJ y en bases jurisprudenciales.</>), plain: "Sí. Las sentencias de LSO son públicas y consultables en el CENDOJ y en bases jurisprudenciales." },
  ],
};