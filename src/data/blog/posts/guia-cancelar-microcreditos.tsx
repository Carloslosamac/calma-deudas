import {
  StatHighlights,
  ComparisonTable,
  ProcessTimeline,
  RequirementsChecklist,
  MythVsReality,
  WarningSignsList,
  BeforeAfterSplit,
  DocumentsChecklist,
  CostVsDebtBars,
  SuccessRateBar,
} from "@/components/blog/diagrams";
import {
  MicrocreditosBucle,
  TaeComparada,
  RutaSalidaSteps,
  CancelarDecisionTree,
} from "@/components/blog/diagrams/pillars";
import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-microcreditos.jpg";

export const guiaCancelarMicrocreditos: BlogPost = {
  slug: "guia-cancelar-microcreditos",
  category: "Microcréditos",
  title:
    "Cancelar microcréditos en 2026: la guía completa para salir del bucle",
  seoTitle: "Cancelar microcréditos 2026: sal del bucle (guía)",
  metaDescription:
    "Guía 2026 para cancelar microcréditos: por qué generan un bucle de deuda, cómo reclamar intereses abusivos, cuándo cancelar con la Ley de Segunda Oportunidad o reunificar, pasos y errores.",
  excerpt:
    "Los microcréditos rápidos disparan el coste con TAE altísimas y crean un bucle: pides uno para pagar otro. Esta guía explica cómo romperlo, cuándo se pueden reclamar los intereses y cuándo conviene cancelar o reunificar.",
  date: "20 junio 2026",
  readTime: "23 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["javier-ferrer", "marta-belmonte"],
  heroImage,
  heroAlt:
    "Persona ante el móvil con varias apps de préstamos rápidos y una espiral de deuda",
  keywords: [
    "cancelar microcréditos",
    "microcréditos 2026",
    "salir del bucle de microcréditos",
    "reclamar microcréditos",
    "préstamos rápidos deudas",
    "intereses abusivos microcrédito",
    "no puedo pagar microcréditos",
    "deudas mini préstamos",
    "TAE microcrédito",
    "Vivus Wonga Creditea deudas",
    "cancelar préstamos rápidos",
    "reunificar microcréditos",
  ],
  tldr:
    "Los microcréditos y préstamos rápidos aplican TAE muy altas y plazos cortos, lo que crea un bucle: pides uno para pagar otro y la deuda crece cada mes. Para salir hay que dejar de alimentar la rueda y elegir la vía legal correcta: reclamar si los intereses son abusivos, reunificar si tienes bienes que proteger, o cancelar con la Ley de Segunda Oportunidad si eres insolvente. El diagnóstico gratuito determina cuál te corresponde.",
  keyTakeaways: [
    "El microcrédito rápido es la deuda más cara: TAE que pueden dispararse muy por encima de cualquier crédito bancario.",
    "El patrón peligroso es el bucle: pedir un microcrédito nuevo para pagar el anterior.",
    "Si la TAE es abusiva, puedes reclamar y reducir o anular esos intereses.",
    "Si eres insolvente y no tienes bienes pagados de valor, la Ley de Segunda Oportunidad puede cancelar la deuda.",
    "Si tienes bienes pagados de valor, reunificar protege el patrimonio y baja cuota y total.",
    "Lo primero, siempre, es parar la rueda: no pedir más microcréditos mientras se resuelve.",
  ],
  sidebar: {
    ctaTitle: "¿Atrapado en el bucle de microcréditos?",
    ctaDescription:
      "Analizamos gratis tu caso y te decimos cómo salir: reclamar, reunificar o cancelar.",
    ctaLabel: "Analizar mi caso gratis",
    benefits: [
      "Paramos la rueda de la deuda",
      "Revisamos intereses reclamables",
      "Hasta 100% de la deuda cancelable",
      "Sin anticipos por adelantado",
    ],
  },
  howToSteps: [
    {
      name: "Parar la rueda",
      text: "Dejas de pedir nuevos microcréditos para no seguir alimentando la deuda.",
    },
    {
      name: "Diagnóstico gratuito",
      text: "Revisamos todas tus deudas, ingresos y bienes para elegir la vía correcta.",
    },
    {
      name: "Revisar intereses",
      text: "Comprobamos si la TAE de tus microcréditos es abusiva y reclamable.",
    },
    {
      name: "Elegir la vía",
      text: "Reclamación, reunificación o Ley de Segunda Oportunidad según tu situación.",
    },
    {
      name: "Resolución",
      text: "Cancelamos o reducimos la deuda y reconstruimos tu economía sin el agujero de las cuotas.",
    },
  ],
  faq: [
    {
      question: "¿Por qué los microcréditos generan tanta deuda?",
      answer:
        "Por la combinación de TAE muy altas y plazos cortos: la cuota y los intereses se comen el siguiente sueldo, y se acaba pidiendo otro microcrédito para cubrir el anterior. Así la deuda crece en bucle.",
    },
    {
      question: "¿Se pueden cancelar los microcréditos?",
      answer:
        "Sí. Según tu situación, mediante la Ley de Segunda Oportunidad (que puede cancelar la deuda si eres insolvente), reunificándolos en una sola cuota más baja, o reclamando si los intereses son abusivos.",
    },
    {
      question: "¿Puedo reclamar los intereses de un microcrédito?",
      answer:
        "Si la TAE es notablemente superior a la normal y desproporcionada, o el contrato no fue transparente, puede reclamarse su nulidad y reducir o anular esos intereses. Se analiza caso a caso.",
    },
    {
      question: "¿Qué pasa si no puedo pagar mis microcréditos?",
      answer:
        "Lo primero es no pedir más. Después, según tu insolvencia y tus bienes, se elige entre cancelar con la Ley de Segunda Oportunidad, reunificar o reclamar. No pagar y no hacer nada solo aumenta recargos y riesgo de embargo.",
    },
    {
      question: "¿Los microcréditos acaban en embargo?",
      answer:
        "Pueden hacerlo si el impago deriva en reclamación judicial. Por eso conviene actuar antes: la Ley de Segunda Oportunidad puede paralizar embargos por orden judicial.",
    },
    {
      question: "¿Salir del bucle es pagar más rápido?",
      answer:
        "No. Pagar más rápido sin cambiar de estrategia suele llevar a pedir otro microcrédito. Salir del bucle es cambiar de vía: reclamar, reunificar o cancelar.",
    },
    {
      question: "¿Puedo reunificar varios microcréditos?",
      answer:
        "Sí. Reunificar junta todos en una sola cuota negociada más baja y reduce el total, sin pedir un préstamo nuevo. Es buena opción si tienes ingresos y bienes que proteger.",
    },
    {
      question: "¿Los microcréditos figuran en ASNEF?",
      answer:
        "Sí, los impagos suelen anotarse en ficheros como ASNEF. Al cancelar o saldar la deuda, esas anotaciones acaban eliminándose.",
    },
    {
      question: "¿Cuánto cuesta resolver una deuda de microcréditos?",
      answer:
        "Depende de la vía y la complejidad. En Calma no cobramos anticipos por adelantado: primero analizamos tu caso y te decimos qué te conviene.",
    },
    {
      question: "¿Cuánto tarda en resolverse?",
      answer:
        "Reunificar se nota desde la primera cuota; una reclamación, semanas o meses; la Ley de Segunda Oportunidad, entre 6 y 18 meses según el juzgado.",
    },
  ],
  sections: [
    {
      id: "introduccion",
      title: "La guía completa para cancelar microcréditos en 2026",
      body: (
        <>
          <p>
            Esta es <strong>la guía más completa sobre microcréditos y préstamos rápidos en 2026</strong>:
            por qué generan un bucle de deuda casi imposible de romper pagando, cómo salir de verdad,
            cuándo se pueden reclamar los intereses y cuándo conviene cancelar con la Ley de Segunda
            Oportunidad o reunificar.
          </p>
          <p>
            Si tienes préstamos de Vivus, Wonga, Creditea, MoneyMan, Préstamo10 u otras apps de
            dinero rápido y cada mes te cuesta más, no estás solo y no es solo cuestión de fuerza de
            voluntad: el producto está diseñado para que sigas pidiendo.
          </p>
          <StatHighlights
            title="Los microcréditos, en cifras"
            subtitle="Datos orientativos del sector para entender el problema."
            stats={[
              { value: "TAE altísima", label: "frente al banco", hint: "la deuda más cara" },
              { value: "El bucle", label: "pides uno para pagar otro", hint: "la deuda crece" },
              { value: "3 vías", label: "para salir", hint: "reclamar, reunificar, cancelar" },
            ]}
          />
        </>
      ),
    },
    {
      id: "el-bucle",
      title: "El bucle del microcrédito: por qué no sales pagando",
      body: (
        <>
          <p>
            El microcrédito promete dinero en minutos, pero con un coste enorme y un plazo muy corto.
            Cuando llega el vencimiento, la cuota más los intereses se comen el sueldo, así que pides
            otro para cubrirlo. Ese es el bucle.
          </p>
          <MicrocreditosBucle />
          <p>
            La clave es entender que no es un problema de pagar más rápido, sino de estructura:
            mientras sigas alimentando la rueda, la deuda crece. Salir exige cambiar de estrategia.
          </p>
          <InlineCTA
            title="¿Llevas meses pidiendo para pagar?"
            description="Te ayudamos a parar la rueda y elegir la vía para salir de verdad."
            buttonLabel="Quiero salir del bucle"
          />
        </>
      ),
    },
    {
      id: "coste-real",
      title: "Por qué el microcrédito es la deuda más cara",
      body: (
        <>
          <p>
            Comparado con un préstamo bancario o incluso con una tarjeta, el microcrédito rápido
            dispara el coste. La TAE incluye intereses y todas las comisiones, y en estos productos
            puede ser desorbitada.
          </p>
          <TaeComparada />
          <p>
            Esa diferencia de coste es justamente lo que, cuando es desproporcionado, puede
            reclamarse para reducir o anular los intereses.
          </p>
        </>
      ),
    },
    {
      id: "vias",
      title: "Las vías para cancelar o reducir tus microcréditos",
      body: (
        <>
          <p>
            No hay una única solución: la correcta depende de si eres insolvente, de si tienes bienes
            pagados de valor y de si los intereses son abusivos.
          </p>
          <CancelarDecisionTree />
          <ul>
            <li>
              <strong>Reclamar:</strong> si la TAE es abusiva, se reduce o anula el interés.
            </li>
            <li>
              <strong>Reunificar:</strong> si tienes ingresos y bienes que proteger, juntas todo en
              una cuota más baja.{" "}
              <InternalLink to="/blog/guia-reunificar-deudas">Ver guía de reunificación</InternalLink>.
            </li>
            <li>
              <strong>Cancelar con la Ley de Segunda Oportunidad:</strong> si eres insolvente y sin
              bienes pagados de valor, puede cancelarse la deuda.{" "}
              <InternalLink to="/blog/guia-ley-segunda-oportunidad">Ver guía LSO</InternalLink>.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "ruta-salida",
      title: "Tu ruta de salida, paso a paso",
      body: (
        <>
          <RutaSalidaSteps />
          <ProcessTimeline
            steps={[
              { title: "Parar", desc: "Dejas de pedir microcréditos" },
              { title: "Diagnóstico", desc: "Analizamos tu caso gratis" },
              { title: "Vía", desc: "Reclamar, reunificar o cancelar" },
              { title: "Salida", desc: "Deuda resuelta y economía sana" },
            ]}
          />
        </>
      ),
    },
    {
      id: "reclamar",
      title: "Cuándo y cómo reclamar los intereses de un microcrédito",
      body: (
        <>
          <p>
            Igual que con las{" "}
            <InternalLink to="/blog/guia-cancelar-revolving">tarjetas revolving</InternalLink>, los
            microcréditos con TAE desproporcionada pueden reclamarse por usura o por falta de
            transparencia.
          </p>
          <RequirementsChecklist
            items={[
              "La TAE es notablemente superior a la normal del crédito al consumo",
              "El coste es desproporcionado respecto al importe y plazo",
              "O el contrato no informó con claridad de las condiciones",
              "Conservas el contrato o los movimientos para acreditarlo",
            ]}
          />
          <MythVsReality
            rows={[
              {
                myth: "Un microcrédito es tan pequeño que no se puede reclamar",
                reality: "Lo que importa es si el interés es abusivo, no el importe",
              },
              {
                myth: "Si firmé, ya no hay nada que hacer",
                reality: "Un contrato con usura o sin transparencia puede anularse",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "senales",
      title: "Señales de que los microcréditos te superan",
      body: (
        <WarningSignsList
          title="Señales de alerta"
          subtitle="Si te reconoces en dos o más, conviene actuar ya."
          signs={[
            { title: "Pides uno para pagar otro", desc: "El patrón más claro del bucle" },
            { title: "Varias apps de préstamos a la vez", desc: "Deudas paralelas que se solapan" },
            { title: "La cuota se come el sueldo", desc: "No llegas a fin de mes sin pedir más" },
            { title: "Recargos por impago", desc: "La deuda crece con comisiones y penalizaciones" },
          ]}
        />
      ),
    },
    {
      id: "documentacion",
      title: "Documentación para resolver tus microcréditos",
      body: (
        <DocumentsChecklist
          title="Documentación habitual"
          subtitle="Te ayudamos a reunir lo que falte, incluso a solicitarlo a la entidad."
          items={[
            "DNI en vigor",
            "Contratos de cada microcrédito",
            "Historial de movimientos y cuotas pagadas",
            "Últimas nóminas o ingresos",
            "Notificaciones de impago o recargo (si las hay)",
          ]}
        />
      ),
    },
    {
      id: "comparativa",
      title: "Reunificar vs. cancelar tus microcréditos",
      body: (
        <>
          <ComparisonTable
            title="Reunificar vs. Segunda Oportunidad"
            subtitle="Según tengas o no bienes pagados de valor y capacidad de pago."
            optionA="Reunificar"
            optionB="Segunda Oportunidad"
            rows={[
              { label: "Cancela el 100% de la deuda", a: "No, la reduce", b: "Sí (con requisitos)", highlight: "b" },
              { label: "Protege bienes pagados de valor", a: "Sí", b: "Puede exigir liquidarlos", highlight: "a" },
              { label: "Requiere insolvencia", a: "No siempre", b: "Sí", highlight: "a" },
              { label: "Una sola cuota más baja", a: "Sí", b: "Solo con plan de pagos", highlight: "a" },
            ]}
          />
          <SuccessRateBar
            title="Cómo suelen resolverse estos casos"
            subtitle="Distribución orientativa según la vía elegida."
            segments={[
              { label: "Deuda cancelada o muy reducida", value: 72, color: "hsl(145 60% 35%)" },
              { label: "Reorganizada en cuota asumible", value: 22, color: "hsl(84 75% 55%)" },
              { label: "Requiere otra vía", value: 6, color: "hsl(0 70% 55%)" },
            ]}
          />
        </>
      ),
    },
    {
      id: "vida-despues",
      title: "Qué cambia cuando sales del bucle",
      body: (
        <BeforeAfterSplit
          before={[
            "Pides un préstamo para pagar otro",
            "El sueldo se va en cuotas e intereses",
            "Varias apps reclamando a la vez",
            "Angustia cada fin de mes",
          ]}
          after={[
            "Dejas de pedir microcréditos",
            "Deuda cancelada o reducida",
            "Una sola solución, no diez deudas",
            "Recuperas el control de tu dinero",
          ]}
        />
      ),
    },
    {
      id: "costes",
      title: "Cuánto cuesta resolverlo y qué ganas",
      body: (
        <>
          <p>
            Lo que dejas de pagar en intereses y recargos suele superar de largo el coste de
            resolverlo legalmente. Y en Calma no cobramos anticipos por adelantado.
          </p>
          <CostVsDebtBars
            title="Coste de resolverlo vs. deuda que dejas atrás"
            subtitle="Ejemplo orientativo basado en casos reales."
          />
        </>
      ),
    },
    {
      id: "errores",
      title: "Errores frecuentes con los microcréditos",
      body: (
        <>
          <ul>
            <li>Pedir un microcrédito nuevo para pagar el anterior.</li>
            <li>Pagar solo lo mínimo y renovar el préstamo una y otra vez.</li>
            <li>No revisar si los intereses son reclamables.</li>
            <li>Ignorar las notificaciones hasta que llega la reclamación judicial.</li>
            <li>Elegir la vía equivocada sin un diagnóstico previo.</li>
          </ul>
          <InlineCTA
            title="¿Quieres salir del bucle de una vez?"
            description="Te damos un plan claro: reclamar, reunificar o cancelar, según tu caso."
            buttonLabel="Pedir mi diagnóstico gratis"
          />
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre cancelar microcréditos",
      body: (
        <>
          <p>Profundiza en las dudas más concretas sobre los microcréditos:</p>
          <ContentHub
            groups={[
              {
                angle: "Entender el problema",
                description: "Por qué los microcréditos generan tanta deuda.",
                items: [
                  { title: "Por qué los microcréditos crean un bucle de deuda" },
                  { title: "Qué TAE es abusiva en un microcrédito" },
                  { title: "Microcréditos y ASNEF: qué pasa con los impagos", to: "/blog/salir-asnef" },
                  { title: "Qué pasa si no pago un microcrédito" },
                ],
              },
              {
                angle: "Salir del bucle",
                description: "Las vías para cancelar o reducir la deuda.",
                items: [
                  { title: "Cancelar microcréditos con la Ley de Segunda Oportunidad", to: "/blog/cancelar-microcreditos" },
                  { title: "Reunificar varios microcréditos", to: "/blog/guia-reunificar-deudas" },
                  { title: "Reclamar intereses de un microcrédito", to: "/blog/guia-cancelar-revolving" },
                  { title: "Cancelar deudas: elegir la vía correcta", to: "/blog/guia-cancelar-deudas" },
                ],
              },
              {
                angle: "Consecuencias",
                description: "Embargos, juicios y recuperación.",
                items: [
                  { title: "Parar embargos por microcréditos", to: "/blog/embargos-segunda-oportunidad" },
                  { title: "Juicio monitorio por un microcrédito", to: "/blog/juicio-monitorio-deuda" },
                  { title: "Microcréditos siendo autónomo", to: "/blog/autonomos-con-deudas" },
                  { title: "Vida después de salir de los microcréditos", to: "/blog/vida-despues-deuda" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y te decimos cómo salir del bucle de microcréditos."
            buttonLabel="Analizar mi caso"
          />
        </>
      ),
    },
    {
      id: "fuentes",
      title: "Fuentes y referencias",
      body: (
        <>
          <p>
            Esta guía está elaborada por el equipo legal de Calma. Para el marco normativo nos
            apoyamos en fuentes oficiales:
          </p>
          <ul>
            <li>
              <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>: información al cliente
              bancario y tipos medios del crédito al consumo.
            </li>
            <li>
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
                Texto Refundido de la Ley Concursal
              </ExtLink>{" "}
              (Ley de Segunda Oportunidad).
            </li>
          </ul>
          <p>
            <em>
              Aviso: esta guía es informativa y no sustituye el asesoramiento legal personalizado.
              Cada caso debe analizarse de forma individual.
            </em>
          </p>
        </>
      ),
    },
  ],
};