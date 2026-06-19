import {
  BeforeAfterSplit,
  EmbargoFlowChart,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import { FileText, Gavel, ShieldCheck, Sparkles } from "lucide-react";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/manuel-granada.jpg";

export const manuelGranada: CasoExito = {
  slug: "manuel-granada-frena-embargo-nomina",
  category: "Parar embargo",
  name: "Manuel R.",
  location: "Granada",
  debtAmount: "Nómina protegida",
  solution: "Embargo frenado + Ley de Segunda Oportunidad",
  headline:
    "Le vaciaban la nómina cada mes: cómo Manuel paró el embargo en Granada y acabó libre de deudas",
  dek: "Manuel cobraba y, antes de poder tocar el dinero, ya habían retenido casi todo. Primero se protegió el mínimo inembargable. Después, al ser insolvente sin bienes, la Ley de Segunda Oportunidad canceló la deuda de raíz.",
  seoTitle: "Caso real: frena embargo de nómina y cancela deuda en Granada",
  metaDescription:
    "Manuel R., de Granada, tenía su nómina embargada. Se protegió el mínimo inembargable, se frenó la retención y después se canceló la deuda con la Ley de Segunda Oportunidad.",
  date: "30 mayo 2026",
  readTime: "7 min",
  publishedAt: "2026-05-30",
  heroImage: casoFoto,
  heroAlt:
    "Hombre en Granada tranquilo tras frenar el embargo de nómina y cancelar sus deudas",
  keywords: [
    "embargo nómina",
    "parar embargo",
    "mínimo inembargable",
    "Ley de Segunda Oportunidad Granada",
    "cancelar deudas Granada",
    "caso real embargo",
    "LSO embargo nómina",
  ],
  faq: [
    {
      question: "¿Qué es el mínimo inembargable y cómo se protege?",
      answer:
        "Es la parte del salario que ningún acreedor puede embargar, equivalente al salario mínimo interprofesional. Si la retención supera ese límite, se puede solicitar su corrección de forma inmediata.",
    },
    {
      question: "¿Se puede cancelar la deuda que originó el embargo con la LSO?",
      answer:
        "Sí, si la persona es insolvente y no tiene bienes con los que responder. En ese caso, la Ley de Segunda Oportunidad permite exonerar la deuda, incluso si ya había un embargo activo sobre la nómina.",
    },
    {
      question: "¿Cuánto tiempo tardó el proceso en el caso de Manuel?",
      answer:
        "La protección del mínimo inembargable y la suspensión del embargo se gestionaron en cuestión de días. El procedimiento completo de exoneración se desarrolló a lo largo de los meses siguientes, según los tiempos judiciales.",
    },
  ],
  sections: [
    {
      id: "nomina-vaciada",
      title: "Cobrar sin cobrar: el mes que Manuel entendió lo que era un embargo",
      body: (
        <>
          <p>
            La primera vez que Manuel consultó su cuenta el día de pago y vio
            un saldo casi idéntico al del día anterior, pensó que era un error
            del banco. Llamó. No era un error. Era un embargo de nómina: el
            juzgado había autorizado a retener una parte de su salario cada mes
            hasta saldar una deuda que, por negligencia y por creer que se
            resolvería sola, había dejado crecer durante años.
          </p>
          <p>
            Lo que retenían superaba con creces lo que la ley permite embargar.
            Manuel seguía trabajando las mismas horas, pero vivía con lo que no
            alcanzaba para cubrir el alquiler, la compra y los suministros
            básicos. El círculo era asfixiante.
          </p>
        </>
      ),
    },
    {
      id: "flujo-embargo",
      title: "Cómo llegó el embargo y cómo se frenó",
      body: (
        <>
          <p>
            Un embargo de nómina no aparece de la nada. Sigue un camino
            judicial con pasos concretos, y en cada uno hay una oportunidad de
            actuar. En el caso de Manuel, cuando llegó la ayuda, el embargo
            ya era efectivo, pero se podía frenar.
          </p>
          <EmbargoFlowChart
            title="El camino del embargo de Manuel y dónde se cortó"
            nodes={[
              {
                icon: FileText,
                title: "Deuda impagada",
                desc: "Varios meses de cuotas sin pagar; el acreedor inicia reclamación judicial",
              },
              {
                icon: Gavel,
                title: "Orden de embargo",
                desc: "El juzgado autoriza la retención mensual sobre la nómina de Manuel",
              },
              {
                icon: ShieldCheck,
                title: "Protección del mínimo inembargable",
                desc: "Se detecta que la retención supera el límite legal; se presenta escrito para corregirlo de inmediato",
              },
              {
                icon: Sparkles,
                title: "Inicio de la LSO",
                desc: "Al ser insolvente sin bienes, se activa la Ley de Segunda Oportunidad y el embargo queda suspendido",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "La diferencia entre vivir embargado y vivir libre",
      body: (
        <>
          <p>
            El cambio no fue solo económico. Manuel describe los meses con el
            embargo activo como una presión constante: la sensación de trabajar
            para pagar sin que la deuda bajase. Cuando la nómina volvió a ser
            suya, todo cambió.
          </p>
          <BeforeAfterSplit
            before={[
              "Retención mensual superior al mínimo legal",
              "Sin margen para alquiler, compra ni suministros",
              "Deuda que no disminuía pese a los pagos forzosos",
              "Angustia y sensación de no tener salida",
            ]}
            after={[
              "Nómina íntegra protegida desde el primer escrito",
              "Embargo suspendido al iniciar el proceso LSO",
              "Deuda cancelada definitivamente por ley",
              "Vida sin acreedores ni retenciones",
            ]}
          />
        </>
      ),
    },
    {
      id: "proceso-lso",
      title: "De la protección urgente a la exoneración total",
      body: (
        <>
          <p>
            El proceso tuvo dos velocidades. La primera, muy rápida: proteger
            la nómina y frenar la retención ilegal. La segunda, más pausada
            pero igualmente efectiva: tramitar la exoneración completa de la
            deuda a través de la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-7345">
              Ley de Segunda Oportunidad
            </ExtLink>
            .
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis urgente",
                desc: "Revisión del embargo activo y comprobación del mínimo inembargable vulnerado",
              },
              {
                title: "Escrito de protección",
                desc: "Presentación inmediata para corregir la retención ilegal; nómina recuperada parcialmente",
              },
              {
                title: "Expediente LSO",
                desc: "Documentación de la insolvencia; inicio del procedimiento judicial; embargo suspendido",
              },
              {
                title: "Exoneración",
                desc: "Cancelación definitiva de la deuda; Manuel queda libre de obligaciones",
              },
            ]}
          />
          <p>
            Si tienes dudas sobre si tu situación encaja en la Ley de Segunda
            Oportunidad, consulta los{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              requisitos para cancelar deudas
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "clave",
      title: "La clave: actuar en cuanto llega la retención",
      body: (
        <>
          <p>
            Manuel reconoce que esperó demasiado antes de pedir ayuda. «Pensaba
            que el embargo era definitivo, que no se podía hacer nada», dice.
            Pero el margen de actuación existe incluso cuando la retención ya
            es efectiva: el mínimo inembargable es un derecho que los acreedores
            deben respetar, y la Ley de Segunda Oportunidad puede activarse
            aunque el embargo lleve meses en marcha.
          </p>
          <InlineCTA
            title="¿Te están reteniendo la nómina?"
            description="Cuéntanos tu caso y te explicamos en la primera llamada qué parte de tu salario están obligados a devolverte y si puedes cancelar la deuda de raíz."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};
