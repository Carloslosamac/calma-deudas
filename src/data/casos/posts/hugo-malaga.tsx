import {
  BeforeAfterSplit,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/hugo-malaga.jpg";

export const hugoMalaga: CasoExito = {
  slug: "hugo-malaga-reunifica-tres-prestamos",
  category: "Reunificación de deudas",
  name: "Hugo P.",
  location: "Málaga",
  debtAmount: "3 cuotas → 1",
  solution: "Reunificación (negociación extrajudicial)",
  headline:
    "Tres préstamos, tres fechas, una angustia constante: Hugo pasó a pagar una sola cuota más baja sin tocar su coche ni su garaje",
  dek: "Cada vencimiento era un susto. Con el coche y la plaza de garaje pagados que no quería perder, la refinanciación clásica no era una opción. La negociación extrajudicial sí lo fue.",
  seoTitle: "Caso real: unifica tres préstamos en una cuota más baja en Málaga",
  metaDescription:
    "Hugo, de Málaga, tenía tres préstamos con vencimientos distintos y bienes pagados que proteger. Con negociación extrajudicial pasó a una sola cuota más baja y redujo el total de su deuda.",
  date: "9 junio 2026",
  readTime: "6 min",
  publishedAt: "2026-06-09",
  heroImage: casoFoto,
  heroAlt: "Hombre tranquilo revisando su móvil sentado en un coche aparcado en Málaga",
  keywords: [
    "caso real",
    "reunificación de deudas",
    "tres préstamos una cuota",
    "negociación extrajudicial",
    "Málaga",
    "reducir deuda",
    "sin refinanciar",
  ],
  faq: [
    {
      question: "¿Qué diferencia hay entre reunificar y refinanciar?",
      answer:
        "Refinanciar suele significar pedir un préstamo nuevo, más largo y a veces más caro, para pagar los anteriores. La reunificación extrajudicial de Calma no genera deuda nueva: negocia directamente con los acreedores para reducir cuota y total.",
    },
    {
      question: "¿Por qué Hugo no eligió la Ley de Segunda Oportunidad?",
      answer:
        "La LSO está diseñada para personas en insolvencia real, generalmente sin patrimonio que cubra la deuda. Hugo tenía coche y garaje pagados que quería conservar, por lo que la vía extrajudicial era más adecuada.",
    },
    {
      question: "¿Cuántos préstamos tenía y cómo quedaron?",
      answer:
        "Tenía tres préstamos personales con fechas de pago distintas. Tras la negociación, pasó a tener una única cuota mensual más baja que cualquiera de las tres anteriores por separado, y el total de la deuda también se redujo.",
    },
  ],
  sections: [
    {
      id: "tres-cuotas-tres-sobresaltos",
      title: "El 5, el 15 y el 22: tres fechas que le ponían el estómago del revés",
      body: (
        <>
          <p>
            Hugo P. recordaba perfectamente los días del mes que le pesaban. El día 5 saltaba la
            cuota del préstamo del coche —que ya estaba pagado, pero que él había vuelto a pedir
            para otra cosa—. El 15, el del crédito que pidió para una reforma. Y el 22, el de un
            préstamo personal que fue la forma más rápida de resolver un imprevisto familiar.
          </p>
          <p>
            Tres préstamos que en su momento parecían manejables por separado. Juntos, en cambio,
            le comían casi la mitad del sueldo y le dejaban sin capacidad de maniobra para nada
            más. "Era vivir en modo supervivencia, de cuota en cuota", explica.
          </p>
        </>
      ),
    },
    {
      id: "lo-que-queria-proteger",
      title: "Un coche que usaba para trabajar y una plaza que había costado años pagar",
      body: (
        <>
          <p>
            Antes de buscar soluciones, Hugo hizo inventario de lo que no estaba dispuesto a
            negociar. Su coche era su herramienta de trabajo: sin él, muchos días no había
            ingresos. Y la plaza de garaje era el único bien que la familia había terminado de
            pagar tras años de esfuerzo.
          </p>
          <p>
            Cuando alguien le habló de la{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              Ley de Segunda Oportunidad
            </InternalLink>
            , Hugo investigó y entendió que esa vía estaba pensada para situaciones de insolvencia
            real, normalmente sin activos que cubran la deuda. Su caso era diferente: podía pagar,
            pero las condiciones actuales lo asfixiaban. Lo que necesitaba no era exoneración sino
            respirar.
          </p>
        </>
      ),
    },
    {
      id: "la-negociacion-paso-a-paso",
      title: "Cómo se negocia con tres acreedores a la vez",
      body: (
        <>
          <p>
            Calma analizó los tres contratos: tipos de interés, condiciones de amortización y
            margen real de cada entidad para negociar. A partir de ahí, el equipo contactó con
            cada acreedor de forma independiente para proponer nuevas condiciones, sin necesidad
            de abrir un expediente judicial ni de ofrecer ningún bien en garantía.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis",
                desc: "Estudio de los tres préstamos: tipos, saldos y márgenes de negociación",
              },
              {
                title: "Negociación",
                desc: "Acercamiento extrajudicial a cada acreedor con una propuesta concreta",
              },
              {
                title: "Acuerdo",
                desc: "Los tres contratos se redefinen con nuevas condiciones más favorables",
              },
              {
                title: "Cuota única más baja",
                desc: "Hugo paga una sola vez al mes, menos que antes y con total reducido",
              },
            ]}
          />
          <p>
            El resultado fue lo que buscaba: un solo pago mensual, una única fecha y una cuota
            inferior a la suma de las tres anteriores. Sin ningún préstamo nuevo en medio.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "De tres frentes a uno solo, y más barato",
      body: (
        <>
          <p>
            Más que los números en sí, lo que cambió fue la sensación de control. Saber que no
            hay más sorpresas en el calendario tiene un valor que no aparece en ninguna tabla de
            amortización.
          </p>
          <BeforeAfterSplit
            before={[
              "Tres cuotas en días distintos del mes",
              "Sin margen para imprevistos",
              "Riesgo de impago si un mes fallaba algo",
              "Coche y plaza como preocupación latente",
            ]}
            after={[
              "Una sola cuota mensual más baja",
              "Total de la deuda reducido",
              "Sin préstamo nuevo ni garantías aportadas",
              "Coche y garaje completamente intactos",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos-reunificacion",
      title: "Tres cosas que Hugo creía y resultaron no ser ciertas",
      body: (
        <>
          <p>
            Como la mayoría de las personas, Hugo llegó con ideas preconcebidas sobre lo que
            significaba "reunificar". Estas son las que más le habían frenado.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Reunificar es lo mismo que pedir un préstamo más grande",
                reality:
                  "La negociación extrajudicial no genera deuda nueva: renegocia las existentes directamente con cada acreedor",
              },
              {
                myth: "Si tengo bienes pagados, tengo que ponerlos como garantía",
                reality:
                  "No se exige ningún aval ni garantía hipotecaria en este tipo de negociación",
              },
              {
                myth: "Con tres acreedores distintos es imposible llegar a un solo acuerdo",
                reality:
                  "Se negocia con cada uno por separado y el resultado se traduce en una única cuota ordenada para el cliente",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "vida-hoy",
      title: "Ahora Hugo solo mira el calendario una vez al mes",
      body: (
        <>
          <p>
            El 5, el 15 y el 22 han dejado de existir en su cabeza. Solo hay una fecha, una
            cifra y la certeza de que no va a aparecer ningún sobresalto inesperado. El coche
            sigue aparcado en la plaza que tanto trabajo costó pagar. Y él ha vuelto a pensar
            en el mes siguiente en vez de vivir en el actual.
          </p>
          <InlineCTA
            title="¿Tienes varios préstamos que no paran de crecer?"
            description="Estudiamos tu caso sin coste y te decimos si la negociación extrajudicial puede convertir tus cuotas en una sola más baja, sin préstamo nuevo."
            buttonLabel="Quiero reducir mis cuotas"
          />
        </>
      ),
    },
  ],
};
