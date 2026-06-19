import {
  ProcessTimeline,
  ComparisonTable,
  MythVsReality,
  WarningSignsList,
  RequirementsChecklist,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogDeudasPublicas from "@/assets/blog-deudas-publicas.jpg";

export const deudasHaciendaSeguridadSocial: BlogPost = {
  slug: "deudas-hacienda-seguridad-social",
  category: "Deudas públicas",
  title:
    "Deudas con Hacienda y Seguridad Social: opciones reales para resolverlas",
  seoTitle: "Deudas con Hacienda y Seguridad Social: cómo pagarlas",
  metaDescription:
    "Aplazamientos, fraccionamientos y qué parte entra en la Ley de Segunda Oportunidad. Te explicamos cómo resolver deudas con Hacienda y la Seguridad Social y evitar el embargo.",
  excerpt:
    "La deuda pública tiene reglas propias: apremios, recargos y embargos rápidos. Estas son tus opciones reales para resolverla.",
  date: "19 junio 2026",
  readTime: "9 min",
  author: "Equipo legal Calma",
  publishedAt: "2026-06-19",
  heroImage: blogDeudasPublicas,
  heroAlt:
    "Mujer autónoma revisando con preocupación cartas de Hacienda y la Seguridad Social en su mesa de trabajo",
  keywords: [
    "deudas con Hacienda",
    "deuda Seguridad Social",
    "aplazamiento Hacienda",
    "fraccionamiento deuda",
    "apremio",
    "embargo Hacienda",
    "Ley de Segunda Oportunidad deuda pública",
  ],
  faq: [
    {
      question: "¿Se pueden aplazar las deudas con Hacienda y la Seguridad Social?",
      answer:
        "Sí. Tanto la Agencia Tributaria como la Seguridad Social permiten aplazar o fraccionar deudas cumpliendo requisitos. Para importes por debajo de un umbral no suele exigirse garantía; por encima, normalmente sí.",
    },
    {
      question: "¿La Ley de Segunda Oportunidad cancela la deuda pública?",
      answer:
        "Parcialmente. La reforma de 2022 permite exonerar deuda pública (Hacienda y Seguridad Social) con límites por cada concepto. No siempre se cancela toda, pero sí una parte relevante en muchos casos.",
    },
    {
      question: "¿Qué pasa si no pago una deuda con Hacienda?",
      answer:
        "Entra en vía de apremio: se aplican recargos y, si no se atiende, la Administración puede embargar cuentas, nómina, devoluciones o bienes sin necesidad de acudir a un juez.",
    },
  ],
  sections: [
    {
      id: "por-que-distinta",
      title: "Por qué la deuda pública es distinta a la bancaria",
      body: (
        <>
          <p>
            Deber dinero a <strong>Hacienda</strong> o a la <strong>Seguridad
            Social</strong> no funciona igual que deber a un banco. La
            Administración tiene la facultad de <em>autoejecución</em>: no necesita
            demandarte ni esperar a un juez para cobrar. Puede iniciar por sí misma
            la vía de apremio, aplicar recargos y embargar.
          </p>
          <p>
            Eso hace que los tiempos sean más rápidos y los recargos, automáticos.
            Por eso conviene reaccionar pronto: cuanto antes ordenes la deuda, más
            opciones tienes de aplazarla, fraccionarla o reducir el recargo.
          </p>
          <WarningSignsList
            title="Señales de que tu deuda pública se está agravando"
            subtitle="Cada una marca un paso más cerca del embargo"
            signs={[
              { title: "Providencia de apremio", desc: "Ya no es un simple aviso: se han añadido recargos sobre la deuda" },
              { title: "Recargos crecientes", desc: "El importe sube por recargos del 5%, 10% o 20% según la fase" },
              { title: "Diligencia de embargo", desc: "Notifican el embargo de cuentas, nómina o devoluciones" },
              { title: "Baja en aplazamientos", desc: "Te deniegan o anulan un aplazamiento por impagos" },
            ]}
          />
        </>
      ),
    },
    {
      id: "aplazar-fraccionar",
      title: "Aplazar y fraccionar: la primera opción a valorar",
      body: (
        <>
          <p>
            Si tu problema es de <strong>liquidez</strong> —puedes pagar, pero no de
            golpe—, el aplazamiento o fraccionamiento suele ser la vía más sensata.
            La{" "}
            <ExtLink href="https://sede.agenciatributaria.gob.es/">
              Agencia Tributaria
            </ExtLink>{" "}
            y la{" "}
            <ExtLink href="https://www.seg-social.es/">
              Seguridad Social
            </ExtLink>{" "}
            permiten repartir la deuda en plazos.
          </p>
          <p>
            Por debajo de cierto umbral de deuda no se exige garantía; por encima,
            normalmente hay que aportar aval o garantía. En ambos casos se devengan
            intereses, pero evitas el embargo y ganas previsibilidad. Para pedirlo
            conviene tener a mano la documentación básica.
          </p>
          <RequirementsChecklist
            items={[
              "Identificar todas las deudas y su fase (voluntaria o apremio)",
              "Calcular una cuota mensual que puedas sostener",
              "Reunir justificantes de ingresos y gastos",
              "Presentar la solicitud antes de que avance el apremio",
              "Cumplir cada plazo para no perder el aplazamiento",
            ]}
          />
        </>
      ),
    },
    {
      id: "lso-deuda-publica",
      title: "Qué parte entra en la Ley de Segunda Oportunidad",
      body: (
        <>
          <p>
            Si el problema no es de liquidez sino de <strong>insolvencia</strong>{" "}
            real, aplazar solo retrasa lo inevitable. Aquí entra la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            . Desde la reforma de 2022, la deuda pública puede exonerarse, aunque
            con <strong>límites</strong> por cada organismo.
          </p>
          <p>
            En la práctica, eso significa que una parte de lo que debes a Hacienda y
            a la Seguridad Social puede cancelarse junto al resto de tus deudas, y el
            tramo no exonerable suele poder pagarse en un plan asumible. No es una
            cancelación total automática, pero alivia de forma muy significativa la
            carga.
          </p>
          <ComparisonTable
            title="Aplazar o acudir a la Segunda Oportunidad"
            subtitle="Depende de si tu problema es de liquidez o de solvencia"
            optionA="Aplazamiento / fraccionamiento"
            optionB="Ley de Segunda Oportunidad"
            rows={[
              { label: "Cancela parte de la deuda", a: "No", b: "Sí, con límites", highlight: "b" },
              { label: "Frena recargos y embargos", a: "Si se cumple el plan", b: "Sí, por el procedimiento", highlight: "b" },
              { label: "Incluye el resto de deudas", a: "No", b: "Sí (bancos, préstamos…)", highlight: "b" },
              { label: "Ideal si puedes pagar a plazos", a: "Sí", b: "No es necesario", highlight: "a" },
            ]}
          />
        </>
      ),
    },
    {
      id: "autonomos",
      title: "El caso particular de los autónomos",
      body: (
        <>
          <p>
            Los autónomos son quienes más sufren la deuda pública, porque acumulan
            cuotas de la Seguridad Social y liquidaciones de IVA o IRPF que se
            disparan en los meses malos. Si tu actividad ya no es viable, arrastrar
            esa deuda solo agrava la situación.
          </p>
          <p>
            Hemos tratado este escenario en detalle en la guía para{" "}
            <InternalLink to="/blog/autonomos-con-deudas">
              autónomos con deudas
            </InternalLink>
            , donde explicamos cómo combinar el cese de actividad con la cancelación
            de la deuda. La clave es no confundir un problema de tesorería con una
            insolvencia estructural.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Diagnóstico", desc: "Separamos deuda pública de deuda privada y su fase de cobro" },
              { title: "Contención", desc: "Aplazamiento o paralización para frenar recargos y embargos" },
              { title: "Estrategia", desc: "Plan de pagos viable o Segunda Oportunidad según solvencia" },
              { title: "Resolución", desc: "Deuda ordenada, exonerada o fraccionada de forma sostenible" },
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos sobre las deudas con Hacienda y la Seguridad Social",
      body: (
        <>
          <p>
            La deuda pública genera mucho miedo y, con él, decisiones equivocadas.
            Aclaramos las creencias más extendidas.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "La deuda con Hacienda nunca se cancela",
                reality: "Desde 2022 es exonerable con límites dentro de la Segunda Oportunidad",
              },
              {
                myth: "Si no pago, tardarán en venir a por mí",
                reality: "La Administración se autoejecuta: el apremio y el embargo llegan rápido",
              },
              {
                myth: "Pedir un aplazamiento es reconocer que no podré pagar",
                reality: "Es un derecho ordinario que evita recargos mayores y embargos",
              },
            ]}
          />
          <InlineCTA
            title="¿Tienes deudas con Hacienda o la Seguridad Social?"
            description="Analizamos tu caso gratis y te decimos si te conviene aplazar, fraccionar o cancelar parte con la Ley de Segunda Oportunidad."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
  ],
};