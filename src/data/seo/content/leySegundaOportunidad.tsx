import { Link } from "react-router-dom";
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
  hero: {
    badge: "Ley de Segunda Oportunidad",
    titleLead: "Cancela tus deudas legalmente y",
    titleAccent: "empieza de cero.",
    subtitle: (
      <>
        La Ley de Segunda Oportunidad es el mecanismo legal para personas
        sobreendeudadas. En Calma estudiamos tu caso <strong>gratis</strong> y te
        decimos con total claridad si puedes acogerte.
      </>
    ),
    trustNote: "Sin DNI · Sin compromiso",
  },
  benefits: [
    {
      icon: "shield",
      title: "Cancelación legal",
      text: "Elimina las deudas que no puedes pagar bajo el amparo de la ley.",
    },
    {
      icon: "phone-off",
      title: "Adiós al acoso",
      text: "Pon fin a las llamadas y la presión constante de los acreedores.",
    },
    {
      icon: "gavel",
      title: "Suspende embargos",
      text: "Posibilidad real de detener embargos en curso desde el primer paso.",
    },
    {
      icon: "users",
      title: "Equipo experto",
      text: "Abogados que te acompañan paso a paso, sin letra pequeña.",
    },
  ],
  stepsTitle: "Tu camino hacia la libertad",
  stepsSubtitle: "Cuatro pasos claros para recuperar tu tranquilidad",
  steps: [
    {
      title: "Diagnóstico gratuito",
      text: "Analizamos tus deudas e ingresos para confirmar si puedes acogerte.",
    },
    {
      title: "Preparación del expediente",
      text: "Reunimos la documentación y diseñamos la mejor estrategia legal.",
    },
    {
      title: "Presentación judicial",
      text: "Iniciamos el proceso formal ante el juzgado correspondiente.",
    },
    {
      title: "Exoneración total",
      text: "El juez acuerda la cancelación de las deudas. Empiezas de cero.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Gratis", label: "Diagnóstico inicial sin compromiso" },
    { value: "6–18 meses", label: "Plazo medio del procedimiento" },
    { value: "RGPD", label: "Tus datos siempre protegidos" },
  ],
  eligibility: {
    title: "¿Es para mí?",
    intro: (
      <>
        Si eres particular o autónomo, actúas de buena fe y no tienes condenas por
        delitos económicos en los últimos 10 años, lo más probable es que sí.
      </>
    ),
    requirements: [
      "Eres particular o autónomo en situación de insolvencia (no puedes pagar tus deudas).",
      "Actúas de buena fe: no has ocultado bienes ni provocado tu insolvencia de forma fraudulenta.",
      "No has sido condenado por determinados delitos socioeconómicos en los últimos diez años.",
      "Tus deudas no provienen, en su mayoría, de sanciones o conductas dolosas.",
    ],
    trustTitle: "Contenido revisado por abogado",
    trustText: "Actualizado según la última reforma concursal.",
  },
  closing: {
    title: "¿Empezamos hoy mismo?",
    text: "Estudiamos tu caso gratis y sin compromiso en menos de 24 horas. Da el primer paso para recuperar tu tranquilidad.",
  },
  sections: [
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
          <p>
            ¿Prefieres entender la ley en profundidad antes de decidir? Lee nuestra{" "}
            <A to="/blog/guia-ley-segunda-oportunidad">guía completa de la Ley de Segunda Oportunidad</A>.
          </p>
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