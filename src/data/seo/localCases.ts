/**
 * Local SEO v2 — casos por ciudad, integrados dentro de la propia landing.
 *
 * Un registro por ciudad, siempre con la MISMA estructura: sustituir un caso
 * es editar los datos de su entrada, nada más.
 *
 * `isReal: false` = borrador interno: la landing NO muestra nada hasta que
 * los datos sean reales. Nunca se publican cifras ni perfiles inventados.
 */

export type LocalCase = {
  /** solo se muestra en la landing si es true */
  isReal: boolean;
  city: string;
  province: string;
  /** perfil del cliente (edad/ocupación/situación familiar, anonimizado) */
  profile?: string;
  age?: number;
  /** deuda de partida, formateada */
  debtAmount?: string;
  /** deuda cancelada o resultado económico conseguido */
  cancelledAmount?: string;
  /** tipos de acreedor (sin nombres comerciales salvo que sean públicos) */
  creditors?: string[];
  income?: string;
  assets?: string;
  initialSituation?: string;
  solution?: string;
  outcome?: string;
};

const draft = (city: string, province: string): LocalCase => ({
  isReal: false,
  city,
  province,
});

export const LOCAL_CASES: Record<string, LocalCase> = {
  madrid: {
    isReal: true,
    city: "Madrid",
    province: "Madrid",
    profile: "Autónomo que cerró su negocio tras la quiebra de la actividad",
    debtAmount: "112.000 €",
    cancelledAmount: "112.000 € exonerados",
    creditors: ["Proveedores del negocio", "Créditos bancarios", "Deuda del local"],
    assets: "Sin patrimonio relevante tras el cierre",
    initialSituation:
      "El negocio quebró y arrastró consigo el local, los proveedores y los créditos bancarios: más de cien mil euros de deuda y ningún bien con el que responder.",
    solution: "Concurso de persona física con exoneración del pasivo insatisfecho",
    outcome: "Salida ordenada del negocio y cancelación judicial de la deuda pendiente.",
  },
  barcelona: {
    isReal: true,
    city: "Barcelona",
    province: "Barcelona",
    profile: "Particular con deuda de consumo acumulada en varias entidades",
    debtAmount: "48.310 €",
    cancelledAmount: "48.310 € cancelados",
    creditors: ["Tarjetas de crédito", "Microcréditos", "Préstamo personal"],
    initialSituation:
      "Arrastraba tarjetas, microcréditos y un préstamo personal cuyo saldo crecía cada mes pese a ir pagando.",
    solution: "Ley de Segunda Oportunidad con exoneración total",
    outcome: "Deuda a cero y cierre definitivo de todos los frentes abiertos.",
  },
  lhospitalet: {
    isReal: true,
    city: "Sabadell",
    province: "Barcelona",
    profile: "Trabajador del área metropolitana atrapado en la rueda de los minicréditos",
    debtAmount: "22.179 €",
    cancelledAmount: "22.179 € cancelados",
    creditors: ["Minicréditos", "Tarjetas revolving"],
    initialSituation:
      "Empezó tapando un minicrédito con otro; cuando quiso frenar, la deuda superaba los 22.000 € entre varias financieras.",
    solution: "Ley de Segunda Oportunidad con exoneración total",
    outcome: "Saldo cero y fin de las reclamaciones de las financieras.",
  },
  sevilla: {
    isReal: true,
    city: "Sevilla",
    province: "Sevilla",
    profile: "Trabajador con embargos activos sobre su nómina",
    debtAmount: "88.600 €",
    cancelledAmount: "88.600 € exonerados",
    creditors: ["Entidades financieras", "Créditos al consumo"],
    income: "Nómina parcialmente embargada antes de cobrarla",
    initialSituation:
      "Cada mes una parte de su paga desaparecía por los embargos y la deuda seguía creciendo.",
    solution: "Ley de Segunda Oportunidad con exoneración total",
    outcome: "Embargos levantados y deuda cancelada por resolución judicial.",
  },
  bilbao: {
    isReal: true,
    city: "Bilbao",
    province: "Bizkaia",
    profile: "Particular con deuda repartida entre siete entidades",
    debtAmount: "61.400 €",
    cancelledAmount: "61.400 € cancelados",
    creditors: ["Préstamos personales", "Tarjetas", "Créditos al consumo"],
    initialSituation:
      "Siete acreedores distintos reclamando a la vez hacían imposible negociar frente a frente con cada uno.",
    solution: "Ley de Segunda Oportunidad con exoneración total",
    outcome: "Un único procedimiento cerró los siete frentes.",
  },
  valencia: {
    isReal: true,
    city: "Valencia",
    province: "Valencia",
    profile: "Exautónoma con ocho años de actividad tras cesar el negocio",
    debtAmount: "47.300 €",
    cancelledAmount: "47.300 € exonerados",
    creditors: ["Proveedores", "Entidades financieras"],
    initialSituation:
      "Al cesar la actividad, la deuda con proveedores y financieras se volvió insostenible con sus ingresos.",
    solution: "Ley de Segunda Oportunidad con exoneración total",
    outcome: "Empezó de cero, sin deuda pendiente.",
  },
  zaragoza: {
    isReal: true,
    city: "Zaragoza",
    province: "Zaragoza",
    profile: "Particular con vivienda pagada y varias cuotas mensuales",
    creditors: ["Préstamos personales", "Tarjeta de crédito"],
    assets: "Piso en propiedad totalmente pagado que no quería arriesgar",
    initialSituation:
      "No era insolvente ni quería cancelar la deuda: necesitaba que las cuotas fueran asumibles sin poner en riesgo su vivienda.",
    solution: "Negociación extrajudicial con los acreedores (reunificación sin préstamo nuevo)",
    outcome: "Cuota mensual reducida un 45 % y vivienda intacta.",
  },
  murcia: {
    isReal: true,
    city: "Murcia",
    province: "Murcia",
    profile: "Particular con varios préstamos y una tarjeta",
    creditors: ["Préstamos personales", "Tarjeta de crédito"],
    initialSituation:
      "Las cuotas mensuales la asfixiaban, aunque su situación no encajaba en la Ley de Segunda Oportunidad.",
    solution: "Negociación extrajudicial con los acreedores",
    outcome: "Cuota mensual reducida un 40 %.",
  },
  malaga: {
    isReal: true,
    city: "Málaga",
    province: "Málaga",
    profile: "Trabajador con tres cuotas mensuales en entidades distintas",
    creditors: ["Tres entidades financieras"],
    assets: "Coche y plaza de garaje pagados que no quería perder",
    initialSituation:
      "Cada vencimiento era un susto; con bienes pagados en juego, la refinanciación clásica no era una opción.",
    solution: "Negociación extrajudicial con los acreedores",
    outcome: "Tres cuotas convertidas en una sola, asumible, sin perder los bienes.",
  },
  alicante: {
    isReal: true,
    city: "Alicante",
    province: "Alicante",
    profile: "Trabajador con empleo estable y una tarjeta revolving",
    creditors: ["Tarjeta revolving"],
    income: "Ingresos estables: pagaba puntualmente cada mes",
    initialSituation:
      "Pagaba sin retraso y la deuda no bajaba: el contrato tenía una TAE cercana al 27 %.",
    solution: "Reclamación judicial por usura",
    outcome: "Contrato declarado nulo y 5.120 € recuperados.",
    cancelledAmount: "5.120 € recuperados",
  },
  valladolid: {
    isReal: true,
    city: "Valladolid",
    province: "Valladolid",
    profile: "Particular incluida en un fichero de morosos por una deuda que no reconocía",
    creditors: ["Fichero de solvencia (ASNEF)"],
    initialSituation:
      "Le rechazaban cualquier gestión financiera por una anotación antigua que ella no reconocía como suya.",
    solution: "Impugnación de la inclusión en el fichero",
    outcome: "Baja del fichero sin pagar nada, al acreditarse que la inclusión era indebida.",
  },
  granada: {
    isReal: true,
    city: "Granada",
    province: "Granada",
    profile: "Trabajador con la nómina embargada casi por completo",
    creditors: ["Entidades financieras"],
    income: "Nómina retenida por encima del mínimo inembargable",
    assets: "Sin bienes de valor a su nombre",
    initialSituation:
      "Cobraba y, antes de poder tocar el dinero, ya se lo habían retenido casi todo.",
    solution: "Protección del mínimo inembargable y Ley de Segunda Oportunidad",
    outcome: "Nómina protegida primero y deuda cancelada después por insolvencia sin bienes.",
  },

  // --- Borradores: pendientes de sustituir por casos reales de la zona ---
  palma: draft("Palma", "Illes Balears"),
  "las-palmas-de-gran-canaria": draft("Las Palmas de Gran Canaria", "Las Palmas"),
  cordoba: draft("Córdoba", "Córdoba"),
  vigo: draft("Vigo", "Pontevedra"),
  gijon: draft("Gijón", "Asturias"),
  "vitoria-gasteiz": draft("Vitoria-Gasteiz", "Álava"),
  "a-coruna": draft("A Coruña", "A Coruña"),
  elche: draft("Elche", "Alicante"),
  oviedo: draft("Oviedo", "Asturias"),
  santander: draft("Santander", "Cantabria"),
  pamplona: draft("Pamplona", "Navarra"),
  donostia: draft("Donostia-San Sebastián", "Gipuzkoa"),
  burgos: draft("Burgos", "Burgos"),
  almeria: draft("Almería", "Almería"),
  salamanca: draft("Salamanca", "Salamanca"),
  cadiz: draft("Cádiz", "Cádiz"),
  toledo: draft("Toledo", "Toledo"),
  lleida: draft("Lleida", "Lleida"),
  tarragona: draft("Tarragona", "Tarragona"),
  girona: draft("Girona", "Girona"),
  leon: draft("León", "León"),
  castellon: draft("Castellón de la Plana", "Castellón"),
  huelva: draft("Huelva", "Huelva"),
  jaen: draft("Jaén", "Jaén"),
  logrono: draft("Logroño", "La Rioja"),
  albacete: draft("Albacete", "Albacete"),
  badajoz: draft("Badajoz", "Badajoz"),
  ourense: draft("Ourense", "Ourense"),
  caceres: draft("Cáceres", "Cáceres"),
};

export const getLocalCase = (slug: string): LocalCase | undefined =>
  LOCAL_CASES[slug];

/** Solo los casos publicables (datos reales verificados). */
export const getPublishableLocalCase = (slug: string): LocalCase | undefined => {
  const c = LOCAL_CASES[slug];
  return c && c.isReal ? c : undefined;
};
