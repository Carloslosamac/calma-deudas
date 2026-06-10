import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Contenido real de las guías de educación financiera (plantilla "guia").
 * Estructura: intro + secciones + FAQ + interlinking. `plain` para JSON-LD.
 */

export type GuiaSection = { title: string; body: ReactNode };
export type GuiaFaq = { q: string; a: ReactNode; plain: string };

export type GuiaContent = {
  slug: string;
  cluster: string;
  intro: ReactNode;
  sections: GuiaSection[];
  faq?: GuiaFaq[];
};

const A = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-base leading-relaxed text-muted-foreground">{children}</p>
);

const UL = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2">
        <span aria-hidden className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

const guiaList: GuiaContent[] = [
  {
    slug: "como-hacer-un-presupuesto",
    cluster: "guias",
    intro:
      "Un presupuesto familiar no es controlar cada céntimo: es saber cuánto entra, cuánto sale y cuánto te queda para decidir con tranquilidad. Te lo explicamos paso a paso, con un método sencillo que puedes empezar hoy.",
    sections: [
      {
        title: "Respuesta clara",
        body: (
          <>
            <P>
              Hacer un presupuesto es poner por escrito tus ingresos y tus gastos durante un mes
              para repartir el dinero antes de gastarlo. Estos son los pasos:
            </P>
            <UL
              items={[
                "Suma tus ingresos netos mensuales (nómina, prestaciones, ingresos variables medios).",
                "Anota tus gastos fijos: alquiler o hipoteca, suministros, seguros, cuotas y préstamos.",
                "Anota los gastos variables: comida, transporte, ocio, imprevistos.",
                "Resta gastos a ingresos: ese es tu margen real para ahorrar o reducir deuda.",
                "Revisa el presupuesto cada mes y ajusta lo que se desvíe.",
              ]}
            />
            <P>
              Un buen punto de partida es la <strong>regla 50/30/20</strong>: 50% a necesidades,
              30% a deseos y 20% a ahorro o pago de deudas. Si tienes deudas altas, sube ese
              último tramo todo lo que puedas.
            </P>
          </>
        ),
      },
      {
        title: "Ejemplos prácticos",
        body: (
          <>
            <P>
              Con 1.600 € netos al mes, la regla 50/30/20 quedaría así: 800 € para necesidades,
              480 € para deseos y 320 € para ahorro o deudas. Si tus gastos fijos superan el 50%,
              la prioridad es recortar gastos variables o renegociar cuotas, no eliminar el
              ahorro.
            </P>
            <P>
              Trucos que funcionan: domicilia un traspaso automático a ahorro el día de cobro,
              revisa suscripciones que no usas y fija un tope semanal para gastos de ocio.
            </P>
          </>
        ),
      },
      {
        title: "Contenido relacionado",
        body: (
          <UL
            items={[
              <>
                Crea tu colchón de seguridad con la guía de{" "}
                <A to="/guias/fondo-de-emergencia">fondo de emergencia</A>.
              </>,
              <>
                Si te planteas un préstamo, entiende antes{" "}
                <A to="/guias/que-es-la-tae">qué es la TAE</A>.
              </>,
              <>
                Si las cuotas te ahogan, valora{" "}
                <A to="/reunificacion-deudas">reunificar</A> o{" "}
                <A to="/cancelar-deudas">cancelar deudas</A>.
              </>,
            ]}
          />
        ),
      },
    ],
    faq: [
      {
        q: "¿Cada cuánto debo revisar mi presupuesto?",
        a: "Una vez al mes basta para ajustar desviaciones. Si tu situación cambia (nuevo gasto, cambio de ingresos), revísalo en ese momento.",
        plain:
          "Una vez al mes basta para ajustar desviaciones; si tu situación cambia, revísalo en ese momento.",
      },
      {
        q: "¿Qué hago si mis gastos superan mis ingresos cada mes?",
        a: (
          <>
            Es señal de alarma. Recorta gastos variables y, si la deuda es la causa, estudia{" "}
            <A to="/reunificacion-deudas">reunificar</A> o{" "}
            <A to="/cancelar-deudas">cancelar tus deudas</A>.
          </>
        ),
        plain:
          "Es señal de alarma: recorta gastos variables y, si la deuda es la causa, estudia reunificar o cancelar tus deudas.",
      },
    ],
  },
  {
    slug: "que-es-la-tae",
    cluster: "guias",
    intro:
      "La TAE es el dato que de verdad te dice cuánto te cuesta un préstamo o una tarjeta. Aprender a leerla te protege de productos caros y de intereses abusivos. Te lo explicamos sin tecnicismos.",
    sections: [
      {
        title: "Respuesta clara",
        body: (
          <>
            <P>
              La <strong>TAE</strong> (Tasa Anual Equivalente) es el coste total de un crédito
              expresado en porcentaje anual. A diferencia del <strong>TIN</strong> (el interés
              "puro"), la TAE incluye también comisiones y otros gastos, por eso es la cifra que
              debes mirar para comparar.
            </P>
            <UL
              items={[
                "TIN: solo el interés del dinero prestado.",
                "TAE: interés + comisiones + gastos, anualizados.",
                "A igual TIN, gana el producto con menor TAE.",
                "Una TAE muy alta es la señal típica de un microcrédito o una tarjeta revolving.",
              ]}
            />
          </>
        ),
      },
      {
        title: "Ejemplos prácticos",
        body: (
          <>
            <P>
              Dos préstamos pueden anunciar el mismo TIN (por ejemplo, 6%), pero si uno cobra una
              comisión de apertura del 3%, su TAE será claramente mayor: pagarás más por el mismo
              dinero. Por eso comparar solo por el TIN engaña.
            </P>
            <P>
              Muchos microcréditos rápidos llegan a TAE de tres cifras, y las tarjetas revolving
              superan a menudo el 20%. Si ves una TAE desproporcionada, probablemente estás ante
              un producto que conviene evitar o reclamar.
            </P>
          </>
        ),
      },
      {
        title: "Contenido relacionado",
        body: (
          <UL
            items={[
              <>
                Si ya pagas un crédito con TAE muy alta, mira las{" "}
                <A to="/microcreditos-prestamos/cancelar-microcreditos">
                  opciones para cancelar microcréditos
                </A>
                .
              </>,
              <>
                Las{" "}
                <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">tarjetas revolving</A>{" "}
                pueden ser reclamables por usura.
              </>,
              <>
                Antes de pedir crédito, valora{" "}
                <A to="/guias/alternativas-a-los-microcreditos">alternativas más baratas</A>.
              </>,
            ]}
          />
        ),
      },
    ],
    faq: [
      {
        q: "¿La TAE incluye todos los gastos del préstamo?",
        a: "Incluye el interés y la mayoría de comisiones y gastos obligatorios. Algunos gastos opcionales (como seguros no exigidos) pueden quedar fuera, así que revisa siempre el contrato.",
        plain:
          "Incluye el interés y la mayoría de comisiones y gastos obligatorios; algunos gastos opcionales pueden quedar fuera, revisa el contrato.",
      },
      {
        q: "¿Qué TAE se considera abusiva?",
        a: (
          <>
            Depende del producto y del momento, pero una TAE muy por encima de la media del
            mercado puede considerarse usura. Las{" "}
            <A to="/tarjetas-revolving">tarjetas revolving</A> son el caso más habitual de
            reclamación.
          </>
        ),
        plain:
          "Depende del producto, pero una TAE muy por encima de la media del mercado puede considerarse usura; las tarjetas revolving son el caso más habitual.",
      },
    ],
  },
  {
    slug: "fondo-de-emergencia",
    cluster: "guias",
    intro:
      "Un fondo de emergencia es el ahorro que te permite afrontar un imprevisto sin recurrir a créditos rápidos. Es la mejor barrera contra la espiral de deuda. Te contamos cuánto necesitas y cómo crearlo desde cero.",
    sections: [
      {
        title: "Respuesta clara",
        body: (
          <>
            <P>
              El fondo de emergencia es dinero líquido y accesible reservado solo para
              imprevistos: una avería, una reparación, un mes sin ingresos. La referencia
              habitual es ahorrar entre <strong>3 y 6 meses de tus gastos fijos</strong>.
            </P>
            <UL
              items={[
                "Si tus ingresos son estables: 3 meses pueden bastar.",
                "Si eres autónomo o tienes ingresos variables: apunta a 6 meses o más.",
                "Guárdalo separado de tu cuenta diaria, pero disponible sin penalización.",
                "No es para caprichos ni para inversiones: solo emergencias reales.",
              ]}
            />
          </>
        ),
      },
      {
        title: "Ejemplos prácticos",
        body: (
          <>
            <P>
              Si tus gastos fijos son 1.200 € al mes, un fondo de 3 meses serían 3.600 €. Puede
              parecer mucho, pero se construye poco a poco: ahorrar 150 € al mes lo logra en dos
              años, y cualquier cantidad ya te da margen.
            </P>
            <P>
              La clave es automatizarlo: programa un traspaso el día de cobro para que el ahorro
              salga "antes" de gastar. Empieza con lo que puedas, aunque sean 20 € al mes.
            </P>
          </>
        ),
      },
      {
        title: "Contenido relacionado",
        body: (
          <UL
            items={[
              <>
                Para liberar margen de ahorro, empieza por{" "}
                <A to="/guias/como-hacer-un-presupuesto">hacer un presupuesto</A>.
              </>,
              <>
                Evita el crédito caro conociendo{" "}
                <A to="/guias/alternativas-a-los-microcreditos">
                  alternativas a los microcréditos
                </A>
                .
              </>,
              <>
                Si ya estás endeudado, prioriza salir de la deuda:{" "}
                <A to="/cancelar-deudas">cancelar deudas</A>.
              </>,
            ]}
          />
        ),
      },
    ],
    faq: [
      {
        q: "¿Debo crear el fondo de emergencia antes de pagar mis deudas?",
        a: "Lo ideal es un pequeño colchón inicial (por ejemplo, un mes) y, en paralelo, atacar la deuda cara. Un mínimo de ahorro evita que un imprevisto te devuelva a pedir crédito.",
        plain:
          "Lo ideal es un pequeño colchón inicial y, en paralelo, atacar la deuda cara; un mínimo de ahorro evita volver a pedir crédito ante un imprevisto.",
      },
      {
        q: "¿Dónde guardo el fondo de emergencia?",
        a: "En un producto líquido y sin riesgo del que puedas disponer rápido, como una cuenta separada. La prioridad es la disponibilidad, no la rentabilidad.",
        plain:
          "En un producto líquido y sin riesgo del que puedas disponer rápido, como una cuenta separada; prioriza la disponibilidad, no la rentabilidad.",
      },
    ],
  },
  {
    slug: "alternativas-a-los-microcreditos",
    cluster: "guias",
    intro:
      "Los microcréditos son rápidos, pero su coste (TAE altísima) puede arrastrarte a una espiral de deuda. Antes de pedir uno, revisa estas alternativas más baratas y seguras para conseguir liquidez.",
    sections: [
      {
        title: "Respuesta clara",
        body: (
          <>
            <P>
              Un microcrédito debería ser el último recurso, no el primero. Antes de solicitarlo,
              valora opciones con un coste mucho menor:
            </P>
            <UL
              items={[
                "Adelanto o anticipo de nómina con tu empresa o banco, sin intereses abusivos.",
                "Aplazar o fraccionar facturas y recibos con el propio proveedor.",
                "Pedir un préstamo personal del banco: más lento, pero con TAE muy inferior.",
                "Préstamo familiar o entre conocidos, dejándolo por escrito.",
                "Vender lo que no usas para cubrir el imprevisto sin endeudarte.",
                "Usar tu fondo de emergencia si lo tienes.",
              ]}
            />
          </>
        ),
      },
      {
        title: "Ejemplos prácticos",
        body: (
          <>
            <P>
              Ante un imprevisto de 300 €, un microcrédito a devolver en semanas puede suponer
              decenas de euros en intereses y comisiones. Fraccionar ese mismo gasto con el
              proveedor o usar un adelanto suele salir mucho más barato.
            </P>
            <P>
              Si ya tienes varios microcréditos encadenados, el problema no se resuelve pidiendo
              otro: lo agrava. En ese punto la prioridad es frenar la espiral.
            </P>
          </>
        ),
      },
      {
        title: "Contenido relacionado",
        body: (
          <UL
            items={[
              <>
                Si ya estás en la espiral, mira cómo{" "}
                <A to="/microcreditos-prestamos/cancelar-microcreditos">
                  cancelar microcréditos
                </A>
                .
              </>,
              <>
                Aprende a comparar el coste real con{" "}
                <A to="/guias/que-es-la-tae">qué es la TAE</A>.
              </>,
              <>
                Crea un colchón para no depender del crédito:{" "}
                <A to="/guias/fondo-de-emergencia">fondo de emergencia</A>.
              </>,
            ]}
          />
        ),
      },
    ],
    faq: [
      {
        q: "¿Pedir otro microcrédito para pagar el anterior es buena idea?",
        a: (
          <>
            No. Encadenar microcréditos es la forma más rápida de entrar en una espiral. Si ya
            estás ahí, estudia{" "}
            <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelarlos</A> o acogerte a
            la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>.
          </>
        ),
        plain:
          "No. Encadenar microcréditos es la forma más rápida de entrar en una espiral; si ya estás ahí, estudia cancelarlos o la Ley de Segunda Oportunidad.",
      },
      {
        q: "¿Las alternativas al microcrédito requieren tener buen historial?",
        a: "Algunas sí (préstamo bancario), pero otras no, como aplazar facturas con el proveedor, un anticipo de nómina o vender lo que no usas. Siempre hay opciones más baratas que un microcrédito.",
        plain:
          "Algunas requieren buen historial, pero otras no (aplazar facturas, anticipo de nómina, vender lo que no usas); casi siempre hay opciones más baratas que un microcrédito.",
      },
    ],
  },
];

const guiaBySlug: Record<string, GuiaContent> = guiaList.reduce(
  (acc, g) => {
    acc[`${g.cluster}/${g.slug}`] = g;
    return acc;
  },
  {} as Record<string, GuiaContent>,
);

export const getGuiaContent = (cluster: string, slug: string): GuiaContent | undefined =>
  guiaBySlug[`${cluster}/${slug}`];