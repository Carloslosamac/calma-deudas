/**
 * Casos locales: catálogo explícito de expedientes documentados por ciudad.
 * No se generan casos: una ciudad sin expediente documentado no muestra
 * bloque, FAQ ni recuento de casos cerrados.
 */

export type LocalCase = {
  /** municipio del caso (distinto en cada caso de la misma página) */
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

const DOCUMENTED_CASES: Record<string, LocalCase[]> = {
  madrid: [
    {
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
  ],
  barcelona: [
    {
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
    {
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
  ],
  sevilla: [
    {
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
  ],
  bilbao: [
    {
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
  ],
  valencia: [
    {
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
  ],
  zaragoza: [
    {
      city: "Zaragoza",
      province: "Zaragoza",
      profile: "Particular con vivienda pagada y varias cuotas mensuales",
      creditors: ["Préstamos personales", "Tarjeta de crédito"],
      assets: "Piso en propiedad totalmente pagado que no quería arriesgar",
      initialSituation:
        "No era insolvente ni quería cancelar la deuda: necesitaba que las cuotas fueran asumibles sin poner en riesgo su vivienda.",
      solution: "Negociación extrajudicial con los acreedores (sin préstamo nuevo)",
      outcome: "Cuota mensual reducida un 45 % y vivienda intacta.",
    },
  ],
  murcia: [
    {
      city: "Murcia",
      province: "Murcia",
      profile: "Particular con varios préstamos y una tarjeta",
      creditors: ["Préstamos personales", "Tarjeta de crédito"],
      initialSituation:
        "Las cuotas mensuales la asfixiaban, aunque su situación no encajaba en la Ley de Segunda Oportunidad.",
      solution: "Negociación extrajudicial con los acreedores",
      outcome: "Cuota mensual reducida un 40 %.",
    },
  ],
  malaga: [
    {
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
  ],
  alicante: [
    {
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
  ],
  valladolid: [
    {
      city: "Valladolid",
      province: "Valladolid",
      profile: "Particular incluida en un fichero de morosos por una deuda que no reconocía",
      creditors: ["Fichero de solvencia (ASNEF)"],
      initialSituation:
        "Le rechazaban cualquier gestión financiera por una anotación antigua que ella no reconocía como suya.",
      solution: "Impugnación de la inclusión en el fichero",
      outcome: "Baja del fichero sin pagar nada, al acreditarse que la inclusión era indebida.",
    },
  ],
  granada: [
    {
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
  ],
};

/** Expedientes documentados de una ciudad (vacío si no hay ninguno). */
export const getLocalCases = (slug: string): LocalCase[] => DOCUMENTED_CASES[slug] ?? [];

/** Compatibilidad: primer expediente documentado de la ciudad. */
export const getLocalCase = (slug: string): LocalCase | undefined => DOCUMENTED_CASES[slug]?.[0];
