import {
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/andres-madrid.jpg";

export const andresMadrid: CasoExito = {
  slug: "andres-madrid-frena-apremio-hacienda",
  category: "Deudas con Hacienda",
  name: "Andrés P.",
  location: "Madrid",
  debtAmount: "Apremio frenado",
  solution: "Aplazamiento y freno del apremio",
  headline:
    "La carta de Hacienda que le heló la sangre a Andrés: cómo paró el apremio a tiempo y ordenó su deuda",
  dek: "Una providencia de apremio es el paso previo al embargo. A Andrés le llegó un lunes por la mañana. En pocas semanas, la ejecución quedó paralizada y la deuda, fraccionada en cuotas que sí podía pagar.",
  seoTitle: "Caso real: frena el apremio de Hacienda en Madrid",
  metaDescription:
    "Andrés P., de Madrid, recibió una providencia de apremio de Hacienda y actuó a tiempo. Te contamos cómo se frenó el apremio y se consiguió un aplazamiento viable.",
  date: "2 junio 2026",
  readTime: "6 min",
  publishedAt: "2026-06-02",
  heroImage: casoFoto,
  heroAlt:
    "Hombre en Madrid respirando aliviado tras frenar el apremio de Hacienda",
  keywords: [
    "caso real",
    "apremio Hacienda",
    "freno embargo Hacienda",
    "aplazamiento deuda Hacienda",
    "fraccionamiento AEAT",
    "deuda Hacienda Madrid",
    "providencia de apremio",
  ],
  faq: [
    {
      question: "¿Qué es una providencia de apremio y qué pasa si no actúo?",
      answer:
        "Es el aviso oficial de que Hacienda va a iniciar la ejecución forzosa para cobrar la deuda. Si no se actúa, pueden seguir con el embargo de cuenta, nómina o bienes. Por eso es clave pedir asesoramiento antes de que llegue la diligencia de embargo.",
    },
    {
      question: "¿Hacienda acepta aplazamientos aunque ya haya apremio?",
      answer:
        "Sí, es posible solicitar un aplazamiento o fraccionamiento incluso después de la providencia de apremio, siempre que se cumplan ciertos requisitos y se actúe antes de que se ejecute la traba. La presentación de la solicitud puede suspender la ejecución.",
    },
    {
      question: "¿Se puede cancelar totalmente la deuda con Hacienda?",
      answer:
        "La deuda pública con Hacienda no se exonera con la Ley de Segunda Oportunidad salvo en los límites legales. El objetivo habitual es frenar el apremio y lograr un fraccionamiento o aplazamiento en condiciones asumibles, que es exactamente lo que consiguió Andrés.",
    },
  ],
  sections: [
    {
      id: "la-carta",
      title: "Un lunes gris y una carta que cambió la semana",
      body: (
        <>
          <p>
            Andrés llegó a trabajar ese lunes con la rutina de siempre. Al abrir
            el buzón del portal encontró un sobre con el membrete de la Agencia
            Tributaria. Lo abrió sin prisa, pensando que sería otra notificación
            de trámite. Lo que leyó le cortó la respiración: <em>providencia de
            apremio</em>. Hacienda le informaba de que, al no haber pagado la
            deuda en período voluntario, se iniciaba el procedimiento de
            ejecución forzosa con un recargo del 20 %.
          </p>
          <p>
            El importe que había ignorado durante meses —una liquidación de IRPF
            que creyó poder aplazar por su cuenta— ya no era negociable de
            cualquier manera. El reloj había empezado a correr.
          </p>
        </>
      ),
    },
    {
      id: "error-comun",
      title: "El error que comete casi todo el mundo: esperar",
      body: (
        <>
          <p>
            Andrés reconoce que su primer impulso fue guardar la carta en un
            cajón. «Pensé que si no la miraba, el problema se resolvería solo, o
            que llamar a Hacienda sin saber qué decir solo empeoraría las
            cosas», cuenta. Es una reacción comprensible y, a la vez, la más
            peligrosa: con Hacienda, cada día sin actuar acerca la diligencia de
            embargo.
          </p>
          <p>
            Fue su pareja quien lo convenció de buscar ayuda profesional antes
            de tomar cualquier decisión. Esa llamada marcó el punto de inflexión.
          </p>
        </>
      ),
    },
    {
      id: "analisis",
      title: "Lo que reveló el análisis: había margen para actuar",
      body: (
        <>
          <p>
            En la primera consulta se revisó la liquidación original, los
            plazos transcurridos y si existían motivos para recurrir el importe
            o para solicitar un aplazamiento con garantías. La buena noticia:
            la deuda no era firme en todos sus extremos y, además, Andrés
            cumplía las condiciones para solicitar un{" "}
            <ExtLink href="https://sede.agenciatributaria.gob.es/Sede/procedimientosini/RN02.shtml">
              aplazamiento ante la AEAT
            </ExtLink>
            .
          </p>
          <p>
            Presentar la solicitud de aplazamiento mientras el apremio está
            activo puede suspender la ejecución. Es una ventana estrecha, pero
            existe. Andrés la aprovechó.
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "Cuatro pasos que cambiaron el resultado",
      body: (
        <>
          <p>
            El proceso fue ordenado y sin sorpresas. Andrés no tuvo que llamar
            a Hacienda sin saber qué decir ni enfrentarse solo a los plazos.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis urgente",
                desc: "Revisión de la providencia, la liquidación y los plazos disponibles para actuar",
              },
              {
                title: "Recurso / alegaciones",
                desc: "Se detectaron errores en el cálculo; se presentaron alegaciones para reducir el importe base",
              },
              {
                title: "Solicitud de aplazamiento",
                desc: "Petición formal ante la AEAT con justificación económica; ejecución suspendida durante la tramitación",
              },
              {
                title: "Apremio frenado · Cuotas asumibles",
                desc: "Resolución favorable: fraccionamiento en cuotas mensuales que Andrés puede asumir sin ahogar su economía",
              },
            ]}
          />
          <p>
            Si quieres entender mejor qué ocurre cuando Hacienda inicia el
            cobro forzoso, puedes leer nuestra guía sobre{" "}
            <InternalLink to="/blog/deuda-hacienda-que-hacer">
              qué hacer si tienes una deuda con Hacienda
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "mitos-hacienda",
      title: "«Con Hacienda no se puede hacer nada»: el mito que paraliza",
      body: (
        <>
          <p>
            Andrés tardó semanas en pedir ayuda precisamente porque asumía que
            con la Administración no había nada que negociar. Es el mito más
            extendido y, también, el que más daño hace.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Con Hacienda no se puede hacer nada una vez que llega el apremio",
                reality:
                  "Aún en fase de apremio se puede solicitar aplazamiento o fraccionamiento, y eso puede suspender la ejecución mientras se tramita",
              },
              {
                myth: "Si recurro, Hacienda se enfadará y actuará antes",
                reality:
                  "Los recursos y alegaciones son derechos legales del contribuyente; presentarlos correctamente no acelera el embargo, puede retrasarlo",
              },
              {
                myth: "El recargo del 20 % es inevitable e inamovible",
                reality:
                  "En algunos casos, el recargo puede reducirse o discutirse si hay errores en el procedimiento o en la liquidación original",
              },
            ]}
          />
          <InlineCTA
            title="¿Te ha llegado una providencia de apremio?"
            description="Cuéntanos tu situación y te explicamos en la primera llamada qué opciones tienes antes de que llegue el embargo, sin coste ni compromiso."
            buttonLabel="Analizar mi caso gratis"
          />
        </>
      ),
    },
    {
      id: "resultado",
      title: "Hoy Andrés paga, pero respira",
      body: (
        <>
          <p>
            La deuda no desapareció: Andrés la está pagando. Pero hay una
            diferencia enorme entre pagar porque te lo imponen mediante embargo
            y pagar en cuotas que has negociado y que encajan en tu presupuesto
            mensual. La primera opción destroza la economía familiar; la segunda
            permite seguir adelante.
          </p>
          <p>
            Lo que más le sorprendió, dice, fue descubrir que había margen para
            actuar. «Creía que ya no podía hacer nada. Esa llamada cambió todo.»
          </p>
        </>
      ),
    },
  ],
};
