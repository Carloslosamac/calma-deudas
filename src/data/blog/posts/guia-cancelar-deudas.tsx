import {
  StatHighlights,
  ComparisonTable,
  ProcessTimeline,
  RequirementsChecklist,
  MythVsReality,
  WarningSignsList,
  BeforeAfterSplit,
  DocumentsChecklist,
  SuccessRateBar,
  RiskMatrix,
  CostVsDebtBars,
  DebtTypesDonut,
} from "@/components/blog/diagrams";
import {
  CancelarDecisionTree,
  InsolvenciaBienesMatrix,
  ReunificarVsRefinanciar,
} from "@/components/blog/diagrams/pillars";
import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-cancelar-deudas.jpg";

export const guiaCancelarDeudas: BlogPost = {
  slug: "guia-cancelar-deudas",
  category: "Cancelar deudas",
  title:
    "Cómo cancelar deudas en 2026: la guía completa para elegir la vía correcta",
  seoTitle: "Cancelar deudas 2026: qué vía elegir (guía)",
  metaDescription:
    "Guía 2026 para cancelar deudas: cómo saber si te conviene la Ley de Segunda Oportunidad, reunificar o reclamar, requisitos, qué deudas se cancelan, costes, pasos y errores.",
  excerpt:
    "Cancelar deudas no es una sola cosa: según tu situación, la vía correcta es la Ley de Segunda Oportunidad, reunificar o reclamar intereses abusivos. Esta guía te ayuda a elegir bien y explica cada camino paso a paso.",
  date: "20 junio 2026",
  readTime: "24 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["marta-belmonte", "javier-ferrer"],
  heroImage,
  heroAlt:
    "Persona rompiendo simbólicamente un documento de deuda con expresión de alivio",
  keywords: [
    "cancelar deudas",
    "cancelar deudas 2026",
    "cómo cancelar deudas",
    "eliminar deudas legalmente",
    "salir de deudas",
    "quitar deudas",
    "ley de segunda oportunidad",
    "reunificar deudas",
    "reclamar intereses abusivos",
    "cancelar deudas sin pagar",
    "exoneración del pasivo insatisfecho",
    "deudas con bancos y financieras",
  ],
  tldr:
    "Cancelar deudas tiene tres vías principales según tu situación: si eres insolvente y no tienes bienes pagados de valor, la Ley de Segunda Oportunidad puede cancelar hasta el 100% de la deuda cancelable; si eres insolvente pero tienes una casa o un bien pagado de valor, suele convenir reunificar (negociar para bajar cuota y total sin perder el bien); y si la deuda es baja y los intereses son abusivos, la vía puede ser reclamar. El primer paso siempre es un análisis gratuito que determina cuál es tu camino real.",
  keyTakeaways: [
    "No hay una única forma de cancelar deudas: la vía correcta depende de tu insolvencia, tus bienes y el tipo de deuda.",
    "Insolvente + sin bienes pagados de valor → Ley de Segunda Oportunidad (cancela la deuda).",
    "Insolvente + con bienes pagados de valor → reunificar (baja cuota y total sin perder el bien).",
    "Deuda baja + intereses abusivos → reclamación (anular intereses y recuperar lo pagado de más).",
    "La Ley de Segunda Oportunidad puede paralizar embargos y cancelar deudas con bancos, financieras y particulares.",
    "El diagnóstico es individual y gratuito: ahí se decide, con números reales, qué te conviene.",
    "50 artículos por situación al final de la guía para ir directo a tu caso.",
  ],
  sidebar: {
    ctaTitle: "¿Se pueden cancelar tus deudas?",
    ctaDescription:
      "Analizamos gratis tu caso y te decimos qué vía cancela o reduce tu deuda de verdad.",
    ctaLabel: "Analizar mi caso gratis",
    benefits: [
      "Diagnóstico gratuito y sin compromiso",
      "Hasta 100% de la deuda cancelable",
      "Sin anticipos por adelantado",
      "Abogados especializados",
    ],
  },
  howToSteps: [
    {
      name: "Diagnóstico gratuito",
      text: "Estudiamos tus deudas, ingresos, gastos y bienes para identificar la vía que cancela o reduce más tu deuda.",
    },
    {
      name: "Elección de la vía",
      text: "Decidimos entre Ley de Segunda Oportunidad, reunificación o reclamación según tu situación concreta.",
    },
    {
      name: "Preparación del caso",
      text: "Reunimos la documentación y preparamos el expediente o la estrategia de negociación.",
    },
    {
      name: "Tramitación",
      text: "Iniciamos el procedimiento judicial, la negociación o la reclamación, según corresponda.",
    },
    {
      name: "Resolución",
      text: "Cancelación, reducción o devolución, y acompañamiento hasta que tu economía vuelve a respirar.",
    },
  ],
  faq: [
    {
      question: "¿De verdad se pueden cancelar las deudas legalmente?",
      answer:
        "Sí. La Ley de Segunda Oportunidad permite a particulares y autónomos de buena fe e insolventes cancelar las deudas que no pueden pagar mediante la Exoneración del Pasivo Insatisfecho. Otras vías reducen la deuda (reunificar) o anulan intereses abusivos (reclamar).",
    },
    {
      question: "¿Cómo sé qué vía me conviene?",
      answer:
        "Depende de tres factores: si eres insolvente, si tienes bienes pagados de valor y qué tipo de deuda tienes. Insolvente sin bienes → Segunda Oportunidad; insolvente con bienes → reunificar; deuda baja con usura → reclamar. El diagnóstico gratuito lo confirma con tus números.",
    },
    {
      question: "¿Qué deudas se pueden cancelar?",
      answer:
        "La mayoría de deudas con bancos, financieras, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites de exoneración fijados por ley.",
    },
    {
      question: "¿Puedo cancelar deudas sin perder mi casa?",
      answer:
        "A veces sí. Si tienes una vivienda pagada de valor, la reunificación suele proteger ese bien; en la Ley de Segunda Oportunidad, según el caso y la hipoteca, también puede conservarse. Se analiza individualmente antes de empezar.",
    },
    {
      question: "¿Cancelar deudas paraliza los embargos?",
      answer:
        "La Ley de Segunda Oportunidad puede suspender embargos y ejecuciones en curso por orden judicial, a menudo antes de la resolución final. Lo vemos en detalle en la guía de embargos.",
    },
    {
      question: "¿Cuánto tarda en cancelarse una deuda?",
      answer:
        "Con la Ley de Segunda Oportunidad, entre 6 y 18 meses según el juzgado. La reunificación se nota desde la primera cuota única. Una reclamación depende de si hay acuerdo o juicio.",
    },
    {
      question: "¿Cancelar deudas me deja en ASNEF para siempre?",
      answer:
        "No. Al cancelar o saldar la deuda, las anotaciones en ficheros como ASNEF acaban eliminándose. De hecho, resolver la deuda es la vía para limpiar el historial.",
    },
    {
      question: "¿Cuánto cuesta cancelar deudas?",
      answer:
        "Depende de la vía y la complejidad del caso. En Calma no cobramos anticipos por adelantado: primero analizamos tu caso y te decimos si te conviene. Lo cancelado suele superar con creces el coste.",
    },
    {
      question: "¿Y si tengo deudas con Hacienda o la Seguridad Social?",
      answer:
        "La deuda pública tiene reglas y límites propios. Una parte puede exonerarse o aplazarse; se gestiona de forma específica dentro de tu estrategia global.",
    },
    {
      question: "¿Cancelar deudas es seguro?",
      answer:
        "Sí, si se hace por la vía legal y con abogados. Desconfía de quien te garantice cancelar todo sin analizar tu caso o te pida grandes pagos por adelantado.",
    },
  ],
  sections: [
    {
      id: "introduccion",
      title: "La guía completa para cancelar tus deudas en 2026",
      body: (
        <>
          <p>
            Esta es <strong>la guía más completa y actualizada para cancelar deudas en 2026</strong>.
            Aquí no vas a encontrar una promesa mágica, sino algo más útil: un mapa claro de las
            vías reales para cancelar o reducir tu deuda y cómo saber cuál te corresponde según tu
            situación.
          </p>
          <p>
            «Cancelar deudas» puede significar tres cosas muy distintas: cancelarlas por completo con
            la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            , reducirlas y reorganizarlas con una{" "}
            <InternalLink to="/blog/guia-reunificar-deudas">reunificación</InternalLink>, o anular
            intereses abusivos con una reclamación. Elegir bien marca la diferencia entre salir de
            verdad o seguir atrapado.
          </p>
          <StatHighlights
            title="Cancelar deudas, en cifras"
            subtitle="Datos orientativos del sector para situar la decisión."
            stats={[
              { value: "Hasta 100%", label: "de la deuda cancelable", hint: "con la Ley de Segunda Oportunidad" },
              { value: "3 vías", label: "según tu situación", hint: "cancelar, reunificar, reclamar" },
              { value: "0 €", label: "de anticipos", hint: "primero analizamos tu caso" },
            ]}
          />
        </>
      ),
    },
    {
      id: "tres-vias",
      title: "Las tres vías para cancelar deudas (y cuál es la tuya)",
      body: (
        <>
          <p>
            La pregunta no es «¿se pueden cancelar mis deudas?», sino «¿por qué vía?». Este es el
            triage que usamos para decidir, en función de dos factores: si puedes pagar y si tienes
            bienes pagados de valor.
          </p>
          <CancelarDecisionTree />
          <p>
            En resumen: <strong>insolvente y sin bienes pagados</strong> → Ley de Segunda
            Oportunidad; <strong>insolvente con bienes pagados de valor</strong> → reunificar para no
            perderlos; <strong>deuda baja con intereses abusivos</strong> → reclamar.
          </p>
          <InlineCTA
            title="¿No sabes en qué grupo encajas?"
            description="Cuéntanos tu situación y te decimos qué vía cancela o reduce más tu deuda."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
    {
      id: "matriz",
      title: "Insolvencia y bienes: la matriz que decide tu vía",
      body: (
        <>
          <p>
            Cruzar dos preguntas —¿eres insolvente? y ¿tienes bienes pagados de valor?— da una
            respuesta sorprendentemente clara en la mayoría de casos.
          </p>
          <InsolvenciaBienesMatrix />
          <p>
            Tener una casa o un terreno pagado no es malo, pero cambia la estrategia: en la práctica
            puede bloquear la exoneración total, y por eso muchas personas con patrimonio eligen
            reunificar.
          </p>
        </>
      ),
    },
    {
      id: "segunda-oportunidad",
      title: "Vía 1: cancelar con la Ley de Segunda Oportunidad",
      body: (
        <>
          <p>
            La{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>{" "}
            es la herramienta más potente: permite cancelar hasta el 100% de la deuda cancelable
            cuando eres insolvente y de buena fe. Es la vía cuando no tienes bienes pagados de valor
            que proteger.
          </p>
          <RequirementsChecklist
            items={[
              "Tener deudas que no puedes pagar (insolvencia)",
              "Actuar de buena fe (no haber ocultado bienes ni causado la insolvencia con dolo)",
              "No haber sido condenado por determinados delitos económicos en los últimos años",
              "No tener bienes pagados de valor que la justicia obligue a liquidar",
            ]}
          />
          <SuccessRateBar
            title="Resultados típicos de la Ley de Segunda Oportunidad"
            subtitle="Distribución orientativa en expedientes bien preparados."
            segments={undefined}
          />
        </>
      ),
    },
    {
      id: "reunificar",
      title: "Vía 2: reducir la deuda reunificando",
      body: (
        <>
          <p>
            Si eres insolvente pero tienes una casa o un bien pagado de valor, la{" "}
            <InternalLink to="/blog/guia-reunificar-deudas">reunificación</InternalLink> suele ser tu
            mejor opción: negociamos con tus acreedores para dejar una sola cuota más baja y reducir
            el total, sin pedir un préstamo nuevo ni poner tu casa como garantía.
          </p>
          <ReunificarVsRefinanciar />
          <p>
            Ojo con la trampa habitual: que te ofrezcan «reunificar» mediante un préstamo nuevo con
            hipoteca. Eso es refinanciar y casi siempre encarece la deuda.
          </p>
        </>
      ),
    },
    {
      id: "reclamar",
      title: "Vía 3: reclamar intereses y comisiones abusivos",
      body: (
        <>
          <p>
            Cuando la deuda es relativamente baja pero los intereses son abusivos (típico en{" "}
            <InternalLink to="/blog/guia-cancelar-revolving">tarjetas revolving</InternalLink> y
            algunos{" "}
            <InternalLink to="/blog/guia-cancelar-microcreditos">microcréditos</InternalLink>), la
            vía no es cancelar todo, sino reclamar: anular esos intereses y recuperar lo pagado de
            más.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si ya pagué intereses, ese dinero está perdido",
                reality: "Si la TAE era abusiva, puedes reclamar y recuperar lo pagado de más",
              },
              {
                myth: "Reclamar es lento y caro siempre",
                reality: "Muchas reclamaciones se resuelven sin llegar a juicio",
              },
              {
                myth: "No vale la pena por deudas pequeñas",
                reality: "En deudas con usura, anular intereses puede dejar la deuda casi a cero",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "tipos-deuda",
      title: "Qué deudas se pueden cancelar y cuáles no",
      body: (
        <>
          <p>
            La mayoría de las deudas privadas son cancelables o negociables. La deuda pública tiene
            límites. Este es el reparto típico de las deudas que vemos:
          </p>
          <DebtTypesDonut
            title="Tipos de deuda más habituales"
            subtitle="Composición orientativa de los casos que analizamos."
            segments={undefined}
          />
          <ul>
            <li>
              <strong>Cancelables o negociables:</strong> préstamos personales, tarjetas, revolving,
              microcréditos, financieras, descubiertos, deudas con proveedores y con particulares.
            </li>
            <li>
              <strong>Con límites (deuda pública):</strong> Hacienda y Seguridad Social, con un tope
              de exoneración fijado por ley.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "senales",
      title: "Señales de que tu deuda necesita una solución legal",
      body: (
        <>
          <WarningSignsList
            title="Señales de que la deuda ya no es manejable"
            subtitle="Si te reconoces en dos o más, conviene actuar pronto."
            signs={undefined}
          />
          <p>
            Cuanto antes actúes, más opciones tienes: paralizar embargos a tiempo, evitar más
            recargos y negociar desde una posición más fuerte.
          </p>
        </>
      ),
    },
    {
      id: "paso-a-paso",
      title: "Cómo cancelar tus deudas, paso a paso",
      body: (
        <>
          <ProcessTimeline
            steps={[
              { title: "Diagnóstico", desc: "Analizamos tu caso gratis" },
              { title: "Vía", desc: "Elegimos cancelar, reunificar o reclamar" },
              { title: "Tramitación", desc: "Procedimiento o negociación" },
              { title: "Resolución", desc: "Deuda cancelada o reducida" },
            ]}
          />
          <p>
            En cada vía, el primer paso es el mismo: un diagnóstico honesto. No tiene sentido empezar
            un procedimiento si otra vía te conviene más.
          </p>
        </>
      ),
    },
    {
      id: "documentacion",
      title: "Documentación para empezar",
      body: (
        <DocumentsChecklist
          title="Documentación habitual"
          subtitle="Te acompañamos en cada paso; no necesitas tenerlo todo perfecto de inicio."
          items={[
            "DNI en vigor",
            "Últimas nóminas o justificantes de ingresos",
            "Contratos de préstamos, tarjetas y microcréditos",
            "Notificaciones de embargo o impago (si las hay)",
            "Vida laboral y certificado de empadronamiento",
            "Escrituras o documentos de bienes a tu nombre",
          ]}
        />
      ),
    },
    {
      id: "costes",
      title: "Cuánto cuesta cancelar deudas",
      body: (
        <>
          <p>
            El coste depende de la vía y de la complejidad de tu caso, pero la comparación importante
            es esta: lo que cancelas o dejas de pagar suele superar con creces la inversión en
            resolverlo legalmente.
          </p>
          <CostVsDebtBars
            title="Coste del proceso vs. deuda que dejas atrás"
            subtitle="Ejemplo orientativo basado en casos reales."
          />
          <p>
            En Calma no cobramos anticipos por adelantado: primero analizamos tu caso y solo
            seguimos si de verdad te conviene.
          </p>
        </>
      ),
    },
    {
      id: "comparativa",
      title: "Comparativa rápida de las tres vías",
      body: (
        <>
          <ComparisonTable
            title="Cancelar vs. reunificar"
            subtitle="Las dos vías más habituales para personas con deudas."
            optionA="Reunificar"
            optionB="Segunda Oportunidad"
            rows={[
              { label: "Cancela el 100% de la deuda", a: "No, la reduce", b: "Sí (con requisitos)", highlight: "b" },
              { label: "Protege bienes pagados de valor", a: "Sí", b: "Puede exigir liquidarlos", highlight: "a" },
              { label: "Paraliza embargos", a: "No por sí sola", b: "Sí, por orden judicial", highlight: "b" },
              { label: "Requiere insolvencia", a: "No siempre", b: "Sí", highlight: "a" },
              { label: "Pasa por el juzgado", a: "No", b: "Sí", highlight: "a" },
            ]}
          />
          <RiskMatrix
            title="Qué hacer según tu situación"
            axes={{ x: "¿Tienes bienes pagados de valor?", y: "¿Puedes pagar algo cada mes?" }}
            cells={[
              { q: 1, label: "Reunificar: proteges el bien y pagas menos", tone: "good" },
              { q: 2, label: "Reunificar o plan de pagos a medida", tone: "warn" },
              { q: 3, label: "Segunda Oportunidad con plan de pagos", tone: "warn" },
              { q: 4, label: "Segunda Oportunidad: exoneración total", tone: "bad" },
            ]}
          />
        </>
      ),
    },
    {
      id: "vida-despues",
      title: "Qué cambia cuando cancelas tus deudas",
      body: (
        <>
          <BeforeAfterSplit
            before={[
              "Llamadas y cartas de cobro constantes",
              "Embargos sobre la nómina o cuentas",
              "Deuda que crece cada mes",
              "Sin acceso a financiación",
            ]}
            after={[
              "Fin de las reclamaciones de cobro",
              "Embargos paralizados o levantados",
              "Deuda cancelada o muy reducida",
              "Empiezas de nuevo, con calma",
            ]}
          />
          <p>
            La{" "}
            <InternalLink to="/blog/vida-despues-deuda">vida después de la deuda</InternalLink> es el
            verdadero objetivo: recuperar el control y volver a respirar.
          </p>
        </>
      ),
    },
    {
      id: "errores",
      title: "Errores frecuentes al intentar cancelar deudas",
      body: (
        <>
          <ul>
            <li>Pedir más créditos para tapar los anteriores en vez de buscar una solución legal.</li>
            <li>Elegir la vía equivocada por desconocimiento (reunificar cuando encajas en Segunda Oportunidad o al revés).</li>
            <li>Pagar intereses abusivos sin comprobar si son reclamables.</li>
            <li>Firmar con quien promete cancelar todo sin analizar el caso o cobra grandes anticipos.</li>
            <li>Esperar demasiado y dejar que avancen los embargos.</li>
          </ul>
          <InlineCTA
            title="¿Quieres saber cuál es tu vía?"
            description="Te damos un diagnóstico claro y honesto, sin compromiso y sin anticipos."
            buttonLabel="Pedir mi diagnóstico gratis"
          />
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre cancelar deudas",
      body: (
        <>
          <p>Profundiza en las dudas más concretas sobre cómo cancelar deudas:</p>
          <ContentHub
            groups={[
              {
                angle: "Elegir la vía correcta",
                description: "Cómo saber qué camino cancela o reduce más tu deuda.",
                items: [
                  { title: "Ley de Segunda Oportunidad: cómo cancela tus deudas", to: "/blog/guia-ley-segunda-oportunidad" },
                  { title: "Reunificar deudas: cuándo conviene", to: "/blog/guia-reunificar-deudas" },
                  { title: "Requisitos para cancelar deudas en 2026", to: "/blog/cancelar-deudas-requisitos" },
                  { title: "Cancelar deudas con bienes a tu nombre" },
                ],
              },
              {
                angle: "Por tipo de deuda",
                description: "Cómo se cancela cada tipo de deuda.",
                items: [
                  { title: "Cancelar tarjetas revolving", to: "/blog/guia-cancelar-revolving" },
                  { title: "Cancelar microcréditos", to: "/blog/guia-cancelar-microcreditos" },
                  { title: "Deudas con Hacienda y Seguridad Social", to: "/blog/deudas-hacienda-seguridad-social" },
                  { title: "Cancelar deudas siendo autónomo", to: "/blog/autonomos-con-deudas" },
                ],
              },
              {
                angle: "Embargos y consecuencias",
                description: "Qué pasa con embargos, ASNEF y tu economía.",
                items: [
                  { title: "Parar embargos al cancelar deudas", to: "/blog/embargos-segunda-oportunidad" },
                  { title: "Salir de ASNEF tras cancelar la deuda", to: "/blog/salir-asnef" },
                  { title: "Juicio monitorio por una deuda: qué hacer", to: "/blog/juicio-monitorio-deuda" },
                  { title: "Vida después de cancelar las deudas", to: "/blog/vida-despues-deuda" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y te decimos exactamente qué vía cancela o reduce tu deuda."
            buttonLabel="Analizar mi caso"
          />
        </>
      ),
    },
    {
      id: "hub-50",
      title: "50 artículos sobre cómo cancelar deudas ordenados por situación",
      body: (
        <>
          <p>
            Cada caso es distinto. No es lo mismo que te preocupe ahora un embargo activo,
            que tu duda sea si perderás la vivienda al cancelar la deuda, o si tu deuda de
            Hacienda entra en la exoneración. Aquí abajo tienes los 50 ángulos más buscados
            sobre cómo cancelar deudas, ordenados por situación, para que vayas directo a lo
            que te toca.
          </p>
          <p>
            Los que están enlazados ya puedes leerlos. El resto los iremos publicando para
            responder, una por una, a las preguntas que más nos llegan al equipo legal.
          </p>
          <ContentHub
            groups={[
              {
                angle: "Elegir la vía correcta para cancelar tus deudas",
                description: "Cómo saber qué camino cancela o reduce más tu deuda en tu situación real.",
                items: [
                  { title: "Requisitos para cancelar deudas en 2026: lista actualizada", to: "/blog/cancelar-deudas-requisitos" },
                  { title: "Cómo saber si puedes cancelar tus deudas: test rápido 2026" },
                  { title: "Ley de Segunda Oportunidad vs. reunificar: cuál cancela más deuda" },
                  { title: "Cancelar deudas siendo solvente: ¿existe esa opción?" },
                  { title: "Cancelar deudas en pareja: expediente conjunto o separado" },
                ],
              },
              {
                angle: "Requisitos y elegibilidad para cancelar deudas",
                description: "Qué se exige realmente para acceder a la cancelación legal.",
                items: [
                  { title: "Insolvencia actual vs. inminente para cancelar deudas" },
                  { title: "Buena fe del deudor: qué se exige para cancelar deudas" },
                  { title: "Antecedentes penales: ¿me impiden cancelar mis deudas?" },
                  { title: "Deuda mínima y máxima para cancelar por vía legal" },
                  { title: "Cuántas veces se puede cancelar deudas legalmente en la vida" },
                ],
              },
              {
                angle: "Cancelar deudas según el tipo de deuda",
                description: "Matices por tipo de crédito, tarjeta o deuda pública.",
                items: [
                  { title: "Cancelar microcréditos rápidos y online", to: "/blog/guia-cancelar-microcreditos" },
                  { title: "Cancelar tarjetas revolving con intereses abusivos", to: "/blog/guia-cancelar-revolving" },
                  { title: "Cancelar deudas con Hacienda y Seguridad Social", to: "/blog/deudas-hacienda-seguridad-social" },
                  { title: "Cancelar deudas con particulares y familiares" },
                  { title: "Cancelar avales personales y fianzas al cancelar deudas" },
                ],
              },
              {
                angle: "Cancelar deudas según el acreedor",
                description: "Cómo se cancela según con quién tengas la deuda.",
                items: [
                  { title: "Cancelar deudas con Cofidis, Wizink y Cetelem" },
                  { title: "Cancelar deudas con BBVA, Santander y CaixaBank" },
                  { title: "Cancelar deudas con financieras de coche" },
                  { title: "Cancelar deudas cedidas a fondos (Lindorff, Intrum, Axactor)" },
                  { title: "Cancelar deudas con compañías de suministros y telefonía" },
                ],
              },
              {
                angle: "Cancelar deudas con bienes en juego",
                description: "Qué pasa con vivienda, coche, ahorros o herencias al cancelar.",
                items: [
                  { title: "Cancelar deudas sin perder la vivienda habitual" },
                  { title: "Cancelar deudas cuando tienes coche financiado" },
                  { title: "Cancelar deudas con una segunda vivienda o herencia" },
                  { title: "Cancelar deudas con plan de pensiones y ahorros" },
                  { title: "Cancelar deudas si tu pareja tiene bienes a su nombre" },
                ],
              },
              {
                angle: "Cancelar deudas siendo autónomo o exempresario",
                description: "Cómo aplica la cancelación cuando has facturado o tenido sociedad.",
                items: [
                  { title: "Cancelar deudas siendo autónomo activo", to: "/blog/autonomos-con-deudas" },
                  { title: "Cerrar la SL y cancelar tus deudas personales después" },
                  { title: "Cancelar deudas de IVA acumulado del autónomo" },
                  { title: "Cancelar avales de administrador de sociedad" },
                  { title: "Cancelar deudas y volver a facturar sin bloqueos" },
                ],
              },
              {
                angle: "Embargos, ASNEF y ficheros al cancelar deudas",
                description: "Cómo se paran los embargos y se limpia el rastro financiero.",
                items: [
                  { title: "Parar embargos mientras cancelas tus deudas", to: "/blog/embargos-segunda-oportunidad" },
                  { title: "Salir de ASNEF tras cancelar la deuda", to: "/blog/salir-asnef" },
                  { title: "Juicio monitorio por una deuda: cómo evitar el embargo", to: "/blog/juicio-monitorio-deuda" },
                  { title: "Cancelar deudas con la cuenta bancaria ya embargada" },
                  { title: "Cancelar deudas con embargo de nómina activo" },
                ],
              },
              {
                angle: "Cuánto cuesta y cuánto tarda cancelar deudas",
                description: "Precio real, plazos y modelos sin anticipos.",
                items: [
                  { title: "Cuánto cuesta cancelar deudas en 2026: precios reales" },
                  { title: "Cuánto se tarda en cancelar deudas desde cero" },
                  { title: "Cancelar deudas sin anticipos: cómo funciona" },
                  { title: "Financiar los honorarios para cancelar tus deudas" },
                  { title: "Cancelar deudas pagando menos: cómo se calcula el ahorro" },
                ],
              },
              {
                angle: "Cancelar deudas vs. otras vías",
                description: "Diferencias con refinanciar, quita, dación o concurso.",
                items: [
                  { title: "Cancelar deudas vs. renegociar con acreedores", to: "/blog/renegociar-acreedores" },
                  { title: "Cancelar deudas vs. quita del banco" },
                  { title: "Cancelar deudas vs. dación en pago" },
                  { title: "Cancelar deudas vs. concurso de acreedores" },
                  { title: "Cancelar deudas vs. mediación extrajudicial" },
                ],
              },
              {
                angle: "Vida después de cancelar la deuda",
                description: "Reconstruir economía, ahorro y crédito una vez cancelada.",
                items: [
                  { title: "Vida después de cancelar las deudas: por dónde empezar", to: "/blog/vida-despues-deuda" },
                  { title: "Reconstruir el historial crediticio tras cancelar la deuda" },
                  { title: "Abrir cuenta bancaria tras cancelar tus deudas" },
                  { title: "Primer préstamo tras cancelar tus deudas: cuándo y cómo" },
                  { title: "Ahorrar y planificar tras cancelar tu deuda" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso concreto?"
            description="Cuéntanoslo: te decimos qué guía leer y, si encaja, por qué vía cancelamos tu deuda."
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
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
                Texto Refundido de la Ley Concursal
              </ExtLink>{" "}
              (Ley de Segunda Oportunidad y exoneración del pasivo insatisfecho).
            </li>
            <li>
              <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>: información al cliente
              bancario.
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