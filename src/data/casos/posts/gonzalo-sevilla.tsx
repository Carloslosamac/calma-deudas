import {
  EmbargoFlowChart,
  ProcessTimeline,
  BeforeAfterSplit,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/gonzalo-sevilla.jpg";

export const gonzaloSevilla: CasoExito = {
  slug: "gonzalo-sevilla-cancela-88600-euros",
  category: "Ley de Segunda Oportunidad",
  name: "Gonzalo L.",
  location: "Sevilla",
  debtAmount: "88.600 €",
  solution: "Ley de Segunda Oportunidad (exoneración total)",
  headline:
    "Le embargaban la nómina cada mes: cómo Gonzalo canceló 88.600 € y recuperó su sueldo en Sevilla",
  dek: "Llevaba tiempo viendo cómo una parte de su paga desaparecía antes de llegar. Tenía embargos activos y una deuda que no paraba de crecer. La Ley de Segunda Oportunidad lo paró todo de golpe.",
  seoTitle: "Caso real: cancela 88.600 € con embargo de nómina en Sevilla",
  metaDescription:
    "Gonzalo L., de Sevilla, tenía embargos activos y 88.600 € de deuda. Con la Ley de Segunda Oportunidad frenó los embargos y exoneró toda la deuda. Su caso, paso a paso.",
  date: "17 junio 2026",
  readTime: "7 min",
  publishedAt: "2026-06-17",
  heroImage: casoFoto,
  heroAlt:
    "Hombre sevillano con expresión de alivio tras cancelar deudas y frenar embargos de nómina",
  keywords: [
    "caso real",
    "Ley de Segunda Oportunidad",
    "cancelar deudas Sevilla",
    "embargo de nómina",
    "exoneración de deuda",
    "frenar embargo",
    "deudas con embargo",
  ],
  faq: [
    {
      question: "¿La Ley de Segunda Oportunidad puede frenar un embargo de nómina?",
      answer:
        "Sí. Una vez iniciado el procedimiento concursal, los embargos vigentes quedan paralizados. Gonzalo dejó de perder parte de su nómina desde que arrancó el proceso.",
    },
    {
      question: "¿Cuánto canceló Gonzalo en total?",
      answer:
        "88.600 € de deuda acumulada, incluyendo préstamos personales y deuda con entidades financieras, exonerados íntegramente mediante la Ley de Segunda Oportunidad.",
    },
    {
      question: "¿Hace falta no tener bienes para que se frenen los embargos?",
      answer:
        "El requisito clave es la insolvencia y la buena fe, no la ausencia absoluta de bienes. En el caso de Gonzalo, no tenía bienes de valor significativo y su situación de insolvencia quedó acreditada desde el primer análisis.",
    },
  ],
  sections: [
    {
      id: "nómina-sangrada",
      title: "El recibo que nunca llegaba completo",
      body: (
        <>
          <p>
            Gonzalo se enteró del primer embargo cuando ya había ocurrido. Un
            descuento en nómina que no reconocía, una llamada a recursos humanos
            y la confirmación de lo que temía: un juzgado había ordenado retener
            parte de su sueldo para pagar una deuda antigua. Y había más de una.
          </p>
          <p>
            Con varios embargos activos y <strong>88.600 €</strong> de deuda
            repartida entre préstamos personales y productos financieros, su
            margen de maniobra era casi nulo. Sin bienes propios que liquidar y
            con el sueldo intervenido, Gonzalo buscó una salida real.
          </p>
        </>
      ),
    },
    {
      id: "cómo-funciona-embargo",
      title: "Cómo se llega a un embargo de nómina",
      body: (
        <>
          <p>
            Muchas personas no entienden del todo el camino que lleva a que un
            acreedor pueda tocar su salario. El diagrama siguiente muestra los
            pasos habituales desde el impago inicial hasta la retención judicial.
          </p>
          <EmbargoFlowChart />
          <p>
            Gonzalo había recorrido ese camino casi sin darse cuenta. Cada paso
            ocurrió mientras intentaba negociar con los acreedores por su cuenta,
            sin el respaldo legal necesario para detenerlo.
          </p>
        </>
      ),
    },
    {
      id: "la-lso-como-escudo",
      title: "La herramienta que nadie le había mencionado",
      body: (
        <>
          <p>
            Cuando llegó a Calma, lo primero que descubrió es que existía un
            mecanismo legal para parar los embargos y, a la vez, iniciar el
            camino hacia la exoneración total. La{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-7345">
              Ley de Segunda Oportunidad
            </ExtLink>{" "}
            no solo cancela deuda: protege al insolvente desde el momento en
            que se activa el procedimiento.
          </p>
          <p>
            Si te preocupa aparecer en ficheros de morosidad, también puedes
            consultar cómo{" "}
            <InternalLink to="/blog/salir-asnef">
              salir de ASNEF una vez resuelta la deuda
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "Del embargo activo a la exoneración: su itinerario",
      body: (
        <>
          <p>
            El procedimiento de Gonzalo siguió un orden claro. Desde el primer
            análisis hasta la resolución judicial, cada etapa tenía un objetivo
            concreto.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis",
                desc: "Estudio de deudas, embargos activos e insolvencia acreditada",
              },
              {
                title: "Expediente",
                desc: "Documentación lista y solicitud presentada al juzgado",
              },
              {
                title: "Procedimiento",
                desc: "Paralización de embargos y cese de la presión de acreedores",
              },
              {
                title: "Exoneración",
                desc: "Cancelación definitiva de los 88.600 € y nómina íntegra recuperada",
              },
            ]}
          />
          <p>
            El efecto más inmediato fue el primero que Gonzalo notó: su próxima
            nómina llegó sin descuentos.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Un antes y un después muy concretos",
      body: (
        <>
          <p>
            Para Gonzalo la diferencia no fue abstracta. Fue ver los números
            de su recibo de sueldo cambiar de un mes al siguiente.
          </p>
          <BeforeAfterSplit
            before={[
              "Varios embargos activos en nómina",
              "88.600 € de deuda creciendo con intereses",
              "Acreedores presionando por múltiples vías",
              "Sensación de no controlar ni su propio sueldo",
            ]}
            after={[
              "Embargos paralizados desde el inicio del proceso",
              "Deuda exonerada al 100 % por resolución judicial",
              "Cero reclamaciones ni retenciones",
              "Nómina completa disponible cada mes",
            ]}
          />
        </>
      ),
    },
    {
      id: "mensaje-final",
      title: "Lo que Gonzalo diría a quien está en su misma situación",
      body: (
        <>
          <p>
            Gonzalo tardó varios meses en pedir ayuda. Lo que más lo frenaba
            era pensar que la ley no era para alguien como él, que tenía trabajo
            y un sueldo regular. Pero la insolvencia no es sinónimo de desempleo:
            es no poder hacer frente a lo que debes, aunque ingreses cada mes.
          </p>
          <p>
            Hoy, con la deuda cancelada y los embargos levantados, su único
            arrepentimiento es no haber pedido ese primer análisis antes.
          </p>
          <InlineCTA
            title="¿Tienes embargos activos o deuda que no puedes asumir?"
            description="Analizamos tu situación gratis y te explicamos si puedes parar los embargos y cancelar la deuda con la Ley de Segunda Oportunidad."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};
