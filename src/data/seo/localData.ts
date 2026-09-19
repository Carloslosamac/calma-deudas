/**
 * Local SEO v2 — dataset único de información local por ciudad.
 *
 * Aquí viven TODOS los datos locales que enriquecen las landings
 * /abogados-ley-segunda-oportunidad/<ciudad>: aliases geográficos,
 * municipios del área de influencia, recursos públicos y FAQs locales.
 *
 * Reglas:
 * - Una sola URL por ubicación: los aliases (La Coruña, San Sebastián,
 *   Gerona…) se absorben aquí, NUNCA con landings nuevas.
 * - Solo datos verificables. Si un dato no existe, se omite el campo y la
 *   página no muestra esa parte. Nada de estadísticas, plazos, costes ni
 *   datos administrativos inventados.
 * - Añadir una ciudad nueva = añadir una entrada aquí. Ningún componente
 *   necesita cambios.
 */

export type LocalResource = {
  /** nombre del recurso público (sin teléfonos ni direcciones inventadas) */
  name: string;
  /** para qué sirve, en lenguaje de calle */
  what: string;
};

export type LocalFaqData = { q: string; a: string };

export type LocalStat = {
  label: string;
  value: string;
  /** fuente pública obligatoria: sin fuente, no se publica */
  source: string;
};

export type LocalCityData = {
  /** variantes de nombre de la ciudad que deben absorberse en esta URL */
  geoAliases?: string[];
  /** variantes del nombre de la provincia (Gipuzkoa/Guipúzcoa…) */
  provinceAliases?: string[];
  /** variantes del nombre de la comunidad autónoma (Euskadi/País Vasco…) */
  communityAliases?: string[];
  /** municipios reales del área de influencia (no generan URL propia) */
  nearbyMunicipalities?: string[];
  /** matiz real sobre el juzgado o la sede competente */
  courtInfo?: string;
  /** particularidad real del tejido económico o del perfil de deuda local */
  economyNote?: string;
  /** casos de éxito publicados de la zona (slug en /casos-de-exito) */
  caseLinks?: { slug: string; label: string }[];
  /** recursos públicos de la zona */
  localResources?: LocalResource[];
  /** FAQs propias de la ubicación */
  localFaqs?: LocalFaqData[];
  /** estadísticas locales verificables (con fuente). Vacío por defecto. */
  localStats?: LocalStat[];
};

/**
 * Familias de intención local que cada landing debe cubrir de forma natural.
 * Se generan a partir del nombre de la ciudad y sus aliases: no se listan
 * literalmente en la página (sería keyword stuffing), se usan para redactar
 * y para el marcado de la página.
 */
export const localIntentVariants = (city: string): string[] => [
  `ley segunda oportunidad ${city}`,
  `abogado ley segunda oportunidad ${city}`,
  `abogados ley segunda oportunidad ${city}`,
  `segunda oportunidad ${city}`,
  `cancelar deudas ${city}`,
  `cancelación de deudas ${city}`,
  `abogado deudas ${city}`,
  `abogados deudas ${city}`,
  `abogado insolvencia ${city}`,
  `abogados insolvencia ${city}`,
];

export const LOCAL_CITY_DATA: Record<string, LocalCityData> = {
  madrid: {
    communityAliases: ["Comunidad de Madrid"],
    nearbyMunicipalities: [
      "Móstoles", "Alcalá de Henares", "Getafe", "Leganés", "Fuenlabrada",
      "Alcorcón", "Torrejón de Ardoz", "Parla", "Alcobendas", "Las Rozas",
    ],
  },
  barcelona: {
    provinceAliases: ["provincia de Barcelona"],
    communityAliases: ["Cataluña", "Catalunya"],
    nearbyMunicipalities: [
      "L'Hospitalet de Llobregat", "Badalona", "Terrassa", "Sabadell",
      "Mataró", "Santa Coloma de Gramenet", "Cornellà de Llobregat",
      "Sant Cugat del Vallès", "Granollers", "Vilanova i la Geltrú",
    ],
  },
  valencia: {
    geoAliases: ["València"],
    communityAliases: ["Comunidad Valenciana", "Comunitat Valenciana"],
    nearbyMunicipalities: [
      "Torrent", "Paterna", "Mislata", "Burjassot", "Alboraya", "Sagunto",
      "Quart de Poblet", "Manises", "Xirivella", "Gandía",
    ],
  },
  sevilla: {
    nearbyMunicipalities: [
      "Dos Hermanas", "Alcalá de Guadaíra", "Utrera", "Mairena del Aljarafe",
      "Écija", "Tomares", "Camas", "Bormujos", "Los Palacios y Villafranca",
    ],
  },
  zaragoza: {
    nearbyMunicipalities: [
      "Utebo", "Cuarte de Huerva", "La Muela", "Calatayud", "Ejea de los Caballeros",
      "Tarazona", "Zuera", "Alagón",
    ],
    courtInfo:
      "los Juzgados de lo Mercantil de Zaragoza, referencia concursal en Aragón",
    economyNote:
      "Zaragoza concentra la mayor parte de los concursos de Aragón. El perfil habitual combina hipoteca con préstamos al consumo y deuda de autónomos de la logística y el comercio, sectores con mucho peso en la provincia.",
    caseLinks: [
      { slug: "daniel-zaragoza", label: "Daniel (Zaragoza): canceló su deuda con la LSO" },
      { slug: "lucia-d-zaragoza-42-150", label: "Lucía (Zaragoza): 42.150 € cancelados" },
      { slug: "nuria-d-zaragoza-28-700", label: "Nuria (Zaragoza): 28.700 € exonerados" },
    ],
    localFaqs: [
      {
        q: "¿Cuánto tarda la segunda oportunidad en Zaragoza?",
        a: "Depende de la carga del juzgado y de la complejidad del expediente; en general el procedimiento completo suele moverse entre 6 y 18 meses, y los embargos pueden suspenderse mucho antes de la exoneración.",
      },
      {
        q: "¿Atendéis el resto de Aragón: Huesca, Teruel, Calatayud?",
        a: "Sí. Aunque los juzgados de lo mercantil están en Zaragoza capital, atendemos telemáticamente a clientes de Huesca, Teruel, Calatayud, Utebo y cualquier municipio aragonés.",
      },
    ],
  },
  malaga: {
    geoAliases: ["Malaga"],
    nearbyMunicipalities: [
      "Marbella", "Vélez-Málaga", "Mijas", "Fuengirola", "Torremolinos",
      "Benalmádena", "Estepona", "Rincón de la Victoria", "Antequera", "Ronda",
    ],
    courtInfo:
      "los Juzgados de lo Mercantil de Málaga, ubicados en la Ciudad de la Justicia",
    economyNote:
      "El sector turístico y de temporada genera en Málaga muchos expedientes de trabajadores con contratos discontinuos y de autónomos de hostelería con deuda acumulada en los meses flojos.",
    caseLinks: [
      { slug: "hugo-malaga", label: "Hugo (Málaga): reunificó tres préstamos y respira" },
    ],
    localFaqs: [
      {
        q: "¿Dónde se tramita la Ley de Segunda Oportunidad en Málaga?",
        a: "En los Juzgados de lo Mercantil de Málaga, en la Ciudad de la Justicia. La mayor parte del procedimiento es telemática.",
      },
      {
        q: "¿Atendéis la Costa del Sol: Marbella, Fuengirola, Torremolinos, Vélez?",
        a: "Sí, toda la provincia de Málaga de forma telemática: Marbella, Mijas, Fuengirola, Benalmádena, Torremolinos, Estepona, Antequera, Vélez-Málaga y Ronda, entre otros.",
      },
    ],
  },
  murcia: {
    provinceAliases: ["Región de Murcia"],
    communityAliases: ["Región de Murcia"],
    nearbyMunicipalities: [
      "Cartagena", "Lorca", "Molina de Segura", "Alcantarilla", "Yecla",
      "Águilas", "San Javier", "Cieza", "Torre Pacheco",
    ],
  },
  palma: {
    geoAliases: ["Palma de Mallorca"],
    provinceAliases: ["Illes Balears", "Islas Baleares", "Baleares"],
    communityAliases: ["Islas Baleares", "Illes Balears"],
    nearbyMunicipalities: [
      "Calvià", "Marratxí", "Llucmajor", "Inca", "Manacor", "Alcúdia",
      "Sóller", "Santanyí",
    ],
  },
  "las-palmas-de-gran-canaria": {
    geoAliases: ["Las Palmas", "Las Palmas de Gran Canaria", "Gran Canaria"],
    provinceAliases: ["provincia de Las Palmas"],
    communityAliases: ["Canarias", "Islas Canarias"],
    nearbyMunicipalities: [
      "Telde", "Santa Lucía de Tirajana", "San Bartolomé de Tirajana",
      "Arucas", "Ingenio", "Agüimes", "Gáldar", "Mogán",
    ],
  },
  bilbao: {
    geoAliases: ["Bilbo"],
    provinceAliases: ["Bizkaia", "Vizcaya"],
    communityAliases: ["País Vasco", "Euskadi"],
    nearbyMunicipalities: [
      "Barakaldo", "Getxo", "Portugalete", "Santurtzi", "Basauri",
      "Leioa", "Sestao", "Durango", "Erandio", "Galdakao",
    ],
  },
  alicante: {
    geoAliases: ["Alacant"],
    provinceAliases: ["provincia de Alicante", "Alacant"],
    communityAliases: ["Comunidad Valenciana", "Comunitat Valenciana"],
    nearbyMunicipalities: [
      "San Vicente del Raspeig", "Sant Joan d'Alacant", "El Campello",
      "Elda", "Petrer", "Villena", "Benidorm", "Torrevieja", "Orihuela",
    ],
  },
  cordoba: {
    geoAliases: ["Córdoba"],
    nearbyMunicipalities: [
      "Lucena", "Puente Genil", "Montilla", "Priego de Córdoba", "Cabra",
      "Palma del Río", "Baena", "Pozoblanco",
    ],
  },
  valladolid: {
    communityAliases: ["Castilla y León"],
    nearbyMunicipalities: [
      "Laguna de Duero", "Medina del Campo", "Arroyo de la Encomienda",
      "Tudela de Duero", "Zaratán", "Íscar", "Boecillo",
    ],
  },
  vigo: {
    provinceAliases: ["Pontevedra", "provincia de Pontevedra"],
    communityAliases: ["Galicia"],
    nearbyMunicipalities: [
      "Pontevedra", "Redondela", "Cangas", "Nigrán", "Gondomar", "Moaña",
      "Porriño", "Tui", "Ponteareas", "Mos",
    ],
  },
  gijon: {
    geoAliases: ["Gijón", "Xixón"],
    provinceAliases: ["Asturias", "Principado de Asturias"],
    communityAliases: ["Asturias", "Principado de Asturias"],
    nearbyMunicipalities: [
      "Oviedo", "Avilés", "Siero", "Villaviciosa", "Langreo", "Mieres",
      "Corvera", "Carreño",
    ],
  },
  lhospitalet: {
    geoAliases: ["L'Hospitalet de Llobregat", "Hospitalet de Llobregat", "Hospitalet"],
    communityAliases: ["Cataluña", "Catalunya"],
    nearbyMunicipalities: [
      "Cornellà de Llobregat", "Esplugues de Llobregat", "Sant Joan Despí",
      "El Prat de Llobregat", "Sant Boi de Llobregat", "Sant Just Desvern",
      "Viladecans", "Gavà",
    ],
  },
  "vitoria-gasteiz": {
    geoAliases: ["Vitoria", "Gasteiz", "Vitoria-Gasteiz"],
    provinceAliases: ["Álava", "Araba"],
    communityAliases: ["País Vasco", "Euskadi"],
    nearbyMunicipalities: [
      "Llodio", "Amurrio", "Salvatierra", "Alegría-Dulantzi", "Iruña de Oca",
      "Zuia", "Agurain",
    ],
  },
  "a-coruna": {
    geoAliases: ["A Coruña", "La Coruña", "Coruña"],
    provinceAliases: ["provincia de A Coruña", "provincia de La Coruña"],
    communityAliases: ["Galicia"],
    nearbyMunicipalities: [
      "Ferrol", "Santiago de Compostela", "Arteixo", "Oleiros", "Culleredo",
      "Cambre", "Carballo", "Narón", "Betanzos", "Sada",
    ],
  },
  granada: {
    nearbyMunicipalities: [
      "Motril", "Armilla", "Maracena", "Las Gabias", "Albolote", "Loja",
      "Baza", "Guadix", "Almuñécar", "Santa Fe",
    ],
  },
  elche: {
    geoAliases: ["Elx"],
    provinceAliases: ["provincia de Alicante", "Alacant"],
    communityAliases: ["Comunidad Valenciana", "Comunitat Valenciana"],
    nearbyMunicipalities: [
      "Crevillent", "Santa Pola", "Aspe", "Novelda", "Guardamar del Segura",
      "Dolores", "Callosa de Segura",
    ],
  },
  oviedo: {
    geoAliases: ["Uviéu"],
    provinceAliases: ["Asturias", "Principado de Asturias"],
    communityAliases: ["Asturias", "Principado de Asturias"],
    nearbyMunicipalities: [
      "Gijón", "Siero", "Llanera", "Mieres", "Langreo", "Grado", "Noreña",
      "Avilés",
    ],
  },
  santander: {
    provinceAliases: ["Cantabria"],
    communityAliases: ["Cantabria"],
    nearbyMunicipalities: [
      "Torrelavega", "Camargo", "Castro-Urdiales", "Laredo", "Piélagos",
      "El Astillero", "Santoña", "Reinosa",
    ],
  },
  pamplona: {
    geoAliases: ["Iruña", "Pamplona-Iruña"],
    provinceAliases: ["Navarra", "Nafarroa"],
    communityAliases: ["Navarra", "Comunidad Foral de Navarra"],
    nearbyMunicipalities: [
      "Barañáin", "Burlada", "Zizur Mayor", "Villava", "Ansoáin", "Tudela",
      "Estella-Lizarra", "Tafalla",
    ],
  },
  donostia: {
    geoAliases: ["Donostia", "San Sebastián", "Donostia-San Sebastián"],
    provinceAliases: ["Gipuzkoa", "Guipúzcoa"],
    communityAliases: ["País Vasco", "Euskadi"],
    nearbyMunicipalities: [
      "Irun", "Errenteria", "Hernani", "Lasarte-Oria", "Pasaia", "Eibar",
      "Tolosa", "Zarautz", "Arrasate", "Andoain",
    ],
  },
  burgos: {
    communityAliases: ["Castilla y León"],
    nearbyMunicipalities: [
      "Miranda de Ebro", "Aranda de Duero", "Briviesca", "Villarcayo",
      "Lerma", "Medina de Pomar",
    ],
  },
  almeria: {
    geoAliases: ["Almería"],
    nearbyMunicipalities: [
      "El Ejido", "Roquetas de Mar", "Níjar", "Vícar", "Adra", "Huércal-Overa",
      "Berja", "Cuevas del Almanzora",
    ],
  },
  salamanca: {
    communityAliases: ["Castilla y León"],
    nearbyMunicipalities: [
      "Santa Marta de Tormes", "Béjar", "Ciudad Rodrigo", "Villamayor",
      "Peñaranda de Bracamonte", "Carbajosa de la Sagrada", "Guijuelo",
    ],
  },
  cadiz: {
    geoAliases: ["Cádiz"],
    nearbyMunicipalities: [
      "Jerez de la Frontera", "San Fernando", "El Puerto de Santa María",
      "Chiclana de la Frontera", "Puerto Real", "Algeciras", "La Línea de la Concepción",
      "Sanlúcar de Barrameda", "Rota",
    ],
  },
  toledo: {
    communityAliases: ["Castilla-La Mancha"],
    nearbyMunicipalities: [
      "Talavera de la Reina", "Illescas", "Torrijos", "Sonseca", "Seseña",
      "Ocaña", "Quintanar de la Orden", "Bargas",
    ],
  },
  lleida: {
    geoAliases: ["Lleida", "Lérida"],
    provinceAliases: ["Lleida", "Lérida"],
    communityAliases: ["Cataluña", "Catalunya"],
    nearbyMunicipalities: [
      "Balaguer", "Tàrrega", "Mollerussa", "La Seu d'Urgell", "Cervera",
      "Alcarràs", "Solsona",
    ],
  },
  tarragona: {
    communityAliases: ["Cataluña", "Catalunya"],
    nearbyMunicipalities: [
      "Reus", "Salou", "Cambrils", "Valls", "El Vendrell", "Tortosa",
      "Amposta", "Vila-seca", "Calafell",
    ],
  },
  girona: {
    geoAliases: ["Girona", "Gerona"],
    provinceAliases: ["Girona", "Gerona"],
    communityAliases: ["Cataluña", "Catalunya"],
    nearbyMunicipalities: [
      "Figueres", "Blanes", "Lloret de Mar", "Olot", "Salt", "Palafrugell",
      "Sant Feliu de Guíxols", "Banyoles",
    ],
  },
  leon: {
    geoAliases: ["León"],
    communityAliases: ["Castilla y León"],
    nearbyMunicipalities: [
      "Ponferrada", "San Andrés del Rabanedo", "Astorga", "La Bañeza",
      "Villaquilambre", "Bembibre", "Valencia de Don Juan",
    ],
  },
  castellon: {
    geoAliases: ["Castellón", "Castelló", "Castellón de la Plana", "Castelló de la Plana"],
    provinceAliases: ["Castellón", "Castelló"],
    communityAliases: ["Comunidad Valenciana", "Comunitat Valenciana"],
    nearbyMunicipalities: [
      "Vila-real", "Burriana", "Onda", "Almassora", "La Vall d'Uixó",
      "Benicàssim", "Vinaròs", "Segorbe",
    ],
  },
  huelva: {
    nearbyMunicipalities: [
      "Lepe", "Almonte", "Isla Cristina", "Moguer", "Ayamonte", "Aljaraque",
      "Punta Umbría", "Cartaya", "Bollullos Par del Condado",
    ],
  },
  jaen: {
    geoAliases: ["Jaén"],
    nearbyMunicipalities: [
      "Linares", "Andújar", "Úbeda", "Baeza", "Martos", "Alcalá la Real",
      "Bailén", "Torredonjimeno",
    ],
  },
  logrono: {
    geoAliases: ["Logroño"],
    provinceAliases: ["La Rioja"],
    communityAliases: ["La Rioja"],
    nearbyMunicipalities: [
      "Calahorra", "Arnedo", "Haro", "Nájera", "Alfaro", "Lardero",
      "Villamediana de Iregua", "Santo Domingo de la Calzada",
    ],
  },
  albacete: {
    communityAliases: ["Castilla-La Mancha"],
    nearbyMunicipalities: [
      "Hellín", "Villarrobledo", "Almansa", "La Roda", "Caudete",
      "Tobarra", "Casas-Ibáñez",
    ],
  },
  badajoz: {
    communityAliases: ["Extremadura"],
    nearbyMunicipalities: [
      "Mérida", "Don Benito", "Almendralejo", "Villanueva de la Serena",
      "Zafra", "Montijo", "Olivenza", "Villafranca de los Barros",
    ],
  },
  ourense: {
    geoAliases: ["Ourense", "Orense"],
    provinceAliases: ["Ourense", "Orense"],
    communityAliases: ["Galicia"],
    nearbyMunicipalities: [
      "Verín", "O Barco de Valdeorras", "O Carballiño", "Xinzo de Limia",
      "Celanova", "Ribadavia", "Barbadás",
    ],
  },
  caceres: {
    geoAliases: ["Cáceres"],
    communityAliases: ["Extremadura"],
    nearbyMunicipalities: [
      "Plasencia", "Trujillo", "Coria", "Navalmoral de la Mata", "Miajadas",
      "Moraleja", "Valencia de Alcántara",
    ],
  },
};

/** Recursos públicos genéricos, reales en toda España, adaptados a la ciudad. */
export const defaultLocalResources = (
  city: string,
  provincia: string,
): LocalResource[] => [
  {
    name: `Servicio de Orientación Jurídica del Colegio de la Abogacía de ${provincia}`,
    what: "Orientación jurídica gratuita y tramitación del turno de oficio y la justicia gratuita si tus ingresos están por debajo del umbral legal.",
  },
  {
    name: `Oficina Municipal de Información al Consumidor (OMIC) de ${city}`,
    what: "Reclamaciones frente a entidades financieras y de crédito, y mediación de consumo antes de acudir a la vía judicial.",
  },
  {
    name: "Portal del Cliente Bancario del Banco de España",
    what: "Reclamaciones contra bancos y financieras y consulta de la Central de Información de Riesgos (CIRBE) para saber qué deudas constan a tu nombre.",
  },
  {
    name: "Sede Judicial Electrónica y Carpeta Justicia",
    what: "Consulta telemática del estado de tu expediente sin desplazarte al juzgado.",
  },
];

export const getLocalCityData = (slug: string): LocalCityData =>
  LOCAL_CITY_DATA[slug] ?? {};
