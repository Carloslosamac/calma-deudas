import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import {
  RevolvingCosteReal,
  ReclamacionRevolvingTimeline,
} from "@/components/blog/diagrams/pillars";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-revolving.jpg";

export const guiaCancelarRevolving: BlogPost = {
  slug: "guia-cancelar-tarjetas-revolving",
  category: "Tarjetas revolving",
  title:
    "Cancelar tarjetas revolving en 2026: la guía para anular intereses y recuperar tu dinero",
  seoTitle: "💳 Cancelar revolving 2026: recupera lo pagado",
  metaDescription:
    "Guía 2026 para cancelar tarjetas revolving: por qué son tan caras, cuándo son usura, cómo reclamar y recuperar lo pagado de más. Revisión de contrato gratis.",
  excerpt:
    "Las tarjetas revolving disparan la deuda con intereses muy altos. Si son abusivos, puedes anularlos y recuperar lo pagado de más. Te explicamos cómo.",
  date: "20 junio 2026",
  readTime: "10 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["javier-ferrer", "sara-belda"],
  heroImage,
  heroAlt:
    "Persona cortando con tijeras una tarjeta de crédito revolving sobre extractos bancarios",
  keywords: [
    "cancelar tarjetas revolving",
    "reclamar revolving",
    "intereses abusivos",
    "usura tarjeta",
    "recuperar dinero revolving",
    "anular contrato revolving",
  ],
  tldr:
    "Las tarjetas revolving aplican intereses muy altos (TAE habitual por encima del 20%) que, pagando la cuota mínima, pueden hacer que los intereses superen al capital prestado. Si la TAE es usuraria o el contrato no fue transparente, puedes anular esos intereses y recuperar lo pagado de más. El primer paso es revisar tu contrato gratis.",
  keyTakeaways: [
    "El interés revolving puede hacer que pagues más en intereses que el dinero que pediste.",
    "Pagar solo la cuota mínima alarga la deuda casi indefinidamente.",
    "Si la TAE es usuraria o el contrato no fue transparente, es reclamable.",
    "Al ganar la reclamación, se anulan los intereses y recuperas lo pagado de más.",
    "Revisar el contrato es gratis y no tienes nada que perder.",
  ],
  sidebar: {
    ctaTitle: "Revisa tu revolving gratis",
    ctaDescription:
      "Analizamos tu contrato y movimientos para decirte cuánto puedes recuperar.",
    ctaLabel: "Revisar mi tarjeta gratis",
    benefits: [
      "Sabrás si tu TAE es abusiva",
      "Calculamos lo pagado de más",
      "Sin anticipos",
      "Reclamamos por ti",
    ],
  },
  faq: [
    {
      question: "¿Qué es una tarjeta revolving?",
      answer:
        "Es una tarjeta de crédito en la que aplazas el pago con una cuota fija o un porcentaje, generando intereses muy altos. La deuda se renueva (revolving) y puede no bajar nunca si pagas la cuota mínima.",
    },
    {
      question: "¿Cuándo es usura una revolving?",
      answer:
        "Cuando el interés es notablemente superior al normal del dinero y desproporcionado. Los tribunales también anulan contratos por falta de transparencia. Lo revisamos en cada caso.",
    },
    {
      question: "¿Qué recupero si reclamo?",
      answer:
        "Se anulan los intereses y se devuelve todo lo pagado por encima del capital dispuesto. En muchos casos, eso cancela la deuda y además te devuelven dinero.",
    },
    {
      question: "¿Puedo reclamar si ya cancelé la tarjeta?",
      answer:
        "Sí, en muchos casos se puede reclamar aunque la tarjeta ya esté cancelada. Conviene revisar tu situación concreta.",
    },
  ],
  sections: [
    {
      id: "respuesta-clara",
      title: "Por qué las revolving se vuelven una trampa",
      body: (
        <>
          <p>
            Una tarjeta revolving deja que pagues «poco a poco», pero ese «poco» esconde intereses
            muy altos. El resultado: pagas durante años y la deuda apenas baja.
          </p>
          <RevolvingCosteReal />
          <p>
            La buena noticia es que muchos de esos intereses son <strong>reclamables</strong>, ya
            sea por usura o por falta de transparencia del contrato.
          </p>
          <InlineCTA
            title="¿Cuánto has pagado de más?"
            description="Revisamos tu contrato gratis y te decimos cuánto puedes recuperar."
            buttonLabel="Revisar mi tarjeta gratis"
          />
        </>
      ),
    },
    {
      id: "cuando-reclamar",
      title: "Cuándo puedes reclamar tu revolving",
      body: (
        <>
          <p>Tu tarjeta es reclamable, sobre todo, en dos supuestos:</p>
          <ul>
            <li>
              <strong>Usura:</strong> la TAE es notablemente superior a la normal y
              desproporcionada.
            </li>
            <li>
              <strong>Falta de transparencia:</strong> no entendiste el coste real ni cómo
              funcionaba el crédito al contratarlo.
            </li>
          </ul>
          <p>
            Si reclamar no encaja porque eres insolvente y arrastras más deudas, la salida puede ser
            la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>{" "}
            o{" "}
            <InternalLink to="/blog/guia-cancelar-deudas">cancelar el conjunto de tus deudas</InternalLink>.
          </p>
        </>
      ),
    },
    {
      id: "como-reclamar",
      title: "Cómo es el proceso de reclamación",
      body: (
        <>
          <ReclamacionRevolvingTimeline />
          <InlineCTA
            title="Empieza por la revisión gratuita"
            description="Sin anticipos: primero te decimos si tu caso tiene recorrido."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre tarjetas revolving",
      body: (
        <>
          <ContentHub
            groups={[
              {
                angle: "Reclamar y cancelar revolving",
                items: [
                  { title: "Reclamar una tarjeta revolving paso a paso", to: "/blog/reclamar-tarjeta-revolving" },
                  { title: "Cuándo una revolving es usura" },
                  { title: "Qué recuperas al ganar la reclamación" },
                  { title: "Reclamar aunque ya cancelaste la tarjeta" },
                ],
              },
              {
                angle: "Revolving y tu situación global",
                items: [
                  { title: "Revolving y Ley de Segunda Oportunidad", to: "/blog/guia-ley-segunda-oportunidad" },
                  { title: "Cancelar todas tus deudas, no solo la revolving", to: "/blog/guia-cancelar-deudas" },
                  { title: "Revolving, microcréditos y bucle de deuda", to: "/blog/cancelar-microcreditos" },
                  { title: "Revolving estando en ASNEF", to: "/blog/salir-asnef" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y revisamos tu tarjeta sin compromiso."
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
              tarjetas de crédito revolving y TAE.
            </li>
            <li>
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-1908-5579">
                Ley de Represión de la Usura
              </ExtLink>{" "}
              (Ley Azcárate).
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