import {
  BeforeAfterSplit,
  DocumentsChecklist,
  EmbargoFlowChart,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import { Banknote, Gavel, Hourglass, ShieldCheck } from "lucide-react";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogEmbargos from "@/assets/blog-embargos.jpg";

export const embargosSegundaOportunidad: BlogPost = {
  slug: "embargos-segunda-oportunidad",
  category: "Embargos",
  title: "Qué ocurre con los embargos cuando inicias el proceso legal",
  seoTitle: "Embargos y Ley de Segunda Oportunidad",
  excerpt:
    "Te explicamos cuándo pueden frenarse los embargos, qué pasa con la nómina y cómo se protege tu cuenta durante el expediente.",
  date: "7 mayo 2026",
  readTime: "9 min",
  author: "Equipo legal Calma",
  heroImage: blogEmbargos,
  heroAlt: "Hombre revisando en su cocina una notificación de embargo",
  keywords: [
    "embargo de nómina",
    "embargo de cuenta",
    "parar embargo",
    "salario mínimo",
    "art. 607 LEC",
    "medidas cautelares",
    "agencia tributaria",
    "seguridad social",
  ],
  sections: [
    {
      id: "que-es-embargo",
      title: "Qué es un embargo y por qué llega tan rápido",
      body: (
        <>
          <p>
            Un <strong>embargo</strong> es la retención forzosa de un bien o de un ingreso para garantizar el pago
            de una deuda. La ordena un juzgado o, en el caso de la deuda pública, directamente la administración:{" "}
            <ExtLink href="https://sede.agenciatributaria.gob.es/">Agencia Tributaria</ExtLink>,{" "}
            <ExtLink href="https://sede.seg-social.gob.es/">Seguridad Social</ExtLink>, ayuntamientos o
            comunidades autónomas, mediante el procedimiento administrativo de apremio regulado en el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2005-14803">Reglamento General de Recaudación</ExtLink>.
          </p>
          <p>
            Para los acreedores privados (bancos, financieras, microcréditos) el camino es más largo, pero el final
            es el mismo: una demanda, una sentencia y la ejecución sobre tu nómina, tu cuenta o tus bienes.
            Conocer los plazos y los límites legales es lo primero que necesitas para no aceptar como inevitable
            algo que muchas veces no lo es.
          </p>
        </>
      ),
    },
    {
      id: "tipos",
      title: "Tipos de embargo: nómina, cuenta y bienes",
      body: (
        <>
          <p>
            En la práctica, los tres embargos más frecuentes son el de <strong>nómina</strong>, el de{" "}
            <strong>cuenta bancaria</strong> y el de <strong>bienes</strong>. El embargo de nómina está limitado por
            ley: el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2000-323">artículo 607 de la Ley de Enjuiciamiento Civil</ExtLink>{" "}
            protege siempre el equivalente al Salario Mínimo Interprofesional íntegro, y aplica porcentajes
            crecientes a los tramos por encima.
          </p>
          <p>
            El embargo de cuenta puede vaciarla hasta el límite ordenado por el juzgado, salvo la parte equivalente
            al SMI cuando se demuestra el origen salarial. Y el embargo de bienes alcanza al vehículo, a la
            vivienda y a cualquier otro elemento patrimonial relevante, con prioridades distintas según se trate
            de deuda pública o privada.
          </p>
        </>
      ),
    },
    {
      id: "como-frenarlo",
      title: "Cómo se frena un embargo paso a paso",
      body: (
        <>
          <p>
            La <strong>Ley de Segunda Oportunidad</strong> permite solicitar al juzgado la <em>suspensión de los
            embargos</em> en curso y la paralización de nuevas ejecuciones desde el momento en que se admite a
            trámite el procedimiento. No es automático: requiere un escrito específico, fundamentado y presentado
            por un abogado especializado.
          </p>
          <EmbargoFlowChart
            title="De la notificación a la suspensión del embargo"
            nodes={[
              { icon: Gavel, title: "Embargo notificado", desc: "Tu empresa o banco recibe la orden de retener" },
              { icon: Hourglass, title: "Solicitud urgente", desc: "Tu abogado presenta el procedimiento ante el juzgado" },
              { icon: ShieldCheck, title: "Medidas cautelares", desc: "El juzgado ordena suspender las retenciones" },
              { icon: Banknote, title: "Nómina íntegra", desc: "El pagador deja de retener desde la nómina siguiente" },
            ]}
          />
          <p>
            Para entender si encajas en el procedimiento, te recomendamos pasar antes por la guía sobre los{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">requisitos para cancelar deudas</InternalLink>. Si tu
            embargo viene además de figurar en un fichero de morosidad, también te interesará leer{" "}
            <InternalLink to="/blog/salir-asnef">cómo salir de ASNEF</InternalLink>.
          </p>
          <InlineCTA
            title="¿Tienes una nómina o cuenta embargada?"
            description="Cuanto antes lo veamos, antes podemos pedir la suspensión legal del embargo."
            buttonLabel="Parar mi embargo"
          />
        </>
      ),
    },
    {
      id: "fases",
      title: "Fases procesales hasta la suspensión",
      body: (
        <>
          <p>
            Desde el primer momento, las fases están muy pautadas: análisis de tu situación, presentación de la
            solicitud de procedimiento de insolvencia ante el juzgado competente, admisión a trámite, escrito de
            medidas cautelares, resolución del juzgado y comunicación a las empresas pagadoras (tu empresa, el banco,
            la Tesorería) para que dejen de aplicar la retención.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Análisis", desc: "Cuantificamos la deuda y los embargos activos" },
              { title: "Solicitud", desc: "Se presenta el procedimiento en el juzgado" },
              { title: "Medidas", desc: "Se piden cautelares para suspender embargos" },
              { title: "Levantamiento", desc: "Pagadores reciben la orden y dejan de retener" },
            ]}
          />
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Antes y después de frenar el embargo",
      body: (
        <>
          <p>
            La diferencia no se mide solo en euros recuperados. La mayoría de clientes nos dicen que lo primero
            que cambia es la sensación al abrir la app del banco a final de mes: vuelve a haber margen para vivir,
            no solo para pagar.
          </p>
          <BeforeAfterSplit
            before={[
              "Nómina retenida cada mes",
              "Cuenta bloqueada sin previo aviso",
              "Llamadas diarias de recobro",
              "Imposibilidad de planificar el mes",
            ]}
            after={[
              "Nómina íntegra desde el primer mes",
              "Cuenta operativa y desbloqueada",
              "Las llamadas pierden fundamento legal",
              "Vuelves a tener visibilidad sobre tu dinero",
            ]}
          />
        </>
      ),
    },
    {
      id: "documentacion",
      title: "Qué documentación necesitas para frenar el embargo",
      body: (
        <>
          <p>
            Para preparar la solicitud necesitamos identificar con precisión qué acreedores tienen procedimientos
            abiertos contra ti y en qué fase están. La{" "}
            <ExtLink href="https://www.poderjudicial.es/cgpj/es/Servicios/Sede-Judicial-Electronica/">
              Sede Judicial Electrónica
            </ExtLink>{" "}
            permite consultar notificaciones recibidas y procedimientos en marcha.
          </p>
          <DocumentsChecklist
            items={[
              "DNI en vigor",
              "Última nómina o justificante de ingresos",
              "Extracto bancario de los últimos 3 meses",
              "Notificaciones de embargo recibidas",
              "Listado aproximado de acreedores y saldos",
              "Vida laboral actualizada",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos sobre los embargos",
      body: (
        <>
          <p>
            Hay muchos mitos que retrasan la decisión de actuar. Conviene aclararlos con datos legales, no con
            creencias del barrio.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si me embargan, pierdo todo el sueldo",
                reality: "El SMI íntegro está siempre protegido por ley (art. 607 LEC)",
              },
              {
                myth: "Una vez embargado, no se puede parar",
                reality: "La Segunda Oportunidad permite suspender el embargo en curso",
              },
              {
                myth: "Cambiar de cuenta evita el embargo",
                reality: "El juzgado puede rastrear cuentas nuevas; no es una solución legal",
              },
            ]}
          />
          <InlineCTA
            title="Vamos a parar tu embargo"
            description="Si ya tienes una retención activa, el primer paso es saber si encaja en el procedimiento."
            buttonLabel="Parar mi embargo"
          />
        </>
      ),
    },
  ],
};