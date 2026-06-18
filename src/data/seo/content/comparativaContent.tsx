import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Contenido real de las páginas comparativa.
 * Cada comparativa: intro + secciones (con tabla) + FAQ + interlinking.
 * Misma estructura que hubContent/entityContent (campo `plain` para JSON-LD).
 */

export type ComparativaSection = { title: string; body: ReactNode };
export type ComparativaFaq = { q: string; a: ReactNode; plain: string };

export type ComparativaContent = {
  slug: string;
  cluster: string;
  intro: ReactNode;
  sections: ComparativaSection[];
  faq?: ComparativaFaq[];
};

/** Enlace interno con estilo de marca. */
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

/** Tabla comparativa de dos opciones. */
type Row = { feature: string; a: ReactNode; b: ReactNode };
const CompareTable = ({
  optionA,
  optionB,
  rows,
}: {
  optionA: string;
  optionB: string;
  rows: Row[];
}) => (
  <div className="mt-2 overflow-x-auto rounded-2xl border border-border">
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="bg-surface">
          <th className="px-4 py-3 font-poppins font-semibold text-foreground">Criterio</th>
          <th className="px-4 py-3 font-poppins font-semibold text-foreground">{optionA}</th>
          <th className="px-4 py-3 font-poppins font-semibold text-foreground">{optionB}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-border align-top">
            <td className="px-4 py-3 font-medium text-foreground">{r.feature}</td>
            <td className="px-4 py-3 text-muted-foreground">{r.a}</td>
            <td className="px-4 py-3 text-muted-foreground">{r.b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const comparativaList: ComparativaContent[] = [
  {
    slug: "reunificar-o-cancelar",
    cluster: "reunificacion-deudas",
    intro:
      "Reunificar tus deudas y cancelarlas son dos caminos distintos: en uno negociamos con tus entidades para rebajar la cuota y el total (sigues pagando, pero menos) y en el otro se elimina legalmente lo que no puedes pagar. Aquí los comparamos para que elijas con criterio.",
    sections: [
      {
        title: "Tabla comparativa (pros y contras)",
        body: (
          <>
            <P>
              La diferencia de fondo es sencilla: la reunificación negocia y rebaja la deuda y la
              cancelación la extingue. Ojo, reunificar no es refinanciar (pedir un préstamo nuevo
              que alarga el plazo y encarece el total).
            </P>
            <CompareTable
              optionA="Reunificar deudas"
              optionB="Cancelar (Ley 2ª Oportunidad)"
              rows={[
                {
                  feature: "Qué hace",
                  a: "Negocia con tus entidades para bajar la cuota y el total. Sin préstamo nuevo.",
                  b: "Exonera legalmente la deuda que no puedes pagar.",
                },
                {
                  feature: "¿Sigues debiendo?",
                  a: "Sí, pero un importe rebajado tras la negociación.",
                  b: "No, la deuda exonerada desaparece.",
                },
                {
                  feature: "Cuota mensual",
                  a: "Más baja, fruto de la negociación.",
                  b: "Desaparece la deuda exonerada.",
                },
                {
                  feature: "Coste real",
                  a: "Menor: se rebaja el total. Sin garantía hipotecaria nueva.",
                  b: "Honorarios del proceso, sin intereses futuros.",
                },
                {
                  feature: "Plazo",
                  a: "Negociación relativamente rápida; sigues pagando, pero menos.",
                  b: "Meses; al terminar quedas libre.",
                },
                {
                  feature: "Ideal si",
                  a: "Tienes ingresos estables o bienes pagados que proteger.",
                  b: "La deuda supera lo que puedes asumir.",
                },
              ]}
            />
          </>
        ),
      },
      {
        title: "Cuándo conviene cada opción",
        body: (
          <>
            <P>
              <strong>Reunificar</strong> tiene sentido si el problema es de organización, no de
              solvencia: tienes ingresos estables, muchas cuotas pequeñas y solo necesitas
              negociar una rebaja de cuota y total con tus acreedores.
            </P>
            <P>
              <strong>Cancelar</strong> con la{" "}
              <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A> es la vía cuando la
              deuda ya no es asumible: por mucho que negocies, no llegas. En ese caso reunificar
              no basta.
            </P>
          </>
        ),
      },
      {
        title: "Riesgos a tener en cuenta",
        body: (
          <UL
            items={[
              "No confundas reunificar (negociar y rebajar) con refinanciar (préstamo nuevo que alarga el plazo y encarece el total).",
              "Desconfía de quien te ofrezca reunificar pidiendo un crédito nuevo o poniendo tu vivienda como garantía: eso es refinanciar.",
              "Reunificar no borra ASNEF si la deuda original ya estaba fichada.",
              <>
                Esperar demasiado para cancelar puede traer embargos; si ya los tienes, mira{" "}
                <A to="/embargos">cómo parar un embargo</A>.
              </>,
            ]}
          />
        ),
      },
      {
        title: "Nuestra recomendación",
        body: (
          <>
            <P>
              Si puedes pagar pero necesitas aire, valora{" "}
              <A to="/reunificacion-deudas">reunificar tus deudas</A>. Si la deuda te supera, no
              la alargues: estudia <A to="/cancelar-deudas">cancelarla legalmente</A>. Lo más
              prudente es analizar tu caso antes de decidir; el diagnóstico es gratuito.
            </P>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "¿Puedo cancelar la deuda después de haberla reunificado?",
        a: (
          <>
            Sí. Si tras reunificar sigues sin poder pagar, puedes acogerte a la{" "}
            <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>. La reunificación no
            te cierra esa puerta.
          </>
        ),
        plain:
          "Sí. Si tras reunificar sigues sin poder pagar, puedes acogerte a la Ley de Segunda Oportunidad; la reunificación no cierra esa puerta.",
      },
      {
        q: "¿Reunificar es lo mismo que refinanciar?",
        a: "No. Refinanciar es pedir un préstamo nuevo que agrupa todo y alarga el plazo, encareciendo el total. Reunificar, como lo hacemos nosotros, es negociar con las entidades para bajar la cuota y el total sin firmar otro crédito.",
        plain:
          "No. Refinanciar es pedir un préstamo nuevo que alarga el plazo y encarece el total; reunificar es negociar con las entidades para bajar la cuota y el total sin firmar otro crédito.",
      },
      {
        q: "¿Cuál afecta menos a mi historial?",
        a: "Cancelar legalmente cierra el problema y, una vez exonerada la deuda, puedes salir de los ficheros de morosos. Reunificar mantiene la deuda activa en tu historial.",
        plain:
          "Cancelar legalmente cierra el problema y permite salir de los ficheros de morosos; reunificar mantiene la deuda activa en tu historial.",
      },
    ],
  },
  {
    slug: "segunda-oportunidad-vs-concurso",
    cluster: "ley-segunda-oportunidad",
    intro:
      "Muchas personas confunden la Ley de Segunda Oportunidad con el concurso de acreedores. En realidad la primera es el mecanismo pensado para particulares y autónomos, y el concurso es el procedimiento que la articula. Te explicamos cómo encajan y qué esperar.",
    sections: [
      {
        title: "Tabla comparativa (pros y contras)",
        body: (
          <>
            <P>
              La Ley de Segunda Oportunidad es el marco legal que permite a una persona física
              exonerar sus deudas. El concurso de acreedores es el procedimiento judicial a
              través del cual se ordena y, en su caso, se obtiene esa exoneración.
            </P>
            <CompareTable
              optionA="Ley 2ª Oportunidad"
              optionB="Concurso de acreedores"
              rows={[
                {
                  feature: "A quién va dirigido",
                  a: "Particulares y autónomos de buena fe.",
                  b: "Empresas y también personas físicas.",
                },
                {
                  feature: "Objetivo",
                  a: "Exonerar las deudas que no puedes pagar.",
                  b: "Ordenar el pago a los acreedores; puede acabar en exoneración.",
                },
                {
                  feature: "Relación",
                  a: "Se tramita a través del procedimiento concursal.",
                  b: "Es el cauce que aplica la Segunda Oportunidad a personas físicas.",
                },
                {
                  feature: "Resultado",
                  a: "Exoneración del pasivo insatisfecho (EPI).",
                  b: "Liquidación o convenio; para particulares, EPI.",
                },
                {
                  feature: "Requisito clave",
                  a: "Actuar de buena fe y no superar ciertos límites.",
                  b: "Insolvencia actual o inminente.",
                },
              ]}
            />
          </>
        ),
      },
      {
        title: "Cuándo conviene cada opción",
        body: (
          <>
            <P>
              Si eres particular o autónomo y tus deudas te superan, tu vía es la{" "}
              <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>, que se materializa
              a través del concurso y termina en la{" "}
              <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">
                exoneración del pasivo insatisfecho
              </A>
              .
            </P>
            <P>
              El <strong>concurso de acreedores</strong> "clásico" es el procedimiento de fondo;
              para una empresa puede terminar en liquidación o convenio, y para un{" "}
              <A to="/autonomos-concurso-acreedores/concurso-persona-fisica">autónomo</A> es el
              camino hacia la cancelación.
            </P>
          </>
        ),
      },
      {
        title: "Riesgos a tener en cuenta",
        body: (
          <UL
            items={[
              "No actuar de buena fe (ocultar bienes o ingresos) puede hacer que se deniegue la exoneración.",
              "Hay deudas de difícil exoneración, como parte de las deudas públicas; conviene analizarlas antes.",
              "Iniciar el procedimiento sin asesoramiento puede alargar plazos y generar errores formales.",
            ]}
          />
        ),
      },
      {
        title: "Nuestra recomendación",
        body: (
          <P>
            Para una persona física no es "una u otra": la Segunda Oportunidad se obtiene a
            través del concurso. Lo importante es saber si cumples los requisitos y qué deudas
            son exonerables. Analizamos tu caso gratis y te decimos con claridad qué esperar:{" "}
            <A to="/ley-segunda-oportunidad">empieza por aquí</A>.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿La Ley de Segunda Oportunidad y el concurso son lo mismo?",
        a: "No exactamente. La Ley de Segunda Oportunidad es el mecanismo que permite a un particular exonerar deudas, y el concurso de acreedores es el procedimiento judicial a través del cual se obtiene.",
        plain:
          "No exactamente: la Ley de Segunda Oportunidad es el mecanismo que permite a un particular exonerar deudas, y el concurso de acreedores es el procedimiento judicial a través del cual se obtiene.",
      },
      {
        q: "¿Un autónomo puede acogerse a la Segunda Oportunidad?",
        a: (
          <>
            Sí. Los autónomos son uno de los perfiles principales. Tienes más detalle en{" "}
            <A to="/autonomos-concurso-acreedores/concurso-persona-fisica">
              concurso de persona física
            </A>
            .
          </>
        ),
        plain:
          "Sí. Los autónomos son uno de los perfiles principales; puedes verlo en concurso de persona física.",
      },
    ],
  },
  {
    slug: "acuerdo-de-pago-vs-cancelacion",
    cluster: "cancelar-deudas",
    intro:
      "Cuando no puedes pagar, tienes dos grandes vías: negociar un acuerdo de pago con tus acreedores (sigues pagando, en mejores condiciones) o cancelar legalmente la deuda. Te explicamos las diferencias para que no elijas a ciegas.",
    sections: [
      {
        title: "Tabla comparativa (pros y contras)",
        body: (
          <>
            <P>
              Negociar reduce o aplaza lo que debes; cancelar lo elimina. La elección depende de
              cuánta deuda tienes y de tu capacidad real de pago.
            </P>
            <CompareTable
              optionA="Acuerdo de pago"
              optionB="Cancelación legal"
              rows={[
                {
                  feature: "Qué consigues",
                  a: "Aplazar, fraccionar o rebajar parte de la deuda.",
                  b: "Eliminar la deuda que no puedes pagar.",
                },
                {
                  feature: "¿Sigues pagando?",
                  a: "Sí, según lo pactado.",
                  b: "No, sobre la deuda exonerada.",
                },
                {
                  feature: "Depende de",
                  a: "La voluntad del acreedor de negociar.",
                  b: "Cumplir los requisitos legales.",
                },
                {
                  feature: "Rapidez",
                  a: "Rápido si hay acuerdo.",
                  b: "Meses, pero cierra el problema.",
                },
                {
                  feature: "Ideal si",
                  a: "La deuda es asumible con mejores condiciones.",
                  b: "La deuda te supera por completo.",
                },
              ]}
            />
          </>
        ),
      },
      {
        title: "Cuándo conviene cada opción",
        body: (
          <>
            <P>
              <strong>Negociar</strong> es buena idea cuando la deuda es asumible y solo necesitas
              aire: una quita parcial, un fraccionamiento o pausar intereses. Funciona mejor con
              acreedores dispuestos a pactar, como algunas{" "}
              <A to="/empresas-de-recobro">empresas de recobro</A>.
            </P>
            <P>
              <strong>Cancelar</strong> con la{" "}
              <A to="/cancelar-deudas">vía legal de cancelación de deudas</A> es lo indicado
              cuando, negocies lo que negocies, no puedes pagar. En ese punto, aplazar solo
              prolonga la angustia.
            </P>
          </>
        ),
      },
      {
        title: "Riesgos a tener en cuenta",
        body: (
          <UL
            items={[
              "Un acuerdo mal redactado puede reconocer deudas dudosas o prescritas: revísalo antes de firmar.",
              "Aceptar un fraccionamiento que no puedes mantener te deja peor (impago de nuevo y más intereses).",
              "El acreedor no está obligado a negociar; si se niega, puede seguir con el recobro o la demanda.",
            ]}
          />
        ),
      },
      {
        title: "Nuestra recomendación",
        body: (
          <P>
            Antes de firmar nada, comprueba si la deuda es correcta y si realmente puedes
            asumir el acuerdo. Si la deuda te supera, no la aplaces: valora{" "}
            <A to="/cancelar-deudas">cancelarla legalmente</A>. Te ayudamos a decidir con un
            diagnóstico gratuito de tu situación.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Negociar con el acreedor afecta a mi derecho a cancelar después?",
        a: (
          <>
            No. Si el acuerdo no funciona o no llegas a pagar, puedes acudir a la{" "}
            <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A> para cancelar la
            deuda restante.
          </>
        ),
        plain:
          "No. Si el acuerdo no funciona o no llegas a pagar, puedes acudir a la Ley de Segunda Oportunidad para cancelar la deuda restante.",
      },
      {
        q: "¿Conviene aceptar la primera oferta de quita que me ofrecen?",
        a: "No necesariamente. Conviene verificar que la deuda es correcta y comparar el acuerdo con la opción de cancelarla por completo antes de firmar.",
        plain:
          "No necesariamente: conviene verificar que la deuda es correcta y comparar el acuerdo con la opción de cancelarla por completo antes de firmar.",
      },
    ],
  },
];

const comparativaBySlug: Record<string, ComparativaContent> = comparativaList.reduce(
  (acc, c) => {
    acc[`${c.cluster}/${c.slug}`] = c;
    return acc;
  },
  {} as Record<string, ComparativaContent>,
);

export const getComparativaContent = (
  cluster: string,
  slug: string,
): ComparativaContent | undefined => comparativaBySlug[`${cluster}/${slug}`];