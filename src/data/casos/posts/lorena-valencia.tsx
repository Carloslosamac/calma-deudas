import {
  BeforeAfterSplit,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { InternalLink, ExtLink } from "@/data/blog/shared";
import type { CasoExito } from "../types";
import casoFoto from "@/assets/casos/lorena-valencia.jpg";

export const lorenaValencia: CasoExito = {
  slug: "lorena-valencia-anula-tarjeta-revolving",
  category: "Tarjetas revolving",
  name: "Lorena S.",
  location: "Valencia",
  debtAmount: "3.480 € recuperados",
  solution: "Reclamación judicial por usura",
  headline:
    "Pagaba cada mes y el saldo nunca bajaba: Lorena reclamó su tarjeta revolving y recuperó 3.480 € en Valencia",
  dek: "Tenía trabajo, pagaba puntual y seguía debiendo lo mismo. No era un problema de insolvencia: era un contrato con una TAE que los tribunales consideran usura. Y se puede reclamar.",
  seoTitle: "Caso real: anula tarjeta revolving y recupera 3.480 € en Valencia",
  metaDescription:
    "Lorena, de Valencia, pagaba su tarjeta revolving puntualmente pero el saldo no bajaba. Reclamó por usura, el contrato fue declarado nulo y recuperó 3.480 € cobrados de más.",
  date: "6 junio 2026",
  readTime: "6 min",
  publishedAt: "2026-06-06",
  heroImage: casoFoto,
  heroAlt: "Mujer revisando documentos bancarios con gesto de alivio en Valencia",
  keywords: [
    "caso real",
    "tarjeta revolving",
    "reclamación usura",
    "TAE abusiva",
    "Valencia",
    "contrato nulo",
    "recuperar dinero tarjeta",
  ],
  faq: [
    {
      question: "¿En qué consiste una reclamación por tarjeta revolving?",
      answer:
        "Es una acción judicial en la que se solicita que el contrato de la tarjeta sea declarado nulo por contener intereses usurarios (TAE muy por encima del mercado). Si el juez lo estima, el banco solo puede recuperar el capital prestado: el cliente recibe de vuelta todo lo que pagó de más en intereses.",
    },
    {
      question: "¿Hace falta estar en apuros económicos para reclamar?",
      answer:
        "No. Como en el caso de Lorena, puedes ser una persona completamente solvente que paga puntualmente. Lo que se discute no es tu capacidad de pago sino la legalidad del tipo de interés que te aplicaron.",
    },
    {
      question: "¿Qué ocurre con la deuda después de la reclamación?",
      answer:
        "Si el contrato se declara nulo por usura, el banco recupera únicamente el capital que prestó. Lorena recibió 3.480 € correspondientes a los intereses que había pagado de más durante años. La deuda no se cancela como en la LSO: se recalcula eliminando los intereses ilegales.",
    },
  ],
  sections: [
    {
      id: "el-pozo-sin-fondo",
      title: "Pagaba todos los meses. El saldo casi no se movía.",
      body: (
        <>
          <p>
            Lorena S. no era una persona en apuros. Tenía un trabajo estable en Valencia, pagaba
            sus facturas en plazo y llevaba años siendo clienta responsable de su banco. Pero
            había algo que no entendía: por mucho que ingresara en su tarjeta revolving, el saldo
            pendiente se negaba a bajar.
          </p>
          <p>
            "Revisé los movimientos y llevaba más de dos años pagando. Pero la deuda seguía siendo
            prácticamente la misma que al principio", explica. Lo que Lorena no sabía es que eso
            no era mala suerte ni un error: era exactamente cómo están diseñadas las tarjetas
            revolving con TAE muy alta. Cada mes, los intereses se comían casi todo lo que ella
            aportaba.
          </p>
        </>
      ),
    },
    {
      id: "que-es-una-tae-usuraria",
      title: "Una TAE del 24%, del 26%… ¿a partir de cuándo es usura?",
      body: (
        <>
          <p>
            El Tribunal Supremo lleva años estableciendo doctrina sobre este punto: cuando el tipo
            de interés de una tarjeta revolving supera de forma notable el interés medio del
            mercado para ese producto, el contrato puede ser declarado nulo por usurario según la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-1908-628">
              Ley de Represión de la Usura de 1908
            </ExtLink>
            .
          </p>
          <p>
            La tarjeta de Lorena tenía una TAE que superaba con creces ese umbral. Cada mes, una
            parte mayoritaria de su cuota no amortizaba nada: iba directamente a pagar intereses.
            Eso explica el saldo que nunca bajaba. Y eso, para los tribunales, tiene un nombre.
          </p>
        </>
      ),
    },
    {
      id: "la-reclamacion",
      title: "La reclamación: no es un rescate, es justicia",
      body: (
        <>
          <p>
            Es importante entender qué es y qué no es una reclamación por tarjeta revolving.
            Lorena no estaba en apuros, no necesitaba que le perdonaran una deuda y este proceso
            no tiene nada que ver con la Ley de Segunda Oportunidad ni con la reunificación de
            deudas. Es una reclamación legal por cobro indebido.
          </p>
          <ProcessTimeline
            steps={[
              {
                title: "Análisis del contrato",
                desc: "Revisión del tipo de interés, TAE y condiciones del contrato de la tarjeta",
              },
              {
                title: "Reclamación",
                desc: "Presentación de la demanda solicitando la nulidad del contrato por usura",
              },
              {
                title: "Sentencia o acuerdo",
                desc: "El contrato es declarado nulo: solo procede la devolución del capital neto",
              },
              {
                title: "Devolución",
                desc: "Lorena recupera 3.480 € abonados en intereses que no debió pagar",
              },
            ]}
          />
          <p>
            El proceso fue judicial, pero en ningún momento Lorena tuvo que demostrar que no podía
            pagar. El debate era exclusivamente sobre la legalidad de la TAE que le aplicaron.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Antes y después de reclamar",
      body: (
        <>
          <p>
            El cambio no fue solo económico. Entender que tenía razón —y que la ley la amparaba—
            fue en sí mismo un alivio que va más allá del dinero recuperado.
          </p>
          <BeforeAfterSplit
            before={[
              "TAE altísima que consumía cada cuota",
              "Saldo que no bajaba pese a pagar puntualmente",
              "Sensación de trampa sin salida",
              "Años de intereses acumulados sin saberlo",
            ]}
            after={[
              "Contrato declarado nulo por usura",
              "3.480 € devueltos por intereses cobrados de más",
              "Deuda recalculada sobre el capital real",
              "Lorena recupera lo que era suyo",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos-revolving",
      title: "Lo que frena a muchas personas antes de reclamar",
      body: (
        <>
          <p>
            Lorena tardó en dar el paso porque, como muchas personas, tenía creencias instaladas
            que le hacían pensar que no podía hacer nada. Estas son las más habituales.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si puedo pagar, no tengo derecho a reclamar",
                reality:
                  "La reclamación por usura no depende de tu solvencia, sino de la legalidad del interés que te aplicaron",
              },
              {
                myth: "Firmé el contrato, así que lo acepté todo",
                reality:
                  "Firmar un contrato con cláusulas usurarias no lo convierte en válido; la ley los declara nulos de pleno derecho",
              },
              {
                myth: "Es muy complicado y costoso llevar al banco a juicio",
                reality:
                  "Con el asesoramiento adecuado el proceso es manejable, y la devolución supera con creces los costes",
              },
            ]}
          />
          <p>
            Si además de la tarjeta tienes deudas en ficheros de morosos, puede interesarte cómo{" "}
            <InternalLink to="/blog/salir-asnef">salir de ASNEF</InternalLink> una vez resuelta
            la situación.
          </p>
        </>
      ),
    },
    {
      id: "vida-hoy",
      title: "3.480 € que volvieron donde siempre debieron estar",
      body: (
        <>
          <p>
            Lorena no canceló una deuda impagable ni se acogió a ninguna ley de insolvencia.
            Simplemente recuperó lo que el banco le había cobrado sin tener derecho a ello. Eso
            es la reclamación por usura: no un rescate, sino la restitución de lo que es tuyo.
          </p>
          <p>
            Hoy sigue siendo la misma persona responsable de siempre. Solo que ahora sabe que
            pagar a tiempo no significa tener que aguantar cualquier condición que un banco decida
            poner en un contrato.
          </p>
          <InlineCTA
            title="¿Tu tarjeta revolving tampoco baja?"
            description="Analizamos tu contrato gratis. Si el tipo de interés es usurario, te decimos cuánto podrías recuperar y cómo."
            buttonLabel="Analizar mi tarjeta gratis"
          />
        </>
      ),
    },
  ],
};
