import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Localizacion } from "@/data/seo/localizaciones";
import CityLocationMap from "@/components/seo/CityLocationMap";

/**
 * Generador de contenido localizado para las landings de abogados por ciudad.
 * Cada ciudad recibe secciones y FAQ con datos locales (provincia, comunidad,
 * tribunal y nota única) para evitar contenido duplicado.
 */

const A = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="text-base leading-relaxed text-foreground/85">{children}</p>
);

/**
 * Índice de variante determinista por ciudad: estable para cada URL (no
 * cambia entre cargas, lo que confundiría a Google) pero repartido entre
 * ciudades para que el texto del armazón no sea idéntico entre todas.
 */
const variantIndex = (slug: string): number => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
};
const pick = <T,>(arr: T[], seed: number): T => arr[seed % arr.length];

export type LocalSection = { title: string; body: ReactNode };
export type LocalFaq = { q: string; a: ReactNode; plain: string };

export type LocalContent = {
  intro: ReactNode;
  sections: LocalSection[];
  faq: LocalFaq[];
};

export const getLocalizacionContent = (city: Localizacion): LocalContent => {
  const {
    name,
    provincia,
    comunidad,
    tribunal,
    localNote,
    zonas,
    sedeJudicial,
    perfilDeuda,
    prefijo,
    audienciaProvincial,
    ejemploCaso,
  } = city;
  const v = variantIndex(city.slug);

  const intro = pick(
    [
      <>
        ¿Buscas <strong>abogados de la Ley de Segunda Oportunidad en {name}</strong>? Estudiamos
        tu caso gratis, preparamos el expediente y te representamos ante los juzgados de{" "}
        {provincia} para cancelar legalmente tus deudas. Primer diagnóstico sin compromiso.
      </>,
      <>
        En {name} cancelamos deudas con la <strong>Ley de Segunda Oportunidad</strong>. Analizamos
        gratis tu situación, montamos el expediente y te representamos ante los juzgados de{" "}
        {provincia}, de principio a fin y sin compromiso.
      </>,
      <>
        ¿Estás en {name} y las deudas te superan? Con la{" "}
        <strong>Ley de Segunda Oportunidad</strong> puedes cancelarlas legalmente. El primer
        diagnóstico es gratuito y, si sigues, llevamos tu caso ante los juzgados de {provincia}.
      </>,
    ],
    v,
  );

  const sections: LocalSection[] = [
    {
      title: `Abogados de la Ley de Segunda Oportunidad en ${name}`,
      body: (
        <div className="space-y-4">
          <P>
            {pick(
              [
                <>
                  Si vives en {name} o en la provincia de {provincia} ({comunidad}) y no puedes
                  hacer frente a tus deudas, la <strong>Ley de Segunda Oportunidad</strong> te
                  permite cancelarlas legalmente y empezar de cero. Nuestro equipo de abogados
                  especialistas en derecho concursal lleva tu caso de principio a fin.
                </>,
                <>
                  ¿No puedes pagar tus deudas y vives en {name} o su provincia ({provincia},{" "}
                  {comunidad})? La <strong>Ley de Segunda Oportunidad</strong> te permite
                  cancelarlas legalmente y volver a empezar. Un equipo de abogados concursalistas
                  se encarga de todo el procedimiento.
                </>,
                <>
                  Para muchas familias y autónomos de {name} ({provincia}, {comunidad}), la{" "}
                  <strong>Ley de Segunda Oportunidad</strong> es la vía para cancelar las deudas y
                  empezar de cero. Nuestros abogados especialistas en derecho concursal se ocupan
                  de todo el proceso.
                </>,
              ],
              v,
            )}
          </P>
          <P>{localNote}</P>
          <P>
            Para entender el procedimiento completo, consulta el hub de la{" "}
            <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A> o el detalle de la{" "}
            <A to="/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho">
              exoneración del pasivo insatisfecho
            </A>
            .
          </P>
        </div>
      ),
    },
    {
      title: `Qué juzgados tramitan tu caso en ${name}`,
      body: (
        <div className="space-y-4">
          <P>
            La Ley de Segunda Oportunidad es un procedimiento <strong>judicial</strong>. En{" "}
            {name}, los expedientes se tramitan ante los <strong>{tribunal}</strong>: los
            particulares sin actividad empresarial acuden a los Juzgados de Primera Instancia y
            los autónomos y empresarios, a los Juzgados de lo Mercantil.
          </P>
          <P>
            En la práctica, tu caso se gestiona en {sedeJudicial}. Aunque la mayor parte del
            procedimiento es telemático, conocer la sede y los plazos de {name} nos permite
            coordinar cualquier comparecencia sin que tengas que preocuparte.
          </P>
          <P>
            Conocer el criterio de los juzgados de {provincia} nos permite preparar un
            expediente sólido y anticipar lo que el juez espera, lo que aumenta las
            probabilidades de que prospere la exoneración.
          </P>
        </div>
      ),
    },
    {
      title: `Zonas que atendemos en ${name} y provincia`,
      body: (
        <div className="space-y-4">
          <P>
            Damos servicio a toda la ciudad de {name} y a la provincia de {provincia} ({comunidad}),
            incluidas zonas como {zonas.slice(0, -1).join(", ")} y {zonas[zonas.length - 1]}. La
            atención es <strong>online</strong>, así que no importa en qué punto de la provincia
            vivas: el diagnóstico y la tramitación se hacen sin desplazamientos.
          </P>
          <CityLocationMap city={city} />
          <p className="text-sm leading-relaxed text-foreground/70">
            ¿Prefieres hablar por teléfono? Atendemos a la provincia de {provincia} (prefijo{" "}
            {prefijo}) a través de nuestro equipo central, de lunes a viernes.
          </p>
        </div>
      ),
    },
    {
      title: `La situación de la deuda en ${name}`,
      body: (
        <div className="space-y-4">
          <P>{perfilDeuda}</P>
          <P>{localNote}</P>
          <P>
            Sea cual sea el origen de tu deuda, estudiamos tu caso concreto en {name} y te decimos
            con claridad si puedes acogerte a la Ley de Segunda Oportunidad.
          </P>
        </div>
      ),
    },
    {
      title: `Casos frecuentes en ${name}`,
      body: (
        <div className="space-y-4">
          <P>{ejemploCaso}</P>
          <P>
            Situaciones así se resuelven cada año con la Ley de Segunda Oportunidad. El criterio
            de {audienciaProvincial} marca cómo se valoran estos expedientes en {provincia}, y por
            eso preparamos cada caso pensando en lo que el tribunal espera.
          </P>
        </div>
      ),
    },
    {
      title: `Cómo trabajamos tu caso en ${name}`,
      body: (
        <div className="space-y-4">
          <P>
            {pick(
              [
                <>
                  Buena parte del proceso se gestiona de forma telemática, así que no necesitas
                  desplazamientos para empezar. Estos son los pasos:
                </>,
                <>
                  No hace falta que te desplaces para arrancar: gestionamos casi todo de forma
                  telemática. El recorrido es este:
                </>,
                <>
                  Empezar es sencillo y sin desplazamientos, porque trabajamos online en gran parte
                  del proceso. Estos son los pasos que seguimos en {name}:
                </>,
              ],
              v,
            )}
          </P>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/85">
            <li>Diagnóstico gratuito: un abogado revisa tus deudas e ingresos y confirma si puedes acogerte.</li>
            <li>Preparación del expediente con toda la documentación y la mejor estrategia legal.</li>
            <li>Presentación y representación ante los juzgados de {name}.</li>
            <li>Resolución del juez: cancelación con plan de pagos o con liquidación.</li>
          </ul>
          <P>
            ¿Tu deuda viene de productos abusivos? Mira también cómo{" "}
            <A to="/cancelar-deudas">cancelar deudas</A>,{" "}
            <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>{" "}
            o <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>.
          </P>
        </div>
      ),
    },
    {
      title: "Honorarios y plazos",
      body: (
        <div className="space-y-4">
          <P>
            {pick(
              [
                <>
                  El <strong>primer diagnóstico es gratuito</strong>. Si decides seguir, trabajamos
                  con un presupuesto cerrado desde el inicio y opción de pago fraccionado, para que
                  los honorarios nunca sean el motivo de no empezar.
                </>,
                <>
                  Lo primero, el <strong>diagnóstico, es gratis</strong>. Si decides continuar,
                  fijamos un presupuesto cerrado desde el principio, con posibilidad de pago
                  fraccionado, para que el dinero no te frene.
                </>,
                <>
                  Trabajamos con transparencia: el <strong>primer diagnóstico no cuesta nada</strong>{" "}
                  y, si sigues adelante, sabrás el precio cerrado desde el inicio, con opción de
                  fraccionarlo.
                </>,
              ],
              v,
            )}
          </P>
          <P>
            El procedimiento suele durar entre 6 y 18 meses según la complejidad y el juzgado de{" "}
            {name}, aunque los embargos pueden suspenderse mucho antes.
          </P>
        </div>
      ),
    },
  ];

  const faqProvincia = pick(
    [
      `Sí. Atendemos a clientes de ${name} y de toda la provincia de ${provincia}. Gran parte del proceso se gestiona de forma telemática, sin desplazamientos.`,
      `Por supuesto. Damos servicio a ${name} y a cualquier municipio de la provincia de ${provincia}: como trabajamos online, no importa en qué punto vivas.`,
    ],
    v,
  );
  const faqJuzgado = pick(
    [
      `Los ${tribunal}. Los particulares acuden a los Juzgados de Primera Instancia y los autónomos y empresarios, a los Juzgados de lo Mercantil.`,
      `En ${name}, los ${tribunal}. Si eres particular, tu caso va a los Juzgados de Primera Instancia; si eres autónomo o empresario, a los de lo Mercantil.`,
    ],
    v,
  );
  const faqCoste = pick(
    [
      "El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado desde el inicio y opción de pago fraccionado.",
      "El diagnóstico inicial es gratuito. A partir de ahí trabajamos con un presupuesto cerrado desde el principio y con la opción de pagarlo a plazos.",
    ],
    v,
  );
  const faqPresencial = pick(
    [
      "No es imprescindible. El diagnóstico y buena parte de la tramitación se realizan de forma telemática; solo se acude al juzgado cuando el procedimiento lo requiere.",
      `No suele ser necesario. Hacemos el diagnóstico y casi toda la tramitación de forma telemática; solo se acude al juzgado de ${name} si el procedimiento lo exige.`,
    ],
    v,
  );

  const faq: LocalFaq[] = [
    {
      q: `¿Atendéis casos de toda la provincia de ${provincia}?`,
      a: <>{faqProvincia}</>,
      plain: faqProvincia,
    },
    {
      q: `¿Qué juzgado tramita la Ley de Segunda Oportunidad en ${name}?`,
      a: <>{faqJuzgado}</>,
      plain: faqJuzgado,
    },
    {
      q: "¿Cuánto cuesta un abogado de la Ley de Segunda Oportunidad?",
      a: <>{faqCoste}</>,
      plain: faqCoste,
    },
    {
      q: "¿Necesito acudir presencialmente?",
      a: <>{faqPresencial}</>,
      plain: faqPresencial,
    },
  ];

  return { intro, sections, faq };
};