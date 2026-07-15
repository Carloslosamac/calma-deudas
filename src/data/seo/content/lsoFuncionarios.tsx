import type { MoneyContent } from "./types";
import { A, KeyCallout, CheckList } from "@/components/seo/modules";

/**
 * Perfil "LSO para funcionarios". Ángulo: no pierdes plaza y hay tramo
 * inembargable de la nómina.
 */
export const lsoFuncionarios: MoneyContent = {
  path: "/ley-segunda-oportunidad/perfiles/funcionarios",
  directAnswer: {
    question: "¿Un funcionario puede acogerse a la Ley de Segunda Oportunidad?",
    answer:
      "Sí. La LSO ampara a cualquier persona física, incluidos funcionarios de carrera, interinos y personal laboral de las Administraciones. No pierdes la plaza ni el puesto de trabajo por acogerte. La nómina tiene tramos inembargables y la ley cancela la deuda privada cumpliendo requisitos.",
    plain:
      "Sí. La LSO ampara a cualquier persona física, incluidos funcionarios de carrera, interinos y personal laboral. No pierdes la plaza por acogerte y la nómina tiene tramos inembargables.",
  },
  reviewed: false,
  tone: "calm",
  layout: ["benefits", "sections", "eligibility", "faq", "closing"],
  intro: (
    <>
      Si eres <strong>funcionario y arrastras deudas</strong>, la Ley de Segunda Oportunidad
      te ampara igual que a cualquier otro deudor. <strong>No pierdes la plaza</strong> y tu
      nómina tiene tramos inembargables. Aquí te contamos cómo encaja tu caso.
    </>
  ),
  hero: {
    badge: "LSO Funcionarios 2026",
    titleLead: "Cancela tus deudas sin perder",
    titleAccent: "la plaza ni el sueldo.",
    subtitle: (
      <>
        La LSO no afecta a tu vinculación con la Administración: cancela la deuda personal y{" "}
        <strong>tu plaza sigue siendo tuya</strong>. Además, hay parte de la nómina siempre
        protegida.
      </>
    ),
    trustNote: "Análisis gratis · Sin afectar a tu plaza",
  },
  benefitsTitle: "Qué te aporta si eres funcionario",
  benefits: [
    { icon: "shield", title: "No pierdes la plaza", text: "La LSO no es motivo de sanción ni de pérdida de puesto." },
    { icon: "wallet", title: "Nómina inembargable por tramos", text: "Hasta el SMI y con escalas para el resto: parte de tu nómina siempre está protegida." },
    { icon: "gavel", title: "Frena embargos activos", text: "Suspende embargos de nómina en curso desde la admisión de la solicitud." },
    { icon: "sparkles", title: "Cancela deuda privada completa", text: "Bancos, tarjetas, préstamos y microcréditos: exoneración total si cumples requisitos." },
    { icon: "landmark", title: "Confidencialidad procesal", text: "El procedimiento es público como cualquier judicial, pero no se notifica a tu unidad administrativa." },
    { icon: "clock", title: "Compatible con la actividad", text: "Sigues acudiendo al puesto y cobrando la nómina durante todo el procedimiento." },
  ],
  sections: [
    {
      title: "La nómina siempre tiene una parte protegida",
      body: (
        <KeyCallout eyebrow="Sueldo inembargable" headline="Hasta el SMI (~1.184 €/mes en 2026), la nómina es 100% inembargable.">
          <p>Por encima del SMI, se aplica una <strong>escala progresiva</strong>: cuanto más cobras, mayor porcentaje se puede embargar. Pero un tramo siempre queda protegido, y con la LSO los embargos se suspenden mientras dura el procedimiento.</p>
          <p>Calcula tu tramo con nuestro <A to="/herramientas/calculadora-sueldo-inembargable">calculador de sueldo inembargable</A>.</p>
        </KeyCallout>
      ),
    },
    {
      title: "¿La LSO puede costarme la plaza?",
      body: (
        <CheckList
          variant="check"
          items={[
            "La LSO no está tipificada como infracción disciplinaria.",
            "No aparece en tu expediente personal administrativo.",
            "No implica inhabilitación ni suspensión de funciones.",
            "No afecta a oposiciones futuras ni a concursos de traslado.",
          ]}
        />
      ),
    },
    {
      title: "Situaciones habituales del funcionario",
      body: (
        <ul className="space-y-2 list-disc pl-5 text-base leading-relaxed text-foreground/85">
          <li>Préstamos personales acumulados por gastos familiares.</li>
          <li>Tarjetas revolving con intereses fuera de mercado.</li>
          <li>Avales firmados a familiares que impagan.</li>
          <li>Divorcio con reparto de deudas desequilibrado.</li>
          <li>Microcréditos en cadena para cubrir imprevistos.</li>
        </ul>
      ),
    },
  ],
  eligibility: {
    title: "¿Encaja la LSO en tu situación?",
    intro: <>Si te reconoces en la mayoría, tu caso tiene recorrido:</>,
    requirements: [
      "Eres funcionario de carrera, interino o personal laboral.",
      "Tus ingresos actuales no cubren tus deudas actuales.",
      "Tienes embargos activos o cerca de recibirlos.",
      "Estás fichado en ASNEF por alguna deuda.",
      "No has ocultado bienes ni ingresos.",
    ],
  },
  closing: {
    title: "Protege tu sueldo y tu tranquilidad",
    text: "Cancela deudas sin arriesgar la plaza. Diagnóstico gratis en 24h con abogados especialistas.",
  },
  faq: [
    { q: "¿Debo notificar la LSO a mi organismo?", a: (<>No. El procedimiento es judicial y no se notifica a tu Administración empleadora.</>), plain: "No. El procedimiento es judicial y no se notifica a tu Administración empleadora." },
    { q: "¿Afecta a mi complemento de destino o productividad?", a: (<>No. Ninguna partida de tu nómina cambia por acogerte a la LSO.</>), plain: "No. Ninguna partida de tu nómina cambia por acogerte a la LSO." },
    { q: "¿Y si tengo embargo activo sobre la nómina?", a: (<>La LSO puede suspenderlo. Es una de las primeras medidas que se solicitan al juzgado.</>), plain: "La LSO puede suspenderlo. Es una de las primeras medidas que se solicitan al juzgado." },
    { q: "¿Es incompatible con la carrera profesional (concursos)?", a: (<>No. No aparece en tu expediente disciplinario ni penaliza en concursos ni oposiciones.</>), plain: "No. No aparece en tu expediente disciplinario ni penaliza en concursos ni oposiciones." },
  ],
};