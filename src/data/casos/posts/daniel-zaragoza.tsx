import {
  BeforeAfterSplit,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/daniel-zaragoza.jpg";

export const danielZaragoza: CasoExito = {
  slug: "daniel-zaragoza-reunifica-cinco-deudas",
  category: "Reunificación de deudas",
  name: "Daniel R.",
  location: "Zaragoza",
  debtAmount: "Cuota -45%",
  solution: "Reunificación (negociación extrajudicial)",
  headline:
    "Pagaba a cinco entidades y llegaba al límite cada mes: cómo Daniel bajó su cuota un 45% sin pedir ningún préstamo nuevo en Zaragoza",
  dek: "Tenía su piso pagado y no quería arriesgarlo. Tampoco necesitaba cancelar su deuda: necesitaba que fuera manejable. La negociación extrajudicial con los acreedores fue la respuesta que nadie le había dado.",
  seoTitle: "Caso real: reunificación sin préstamo nuevo en Zaragoza",
  metaDescription:
    "Daniel, en Zaragoza, bajó su cuota mensual un 45% y redujo el total a pagar negociando directamente con sus 5 acreedores. Sin préstamo nuevo, sin hipotecar su piso. Su caso real.",
  date: "11 junio 2026",
  readTime: "6 min",
  publishedAt: "2026-06-11",
  heroImage: casoFoto,
  heroAlt: "Hombre tranquilo en su piso de Zaragoza después de reducir su cuota mensual de deuda un 45%",
  keywords: [
    "caso real",
    "reunificación deudas",
    "reducir cuota mensual",
    "negociación extrajudicial",
    "deudas múltiples Zaragoza",
    "sin préstamo nuevo",
  ],
  faq: [
    {
      question: "¿En qué consiste la reunificación de deudas de Calma?",
      answer:
        "Es una negociación directa con cada acreedor para renegociar las condiciones de la deuda: reducir tipos de interés, ampliar plazos o condonar parte del saldo. El resultado es una cuota única más baja y, en muchos casos, también un menor total a pagar. No implica contratar ningún préstamo nuevo.",
    },
    {
      question: "¿Por qué Daniel no optó por la Ley de Segunda Oportunidad?",
      answer:
        "Porque tenía su piso pagado, un bien de valor que quería conservar. La LSO está diseñada para personas sin bienes de valor que no pueden pagar. Daniel podía pagar, pero la carga mensual era insostenible. La reunificación era la solución adecuada para su perfil.",
    },
    {
      question: "¿Se hipoteca el piso en este proceso?",
      answer:
        "No. La reunificación que ofrece Calma es extrajudicial y no implica gravar ningún bien. El piso de Daniel no entró en ningún momento en el proceso.",
    },
  ],
  sections: [
    {
      id: "cinco-cuotas-un-problema",
      title: "Cinco entidades, cinco cuotas, un solo sueldo",
      body: (
        <>
          <p>
            Daniel no tenía una deuda descomunal. Tenía cinco deudas razonables por separado que,
            juntas, se habían vuelto imposibles de gestionar: una tarjeta de crédito, dos préstamos
            personales, una línea de financiación y un crédito al consumo. Cada uno con su fecha de
            cobro, su tipo de interés y su atención al cliente.
          </p>
          <p>
            Entre todos se llevaban una parte de su nómina que le dejaba sin margen para lo
            imprevisto. No había lujos, no había derroche. Solo el efecto acumulado de compromisos
            que había adquirido en momentos distintos y que ahora convivían todos a la vez.
          </p>
        </>
      ),
    },
    {
      id: "el-piso-la-clave",
      title: "El piso pagado: el activo que lo complicaba todo (y que quería conservar)",
      body: (
        <>
          <p>
            Daniel tenía su piso en Zaragoza completamente pagado. Llevaba años sin hipoteca y ese
            bien era su mayor estabilidad. Precisamente por eso, cuando buscó soluciones, la Ley de
            Segunda Oportunidad no encajaba en su situación.
          </p>
          <p>
            La LSO está pensada para personas insolventes sin bienes de valor que cubrir. Daniel no
            era insolvente: podía pagar, pero la suma de las cinco cuotas le dejaba al límite cada
            mes. Lo que necesitaba no era cancelar su deuda, sino hacerla manejable. Y, sobre todo,
            sin hipotecar lo único que tenía consolidado. Si quieres entender las diferencias entre
            vías, lo explicamos en la guía de{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              cómo elegir la solución según tu situación
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "que-es-la-reunificacion",
      title: "Qué es realmente la reunificación (y qué no es)",
      body: (
        <>
          <p>
            Cuando Daniel escuchó "reunificación de deudas" por primera vez, pensó lo mismo que
            piensa la mayoría: que se trataba de juntar todo en un préstamo nuevo y pagar durante
            más años. No era eso.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "La reunificación es pedir un préstamo nuevo para pagar los anteriores",
                reality: "Es una negociación directa con cada acreedor: se renegocian condiciones sin contratar nada nuevo",
              },
              {
                myth: "Hay que hipotecar el piso para que funcione",
                reality: "El proceso es extrajudicial y no requiere gravar ningún bien. El piso de Daniel no entró en ningún momento",
              },
              {
                myth: "Al final pagarás más porque alargas el plazo",
                reality: "La negociación puede reducir también el total a pagar, no solo la cuota mensual",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "el-proceso",
      title: "Cómo se negoció con los cinco acreedores",
      body: (
        <>
          <p>
            El proceso se desarrolló de forma ordenada. Calma analizó cada deuda por separado,
            identificó el margen de negociación con cada entidad y propuso nuevas condiciones. Daniel
            no tuvo que hablar con ningún acreedor directamente.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Análisis", desc: "Estudio de las cinco deudas: importes, intereses y capacidad de pago" },
              { title: "Negociación", desc: "Contacto con cada acreedor para renegociar condiciones individualmente" },
              { title: "Acuerdo", desc: "Cierre de nuevas condiciones con cada entidad: tipos reducidos, saldo ajustado" },
              { title: "Cuota única más baja", desc: "Daniel pasa a gestionar un único pago mensual un 45% inferior" },
            ]}
          />
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Lo que cambió en su bolsillo cada mes",
      body: (
        <>
          <p>
            El resultado no fue solo la reducción de la cuota. Fue también una bajada del total a
            pagar, gracias a que en la negociación se logró reducir los tipos de interés y, en algún
            caso, parte del saldo pendiente.
          </p>
          <BeforeAfterSplit
            before={[
              "Cinco cuotas a distintas entidades cada mes",
              "Sin margen para imprevistos",
              "Intereses altos que no bajaban el capital",
              "Gestión dispersa y agotadora",
            ]}
            after={[
              "Un único pago mensual un 45% inferior",
              "Total a pagar también reducido",
              "Sin préstamo nuevo ni garantías",
              "Piso pagado, intacto y sin gravar",
            ]}
          />
        </>
      ),
    },
    {
      id: "vida-hoy",
      title: "Hoy Daniel respira. Y su piso sigue siendo suyo",
      body: (
        <>
          <p>
            Lo que más valora Daniel no es solo el dinero que se ahorra cada mes. Es saber que tomó
            la decisión correcta para su situación: una solución a medida que no le obligó a
            arriesgar lo que había construido. El piso sigue siendo suyo, sin hipotecar, y la deuda
            ya no le impide vivir.
          </p>
          <InlineCTA
            title="¿Tienes varias deudas y una cuota que no te deja respirar?"
            description="Analizamos tu caso gratis y te decimos cuánto podríamos reducir tu cuota sin pedir ningún préstamo nuevo."
            buttonLabel="Ver cuánto puedo ahorrar"
          />
        </>
      ),
    },
  ],
};
