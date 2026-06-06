import { Link } from "react-router-dom";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyContent } from "./types";

const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/**
 * Money page comercial de la Ley de Segunda Oportunidad.
 * Intención TRANSACCIONAL: captar el lead. La profundidad informativa
 * vive en el post pilar /blog/guia-ley-segunda-oportunidad (enlazado),
 * para no canibalizar.
 */
export const leySegundaOportunidad: MoneyContent = {
  path: "/ley-segunda-oportunidad",
  reviewed: true,
  intro: (
    <>
      La Ley de Segunda Oportunidad te permite <strong>cancelar legalmente las deudas
      que no puedes pagar</strong> y empezar de cero. En Calma estudiamos tu caso
      gratis y sin compromiso, y te decimos con claridad si puedes acogerte.
    </>
  ),
  sections: [
    {
      title: "Cancela tus deudas y empieza de cero",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Si arrastras deudas con bancos, financieras, microcréditos o tarjetas que
            ya no puedes asumir, la Ley de Segunda Oportunidad es la vía legal para
            <strong> liberarte de ellas</strong> y recuperar tu tranquilidad.
          </p>
          <p>
            No es un trámite genérico: cada caso es distinto. Por eso lo primero es un
            <strong> diagnóstico gratuito</strong> en el que analizamos tu situación y
            te explicamos, sin tecnicismos, qué deudas se pueden cancelar y qué pasos
            seguir.
          </p>
          <div className="rounded-3xl border border-accent/30 bg-accent-soft/40 p-6">
            <p className="font-poppins text-lg font-semibold text-foreground">
              ¿Quieres saber si puedes cancelar tus deudas?
            </p>
            <p className="mt-1 mb-4 text-sm text-muted-foreground">
              Analizamos tu caso gratis y sin compromiso en menos de 24 horas.
            </p>
            <CtaButton />
          </div>
        </div>
      ),
    },
    {
      title: "¿Puedes acogerte? Requisitos",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>Por lo general, podrás acogerte si cumples estas condiciones:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Eres un <strong>particular o autónomo</strong> en situación de insolvencia (no puedes pagar tus deudas).</li>
            <li>Actúas de <strong>buena fe</strong>: no has ocultado bienes ni provocado tu insolvencia de forma fraudulenta.</li>
            <li>No has sido condenado por determinados delitos socioeconómicos en los últimos diez años.</li>
            <li>Tus deudas no provienen, en su mayoría, de sanciones o conductas dolosas.</li>
          </ul>
          <p>
            ¿Dudas si tu caso encaja? Lo vemos contigo sin coste. Si prefieres entender
            la ley en profundidad antes, lee nuestra{" "}
            <A to="/blog/guia-ley-segunda-oportunidad">guía completa de la Ley de Segunda Oportunidad</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Cómo funciona, paso a paso",
      body: (
        <ol className="space-y-4 text-base leading-relaxed text-foreground/85">
          <li><strong>1. Diagnóstico gratuito.</strong> Analizamos tus deudas, ingresos y situación para confirmar si puedes acogerte.</li>
          <li><strong>2. Preparación del expediente.</strong> Reunimos la documentación y diseñamos la mejor estrategia para tu caso.</li>
          <li><strong>3. Presentación judicial.</strong> Presentamos tu solicitud y, cuando procede, se suspenden los embargos.</li>
          <li><strong>4. Exoneración.</strong> El juez acuerda la cancelación de las deudas que la ley permite y empiezas de cero.</li>
        </ol>
      ),
    },
    {
      title: "Qué consigues con Calma",
      body: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Cancelación legal de las deudas que no puedes pagar",
            "Fin de las llamadas y la presión de los acreedores",
            "Posibilidad de suspender embargos en curso",
            "Un equipo que te acompaña en cada paso, sin letra pequeña",
          ].map((t) => (
            <li key={t} className="rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground">
              {t}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Coste y plazos",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            El <strong>diagnóstico inicial es gratuito</strong>. Si decides seguir adelante,
            te ofrecemos un presupuesto claro y cerrado desde el principio, con la
            posibilidad de pago fraccionado para que el coste no sea un obstáculo.
          </p>
          <p>
            El procedimiento suele resolverse en un plazo aproximado de{" "}
            <strong>6 a 18 meses</strong> según la complejidad del caso y el juzgado,
            aunque los embargos pueden suspenderse mucho antes.
          </p>
          <p>
            ¿Tu deuda viene sobre todo de productos abusivos? Mira también cómo{" "}
            <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>{" "}
            o <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Otras vías que valoramos contigo",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            La Ley de Segunda Oportunidad no siempre es la única opción. Según tu caso,
            también estudiamos:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li><A to="/reunificar-deudas">Reunificar tus deudas</A> en una sola cuota si aún puedes pagar.</li>
            <li><A to="/cancelar-deudas">Cancelar deudas</A> concretas con bancos y financieras.</li>
            <li>La <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">exoneración del pasivo insatisfecho</A>, el corazón legal de la ley.</li>
          </ul>
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "¿Qué deudas se pueden cancelar con la Ley de Segunda Oportunidad?",
      a: (
        <>La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites de exoneración.</>
      ),
      plain:
        "La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites de exoneración.",
    },
    {
      q: "¿Cuánto cuesta acogerse?",
      a: (
        <>El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado desde el inicio y opción de pago fraccionado.</>
      ),
      plain:
        "El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado desde el inicio y opción de pago fraccionado.",
    },
    {
      q: "¿Pierdo mi vivienda si me acojo?",
      a: (
        <>No necesariamente. Depende del valor de la vivienda, la deuda pendiente y tu situación. Lo analizamos en el diagnóstico gratuito antes de tomar cualquier decisión.</>
      ),
      plain:
        "No necesariamente. Depende del valor de la vivienda, la deuda pendiente y tu situación. Lo analizamos en el diagnóstico gratuito antes de tomar cualquier decisión.",
    },
    {
      q: "¿Cuánto tarda el procedimiento?",
      a: (
        <>Entre 6 y 18 meses según la complejidad y el juzgado, aunque los embargos pueden suspenderse mucho antes de la resolución final.</>
      ),
      plain:
        "Entre 6 y 18 meses según la complejidad y el juzgado, aunque los embargos pueden suspenderse mucho antes de la resolución final.",
    },
    {
      q: "¿Puedo acogerme si soy autónomo?",
      a: (
        <>Sí. La ley está pensada tanto para particulares como para autónomos de buena fe en situación de insolvencia. Valoramos también el concurso de persona física cuando encaja mejor.</>
      ),
      plain:
        "Sí. La ley está pensada tanto para particulares como para autónomos de buena fe en situación de insolvencia. Valoramos también el concurso de persona física cuando encaja mejor.",
    },
  ],
};