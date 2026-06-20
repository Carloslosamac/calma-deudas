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
  RevolvingCosteReal,
  ReclamacionRevolvingTimeline,
  CancelarDecisionTree,
} from "@/components/blog/diagrams/pillars";
import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-revolving.jpg";

export const guiaCancelarRevolving: BlogPost = {
  slug: "guia-cancelar-revolving",
  category: "Tarjetas revolving",
  title:
    "Cancelar y reclamar tarjetas revolving en 2026: la guía definitiva",
  seoTitle: "Tarjetas revolving 2026: cancela y recupera dinero",
  metaDescription:
    "Guía 2026 sobre tarjetas revolving: qué son, por qué la deuda no baja, cómo reclamar intereses usurarios y recuperar lo pagado de más, requisitos, pasos y errores a evitar.",
  excerpt:
    "Las tarjetas revolving disparan la deuda con intereses que rozan o superan la usura. Esta guía explica cómo funcionan de verdad, cómo reclamar para anular esos intereses y recuperar lo pagado de más, y cuándo conviene cancelar o reunificar.",
  date: "20 junio 2026",
  readTime: "23 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["javier-ferrer", "marta-belmonte"],
  heroImage,
  heroAlt:
    "Tarjeta de crédito sobre extractos bancarios con una curva de intereses creciente",
  keywords: [
    "tarjetas revolving",
    "cancelar tarjeta revolving",
    "reclamar tarjeta revolving",
    "tarjeta revolving 2026",
    "intereses usurarios tarjeta",
    "recuperar dinero tarjeta revolving",
    "TAE revolving",
    "demanda tarjeta revolving",
    "WiZink reclamar",
    "crédito revolving",
    "anular intereses tarjeta",
    "deuda tarjeta que no baja",
  ],
  tldr:
    "Las tarjetas revolving aplican intereses muy altos (TAE habitual por encima del 20%) y un sistema de pago aplazado que hace que la deuda apenas baje: pagas durante años y casi todo se va en intereses. Si la TAE es usuraria o el contrato no fue transparente, puedes reclamar para anular esos intereses y recuperar lo pagado de más, dejando muchas veces la deuda casi a cero. Si la deuda es alta y formas parte de una situación de insolvencia, la vía puede ser cancelar con la Ley de Segunda Oportunidad o reunificar.",
  keyTakeaways: [
    "El sistema revolving recalcula la cuota sobre la deuda pendiente: pagando la cuota mínima, los intereses pueden superar al capital prestado.",
    "Una TAE habitual de revolving (>20%) puede considerarse usuraria según la jurisprudencia del Tribunal Supremo.",
    "Si la TAE es usuraria o el contrato no fue transparente, puedes reclamar y recuperar lo pagado de más.",
    "Muchas reclamaciones se resuelven sin llegar a juicio; cuando hay demanda, la devolución incluye intereses.",
    "Si la deuda revolving es parte de una insolvencia mayor, valora cancelar con la Ley de Segunda Oportunidad o reunificar.",
    "Guardar el contrato y el histórico de movimientos es clave para reclamar con éxito.",
  ],
  sidebar: {
    ctaTitle: "¿Tu tarjeta revolving no baja nunca?",
    ctaDescription:
      "Revisamos gratis tu contrato y te decimos si puedes reclamar y cuánto podrías recuperar.",
    ctaLabel: "Revisar mi tarjeta gratis",
    benefits: [
      "Estudio gratuito de tu contrato",
      "Anulación de intereses abusivos",
      "Recuperas lo pagado de más",
      "Sin anticipos por adelantado",
    ],
  },
  howToSteps: [
    {
      name: "Reunir contrato e historial",
      text: "Localizamos el contrato de la tarjeta y el histórico de movimientos y cuotas pagadas.",
    },
    {
      name: "Análisis de la TAE y la transparencia",
      text: "Comprobamos si la TAE es usuraria o si el contrato no fue transparente al contratarlo.",
    },
    {
      name: "Reclamación extrajudicial",
      text: "Presentamos una reclamación a la entidad solicitando la nulidad de los intereses.",
    },
    {
      name: "Demanda si no hay acuerdo",
      text: "Si la entidad no responde o rechaza, interponemos demanda judicial.",
    },
    {
      name: "Anulación y devolución",
      text: "Se anulan los intereses y se devuelve lo pagado de más, dejando solo el capital realmente dispuesto.",
    },
  ],
  faq: [
    {
      question: "¿Por qué mi tarjeta revolving no baja aunque pago cada mes?",
      answer:
        "Porque el sistema revolving aplica intereses muy altos sobre la deuda pendiente y permite pagar una cuota mínima. Gran parte de cada cuota se va en intereses, así que el capital apenas se reduce y la deuda se eterniza.",
    },
    {
      question: "¿Cuándo se considera usuraria una tarjeta revolving?",
      answer:
        "La jurisprudencia del Tribunal Supremo considera que un interés notablemente superior al normal del dinero y desproporcionado puede ser usurario. En revolving, TAE por encima del 20% suelen estar en ese terreno; se analiza caso a caso.",
    },
    {
      question: "¿Qué puedo recuperar si reclamo?",
      answer:
        "Si se declara la nulidad por usura, solo debes devolver el capital realmente dispuesto: todos los intereses y comisiones pagados de más se recuperan. En muchos casos la deuda queda saldada o incluso a tu favor.",
    },
    {
      question: "¿Necesito el contrato para reclamar?",
      answer:
        "Ayuda mucho, pero no siempre es imprescindible: también se puede solicitar el histórico a la entidad. Cuanta más documentación tengas (contrato y movimientos), más sólida es la reclamación.",
    },
    {
      question: "¿Tengo que ir a juicio?",
      answer:
        "No siempre. Muchas reclamaciones se resuelven extrajudicialmente. Si la entidad no acepta, se interpone demanda; cuando hay sentencia favorable, la devolución incluye intereses.",
    },
    {
      question: "¿Cuánto tarda una reclamación de revolving?",
      answer:
        "Si hay acuerdo, unas semanas o pocos meses. Por vía judicial puede alargarse más según el juzgado, pero el resultado suele compensar el tiempo.",
    },
    {
      question: "¿Y si ya cancelé la tarjeta hace tiempo?",
      answer:
        "Aun así puedes reclamar lo pagado de más mientras no haya prescrito. Conviene revisarlo: en muchas tarjetas ya canceladas se recupera dinero.",
    },
    {
      question: "¿Reclamar afecta a mi historial o a ASNEF?",
      answer:
        "Reclamar es un derecho y no perjudica tu historial. Si la deuda figuraba en ASNEF por intereses indebidos, al anularse procede su cancelación.",
    },
    {
      question: "¿Y si la deuda revolving es muy alta y no puedo pagar?",
      answer:
        "Si forma parte de una insolvencia mayor, la vía puede ser cancelar con la Ley de Segunda Oportunidad o reunificar. Lo valoramos en el diagnóstico gratuito.",
    },
    {
      question: "¿Cuánto cuesta reclamar una tarjeta revolving?",
      answer:
        "En Calma no cobramos anticipos por adelantado: estudiamos tu contrato gratis y te decimos si conviene reclamar y cuánto podrías recuperar.",
    },
  ],
  sections: [
    {
      id: "introduccion",
      title: "La guía definitiva sobre tarjetas revolving en 2026",
      body: (
        <>
          <p>
            Esta es <strong>la guía más completa sobre tarjetas revolving en 2026</strong>: qué son
            de verdad, por qué la deuda no baja por mucho que pagues, cuándo los intereses son
            usurarios, cómo reclamar para anularlos y recuperar lo pagado de más, y qué hacer si la
            deuda se te ha ido de las manos.
          </p>
          <p>
            Si tienes una tarjeta de WiZink, Cetelem, Carrefour, Vivus, una «tarjeta de la compra» o
            cualquier crédito revolving y ves que el saldo apenas se mueve, no es culpa tuya: es cómo
            está diseñado el producto.
          </p>
          <StatHighlights
            title="El revolving, en cifras"
            subtitle="Datos orientativos del sector para entender el problema."
            stats={[
              { value: ">20%", label: "TAE habitual", hint: "terreno de posible usura" },
              { value: "Años", label: "para amortizar", hint: "con la cuota mínima" },
              { value: "Hasta 100%", label: "de intereses recuperables", hint: "si hay usura" },
            ]}
          />
        </>
      ),
    },
    {
      id: "que-es",
      title: "Qué es una tarjeta revolving y por qué es distinta",
      body: (
        <>
          <p>
            Una tarjeta revolving es un crédito que se renueva: cada vez que pagas, vuelves a tener
            disponible esa cantidad para gastar. El problema es la combinación de{" "}
            <strong>intereses muy altos</strong> y <strong>cuota mínima</strong>: como pagas poco
            cada mes, casi todo se va en intereses y el capital apenas baja.
          </p>
          <p>
            Por eso la deuda se eterniza: puedes pasar años pagando y deber casi lo mismo. No es que
            pagues poco, es que el sistema está pensado para que la deuda se mantenga.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si pago la cuota cada mes, la deuda baja",
                reality: "Con la cuota mínima, casi todo se va en intereses y el capital no baja",
              },
              {
                myth: "La culpa es mía por gastar",
                reality: "El producto está diseñado para que la deuda se mantenga en el tiempo",
              },
              {
                myth: "No se puede hacer nada con una revolving",
                reality: "Si la TAE es usuraria, puedes reclamar y recuperar lo pagado de más",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "coste-real",
      title: "Por qué la deuda no baja: el coste real del revolving",
      body: (
        <>
          <p>
            La mejor forma de entenderlo es ver cuánto pides frente a cuánto acabas pagando. Con una
            TAE típica de revolving, los intereses pueden superar al capital.
          </p>
          <RevolvingCosteReal />
          <p>
            Pagando solo la cuota mínima, una deuda de unos pocos miles de euros puede acabar
            costando el doble o más. Ese sobrecoste es, justamente, lo que se puede reclamar cuando
            hay usura.
          </p>
          <InlineCTA
            title="¿Cuánto has pagado de más?"
            description="Revisamos gratis tu contrato y te decimos cuánto podrías recuperar."
            buttonLabel="Calcular lo que puedo recuperar"
          />
        </>
      ),
    },
    {
      id: "usura",
      title: "Cuándo una tarjeta revolving es usuraria",
      body: (
        <>
          <p>
            El Tribunal Supremo ha establecido que un interés{" "}
            <strong>notablemente superior al normal del dinero y manifiestamente desproporcionado</strong>{" "}
            puede declararse usurario. En las tarjetas revolving, las TAE por encima del 20% suelen
            entrar en ese terreno, aunque siempre se analiza caso a caso comparando con el interés
            medio de ese tipo de crédito.
          </p>
          <RequirementsChecklist
            items={[
              "La TAE es notablemente superior a la media de ese tipo de crédito",
              "El interés es desproporcionado respecto a las circunstancias del contrato",
              "O bien el contrato no fue transparente al informarte de las condiciones",
              "Existe contrato y/o histórico de movimientos para acreditarlo",
            ]}
          />
          <p>
            Hay dos vías de nulidad: por <strong>usura</strong> (interés desproporcionado) o por{" "}
            <strong>falta de transparencia</strong> (no entendiste lo que firmabas). Cualquiera de
            las dos puede dejar la deuda reducida solo al capital dispuesto.
          </p>
        </>
      ),
    },
    {
      id: "como-reclamar",
      title: "Cómo reclamar una tarjeta revolving, paso a paso",
      body: (
        <>
          <ReclamacionRevolvingTimeline />
          <ProcessTimeline
            steps={[
              { title: "Documentación", desc: "Contrato e histórico de movimientos" },
              { title: "Análisis", desc: "Comprobamos usura y transparencia" },
              { title: "Reclamación", desc: "Extrajudicial a la entidad" },
              { title: "Devolución", desc: "Anulación e importe recuperado" },
            ]}
          />
        </>
      ),
    },
    {
      id: "que-recuperas",
      title: "Qué recuperas si ganas la reclamación",
      body: (
        <>
          <p>
            Si se declara la nulidad, el efecto es contundente: <strong>solo debes el capital que
            realmente dispusiste</strong>. Todo lo pagado por encima (intereses, comisiones, seguros
            asociados) se te devuelve.
          </p>
          <SuccessRateBar
            title="Resultados típicos de una reclamación revolving"
            subtitle="Distribución orientativa en casos bien documentados."
            segments={[
              { label: "Deuda saldada o a tu favor", value: 70, color: "hsl(145 60% 35%)" },
              { label: "Reducción parcial de la deuda", value: 22, color: "hsl(84 75% 55%)" },
              { label: "Sin recorrido", value: 8, color: "hsl(0 70% 55%)" },
            ]}
          />
          <p>
            En muchos casos, la persona pasa de deber miles de euros a no deber nada o a recibir
            dinero de vuelta.
          </p>
        </>
      ),
    },
    {
      id: "documentacion",
      title: "Qué documentación necesitas para reclamar",
      body: (
        <DocumentsChecklist
          title="Documentación para reclamar"
          subtitle="Si no lo tienes todo, podemos solicitar el histórico a la entidad."
          items={[
            "Contrato de la tarjeta revolving",
            "Extractos y movimientos históricos",
            "Recibos de las cuotas pagadas",
            "Comunicaciones con la entidad",
            "DNI en vigor",
          ]}
        />
      ),
    },
    {
      id: "cancelar-o-reclamar",
      title: "¿Reclamar, cancelar o reunificar tu deuda revolving?",
      body: (
        <>
          <p>
            Reclamar es la vía cuando el problema es el interés abusivo. Pero si la deuda revolving es
            parte de una situación de insolvencia mayor, conviene mirar el conjunto:
          </p>
          <CancelarDecisionTree />
          <ComparisonTable
            title="Reclamar vs. cancelar con Segunda Oportunidad"
            subtitle="Dos respuestas distintas según tu situación global."
            optionA="Reclamar revolving"
            optionB="Segunda Oportunidad"
            rows={[
              { label: "Indicada si la TAE es abusiva", a: "Sí", b: "No es el criterio", highlight: "a" },
              { label: "Indicada si hay insolvencia general", a: "No por sí sola", b: "Sí", highlight: "b" },
              { label: "Recuperas lo pagado de más", a: "Sí", b: "No", highlight: "a" },
              { label: "Cancela el resto de deudas", a: "No", b: "Sí (con requisitos)", highlight: "b" },
            ]}
          />
          <p>
            Si tienes varias deudas además de la tarjeta, valora también{" "}
            <InternalLink to="/blog/guia-reunificar-deudas">reunificar</InternalLink> o{" "}
            <InternalLink to="/blog/guia-cancelar-deudas">cancelar</InternalLink> el conjunto.
          </p>
        </>
      ),
    },
    {
      id: "senales",
      title: "Señales de que tu revolving es un problema serio",
      body: (
        <WarningSignsList
          title="Señales de alerta con tu tarjeta"
          subtitle="Si te reconoces en dos o más, conviene revisar tu contrato."
          signs={[
            { title: "El saldo no baja", desc: "Llevas meses o años pagando y debes casi lo mismo" },
            { title: "Solo pagas la cuota mínima", desc: "No llegas a más y los intereses se acumulan" },
            { title: "TAE por encima del 20%", desc: "Tu contrato aplica un interés muy alto" },
            { title: "Usas la tarjeta para llegar a fin de mes", desc: "La deuda crece cada mes" },
          ]}
        />
      ),
    },
    {
      id: "vida-despues",
      title: "Qué cambia cuando resuelves la deuda revolving",
      body: (
        <BeforeAfterSplit
          before={[
            "Deuda que no baja nunca",
            "Intereses que se comen tus pagos",
            "Cuota mínima eterna",
            "Sensación de estar atrapado",
          ]}
          after={[
            "Deuda saldada o reducida al capital",
            "Recuperas lo pagado de más",
            "Sin intereses abusivos",
            "Cierras el capítulo de la tarjeta",
          ]}
        />
      ),
    },
    {
      id: "costes",
      title: "Cuánto cuesta reclamar y qué ganas",
      body: (
        <>
          <p>
            La comparación es clara: lo que se recupera y se deja de pagar suele superar de largo el
            coste del servicio. Además, en Calma no cobramos anticipos por adelantado.
          </p>
          <CostVsDebtBars
            title="Coste de reclamar vs. dinero recuperado"
            subtitle="Ejemplo orientativo basado en casos reales."
            costLabel="Coste de la reclamación"
            debtLabel="Intereses anulados y devueltos"
          />
        </>
      ),
    },
    {
      id: "errores",
      title: "Errores frecuentes con las tarjetas revolving",
      body: (
        <>
          <ul>
            <li>Seguir pagando la cuota mínima sin revisar si la TAE es abusiva.</li>
            <li>Tirar el contrato y los extractos antiguos.</li>
            <li>Pedir otra tarjeta o microcrédito para pagar la revolving.</li>
            <li>Creer que, por haber cancelado la tarjeta, ya no se puede reclamar.</li>
            <li>Aceptar un «acuerdo» de la entidad sin revisar si pierdes derechos.</li>
          </ul>
          <InlineCTA
            title="¿Tienes una tarjeta revolving?"
            description="Revisamos gratis tu contrato y te decimos si puedes reclamar y cuánto recuperar."
            buttonLabel="Revisar mi tarjeta gratis"
          />
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre tarjetas revolving",
      body: (
        <>
          <p>Resuelve las dudas más concretas sobre tu tarjeta revolving:</p>
          <ContentHub
            groups={[
              {
                angle: "Entender el revolving",
                description: "Cómo funciona y por qué la deuda no baja.",
                items: [
                  { title: "Cómo funciona una tarjeta revolving" },
                  { title: "Por qué mi deuda revolving no baja" },
                  { title: "Qué TAE se considera usuraria en revolving" },
                  { title: "Diferencia entre tarjeta de crédito y revolving" },
                ],
              },
              {
                angle: "Reclamar tu tarjeta",
                description: "Cómo recuperar lo pagado de más.",
                items: [
                  { title: "Cómo reclamar una tarjeta revolving", to: "/blog/reclamar-tarjeta-revolving" },
                  { title: "Reclamar una tarjeta ya cancelada" },
                  { title: "Reclamar sin tener el contrato" },
                  { title: "Qué dinero se recupera al reclamar" },
                ],
              },
              {
                angle: "Si la deuda te supera",
                description: "Cuándo cancelar o reunificar en vez de solo reclamar.",
                items: [
                  { title: "Cancelar deudas: elegir la vía correcta", to: "/blog/guia-cancelar-deudas" },
                  { title: "Reunificar tarjetas y microcréditos", to: "/blog/guia-reunificar-deudas" },
                  { title: "Tarjetas revolving y Ley de Segunda Oportunidad", to: "/blog/guia-ley-segunda-oportunidad" },
                  { title: "Salir de ASNEF por una tarjeta", to: "/blog/salir-asnef" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y revisamos gratis si puedes reclamar tu tarjeta."
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
              bancario y tipos medios de crédito al consumo.
            </li>
            <li>
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-1908-3326">
                Ley de Represión de la Usura (Ley Azcárate)
              </ExtLink>{" "}
              en la que se apoya la nulidad por usura.
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