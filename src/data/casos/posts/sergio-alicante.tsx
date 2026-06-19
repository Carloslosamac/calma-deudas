import {
  BeforeAfterSplit,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/sergio-alicante.jpg";

export const sergioAlicante: CasoExito = {
  slug: "sergio-alicante-recupera-intereses-revolving",
  category: "Tarjetas revolving",
  name: "Sergio D.",
  location: "Alicante",
  debtAmount: "5.120 € recuperados",
  solution: "Reclamación judicial por usura",
  headline:
    "Pagó durante años y la deuda no bajaba: reclamó por usura y recuperó 5.120 €",
  dek: "Sergio tenía trabajo, pagaba puntualmente y aun así su tarjeta revolving nunca se liquidaba. El motivo era una TAE que rozaba el 27 %. Un juzgado declaró el contrato nulo y le devolvió todo lo que había pagado de más.",
  seoTitle: "Caso real: recupera 5.120 € de una tarjeta revolving en Alicante",
  metaDescription:
    "Sergio D., de Alicante, recuperó 5.120 € tras reclamar judicialmente su tarjeta revolving por usura. El contrato fue declarado nulo. Te contamos cómo fue el proceso.",
  date: "5 junio 2026",
  readTime: "6 min",
  publishedAt: "2026-06-05",
  heroImage: casoFoto,
  heroAlt:
    "Hombre tranquilo mirando el mar en Alicante tras recuperar su dinero de una tarjeta revolving",
  keywords: [
    "tarjeta revolving",
    "usura",
    "reclamación judicial",
    "TAE abusiva",
    "contrato nulo",
    "caso real Alicante",
    "recuperar dinero tarjeta",
  ],
  faq: [
    {
      question: "¿Qué es una tarjeta revolving y por qué es problemática?",
      answer:
        "Una tarjeta revolving permite aplazar el pago de compras, pero los intereses se calculan sobre el saldo pendiente mes a mes. Con TAE superiores al 20 %, aunque pagues cuotas altas, el saldo casi no baja porque los intereses lo compensan continuamente.",
    },
    {
      question: "¿Qué significa que el contrato sea nulo por usura?",
      answer:
        "Cuando un juez declara el contrato nulo por usura, se considera que nunca existió en sus términos abusivos. El cliente solo está obligado a devolver el capital que recibió, sin intereses. Si ya pagó más de ese capital, la entidad debe devolverle la diferencia.",
    },
    {
      question: "¿Hay que ir a juicio para reclamar una revolving?",
      answer:
        "No siempre llega a juicio oral. Muchos casos se resuelven mediante sentencia en procedimiento ordinario o incluso mediante acuerdo extrajudicial una vez presentada la reclamación. Depende de la entidad y del importe.",
    },
  ],
  sections: [
    {
      id: "la-trampa-invisible",
      title: "Pagaba religiosamente, pero la deuda no se movía",
      body: (
        <>
          <p>
            Sergio es técnico de mantenimiento en Alicante. Tiene contrato
            indefinido, paga su alquiler al día y nunca ha dejado de trabajar.
            No es el perfil que uno imagina cuando piensa en problemas de deuda.
            Y sin embargo, llevaba casi cuatro años atrapado en un bucle que no
            entendía.
          </p>
          <p>
            Había contratado una tarjeta revolving para afrontar una reforma del
            baño. Al principio parecía cómodo: cuota fija cada mes, sin
            preocupaciones. Lo que Sergio no vio en la letra pequeña era la{" "}
            <strong>TAE del 26,82 %</strong>. Mes tras mes pagaba su cuota y el
            saldo apenas se reducía. Los intereses devoraban casi todo el pago y
            el capital vivo se quedaba prácticamente igual.
          </p>
          <p>
            Cuando sacó la calculadora y sumó todo lo abonado desde el primer
            recibo, se dio cuenta de que había pagado bastante más de lo que
            había gastado. La deuda seguía ahí, como si sus pagos fueran agua
            vertida en un cubo sin fondo.
          </p>
        </>
      ),
    },
    {
      id: "descubrimiento",
      title: "Una sentencia del Supremo que lo cambió todo",
      body: (
        <>
          <p>
            Fue leyendo noticias económicas como Sergio se topó con la
            jurisprudencia del Tribunal Supremo sobre tarjetas revolving. El
            alto tribunal ha establecido que tipos de interés muy superiores a la
            media del mercado pueden considerarse{" "}
            <ExtLink href="https://www.poderjudicial.es">
              usurarios según la Ley Azcárate de 1908
            </ExtLink>
            , lo que permite declarar el contrato nulo.
          </p>
          <p>
            Con esa información pidió un análisis de su contrato. La revisión
            confirmó lo que sospechaba: el tipo aplicado superaba con creces el
            doble de la media del mercado en el momento de la firma. Había base
            legal más que suficiente para reclamar. Si quieres entender mejor
            cómo funciona este tipo de reclamación, puedes leer nuestra guía
            sobre{" "}
            <InternalLink to="/blog/tarjetas-revolving-reclamacion">
              cómo reclamar una tarjeta revolving
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "Del contrato al juzgado: cómo avanzó la reclamación",
      body: (
        <>
          <p>
            La reclamación siguió un camino claro. Sergio no tuvo que
            enfrentarse solo a la entidad ni presentarse en ningún juzgado: el
            equipo legal llevó todo el proceso.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis del contrato",
                desc: "Se revisó la TAE aplicada y se comparó con la media del mercado en la fecha de firma",
              },
              {
                title: "Reclamación formal",
                desc: "Se presentó la demanda judicial solicitando la nulidad del contrato por usura",
              },
              {
                title: "Sentencia favorable",
                desc: "El juzgado declaró el contrato nulo: Sergio solo debía el capital recibido",
              },
              {
                title: "Devolución de 5.120 €",
                desc: "La entidad reintegró la diferencia entre lo pagado y el capital original dispuesto",
              },
            ]}
          />
          <p>
            Desde que se inició el procedimiento, Sergio dejó de pagar cuotas a
            la espera de la resolución. La sentencia le dio la razón y la
            entidad procedió a la devolución del importe pagado en exceso.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Lo que cambió cuando llegó la resolución",
      body: (
        <>
          <p>
            El resultado no fue cancelar todas sus deudas ni salir de ningún
            fichero de morosos: Sergio nunca había dejado de pagar. Lo que
            cambió fue que recuperó dinero que nunca debió haber salido de su
            bolsillo, y cerró para siempre ese contrato leonino.
          </p>
          <BeforeAfterSplit
            before={[
              "TAE del 26,82 %: intereses devoraban cada cuota",
              "Saldo que no bajaba pese a pagar puntualmente",
              "Años de pagos sin ver el fin de la deuda",
              "Sensación de haber caído en una trampa",
            ]}
            after={[
              "Contrato declarado nulo por usura",
              "5.120 € devueltos por la entidad",
              "Tarjeta cancelada definitivamente",
              "Tranquilidad y dinero recuperado",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos-revolving",
      title: "Lo que muchos creen sobre las revolving (y no es así)",
      body: (
        <>
          <p>
            Muchas personas en la misma situación que Sergio no reclaman porque
            parten de ideas equivocadas sobre qué es posible y qué no.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si firmé el contrato, no puedo hacer nada",
                reality:
                  "La usura es ilegal independientemente de si firmaste. Un contrato con intereses abusivos puede ser declarado nulo por un juez",
              },
              {
                myth: "Solo puedo reclamar si dejé de pagar",
                reality:
                  "Puedes reclamar aunque hayas pagado siempre. De hecho, haber pagado de más es precisamente lo que te da derecho a la devolución",
              },
              {
                myth: "La reclamación es para gente con muchas deudas o insolvente",
                reality:
                  "La reclamación por usura es para personas solventes que han sido víctimas de un contrato abusivo, sin importar su nivel de ingresos",
              },
            ]}
          />
          <InlineCTA
            title="¿Tienes una tarjeta revolving con intereses muy altos?"
            description="Cuéntanos tu caso y revisamos tu contrato sin coste. Si hay base para reclamar, te lo decimos en la primera llamada."
            buttonLabel="Revisar mi contrato gratis"
          />
        </>
      ),
    },
  ],
};
