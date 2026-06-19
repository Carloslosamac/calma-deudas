import {
  BeforeAfterSplit,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/testimonios/lso-1.jpg";

export const noemiBarcelona: CasoExito = {
  slug: "noemi-barcelona-cancela-48310-euros",
  category: "Ley de Segunda Oportunidad",
  name: "Noemí V.",
  location: "Barcelona",
  debtAmount: "48.310 €",
  solution: "Ley de Segunda Oportunidad (exoneración total)",
  headline:
    "Cancela 48.310 € en Barcelona y vuelve a dormir tranquila tras años de deudas",
  dek: "Arrastraba tarjetas, microcréditos y la hipoteca. Hoy no debe nada y ha recuperado el control de su vida. Así fue su caso, paso a paso.",
  seoTitle: "Caso real: cancela 48.310 € de deuda en Barcelona",
  metaDescription:
    "Noemí, de Barcelona, canceló 48.310 € en tarjetas, microcréditos e hipoteca con la Ley de Segunda Oportunidad. Te contamos su caso real paso a paso.",
  date: "19 junio 2026",
  readTime: "7 min",
  publishedAt: "2026-06-19",
  heroImage: casoFoto,
  heroAlt: "Mujer sonriendo tranquila en casa tras cancelar sus deudas en Barcelona",
  keywords: [
    "caso real",
    "Ley de Segunda Oportunidad",
    "cancelar deudas Barcelona",
    "microcréditos",
    "tarjetas revolving",
    "exoneración de deuda",
  ],
  faq: [
    {
      question: "¿Cuánta deuda canceló Noemí?",
      answer:
        "Un total de 48.310 € repartidos entre tarjetas, microcréditos y deuda asociada a su vivienda, exonerados con la Ley de Segunda Oportunidad.",
    },
    {
      question: "¿Cuánto tardó el proceso?",
      answer:
        "Su caso se resolvió en meses, no en años. Los plazos dependen del juzgado y de la documentación, pero la mayoría de procedimientos se completan dentro del mismo año.",
    },
    {
      question: "¿Tener hipoteca impide acogerse a la Ley de Segunda Oportunidad?",
      answer:
        "No de forma automática. Cada caso se estudia: hay soluciones distintas según si la vivienda está pagada, financiada o es imprescindible. Por eso el primer paso siempre es un análisis individual.",
    },
  ],
  sections: [
    {
      id: "el-punto-de-quiebre",
      title: "El día que dejó de salir el sueldo",
      body: (
        <>
          <p>
            Durante meses, Noemí hizo lo que hacen miles de familias: tapar un agujero con otro.
            Una tarjeta para llegar a fin de mes, un microcrédito para pagar la tarjeta, otro
            préstamo para no caer en el impago de la hipoteca. Hasta que la cuenta dejó de dar de sí.
          </p>
          <p>
            "Llegó un mes en el que ingresaba la nómina y ya no quedaba nada", resume. Entre
            cuotas, intereses y comisiones, su deuda había crecido hasta los <strong>48.310 €</strong>.
            No era una persona derrochadora: era alguien atrapada en un sistema de crédito que cobra
            por encima de lo que muchas familias pueden devolver.
          </p>
        </>
      ),
    },
    {
      id: "como-era-el-dia-a-dia",
      title: "Llamadas, ansiedad y la sensación de no tener salida",
      body: (
        <>
          <p>
            Lo más duro no eran solo los números. Eran las llamadas de cobro a cualquier hora, el
            miedo a abrir el buzón y la culpa constante. Noemí evitaba mirar el móvil y había dejado
            de hacer planes, porque cualquier euro estaba comprometido antes de cobrarlo.
          </p>
          <p>
            Como muchas personas, creía que pedir ayuda era reconocer un fracaso. En realidad, la
            ley contempla justo lo contrario: un mecanismo pensado para que quien actúa de buena fe
            y no puede pagar tenga una segunda oportunidad de verdad.
          </p>
        </>
      ),
    },
    {
      id: "la-decision",
      title: "La decisión que lo cambió todo",
      body: (
        <>
          <p>
            Noemí pidió un estudio gratuito de su caso. En esa primera conversación entendió algo
            clave: su situación encajaba en la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-7345">
              Ley de Segunda Oportunidad
            </ExtLink>
            , la norma que permite cancelar judicialmente las deudas que no se pueden asumir.
          </p>
          <p>
            No había anticipos ni letra pequeña: primero se analizaba si cumplía los requisitos y
            qué parte de su deuda era exonerable. Si quieres ver en detalle esas condiciones, las
            explicamos en la guía de{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              requisitos para cancelar deudas
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "el-proceso",
      title: "Su caso, paso a paso",
      body: (
        <>
          <p>
            A partir de ahí, el procedimiento avanzó de forma ordenada. Cada fase tenía un objetivo
            concreto y Noemí siempre supo en qué punto estaba.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Análisis", desc: "Estudio gratuito de sus deudas y su situación real" },
              { title: "Expediente", desc: "Preparación de la documentación y solicitud" },
              { title: "Procedimiento", desc: "Tramitación judicial y paralización de la presión" },
              { title: "Exoneración", desc: "Cancelación de los 48.310 € y vida sin deuda" },
            ]}
          />
          <p>
            Mientras el proceso seguía su curso, las reclamaciones se frenaron. Por primera vez en
            mucho tiempo, dejó de vivir pendiente del teléfono.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Antes y después del 'borrón y cuenta nueva'",
      body: (
        <>
          <p>
            La diferencia, vista con perspectiva, es enorme. No se trata solo de dinero: es recuperar
            la calma y la capacidad de planificar.
          </p>
          <BeforeAfterSplit
            before={[
              "Llamadas de cobro a todas horas",
              "La nómina entera comprometida",
              "Microcréditos que crecían cada mes",
              "Ansiedad y sensación de no tener salida",
            ]}
            after={[
              "48.310 € de deuda cancelados",
              "Recupera su sueldo por completo",
              "Fin de las llamadas y la presión",
              "Vuelve a dormir y a hacer planes",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Lo que la frenaba (y no era cierto)",
      body: (
        <>
          <p>
            Como tantas personas, Noemí tardó en dar el paso por creencias muy extendidas. Estas son
            las que más la frenaron.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Con hipoteca no puedo acogerme",
                reality: "Cada caso se estudia; hay soluciones según la situación de la vivienda",
              },
              {
                myth: "Es un proceso eterno",
                reality: "La mayoría de casos se resuelven en meses, no en años",
              },
              {
                myth: "Voy a quedar marcada para siempre",
                reality: "Al cancelar la deuda se puede salir de los ficheros de morosidad",
              },
            ]}
          />
          <p>
            Sobre este último punto, si te preocupa tu historial, te interesa cómo{" "}
            <InternalLink to="/blog/salir-asnef">salir de ASNEF tras cancelar la deuda</InternalLink>.
          </p>
        </>
      ),
    },
    {
      id: "vida-hoy",
      title: "Su vida hoy",
      body: (
        <>
          <p>
            Hoy Noemí no debe nada. Ha vuelto a tener un colchón, por pequeño que sea, y sobre todo
            ha recuperado algo que el dinero no compra: dormir tranquila. Su historia no es
            excepcional; es la de muchas personas que pensaron que no había salida y descubrieron que
            la ley estaba de su lado.
          </p>
          <InlineCTA
            title="¿Tu situación se parece a la de Noemí?"
            description="Analizamos tu caso gratis y te decimos cuánta deuda puedes cancelar, sin compromiso."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};