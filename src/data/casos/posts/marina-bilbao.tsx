import {
  DebtTypesDonut,
  ProcessTimeline,
  MythVsReality,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/marina-bilbao.jpg";

export const marinaBilbao: CasoExito = {
  slug: "marina-bilbao-cancela-61400-euros",
  category: "Ley de Segunda Oportunidad",
  name: "Marina C.",
  location: "Bilbao",
  debtAmount: "61.400 €",
  solution: "Ley de Segunda Oportunidad (exoneración total)",
  headline:
    "Siete acreedores distintos, una sola solución: Marina cancela 61.400 € en Bilbao",
  dek: "Préstamos personales, tarjetas y créditos al consumo repartidos entre siete entidades. Marina pensaba que gestionar tantos frentes era imposible. Un solo procedimiento lo resolvió todo.",
  seoTitle: "Caso real: cancela 61.400 € con varios acreedores en Bilbao",
  metaDescription:
    "Marina C., de Bilbao, tenía 61.400 € de deuda entre préstamos y tarjetas con siete acreedores. Con la Ley de Segunda Oportunidad lo canceló todo en un único procedimiento.",
  date: "16 junio 2026",
  readTime: "7 min",
  publishedAt: "2026-06-16",
  heroImage: casoFoto,
  heroAlt:
    "Mujer en Bilbao sonriendo con alivio tras cancelar deudas con múltiples acreedores",
  keywords: [
    "caso real",
    "Ley de Segunda Oportunidad",
    "cancelar deudas Bilbao",
    "múltiples acreedores",
    "tarjetas revolving",
    "préstamos personales",
    "exoneración de deuda",
  ],
  faq: [
    {
      question: "¿Se pueden cancelar deudas con varios acreedores a la vez?",
      answer:
        "Sí. La Ley de Segunda Oportunidad agrupa todas las deudas en un único procedimiento concursal. Marina tenía siete acreedores distintos y todos quedaron incluidos en la exoneración.",
    },
    {
      question: "¿Qué tipo de deudas tenía Marina?",
      answer:
        "Su deuda de 61.400 € estaba compuesta por préstamos personales de consumo, tarjetas de crédito y créditos rotativos con distintas entidades financieras.",
    },
    {
      question: "¿Cuánto tardó el proceso de Marina?",
      answer:
        "El procedimiento se completó en meses. La reunificación de todos los acreedores en un único expediente simplifica los plazos y evita gestiones paralelas con cada entidad.",
    },
  ],
  sections: [
    {
      id: "malabarismo-imposible",
      title: "Siete frentes y un solo sueldo",
      body: (
        <>
          <p>
            Marina tenía una hoja de cálculo con siete filas: una por cada
            acreedor. Cada mes intentaba asignar un poco a cada una, sabiendo
            de antemano que no llegaría a cubrir ninguna del todo. Los intereses
            corrían en paralelo y el total, lejos de bajar, seguía creciendo.
          </p>
          <p>
            La deuda de <strong>61.400 €</strong> no llegó de golpe. Fue la
            suma de varios préstamos personales firmados en momentos distintos,
            tarjetas de crédito con límites que parecían generosos y créditos
            al consumo que, sobre el papel, tenían sentido por separado. El
            problema era el conjunto: sin bienes a su nombre y con un sueldo
            que no escalaba, Marina se había vuelto insolvente sin haberlo
            planeado.
          </p>
        </>
      ),
    },
    {
      id: "composición-deuda",
      title: "De dónde venían los 61.400 €",
      body: (
        <>
          <p>
            No toda la deuda era igual. Entender su composición fue clave para
            plantear la estrategia correcta y demostrar la insolvencia ante el
            juzgado.
          </p>
          <DebtTypesDonut
            segments={[
              { label: "Préstamos personales", value: 34200, color: "hsl(145 60% 35%)" },
              { label: "Tarjetas de crédito", value: 19400, color: "hsl(84 75% 55%)" },
              { label: "Crédito al consumo", value: 7800, color: "hsl(25 90% 60%)" },
            ]}
            title="Composición de la deuda de Marina"
            subtitle="Total: 61.400 €"
          />
          <p>
            Más de la mitad procedía de préstamos personales contratados con
            distintas entidades; el resto, de tarjetas y productos rotativos
            que habían ido capitalizando intereses. Todos, sin excepción,
            quedaron incluidos en el expediente.
          </p>
        </>
      ),
    },
    {
      id: "descubrimiento",
      title: "La clave que cambia el enfoque: un procedimiento para todos",
      body: (
        <>
          <p>
            Lo que más sorprendió a Marina cuando pidió el análisis gratuito fue
            descubrir que no hacía falta negociar con cada acreedor por separado.
            La{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-7345">
              Ley de Segunda Oportunidad
            </ExtLink>{" "}
            centraliza todo: un solo expediente, un solo procedimiento judicial
            y una resolución que afecta a la totalidad de la deuda.
          </p>
          <p>
            Si te preguntas si tu perfil cumple las condiciones, la guía de{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">
              requisitos para cancelar deudas
            </InternalLink>{" "}
            lo explica con detalle.
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "Del caos de siete acreedores al expediente único",
      body: (
        <>
          <p>
            El procedimiento de Marina siguió las mismas fases que cualquier caso
            de exoneración, con la particularidad de que había que identificar y
            documentar la relación con cada uno de los siete acreedores.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis",
                desc: "Mapa completo de los siete acreedores, importes e intereses acumulados",
              },
              {
                title: "Expediente",
                desc: "Documentación centralizada y solicitud judicial única para toda la deuda",
              },
              {
                title: "Procedimiento",
                desc: "Cese de reclamaciones de todas las entidades desde el inicio",
              },
              {
                title: "Exoneración",
                desc: "Cancelación de los 61.400 € en un solo auto judicial",
              },
            ]}
          />
          <p>
            Durante el procedimiento, Marina dejó de recibir comunicaciones de
            todos los acreedores a la vez. El silencio, dice, fue casi tan
            valioso como la resolución final.
          </p>
        </>
      ),
    },
    {
      id: "mitos",
      title: "Lo que la frenaba (y resultó ser falso)",
      body: (
        <>
          <p>
            Con tantas deudas y tantos frentes, Marina acumulaba también muchos
            miedos. Estos fueron los más frecuentes antes de dar el paso.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Con tantos acreedores el proceso será interminable",
                reality:
                  "La LSO agrupa todo en un único procedimiento; más acreedores no significa más tiempo",
              },
              {
                myth: "Alguna deuda se quedará fuera",
                reality:
                  "Toda la deuda ordinaria —préstamos, tarjetas, crédito al consumo— puede incluirse en la exoneración",
              },
              {
                myth: "Los acreedores pueden bloquear el proceso",
                reality:
                  "Una vez iniciado el procedimiento, los acreedores no pueden actuar por su cuenta; el juzgado toma el control",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "hoy",
      title: "Lo que significa no deber nada a nadie",
      body: (
        <>
          <p>
            Marina cerró la hoja de cálculo. No porque hubiera pagado las siete
            filas, sino porque dejaron de existir. La exoneración no fue un
            aplazamiento ni una negociación: fue una cancelación real y definitiva
            de los 61.400 €.
          </p>
          <p>
            Hoy, sin bienes que recuperar ni acreedores que llamar, Marina trabaja
            con una única meta financiera: construir, por primera vez en años,
            un ahorro propio.
          </p>
          <InlineCTA
            title="¿Tienes deuda repartida entre varios acreedores?"
            description="Da igual cuántos sean. Analizamos tu caso gratis y te explicamos cómo agrupar todo en un único procedimiento de exoneración."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};
