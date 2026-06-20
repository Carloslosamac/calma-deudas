import InlineCTA from "@/components/blog/InlineCTA";
import ContentHub from "@/components/blog/ContentHub";
import {
  ReunificacionCuotaCompare,
  ReunificarVsRefinanciar,
  CancelarDecisionTree,
} from "@/components/blog/diagrams/pillars";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-pilar-reunificacion.jpg";

export const guiaReunificarDeudas: BlogPost = {
  slug: "guia-reunificar-deudas",
  category: "Reunificación",
  title:
    "Reunificar deudas en 2026: la guía completa para bajar tu cuota y lo que debes",
  seoTitle: "🔗 Reunificar deudas 2026: baja cuota y total",
  metaDescription:
    "Guía 2026 para reunificar deudas: qué es de verdad, en qué se diferencia de refinanciar, cuándo conviene frente a la Ley de Segunda Oportunidad y cómo empezar.",
  date: "20 junio 2026",
  readTime: "11 min",
  publishedAt: "2026-06-20",
  updatedAt: "2026-06-20",
  author: "Equipo legal Calma",
  authors: ["javier-ferrer", "marta-belmonte"],
  heroImage,
  heroAlt:
    "Persona revisando varias facturas y un único extracto consolidado sobre la mesa de la cocina",
  keywords: [
    "reunificar deudas",
    "reunificación de deudas",
    "bajar cuota mensual",
    "negociar deudas",
    "reunificar vs refinanciar",
    "reunificar vs Ley de Segunda Oportunidad",
  ],
  tldr:
    "Reunificar deudas con Calma es negociar con tus acreedores para dejar una sola cuota mensual más baja y reducir el total adeudado, sin pedir un préstamo nuevo. Es la mejor opción cuando eres insolvente pero tienes bienes pagados de valor que te impiden, en la práctica, acogerte a la Ley de Segunda Oportunidad.",
  keyTakeaways: [
    "Reunificar (negociación extrajudicial) baja la cuota y el total; refinanciar (préstamo nuevo) suele subir el total.",
    "No necesitas pedir otro préstamo, ni hipotecar, ni alargar el plazo.",
    "Encaja cuando tienes una casa o un bien pagado de valor que bloquea la exoneración total.",
    "Si eres insolvente y no tienes bienes pagados, suele convenir la Ley de Segunda Oportunidad.",
    "El análisis siempre es individual: el primer paso es una valoración gratuita.",
  ],
  sidebar: {
    ctaTitle: "¿Reunificar o cancelar?",
    ctaDescription:
      "Estudiamos gratis tu caso y te decimos qué vía te conviene de verdad, sin venderte un préstamo.",
    ctaLabel: "Analizar mi caso gratis",
    benefits: [
      "Una sola cuota más baja",
      "Bajamos el total adeudado",
      "Sin préstamo nuevo ni avales",
      "Análisis honesto y sin compromiso",
    ],
  },
  faq: [
    {
      question: "¿Reunificar deudas es pedir un préstamo nuevo?",
      answer:
        "No. Reunificar con Calma es negociar con tus acreedores para dejar una sola cuota más baja y reducir el total. No pedimos un préstamo nuevo ni te hipotecamos: eso sería refinanciar, que es lo contrario.",
    },
    {
      question: "¿Reunificar baja lo que debo o solo la cuota?",
      answer:
        "Bien hecha, baja las dos cosas: la cuota mensual y el importe total adeudado, gracias a la negociación con cada acreedor.",
    },
    {
      question: "¿Necesito un aval o una hipoteca?",
      answer:
        "No. La reunificación por negociación no exige aval ni garantía hipotecaria, a diferencia de muchos productos de refinanciación bancaria.",
    },
    {
      question: "¿Cuándo es mejor la Ley de Segunda Oportunidad que reunificar?",
      answer:
        "Cuando eres insolvente y no tienes bienes pagados de valor. Si tienes una casa o un terreno pagado, ese patrimonio suele bloquear la exoneración total y la reunificación pasa a ser la vía más realista.",
    },
    {
      question: "¿Afecta a mi historial o a ASNEF?",
      answer:
        "Al ponerte al día con cuotas asumibles, dejas de generar nuevos impagos. La situación en ficheros depende del origen de cada deuda; lo revisamos en el análisis previo.",
    },
  ],
  sections: [
    {
      id: "respuesta-clara",
      title: "Qué es reunificar deudas (y qué no es)",
      body: (
        <>
          <p>
            Reunificar deudas es <strong>juntar todo lo que debes en una sola cuota mensual</strong>,
            más baja y asumible. Pero la palabra esconde dos caminos muy distintos y confundirlos
            puede costarte miles de euros.
          </p>
          <p>
            En Calma reunificamos mediante <strong>negociación extrajudicial</strong> con tus
            acreedores: rebajamos la cuota y, además, el total adeudado, <strong>sin pedir un
            préstamo nuevo</strong>, sin hipotecar nada y sin alargar artificialmente el plazo.
            Lo contrario es <em>refinanciar</em>: pedir un crédito nuevo para tapar los anteriores,
            algo que casi siempre sube el total que acabas pagando.
          </p>
          <ReunificacionCuotaCompare />
          <InlineCTA
            title="¿Cuánto bajaría tu cuota?"
            description="Te lo decimos en una valoración gratuita, con números reales de tu caso."
            buttonLabel="Calcular mi cuota nueva"
          />
        </>
      ),
    },
    {
      id: "reunificar-vs-refinanciar",
      title: "Reunificar no es refinanciar: la diferencia que más cara se paga",
      body: (
        <>
          <p>
            Muchos anuncios llaman «reunificación» a lo que en realidad es un préstamo nuevo con
            garantía hipotecaria. Te bajan la cuota… alargando el plazo y sumando intereses, así que
            terminas pagando mucho más. Esa no es nuestra forma de trabajar.
          </p>
          <ReunificarVsRefinanciar />
          <p>
            La regla es sencilla: si para «reunificar» te piden firmar un préstamo nuevo o poner tu
            casa como aval, no estás reunificando, estás refinanciando.
          </p>
        </>
      ),
    },
    {
      id: "cuando-conviene",
      title: "¿Cuándo conviene reunificar y cuándo la Ley de Segunda Oportunidad?",
      body: (
        <>
          <p>
            Reunificar es la mejor herramienta cuando eres <strong>insolvente pero tienes bienes
            pagados de valor</strong> (por ejemplo, una vivienda o un terreno en propiedad). Ese
            patrimonio suele impedir, en la práctica, la exoneración total de la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            , porque el procedimiento podría exigir liquidarlo.
          </p>
          <CancelarDecisionTree />
          <p>
            Si, por el contrario, no tienes bienes pagados de valor, la Ley de Segunda Oportunidad
            suele ser superior, porque puede <strong>cancelar la deuda por completo</strong> en
            lugar de reorganizarla.
          </p>
          <InlineCTA
            title="¿No sabes en qué grupo estás?"
            description="Cuéntanos tu situación y te decimos si te conviene reunificar o cancelar tus deudas."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
    {
      id: "como-funciona",
      title: "Cómo funciona la reunificación con Calma, paso a paso",
      body: (
        <>
          <ol>
            <li>
              <strong>Análisis previo gratuito:</strong> revisamos todas tus deudas, ingresos y
              bienes para confirmar que reunificar es lo que más te conviene.
            </li>
            <li>
              <strong>Estrategia de negociación:</strong> calculamos una cuota única asumible y el
              total objetivo tras la rebaja.
            </li>
            <li>
              <strong>Negociación con acreedores:</strong> hablamos con cada entidad para reducir
              intereses, recargos y capital cuando es posible.
            </li>
            <li>
              <strong>Acuerdo y cuota única:</strong> empiezas a pagar una sola cuota, más baja, con
              un total más pequeño.
            </li>
            <li>
              <strong>Seguimiento:</strong> te acompañamos hasta que la deuda queda saldada.
            </li>
          </ol>
          <blockquote>
            No te vendemos un producto financiero: negociamos en tu nombre para que pagues menos,
            no para que firmes más deuda.
          </blockquote>
        </>
      ),
    },
    {
      id: "errores",
      title: "Errores frecuentes al reunificar",
      body: (
        <>
          <ul>
            <li>Aceptar un préstamo con hipoteca creyendo que es una reunificación.</li>
            <li>Mirar solo la cuota mensual y no el total que acabarás pagando.</li>
            <li>Reunificar cuando en realidad encajas en la Ley de Segunda Oportunidad.</li>
            <li>Seguir pidiendo microcréditos mientras negocias.</li>
          </ul>
          <p>
            Antes de firmar nada, conviene comparar tu caso con otras vías como la{" "}
            <InternalLink to="/blog/renegociar-acreedores">renegociación con acreedores</InternalLink>{" "}
            o la propia Ley de Segunda Oportunidad.
          </p>
        </>
      ),
    },
    {
      id: "hub",
      title: "Todo sobre reunificar deudas",
      body: (
        <>
          <p>Resuelve las dudas más concretas sobre la reunificación:</p>
          <ContentHub
            groups={[
              {
                angle: "Conceptos clave de la reunificación",
                description: "Lo que de verdad significa reunificar y en qué se diferencia de refinanciar.",
                items: [
                  { title: "Reunificar vs. refinanciar: diferencias que cambian el resultado" },
                  { title: "Reunificar deudas sin pedir un préstamo nuevo: cómo es posible" },
                  { title: "¿Reunificar baja el total adeudado o solo la cuota?" },
                  { title: "Reunificación de deudas vs. Ley de Segunda Oportunidad", to: "/blog/guia-ley-segunda-oportunidad" },
                ],
              },
              {
                angle: "Tu caso concreto",
                description: "Cómo aplica la reunificación según tu situación.",
                items: [
                  { title: "Reunificar deudas con una hipoteca o casa pagada" },
                  { title: "Reunificar microcréditos y tarjetas revolving" },
                  { title: "Reunificar deudas estando en ASNEF", to: "/blog/salir-asnef" },
                  { title: "Reunificar deudas siendo autónomo", to: "/blog/autonomos-con-deudas" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo y te decimos si reunificar es tu mejor opción o si te conviene otra vía."
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
            Esta guía está elaborada por el equipo legal de Calma a partir de nuestra experiencia
            negociando deudas. Para el marco normativo nos apoyamos en fuentes oficiales:
          </p>
          <ul>
            <li>
              <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>: información al cliente
              bancario sobre préstamos y reunificación.
            </li>
            <li>
              <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
                Texto Refundido de la Ley Concursal
              </ExtLink>{" "}
              para comparar con la Ley de Segunda Oportunidad.
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