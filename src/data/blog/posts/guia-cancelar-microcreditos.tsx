import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import {
  MicrocreditosBucle,
  TaeComparada,
  RutaSalidaSteps,
} from "@/components/blog/diagrams/pillars";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-microcreditos.jpg";

export const guiaCancelarMicrocreditos: BlogPost = {
  slug: "guia-cancelar-microcreditos",
  category: "Microcréditos",
  title:
    "Cancelar microcréditos en 2026: la guía para salir del bucle de los préstamos rápidos",
  seoTitle: "🔁 Cancelar microcréditos 2026: sal del bucle",
  metaDescription:
    "Guía 2026 para cancelar microcréditos y préstamos rápidos: por qué enganchan, cómo salir del bucle, cuándo reclamar y cuándo cancelarlos con la ley. Análisis gratis.",
  excerpt:
    "Los microcréditos enganchan: pides uno para pagar otro y la deuda crece. Te explicamos cómo romper el bucle y cancelar la deuda legalmente.",
  date: "20 junio 2026",
  readTime: "10 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["andres-solis", "lucia-ordonez"],
  heroImage,
  heroAlt:
    "Joven adulto revisando notificaciones de apps de microcréditos en el móvil y luego aliviado",
  keywords: [
    "cancelar microcréditos",
    "préstamos rápidos",
    "bucle de deuda",
    "microcréditos abusivos",
    "salir de los microcréditos",
    "deuda microcréditos",
  ],
  tldr:
    "Salir de los microcréditos no es pagar más rápido, es cambiar de estrategia: dejar de pedir nuevos, revisar si los intereses son reclamables y elegir la vía legal adecuada (reclamación, reunificación o Ley de Segunda Oportunidad). El primer paso es un análisis gratuito de tu caso.",
  keyTakeaways: [
    "El microcrédito engancha: pides uno para pagar otro y la deuda total crece.",
    "Su TAE real suele ser altísima comparada con un préstamo bancario.",
    "Lo primero es dejar de pedir nuevos microcréditos.",
    "Según tu caso: reclamar intereses, reunificar o cancelar con la Ley de Segunda Oportunidad.",
    "Cuanto antes actúes, menos crece la bola.",
  ],
  sidebar: {
    ctaTitle: "Rompe el bucle",
    ctaDescription:
      "Analizamos gratis tus microcréditos y te decimos cómo cancelarlos según tu caso.",
    ctaLabel: "Analizar mis microcréditos",
    benefits: [
      "Plan para dejar de pedir más",
      "Revisamos intereses reclamables",
      "Elegimos la mejor vía legal",
      "Sin anticipos",
    ],
  },
  faq: [
    {
      question: "¿Se pueden cancelar los microcréditos?",
      answer:
        "Sí. Según tu situación se pueden anular intereses abusivos, reducir la deuda por negociación o exonerarla con la Ley de Segunda Oportunidad si eres insolvente de buena fe.",
    },
    {
      question: "¿Por qué me enganchan los microcréditos?",
      answer:
        "Porque son rápidos y fáciles de pedir, pero sus intereses son muy altos. Eso obliga a pedir otro para pagar el anterior, creando un bucle que aumenta la deuda total.",
    },
    {
      question: "¿Puedo incluir los microcréditos en la Ley de Segunda Oportunidad?",
      answer:
        "Sí. Los microcréditos son deuda ordinaria y entran en la exoneración si cumples los requisitos de la Ley de Segunda Oportunidad.",
    },
    {
      question: "¿Qué hago si me reclaman varios a la vez?",
      answer:
        "Lo primero es no pedir más y buscar asesoramiento. Reunimos todas tus deudas y diseñamos una estrategia única en lugar de ir apagando fuegos.",
    },
  ],
  sections: [
    {
      id: "respuesta-clara",
      title: "El bucle del microcrédito y cómo se rompe",
      body: (
        <>
          <p>
            Los microcréditos resuelven un apuro… y crean otro mayor. Como sus intereses son muy
            altos, la cuota se come el siguiente sueldo y acabas pidiendo otro para cubrir el
            anterior. Así nace el bucle.
          </p>
          <MicrocreditosBucle />
          <p>
            Salir no es pagar más deprisa: es <strong>cambiar de estrategia legal</strong>.
          </p>
          <InlineCTA
            title="¿Atrapado en el bucle?"
            description="Te ayudamos a salir con un plan claro y un análisis gratuito."
            buttonLabel="Analizar mis microcréditos"
          />
        </>
      ),
    },
    {
      id: "coste-real",
      title: "Lo que de verdad cuesta un préstamo rápido",
      body: (
        <>
          <p>
            Comparado con un préstamo bancario, el microcrédito rápido tiene una TAE
            desproporcionada. Verlo en perspectiva ayuda a entender por qué la deuda no baja.
          </p>
          <TaeComparada />
          <p>
            Cuando esos intereses son abusivos, son <strong>reclamables</strong>, igual que en las{" "}
            <InternalLink to="/blog/guia-cancelar-tarjetas-revolving">tarjetas revolving</InternalLink>.
          </p>
        </>
      ),
    },
    {
      id: "ruta",
      title: "Tu ruta de salida, según tu caso",
      body: (
        <>
          <RutaSalidaSteps />
          <p>
            Si eres insolvente y no tienes bienes pagados de valor, la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>{" "}
            puede cancelar todos tus microcréditos. Si tienes bienes pagados, suele convenir{" "}
            <InternalLink to="/blog/guia-reunificar-deudas">reunificar</InternalLink>.
          </p>
          <InlineCTA
            title="Vamos a tu caso"
            description="Te decimos qué vía cancela más deuda en tu situación concreta."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre cancelar microcréditos",
      body: (
        <>
          <ContentHub
            groups={[
              {
                angle: "Salir de los microcréditos",
                items: [
                  { title: "Cancelar microcréditos paso a paso", to: "/blog/cancelar-microcreditos" },
                  { title: "Microcréditos abusivos: cuándo reclamar" },
                  { title: "Cómo dejar de pedir microcréditos" },
                  { title: "Varios microcréditos a la vez: qué hacer primero" },
                ],
              },
              {
                angle: "Microcréditos y tu situación global",
                items: [
                  { title: "Microcréditos y Ley de Segunda Oportunidad", to: "/blog/guia-ley-segunda-oportunidad" },
                  { title: "Cancelar todas tus deudas, no solo los microcréditos", to: "/blog/guia-cancelar-deudas" },
                  { title: "Reunificar microcréditos y tarjetas", to: "/blog/guia-reunificar-deudas" },
                  { title: "Microcréditos estando en ASNEF", to: "/blog/salir-asnef" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y te decimos cómo cancelar tus microcréditos."
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
          <ul>
            <li>
              <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>: información sobre
              préstamos al consumo y TAE.
            </li>
            <li>
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
                Texto Refundido de la Ley Concursal
              </ExtLink>{" "}
              (exoneración del pasivo insatisfecho).
            </li>
          </ul>
          <p>
            <em>
              Aviso: guía informativa, no sustituye el asesoramiento legal personalizado. Cada caso
              se analiza individualmente.
            </em>
          </p>
        </>
      ),
    },
  ],
};