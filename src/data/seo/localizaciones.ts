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
  /** coordenadas para el mapa */
  lat: number;
  lng: number;
  /** barrios de la ciudad y municipios de la provincia que se atienden */
  zonas: string[];
  /** sede judicial de referencia (dato público) donde se tramitan los expedientes */
  sedeJudicial: string;
  /** perfil de deuda más frecuente en la zona */
  perfilDeuda: string;
  /** prefijo telefónico provincial (referencia local) */
  prefijo: string;
  /** Audiencia Provincial de referencia (dato público) */
  audienciaProvincial: string;
  /** caso típico anonimizado propio del tejido económico local */
  ejemploCaso: string;
  /** path absoluto sin trailing slash para el Router */
  path: string;
};

const base = "/abogados-ley-segunda-oportunidad";

const cities: Omit<
  Localizacion,
  | "path"
  | "zonas"
  | "sedeJudicial"
  | "perfilDeuda"
  | "prefijo"
  | "audienciaProvincial"
  | "ejemploCaso"
>[] = [
  {
    slug: "madrid",
    name: "Madrid",
    rank: 1,
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Madrid",
    localNote:
      "Madrid concentra el mayor volumen de procedimientos de segunda oportunidad de España, con varios juzgados especializados que agilizan los expedientes bien preparados.",
    lat: 40.4168,
    lng: -3.7038,
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
    lat: 41.3874,
    lng: 2.1686,
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
    lat: 39.4699,
    lng: -0.3763,
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
    lat: 37.3891,
    lng: -5.9845,
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
    lat: 41.6488,
    lng: -0.8891,
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
    lat: 36.7213,
    lng: -4.4214,
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
    lat: 37.9922,
    lng: -1.1307,
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
    lat: 39.5696,
    lng: 2.6502,
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
    lat: 28.1235,
    lng: -15.4363,
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
    lat: 43.263,
    lng: -2.935,
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
    lat: 38.3452,
    lng: -0.481,
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
    lat: 37.8882,
    lng: -4.7794,
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
    lat: 41.6523,
    lng: -4.7245,
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
    lat: 42.2406,
    lng: -8.7207,
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
    lat: 43.5322,
    lng: -5.6611,
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
    lat: 41.3596,
    lng: 2.0998,
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
    lat: 42.8467,
    lng: -2.6716,
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
    lat: 43.3623,
    lng: -8.4115,
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
    lat: 37.1773,
    lng: -3.5986,
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
    lat: 38.2699,
    lng: -0.7126,
  },
  {
    slug: "oviedo",
    name: "Oviedo",
    rank: 21,
    provincia: "Asturias",
    comunidad: "Principado de Asturias",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Oviedo",
    localNote:
      "Oviedo es referencia judicial del centro de Asturias, donde llevamos casos de funcionarios, pensionistas y autónomos con deudas de consumo acumuladas.",
    lat: 43.3619,
    lng: -5.8494,
  },
  {
    slug: "santander",
    name: "Santander",
    rank: 22,
    provincia: "Cantabria",
    comunidad: "Cantabria",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Santander",
    localNote:
      "En Santander damos servicio a toda Cantabria, con casos frecuentes de autónomos del comercio y los servicios y familias con préstamos en varias entidades.",
    lat: 43.4623,
    lng: -3.8099,
  },
  {
    slug: "pamplona",
    name: "Pamplona",
    rank: 23,
    provincia: "Navarra",
    comunidad: "Comunidad Foral de Navarra",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Pamplona",
    localNote:
      "En Pamplona llevamos expedientes de toda Navarra, coordinando el proceso de segunda oportunidad con las particularidades del derecho foral navarro cuando aplica.",
    lat: 42.8125,
    lng: -1.6458,
  },
  {
    slug: "donostia",
    name: "Donostia-San Sebastián",
    rank: 24,
    provincia: "Gipuzkoa",
    comunidad: "País Vasco",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Donostia-San Sebastián",
    localNote:
      "En Donostia atendemos a particulares y autónomos de toda Gipuzkoa, con casos habituales en el comercio, la hostelería y el sector servicios.",
    lat: 43.3183,
    lng: -1.9812,
  },
  {
    slug: "burgos",
    name: "Burgos",
    rank: 25,
    provincia: "Burgos",
    comunidad: "Castilla y León",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Burgos",
    localNote:
      "Burgos es referencia judicial del norte de Castilla y León, donde llevamos casos de particulares y pequeños autónomos del comercio y la industria.",
    lat: 42.3439,
    lng: -3.6969,
  },
  {
    slug: "almeria",
    name: "Almería",
    rank: 26,
    provincia: "Almería",
    comunidad: "Andalucía",
    tribunal: "Juzgados de lo Mercantil y de Primera Instancia de Almería",
    localNote:
      "En Almería damos servicio a toda la provincia, con casos frecuentes de autónomos de la agricultura intensiva, el comercio y la hostelería.",
    lat: 36.834,
    lng: -2.4637,
  },
];

/**
 * Datos locales adicionales por ciudad (públicos y verificables): zonas
 * atendidas, sede judicial de referencia, perfil de deuda y prefijo. Sirven
 * para que cada landing desprenda relevancia local real (service-area
 * business) sin afirmar oficina física, que no existe (atención en remoto).
 */
const localExtra: Record<
  string,
  Pick<Localizacion, "zonas" | "sedeJudicial" | "perfilDeuda" | "prefijo">
> = {
  madrid: {
    zonas: ["Centro", "Vallecas", "Carabanchel", "Tetuán", "Móstoles", "Alcalá de Henares", "Getafe", "Leganés", "Fuenlabrada"],
    sedeJudicial: "los Juzgados de lo Mercantil de Madrid (entorno de la calle Gran Vía) y los Juzgados de Primera Instancia de la capital",
    perfilDeuda: "En Madrid predominan los casos de deudas por tarjetas revolving, préstamos al consumo y avales de pequeños negocios.",
    prefijo: "91",
  },
  barcelona: {
    zonas: ["Eixample", "Sants", "Nou Barris", "Sant Andreu", "Badalona", "Sabadell", "Terrassa", "Mataró"],
    sedeJudicial: "la Ciutat de la Justícia de Barcelona, en la Gran Via de les Corts Catalanes, 111",
    perfilDeuda: "En Barcelona son frecuentes las deudas de autónomos del comercio y los servicios, junto a préstamos personales acumulados.",
    prefijo: "93",
  },
  valencia: {
    zonas: ["Ciutat Vella", "Quatre Carreres", "Campanar", "Benimaclet", "Torrent", "Paterna", "Gandía", "Sagunto"],
    sedeJudicial: "la Ciudad de la Justicia de Valencia, en la avenida del Saler, 14",
    perfilDeuda: "En Valencia abundan los casos de autónomos de la hostelería y el comercio, además de microcréditos y tarjetas revolving.",
    prefijo: "96",
  },
  sevilla: {
    zonas: ["Triana", "Macarena", "Nervión", "Sevilla Este", "Dos Hermanas", "Alcalá de Guadaíra", "Utrera", "Écija"],
    sedeJudicial: "los Juzgados de Sevilla, en el entorno del Prado de San Sebastián y la Buhaira",
    perfilDeuda: "En Sevilla pesan las deudas de autónomos con Hacienda y Seguridad Social y los préstamos al consumo de familias.",
    prefijo: "954",
  },
  zaragoza: {
    zonas: ["Delicias", "El Rabal", "Casablanca", "Actur", "Calatayud", "Utebo", "Ejea de los Caballeros"],
    sedeJudicial: "los Juzgados de Zaragoza, en el entorno de la plaza del Pilar y el Coso",
    perfilDeuda: "En Zaragoza predominan los microcréditos, las tarjetas revolving y los préstamos familiares acumulados.",
    prefijo: "976",
  },
  malaga: {
    zonas: ["Centro", "Carretera de Cádiz", "Teatinos", "Marbella", "Vélez-Málaga", "Fuengirola", "Mijas", "Torremolinos"],
    sedeJudicial: "la Ciudad de la Justicia de Málaga, en la calle Fiscal Luis Portero",
    perfilDeuda: "En Málaga son habituales las deudas de autónomos del turismo y la hostelería, con fuerte estacionalidad.",
    prefijo: "952",
  },
  murcia: {
    zonas: ["Centro", "El Carmen", "Cabezo de Torres", "Cartagena", "Lorca", "Molina de Segura", "Alcantarilla"],
    sedeJudicial: "la Ciudad de la Justicia de Murcia, en la avenida de la Justicia (Infante Juan Manuel)",
    perfilDeuda: "En Murcia abundan las deudas de autónomos de la agricultura, el comercio y los proveedores.",
    prefijo: "968",
  },
  palma: {
    zonas: ["Centro", "Pere Garau", "Son Gotleu", "Inca", "Manacor", "Calvià", "Menorca", "Ibiza"],
    sedeJudicial: "los Juzgados de Palma, en el entorno de la avenida Alemania y el Parc de la Mar",
    perfilDeuda: "En Palma pesan las deudas vinculadas a la estacionalidad del empleo turístico y los préstamos personales.",
    prefijo: "971",
  },
  "las-palmas-de-gran-canaria": {
    zonas: ["Vegueta", "Triana", "Schamann", "Telde", "Santa Lucía", "Lanzarote", "Fuerteventura"],
    sedeJudicial: "la Ciudad de la Justicia de Las Palmas de Gran Canaria",
    perfilDeuda: "En Las Palmas predominan las deudas de consumo y de pequeños autónomos del sector servicios.",
    prefijo: "928",
  },
  bilbao: {
    zonas: ["Casco Viejo", "Deusto", "Indautxu", "Barakaldo", "Getxo", "Santurtzi", "Basauri"],
    sedeJudicial: "el Palacio de Justicia de Bilbao y los juzgados del entorno de Barroeta Aldamar",
    perfilDeuda: "En Bilbao son frecuentes las deudas de particulares y autónomos tras el cierre de pequeños negocios.",
    prefijo: "94",
  },
  alicante: {
    zonas: ["Centro", "San Blas", "Carolinas", "Torrevieja", "Benidorm", "Orihuela", "Elda"],
    sedeJudicial: "la Ciudad de la Justicia de Alicante, en el barrio de Benalúa",
    perfilDeuda: "En Alicante abundan las deudas de autónomos del comercio y la construcción y los préstamos en varias entidades.",
    prefijo: "965",
  },
  cordoba: {
    zonas: ["Centro", "Levante", "Poniente", "Lucena", "Puente Genil", "Montilla", "Priego de Córdoba"],
    sedeJudicial: "la Ciudad de la Justicia de Córdoba",
    perfilDeuda: "En Córdoba predominan las deudas de consumo, microcréditos y préstamos personales de familias.",
    prefijo: "957",
  },
  valladolid: {
    zonas: ["Centro", "Delicias", "Parquesol", "Medina del Campo", "Laguna de Duero", "Tudela de Duero"],
    sedeJudicial: "el Palacio de Justicia de Valladolid, en el entorno de la calle Angustias",
    perfilDeuda: "En Valladolid son habituales las deudas de particulares y pequeños autónomos del comercio.",
    prefijo: "983",
  },
  vigo: {
    zonas: ["Casco Vello", "Teis", "Coia", "Pontevedra", "Redondela", "Cangas", "O Porriño"],
    sedeJudicial: "los Juzgados de Vigo, en el entorno de García Barbón y la rúa Lalín",
    perfilDeuda: "En Vigo pesan las deudas de autónomos del mar, la industria auxiliar y el comercio.",
    prefijo: "986",
  },
  gijon: {
    zonas: ["Centro", "El Llano", "La Calzada", "Oviedo", "Avilés", "Siero", "Langreo"],
    sedeJudicial: "el Palacio de Justicia de Gijón, en la calle Decano Prendes Pando",
    perfilDeuda: "En Gijón abundan las deudas derivadas del cierre de pequeños negocios y los préstamos al consumo.",
    prefijo: "985",
  },
  lhospitalet: {
    zonas: ["Centre", "Collblanc", "Bellvitge", "Cornellà", "El Prat", "Esplugues", "Sant Boi"],
    sedeJudicial: "la Ciutat de la Justícia (compartida con Barcelona), en la Gran Via de les Corts Catalanes, 111",
    perfilDeuda: "En L'Hospitalet predominan las deudas de consumo y de autónomos del área metropolitana de Barcelona.",
    prefijo: "93",
  },
  "vitoria-gasteiz": {
    zonas: ["Centro", "Lakua", "Salburua", "Zaramaga", "Llodio", "Amurrio"],
    sedeJudicial: "el Palacio de Justicia de Vitoria-Gasteiz, en el entorno de la avenida Gasteiz",
    perfilDeuda: "En Vitoria-Gasteiz son frecuentes las deudas de particulares y de autónomos del sector industrial.",
    prefijo: "945",
  },
  "a-coruna": {
    zonas: ["Centro", "Os Mallos", "Monte Alto", "Ferrol", "Santiago de Compostela", "Carballo", "Betanzos"],
    sedeJudicial: "el Palacio de Justicia de A Coruña, en el entorno de la calle Monforte",
    perfilDeuda: "En A Coruña abundan las deudas de autónomos del comercio, la hostelería y los servicios.",
    prefijo: "981",
  },
  granada: {
    zonas: ["Centro", "Albaicín", "Zaidín", "Motril", "Armilla", "Maracena", "Loja"],
    sedeJudicial: "los Juzgados de Granada, en el entorno de La Caleta y Plaza Nueva",
    perfilDeuda: "En Granada pesan las deudas de consumo de familias y de autónomos del turismo y la universidad.",
    prefijo: "958",
  },
  elche: {
    zonas: ["Centro", "Carrús", "Altabix", "Crevillent", "Santa Pola", "Aspe", "Novelda"],
    sedeJudicial: "los Juzgados de Elche, con los asuntos mercantiles en la Ciudad de la Justicia de Alicante",
    perfilDeuda: "En Elche predominan las deudas de autónomos del calzado y la industria, y de familias con varias deudas.",
    prefijo: "966",
  },
};

/**
 * Datos para el contenido único por ciudad: Audiencia Provincial de
 * referencia (criterio judicial) y un caso típico anonimizado del tejido
 * económico local. Sirven para que cada landing tenga material propio que
 * no encaja en ninguna otra ciudad (anti contenido duplicado).
 */
const localCases: Record<
  string,
  Pick<Localizacion, "audienciaProvincial" | "ejemploCaso">
> = {
  madrid: {
    audienciaProvincial: "la Audiencia Provincial de Madrid",
    ejemploCaso: "Un caso habitual en Madrid: un trabajador que encadenó varias tarjetas revolving y préstamos rápidos para llegar a fin de mes y acaba con cuotas que superan su sueldo.",
  },
  barcelona: {
    audienciaProvincial: "la Audiencia Provincial de Barcelona",
    ejemploCaso: "Un caso habitual en Barcelona: un autónomo del comercio o la restauración que, tras bajar las ventas, arrastra deudas con proveedores y con la Seguridad Social.",
  },
  valencia: {
    audienciaProvincial: "la Audiencia Provincial de Valencia",
    ejemploCaso: "Un caso habitual en Valencia: un autónomo de la hostelería que cerró el local y quedó con préstamos del negocio y microcréditos personales sin poder asumirlos.",
  },
  sevilla: {
    audienciaProvincial: "la Audiencia Provincial de Sevilla",
    ejemploCaso: "Un caso habitual en Sevilla: un autónomo que acumuló deuda con Hacienda y la Seguridad Social y, además, préstamos al consumo de la familia.",
  },
  zaragoza: {
    audienciaProvincial: "la Audiencia Provincial de Zaragoza",
    ejemploCaso: "Un caso habitual en Zaragoza: una familia que fue sumando microcréditos y tarjetas revolving para cubrir gastos imprevistos hasta perder el control de las cuotas.",
  },
  malaga: {
    audienciaProvincial: "la Audiencia Provincial de Málaga",
    ejemploCaso: "Un caso habitual en Málaga: un autónomo del turismo o la hostelería con ingresos muy estacionales que, en temporada baja, no puede atender los préstamos del negocio.",
  },
  murcia: {
    audienciaProvincial: "la Audiencia Provincial de Murcia",
    ejemploCaso: "Un caso habitual en Murcia: un pequeño autónomo del campo o el comercio que quedó con deudas a proveedores y préstamos tras una mala campaña.",
  },
  palma: {
    audienciaProvincial: "la Audiencia Provincial de Baleares",
    ejemploCaso: "Un caso habitual en Palma: un trabajador con contrato de temporada que, al terminar el verano, no puede mantener las cuotas de los préstamos pedidos durante el año.",
  },
  "las-palmas-de-gran-canaria": {
    audienciaProvincial: "la Audiencia Provincial de Las Palmas",
    ejemploCaso: "Un caso habitual en Las Palmas: una familia con deudas de consumo y un pequeño autónomo del sector servicios que vio caer su facturación.",
  },
  bilbao: {
    audienciaProvincial: "la Audiencia Provincial de Bizkaia",
    ejemploCaso: "Un caso habitual en Bilbao: un autónomo que cerró su negocio y quedó con avales y préstamos personales que no puede asumir con su nuevo empleo.",
  },
  alicante: {
    audienciaProvincial: "la Audiencia Provincial de Alicante",
    ejemploCaso: "Un caso habitual en Alicante: un autónomo del comercio o la construcción con préstamos en varias entidades a la vez y cuotas que se solapan.",
  },
  cordoba: {
    audienciaProvincial: "la Audiencia Provincial de Córdoba",
    ejemploCaso: "Un caso habitual en Córdoba: una familia que acumuló microcréditos y préstamos personales para imprevistos y ya no puede pagar todas las cuotas.",
  },
  valladolid: {
    audienciaProvincial: "la Audiencia Provincial de Valladolid",
    ejemploCaso: "Un caso habitual en Valladolid: un pequeño autónomo del comercio que, tras bajar las ventas, arrastra deudas con proveedores y préstamos del negocio.",
  },
  vigo: {
    audienciaProvincial: "la Audiencia Provincial de Pontevedra",
    ejemploCaso: "Un caso habitual en Vigo: un autónomo del mar o de la industria auxiliar que, tras un parón de actividad, quedó con deudas y préstamos sin poder atenderlos.",
  },
  gijon: {
    audienciaProvincial: "la Audiencia Provincial de Asturias",
    ejemploCaso: "Un caso habitual en Gijón: un autónomo que cerró su pequeño negocio y quedó con préstamos y deudas con proveedores difíciles de asumir.",
  },
  lhospitalet: {
    audienciaProvincial: "la Audiencia Provincial de Barcelona",
    ejemploCaso: "Un caso habitual en L'Hospitalet: una familia del área metropolitana con varias deudas de consumo y tarjetas que ya no puede atender.",
  },
  "vitoria-gasteiz": {
    audienciaProvincial: "la Audiencia Provincial de Álava",
    ejemploCaso: "Un caso habitual en Vitoria-Gasteiz: un trabajador del sector industrial que, tras un ERE o un cambio de empleo, no puede mantener los préstamos pedidos.",
  },
  "a-coruna": {
    audienciaProvincial: "la Audiencia Provincial de A Coruña",
    ejemploCaso: "Un caso habitual en A Coruña: un autónomo del comercio o la hostelería que arrastra deudas tras una caída de ingresos.",
  },
  granada: {
    audienciaProvincial: "la Audiencia Provincial de Granada",
    ejemploCaso: "Un caso habitual en Granada: una familia con deudas de consumo y un autónomo del turismo que vio caer su actividad fuera de temporada.",
  },
  elche: {
    audienciaProvincial: "la Audiencia Provincial de Alicante",
    ejemploCaso: "Un caso habitual en Elche: un autónomo del calzado o la industria local que quedó con deudas tras una mala temporada y préstamos del negocio.",
  },
};

export const localizaciones: Localizacion[] = cities.map((c) => ({
  ...c,
  ...localExtra[c.slug],
  ...localCases[c.slug],
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