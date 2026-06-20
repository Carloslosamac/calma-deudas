import {
  ProcessTimeline,
  MythVsReality,
  ComparisonTable,
  WarningSignsList,
  DocumentsChecklist,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogRevolving from "@/assets/blog-revolving.jpg";

export const reclamarTarjetaRevolving: BlogPost = {
  slug: "reclamar-tarjeta-revolving",
  category: "Tarjetas revolving",
  title:
    "Reclamar una tarjeta revolving por usura: cómo recuperar los intereses pagados",
  seoTitle: "💳 Reclamar tarjeta revolving: recupera lo pagado de más",
  metaDescription:
    "¿TAE abusivo en tu revolving? Reclama por usura y recupera lo pagado de más: cuándo procede, qué pruebas necesitas y cómo empezar.",
  excerpt:
    "Pagas cada mes y la deuda casi no baja: así funciona la trampa revolving. Si el interés es usurario, puedes reclamar y recuperar lo pagado de más.",
  date: "19 junio 2026",
  readTime: "9 min",
  author: "Equipo legal Calma",
  publishedAt: "2026-06-19",
  heroImage: blogRevolving,
  heroAlt:
    "Mujer revisando preocupada los extractos de su tarjeta revolving en la mesa de la cocina",
  keywords: [
    "tarjeta revolving",
    "reclamar revolving",
    "usura",
    "intereses abusivos",
    "TAE revolving",
    "Ley de Usura",
    "anatocismo",
    "recuperar intereses",
  ],
  faq: [
    {
      question: "¿Cuándo se considera usuraria una tarjeta revolving?",
      answer:
        "Cuando el interés (TAE) es notablemente superior al normal del dinero para ese tipo de crédito y resulta desproporcionado. El Tribunal Supremo compara el TAE del contrato con el tipo medio de las tarjetas revolving publicado por el Banco de España en la fecha de contratación.",
    },
    {
      question: "¿Qué puedo recuperar si gano la reclamación?",
      answer:
        "Si el contrato se declara nulo por usura, solo tendrás que devolver el capital efectivamente prestado. Todo lo pagado por encima de esa cantidad (intereses, comisiones, seguros vinculados) se te devuelve.",
    },
    {
      question: "¿Y si no puedo pagar la deuda revolving que me queda?",
      answer:
        "La reclamación por usura reduce o elimina lo que debes. Si aun así no puedes asumir el resto de tus deudas, conviene valorar la Ley de Segunda Oportunidad para cancelarlas de forma legal.",
    },
  ],
  sections: [
    {
      id: "que-es-revolving",
      title: "Qué es una tarjeta revolving y por qué la deuda no baja",
      body: (
        <>
          <p>
            Una tarjeta <strong>revolving</strong> es una línea de crédito que se
            renueva automáticamente: cada vez que pagas una cuota, vuelves a
            disponer de ese límite para seguir gastando. El problema es la forma
            de devolverla. En lugar de pagar el total a fin de mes, devuelves una
            cuota fija (a veces muy pequeña) y el resto genera intereses que se
            suman al capital pendiente.
          </p>
          <p>
            Ese mecanismo, conocido como <em>anatocismo</em> (intereses sobre
            intereses), explica por qué muchas personas pagan durante años sin que
            la deuda apenas se reduzca. Con cuotas bajas y un TAE elevado, gran
            parte de cada pago se va en intereses y casi nada amortiza el capital.
          </p>
          <p>
            No es un producto ilegal en sí mismo, pero cuando el interés es
            desproporcionado puede declararse <strong>usurario</strong> y, con
            ello, nulo. Es ahí donde nace tu derecho a reclamar.
          </p>
        </>
      ),
    },
    {
      id: "cuando-es-usura",
      title: "Cuándo una tarjeta revolving es usuraria",
      body: (
        <>
          <p>
            La referencia legal es la histórica{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-1908-5579">
              Ley de Represión de la Usura de 1908
            </ExtLink>{" "}
            (Ley Azcárate), que sigue vigente. El Tribunal Supremo la ha aplicado
            a las revolving estableciendo un criterio claro: hay usura cuando el
            interés es notablemente superior al normal del dinero y manifiestamente
            desproporcionado para las circunstancias del caso.
          </p>
          <p>
            Para saber qué es "lo normal", los tribunales usan los tipos medios que
            publica el{" "}
            <ExtLink href="https://www.bde.es/webbe/es/estadisticas/recursos/tipos-de-interes.html">
              Banco de España
            </ExtLink>{" "}
            para el crédito revolving en la fecha en que firmaste. Si tu TAE estaba
            muy por encima de esa media, tienes argumentos sólidos para reclamar.
          </p>
          <WarningSignsList
            title="Señales de que tu revolving puede ser reclamable"
            subtitle="Si reconoces varias, merece la pena revisar tu contrato"
            signs={[
              { title: "TAE muy alto", desc: "Tu tarjeta supera con holgura el tipo medio de las revolving en la fecha de contratación" },
              { title: "La deuda no baja", desc: "Llevas años pagando y el capital pendiente apenas se reduce" },
              { title: "Cuota mínima por defecto", desc: "Te asignaron una cuota baja que dispara los intereses" },
              { title: "Información poco clara", desc: "No te explicaron el coste real ni cómo funcionaba el sistema revolving" },
            ]}
          />
        </>
      ),
    },
    {
      id: "que-recuperas",
      title: "Qué puedes recuperar si la reclamación prospera",
      body: (
        <>
          <p>
            La consecuencia de declarar usurario un préstamo es contundente: el
            contrato es <strong>nulo</strong>. Y la nulidad por usura tiene un
            efecto muy favorable para el consumidor, porque solo estás obligado a
            devolver el capital que realmente recibiste.
          </p>
          <p>
            Eso significa que todo lo que hayas pagado por encima del dinero
            dispuesto —intereses, comisiones de gestión, seguros vinculados o
            cuotas de mantenimiento— debe devolvérsete. En muchos casos, la persona
            ya ha pagado más que el capital prestado, así que el saldo final puede
            ser cero o incluso a su favor.
          </p>
          <ComparisonTable
            title="Lo que cambia al declararse la usura"
            subtitle="Comparativa orientativa entre seguir pagando y reclamar"
            optionA="Seguir pagando la revolving"
            optionB="Reclamación por usura estimada"
            rows={[
              { label: "Intereses futuros", a: "Se siguen acumulando", b: "Desaparecen", highlight: "b" },
              { label: "Pagado de más", a: "No se recupera", b: "Se devuelve íntegro", highlight: "b" },
              { label: "Lo que debes", a: "Capital + intereses", b: "Solo el capital pendiente", highlight: "b" },
              { label: "Anotación en ficheros", a: "Puede mantenerse", b: "Se elimina si la deuda desaparece", highlight: "b" },
            ]}
          />
        </>
      ),
    },
    {
      id: "como-reclamar",
      title: "Cómo reclamar paso a paso",
      body: (
        <>
          <p>
            La reclamación empieza casi siempre por la vía extrajudicial: una
            solicitud formal a la entidad. Si no responde o rechaza la petición, se
            acude a los tribunales, donde la jurisprudencia es mayoritariamente
            favorable al consumidor en los casos de TAE desproporcionado.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Análisis", desc: "Revisamos el contrato, el TAE y el tipo medio del Banco de España en esa fecha" },
              { title: "Reclamación previa", desc: "Se solicita a la entidad la nulidad y la devolución de lo pagado de más" },
              { title: "Demanda", desc: "Si no hay acuerdo, se presenta demanda por usura" },
              { title: "Resolución", desc: "Sentencia de nulidad y devolución de los importes cobrados de más" },
            ]}
          />
          <p>
            Antes de empezar conviene reunir la documentación clave. Cuanto más
            completo sea el expediente, más sólida es la reclamación.
          </p>
          <DocumentsChecklist
            title="Documentación útil para reclamar"
            subtitle="La mayoría puedes pedirla a tu entidad por escrito"
            items={[
              "Contrato de la tarjeta revolving",
              "Extractos o historial de movimientos",
              "Cuadro de amortización si lo tienes",
              "Justificantes de pagos realizados",
              "Comunicaciones con la entidad",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos que frenan a quien podría reclamar",
      body: (
        <>
          <p>
            Muchas personas no reclaman por creencias equivocadas que circulan en
            foros. Estas son las más habituales y lo que dice realmente la ley.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si firmé el contrato, ya no puedo reclamar",
                reality: "La firma no convalida un interés usurario: la nulidad puede declararse aunque firmaras",
              },
              {
                myth: "Como ya cancelé la tarjeta, no hay nada que hacer",
                reality: "Puedes reclamar aunque la tarjeta esté cancelada y recuperar lo pagado de más",
              },
              {
                myth: "Reclamar me va a meter en ASNEF",
                reality: "Ejercer tus derechos no genera deuda; si la deuda se anula, procede salir del fichero",
              },
            ]}
          />
          <p>
            Si quieres comprobar cómo limpiar tu historial una vez resuelta la
            deuda, lo explicamos en la guía sobre{" "}
            <InternalLink to="/blog/salir-asnef">cómo salir de ASNEF</InternalLink>.
            Y si la revolving es solo una de varias deudas que no puedes asumir,
            quizá te interese revisar los{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              requisitos para cancelar tus deudas
            </InternalLink>{" "}
            por la vía legal.
          </p>
        </>
      ),
    },
    {
      id: "revolving-o-lso",
      title: "Reclamar la revolving o cancelar todas tus deudas",
      body: (
        <>
          <p>
            Reclamar por usura es la vía adecuada cuando el problema es,
            esencialmente, una o varias tarjetas con intereses abusivos y puedes
            sostener el resto de tu economía. En ese escenario recuperas dinero y
            reduces la carga sin necesidad de un procedimiento concursal.
          </p>
          <p>
            Pero si la revolving es la punta de un problema mayor —varios créditos,
            cuotas que no puedes pagar y una insolvencia real— la solución de fondo
            puede ser otra. Para entender qué vía encaja con tu situación, te
            ayudará leer cómo funciona la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            .
          </p>
          <InlineCTA
            title="¿Tienes una tarjeta revolving que no para de crecer?"
            description="Revisamos tu contrato gratis y te decimos si puedes reclamar por usura y cuánto podrías recuperar."
            buttonLabel="Revisar mi tarjeta gratis"
          />
        </>
      ),
    },
  ],
};