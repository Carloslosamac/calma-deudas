import {
  DebtTypesDonut,
  MythVsReality,
  ProcessTimeline,
  BeforeAfterSplit,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/sonia-valencia.jpg";

export const soniaValencia: CasoExito = {
  slug: "sonia-valencia-cancela-47300-euros",
  category: "Ley de Segunda Oportunidad",
  name: "Sonia P.",
  location: "Valencia",
  debtAmount: "47.300 €",
  solution: "Ley de Segunda Oportunidad (exoneración total)",
  headline:
    "Cerró su negocio, acumuló 47.300 € de deudas y los dejó atrás gracias a la Ley de Segunda Oportunidad",
  dek: "Sonia fue autónoma durante ocho años. Cuando tuvo que cesar su actividad, la deuda con proveedores y entidades financieras se volvió insostenible. Hoy ha empezado de cero, sin deber un euro.",
  seoTitle: "Caso real: autónoma cancela 47.300 € en Valencia",
  metaDescription:
    "Sonia, autónoma en Valencia, canceló 47.300 € en deudas con proveedores y préstamos tras cerrar su negocio. Su historia con la Ley de Segunda Oportunidad, paso a paso.",
  date: "13 junio 2026",
  readTime: "7 min",
  publishedAt: "2026-06-13",
  heroImage: casoFoto,
  heroAlt: "Mujer autónoma aliviada frente a su antiguo local en Valencia tras cancelar sus deudas",
  keywords: [
    "caso real",
    "autónoma deudas",
    "Ley de Segunda Oportunidad Valencia",
    "cerrar negocio deudas",
    "cancelar deudas proveedores",
    "exoneración total",
  ],
  faq: [
    {
      question: "¿Una autónoma que ha cerrado su actividad puede acogerse a la Ley de Segunda Oportunidad?",
      answer:
        "Sí. La ley está pensada precisamente para personas físicas, incluidos autónomos que cesan actividad, que no pueden hacer frente a sus deudas actuando de buena fe. El caso de Sonia es un ejemplo claro.",
    },
    {
      question: "¿Las deudas con proveedores también se cancelan?",
      answer:
        "En general sí. Las deudas de naturaleza privada con proveedores pueden ser exoneradas dentro del procedimiento. Cada caso se analiza individualmente para determinar qué parte es exonerable.",
    },
    {
      question: "¿Qué ocurre con las deudas con Hacienda y la Seguridad Social?",
      answer:
        "Existe un límite legal a la exoneración de deuda pública. El equipo legal estudia cada situación para maximizar lo que se puede cancelar y gestionar el resto de la forma más favorable.",
    },
  ],
  sections: [
    {
      id: "el-cierre-que-lo-cambio-todo",
      title: "El cierre que lo cambió todo",
      body: (
        <>
          <p>
            Sonia llevaba ocho años como autónoma en Valencia. Tenía su propia actividad, proveedores
            de confianza y una cartera de clientes que había construido con esfuerzo. Pero el negocio
            fue deteriorándose y llegó un momento en el que seguir adelante ya no era viable.
          </p>
          <p>
            Cerrar fue la decisión más dura que había tomado en su vida. Y no porque fuese un fracaso,
            sino por lo que dejaba detrás: <strong>47.300 €</strong> en facturas pendientes con
            proveedores, dos préstamos personales que había pedido para mantener la liquidez y una
            deuda con una entidad financiera de la que no recordaba ni cómo había empezado a crecer.
          </p>
        </>
      ),
    },
    {
      id: "de-que-se-componia-la-deuda",
      title: "De qué se componía la deuda",
      body: (
        <>
          <p>
            No era una sola deuda, sino varias que se habían ido acumulando mientras intentaba
            mantener el negocio a flote. Así se distribuía aproximadamente lo que debía:
          </p>
          <DebtTypesDonut
            title="Cómo se repartían los 47.300 €"
            subtitle="Deuda de Sonia al cierre de su actividad"
            segments={[
              { label: "Proveedores y acreedores comerciales", value: 44, color: "hsl(84 75% 45%)" },
              { label: "Préstamos personales", value: 35, color: "hsl(145 60% 35%)" },
              { label: "Crédito entidad financiera", value: 21, color: "hsl(25 90% 55%)" },
            ]}
          />
          <p>
            Ninguna de estas deudas tenía garantía real: no había hipoteca, no había bienes de valor
            que respaldasen los créditos. Era deuda personal, y pesaba como una losa cada mes.
          </p>
        </>
      ),
    },
    {
      id: "la-trampa-de-seguir-pagando",
      title: "La trampa de seguir pagando lo que ya no se puede pagar",
      body: (
        <>
          <p>
            Durante meses, Sonia intentó gestionar la situación por su cuenta: llamadas a los
            acreedores, aplazamientos, promesas de pago. Sin actividad y sin ingresos estables, cada
            mes el agujero era un poco mayor. Los intereses no descansaban.
          </p>
          <p>
            Lo que más le costó aceptar fue que no se trataba de esforzarse más, sino de reconocer
            que la situación era estructuralmente insolvente. Y que para eso existe una ley.
          </p>
        </>
      ),
    },
    {
      id: "el-proceso",
      title: "Cómo avanzó su caso con la Ley de Segunda Oportunidad",
      body: (
        <>
          <p>
            Cuando pidió un estudio gratuito de su situación, la conclusión fue clara: Sonia
            cumplía los requisitos de la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-7345">
              Ley de Segunda Oportunidad
            </ExtLink>
            . No tenía bienes de valor que pudieran liquidarse para cubrir la deuda, había actuado de
            buena fe y su insolvencia era real y documentable.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Análisis", desc: "Estudio gratuito de sus deudas y perfil como autónoma cesada" },
              { title: "Expediente", desc: "Recopilación de documentación del negocio y deudas pendientes" },
              { title: "Procedimiento", desc: "Tramitación judicial y paralización de reclamaciones" },
              { title: "Exoneración", desc: "Cancelación total de los 47.300 € y vida sin deuda" },
            ]}
          />
          <p>
            Si quieres entender qué condiciones se deben cumplir, lo explicamos en detalle en la
            guía de{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              requisitos para cancelar deudas con la Ley de Segunda Oportunidad
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Antes y después: lo que cambió en su vida",
      body: (
        <>
          <BeforeAfterSplit
            before={[
              "47.300 € de deuda imposible de asumir",
              "Llamadas y reclamaciones de proveedores",
              "Préstamos personales que crecían con intereses",
              "Incertidumbre y presión constante",
            ]}
            after={[
              "Deuda exonerada en su totalidad",
              "Fin de las reclamaciones judiciales",
              "Posibilidad de volver a emprender o emplearse",
              "Tranquilidad y control sobre su situación",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos-autonomos",
      title: "Lo que creía que la impedía acogerse (y no era verdad)",
      body: (
        <>
          <p>
            Como muchos autónomos, Sonia tenía dudas que la frenaron durante meses. Estas son las
            que más escuchamos cuando el perfil es el de un trabajador por cuenta propia que ha
            tenido que cerrar.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si cerré el negocio, ya no tengo derechos como autónomo",
                reality: "La ley protege a la persona física, no al negocio: puedes acogerte aunque ya no estés en activo",
              },
              {
                myth: "Las deudas con proveedores no se pueden cancelar",
                reality: "Las deudas privadas, incluidas las comerciales, entran en el procedimiento de exoneración",
              },
              {
                myth: "Tendré que esperar años para resolver esto",
                reality: "La mayoría de casos se resuelven en meses con la documentación en orden",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "vida-hoy",
      title: "Hoy, Sonia no debe nada",
      body: (
        <>
          <p>
            Sonia cerró el capítulo de su negocio y también el de su deuda. Hoy puede plantearse
            trabajar, ahorrar y mirar hacia adelante sin el peso de 47.300 € encima. Su historia no
            es la de alguien que fracasó: es la de alguien que encontró la salida legal que le
            correspondía.
          </p>
          <InlineCTA
            title="¿Cerraste tu actividad y arrastras deudas?"
            description="Analizamos tu situación gratis y te decimos si puedes exonerar tu deuda, sin compromiso."
            buttonLabel="Estudiar mi caso gratis"
          />
        </>
      ),
    },
  ],
};
