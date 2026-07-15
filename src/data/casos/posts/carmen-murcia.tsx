import {
  BeforeAfterSplit,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/carmen-murcia.jpg";

export const carmenMurcia: CasoExito = {
  slug: "carmen-murcia-reduce-cuota-40-por-ciento",
  category: "Reunificación de deudas",
  name: "Carmen P.",
  location: "Murcia",
  debtAmount: "Cuota -40%",
  solution: "Reunificación (negociación extrajudicial)",
  headline:
    "Tenía un local familiar que no quería arriesgar: cómo Carmen bajó su cuota un 40% sin pedir ni un euro prestado en Murcia",
  dek: "Varios préstamos y una tarjeta la asfixiaban cada mes. Descartar la Ley de Segunda Oportunidad fue su primera decisión acertada. La segunda fue llamar a Calma.",
  seoTitle: "Caso real: baja su cuota un 40% con reunificación en Murcia",
  metaDescription:
    "Carmen, de Murcia, tenía préstamos y tarjeta que no podía sostener. Con el local familiar en juego, eligió la negociación extrajudicial y redujo su cuota un 40% sin préstamo nuevo.",
  date: "10 junio 2026",
  readTime: "6 min",
  publishedAt: "2026-06-10",
  heroImage: casoFoto,
  heroAlt: "Mujer aliviada revisando documentos en una oficina soleada de Murcia",
  keywords: [
    "caso real",
    "reunificación de deudas",
    "reducir cuota mensual",
    "negociación extrajudicial",
    "Murcia",
    "préstamos personales",
    "tarjeta de crédito",
  ],
  faq: [
    {
      question: "¿En qué consiste la reunificación extrajudicial que usó Carmen?",
      answer:
        "No es un préstamo nuevo ni una hipoteca. Es una negociación directa con los acreedores para rebajar el importe de las cuotas y el total de la deuda, sin necesidad de un juzgado ni de poner ningún bien como garantía.",
    },
    {
      question: "¿Por qué descartó la Ley de Segunda Oportunidad?",
      answer:
        "La LSO está pensada para personas insolventes. Carmen tenía un local familiar pagado que no quería arriesgar. Con la reunificación extrajudicial mantuvo su patrimonio intacto y aun así redujo su carga financiera.",
    },
    {
      question: "¿Cuánto bajó la cuota de Carmen?",
      answer:
        "Su cuota mensual se redujo un 40%. Además, el total que pagará también disminuyó gracias a la renegociación de condiciones con cada acreedor.",
    },
  ],
  sections: [
    {
      id: "el-peso-de-cada-mes",
      title: "El agobio que llegaba puntual cada uno de los treinta del mes",
      body: (
        <>
          <p>
            Carmen P. llevaba casi dos años haciendo malabarismos. Un préstamo para reformar el
            negocio, otro que pidió cuando la caja flojó y una tarjeta que usaba para tapar los
            huecos que dejaban los anteriores. Tres vencimientos distintos, tres cuotas que se
            llevaban una parte que cada vez le parecía más grande de su sueldo.
          </p>
          <p>
            "Lo calculaba en la cama antes de dormir", dice. "Y siempre me salía que no llegaba".
            El problema no era que gastara de más; era que el engranaje de intereses acumulados la
            colocaba en una posición de la que cada mes le costaba más salir.
          </p>
        </>
      ),
    },
    {
      id: "el-local-en-juego",
      title: "Un local familiar que no estaba en venta ni en ninguna garantía",
      body: (
        <>
          <p>
            Lo que complicaba —y a la vez clarificaba— su situación era un local comercial que la
            familia había terminado de pagar hacía unos años. Un bien pequeño pero cargado de
            historia: el negocio que había sacado adelante su padre.
          </p>
          <p>
            Cuando alguien le mencionó la{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              Ley de Segunda Oportunidad
            </InternalLink>
            , Carmen lo investigó. Y entendió rápido que esa vía estaba pensada para personas en
            situación de insolvencia real, sin patrimonio que cubra la deuda. Su local cambiaba la
            ecuación. Ponerlo en riesgo no era una opción. Así que el siguiente paso fue buscar una
            solución que no pusiera sobre la mesa lo que la familia había tardado décadas en
            construir.
          </p>
        </>
      ),
    },
    {
      id: "la-negociacion",
      title: "Calma negocia: sin préstamo nuevo, sin hipoteca, sin sorpresas",
      body: (
        <>
          <p>
            El equipo de Calma analizó sus contratos, sus tipos de interés y la situación real de
            cada acreedor. El objetivo era claro: llegar a acuerdos extrajudiciales que bajaran
            tanto la cuota mensual como el total que Carmen iba a pagar.
          </p>
          <p>
            No se trata de agrupar todo en un préstamo nuevo —eso sería refinanciar, y casi siempre
            significa pagar más a largo plazo—. La reunificación extrajudicial es otra cosa: es
            negociar condiciones directamente, acreedor por acreedor, sin añadir deuda al sistema.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis",
                desc: "Revisión de préstamos, tarjeta e intereses reales acumulados",
              },
              {
                title: "Negociación",
                desc: "Contacto directo con cada acreedor para renegociar condiciones",
              },
              {
                title: "Acuerdo",
                desc: "Nuevas condiciones firmadas: menos cuota y menos total",
              },
              {
                title: "Cuota única más baja",
                desc: "Carmen paga un 40% menos cada mes, con un único pago organizado",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Los números antes y después",
      body: (
        <>
          <p>
            Ver la diferencia en blanco y negro fue lo que le hizo entender que había tomado la
            decisión correcta. No era solo alivio emocional: eran euros reales que volvían a su
            cuenta cada mes.
          </p>
          <BeforeAfterSplit
            before={[
              "Tres cuotas en fechas distintas",
              "Tarjeta acumulando intereses mes a mes",
              "Sin margen para imprevistos",
              "Local familiar en riesgo potencial",
            ]}
            after={[
              "Una sola cuota mensual un 40% más baja",
              "Total de la deuda reducido",
              "Sin préstamo nuevo ni hipoteca",
              "Local familiar intacto y fuera de la ecuación",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos-reunion",
      title: "Lo que muchas personas confunden sobre esta solución",
      body: (
        <>
          <p>
            La reunificación es quizás la solución financiera que más malentendidos genera. Carmen
            también tenía alguno antes de entender bien en qué consistía.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Reunificar es pedir un préstamo más grande para pagar los demás",
                reality:
                  "No: es negociar con los acreedores actuales para mejorar las condiciones, sin añadir nueva deuda",
              },
              {
                myth: "Necesito poner mi casa o un bien como garantía",
                reality:
                  "En la negociación extrajudicial no se exige ninguna garantía hipotecaria ni prenda",
              },
              {
                myth: "Si tengo bienes, no tengo ninguna opción viable",
                reality:
                  "Precisamente porque tenía el local, la LSO no era su vía. Pero la reunificación sí funcionó y protegió su patrimonio",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "vida-hoy",
      title: "Hoy Carmen sabe lo que va a pagar el mes que viene",
      body: (
        <>
          <p>
            Eso, que parece algo básico, es exactamente lo que la situación anterior le había
            quitado: certeza. Ahora tiene una sola fecha, una sola cifra y un margen que antes no
            existía. El local sigue siendo de la familia. Y ella ha vuelto a dormir con el móvil
            apagado.
          </p>
          <InlineCTA
            title="¿Tienes préstamos que se te van de las manos?"
            description="Analizamos tu situación gratis y te decimos si la negociación extrajudicial puede bajar tu cuota, sin préstamo nuevo ni garantías."
            buttonLabel="Ver si puedo bajar mi cuota"
          />
        </>
      ),
    },
  ],
};
