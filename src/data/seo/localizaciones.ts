/**
 * Cluster local de "Abogados de la Ley de Segunda Oportunidad" por ciudad.
 * 20 ciudades más grandes de España. Cada ciudad genera una landing local
 * /abogados-ley-segunda-oportunidad/<ciudad> con la plantilla LocalizacionPage.
 *
 * El hub maestro local es la money page /abogados-ley-segunda-oportunidad,
 * a la que enlazan todas las ciudades para no canibalizar.
 */

export type Localizacion = {
  /** slug de la ciudad (sin cluster) */
  slug: string;
  /** nombre de la ciudad */
  name: string;
  /** ranking poblacional aproximado (1 = más grande) */
  rank: number;
  /** provincia */
  provincia: string;
  /** comunidad autónoma */
  comunidad: string;
  /** tribunal competente de referencia en la ciudad */
  tribunal: string;
  /** nota local única para evitar contenido duplicado */
  localNote: string;
  /** path absoluto sin trailing slash para el Router */
  path: string;
};

const base = "/abogados-ley-segunda-oportunidad";

const cities: Omit<Localizacion, "path">[] = [
  {
    slug: "madrid",
    name: "Madrid",
    rank: 1,
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Madrid",
    localNote:
      "Madrid concentra el mayor volumen de procedimientos de segunda oportunidad de España, con varios juzgados especializados que agilizan los expedientes bien preparados.",
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    rank: 2,
    provincia: "Barcelona",
    comunidad: "Cataluña",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Barcelona",
    localNote:
      "Los juzgados de Barcelona acumulan una amplia jurisprudencia favorable a la exoneración del pasivo, lo que ayuda a anticipar el criterio del juez en tu caso.",
  },
  {
    slug: "valencia",
    name: "Valencia",
    rank: 3,
    provincia: "Valencia",
    comunidad: "Comunidad Valenciana",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Valencia",
    localNote:
      "En Valencia atendemos tanto a particulares como a autónomos del comercio y la hostelería, sectores con fuerte peso en la economía local.",
  },
  {
    slug: "sevilla",
    name: "Sevilla",
    rank: 4,
    provincia: "Sevilla",
    comunidad: "Andalucía",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Sevilla",
    localNote:
      "Sevilla reúne muchos casos de autónomos con deuda acumulada de Hacienda y Seguridad Social, que la reforma concursal permite exonerar con límites.",
  },
  {
    slug: "zaragoza",
    name: "Zaragoza",
    rank: 5,
    provincia: "Zaragoza",
    comunidad: "Aragón",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Zaragoza",
    localNote:
      "En Zaragoza llevamos expedientes de toda la provincia, con especial atención a familias que arrastran microcréditos y tarjetas revolving.",
  },
  {
    slug: "malaga",
    name: "Málaga",
    rank: 6,
    provincia: "Málaga",
    comunidad: "Andalucía",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Málaga",
    localNote:
      "Málaga, con su fuerte sector servicios y turístico, concentra muchos casos de autónomos y temporeros que pueden acogerse a la Ley de Segunda Oportunidad.",
  },
  {
    slug: "murcia",
    name: "Murcia",
    rank: 7,
    provincia: "Murcia",
    comunidad: "Región de Murcia",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Murcia",
    localNote:
      "En Murcia trabajamos casos de toda la Región, frecuentes en agricultura, comercio y pequeños autónomos con deudas con proveedores.",
  },
  {
    slug: "palma",
    name: "Palma de Mallorca",
    rank: 8,
    provincia: "Islas Baleares",
    comunidad: "Islas Baleares",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Palma",
    localNote:
      "En Palma atendemos a residentes de todas las islas, con muchos casos vinculados a la estacionalidad del empleo turístico.",
  },
  {
    slug: "las-palmas-de-gran-canaria",
    name: "Las Palmas de Gran Canaria",
    rank: 9,
    provincia: "Las Palmas",
    comunidad: "Canarias",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Las Palmas",
    localNote:
      "Damos servicio a toda la provincia de Las Palmas, con un proceso que puede llevarse en gran parte de forma telemática, sin desplazamientos innecesarios.",
  },
  {
    slug: "bilbao",
    name: "Bilbao",
    rank: 10,
    provincia: "Bizkaia",
    comunidad: "País Vasco",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Bilbao",
    localNote:
      "En Bilbao y toda Bizkaia llevamos expedientes de particulares y autónomos, coordinándonos con las particularidades del foralismo vasco cuando aplica.",
  },
  {
    slug: "alicante",
    name: "Alicante",
    rank: 11,
    provincia: "Alicante",
    comunidad: "Comunidad Valenciana",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Alicante",
    localNote:
      "Alicante reúne muchos casos de autónomos del comercio y la construcción, además de residentes con deudas en varias entidades a la vez.",
  },
  {
    slug: "cordoba",
    name: "Córdoba",
    rank: 12,
    provincia: "Córdoba",
    comunidad: "Andalucía",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Córdoba",
    localNote:
      "En Córdoba atendemos a familias de toda la provincia que buscan cancelar deudas de consumo, microcréditos y préstamos personales.",
  },
  {
    slug: "valladolid",
    name: "Valladolid",
    rank: 13,
    provincia: "Valladolid",
    comunidad: "Castilla y León",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Valladolid",
    localNote:
      "Valladolid es referencia judicial de buena parte de Castilla y León, donde llevamos casos de particulares y pequeños autónomos.",
  },
  {
    slug: "vigo",
    name: "Vigo",
    rank: 14,
    provincia: "Pontevedra",
    comunidad: "Galicia",
    tribunal: "Juzgados de lo Mercantil de Pontevedra (sede Vigo) y de Primera Instancia de Vigo",
    localNote:
      "En Vigo trabajamos casos del sur de Galicia, frecuentes en autónomos del mar, la industria auxiliar y el comercio.",
  },
  {
    slug: "gijon",
    name: "Gijón",
    rank: 15,
    provincia: "Asturias",
    comunidad: "Principado de Asturias",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Gijón",
    localNote:
      "En Gijón y toda Asturias atendemos a particulares y autónomos, con muchos casos derivados de cierres de pequeños negocios.",
  },
  {
    slug: "lhospitalet",
    name: "L'Hospitalet de Llobregat",
    rank: 16,
    provincia: "Barcelona",
    comunidad: "Cataluña",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Barcelona",
    localNote:
      "L'Hospitalet, integrada en el área metropolitana de Barcelona, comparte la jurisprudencia favorable de sus juzgados en materia de exoneración.",
  },
  {
    slug: "vitoria-gasteiz",
    name: "Vitoria-Gasteiz",
    rank: 17,
    provincia: "Álava",
    comunidad: "País Vasco",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Vitoria-Gasteiz",
    localNote:
      "En Vitoria-Gasteiz llevamos expedientes de toda Álava, coordinando el proceso de segunda oportunidad con las particularidades forales cuando proceden.",
  },
  {
    slug: "a-coruna",
    name: "A Coruña",
    rank: 18,
    provincia: "A Coruña",
    comunidad: "Galicia",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de A Coruña",
    localNote:
      "En A Coruña damos servicio al norte de Galicia, con casos habituales de autónomos del comercio, la hostelería y el sector servicios.",
  },
  {
    slug: "granada",
    name: "Granada",
    rank: 19,
    provincia: "Granada",
    comunidad: "Andalucía",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Granada",
    localNote:
      "Granada reúne muchos casos de familias con deudas de consumo y autónomos vinculados al turismo y la universidad.",
  },
  {
    slug: "elche",
    name: "Elche",
    rank: 20,
    provincia: "Alicante",
    comunidad: "Comunidad Valenciana",
    tribunal: "Juzgados de lo Mercantil de Alicante y de Primera Instancia de Elche",
    localNote:
      "En Elche atendemos a muchos autónomos del calzado y la industria local, además de familias con varias deudas acumuladas.",
  },
];

export const localizaciones: Localizacion[] = cities.map((c) => ({
  ...c,
  path: `${base}/${c.slug}`,
}));

export const localizacionesByPath: Record<string, Localizacion> =
  localizaciones.reduce(
    (acc, l) => {
      acc[l.path] = l;
      return acc;
    },
    {} as Record<string, Localizacion>,
  );

export const getLocalizacion = (slug?: string): Localizacion | undefined =>
  slug ? localizaciones.find((l) => l.slug === slug) : undefined;