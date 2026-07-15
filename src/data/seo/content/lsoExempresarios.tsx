import type { MoneyContent } from "./types";
import { A, KeyCallout, WarningCallout, CheckList } from "@/components/seo/modules";

/**
 * Perfil "LSO tras cerrar tu SL/SLU". Ángulo: deudas personales que
 * arrastran los administradores/socios tras cerrar la mercantil.
 */
export const lsoExempresarios: MoneyContent = {
  path: "/ley-segunda-oportunidad/perfiles/exempresarios",
  directAnswer: {
    question: "¿Puedo acogerme a la LSO tras cerrar mi SL?",
    answer:
      "Sí. Aunque la deuda original fuera de la sociedad, muchos administradores y socios acaban arrastrando responsabilidad personal por avales, deudas fiscales o levantamiento del velo. La LSO puede cancelar esa deuda personal si eres insolvente y actúas de buena fe. Diagnóstico gratis para valorar tu caso.",
    plain:
      "Sí. Aunque la deuda original fuera de la sociedad, muchos administradores y socios acaban arrastrando responsabilidad personal por avales, deudas fiscales o levantamiento del velo. La LSO puede cancelar esa deuda personal.",
  },
  reviewed: false,
  tone: "legal",
  layout: ["benefits", "sections", "eligibility", "faq", "closing"],
  intro: (
    <>
      Cerraste tu SL o SLU, pero <strong>las deudas siguen persiguiéndote a título personal</strong>.
      Avales bancarios, deudas fiscales, responsabilidad de administrador. La Ley de Segunda
      Oportunidad cancela esa deuda personal cuando eres insolvente.
    </>
  ),
  hero: {
    badge: "LSO Exempresarios 2026",
    titleLead: "Cerraste tu empresa, cierra también sus",
    titleAccent: "deudas personales.",
    subtitle: (
      <>
        Cuando la mercantil desaparece, <strong>los avales personales y la responsabilidad
        del administrador no</strong>. La LSO cancela esa deuda residual si cumples los
        requisitos.
      </>
    ),
    trustNote: "Análisis gratis · Abogados concursalistas",
  },
  benefitsTitle: "Qué te aporta si has cerrado tu empresa",
  benefits: [
    { icon: "shield", title: "Cancela avales personales", text: "Bancos, líneas de circulante, leasings avalados personalmente." },
    { icon: "landmark", title: "Reduce deuda fiscal residual", text: "AEAT y TGSS por responsabilidad subsidiaria: exoneración con límites por tramos." },
    { icon: "gavel", title: "Detiene reclamaciones activas", text: "Suspende juicios monitorios y embargos derivados del cierre." },
    { icon: "wallet", title: "Sigues pudiendo emprender", text: "La LSO no te inhabilita para volver a ser autónomo o administrador." },
    { icon: "sparkles", title: "Sales de ASNEF", text: "Salen los ficheros vinculados a las deudas exoneradas." },
    { icon: "scale", title: "LSO o concurso: elegimos", text: "A veces conviene el concurso de persona física con exoneración final." },
  ],
  sections: [
    {
      title: "Qué deuda arrastra un exempresario",
      body: (
        <KeyCallout eyebrow="La deuda 'residual'" headline="Cerrar la SL no cierra tus responsabilidades personales.">
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Avales personales</strong> firmados con bancos y financieras.</li>
            <li><strong>Responsabilidad subsidiaria</strong> por deudas de AEAT y TGSS.</li>
            <li><strong>Levantamiento del velo</strong> si se prueba confusión de patrimonios.</li>
            <li><strong>Sanciones administrativas</strong> derivadas de la actividad de la SL.</li>
            <li><strong>Deudas con proveedores</strong> avaladas personalmente en operaciones concretas.</li>
          </ul>
        </KeyCallout>
      ),
    },
    {
      title: "LSO vs. concurso de persona física",
      body: (
        <WarningCallout title="La vía correcta depende del patrimonio">
          <p>Cuando hay muchos acreedores o patrimonio propio complejo, a veces conviene ir por <A to="/autonomos-concurso-acreedores/concurso-persona-fisica">concurso de persona física</A> y llegar a la exoneración por esa vía. Lo valoramos gratis antes de decidir.</p>
        </WarningCallout>
      ),
    },
    {
      title: "Sigues pudiendo emprender después",
      body: (
        <CheckList
          variant="check"
          items={[
            "La LSO no te inhabilita para ser autónomo, administrador o socio de nuevas sociedades.",
            "El registro público de la exoneración es limitado y no perpetuo.",
            "Reconstruyes historial crediticio a los 1–3 años.",
            "Los bancos pueden volver a operar contigo tras la limpieza de ficheros.",
          ]}
        />
      ),
    },
  ],
  eligibility: {
    title: "¿Encaja tu caso en la LSO?",
    intro: <>Estas señales indican que sí:</>,
    requirements: [
      "Has cerrado, disuelto o liquidado una SL/SLU en los últimos años.",
      "Arrastras avales personales y/o deudas fiscales de tu antigua actividad.",
      "Tus ingresos actuales no cubren esa deuda residual.",
      "No has actuado de forma fraudulenta ni ocultado patrimonio.",
      "Estás dispuesto a colaborar con el procedimiento.",
    ],
  },
  closing: {
    title: "Cierra el capítulo empresarial de verdad",
    text: "La empresa ya no existe. Que tampoco existan las deudas que arrastras. Diagnóstico gratis en 24h.",
  },
  faq: [
    { q: "¿La LSO borra deudas de mi SL cerrada?", a: (<>La deuda de la sociedad, si está bien liquidada, desaparece con la sociedad. La LSO borra la deuda personal residual (avales, responsabilidad subsidiaria).</>), plain: "La deuda de la sociedad, si está bien liquidada, desaparece con la sociedad. La LSO borra la deuda personal residual." },
    { q: "¿Puedo volver a montar otra SL?", a: (<>Sí. La LSO no te inhabilita para constituir una nueva sociedad ni para ser administrador.</>), plain: "Sí. La LSO no te inhabilita para constituir una nueva sociedad ni para ser administrador." },
    { q: "¿Y si mi SL nunca llegó a disolverse formalmente?", a: (<>Antes conviene ordenar la disolución de la sociedad. Te asesoramos también en ese paso.</>), plain: "Antes conviene ordenar la disolución de la sociedad." },
    { q: "¿Puedo mezclar la deuda de mi SL y la personal?", a: (<>No. Cada procedimiento va por su lado. La LSO aborda solo la deuda personal.</>), plain: "No. Cada procedimiento va por su lado. La LSO aborda solo la deuda personal." },
  ],
};