import {
  BeforeAfterSplit,
  EmbargoFlowChart,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import { FileText, Gavel, ShieldCheck, Sparkles } from "lucide-react";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/pilar-valencia.jpg";

export const pilarValencia: CasoExito = {
  slug: "pilar-valencia-suspende-embargo-cuenta",
  category: "Parar embargo",
  name: "Pilar G.",
  location: "Valencia",
  debtAmount: "Embargo suspendido",
  solution: "Embargo de cuenta suspendido",
  headline:
    "Le congelaron la cuenta un viernes: cómo Pilar actuó el fin de semana y evitó perder sus ahorros en Valencia",
  dek: "Una notificación de embargo de cuenta bancaria puede llegar sin aviso y dejar sin acceso al dinero en horas. Pilar lo vivió un viernes por la tarde. Lo que vino después fue rápido, ordenado y, al final, definitivo: quedó libre de deudas.",
  seoTitle: "Caso real: suspende embargo de cuenta bancaria en Valencia",
  metaDescription:
    "Pilar G., de Valencia, recibió un embargo de cuenta bancaria. Se actuó con urgencia para suspender la retención, proteger sus ingresos y, finalmente, cancelar la deuda por completo.",
  date: "29 mayo 2026",
  readTime: "6 min",
  publishedAt: "2026-05-29",
  heroImage: casoFoto,
  heroAlt:
    "Mujer en Valencia tranquila tras suspender el embargo de su cuenta bancaria",
  keywords: [
    "embargo cuenta bancaria",
    "suspender embargo cuenta",
    "parar embargo Valencia",
    "caso real embargo cuenta",
    "Ley de Segunda Oportunidad Valencia",
    "cuenta bloqueada Hacienda",
    "cancelar deuda Valencia",
  ],
  faq: [
    {
      question: "¿Pueden embargar mi cuenta bancaria sin avisarme antes?",
      answer:
        "La notificación existe, pero puede llegar prácticamente al mismo tiempo que la retención efectiva. En algunos casos el titular no recibe el aviso hasta después de que el saldo ya ha sido retenido por el banco.",
    },
    {
      question: "¿Qué dinero está protegido frente a un embargo de cuenta?",
      answer:
        "El importe equivalente al salario mínimo interprofesional mensual no puede ser retenido. Si el saldo embargado incluye ingresos salariales, se puede reclamar la liberación de esa parte de forma inmediata.",
    },
    {
      question: "¿Cómo acabó Pilar libre de deudas si el embargo era de cuenta?",
      answer:
        "Tras suspender el embargo urgente, se analizó la situación global de Pilar. Al ser insolvente y no tener bienes con los que responder, encajaba en los requisitos de la Ley de Segunda Oportunidad, que permitió cancelar la deuda original definitivamente.",
    },
  ],
  sections: [
    {
      id: "viernes-negro",
      title: "Un viernes por la tarde que nadie olvida",
      body: (
        <>
          <p>
            Pilar fue al supermercado el viernes después del trabajo. Pasó la
            tarjeta. Denegada. Volvió a intentarlo. Denegada. Revisó el saldo
            desde el móvil y vio un número que no cuadraba: casi todo su dinero
            había desaparecido de la cuenta, retenido por una orden judicial
            de embargo que ella no había recibido a tiempo.
          </p>
          <p>
            Era fin de semana. Los bancos cerrados. La sensación de no poder
            hacer nada. Pilar describe esas horas como «las más largas de mi
            vida». Pero el lunes por la mañana ya tenía a alguien gestionando
            su caso.
          </p>
        </>
      ),
    },
    {
      id: "flujo-embargo-cuenta",
      title: "Cómo funciona un embargo de cuenta y dónde se puede frenar",
      body: (
        <>
          <p>
            El embargo de cuenta sigue un proceso judicial, pero su ejecución
            práctica puede ser inmediata en cuanto el banco recibe la orden.
            Saber en qué punto está el proceso es clave para elegir la vía de
            actuación más rápida.
          </p>
          <EmbargoFlowChart
            title="El camino del embargo de cuenta de Pilar"
            nodes={[
              {
                icon: FileText,
                title: "Deuda en manos del juzgado",
                desc: "El acreedor obtuvo sentencia favorable; inició la ejecución judicial sobre los bienes de Pilar",
              },
              {
                icon: Gavel,
                title: "Orden de retención bancaria",
                desc: "El juzgado ordenó al banco retener el saldo disponible; Pilar lo descubrió al pagar en el supermercado",
              },
              {
                icon: ShieldCheck,
                title: "Actuación urgente",
                desc: "Se identificó el mínimo protegido y se presentó escrito solicitando la liberación parcial inmediata",
              },
              {
                icon: Sparkles,
                title: "Embargo suspendido · Deuda cancelada",
                desc: "Retención levantada; inicio de LSO que culminó con la exoneración completa de la deuda",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "urgencia",
      title: "La urgencia que marca la diferencia",
      body: (
        <>
          <p>
            En un embargo de cuenta, cada día cuenta. El saldo retenido puede
            transferirse al acreedor una vez transcurrido el plazo de impugnación.
            Actuar antes de que eso ocurra es lo que determina si el dinero vuelve
            o no.
          </p>
          <p>
            En el caso de Pilar, la retención incluía ingresos de su nómina de
            ese mes. La parte equivalente al{" "}
            <ExtLink href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2023-4962">
              salario mínimo interprofesional
            </ExtLink>{" "}
            estaba legalmente protegida, y se reclamó su liberación de inmediato
            presentando la documentación acreditativa ante el juzgado.
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "Paso a paso: de la cuenta bloqueada a la deuda cancelada",
      body: (
        <>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis urgente",
                desc: "Identificación del embargo activo, importes protegidos y plazo disponible para actuar",
              },
              {
                title: "Escrito de impugnación",
                desc: "Solicitud de liberación del mínimo inembargable; el banco recibe instrucciones del juzgado",
              },
              {
                title: "Expediente LSO",
                desc: "Estudio global de la situación: insolvencia acreditada, sin bienes; inicio del procedimiento",
              },
              {
                title: "Exoneración total",
                desc: "Cancelación definitiva de la deuda; Pilar queda libre de cualquier obligación pendiente",
              },
            ]}
          />
          <p>
            Si quieres saber más sobre el proceso completo, consulta nuestra
            guía sobre{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              cómo funciona la Ley de Segunda Oportunidad
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "La vida con la cuenta bloqueada y sin ella",
      body: (
        <>
          <p>
            Pilar describe el período del embargo como una pérdida de control
            total sobre su propia vida económica. No podía planificar, no podía
            hacer frente a gastos básicos y vivía pendiente de si el saldo
            volvería. El contraste con la situación actual no podría ser mayor.
          </p>
          <BeforeAfterSplit
            before={[
              "Cuenta bloqueada sin poder acceder al saldo",
              "Ingresos del mes retenidos íntegramente",
              "Imposible pagar alquiler, compra o suministros",
              "Angustia constante y sensación de indefensión",
            ]}
            after={[
              "Embargo suspendido; acceso completo a la cuenta",
              "Mínimo inembargable recuperado de inmediato",
              "Deuda original cancelada por ley",
              "Tranquilidad y control sobre sus finanzas",
            ]}
          />
          <InlineCTA
            title="¿Te han bloqueado la cuenta?"
            description="Si te han notificado un embargo de cuenta o ya ves el saldo retenido, hay pasos urgentes que dar. Cuéntanos tu caso y actuamos."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};
