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

/**
 * Enriquecimiento local REAL para las ciudades con más demanda (GSC):
 * juzgado competente, particularidades de la provincia, casos de éxito
 * enlazables y FAQ específicas. Solo datos verificables, sin cifras
 * inventadas: cuando algo depende del juzgado se dice así, sin números.
 */
type LocalEnrichment = {
  /** dato del juzgado/sede competente, en lenguaje de calle */
  juzgado: string;
  /** particularidad real del procedimiento o del tejido económico local */
  detalle: string;
  /** casos de éxito de la zona para enlazar */
  casos: { slug: string; label: string }[];
  /** FAQ específicas de la provincia (pregunta + respuesta en texto plano) */
  faqs: { q: string; a: string }[];
};

const LOCAL_ENRICHMENT: Record<string, LocalEnrichment> = {
  "a-coruna": {
    juzgado:
      "los Juzgados de lo Mercantil de A Coruña (sede en la Ciudad Judicial, junto a los de Primera Instancia que tramitan los concursos de particulares)",
    detalle:
      "En A Coruña vemos a menudo expedientes de autónomos del comercio y la hostelería y de familias con hipoteca más préstamos personales; los juzgados mercantiles coruñeses tramitan los concursos de autónomos con un volumen moderado, lo que suele agilizar las comparecencias respecto a las grandes capitales.",
    casos: [],
    faqs: [
      {
        q: "¿Dónde se presenta mi concurso de segunda oportunidad si vivo en A Coruña?",
        a: "Si eres particular, en los Juzgados de Primera Instancia de A Coruña; si eres autónomo o empresario, en los Juzgados de lo Mercantil, ambos en la Ciudad Judicial. Casi todo el trámite se hace de forma telemática.",
      },
      {
        q: "¿Atendéis municipios como Ferrol, Santiago o Arteixo?",
        a: "Sí. Atendemos toda la provincia de A Coruña de forma telemática: Ferrol, Santiago de Compostela, Arteixo, Oleiros, Culleredo, Cambre y cualquier otro municipio.",
      },
    ],
  },
  malaga: {
    juzgado:
      "los Juzgados de lo Mercantil y de Primera Instancia de Málaga, ubicados en la Ciudad de la Justicia",
    detalle:
      "La Ciudad de la Justicia de Málaga concentra prácticamente todos los juzgados civiles y mercantiles de la ciudad. El sector turístico y de temporada genera muchos expedientes de trabajadores con contratos discontinuos y autónomos de hostelería con deuda acumulada en meses flojos.",
    casos: [
      { slug: "hugo-malaga", label: "Hugo (Málaga): reunificó tres préstamos y respira" },
    ],
    faqs: [
      {
        q: "¿Dónde se tramita la Ley de Segunda Oportunidad en Málaga?",
        a: "En la Ciudad de la Justicia de Málaga: Juzgados de Primera Instancia para particulares y Juzgados de lo Mercantil para autónomos y empresarios. La mayor parte del procedimiento es telemática.",
      },
      {
        q: "¿Atendéis la Costa del Sol: Marbella, Fuengirola, Torremolinos, Vélez?",
        a: "Sí, toda la provincia de Málaga de forma telemática: Marbella, Mijas, Fuengirola, Benalmádena, Torremolinos, Estepona, Antequera, Vélez-Málaga y Ronda, entre otros.",
      },
    ],
  },
  zaragoza: {
    juzgado:
      "los Juzgados de lo Mercantil de Zaragoza, referencia concursal en Aragón, junto a los de Primera Instancia para particulares",
    detalle:
      "Zaragoza concentra la práctica totalidad de los concursos de Aragón. El perfil habitual combina hipoteca con préstamos al consumo y deuda de autónomos de la logística y el comercio, sectores con mucho peso en la provincia.",
    casos: [
      { slug: "daniel-zaragoza", label: "Daniel (Zaragoza): canceló su deuda con la LSO" },
      { slug: "lucia-d-zaragoza-42-150", label: "Lucía (Zaragoza): 42.150 € cancelados" },
      { slug: "nuria-d-zaragoza-28-700", label: "Nuria (Zaragoza): 28.700 € exonerados" },
    ],
    faqs: [
      {
        q: "¿Cuánto tarda la segunda oportunidad en Zaragoza?",
        a: "Depende de la carga del juzgado y de la complejidad del expediente; en general el procedimiento completo suele moverse entre 6 y 18 meses, y los embargos pueden suspenderse mucho antes de la exoneración.",
      },
      {
        q: "¿Atendéis el resto de Aragón: Huesca, Teruel, Calatayud?",
        a: "Sí. Aunque los juzgados mercantiles están en Zaragoza capital, atendemos telemáticamente a clientes de Huesca, Teruel, Calatayud, Utebo y cualquier municipio aragonés.",
      },
    ],
  },
  almeria: {
    juzgado:
      "los Juzgados de lo Mercantil y de Primera Instancia de Almería, en la Ciudad de la Justicia",
    detalle:
      "Almería tiene un perfil de deuda muy marcado por la agricultura intensiva y la hostelería: autónomos con campañas irregulares y familias con varios préstamos al consumo. Los juzgados almerienses tramitan los concursos con menos saturación que las grandes capitales.",
    casos: [
      { slug: "ivan-p-almeria-nomina-liberada", label: "Iván (Almería): nómina liberada del embargo" },
    ],
    faqs: [
      {
        q: "¿Dónde se tramita mi caso de segunda oportunidad en Almería?",
        a: "En la Ciudad de la Justicia de Almería: Juzgados de Primera Instancia si eres particular y de lo Mercantil si eres autónomo. Casi todo se gestiona de forma telemática.",
      },
      {
        q: "¿Atendéis El Ejido, Roquetas, Níjar y el Poniente?",
        a: "Sí, atendemos toda la provincia de Almería de forma telemática: El Ejido, Roquetas de Mar, Níjar, Adra, Huércal-Overa, Vícar y el resto de municipios.",
      },
    ],
  },
  tarragona: {
    juzgado:
      "los Juzgados de lo Mercantil y de Primera Instancia de Tarragona, competentes para toda la provincia",
    detalle:
      "En Tarragona conviven la deuda turística de la Costa Daurada (Salou, Cambrils) con la del cinturón industrial y petroquímico: autónomos estacionales y trabajadores con préstamos acumulados. Los juzgados tarraconenses tramitan los concursos de toda la provincia.",
    casos: [
      { slug: "marina-c-tarragona-35-210-cancelados", label: "Marina (Tarragona): 35.210 € cancelados" },
    ],
    faqs: [
      {
        q: "¿Dónde se presenta el concurso si vivo en Tarragona o Salou?",
        a: "Ante los juzgados de Tarragona capital: Primera Instancia para particulares y lo Mercantil para autónomos. Se tramita casi todo de forma telemática, sin que tengas que desplazarte salvo excepciones.",
      },
      {
        q: "¿Atendéis Reus, Valls, Tortosa y el resto de la provincia?",
        a: "Sí: Reus, Valls, Tortosa, Salou, Cambrils, Vendrell y cualquier municipio de la provincia de Tarragona, todo de forma telemática.",
      },
    ],
  },
  alicante: {
    juzgado:
      "los Juzgados de lo Mercantil y de Primera Instancia de Alicante, en la Ciudad de la Justicia",
    detalle:
      "Alicante es de las provincias con más expedientes de segunda oportunidad del Levante: turismo, construcción y comercio generan muchos casos de insolvencia de particulares y autónomos. La Ciudad de la Justicia concentra los juzgados civiles y mercantiles de la capital.",
    casos: [
      { slug: "sergio-alicante", label: "Sergio (Alicante): canceló su deuda y empezó de cero" },
      { slug: "pablo-r-alicante-8-500-recuperados", label: "Pablo (Alicante): 8.500 € recuperados por usura" },
    ],
    faqs: [
      {
        q: "¿Dónde se tramita la Ley de Segunda Oportunidad en Alicante?",
        a: "En la Ciudad de la Justicia de Alicante: Juzgados de Primera Instancia para particulares y de lo Mercantil para autónomos. El procedimiento es mayoritariamente telemático.",
      },
      {
        q: "¿Atendéis Elche, Torrevieja, Benidorm y la Vega Baja?",
        a: "Sí, toda la provincia: Elche, Torrevieja, Orihuela, Benidorm, Alcoy, San Vicente del Raspeig, Elda, Dénia y cualquier municipio alicantino, de forma telemática.",
      },
    ],
  },
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
    {
      q: `¿Tenéis casos reales resueltos en ${name}?`,
      a: <>{`Sí. ${ejemploCaso} Cada caso es distinto, pero la Ley de Segunda Oportunidad permite cancelar deudas de particulares y autónomos de ${provincia} que actúan de buena fe.`}</>,
      plain: `Sí. ${ejemploCaso} Cada caso es distinto, pero la Ley de Segunda Oportunidad permite cancelar deudas de particulares y autónomos de ${provincia} que actúan de buena fe.`,
    },
  ];

  const enrich = LOCAL_ENRICHMENT[city.slug];
  if (enrich) {
    sections.push({
      title: `Tu caso de segunda oportunidad en ${name}, paso a paso y con datos locales`,
      body: (
        <div className="space-y-4">
          <P>
            Si vives en {name} o en cualquier municipio de {provincia}, tu expediente se
            tramita ante {enrich.juzgado}. No tendrás que moverte de casa: la práctica
            totalidad del procedimiento (presentación, comparecencias y resolución) se
            gestiona de forma telemática.
          </P>
          <P>{enrich.detalle}</P>
          {enrich.casos.length > 0 && (
            <P>
              Casos reales de la zona:{" "}
              {enrich.casos.map((c, i) => (
                <span key={c.slug}>
                  {i > 0 && " · "}
                  <A to={`/casos-de-exito/${c.slug}`}>{c.label}</A>
                </span>
              ))}
              .
            </P>
          )}
        </div>
      ),
    });
    for (const f of enrich.faqs) {
      faq.push({ q: f.q, a: <>{f.a}</>, plain: f.a });
    }
  }

  return { intro, sections, faq };
};