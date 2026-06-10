import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Contenido real de los 12 hubs de cluster satélite.
 * Cada hub es una página índice editorial: intro + secciones + FAQ + interlinking.
 * Los 3 hubs "principales" (LSO, Cancelar, Reunificar) se sirven como money pages.
 */

export type HubSection = { title: string; body: ReactNode };
export type HubFaq = { q: string; a: ReactNode; plain: string };

export type HubContent = {
  slug: string;
  /** subtítulo bajo el H1 (sustituye a cluster.description) */
  intro: ReactNode;
  sections: HubSection[];
  faq?: HubFaq[];
  /** overrides opcionales de metadatos */
  seoTitle?: string;
  metaDescription?: string;
};

/** Enlace interno con estilo de marca. */
const A = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

/** Párrafo de cuerpo reutilizable. */
const P = ({ children }: { children: ReactNode }) => (
  <p className="text-base leading-relaxed text-muted-foreground">{children}</p>
);

/** Lista con viñetas. */
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

const hubs: HubContent[] = [
  {
    slug: "asnef",
    intro:
      "Estar en ASNEF te cierra la puerta a financiación, hipotecas y hasta a contratos de móvil o luz. Aquí te explicamos qué significa, cómo comprobar si estás fichado y, sobre todo, cómo salir de forma definitiva.",
    sections: [
      {
        title: "Qué es ASNEF y cómo afecta a tu vida diaria",
        body: (
          <>
            <P>
              ASNEF es el fichero de morosos más usado en España: bancos, financieras y
              compañías de servicios consultan tu nombre antes de concederte cualquier
              producto. Si apareces, te niegan préstamos, tarjetas, hipotecas e incluso
              cambios de compañía de telefonía o energía.
            </P>
            <P>
              No es una lista eterna: una deuda solo puede figurar si es cierta, vencida y
              exigible, y debe desaparecer cuando pagas, cuando prescribe o cuando se
              demuestra que la inclusión fue indebida.
            </P>
          </>
        ),
      },
      {
        title: "Cómo comprobar si estás en un fichero de morosos",
        body: (
          <>
            <P>
              Tienes derecho a pedir gratis a ASNEF, Badexcug (Experian) o RAI qué datos
              tuyos guardan y quién los aportó. Conviene revisarlo al menos una vez al año,
              porque muchas inclusiones contienen errores o importes que ya no debes.
            </P>
            <UL
              items={[
                "Quién te ha incluido y por qué importe.",
                "Si te avisaron antes de ficharte (es obligatorio).",
                "Si la deuda sigue siendo exigible o ya prescribió.",
              ]}
            />
          </>
        ),
      },
      {
        title: "Tus opciones para salir de ASNEF",
        body: (
          <>
            <P>
              Según tu caso, puedes pagar y exigir la baja, reclamar una inclusión
              indebida, o eliminar la deuda de raíz con la Ley de Segunda Oportunidad. La
              vía rápida y completa es resolver la deuda que originó el fichaje.
            </P>
            <P>
              Te acompañamos en todo el proceso en{" "}
              <A to="/asnef/salir-de-asnef">Salir de ASNEF</A>. Si tu problema viene de
              pequeños préstamos o tarjetas, mira también{" "}
              <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>{" "}
              y <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>.
            </P>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "¿Cuánto se tarda en salir de ASNEF?",
        a: <P>Una vez resuelta la deuda, la baja suele producirse en pocos días. La empresa que te incluyó está obligada a comunicar la cancelación cuando dejas de deber.</P>,
        plain: "Tras resolver la deuda, la baja suele tardar pocos días. La empresa que te incluyó debe comunicar la cancelación cuando dejas de deber.",
      },
      {
        q: "¿Pueden incluirme en ASNEF sin avisar?",
        a: <P>No. La ley exige un requerimiento previo de pago. Si no te avisaron, la inclusión es indebida y puedes reclamar la baja y una indemnización.</P>,
        plain: "No. La ley exige un requerimiento previo de pago. Sin aviso, la inclusión es indebida y puedes reclamar la baja y una indemnización.",
      },
      {
        q: "¿Salir de ASNEF borra mi deuda?",
        a: <P>No siempre. Salir del fichero y eliminar la deuda son cosas distintas. Para librarte de la deuda de forma definitiva existe la Ley de Segunda Oportunidad.</P>,
        plain: "No siempre. Salir del fichero y eliminar la deuda son cosas distintas; para eliminar la deuda existe la Ley de Segunda Oportunidad.",
      },
    ],
  },
  {
    slug: "embargos",
    intro:
      "Un embargo puede llegar a tu nómina, tu cuenta o tu vivienda. Actuar a tiempo lo cambia todo: aquí tienes qué hacer hoy, qué parte de tus ingresos es inembargable y cómo frenarlo o cancelarlo.",
    sections: [
      {
        title: "Qué se puede embargar y qué está protegido",
        body: (
          <>
            <P>
              La ley protege un mínimo vital: no pueden embargarte por debajo del Salario
              Mínimo Interprofesional, y por encima se aplica una escala por tramos. Conocer
              esos límites evita embargos abusivos sobre tu nómina o pensión.
            </P>
            <UL
              items={[
                "Nómina y pensión: solo la parte que supera el SMI, por tramos.",
                "Cuenta bancaria: protegida en la cuantía equivalente al SMI.",
                "Vivienda: posible, pero con garantías y plazos que puedes aprovechar.",
              ]}
            />
          </>
        ),
      },
      {
        title: "Qué hacer en cuanto recibes la notificación",
        body: (
          <>
            <P>
              El reloj corre desde que te notifican. No ignores el documento: revisa el
              importe, comprueba si la deuda es correcta y valora oponerte dentro de plazo.
              Muchos embargos parten de un{" "}
              <A to="/juicio-monitorio-recobro/juicio-monitorio-deuda">juicio monitorio</A>{" "}
              que pudo no contestarse a tiempo.
            </P>
          </>
        ),
      },
      {
        title: "Cómo parar o levantar un embargo",
        body: (
          <>
            <P>
              Según el origen, se puede negociar, oponerse formalmente o eliminar la deuda
              con la Ley de Segunda Oportunidad, que paraliza ejecuciones. Lo vemos paso a
              paso en <A to="/embargos/parar-embargo">Parar un embargo</A>.
            </P>
            <P>
              Si detrás hay una <A to="/empresas-de-recobro">empresa de recobro</A>, conviene
              verificar que la deuda que reclaman es real y está actualizada.
            </P>
          </>
        ),
      },
    ],
    faq: [
      {
        q: "¿Pueden embargarme toda la nómina?",
        a: <P>No. La parte equivalente al Salario Mínimo Interprofesional es inembargable y el resto se embarga por tramos crecientes.</P>,
        plain: "No. La parte equivalente al SMI es inembargable y el resto se embarga por tramos crecientes.",
      },
      {
        q: "¿La Ley de Segunda Oportunidad detiene los embargos?",
        a: <P>Sí. Al iniciar el procedimiento se pueden paralizar embargos y ejecuciones sobre tus bienes mientras se tramita.</P>,
        plain: "Sí. Al iniciar el procedimiento se pueden paralizar embargos y ejecuciones mientras se tramita.",
      },
    ],
  },
  {
    slug: "tarjetas-revolving",
    intro:
      "Las tarjetas revolving aplican intereses tan altos que la deuda casi no baja por mucho que pagues. Muchas son declaradas usurarias por los tribunales: aquí te explicamos cómo reclamar y cancelar.",
    sections: [
      {
        title: "Por qué la deuda revolving no baja nunca",
        body: (
          <P>
            Con una revolving pagas una cuota cómoda, pero la mayor parte se va en intereses
            (a menudo por encima del 24-26% TAE). El capital apenas se reduce y el saldo se
            renueva mes a mes: es el efecto bola de nieve que mantiene a miles de personas
            atrapadas durante años.
          </P>
        ),
      },
      {
        title: "Cuándo una revolving es usura",
        body: (
          <>
            <P>
              El Tribunal Supremo considera usurarios los intereses notablemente superiores
              al dinero normal del mercado. Si tu tarjeta encaja, puedes anular el contrato y
              recuperar lo pagado de más por encima del capital prestado.
            </P>
            <P>
              Esto aplica a entidades muy comunes como{" "}
              <A to="/tarjetas-revolving/wizink">WiZink</A>,{" "}
              <A to="/tarjetas-revolving/cetelem">Cetelem</A> u{" "}
              <A to="/tarjetas-revolving/oney">Oney</A>.
            </P>
          </>
        ),
      },
      {
        title: "Reclamar o cancelar: tus opciones",
        body: (
          <P>
            Puedes reclamar la nulidad por usura o, si tu situación de deuda es más amplia,
            cancelarla por completo. Empieza por{" "}
            <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>.
            Si también arrastras pequeños préstamos, revisa{" "}
            <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Qué pasa si anulan mi tarjeta revolving por usura?",
        a: <P>El contrato queda sin efecto y solo tendrías que devolver el capital prestado. Todo lo pagado de más en intereses se recupera.</P>,
        plain: "El contrato queda sin efecto y solo devuelves el capital prestado; lo pagado de más en intereses se recupera.",
      },
      {
        q: "¿Puedo reclamar si ya terminé de pagar la tarjeta?",
        a: <P>Sí. Aunque la hayas cancelado, puedes reclamar la devolución de los intereses cobrados de forma abusiva.</P>,
        plain: "Sí. Aunque la hayas cancelado, puedes reclamar la devolución de los intereses abusivos.",
      },
    ],
  },
  {
    slug: "microcreditos-prestamos",
    intro:
      "Los microcréditos rápidos solucionan un apuro, pero devuelves mucho más de lo que pediste y encadenan a nuevos préstamos. Aquí ves cómo romper el círculo y cancelar este tipo de deuda.",
    sections: [
      {
        title: "Por qué los microcréditos crean una espiral",
        body: (
          <P>
            Se conceden en minutos y sin apenas requisitos, pero con TAE altísimas y plazos
            cortos. Para devolver uno se pide otro, y en pocos meses la suma de pequeños
            préstamos se vuelve imposible de pagar.
          </P>
        ),
      },
      {
        title: "Tus derechos frente a las financieras",
        body: (
          <>
            <P>
              Puedes exigir transparencia, revisar si el interés es abusivo y comprobar que
              te incluyeron en ASNEF de forma correcta. Entidades como{" "}
              <A to="/microcreditos-prestamos/vivus">Vivus</A>,{" "}
              <A to="/microcreditos-prestamos/moneyman">Moneyman</A> o{" "}
              <A to="/microcreditos-prestamos/dineo">Dineo</A> son habituales en estos casos.
            </P>
          </>
        ),
      },
      {
        title: "Cómo cancelar tus microcréditos",
        body: (
          <P>
            Cuando la deuda es inasumible, la Ley de Segunda Oportunidad permite eliminarla
            por completo. Lo vemos en{" "}
            <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>.
            Si además estás fichado, combínalo con{" "}
            <A to="/asnef/salir-de-asnef">salir de ASNEF</A>.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Se pueden cancelar los microcréditos con la Ley de Segunda Oportunidad?",
        a: <P>Sí. Es una de las deudas que mejor encajan, ya que suelen acumularse en cantidades inasumibles para particulares.</P>,
        plain: "Sí. Los microcréditos encajan muy bien en la Ley de Segunda Oportunidad porque suelen acumularse en cantidades inasumibles.",
      },
      {
        q: "¿Y si no puedo pagar la cuota de este mes?",
        a: <P>No pidas otro préstamo para taparlo. Lo recomendable es analizar el conjunto de tu deuda y buscar una salida definitiva.</P>,
        plain: "Evita pedir otro préstamo para taparlo; analiza el conjunto de tu deuda y busca una salida definitiva.",
      },
    ],
  },
  {
    slug: "deudas-hacienda-seguridad-social",
    intro:
      "Las deudas con Hacienda y la Seguridad Social tienen reglas propias y plazos estrictos. Aquí te explicamos qué se puede aplazar, qué parte puede exonerarse y cómo evitar recargos y embargos.",
    sections: [
      {
        title: "Qué hace especial a la deuda pública",
        body: (
          <P>
            La Administración puede embargar sin pasar por un juez y aplicar recargos
            automáticos. Por eso conviene actuar pronto: aplazar, fraccionar o presentar
            alegaciones dentro de plazo marca la diferencia.
          </P>
        ),
      },
      {
        title: "Aplazamiento, fraccionamiento y exoneración",
        body: (
          <>
            <P>
              En muchos casos se puede pactar un calendario de pago. Y, dentro de la Ley de
              Segunda Oportunidad, una parte de la deuda pública también puede exonerarse con
              límites legales.
            </P>
            <P>
              Profundiza en <A to="/deudas-hacienda-seguridad-social/deudas-hacienda">deudas con Hacienda</A>{" "}
              y <A to="/deudas-hacienda-seguridad-social/deudas-seguridad-social">deudas con la Seguridad Social</A>.
            </P>
          </>
        ),
      },
      {
        title: "Si eres autónomo",
        body: (
          <P>
            La deuda pública suele ir unida a la actividad. Si arrastras cuotas y deudas del
            negocio, mira{" "}
            <A to="/autonomos-concurso-acreedores">autónomos y concurso</A> para ver tu
            salida completa.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Se puede cancelar la deuda con Hacienda?",
        a: <P>Parcialmente. La Ley de Segunda Oportunidad permite exonerar deuda pública hasta ciertos límites legales por cada organismo.</P>,
        plain: "Parcialmente. La Ley de Segunda Oportunidad permite exonerar deuda pública hasta ciertos límites legales por organismo.",
      },
      {
        q: "¿Hacienda puede embargarme sin juicio?",
        a: <P>Sí. La Administración tiene capacidad de embargo por vía administrativa, por eso es clave reaccionar dentro de los plazos.</P>,
        plain: "Sí. La Administración puede embargar por vía administrativa, por eso es clave reaccionar dentro de plazo.",
      },
    ],
  },
  {
    slug: "juicio-monitorio-recobro",
    intro:
      "Recibir un juicio monitorio o una demanda por deuda asusta, pero tienes plazo para reaccionar. Aquí te explicamos qué significa, cómo oponerte y qué pasa si no contestas.",
    sections: [
      {
        title: "Qué es un juicio monitorio",
        body: (
          <P>
            Es el procedimiento rápido que usan bancos y empresas de recobro para reclamar
            deudas. Si no contestas en plazo, la deuda se da por reconocida y se abre la vía
            del embargo.
          </P>
        ),
      },
      {
        title: "Cómo oponerte dentro de plazo",
        body: (
          <P>
            Puedes oponerte si la deuda no es correcta, está prescrita o incluye intereses
            abusivos. Lo vemos en{" "}
            <A to="/juicio-monitorio-recobro/juicio-monitorio-deuda">juicio monitorio por deuda</A>.
            Actuar a tiempo evita llegar al{" "}
            <A to="/embargos">embargo</A>.
          </P>
        ),
      },
      {
        title: "Cuando reclama una empresa de recobro",
        body: (
          <P>
            Muchas demandas vienen de carteras de deuda compradas por terceros. Verifica
            siempre que la deuda es real y que quien reclama tiene derecho a hacerlo: lo
            tratamos en <A to="/empresas-de-recobro">empresas de recobro</A>.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Qué pasa si no contesto a un juicio monitorio?",
        a: <P>La deuda se considera aceptada y el acreedor puede solicitar el embargo de tus bienes e ingresos.</P>,
        plain: "La deuda se considera aceptada y el acreedor puede pedir el embargo de tus bienes e ingresos.",
      },
      {
        q: "¿Cuánto tiempo tengo para oponerme?",
        a: <P>El plazo habitual es de 20 días hábiles desde la notificación. Es muy importante no dejarlo pasar.</P>,
        plain: "El plazo habitual es de 20 días hábiles desde la notificación; no debe dejarse pasar.",
      },
    ],
  },
  {
    slug: "bancos-hipoteca-vivienda",
    intro:
      "Las deudas con bancos y la hipoteca son las que más pesan. Aquí reunimos tus derechos frente a las entidades, qué opciones tienes si no llegas a la cuota y cómo proteger tu vivienda.",
    sections: [
      {
        title: "Deudas con tu banco",
        body: (
          <>
            <P>
              Préstamos personales, descubiertos, avales o tarjetas: cuando se acumulan,
              conviene revisar condiciones y negociar antes de que escalen a recobro o
              embargo.
            </P>
            <P>
              Trabajamos con deudas de las principales entidades como{" "}
              <A to="/bancos-hipoteca-vivienda/santander">Santander</A>,{" "}
              <A to="/bancos-hipoteca-vivienda/bbva">BBVA</A> o{" "}
              <A to="/bancos-hipoteca-vivienda/caixabank">CaixaBank</A>.
            </P>
          </>
        ),
      },
      {
        title: "Si no puedes pagar la hipoteca",
        body: (
          <P>
            Existen alternativas antes de perder la vivienda: reestructuración, carencia,
            dación en pago o acogerse a la Ley de Segunda Oportunidad según tu caso. La clave
            es anticiparse a la ejecución.
          </P>
        ),
      },
      {
        title: "Cómo reducir o cancelar la deuda bancaria",
        body: (
          <P>
            Si la situación es inasumible, puedes{" "}
            <A to="/cancelar-deudas">cancelar deudas</A> o{" "}
            <A to="/reunificacion-deudas">reunificarlas</A> en una sola cuota. Te ayudamos a
            elegir la vía adecuada.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Puedo entrar en la Ley de Segunda Oportunidad con una hipoteca?",
        a: <P>Depende de tu situación. En algunos casos se mantiene la vivienda y en otros se valora la mejor salida; lo analizamos contigo.</P>,
        plain: "Depende del caso: a veces se mantiene la vivienda y otras se valora la mejor salida; se analiza individualmente.",
      },
      {
        q: "¿Qué es mejor, reunificar o cancelar?",
        a: <P>Reunificar baja la cuota pero mantiene la deuda; cancelar la elimina. La elección depende de tus ingresos y del importe total.</P>,
        plain: "Reunificar baja la cuota pero mantiene la deuda; cancelar la elimina. Depende de tus ingresos y del importe total.",
      },
    ],
  },
  {
    slug: "autonomos-concurso-acreedores",
    intro:
      "Como autónomo, las deudas del negocio y las personales se mezclan. La Ley de Segunda Oportunidad y el concurso de persona física te permiten empezar de cero. Aquí te explicamos cómo.",
    sections: [
      {
        title: "Deudas de autónomo: negocio y persona",
        body: (
          <P>
            El autónomo responde con su patrimonio personal de las deudas de la actividad.
            Cuotas de la Seguridad Social, proveedores, préstamos y Hacienda pueden ahogar a
            la vez el negocio y la economía familiar.
          </P>
        ),
      },
      {
        title: "El concurso de persona física",
        body: (
          <P>
            Es el procedimiento que ordena tus deudas y abre la puerta a la exoneración. Lo
            detallamos en{" "}
            <A to="/autonomos-concurso-acreedores/concurso-persona-fisica">concurso de persona física</A>.
          </P>
        ),
      },
      {
        title: "Empezar de cero con la Ley de Segunda Oportunidad",
        body: (
          <P>
            Si actuaste de buena fe, puedes cancelar tus deudas y reactivar tu actividad sin
            esa carga. Empieza por la{" "}
            <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>. Si arrastras
            deuda pública, mira también{" "}
            <A to="/deudas-hacienda-seguridad-social">Hacienda y Seguridad Social</A>.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Un autónomo puede acogerse a la Ley de Segunda Oportunidad?",
        a: <P>Sí. Está pensada precisamente para particulares y autónomos de buena fe que no pueden hacer frente a sus deudas.</P>,
        plain: "Sí. La Ley de Segunda Oportunidad está pensada para particulares y autónomos de buena fe que no pueden pagar sus deudas.",
      },
      {
        q: "¿Tengo que cerrar mi negocio?",
        a: <P>No necesariamente. En muchos casos puedes seguir con tu actividad una vez liberado de la deuda inasumible.</P>,
        plain: "No necesariamente. En muchos casos puedes seguir con tu actividad tras liberarte de la deuda inasumible.",
      },
    ],
  },
  {
    slug: "empresas-de-recobro",
    intro:
      "Si una empresa de recobro te reclama una deuda, tienes derechos. Aquí te explicamos cómo verificar que la deuda es real, qué pueden y qué no pueden hacer, y cómo responder con seguridad.",
    sections: [
      {
        title: "Quién te reclama y por qué",
        body: (
          <P>
            Las empresas de recobro compran carteras de deuda a bancos y financieras por una
            fracción de su valor, y luego reclaman el importe completo. Que te llamen no
            significa que la deuda sea correcta o esté actualizada.
          </P>
        ),
      },
      {
        title: "Tus derechos frente al acoso",
        body: (
          <>
            <P>
              No pueden presionarte con llamadas constantes, amenazas ni avisar a tu entorno.
              Puedes exigir por escrito el detalle y la prueba de la deuda antes de pagar nada.
            </P>
            <UL
              items={[
                "Exige el documento que acredita la deuda y su importe actual.",
                "Comprueba si está prescrita o ya pagada.",
                "Guarda todas las comunicaciones por escrito.",
              ]}
            />
          </>
        ),
      },
      {
        title: "Si llegan al juzgado",
        body: (
          <P>
            Muchas reclamaciones acaban en un{" "}
            <A to="/juicio-monitorio-recobro/juicio-monitorio-deuda">juicio monitorio</A> o en
            un <A to="/embargos/parar-embargo">embargo</A>. Reaccionar a tiempo es esencial.
            Si la deuda es real e inasumible, valora{" "}
            <A to="/cancelar-deudas">cancelarla</A> de forma definitiva.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Tengo que pagar a una empresa de recobro?",
        a: <P>Solo si la deuda es real, exigible y está debidamente acreditada. Tienes derecho a pedir la prueba antes de pagar.</P>,
        plain: "Solo si la deuda es real, exigible y está acreditada. Tienes derecho a exigir la prueba antes de pagar.",
      },
      {
        q: "¿Pueden llamar a mi familia o a mi trabajo?",
        a: <P>No. Comunicar tu deuda a terceros vulnera tu privacidad y puede ser denunciado.</P>,
        plain: "No. Comunicar tu deuda a terceros vulnera tu privacidad y puede denunciarse.",
      },
    ],
  },
  {
    slug: "situaciones",
    intro:
      "Las deudas no llegan solas: un divorcio, el paro, una enfermedad o un fallecimiento las complican. Aquí reunimos las situaciones personales más frecuentes y cómo afrontarlas.",
    sections: [
      {
        title: "Cuando la vida cambia y la deuda aprieta",
        body: (
          <P>
            Separaciones, pérdida de empleo, bajas largas o herencias con deudas son
            momentos en los que la economía se tambalea. Cada situación tiene matices
            legales que conviene conocer antes de tomar decisiones.
          </P>
        ),
      },
      {
        title: "Deudas compartidas y heredadas",
        body: (
          <UL
            items={[
              "Divorcio: cómo se reparten préstamos e hipoteca común.",
              "Herencia: puedes aceptar a beneficio de inventario o renunciar para no heredar deudas.",
              "Avales: qué ocurre si firmaste como garante de otra persona.",
            ]}
          />
        ),
      },
      {
        title: "Una salida según tu caso",
        body: (
          <P>
            Pase lo que pase, casi siempre hay una vía: desde{" "}
            <A to="/reunificacion-deudas">reunificar</A> hasta{" "}
            <A to="/ley-segunda-oportunidad">cancelar las deudas con la Ley de Segunda Oportunidad</A>.
            Lo analizamos contigo sin compromiso.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Se heredan las deudas?",
        a: <P>Solo si aceptas la herencia sin más. Puedes aceptarla a beneficio de inventario o renunciar para no responder de las deudas.</P>,
        plain: "Solo si aceptas la herencia pura y simple. Puedes aceptarla a beneficio de inventario o renunciar para no heredar deudas.",
      },
      {
        q: "Tras un divorcio, ¿quién paga las deudas comunes?",
        a: <P>Depende del régimen económico y de quién firmó cada préstamo. Conviene revisar cada deuda por separado.</P>,
        plain: "Depende del régimen económico y de quién firmó cada préstamo; conviene revisar cada deuda por separado.",
      },
    ],
  },
  {
    slug: "estafas-fraude",
    intro:
      "Phishing, suplantaciones, falsas inversiones o préstamos fraudulentos: si has sufrido un fraude financiero, actuar rápido es clave. Aquí te explicamos cómo reaccionar y proteger tu dinero.",
    sections: [
      {
        title: "Tipos de fraude financiero más comunes",
        body: (
          <UL
            items={[
              "Phishing y smishing: correos o SMS falsos que roban tus claves.",
              "Suplantación de tu banco por teléfono (vishing).",
              "Falsas inversiones y chiringuitos financieros.",
              "Préstamos o tarjetas contratados con tu identidad.",
            ]}
          />
        ),
      },
      {
        title: "Qué hacer en las primeras horas",
        body: (
          <UL
            items={[
              "Avisa a tu banco y bloquea tarjetas y accesos.",
              "Denuncia ante la Policía o la Guardia Civil.",
              "Reúne pruebas: capturas, mensajes y movimientos.",
              "Reclama por escrito la devolución de los cargos no autorizados.",
            ]}
          />
        ),
      },
      {
        title: "Si el fraude te ha dejado deudas",
        body: (
          <P>
            A veces el fraude deja préstamos o cargos a tu nombre. Si te reclaman una deuda
            que no reconoces, no la asumas sin más: revisa si detrás hay una{" "}
            <A to="/empresas-de-recobro">empresa de recobro</A> y verifica su origen.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "Me han hecho phishing, ¿el banco me devuelve el dinero?",
        a: <P>En muchos casos sí, salvo negligencia grave por tu parte. Debes reclamar cuanto antes y, si lo rechazan, acudir al Banco de España.</P>,
        plain: "En muchos casos sí, salvo negligencia grave. Reclama cuanto antes y, si lo rechazan, acude al Banco de España.",
      },
      {
        q: "Han pedido un préstamo con mi identidad, ¿qué hago?",
        a: <P>Denuncia la suplantación y comunícalo a la entidad. No eres responsable de una deuda contratada de forma fraudulenta.</P>,
        plain: "Denuncia la suplantación y comunícalo a la entidad. No eres responsable de una deuda contratada fraudulentamente.",
      },
    ],
  },
  {
    slug: "guias",
    intro:
      "Entender tus finanzas es el primer paso para salir de las deudas y no volver a caer. Aquí reunimos guías de educación financiera, alternativas a endeudarte y recursos prácticos.",
    sections: [
      {
        title: "Aprende a manejar tu dinero",
        body: (
          <P>
            Un presupuesto realista, un fondo de emergencia y saber leer un contrato de
            crédito evitan la mayoría de los problemas. Nuestras guías te ayudan a tomar el
            control sin tecnicismos.
          </P>
        ),
      },
      {
        title: "Alternativas antes de endeudarte",
        body: (
          <UL
            items={[
              "Renegociar plazos con tus acreedores antes de pedir un nuevo préstamo.",
              "Comparar el coste real (TAE) de cualquier financiación.",
              "Evitar el encadenamiento de microcréditos.",
            ]}
          />
        ),
      },
      {
        title: "Cuando ya hay deuda",
        body: (
          <P>
            Si la deuda ya existe, infórmate sobre cómo{" "}
            <A to="/reunificacion-deudas">reunificarla</A> o{" "}
            <A to="/cancelar-deudas">cancelarla</A>. Y si quieres entender la vía legal,
            empieza por la{" "}
            <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>.
          </P>
        ),
      },
    ],
    faq: [
      {
        q: "¿Cuánto debería ahorrar para imprevistos?",
        a: <P>Lo ideal es un fondo de emergencia de entre 3 y 6 meses de gastos básicos, construido poco a poco.</P>,
        plain: "Lo ideal es un fondo de emergencia de entre 3 y 6 meses de gastos básicos, construido poco a poco.",
      },
      {
        q: "¿Es buena idea pedir un préstamo para pagar otro?",
        a: <P>Solo si reduce el coste total y tienes un plan claro. Encadenar préstamos sin estrategia agrava el problema.</P>,
        plain: "Solo si reduce el coste total y hay un plan claro; encadenar préstamos sin estrategia agrava el problema.",
      },
    ],
  },
];

export const hubContentBySlug: Record<string, HubContent> = hubs.reduce(
  (acc, h) => {
    acc[h.slug] = h;
    return acc;
  },
  {} as Record<string, HubContent>,
);

export const getHubContent = (slug?: string): HubContent | undefined =>
  slug ? hubContentBySlug[slug] : undefined;