import {
  ProcessTimeline,
  EmbargoFlowChart,
  MythVsReality,
  WarningSignsList,
  ComparisonTable,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogJuicio from "@/assets/blog-juicio-monitorio.jpg";

export const juicioMonitorioDeuda: BlogPost = {
  slug: "que-hacer-juicio-monitorio-deuda",
  category: "Juicio monitorio",
  title:
    "Me ha llegado un juicio monitorio por una deuda: qué hacer en cada plazo",
  seoTitle: "⏳ Juicio monitorio: 20 días para frenar el embargo",
  metaDescription:
    "¿Te notifican un juicio monitorio? Tienes 20 días para reaccionar: qué significa, qué pasa si no respondes y cómo oponerte al embargo.",
  excerpt:
    "Un juicio monitorio no es una sentencia, pero ignorarlo puede acabar en embargo. Esto es lo que debes hacer dentro del plazo.",
  date: "19 junio 2026",
  readTime: "8 min",
  author: "Equipo legal Calma",
  publishedAt: "2026-06-19",
  heroImage: blogJuicio,
  heroAlt:
    "Hombre abriendo en su casa una carta oficial de un juzgado con gesto de preocupación",
  keywords: [
    "juicio monitorio",
    "demanda por deuda",
    "oposición juicio monitorio",
    "plazo 20 días",
    "requerimiento de pago",
    "embargo",
    "deuda reclamada",
  ],
  faq: [
    {
      question: "¿Qué es un juicio monitorio?",
      answer:
        "Es un procedimiento rápido para reclamar deudas dinerarias. El juzgado te requiere el pago y tienes un plazo de 20 días hábiles para pagar, oponerte o no hacer nada. No es todavía una sentencia condenatoria.",
    },
    {
      question: "¿Qué pasa si no respondo en plazo?",
      answer:
        "Si no pagas ni te opones en 20 días hábiles, el juzgado puede dictar decreto dando por terminado el proceso y abrir la vía de ejecución, que permite embargar tu nómina, cuentas o bienes.",
    },
    {
      question: "¿Puedo oponerme aunque la deuda exista?",
      answer:
        "Sí. Puedes oponerte si discutes el importe, si hay intereses abusivos, si la deuda ha prescrito o si no estás de acuerdo con la reclamación. La oposición transforma el monitorio en un juicio ordinario o verbal según la cuantía.",
    },
  ],
  sections: [
    {
      id: "que-es",
      title: "Qué es exactamente un juicio monitorio",
      body: (
        <>
          <p>
            El <strong>juicio monitorio</strong> es un procedimiento pensado para
            reclamar deudas de dinero de forma ágil. Lo regula la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2000-323">
              Ley de Enjuiciamiento Civil
            </ExtLink>{" "}
            y suele usarlo un banco, una financiera o una empresa de recobro que ha
            comprado tu deuda.
          </p>
          <p>
            Cuando te llega, el juzgado te hace un <em>requerimiento de pago</em>:
            te comunica el importe que se te reclama y te da un plazo para
            reaccionar. Es importante entender que todavía <strong>no es una
            sentencia</strong> que te condene; es el primer paso. Pero lo que hagas
            (o dejes de hacer) en ese plazo marca todo lo que viene después.
          </p>
        </>
      ),
    },
    {
      id: "tres-opciones",
      title: "Tienes 20 días y tres caminos posibles",
      body: (
        <>
          <p>
            Desde la notificación cuentas con un plazo de <strong>20 días
            hábiles</strong> (no cuentan sábados, domingos ni festivos). Dentro de
            ese plazo puedes hacer tres cosas, y cada una lleva a un resultado muy
            distinto.
          </p>
          <ComparisonTable
            title="Qué pasa según lo que decidas"
            subtitle="Las tres respuestas posibles a un requerimiento monitorio"
            optionA="No hacer nada"
            optionB="Oponerte en plazo"
            rows={[
              { label: "Se frena la reclamación", a: "No", b: "Sí, pasa a juicio", highlight: "b" },
              { label: "Riesgo de embargo inmediato", a: "Alto", b: "Se aplaza al juicio", highlight: "b" },
              { label: "Puedes discutir el importe", a: "No", b: "Sí", highlight: "b" },
              { label: "Puedes alegar usura o prescripción", a: "No", b: "Sí", highlight: "b" },
            ]}
          />
          <p>
            La tercera opción es <strong>pagar</strong> dentro de plazo, que pone
            fin al procedimiento. Pero si no puedes pagar o crees que la deuda no es
            correcta, la clave es no quedarte de brazos cruzados.
          </p>
        </>
      ),
    },
    {
      id: "si-no-respondes",
      title: "Qué ocurre si dejas pasar el plazo",
      body: (
        <>
          <p>
            El error más caro es ignorar la carta. Si no pagas ni te opones en los
            20 días, el juzgado puede dar por terminado el monitorio y abrir la fase
            de <strong>ejecución</strong>, que es la que permite embargar. A partir
            de ahí, el camino hasta la retención de tu nómina o tus cuentas es el
            siguiente.
          </p>
          <EmbargoFlowChart />
          <p>
            Por eso, aunque no tengas el dinero, responder dentro de plazo te
            protege: ganas tiempo, evitas el embargo automático y abres la puerta a
            negociar o a discutir la deuda. Si los embargos ya están en marcha, te
            interesa la guía sobre{" "}
            <InternalLink to="/blog/embargos-segunda-oportunidad">
              cómo parar un embargo
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "como-oponerte",
      title: "Cómo oponerte y con qué argumentos",
      body: (
        <>
          <p>
            Oponerte significa presentar un escrito en el plazo indicando por qué no
            estás de acuerdo con la reclamación. No necesitas demostrarlo todo en
            ese momento: basta con manifestar tu oposición motivada para que el
            asunto pase a un juicio donde se debatirá con pruebas.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Recibes la notificación", desc: "Empiezan a contar los 20 días hábiles" },
              { title: "Analizamos la deuda", desc: "Revisamos importe, intereses, prescripción y legitimación" },
              { title: "Escrito de oposición", desc: "Se presenta en plazo ante el juzgado" },
              { title: "Juicio", desc: "Se debate la deuda; muchas reclamaciones se reducen o caen" },
            ]}
          />
          <p>
            Argumentos frecuentes y válidos: que el importe incluye{" "}
            <InternalLink to="/blog/reclamar-tarjeta-revolving">
              intereses usurarios
            </InternalLink>
            , que la deuda ha prescrito, que quien reclama no acredita haberla
            comprado, o que ya pagaste parte. Un análisis previo evita oponerse sin
            base, pero también evita pagar lo que no debes.
          </p>
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos peligrosos sobre el juicio monitorio",
      body: (
        <>
          <p>
            Alrededor del monitorio circulan ideas que llevan a perder el plazo o a
            pagar de más. Estas son las más comunes.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si no abro la carta, no me afecta",
                reality: "La notificación surte efecto aunque no la recojas; el plazo corre igual",
              },
              {
                myth: "Es una sentencia y ya no hay nada que hacer",
                reality: "Es un requerimiento previo: puedes oponerte y discutir la deuda",
              },
              {
                myth: "Necesito pagar todo o me embargan ya",
                reality: "Oponerte en plazo frena el embargo automático y abre la negociación",
              },
            ]}
          />
          <WarningSignsList
            title="Actúa ya si te ves en esto"
            subtitle="Cualquiera de estas situaciones requiere reaccionar dentro del plazo"
            signs={[
              { title: "Carta del juzgado", desc: "Has recibido un requerimiento de pago con plazo" },
              { title: "Deuda comprada", desc: "Te reclama una empresa distinta del acreedor original" },
              { title: "Importe inflado", desc: "La cantidad reclamada incluye intereses o comisiones desorbitadas" },
              { title: "No puedes pagar", desc: "Aunque la deuda sea real, no tienes capacidad para asumirla" },
            ]}
          />
        </>
      ),
    },
    {
      id: "y-si-no-puedo-pagar",
      title: "¿Y si la deuda es real pero no puedo pagarla?",
      body: (
        <>
          <p>
            Si reconoces la deuda pero no tienes forma de afrontarla, oponerte solo
            gana tiempo. La solución de fondo, cuando hay varias deudas y una
            insolvencia real, es la{" "}
            <InternalLink to="/blog/guia-ley-segunda-oportunidad">
              Ley de Segunda Oportunidad
            </InternalLink>
            , que paraliza reclamaciones y embargos y permite cancelar la deuda
            cuando se cumplen los requisitos.
          </p>
          <InlineCTA
            title="¿Te ha llegado un juicio monitorio?"
            description="No dejes pasar el plazo. Analizamos tu caso gratis y te decimos si conviene oponerte, negociar o cancelar la deuda."
            buttonLabel="Frenar el juicio monitorio"
          />
        </>
      ),
    },
  ],
};