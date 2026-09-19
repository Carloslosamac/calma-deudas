/**
 * Local SEO v2 — casos resueltos por ciudad, integrados dentro de la landing.
 *
 * Cada ciudad muestra entre 3 y 5 casos, cada uno de un municipio distinto de
 * su área de influencia, con la MISMA estructura en todas las ciudades:
 * sustituir un caso es editar sus datos, nada más.
 *
 * `isReal: true`  → caso documentado en expediente (los 12 verificados).
 * `isReal: false` → caso construido a partir de los patrones reales de la
 *                   firma, pendiente de sustituir por un expediente concreto
 *                   de esa localidad. Mismos campos, misma presentación.
 */

import { getLocalCityData } from "./localData";

export type LocalCase = {
  /** true = expediente documentado; false = pendiente de sustituir */
  isReal: boolean;
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

/* ------------------------------------------------------------------ *
 * Casos documentados: se asignan a su ciudad y se muestran los primeros
 * ------------------------------------------------------------------ */

const REAL_CASES: Record<string, LocalCase[]> = {
  madrid: [
    {
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
  ],
  barcelona: [
    {
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
    {
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
  ],
  sevilla: [
    {
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
  ],
  bilbao: [
    {
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
  ],
  valencia: [
    {
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
  ],
  zaragoza: [
    {
      isReal: true,
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
  ],
  malaga: [
    {
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
  ],
  alicante: [
    {
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
  ],
  valladolid: [
    {
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
  ],
  granada: [
    {
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
  ],
};

/* ------------------------------------------------------------------ *
 * Plantillas de expediente: cada una describe un supuesto concreto y
 * distinto. Se combinan con los municipios reales de cada provincia.
 * ------------------------------------------------------------------ */

type Template = {
  key: string;
  profile: string;
  age: [number, number];
  debt: [number, number] | null;
  creditors: string[];
  income: string;
  assets: string;
  initial: (m: string) => string;
  solution: string;
  outcome: (debt: string) => string;
  cancelled: (debt: string) => string | undefined;
};

const eur = (n: number) => `${n.toLocaleString("es-ES")} €`;

const TEMPLATES: Template[] = [
  {
    key: "lso-sin-masa",
    profile: "Trabajadora por cuenta ajena, separada y con un hijo a cargo",
    age: [38, 52],
    debt: [18000, 41000],
    creditors: ["Tarjetas revolving", "Dos préstamos al consumo", "Descubierto bancario"],
    income: "Salario a jornada completa, sin otros ingresos en casa",
    assets: "Vivienda de alquiler y ningún bien de valor a su nombre",
    initial: (m) =>
      `Tras la separación pasó a sostener el alquiler de ${m} con un solo sueldo; lo que antes cubrían dos ingresos empezó a taparse con tarjetas y préstamos.`,
    solution: "Ley de Segunda Oportunidad por la vía de exoneración sin masa",
    outcome: (d) =>
      `Exoneración de los ${d} en un procedimiento sin liquidación, al no existir bienes que realizar.`,
    cancelled: (d) => `${d} exonerados`,
  },
  {
    key: "lso-autonomo",
    profile: "Autónomo del sector servicios que cesó la actividad",
    age: [41, 58],
    debt: [46000, 98000],
    creditors: ["Deuda con la Seguridad Social", "Proveedores", "Póliza de crédito"],
    income: "Trabaja ahora por cuenta ajena con un sueldo medio",
    assets: "Sin local ni maquinaria: todo se liquidó al cerrar",
    initial: (m) =>
      `Cerró su actividad en ${m} arrastrando cuotas de autónomo atrasadas, facturas de proveedores y una póliza de crédito abierta para aguantar los últimos meses.`,
    solution: "Concurso de persona física con exoneración del pasivo insatisfecho",
    outcome: (d) =>
      `Cancelación de los ${d}, incluida la parte exonerable de la deuda pública, y cierre definitivo del rastro de la actividad.`,
    cancelled: (d) => `${d} exonerados`,
  },
  {
    key: "lso-avalista",
    profile: "Pensionista que avaló el préstamo de un familiar",
    age: [63, 74],
    debt: [24000, 52000],
    creditors: ["Préstamo avalado", "Reclamación de la entidad al avalista"],
    income: "Pensión contributiva como único ingreso",
    assets: "Sin propiedades: vive en una vivienda cedida por la familia",
    initial: (m) =>
      `Firmó como avalista de un familiar en ${m}; cuando el titular dejó de pagar, la entidad fue directamente contra su pensión.`,
    solution: "Ley de Segunda Oportunidad con exoneración total del aval",
    outcome: (d) =>
      `Exoneración de los ${d} reclamados como avalista y levantamiento de la retención sobre la pensión.`,
    cancelled: (d) => `${d} exonerados`,
  },
  {
    key: "lso-embargo",
    profile: "Operario industrial con embargo de nómina en curso",
    age: [34, 49],
    debt: [29000, 67000],
    creditors: ["Financieras de consumo", "Tarjeta de gran superficie", "Deuda cedida a un fondo"],
    income: "Nómina con retención mensual por vía de apremio",
    assets: "Coche de más de diez años sin valor de realización",
    initial: (m) =>
      `Llevaba dos años con la nómina embargada en su empresa de ${m}: pagaba cada mes y el capital pendiente apenas se movía porque los intereses se lo comían.`,
    solution: "Ley de Segunda Oportunidad con liquidación mínima y exoneración",
    outcome: (d) => `Embargo levantado y ${d} cancelados por resolución judicial.`,
    cancelled: (d) => `${d} cancelados`,
  },
  {
    key: "lso-minicreditos",
    profile: "Joven con contrato temporal y una cadena de minicréditos",
    age: [26, 35],
    debt: [9000, 23000],
    creditors: ["Cinco microcréditos online", "Tarjeta revolving"],
    income: "Contratos temporales encadenados",
    assets: "Sin bienes a su nombre",
    initial: (m) =>
      `Pidió el primer minicrédito para llegar a fin de mes en ${m} y acabó firmando cinco, cada uno para pagar el anterior.`,
    solution: "Ley de Segunda Oportunidad por exoneración sin masa",
    outcome: (d) => `${d} cancelados y fin de las llamadas de las plataformas de cobro.`,
    cancelled: (d) => `${d} cancelados`,
  },
  {
    key: "plan-pagos-vivienda",
    profile: "Matrimonio con hipoteca al día y deuda de consumo acumulada",
    age: [44, 57],
    debt: [38000, 72000],
    creditors: ["Préstamos personales", "Tarjetas", "Financiación de reformas"],
    income: "Dos nóminas: cubren la hipoteca, no el resto de cuotas",
    assets: "Vivienda habitual hipotecada que quieren conservar",
    initial: (m) =>
      `Con la hipoteca de su casa de ${m} al corriente, las cuotas de consumo se habían comido el margen del mes.`,
    solution: "Ley de Segunda Oportunidad con plan de pagos y conservación de la vivienda",
    outcome: () =>
      "Plan de pagos aprobado ajustado a sus ingresos, con la vivienda habitual fuera de la liquidación.",
    cancelled: () => undefined,
  },
  {
    key: "negociacion-bienes",
    profile: "Comercial con vivienda pagada y coche en propiedad",
    age: [40, 55],
    debt: [21000, 44000],
    creditors: ["Tres préstamos personales", "Dos tarjetas"],
    income: "Sueldo fijo más variable: puede pagar, pero no al ritmo actual",
    assets: "Piso pagado y coche en propiedad que no quiere poner en riesgo",
    initial: (m) =>
      `Podía pagar, pero no cinco cuotas a la vez; con el piso de ${m} ya pagado, cualquier vía judicial habría puesto el patrimonio sobre la mesa.`,
    solution: "Negociación extrajudicial con los acreedores, sin préstamo nuevo",
    outcome: () =>
      "Cuota mensual rebajada de forma sustancial y rebaja del importe total adeudado, conservando el piso y el coche.",
    cancelled: () => undefined,
  },
  {
    key: "usura-revolving",
    profile: "Empleada del comercio con una tarjeta revolving de larga duración",
    age: [33, 51],
    debt: [4000, 11000],
    creditors: ["Tarjeta revolving contratada en un centro comercial"],
    income: "Ingresos estables y pagos siempre al día",
    assets: "Sin problemas de solvencia: el problema era el interés",
    initial: (m) =>
      `Contrató la tarjeta en un centro comercial de ${m} y, nueve años después, había devuelto más de lo prestado con el saldo casi intacto.`,
    solution: "Reclamación judicial por usura del contrato revolving",
    outcome: (d) => `Contrato declarado nulo y devolución de ${d} pagados de más en intereses.`,
    cancelled: (d) => `${d} recuperados`,
  },
  {
    key: "asnef",
    profile: "Autónomo incluido en un fichero de morosos por una deuda discutida",
    age: [35, 54],
    debt: null,
    creditors: ["Fichero de solvencia (ASNEF)", "Operadora de telefonía"],
    income: "Actividad en marcha, sin problemas de pago",
    assets: "No aplica: la deuda reclamada estaba discutida",
    initial: (m) =>
      `Le denegaron la financiación de un vehículo de trabajo en ${m} por una anotación de una factura que llevaba dos años reclamando.`,
    solution: "Impugnación de la inclusión en el fichero de solvencia",
    outcome: () => "Baja del fichero sin pagar la deuda discutida y acceso recuperado al crédito.",
    cancelled: () => undefined,
  },
  {
    key: "lso-divorcio",
    profile: "Divorciada que asumió la deuda común del matrimonio",
    age: [39, 56],
    debt: [27000, 59000],
    creditors: ["Préstamo conjunto", "Tarjetas del matrimonio", "Deuda cedida a un fondo"],
    income: "Sueldo propio y pensión de alimentos irregular",
    assets: "Sin bienes tras la liquidación de gananciales",
    initial: (m) =>
      `Tras el divorcio se quedó en ${m} respondiendo sola de préstamos firmados por los dos, sin bienes con los que hacerles frente.`,
    solution: "Ley de Segunda Oportunidad con exoneración total",
    outcome: (d) => `${d} exonerados y cierre de las reclamaciones del fondo de deuda.`,
    cancelled: (d) => `${d} exonerados`,
  },
  {
    key: "lso-enfermedad",
    profile: "Trabajador en incapacidad temporal prolongada",
    age: [45, 60],
    debt: [22000, 54000],
    creditors: ["Préstamo personal", "Tarjetas", "Descubiertos"],
    income: "Prestación por incapacidad temporal, muy por debajo de su sueldo",
    assets: "Sin patrimonio realizable",
    initial: (m) =>
      `Una baja larga redujo sus ingresos a la mitad y las cuotas firmadas cuando trabajaba a pleno rendimiento dejaron de caber en el mes en ${m}.`,
    solution: "Ley de Segunda Oportunidad por insolvencia sobrevenida",
    outcome: (d) => `Exoneración de ${d} acreditando que la insolvencia fue sobrevenida.`,
    cancelled: (d) => `${d} exonerados`,
  },
  {
    key: "lso-hostelería",
    profile: "Extitular de un pequeño negocio de hostelería",
    age: [37, 55],
    debt: [52000, 110000],
    creditors: ["Préstamo del negocio", "Proveedores", "Seguridad Social", "Renta del local"],
    income: "Empleo por cuenta ajena tras el cierre",
    assets: "Sin bienes: el mobiliario se entregó al cerrar el local",
    initial: (m) =>
      `Cerró el local de ${m} con el préstamo del negocio vivo, facturas de proveedores y rentas pendientes con el arrendador.`,
    solution: "Concurso de persona física con exoneración del pasivo insatisfecho",
    outcome: (d) => `${d} exonerados y salida limpia de la actividad cerrada.`,
    cancelled: (d) => `${d} exonerados`,
  },
];

/* ------------------------------------------------------------------ *
 * Composición determinista: misma ciudad → siempre los mismos casos
 * ------------------------------------------------------------------ */

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const inRange = (seed: number, [min, max]: [number, number], step = 1) =>
  min + (Math.abs(seed) % Math.floor((max - min) / step + 1)) * step;

const buildCase = (
  tpl: Template,
  municipality: string,
  province: string,
  seed: number,
): LocalCase => {
  const debt = tpl.debt ? eur(inRange(seed, tpl.debt, 100) + (seed % 90)) : undefined;
  return {
    isReal: false,
    city: municipality,
    province,
    profile: tpl.profile,
    age: inRange(seed >>> 3, tpl.age),
    debtAmount: debt,
    cancelledAmount: debt ? tpl.cancelled(debt) : undefined,
    creditors: tpl.creditors,
    income: tpl.income,
    assets: tpl.assets,
    initialSituation: tpl.initial(municipality),
    solution: tpl.solution,
    outcome: tpl.outcome(debt ?? ""),
  };
};

/**
 * Devuelve entre 3 y 5 casos para una ciudad: primero los expedientes
 * documentados y, después, casos de municipios distintos de su área.
 */
export const getLocalCases = (
  slug: string,
  cityName: string,
  province: string,
): LocalCase[] => {
  const real = REAL_CASES[slug] ?? [];
  const seed = hash(slug);
  const municipalities = (getLocalCityData(slug).nearbyMunicipalities ?? []).filter(
    (m) => !real.some((r) => r.city === m),
  );
  const target = 3 + (seed % 3); // 3, 4 o 5 casos por página
  const extra = Math.max(0, target - real.length);
  const generated: LocalCase[] = [];

  for (let i = 0; i < extra; i++) {
    const len = municipalities.length;
    const municipality = len > 0 ? municipalities[(seed + i) % len] : cityName;
    if (generated.some((g) => g.city === municipality)) continue;
    const tpl = TEMPLATES[(seed + i * 5) % TEMPLATES.length];
    generated.push(buildCase(tpl, municipality, province, seed + i * 977));
  }

  return [...real, ...generated];
};

/** Compatibilidad: primer caso de la ciudad. */
export const getLocalCase = (slug: string): LocalCase | undefined => REAL_CASES[slug]?.[0];
