// Fuente ÚNICA de escenas, estilo fotográfico y prompt de portada.
// La importan generate-daily-posts y regenerate-blog-hero para que el cron y
// la regeneración manual no puedan divergir nunca.
export const PIPELINE_VERSION = "hero-2026-08-28-tema-y-entidad";

export function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}
function pick<T>(arr: T[], seed: number): T { return arr[seed % arr.length]; }

// ---------------------------------------------------------------------------
// 1. Entidad concreta en el título ("Préstamo personal con Targobank")
// ---------------------------------------------------------------------------

const ENTITY_STOPWORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "con", "sin",
  "para", "por", "que", "qué", "es", "son", "y", "o", "a", "al", "tu", "su", "mi",
  "nómina", "nomina", "aval", "hipoteca", "deudas", "deuda", "crédito", "credito",
  "préstamo", "prestamo", "tarjeta", "banco", "dinero", "estudios", "empresa",
]);

// Extrae el nombre propio de la entidad del título: lo que sigue a "con" o "de"
// cuando empieza por mayúscula y no es una palabra común.
export function entityFromTitle(title: string): string | null {
  const m = title.match(
    /\b(?:con|de)\s+((?:[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÜÑáéíóúüñ.&-]*)(?:\s+(?:de\s+(?:los\s+|la\s+|las\s+)?)?[A-ZÁÉÍÓÚÑ0-9][\wÁÉÍÓÚÜÑáéíóúüñ.&-]*){0,3})/,
  );
  if (!m) return null;
  const raw = m[1].replace(/[.,:;?¿!¡]+$/, "").trim();
  const first = raw.split(/\s+/)[0].toLowerCase();
  if (ENTITY_STOPWORDS.has(first)) return null;
  if (raw.length < 3 || raw.length > 40) return null;
  return raw;
}

const ENTITY_SCENES = (name: string): string[] => [
  `un recibo o extracto bancario en papel sobre la mesa de una cocina española, con el nombre "${name}" impreso arriba en tipografía sobria y una taza al lado`,
  `un sobre de correo comercial con el nombre "${name}" impreso, recién sacado del buzón de un portal español, sostenido en la mano a media distancia`,
  `el rótulo de una oficina comercial de calle en España con el nombre "${name}" en la fachada, transeúntes desenfocados en la acera`,
  `una carta en papel con membrete "${name}" abierta sobre la mesa del comedor junto a unas gafas, luz natural de ventana`,
  `una persona de perfil frente al mostrador de una oficina de atención al cliente en España, con el nombre "${name}" en el cartel de la pared al fondo`,
  `una tarjeta bancaria y un recibo con el nombre "${name}" sobre el mostrador de madera de una sucursal de barrio`,
];

// ---------------------------------------------------------------------------
// 2. Familias temáticas (de lo más específico a lo más general)
// ---------------------------------------------------------------------------

const SCENE_RULES: { re: RegExp; variants: string[] }[] = [
  // Fiscalidad y declaraciones
  { re: /\biva\b|irpf|renta|hacienda|impuesto|tributari|agencia tributaria|modelo 3\d\d/, variants: [
    "la entrada de una oficina de la Agencia Tributaria en España, con su cartel institucional y una persona subiendo los escalones",
    "un formulario fiscal en papel y una calculadora sobre la mesa de una gestoría, bolígrafo encima",
    "sala de espera de una oficina de administración pública española con números de turno en la pared",
    "una persona de perfil haciendo la declaración en el portátil en la mesa de su comedor, pantalla no visible",
  ]},
  // Conceptos e intereses
  { re: /inter[eé]s (simple|compuesto)|tae|tin|c[aá]lculo|calculadora|amortizaci[oó]n/, variants: [
    "una calculadora de sobremesa y una libreta con cifras escritas a mano sobre una mesa de madera, luz de ventana",
    "un cuadro de amortización impreso sobre la mesa de una gestoría, con anotaciones a bolígrafo",
    "una libreta cuadriculada con una gráfica dibujada a mano y un bolígrafo encima, mesa de cocina española",
    "monedas de euro y una libreta de cuentas sobre una mesa de comedor, luz lateral natural",
  ]},
  // Extractos, cuentas, nóminas en papel
  { re: /extracto|cuenta bancaria|cartilla|domiciliaci[oó]n|transferencia|ingreso m[ií]nimo|subsidio/, variants: [
    "un extracto bancario en papel sobre la mesa de una cocina española, con una taza y unas gafas al lado",
    "una libreta de ahorro abierta sobre el mostrador de una sucursal bancaria de barrio",
    "un cajero automático de calle en España con el teclado en primer plano y la calle desenfocada al fondo",
    "una persona de perfil revisando papeles del banco en la mesa de su comedor, luz natural",
  ]},
  // Definiciones jurídicas
  { re: /persona (f[ií]sica|jur[ií]dica)|sociedad an[oó]nima|sociedad limitada|acreedor|deudor|aval|fiador|notar/, variants: [
    "la placa metálica de una notaría en la fachada de un edificio español, con la calle desenfocada",
    "un sello de caucho y unos documentos apilados sobre el mostrador de una gestoría de barrio",
    "el escaparate de una gestoría en una calle española, con carteles de servicios en la luna",
    "unos documentos firmados y un bolígrafo sobre una mesa de despacho de madera, luz lateral",
  ]},
  // Trámites concursales y organismos
  { re: /administrador concursal|suspensi[oó]n de pagos|cerrar (una )?empresa|liquidaci[oó]n|registro mercantil|adicae|consumo|reclamar/, variants: [
    "la entrada de un registro mercantil español con su cartel institucional y una persona saliendo",
    "una persiana metálica bajada en un local comercial de una calle española, con el cartel del negocio aún puesto",
    "ventanilla de atención de una oficina pública española, con un empleado de perfil al otro lado del cristal",
    "una carpeta de documentos bajo el brazo de una persona que camina por un pasillo institucional",
  ]},
  // Burofax y notificaciones
  { re: /burofax|carta certificad|requerimiento|notificaci[oó]n/, variants: [
    "buzones de un portal de vecinos español bien conservado, con un sobre certificado asomando en uno de ellos",
    "una mujer de unos 40 años abriendo su buzón en el portal de un bloque de pisos español, sobre en la mano",
    "un aviso de correos amarillo sobre la mesa de una entrada de casa, junto a unas llaves",
    "una persona de perfil leyendo una carta apoyada en la encimera de su cocina, luz de ventana",
  ]},
  // Juzgados
  { re: /juzgado|demanda|sentencia|judicial|monitorio|abogad/, variants: [
    "una persona cruzando la entrada de un juzgado español, vista de espaldas desde la acera",
    "fachada de un juzgado español con el cartel institucional en piedra y transeúntes desenfocados",
    "pasillo de un juzgado español con bancos de madera y una persona sentada a media distancia",
    "la placa de un despacho de abogados junto a un portal en una calle española",
  ]},
  // Embargos y nómina
  { re: /embargo|n[oó]mina|sueldo|salario|inembargable/, variants: [
    "una nómina en papel sobre la mesa de un comedor español, con un bolígrafo y una taza al lado",
    "una persona de espaldas consultando el saldo en un cajero de calle en España",
    "un sobre de nómina y una calculadora sobre la mesa de una cocina, luz de ventana",
    "el mostrador de una asesoría laboral de barrio con carpetas apiladas",
  ]},
  // Hipotecas y vivienda
  { re: /hipoteca|eur[ií]bor|vivienda|piso|casa|inmueble|desahucio|cl[aá]usula/, variants: [
    "el escaparate de una inmobiliaria de barrio en España con anuncios de pisos pegados en el cristal",
    "portal de un bloque de viviendas español con fachada de ladrillo y toldos, una persona entrando",
    "llaves de casa sobre la encimera de una cocina española ordenada, con luz de ventana",
    "una escritura de hipoteca en papel sobre una mesa de madera, junto a unas gafas",
  ]},
  // Tarjetas y revolving
  { re: /tarjeta|revolving|usura/, variants: [
    "una tarjeta de crédito sobre un extracto en papel en la mesa de una cocina, luz natural",
    "un datáfono en el mostrador de una tienda de barrio española, con el género al fondo",
    "una persona de perfil sacando la tarjeta de la cartera frente a un cajero de calle",
    "varias tarjetas bancarias y un recibo sobre una mesa de comedor, sin logos legibles",
  ]},
  // Préstamos y microcréditos genéricos
  { re: /pr[eé]stamo|microcr[eé]dito|financiaci[oó]n|cr[eé]dito r[aá]pido|cr[eé]dito|financiera/, variants: [
    "un contrato de préstamo en papel sobre el mostrador de una oficina financiera de calle en España",
    "una persona de perfil rellenando un formulario en papel apoyada en el mostrador de una entidad de barrio",
    "el escaparate de una oficina de financiación en una calle española, con carteles de condiciones",
    "un sobre bancario abierto y un contrato con cifras sobre la mesa de un comedor español",
  ]},
  // Reunificación, cuotas
  { re: /reunific|refinanc|cuota|consolidar|mensualidad|renegoci/, variants: [
    "un calendario de pared de cocina con varios días marcados a bolígrafo y una taza al lado",
    "una libreta con una lista de pagos anotada a mano sobre la mesa del comedor, luz natural",
    "varios recibos ordenados en un montón pequeño sobre una mesa de cocina española",
    "una persona de perfil haciendo cuentas en una libreta en la mesa de su comedor",
  ]},
  // LSO / insolvencia
  { re: /segunda oportunidad|\blso\b|concurso|insolvenc|exoneraci[oó]n/, variants: [
    "una persona esperando sentada en la sala de espera sencilla de un despacho español, de perfil",
    "la placa de un despacho de abogados en la fachada de un edificio de una calle española",
    "una mujer de perfil firmando unos documentos sobre una mesa de madera en un despacho modesto",
    "unos documentos judiciales apilados sobre una mesa de despacho, con un bolígrafo encima",
  ]},
  // ASNEF, morosidad
  { re: /asnef|moros|fichero|rai|badexcug/, variants: [
    "una pantalla de ordenador de sobremesa vista de lado en una oficina modesta, sin texto legible",
    "una carpeta con documentos etiquetados sobre el archivador metálico de una gestoría",
    "una persona de perfil hablando por teléfono en la acera frente a una sucursal bancaria",
    "un mostrador de atención al cliente vacío en una oficina de barrio, luz natural",
  ]},
  // Banca
  { re: /banco|entidad|sucursal|caja rural|kutxa|bbva|santander/, variants: [
    "fachada de una sucursal bancaria en una calle española con transeúntes desenfocados",
    "interior sencillo de una oficina bancaria española con un cliente sentado a media distancia",
    "una persona esperando su turno de pie en una oficina bancaria española, vista de espaldas",
    "el mostrador de una sucursal bancaria de barrio con folletos y un bolígrafo encadenado",
  ]},
  // Autónomos y empresa
  { re: /aut[oó]nomo|freelance|cotizaci[oó]n|seguridad social|empresa|negocio|comercio/, variants: [
    "un autónomo de perfil colocando género en su pequeño comercio en España",
    "un taller mecánico ordenado con herramientas colgadas y el dueño de perfil trabajando",
    "el mostrador de un pequeño negocio español con la persiana abierta y la calle al fondo",
    "una furgoneta comercial aparcada en una calle española mientras una persona carga cajas, de espaldas",
  ]},
  // Pensiones y mayores
  { re: /pensi[oó]n|jubilaci[oó]n|mayor/, variants: [
    "un hombre mayor de perfil sentado en un banco de una plaza española",
    "una mujer mayor revisando su cartilla del banco en la mesa del comedor",
    "una persona mayor de espaldas entrando en una oficina de administración pública",
    "señor mayor caminando con la bolsa de la compra por una calle de barrio, visto de espaldas",
  ]},
  // Estudios
  { re: /estudio|universidad|m[aá]ster|matr[ií]cula/, variants: [
    "la entrada de una facultad universitaria española con estudiantes pasando, a media distancia",
    "una mesa de estudio con apuntes, un cuaderno y una mochila apoyada en la silla",
    "el tablón de anuncios de una universidad española con carteles de becas",
    "una persona joven de perfil caminando por el campus con una carpeta bajo el brazo",
  ]},
];

// Por categoría cuando el título no dispara ninguna regla: nada de bares.
const CATEGORY_DEFAULTS: Record<string, string[]> = {
  "Microcréditos": [
    "el escaparate de una oficina de créditos rápidos en una calle española",
    "un contrato en papel con cifras sobre la mesa de un comedor, bolígrafo al lado",
  ],
  "Tarjetas revolving": [
    "una tarjeta bancaria sobre un extracto en papel en la mesa de una cocina",
    "un datáfono en el mostrador de una tienda de barrio española",
  ],
  "Hipotecas": [
    "el escaparate de una inmobiliaria de barrio con anuncios de pisos",
    "llaves de casa sobre la encimera de una cocina española",
  ],
  "Embargos": [
    "una nómina en papel sobre la mesa de un comedor español",
    "la fachada de un juzgado español con su cartel institucional",
  ],
  "Segunda oportunidad": [
    "la placa de un despacho de abogados en la fachada de un edificio español",
    "una sala de espera sencilla de un despacho con una persona sentada de perfil",
  ],
  "Autónomos": [
    "el mostrador de un pequeño comercio español con el dueño de perfil",
    "un taller ordenado con herramientas colgadas y el dueño trabajando",
  ],
  "Finanzas familiares": [
    "una mesa de cocina española con una libreta de cuentas, una calculadora y una taza",
    "un calendario de pared de cocina con días marcados a bolígrafo",
  ],
  "Consejos": [
    "el escaparate de una gestoría en una calle española con carteles de servicios",
    "una libreta con anotaciones a mano y unas gafas sobre una mesa de madera",
  ],
  "Deudas públicas": [
    "ventanilla de una oficina pública española con turnos en la pared",
    "la entrada de una oficina de la Agencia Tributaria con su cartel institucional",
  ],
  "ASNEF": [
    "una carpeta con documentos etiquetados sobre un archivador metálico",
    "el mostrador de atención al cliente de una oficina de barrio",
  ],
};

const DEFAULT_VARIANTS = [
  "una mesa de comedor española con documentos ordenados, unas gafas y un bolígrafo, luz de ventana",
  "la fachada de una gestoría de barrio en una calle española con toldos",
  "una persona de espaldas entrando en una oficina de atención al público en España",
  "una libreta de cuentas y una calculadora sobre la encimera de una cocina española",
  "un pasillo institucional español con una persona caminando a media distancia",
  "el buzón de un portal de vecinos español con correo asomando",
];

export function sceneFromTitle(title: string, category: string, slug: string): string {
  const t = `${title} ${category}`.toLowerCase();
  const h = hashSlug(slug);
  const entity = entityFromTitle(title);
  if (entity) return pick(ENTITY_SCENES(entity), h);
  for (const r of SCENE_RULES) if (r.re.test(t)) return pick(r.variants, h);
  const byCat = CATEGORY_DEFAULTS[category];
  if (byCat) return pick(byCat, h);
  return pick(DEFAULT_VARIANTS, h);
}

export function heroAltFromScene(title: string, scene: string): string {
  return `Fotografía documental de ${scene}, relacionada con ${title}`;
}

const PHOTO_STYLE_VARIANTS = [
  "luz natural de ventana, colores reales sin corregir en exceso, contraste medio",
  "luz lateral suave de interior, balance de blancos ligeramente imperfecto pero agradable",
  "mediodía en calle española, cielo claro, toldos y fachadas con color real",
  "interior bien iluminado de comercio u oficina, luz mixta natural y artificial",
  "encuadre ligeramente descentrado, como una foto rápida hecha con el móvil",
  "luz de tarde normal, no dorada, ruido fino típico de sensor de móvil moderno",
];

export function photoStyleForSlug(slug: string): string {
  return pick(PHOTO_STYLE_VARIANTS, hashSlug(`${slug}-style`));
}

export function buildHeroPrompt(title: string, category: string, slug: string): string {
  const scene = sceneFromTitle(title, category, slug);
  const entity = entityFromTitle(title);
  const style = photoStyleForSlug(slug);
  const textRule = entity
    ? `Texto permitido: únicamente el nombre "${entity}" impreso de forma natural y breve en el soporte que aparece (rótulo de fachada, membrete de carta, cabecera de recibo o cartel de mostrador), bien escrito y sin faltas. Nada de logotipos inventados con símbolos, marcas de agua ni párrafos legibles.`
    : `Texto: sin texto legible, sin logotipos ni marcas de agua. Se admiten letras borrosas o fuera de foco en carteles de fondo.`;
  return `Fotografía documental realista tomada con un teléfono móvil moderno (iPhone/Samsung) en España. Estilo snapshot cotidiano y creíble. NO publicidad, NO banco de imágenes, NO catálogo.

Escena literal (debe reconocerse a simple vista y coincidir con el tema del artículo "${title}"): ${scene}

No cambies la escena por otra más "bonita": si la escena describe un objeto o un lugar, la foto es de ese objeto o ese lugar y NO se añaden personas protagonistas. Si la escena incluye una persona, aparece UNA sola, integrada en el entorno y haciendo algo concreto (de espaldas, de perfil, a media distancia o parcialmente cortada). PROHIBIDO: mirar a cámara, posar, sonrisa de catálogo, gesto teatral de preocupación, asesor y cliente frente a un portátil, apretón de manos, familia perfecta, grupo alrededor de documentos, terrazas de bar y cafés salvo que la escena lo pida expresamente.

Estética coherente, cotidiana y DIGNA (ni lujo ni pobreza):
- Smartphone a mano, ligera imperfección de encuadre, focal ~24-28mm, profundidad de campo amplia sin bokeh cinematográfico.
- ${style}.
- Incluir al menos 2 detalles con color realista y cotidiano (toldo rojo, azulejo verde/azul, taza naranja, persiana amarilla, cartel municipal, mantel estampado), sin saturar.
- Espacios españoles reconocibles, ordenados y cuidados: vividos pero limpios. Nada de casa de revista, y tampoco deterioro, suciedad ni estética de pobreza.
- Si aparece un móvil o un portátil, la pantalla nunca está encarada a cámara.

${textRule}

Prohibido: fondos blancos o neutros sin contexto, oficinas acristaladas luminosas de anuncio, salas de reuniones corporativas, mobiliario de catálogo, paleta beige/gris dominante, estética de banco de imágenes, personas posando, sonrisas comerciales, HDR, filtros, viñeteo, golden hour, dominantes amarillas cinematográficas, suciedad, deterioro, objetos rotos, collages.`;
}
