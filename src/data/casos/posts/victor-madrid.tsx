import {
  ProcessTimeline,
  BeforeAfterSplit,
  MythVsReality,
  DebtTypesDonut,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/victor-madrid.jpg";

export const victorMadrid: CasoExito = {
  slug: "victor-madrid-cancela-112000-euros",
  category: "Concurso de persona física",
  name: "Víctor R.",
  location: "Madrid",
  debtAmount: "112.000 €",
  solution: "Concurso de persona física con exoneración",
  headline:
    "Su empresa quebró y arrastró 112.000 € de deudas: cómo Víctor salió adelante con el concurso de persona física en Madrid",
  dek: "Lo perdió todo cuando su negocio quebró: el local, los proveedores, los créditos bancarios. Con más de cien mil euros de deuda y sin patrimonio, el concurso de persona física fue la salida ordenada que necesitaba.",
  seoTitle: "Caso real: ex-empresario cancela 112.000 € en Madrid",
  metaDescription:
    "Víctor cerró su empresa en Madrid con 112.000 € de deudas con bancos y proveedores. Con el concurso de persona física logró la exoneración del pasivo pendiente. Su historia real.",
  date: "12 junio 2026",
  readTime: "8 min",
  publishedAt: "2026-06-12",
  heroImage: casoFoto,
  heroAlt: "Hombre de mediana edad en Madrid, tranquilo, tras resolver una deuda de 112.000 euros por el cierre de su empresa",
  keywords: [
    "caso real",
    "concurso de persona física",
    "ex-empresario deudas Madrid",
    "cerrar empresa deudas",
    "exoneración pasivo pendiente",
    "cancelar deudas empresariales",
  ],
  faq: [
    {
      question: "¿En qué se diferencia el concurso de persona física de la Ley de Segunda Oportunidad?",
      answer:
        "Son vías complementarias reguladas por la misma normativa. El concurso es el procedimiento judicial que permite una salida ordenada cuando la deuda es elevada y hay múltiples acreedores. Al final del proceso se puede solicitar la exoneración del pasivo insatisfecho, que es la cancelación de lo que queda sin pagar.",
    },
    {
      question: "¿Víctor tenía bienes cuando inició el proceso?",
      answer:
        "No. Al cerrar la empresa ya no quedaba patrimonio relevante. Esa insolvencia real, unida a la buena fe demostrada, fue lo que permitió la exoneración total de la deuda pendiente.",
    },
    {
      question: "¿Puede un ex-empresario volver a tener actividad económica tras la exoneración?",
      answer:
        "Sí. La finalidad de la ley es precisamente esa: que las personas que han actuado de buena fe puedan recuperar su vida económica. La exoneración borra la deuda y abre la puerta a empezar de nuevo.",
    },
  ],
  sections: [
    {
      id: "cuando-la-empresa-se-lleva-todo",
      title: "Cuando la empresa se lo llevó todo",
      body: (
        <>
          <p>
            Víctor había levantado su negocio durante quince años. Empleados, local, maquinaria,
            relaciones con proveedores. Un ecosistema entero que un día empezó a agrietarse y que
            terminó por derrumbarse.
          </p>
          <p>
            El cierre fue inevitable. Pero lo que nadie le contó es lo que viene después de cerrar:
            las deudas no desaparecen con el negocio. Víctor, como persona física, siguió siendo
            responsable de <strong>112.000 €</strong> frente a bancos, proveedores y entidades
            financieras. Sin empresa, sin ingresos estables y sin patrimonio que liquidar.
          </p>
        </>
      ),
    },
    {
      id: "la-deuda-en-detalle",
      title: "Una deuda construida durante años de intentar salvar el negocio",
      body: (
        <>
          <p>
            No fue una mala decisión puntual. Fueron años de créditos para mantener la liquidez,
            líneas de financiación que se renovaban y facturas que se iban acumulando cuando los
            cobros tardaban. Así se distribuyó la deuda que quedó pendiente al cierre:
          </p>
          <DebtTypesDonut
            title="Composición de la deuda de Víctor"
            subtitle="112.000 € distribuidos entre varios acreedores"
            segments={[
              { label: "Créditos y líneas bancarias", value: 52, color: "hsl(145 60% 35%)" },
              { label: "Proveedores y acreedores comerciales", value: 30, color: "hsl(84 75% 45%)" },
              { label: "Préstamos personales avalados", value: 18, color: "hsl(25 90% 55%)" },
            ]}
          />
          <p>
            El problema ya no era gestionar el negocio: era gestionar una deuda personal que
            superaba cualquier capacidad de pago razonable.
          </p>
        </>
      ),
    },
    {
      id: "por-que-el-concurso",
      title: "Por qué el concurso de persona física era la vía adecuada",
      body: (
        <>
          <p>
            Con deudas de esta magnitud y varios acreedores con intereses distintos, la salida más
            ordenada era el concurso de persona física. Este procedimiento, regulado por la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-7345">
              Ley de Segunda Oportunidad
            </ExtLink>
            , permite centralizar todas las reclamaciones bajo supervisión judicial y, al final del
            proceso, solicitar la exoneración del pasivo pendiente: es decir, la cancelación de lo
            que no se ha podido pagar.
          </p>
          <p>
            Víctor no tenía bienes que liquidar, había actuado de buena fe y su insolvencia era
            documentable. Cumplía los requisitos. Puedes revisar cuáles son en la guía de{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              condiciones para cancelar deudas
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "el-proceso-paso-a-paso",
      title: "Cómo se desarrolló su caso",
      body: (
        <>
          <p>
            El procedimiento fue complejo por el volumen de la deuda y el número de acreedores,
            pero en ningún momento Víctor navegó solo. Cada fase tuvo un objetivo claro y él siempre
            supo en qué punto estaba.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Análisis", desc: "Estudio completo de la deuda, acreedores y situación patrimonial" },
              { title: "Expediente", desc: "Preparación del concurso voluntario de persona física" },
              { title: "Procedimiento", desc: "Tramitación judicial con paralización de ejecuciones" },
              { title: "Exoneración", desc: "Cancelación del pasivo pendiente y cierre definitivo" },
            ]}
          />
          <p>
            Desde el inicio del procedimiento, las ejecuciones individuales de los acreedores
            quedaron paralizadas. Víctor dejó de recibir presión directa mientras el proceso avanzaba.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "El antes y el después de 112.000 € cancelados",
      body: (
        <>
          <BeforeAfterSplit
            before={[
              "112.000 € de deuda personal tras cerrar la empresa",
              "Múltiples acreedores reclamando simultáneamente",
              "Cuentas bloqueadas y presión constante",
              "Incapacidad total para retomar una vida económica normal",
            ]}
            after={[
              "Deuda exonerada por resolución judicial",
              "Un solo procedimiento ordenado para todos los acreedores",
              "Fin de las ejecuciones y reclamaciones",
              "Posibilidad real de empezar de cero",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos-empresarios",
      title: "Creencias que frenan a muchos ex-empresarios",
      body: (
        <>
          <p>
            El perfil de ex-empresario suele ir acompañado de mucha culpa y de muchos mitos. Estos
            son los que más retrasaron que Víctor pidiera ayuda.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "El empresario que quiebra tiene que pagar siempre, pase lo que pase",
                reality: "Como persona física puedes exonerar la deuda personal que queda tras el cierre si cumples los requisitos legales",
              },
              {
                myth: "Con tanta deuda, el proceso será interminable",
                reality: "El concurso de persona física está diseñado para dar una salida ordenada y eficiente incluso en casos complejos",
              },
              {
                myth: "Jamás podré volver a tener actividad económica",
                reality: "La exoneración borra la deuda y te permite emprender o trabajar sin ese lastre",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "vida-despues",
      title: "Después del concurso: una segunda oportunidad de verdad",
      body: (
        <>
          <p>
            Víctor no recuperó la empresa. Eso ya no era posible. Pero sí recuperó algo más
            importante: la capacidad de mirar al futuro sin una deuda de seis cifras persiguiéndole.
            Hoy trabaja, ahorra y puede plantearse proyectos sin el peso de aquellos 112.000 €.
          </p>
          <InlineCTA
            title="¿Cerraste tu negocio y la deuda sigue persiguiéndote?"
            description="Estudiamos tu caso de forma gratuita y te explicamos qué vía legal se adapta mejor a tu situación."
            buttonLabel="Quiero que estudien mi caso"
          />
        </>
      ),
    },
  ],
};
