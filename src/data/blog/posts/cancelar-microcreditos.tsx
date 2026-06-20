import {
  ProcessTimeline,
  MythVsReality,
  WarningSignsList,
  RiskMatrix,
  BeforeAfterSplit,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogMicrocreditos from "@/assets/blog-microcreditos.jpg";

export const cancelarMicrocreditos: BlogPost = {
  slug: "cancelar-microcreditos",
  category: "Microcréditos",
  title:
    "Microcréditos que no puedes pagar: cómo salir del bucle de préstamos rápidos",
  seoTitle: "📉 Cancela tus microcréditos y frena la bola YA",
  metaDescription:
    "Frena la bola de los microcréditos: cómo parar el bucle, reclamar intereses abusivos y cancelar la deuda legalmente.",
  excerpt:
    "Pedir un préstamo rápido para tapar otro es el inicio de un bucle peligroso. Te explicamos cómo frenarlo y qué opciones legales tienes.",
  date: "19 junio 2026",
  readTime: "9 min",
  author: "Equipo legal Calma",
  publishedAt: "2026-06-19",
  heroImage: blogMicrocreditos,
  heroAlt:
    "Hombre joven mirando con preocupación una app de préstamos rápidos en su teléfono",
  keywords: [
    "microcréditos",
    "préstamos rápidos",
    "no puedo pagar microcréditos",
    "bucle de deudas",
    "intereses abusivos",
    "minicréditos online",
    "cancelar préstamos",
  ],
  faq: [
    {
      question: "¿Puedo cancelar los microcréditos que no puedo pagar?",
      answer:
        "Sí. Si tu situación es de insolvencia real, la Ley de Segunda Oportunidad permite cancelar microcréditos y préstamos personales. Además, muchos minicréditos tienen intereses tan altos que pueden reclamarse por usura y reducirse o anularse.",
    },
    {
      question: "¿Qué pasa si pido un microcrédito para pagar otro?",
      answer:
        "Entras en un bucle: cada nuevo préstamo añade intereses y comisiones, y la deuda total crece más rápido de lo que puedes amortizar. Romper ese círculo cuanto antes es clave para no agravar la insolvencia.",
    },
    {
      question: "¿Los intereses de los minicréditos son legales?",
      answer:
        "Algunos productos aplican TAE desproporcionados que pueden declararse usurarios y, por tanto, nulos. En esos casos solo se devuelve el capital prestado, no los intereses.",
    },
  ],
  sections: [
    {
      id: "el-bucle",
      title: "El bucle de los préstamos rápidos: cómo empieza",
      body: (
        <>
          <p>
            Los <strong>microcréditos</strong> o minicréditos se conceden en
            minutos, sin apenas papeleo y con la promesa de resolver un apuro
            puntual. El problema aparece después: plazos cortos, comisiones por
            aplazar y un coste real (TAE) que puede dispararse cuando no llegas a
            la fecha de devolución.
          </p>
          <p>
            Cuando no puedes pagar el primero, la salida más rápida parece pedir un
            segundo para cubrirlo. Y luego un tercero. Así nace el bucle: cada
            préstamo nuevo añade intereses sobre una deuda que ya no controlas, y
            la suma total crece más deprisa de lo que ingresas.
          </p>
          <BeforeAfterSplit
            before={[
              "Un apuro puntual cubierto con un minicrédito",
              "Un segundo préstamo para pagar el primero",
              "Comisiones por aplazar cada vencimiento",
              "La deuda total se multiplica en pocos meses",
            ]}
            after={[
              "Se detiene la cadena de préstamos nuevos",
              "Se ordena la deuda real y se prioriza",
              "Se reclaman los intereses abusivos",
              "Se elige una vía de salida estable",
            ]}
          />
        </>
      ),
    },
    {
      id: "senales-alarma",
      title: "Señales de que el problema ya es serio",
      body: (
        <>
          <p>
            Reconocer a tiempo que has cruzado de "apuro puntual" a "problema de
            solvencia" evita que la deuda siga creciendo. Estas son las señales más
            claras de que conviene actuar ya.
          </p>
          <WarningSignsList
            title="Cuándo dejar de pedir y empezar a resolver"
            subtitle="Si reconoces dos o más, busca ayuda antes de pedir otro préstamo"
            signs={[
              { title: "Pides para pagar", desc: "Necesitas un préstamo nuevo solo para cubrir la cuota de otro" },
              { title: "Varias plataformas", desc: "Tienes deuda viva en tres o más entidades de microcrédito a la vez" },
              { title: "Impagos y recobro", desc: "Empiezan las llamadas y mensajes de empresas de recobro" },
              { title: "Ficheros de morosos", desc: "Te han incluido o avisado de inclusión en ASNEF u otros ficheros" },
            ]}
          />
          <p>
            Si ya estás recibiendo presión de cobradores, conviene conocer tus
            derechos frente a las{" "}
            <InternalLink to="/blog/renegociar-acreedores">
              negociaciones con acreedores
            </InternalLink>{" "}
            antes de comprometerte a nada por teléfono.
          </p>
        </>
      ),
    },
    {
      id: "reclamar-intereses",
      title: "Intereses abusivos: muchos minicréditos son reclamables",
      body: (
        <>
          <p>
            No toda la deuda de microcréditos es exigible al cien por cien. Muchos
            productos aplican un coste tan elevado que puede considerarse
            <strong> usurario</strong> según la histórica{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-1908-5579">
              Ley de Represión de la Usura
            </ExtLink>
            . Si un TAE es notablemente superior al normal del dinero y
            desproporcionado, el contrato puede declararse nulo.
          </p>
          <p>
            La consecuencia es la misma que en las{" "}
            <InternalLink to="/blog/reclamar-tarjeta-revolving">
              tarjetas revolving
            </InternalLink>
            : solo tendrías que devolver el capital que recibiste, no los intereses
            ni las comisiones. Para valorar si tu TAE es excesivo se compara con los
            tipos medios que publica el{" "}
            <ExtLink href="https://www.bde.es/webbe/es/estadisticas/recursos/tipos-de-interes.html">
              Banco de España
            </ExtLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "que-via",
      title: "Qué vía encaja con tu situación",
      body: (
        <>
          <p>
            No todas las personas endeudadas con microcréditos necesitan lo mismo.
            La decisión depende de dos factores: si puedes o no pagar de forma
            sostenible y de cuánta urgencia hay (embargos, demandas, recobro
            activo).
          </p>
          <RiskMatrix
            axes={{ x: "Urgencia", y: "Capacidad de pago" }}
            cells={[
              { q: 1, label: "Reclamar intereses y reorganizar pagos", tone: "good" },
              { q: 2, label: "Negociar con acreedores un plan realista", tone: "warn" },
              { q: 3, label: "Revisar contratos y vigilar plazos", tone: "warn" },
              { q: 4, label: "Ley de Segunda Oportunidad: cancelación legal", tone: "bad" },
            ]}
          />
          <p>
            Si la insolvencia es real y no hay forma de pagar el conjunto de tus
            deudas, la salida de fondo es la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            , que permite cancelar microcréditos y préstamos personales cuando se
            cumplen los requisitos.
          </p>
        </>
      ),
    },
    {
      id: "como-salir",
      title: "Cómo salir del bucle paso a paso",
      body: (
        <>
          <p>
            La salida no es pedir un préstamo más grande para juntarlo todo, sino
            ordenar la deuda real y elegir la vía legal adecuada. Este es el orden
            que seguimos en un análisis.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Foto real", desc: "Listamos todas las deudas, intereses y vencimientos" },
              { title: "Frenar", desc: "Se deja de pedir crédito nuevo y se detiene la cadena" },
              { title: "Reclamar", desc: "Se identifican los contratos con intereses usurarios" },
              { title: "Resolver", desc: "Negociación o Segunda Oportunidad según tu solvencia" },
            ]}
          />
          <MythVsReality
            rows={[
              {
                myth: "Pidiendo uno más grande lo soluciono",
                reality: "Agrupar con más deuda solo aumenta intereses; no resuelve la insolvencia",
              },
              {
                myth: "Los microcréditos no se pueden cancelar",
                reality: "Sí entran en la Ley de Segunda Oportunidad si hay insolvencia y buena fe",
              },
              {
                myth: "Si dejo de pagar, desaparecen",
                reality: "No: se acumulan intereses, recargos y pueden acabar en demanda o embargo",
              },
            ]}
          />
          <InlineCTA
            title="¿Atrapado en un bucle de préstamos rápidos?"
            description="Analizamos tu caso gratis y te decimos cómo parar la bola y qué deuda puedes reclamar o cancelar."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};