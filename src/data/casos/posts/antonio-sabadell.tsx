import {
  BeforeAfterSplit,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/antonio-sabadell.jpg";

export const antonioSabadell: CasoExito = {
  slug: "antonio-sabadell-cancela-22179-euros",
  category: "Ley de Segunda Oportunidad",
  name: "Antonio R.",
  location: "Sabadell",
  debtAmount: "22.179 €",
  solution: "Ley de Segunda Oportunidad (exoneración total)",
  headline:
    "De pedir microcréditos para pagar microcréditos a cancelar 22.179 € en Sabadell",
  dek: "Antonio cayó en la trampa más habitual de las finanzas en precario: tapar un minicrédito con otro. Cuando quiso salir, la deuda ya superaba los 22.000 €. Hoy tiene saldo cero.",
  seoTitle: "Caso real: cancela 22.179 € de microcréditos en Sabadell",
  metaDescription:
    "Antonio R., de Sabadell, canceló 22.179 € acumulados en microcréditos con la Ley de Segunda Oportunidad. Te contamos cómo fue su proceso, paso a paso.",
  date: "18 junio 2026",
  readTime: "6 min",
  publishedAt: "2026-06-18",
  heroImage: casoFoto,
  heroAlt:
    "Hombre mirando tranquilo por la ventana en Sabadell tras cancelar sus deudas",
  keywords: [
    "caso real",
    "Ley de Segunda Oportunidad",
    "cancelar deudas Sabadell",
    "microcréditos",
    "minicréditos",
    "exoneración de deuda",
    "deuda espiral",
  ],
  faq: [
    {
      question: "¿Cuánta deuda canceló Antonio?",
      answer:
        "Un total de 22.179 € acumulados en una cadena de microcréditos y minicréditos, exonerados íntegramente con la Ley de Segunda Oportunidad.",
    },
    {
      question: "¿Es posible cancelar deudas de microcréditos con la LSO?",
      answer:
        "Sí. Los microcréditos y minicréditos son deuda ordinaria y pueden incluirse en el procedimiento de exoneración, siempre que la persona sea insolvente y actúe de buena fe.",
    },
    {
      question: "Antonio trabajaba: ¿cómo pudo acogerse a la ley?",
      answer:
        "Tener trabajo no excluye de la Ley de Segunda Oportunidad. Lo que importa es si el salario es suficiente para hacer frente a las deudas. En el caso de Antonio, los pagos superaban con creces lo que podía asumir, por lo que la insolvencia quedó acreditada.",
    },
  ],
  sections: [
    {
      id: "la-espiral",
      title: "Uno para tapar otro: la espiral que nadie ve venir",
      body: (
        <>
          <p>
            Antonio no tomó un microcrédito por capricho. Fue un mes ajustado, una
            avería inesperada y la promesa de que "en dos semanas lo devolvía". Lo
            que vino después lo conocen bien muchas familias: el primer minicrédito
            venció antes de cobrar, así que pidió otro para cubrirlo. Y luego otro.
          </p>
          <p>
            Cada uno llegaba con un tipo de interés que podía superar el 200 % TAE.
            Los importes eran pequeños, pero los intereses no. En menos de dos años,
            Antonio arrastraba <strong>22.179 €</strong> repartidos entre varias
            plataformas online de préstamos rápidos. Era asalariado, no tenía bienes
            a su nombre y destinaba casi todo su sueldo a cuotas que nunca
            terminaban de bajar.
          </p>
        </>
      ),
    },
    {
      id: "presion-diaria",
      title: "Cuando el móvil se convierte en el enemigo",
      body: (
        <>
          <p>
            Las empresas de microcréditos son especialmente insistentes en sus
            reclamaciones. Antonio recibía mensajes de texto, correos y llamadas
            a primera hora de la mañana y última de la tarde. Llegó a cambiar su
            número para ganar unos días de respiro, aunque sabía que era solo
            eso: días.
          </p>
          <p>
            Lo más duro, cuenta, era la vergüenza. Sentía que nadie entendería
            cómo alguien con trabajo podía estar en esa situación. Pero la espiral
            de microcréditos no distingue de ingresos: se alimenta de la urgencia
            y del coste de salir de ella.
          </p>
        </>
      ),
    },
    {
      id: "descubrimiento-lso",
      title: "La ley que Antonio no sabía que existía",
      body: (
        <>
          <p>
            Un compañero de trabajo mencionó la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-7345">
              Ley de Segunda Oportunidad
            </ExtLink>{" "}
            casi de pasada. Antonio buscó, desconfió, buscó más, y al final
            pidió un análisis gratuito de su caso. En esa primera llamada
            descubrió que su situación encajaba en los requisitos: insolvencia
            acreditada, buena fe y ausencia de bienes con los que responder.
          </p>
          <p>
            Si no conoces aún las condiciones exactas que exige la ley, puedes
            consultarlas en nuestra guía sobre{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              requisitos para cancelar deudas
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "Del primer análisis a la exoneración total",
      body: (
        <>
          <p>
            Una vez que Antonio confirmó que quería seguir adelante, el procedimiento
            avanzó con claridad. No tuvo que gestionar nada solo ni enfrentarse a
            los acreedores directamente.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis",
                desc: "Estudio gratuito de su situación: deudas, ingresos y bienes",
              },
              {
                title: "Expediente",
                desc: "Recogida de documentación y preparación de la solicitud judicial",
              },
              {
                title: "Procedimiento",
                desc: "Tramitación ante el juzgado; cesa la presión de los acreedores",
              },
              {
                title: "Exoneración",
                desc: "Cancelación definitiva de los 22.179 € y vida sin deuda",
              },
            ]}
          />
          <p>
            Desde que empezó el procedimiento, las reclamaciones se detuvieron.
            Antonio pudo, por fin, coger el teléfono sin temor.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Su vida antes y después",
      body: (
        <>
          <p>
            El cambio más inmediato fue recuperar el sueldo íntegro. Pero Antonio
            subraya otro efecto que no esperaba: dejar de calcular constantemente
            cuánto le quedaba para llegar al día siguiente.
          </p>
          <BeforeAfterSplit
            before={[
              "Cadena de minicréditos interminable",
              "Más del 200 % TAE en intereses",
              "Mensajes y llamadas de cobro a diario",
              "Vergüenza y aislamiento social",
            ]}
            after={[
              "22.179 € cancelados por ley",
              "Sueldo completo disponible cada mes",
              "Cero reclamaciones ni presión",
              "Recupera la tranquilidad y los planes",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Lo que Antonio creía (y no era verdad)",
      body: (
        <>
          <p>
            Antes de dar el paso, Antonio tenía en la cabeza varias ideas que
            lo frenaron durante meses.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si tengo trabajo no puedo acogerme",
                reality:
                  "El criterio es la insolvencia, no el desempleo. Un sueldo insuficiente para pagar las deudas cumple el requisito",
              },
              {
                myth: "Los microcréditos son deuda menor y no cuentan",
                reality:
                  "Cualquier deuda civil o mercantil puede incluirse en el procedimiento de exoneración",
              },
              {
                myth: "El proceso es carísimo y no me lo puedo permitir",
                reality:
                  "Calma analiza el caso sin coste y estructura los honorarios de forma que no bloqueen el inicio del procedimiento",
              },
            ]}
          />
          <InlineCTA
            title="¿Tu situación se parece a la de Antonio?"
            description="Cuéntanos tu caso y te decimos en la primera llamada cuánta deuda podrías cancelar, sin coste ni compromiso."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};
