import {
  StatHighlights,
  ComparisonTable,
  ProcessTimeline,
  RequirementsChecklist,
  MythVsReality,
  WarningSignsList,
  BeforeAfterSplit,
  DocumentsChecklist,
  CostFactorsGrid,
  BudgetBreakdownStack,
  SavingsProjection,
  RiskMatrix,
} from "@/components/blog/diagrams";
import {
  ReunificacionCuotaCompare,
  ReunificarVsRefinanciar,
  CancelarDecisionTree,
  InsolvenciaBienesMatrix,
} from "@/components/blog/diagrams/pillars";
import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-reunificacion.jpg";

export const guiaReunificarDeudas: BlogPost = {
  slug: "guia-reunificar-deudas",
  category: "Reunificación",
  title:
    "Reunificar deudas en 2026: la guía más completa para bajar tu cuota y reducir el total",
  seoTitle: "Reunificar deudas 2026: baja cuota y total (guía)",
  metaDescription:
    "La guía más completa de 2026 para reunificar deudas: qué es de verdad, diferencias con refinanciar, cuándo conviene frente a la Ley de Segunda Oportunidad, costes, pasos, errores y casos.",
  excerpt:
    "Reunificar deudas bien hecho es dejar una sola cuota más baja y reducir el total adeudado mediante negociación, sin pedir un préstamo nuevo. Esta es la guía definitiva: qué es, en qué se diferencia de refinanciar, cuándo conviene, cuánto cuesta y cómo se hace paso a paso.",
  date: "20 junio 2026",
  readTime: "26 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["javier-ferrer", "marta-belmonte"],
  heroImage,
  heroAlt:
    "Persona revisando varias facturas y un único extracto consolidado sobre la mesa de la cocina",
  keywords: [
    "reunificar deudas",
    "reunificación de deudas",
    "reunificar deudas 2026",
    "bajar cuota mensual",
    "negociar deudas",
    "unificar deudas",
    "reunificar vs refinanciar",
    "reunificar deudas sin aval",
    "reunificar deudas sin hipoteca",
    "reunificar microcréditos",
    "reunificar tarjetas revolving",
    "reunificar vs Ley de Segunda Oportunidad",
    "salir de deudas",
    "una sola cuota",
  ],
  tldr:
    "Reunificar deudas con Calma es negociar con tus acreedores para dejar una sola cuota mensual más baja y reducir el total adeudado, sin pedir un préstamo nuevo, sin hipotecar nada y sin alargar artificialmente el plazo. Es la mejor opción cuando eres insolvente pero tienes bienes pagados de valor (como una vivienda o un terreno) que, en la práctica, bloquean la exoneración total de la Ley de Segunda Oportunidad. El primer paso siempre es un análisis gratuito que confirma si reunificar es de verdad lo que más te conviene.",
  keyTakeaways: [
    "Reunificar (negociación extrajudicial) baja la cuota y el total; refinanciar (préstamo nuevo) suele subir el total que acabas pagando.",
    "No necesitas pedir otro préstamo, ni hipotecar tu casa, ni firmar un aval, ni alargar el plazo.",
    "Encaja sobre todo cuando eres insolvente pero tienes una casa o un bien pagado de valor que bloquearía la exoneración total.",
    "Si eres insolvente y no tienes bienes pagados de valor, normalmente conviene más la Ley de Segunda Oportunidad, que cancela la deuda en vez de reorganizarla.",
    "Si la deuda es baja y hay intereses abusivos, la vía puede ser una reclamación, no reunificar.",
    "El análisis es siempre individual y gratuito: ahí se decide la vía real, sin venderte un producto financiero.",
  ],
  sidebar: {
    ctaTitle: "¿Reunificar o cancelar?",
    ctaDescription:
      "Estudiamos gratis tu caso y te decimos qué vía te conviene de verdad, sin venderte un préstamo.",
    ctaLabel: "Analizar mi caso gratis",
    benefits: [
      "Una sola cuota más baja",
      "Bajamos el total adeudado",
      "Sin préstamo nuevo ni avales",
      "Análisis honesto y sin compromiso",
    ],
  },
  howToSteps: [
    {
      name: "Análisis previo gratuito",
      text: "Revisamos todas tus deudas, ingresos, gastos y bienes para confirmar si reunificar es lo que más te conviene o si encajas mejor en otra vía.",
    },
    {
      name: "Estrategia de negociación",
      text: "Calculamos una cuota única asumible y el total objetivo tras la rebaja de intereses, recargos y, cuando es posible, capital.",
    },
    {
      name: "Negociación con acreedores",
      text: "Hablamos con cada entidad en tu nombre para reducir la deuda y unificar el pago en una sola cuota.",
    },
    {
      name: "Acuerdo y cuota única",
      text: "Empiezas a pagar una sola cuota mensual, más baja, con un total más pequeño y un calendario claro.",
    },
    {
      name: "Seguimiento hasta saldar",
      text: "Te acompañamos hasta que la deuda queda saldada y tu economía vuelve a respirar.",
    },
  ],
  faq: [
    {
      question: "¿Reunificar deudas es pedir un préstamo nuevo?",
      answer:
        "No. Reunificar con Calma es negociar con tus acreedores para dejar una sola cuota más baja y reducir el total. No pedimos un préstamo nuevo ni te hipotecamos: eso sería refinanciar, que es justo lo contrario y casi siempre encarece la deuda.",
    },
    {
      question: "¿Reunificar baja lo que debo o solo la cuota?",
      answer:
        "Bien hecha, baja las dos cosas: la cuota mensual y el importe total adeudado, gracias a la negociación con cada acreedor para rebajar intereses, recargos y, en muchos casos, parte del capital.",
    },
    {
      question: "¿Necesito un aval o una hipoteca para reunificar?",
      answer:
        "No. La reunificación por negociación no exige aval ni garantía hipotecaria, a diferencia de muchos productos de refinanciación bancaria que sí ponen tu vivienda como garantía.",
    },
    {
      question: "¿Cuándo es mejor la Ley de Segunda Oportunidad que reunificar?",
      answer:
        "Cuando eres insolvente y no tienes bienes pagados de valor. Si tienes una casa o un terreno pagado, ese patrimonio suele bloquear la exoneración total y la reunificación pasa a ser la vía más realista para no perderlo.",
    },
    {
      question: "¿Afecta reunificar a mi historial o a ASNEF?",
      answer:
        "Al ponerte al día con cuotas asumibles, dejas de generar nuevos impagos. La situación en ficheros como ASNEF depende del origen de cada deuda y se revisa en el análisis previo; al saldar las deudas, las anotaciones acaban cancelándose.",
    },
    {
      question: "¿Cuánto puede bajar mi cuota al reunificar?",
      answer:
        "Depende del número de deudas, los intereses actuales y tu capacidad de pago. La rebaja viene de juntar varias cuotas en una sola negociada a la baja; la cifra exacta se calcula en la valoración gratuita con los números de tu caso.",
    },
    {
      question: "¿Puedo reunificar microcréditos y tarjetas revolving?",
      answer:
        "Sí. Microcréditos y tarjetas revolving son de las deudas más caras y entran perfectamente en una reunificación negociada. Además, si la TAE es abusiva, antes conviene revisar si esa deuda es reclamable.",
    },
    {
      question: "¿Cuánto tarda en notarse el alivio?",
      answer:
        "Una vez cerrados los acuerdos, empiezas a pagar la cuota única de inmediato, así que el alivio mensual se nota desde la primera cuota. La negociación completa suele resolverse en semanas, según el número de acreedores.",
    },
    {
      question: "¿Qué pasa si un acreedor no quiere negociar?",
      answer:
        "No todos los acreedores aceptan las mismas condiciones. Trabajamos acreedor a acreedor y, si alguno bloquea el acuerdo, valoramos otras vías (incluida la Ley de Segunda Oportunidad) para que tu solución global siga teniendo sentido.",
    },
    {
      question: "¿Reunificar es legal y seguro?",
      answer:
        "Sí. Es una negociación extrajudicial entre tú (a través de tu abogado) y tus acreedores. No firmas productos financieros nuevos ni garantías sobre tu patrimonio: solo acuerdos de pago más favorables.",
    },
  ],
  sections: [
    {
      id: "introduccion",
      title: "La guía más completa para reunificar deudas en 2026",
      body: (
        <>
          <p>
            Esta es <strong>la guía más completa y actualizada sobre la reunificación de deudas en
            2026</strong>: qué es de verdad, en qué se diferencia de refinanciar, cuándo conviene
            frente a otras vías como la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            , cuánto cuesta, cómo se hace paso a paso y qué errores te pueden costar miles de euros.
            Está escrita para personas que no son abogadas ni economistas, en lenguaje claro y sin
            tecnicismos.
          </p>
          <p>
            Si tienes varias cuotas que se comen tu nómina (préstamos, tarjetas, microcréditos,
            financiación del coche) y cada mes te cuesta más llegar a fin de mes, aquí vas a entender
            exactamente qué significa reunificar, cuándo es la mejor herramienta para ti y cuándo no.
          </p>
          <StatHighlights
            title="Reunificar, en perspectiva"
            subtitle="Cifras orientativas del sector para situar la decisión. Tu resultado depende de tu caso."
            stats={[
              { value: "1 sola", label: "cuota mensual", hint: "en lugar de varias dispersas" },
              { value: "Cuota + total", label: "ambos bajan", hint: "cuando se negocia bien" },
              { value: "0 €", label: "de préstamo nuevo", hint: "no es refinanciar" },
            ]}
          />
        </>
      ),
    },
    {
      id: "que-es",
      title: "Qué es reunificar deudas (y qué no es)",
      body: (
        <>
          <p>
            Reunificar deudas es <strong>juntar todo lo que debes en una sola cuota mensual</strong>,
            más baja y asumible. Pero la palabra esconde dos caminos muy distintos, y confundirlos
            puede salirte muy caro.
          </p>
          <p>
            En Calma reunificamos mediante <strong>negociación extrajudicial</strong> con tus
            acreedores: rebajamos la cuota y, además, el total adeudado, <strong>sin pedir un
            préstamo nuevo</strong>, sin hipotecar nada y sin alargar artificialmente el plazo. Lo
            contrario es <em>refinanciar</em>: pedir un crédito nuevo para tapar los anteriores, algo
            que casi siempre sube el total que acabas pagando.
          </p>
          <ReunificacionCuotaCompare />
          <p>
            La idea clave: reunificar no es un producto que te venden, es una negociación que se hace
            en tu nombre. El objetivo no es que firmes más deuda, sino que pagues menos.
          </p>
          <InlineCTA
            title="¿Cuánto bajaría tu cuota?"
            description="Te lo decimos en una valoración gratuita, con números reales de tu caso."
            buttonLabel="Calcular mi cuota nueva"
          />
        </>
      ),
    },
    {
      id: "reunificar-vs-refinanciar",
      title: "Reunificar no es refinanciar: la diferencia que más cara se paga",
      body: (
        <>
          <p>
            Muchos anuncios llaman «reunificación» a lo que en realidad es un préstamo nuevo con
            garantía hipotecaria. Te bajan la cuota… alargando el plazo y sumando intereses, así que
            terminas pagando mucho más. Esa no es nuestra forma de trabajar.
          </p>
          <ReunificarVsRefinanciar />
          <p>
            La regla es sencilla: <strong>si para «reunificar» te piden firmar un préstamo nuevo o
            poner tu casa como aval, no estás reunificando, estás refinanciando</strong>. Y
            refinanciar suele significar pagar durante más años y un total más alto.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Reunificar siempre es pedir un préstamo grande",
                reality: "La reunificación por negociación no necesita ningún préstamo nuevo",
              },
              {
                myth: "Bajar la cuota implica pagar más al final",
                reality: "Negociando bien baja la cuota y también el total adeudado",
              },
              {
                myth: "Necesito poner mi casa como garantía",
                reality: "La negociación extrajudicial no exige aval ni hipoteca",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "como-funciona-negociacion",
      title: "Cómo se consigue bajar la cuota y el total a la vez",
      body: (
        <>
          <p>
            La rebaja no es magia ni un truco financiero. Sale de tres palancas que se negocian con
            cada acreedor:
          </p>
          <ul>
            <li>
              <strong>Intereses y comisiones:</strong> gran parte de lo que debes en tarjetas y
              microcréditos son intereses y recargos, no capital. Es lo primero que se ataca.
            </li>
            <li>
              <strong>Recargos y penalizaciones por impago:</strong> cuando ya hay retrasos, la deuda
              se infla con comisiones que pueden negociarse a la baja o eliminarse.
            </li>
            <li>
              <strong>Parte del capital:</strong> en muchos casos el acreedor prefiere cobrar una
              cantidad segura y cerrada antes que arriesgarse a un impago total, y acepta una quita.
            </li>
          </ul>
          <CostFactorsGrid
            title="Qué influye en cuánto puedes bajar"
            subtitle="No todos los casos rebajan lo mismo: depende de tu situación concreta."
            factors={undefined}
          />
          <p>
            El resultado se traduce en una sola cuota asumible y un total más pequeño que el que
            tendrías sumando todas tus deudas hoy.
          </p>
        </>
      ),
    },
    {
      id: "cuando-conviene",
      title: "¿Cuándo conviene reunificar y cuándo otra vía?",
      body: (
        <>
          <p>
            Reunificar es la mejor herramienta cuando eres <strong>insolvente pero tienes bienes
            pagados de valor</strong> (por ejemplo, una vivienda o un terreno en propiedad). Ese
            patrimonio suele impedir, en la práctica, la exoneración total de la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            , porque el procedimiento podría exigir liquidarlo.
          </p>
          <CancelarDecisionTree />
          <p>
            Si, por el contrario, no tienes bienes pagados de valor, la Ley de Segunda Oportunidad
            suele ser superior, porque puede <strong>cancelar la deuda por completo</strong> en lugar
            de reorganizarla. Y si la deuda es baja y hay intereses abusivos, a veces la vía correcta
            es una reclamación.
          </p>
          <InsolvenciaBienesMatrix />
          <InlineCTA
            title="¿No sabes en qué grupo estás?"
            description="Cuéntanos tu situación y te decimos si te conviene reunificar o cancelar tus deudas."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
    {
      id: "para-quien",
      title: "Para quién está pensada la reunificación",
      body: (
        <>
          <p>
            La reunificación encaja con un perfil muy concreto. Estos son los casos en los que suele
            tener más sentido:
          </p>
          <RequirementsChecklist
            items={[
              "Tienes varias deudas a la vez (préstamos, tarjetas, microcréditos, financieras)",
              "La suma de cuotas se ha vuelto difícil de pagar cada mes",
              "Tienes ingresos estables, aunque ajustados",
              "Tienes un bien pagado de valor (vivienda, terreno) que quieres conservar",
              "Quieres ordenar tu economía en una sola cuota sin firmar más préstamos",
            ]}
          />
          <p>
            Si te reconoces en la mayoría, reunificar puede ser tu vía. Si no tienes bienes pagados y
            la deuda te supera, conviene valorar la Ley de Segunda Oportunidad.
          </p>
        </>
      ),
    },
    {
      id: "senales",
      title: "Señales de que necesitas reorganizar tus deudas ya",
      body: (
        <>
          <p>
            Cuanto antes actúes, más margen de negociación hay. Estas señales indican que la deuda ha
            dejado de ser manejable:
          </p>
          <WarningSignsList
            title="Señales de alerta"
            subtitle="Si te reconoces en dos o más, conviene actuar pronto."
            signs={undefined}
          />
          <p>
            Pedir un microcrédito para pagar otro es la señal más clara de que el problema no es de
            cuota, sino de estructura: necesitas reorganizar, no añadir más deuda.
          </p>
        </>
      ),
    },
    {
      id: "presupuesto",
      title: "Cómo cambia tu presupuesto al reunificar",
      body: (
        <>
          <p>
            Cuando varias cuotas se comen tu nómina, el resto del presupuesto se ahoga: comida,
            suministros, imprevistos. Reunificar libera ese espacio.
          </p>
          <BudgetBreakdownStack
            title="Tu nómina hoy, con varias cuotas"
            subtitle="Las cuotas de deuda dispersas dejan poco margen para el resto."
            segments={undefined}
          />
          <BeforeAfterSplit
            before={[
              "Varias cuotas en fechas distintas",
              "Intereses altos en tarjetas y microcréditos",
              "Llamadas de cobro y recargos por retraso",
              "Sensación de no avanzar nunca",
            ]}
            after={[
              "Una sola cuota mensual y una sola fecha",
              "Total adeudado más bajo tras negociar",
              "Fin de los recargos por impago",
              "Por fin ves un final a la deuda",
            ]}
          />
        </>
      ),
    },
    {
      id: "paso-a-paso",
      title: "Cómo funciona la reunificación con Calma, paso a paso",
      body: (
        <>
          <ProcessTimeline
            steps={[
              { title: "Análisis", desc: "Revisamos deudas, ingresos y bienes gratis" },
              { title: "Estrategia", desc: "Calculamos cuota única y total objetivo" },
              { title: "Negociación", desc: "Hablamos con cada acreedor en tu nombre" },
              { title: "Cuota única", desc: "Pagas menos y con un total más bajo" },
            ]}
          />
          <ol>
            <li>
              <strong>Análisis previo gratuito:</strong> revisamos todas tus deudas, ingresos y
              bienes para confirmar que reunificar es lo que más te conviene.
            </li>
            <li>
              <strong>Estrategia de negociación:</strong> calculamos una cuota única asumible y el
              total objetivo tras la rebaja.
            </li>
            <li>
              <strong>Negociación con acreedores:</strong> hablamos con cada entidad para reducir
              intereses, recargos y capital cuando es posible.
            </li>
            <li>
              <strong>Acuerdo y cuota única:</strong> empiezas a pagar una sola cuota, más baja, con
              un total más pequeño.
            </li>
            <li>
              <strong>Seguimiento:</strong> te acompañamos hasta que la deuda queda saldada.
            </li>
          </ol>
          <blockquote>
            No te vendemos un producto financiero: negociamos en tu nombre para que pagues menos, no
            para que firmes más deuda.
          </blockquote>
        </>
      ),
    },
    {
      id: "documentacion",
      title: "Qué documentación necesitas para empezar",
      body: (
        <>
          <p>
            Reunir la documentación es más sencillo de lo que parece. Con estos papeles podemos
            empezar a estudiar tu caso:
          </p>
          <DocumentsChecklist
            title="Documentación habitual"
            subtitle="Te acompañamos en cada paso; no necesitas tenerlo todo perfecto de inicio."
            items={[
              "DNI en vigor",
              "Últimas nóminas o justificantes de ingresos",
              "Contratos de préstamos, tarjetas y microcréditos",
              "Últimos recibos o extractos de cada deuda",
              "Notificaciones de impago o recargo (si las hay)",
              "Escrituras o documentos de bienes a tu nombre",
            ]}
          />
        </>
      ),
    },
    {
      id: "costes",
      title: "Cuánto cuesta reunificar deudas",
      body: (
        <>
          <p>
            En una reunificación por negociación no firmas un préstamo, así que no pagas intereses de
            un crédito nuevo. El coste es el del servicio de negociación, que se valora según la
            complejidad de tu caso. Lo importante es la comparación: lo que dejas de pagar en
            intereses y recargos suele superar con creces el coste del servicio.
          </p>
          <SavingsProjection
            title="Ejemplo de alivio acumulado"
            subtitle="Ilustrativo: cuánto deja de irse en cuotas cuando reorganizas la deuda."
            points={[
              { label: "Mes 1", value: 200 },
              { label: "Mes 3", value: 650 },
              { label: "Mes 6", value: 1400 },
              { label: "Mes 12", value: 3000 },
              { label: "Mes 24", value: 6500 },
            ]}
          />
          <p>
            En Calma no cobramos anticipos por adelantado: primero analizamos tu caso y te decimos si
            de verdad te conviene.
          </p>
        </>
      ),
    },
    {
      id: "comparativa-vias",
      title: "Reunificar vs. Ley de Segunda Oportunidad vs. reclamar",
      body: (
        <>
          <p>
            Para decidir bien, conviene comparar las tres vías más habituales según tu situación:
          </p>
          <ComparisonTable
            title="Reunificar vs. cancelar con la Ley de Segunda Oportunidad"
            subtitle="Dos herramientas distintas para situaciones distintas."
            optionA="Reunificar"
            optionB="Segunda Oportunidad"
            rows={[
              { label: "Cancela el 100% de la deuda", a: "No, la reduce", b: "Sí (con requisitos)", highlight: "b" },
              { label: "Conserva bienes pagados de valor", a: "Sí, es su objetivo", b: "Puede exigir liquidarlos", highlight: "a" },
              { label: "Necesitas ser insolvente", a: "No siempre", b: "Sí", highlight: "a" },
              { label: "Una sola cuota asumible", a: "Sí", b: "Solo si hay plan de pagos", highlight: "a" },
              { label: "Pasa por el juzgado", a: "No", b: "Sí", highlight: "a" },
            ]}
          />
          <RiskMatrix
            title="Qué vía encaja según tu situación"
            axes={{ x: "¿Tienes bienes pagados de valor?", y: "¿Puedes pagar algo cada mes?" }}
            cells={[
              { q: 1, label: "Reunificar: proteges el bien y pagas menos", tone: "good" },
              { q: 2, label: "Reunificar o plan de pagos a medida", tone: "warn" },
              { q: 3, label: "Segunda Oportunidad con plan de pagos", tone: "warn" },
              { q: 4, label: "Segunda Oportunidad: exoneración total", tone: "bad" },
            ]}
          />
          <p>
            Recuerda: si la deuda es baja y los intereses son abusivos (típico en revolving), antes
            de reunificar conviene revisar si esa deuda es{" "}
            <InternalLink to="/blog/guia-cancelar-revolving">reclamable</InternalLink>.
          </p>
        </>
      ),
    },
    {
      id: "tipos-deuda",
      title: "Qué deudas se pueden reunificar",
      body: (
        <>
          <p>
            La reunificación negociada funciona especialmente bien con la deuda más cara y dispersa:
          </p>
          <ul>
            <li>
              <strong>Tarjetas de crédito y revolving:</strong> de las más caras; si la TAE es
              abusiva, primero se valora reclamar.
            </li>
            <li>
              <strong>Microcréditos y préstamos rápidos:</strong> intereses muy altos y cuotas
              frecuentes; entran de lleno en la negociación.
            </li>
            <li>
              <strong>Préstamos personales y financiación de consumo:</strong> coche, electrodomésticos,
              compras a plazos.
            </li>
            <li>
              <strong>Descubiertos y deudas con financieras:</strong> recargos y comisiones
              negociables.
            </li>
          </ul>
          <p>
            La deuda pública (Hacienda y Seguridad Social) tiene reglas propias y normalmente no se
            «reunifica» como la privada; se gestiona aparte. Lo revisamos en el análisis.
          </p>
        </>
      ),
    },
    {
      id: "errores",
      title: "Errores frecuentes al reunificar (y cómo evitarlos)",
      body: (
        <>
          <ul>
            <li>Aceptar un préstamo con hipoteca creyendo que es una reunificación.</li>
            <li>Mirar solo la cuota mensual y no el total que acabarás pagando.</li>
            <li>Reunificar cuando en realidad encajas en la Ley de Segunda Oportunidad.</li>
            <li>Seguir pidiendo microcréditos mientras negocias.</li>
            <li>Firmar con intermediarios que cobran por adelantado sin analizar tu caso.</li>
            <li>No revisar si alguna deuda (revolving, microcréditos) es reclamable antes de pagarla.</li>
          </ul>
          <p>
            Antes de firmar nada, conviene comparar tu caso con otras vías como la{" "}
            <InternalLink to="/blog/renegociar-acreedores">renegociación con acreedores</InternalLink>{" "}
            o la propia Ley de Segunda Oportunidad.
          </p>
          <InlineCTA
            title="¿Te han ofrecido una reunificación con hipoteca?"
            description="Antes de firmar, deja que revisemos gratis si es la mejor opción para ti."
            buttonLabel="Pedir una segunda opinión"
          />
        </>
      ),
    },
    {
      id: "preguntas-frecuentes",
      title: "Preguntas frecuentes sobre reunificar deudas",
      body: (
        <>
          <p>
            Estas son las dudas que más nos plantean antes de empezar. Si la tuya no está, escríbenos
            y te respondemos sin compromiso.
          </p>
          <ul>
            <li>
              <strong>¿Reunificar es para siempre?</strong> No: pagas la cuota única hasta saldar la
              deuda y luego quedas libre, sin productos atados.
            </li>
            <li>
              <strong>¿Puedo reunificar si estoy en ASNEF?</strong> Sí; de hecho, saldar las deudas es
              la vía para que las anotaciones acaben cancelándose.{" "}
              <InternalLink to="/blog/salir-asnef">Más sobre salir de ASNEF</InternalLink>.
            </li>
            <li>
              <strong>¿Y si soy autónomo?</strong> También aplica;{" "}
              <InternalLink to="/blog/autonomos-con-deudas">
                los autónomos con deudas
              </InternalLink>{" "}
              tienen particularidades que revisamos en el análisis.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre reunificar deudas",
      body: (
        <>
          <p>Resuelve las dudas más concretas sobre la reunificación:</p>
          <ContentHub
            groups={[
              {
                angle: "Conceptos clave de la reunificación",
                description:
                  "Lo que de verdad significa reunificar y en qué se diferencia de refinanciar.",
                items: [
                  { title: "Reunificar vs. refinanciar: diferencias que cambian el resultado" },
                  { title: "Reunificar deudas sin pedir un préstamo nuevo: cómo es posible" },
                  { title: "¿Reunificar baja el total adeudado o solo la cuota?" },
                  {
                    title: "Reunificación de deudas vs. Ley de Segunda Oportunidad",
                    to: "/blog/guia-ley-segunda-oportunidad",
                  },
                ],
              },
              {
                angle: "Tu caso concreto",
                description: "Cómo aplica la reunificación según tu situación.",
                items: [
                  { title: "Reunificar deudas con una hipoteca o casa pagada" },
                  {
                    title: "Reunificar microcréditos y tarjetas revolving",
                    to: "/blog/guia-cancelar-microcreditos",
                  },
                  { title: "Reunificar deudas estando en ASNEF", to: "/blog/salir-asnef" },
                  { title: "Reunificar deudas siendo autónomo", to: "/blog/autonomos-con-deudas" },
                ],
              },
              {
                angle: "Decidir bien",
                description: "Cómo elegir entre reunificar, cancelar o reclamar.",
                items: [
                  { title: "Cómo saber si te conviene reunificar o cancelar", to: "/blog/guia-cancelar-deudas" },
                  { title: "Renegociar con acreedores: cuándo funciona", to: "/blog/renegociar-acreedores" },
                  { title: "Errores al reunificar que te hacen pagar de más" },
                  { title: "Reunificar con cuotas atrasadas y recargos" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y te decimos si reunificar es tu mejor opción o si te conviene otra vía."
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
            Esta guía está elaborada por el equipo legal de Calma a partir de nuestra experiencia
            negociando deudas. Para el marco normativo nos apoyamos en fuentes oficiales:
          </p>
          <ul>
            <li>
              <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>: información al cliente
              bancario sobre préstamos y reunificación.
            </li>
            <li>
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
                Texto Refundido de la Ley Concursal
              </ExtLink>{" "}
              para comparar con la Ley de Segunda Oportunidad.
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