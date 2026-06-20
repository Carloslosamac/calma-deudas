import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import {
  CancelarDecisionTree,
  InsolvenciaBienesMatrix,
} from "@/components/blog/diagrams/pillars";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-cancelar-deudas.jpg";

export const guiaCancelarDeudas: BlogPost = {
  slug: "guia-cancelar-deudas",
  category: "Segunda oportunidad",
  title:
    "Cancelar deudas en 2026: la guía completa para saber qué salida legal te conviene",
  seoTitle: "✅ Cancelar deudas 2026: qué vía legal es la tuya",
  metaDescription:
    "Guía 2026 para cancelar deudas en España: las vías legales reales (LSO, reunificar, reclamar usura), cuál encaja contigo y cómo empezar con un diagnóstico gratis.",
  excerpt:
    "No hay una sola forma de cancelar deudas: hay varias vías legales y cada una encaja con una situación distinta. Esta guía te ayuda a identificar la tuya.",
  date: "20 junio 2026",
  readTime: "12 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["marta-belmonte", "lucia-ordonez"],
  heroImage,
  heroAlt:
    "Abogado señalando con un bolígrafo las opciones para salir de deudas a una persona en su despacho",
  keywords: [
    "cancelar deudas",
    "cancelación de deudas",
    "eliminar deudas legalmente",
    "Ley de Segunda Oportunidad",
    "reunificar deudas",
    "reclamar usura",
  ],
  tldr:
    "Cancelar deudas legalmente en España depende de tu situación: si eres insolvente y no tienes bienes pagados de valor, la Ley de Segunda Oportunidad puede borrarlas; si tienes bienes pagados, suele convenir reunificar; y si eres solvente con intereses abusivos y poca deuda, la vía es reclamar. El primer paso es un diagnóstico gratuito.",
  keyTakeaways: [
    "No existe una única forma de cancelar deudas: la correcta depende de insolvencia, bienes y tipo de deuda.",
    "Ley de Segunda Oportunidad = insolvente sin bienes pagados de valor.",
    "Reunificar = insolvente con bienes pagados de valor.",
    "Reclamación judicial = solvente + intereses abusivos + deuda baja.",
    "Desconfía de quien promete cancelar deudas sin analizar tu caso.",
  ],
  sidebar: {
    ctaTitle: "¿Qué vía es la tuya?",
    ctaDescription:
      "Te lo decimos gratis tras revisar tus deudas, ingresos y bienes. Sin compromiso.",
    ctaLabel: "Diagnóstico gratuito",
    benefits: [
      "Análisis honesto de tu caso",
      "Comparamos todas las vías legales",
      "Sin anticipos ni sorpresas",
      "Te decimos la verdad, no lo que quieres oír",
    ],
  },
  faq: [
    {
      question: "¿De verdad se pueden cancelar las deudas legalmente?",
      answer:
        "Sí. La Ley de Segunda Oportunidad permite a personas insolventes de buena fe exonerar sus deudas. En otros casos, la deuda se reduce mediante negociación o se anula por intereses abusivos.",
    },
    {
      question: "¿Cuál es la mejor forma de cancelar deudas?",
      answer:
        "No hay una mejor para todos. Depende de si eres insolvente, de si tienes bienes pagados de valor y del tipo de deuda. Por eso el primer paso es un diagnóstico individual.",
    },
    {
      question: "¿Puedo cancelar deudas con Hacienda o la Seguridad Social?",
      answer:
        "Sí, con límites. La reforma concursal permite exonerar deuda pública con topes. Lo analizamos caso por caso.",
    },
    {
      question: "¿Tarda mucho cancelar las deudas?",
      answer:
        "Depende de la vía. Una reclamación o una negociación pueden resolverse en meses; un procedimiento de exoneración suele completarse dentro del mismo año.",
    },
  ],
  sections: [
    {
      id: "respuesta-clara",
      title: "Sí se pueden cancelar deudas: la clave es elegir bien la vía",
      body: (
        <>
          <p>
            «Cancelar deudas» no es una sola cosa. En España hay varias vías legales y cada una
            está pensada para una situación distinta. Elegir la equivocada puede hacerte pagar de
            más o perder oportunidades.
          </p>
          <p>Las tres grandes vías son:</p>
          <ul>
            <li>
              <strong>Ley de Segunda Oportunidad:</strong> exonera (borra) las deudas de personas
              insolventes de buena fe.
            </li>
            <li>
              <strong>Reunificación por negociación:</strong> reduce cuota y total cuando tienes
              bienes pagados de valor.
            </li>
            <li>
              <strong>Reclamación judicial:</strong> anula intereses abusivos y recupera lo pagado
              de más.
            </li>
          </ul>
          <InlineCTA
            title="¿Quieres saber cuál es la tuya?"
            description="Te lo decimos gratis tras revisar tu caso, sin compromiso."
            buttonLabel="Diagnóstico gratuito"
          />
        </>
      ),
    },
    {
      id: "triage",
      title: "El triage: tres preguntas para encontrar tu vía",
      body: (
        <>
          <p>
            Antes de decidir nada, respondemos a tres preguntas: ¿puedes pagar?, ¿tienes bienes
            pagados de valor?, ¿hay intereses abusivos? Con eso, el camino se aclara.
          </p>
          <CancelarDecisionTree />
          <InsolvenciaBienesMatrix />
        </>
      ),
    },
    {
      id: "lso",
      title: "Cancelar borrando: la Ley de Segunda Oportunidad",
      body: (
        <>
          <p>
            Si eres insolvente y no tienes bienes pagados de valor, la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>{" "}
            es casi siempre la mejor vía: puede <strong>cancelar tus deudas por completo</strong>{" "}
            mediante la Exoneración del Pasivo Insatisfecho.
          </p>
          <p>
            Cubre la mayoría de deudas con bancos, financieras, microcréditos, tarjetas y
            particulares, e incluso deuda pública con límites.
          </p>
        </>
      ),
    },
    {
      id: "reunificar-reclamar",
      title: "Cancelar reorganizando o reclamando",
      body: (
        <>
          <p>
            Si tienes una casa o un terreno pagado, ese patrimonio suele bloquear la exoneración
            total y entra en juego la{" "}
            <InternalLink to="/blog/guia-reunificar-deudas">reunificación de deudas</InternalLink>:
            negociamos para bajar cuota y total sin pedirte un préstamo nuevo.
          </p>
          <p>
            Y si en realidad puedes pagar pero te están aplicando intereses abusivos (típico de las{" "}
            <InternalLink to="/blog/reclamar-tarjeta-revolving">tarjetas revolving</InternalLink>),
            la vía es <strong>reclamar</strong>: anular esos intereses y recuperar lo pagado de más.
          </p>
          <InlineCTA
            title="Cada euro cuenta"
            description="Te decimos qué vía cancela más deuda en tu caso concreto."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
    {
      id: "cuidado",
      title: "Cuidado con las falsas promesas",
      body: (
        <>
          <p>
            Desconfía de quien promete cancelar tus deudas «seguro» sin haber visto tu caso, te
            pide grandes anticipos o te ofrece un préstamo para «solucionarlo». Cancelar deudas es
            un proceso legal serio que empieza siempre por un análisis honesto.
          </p>
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre cancelar deudas",
      body: (
        <>
          <ContentHub
            groups={[
              {
                angle: "Vías para cancelar deudas",
                items: [
                  { title: "Cancelar deudas con la Ley de Segunda Oportunidad", to: "/blog/guia-ley-segunda-oportunidad" },
                  { title: "Cancelar deudas reunificando", to: "/blog/guia-reunificar-deudas" },
                  { title: "Cancelar deudas reclamando intereses abusivos", to: "/blog/reclamar-tarjeta-revolving" },
                  { title: "Requisitos para cancelar deudas en 2026", to: "/blog/cancelar-deudas-requisitos" },
                ],
              },
              {
                angle: "Por tipo de deuda",
                items: [
                  { title: "Cancelar microcréditos y préstamos rápidos", to: "/blog/cancelar-microcreditos" },
                  { title: "Cancelar deudas con Hacienda y Seguridad Social", to: "/blog/deudas-hacienda-seguridad-social" },
                  { title: "Cancelar deudas y parar embargos", to: "/blog/embargos-segunda-oportunidad" },
                  { title: "Cancelar deudas siendo autónomo", to: "/blog/autonomos-con-deudas" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y te decimos exactamente cómo cancelar tu deuda."
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
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
                Texto Refundido de la Ley Concursal
              </ExtLink>{" "}
              (exoneración del pasivo insatisfecho).
            </li>
            <li>
              <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>: información al cliente
              bancario.
            </li>
          </ul>
          <p>
            <em>
              Aviso: guía informativa. No sustituye el asesoramiento legal personalizado; cada caso
              se analiza individualmente.
            </em>
          </p>
        </>
      ),
    },
  ],
};