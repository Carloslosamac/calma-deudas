import type { MoneyContent } from "./types";
import { A, KeyCallout, WarningCallout } from "@/components/seo/modules";

/**
 * Perfil "LSO para avalistas". Ángulo: liberación del aval + qué pasa con el
 * deudor principal.
 */
export const lsoAvalistas: MoneyContent = {
  path: "/ley-segunda-oportunidad/perfiles/avalistas",
  directAnswer: {
    question: "¿La Ley de Segunda Oportunidad libera al avalista?",
    answer:
      "Sí. El avalista es un deudor a efectos legales: si es insolvente y actúa de buena fe, la LSO cancela también la deuda que le reclaman por el aval. No hace falta que el deudor principal se acoja. Frena embargos y saca del ASNEF. Diagnóstico gratis en 24h.",
    plain:
      "Sí. El avalista es un deudor a efectos legales: si es insolvente y actúa de buena fe, la LSO cancela también la deuda que le reclaman por el aval. No hace falta que el deudor principal se acoja.",
  },
  reviewed: false,
  tone: "urgent",
  layout: ["benefits", "sections", "eligibility", "faq", "closing"],
  intro: (
    <>
      Firmaste un aval y ahora te lo reclaman a ti. La <strong>Ley de Segunda Oportunidad
      libera al avalista</strong> cuando es insolvente, igual que a cualquier deudor. Aquí
      te explicamos cómo, sin depender del deudor principal.
    </>
  ),
  hero: {
    badge: "LSO Avalistas 2026",
    titleLead: "Sal del aval que te ahoga con la",
    titleAccent: "Ley de Segunda Oportunidad.",
    subtitle: (
      <>
        Aunque tú no fueras quien pidió el préstamo, la ley te ampara: si eres{" "}
        <strong>insolvente</strong> por lo que te reclaman, puedes cancelar esa deuda.
      </>
    ),
    trustNote: "Análisis gratis · Frena embargos",
  },
  benefitsTitle: "Qué te aporta si eres avalista",
  benefits: [
    { icon: "shield", title: "Cancela la deuda del aval", text: "Igual que la deuda propia: se exonera si eres insolvente." },
    { icon: "gavel", title: "Independiente del deudor principal", text: "No hace falta que él se acoja para que tú te liberes." },
    { icon: "wallet", title: "Frena embargos de nómina", text: "Suspende embargos derivados del aval en curso." },
    { icon: "sparkles", title: "Sales de ASNEF", text: "Salen los ficheros de morosidad vinculados a la deuda exonerada." },
    { icon: "clock", title: "Actúa antes de la ejecución", text: "Cuanto antes, más margen para conservar bienes." },
    { icon: "scale", title: "Estudio jurídico riguroso", text: "Cada aval tiene matices que hay que valorar antes de decidir la vía." },
  ],
  sections: [
    {
      title: "Cómo funciona la liberación del aval",
      body: (
        <KeyCallout eyebrow="Base legal" headline="El avalista es deudor a efectos de la LSO.">
          <p>La ley no distingue entre "deuda propia" y "deuda avalada": si por causa del aval te reclaman una cantidad que no puedes pagar, <strong>eres insolvente</strong> a los efectos de la Ley de Segunda Oportunidad y puedes acogerte igual que cualquier otro deudor.</p>
        </KeyCallout>
      ),
    },
    {
      title: "¿Y el deudor principal?",
      body: (
        <WarningCallout title="Cada uno responde de su parte">
          <p>Tu exoneración <strong>no borra la deuda del deudor principal</strong>: el acreedor puede seguir reclamándosela a él. Pero tampoco al revés: tú puedes acogerte aunque él no lo haga.</p>
          <p>Si además él quiere, se pueden llevar dos procedimientos coordinados. Lo valoramos en el diagnóstico.</p>
        </WarningCallout>
      ),
    },
    {
      title: "Situaciones típicas del avalista",
      body: (
        <ul className="space-y-2 list-disc pl-5 text-base leading-relaxed text-foreground/85">
          <li><strong>Padres que avalaron</strong> hipoteca o alquiler de hijos y ahora asumen impagos.</li>
          <li><strong>Socios que avalaron</strong> préstamos de una SL que cerró.</li>
          <li><strong>Cónyuges o excónyuges</strong> que quedaron atados a préstamos comunes.</li>
          <li><strong>Familiares</strong> que firmaron por confianza y ya no pueden pagar.</li>
          <li>En todos ellos, la LSO puede cancelar la parte que te reclaman.</li>
        </ul>
      ),
    },
  ],
  eligibility: {
    title: "¿Te aplica como avalista?",
    intro: <>Estas señales dicen que sí:</>,
    requirements: [
      "Te reclaman una deuda que avalaste y no puedes pagarla con tus ingresos.",
      "El deudor principal no paga y el banco o financiera se dirige a ti.",
      "Actúas de buena fe: no ocultaste bienes ni firmaste sabiendo que era fraude.",
      "Estás en ASNEF o con embargos por la deuda avalada.",
    ],
    trustTitle: "Ejemplos reales revisados",
    trustText: "Muchos <A to='/casos-de-exito'>casos de éxito</A> de Calma son avalistas que salieron sin deuda.",
  },
  closing: {
    title: "El aval no es una condena de por vida",
    text: "Cuanto antes actúes, más rápido paran los embargos. Diagnóstico gratis en 24h para avalistas.",
  },
  faq: [
    { q: "¿Me libero aunque el deudor principal no se acoja?", a: (<>Sí. Tu procedimiento es independiente.</>), plain: "Sí. Tu procedimiento es independiente." },
    { q: "¿Qué pasa si el aval es solidario?", a: (<>Solidario o mancomunado, si te reclaman a ti y eres insolvente, la LSO te libera de esa deuda.</>), plain: "Solidario o mancomunado, si te reclaman a ti y eres insolvente, la LSO te libera de esa deuda." },
    { q: "¿Me quedo yo con la casa del deudor principal?", a: (<>No. Tu exoneración solo afecta a tu propia responsabilidad, no a la propiedad de otros.</>), plain: "No. Tu exoneración solo afecta a tu propia responsabilidad, no a la propiedad de otros." },
    { q: "¿Y si el deudor principal después paga?", a: (<>Tu exoneración se mantiene. Su pago cancela lo suyo con el banco; lo tuyo ya está resuelto.</>), plain: "Tu exoneración se mantiene. Su pago cancela lo suyo con el banco." },
  ],
};