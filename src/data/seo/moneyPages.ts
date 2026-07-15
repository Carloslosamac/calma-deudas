/**
 * Money pages prioritarias (Excel — hoja "Money pages", 15 páginas).
 * Esqueleto: cada página se renderiza con MoneyLanding usando esta config.
 * El copy final es placeholder hasta la fase de contenido.
 */
import type { SeoIntent, TemplateType } from "./architecture";

export type MoneyPage = {
  /** path absoluto, sin trailing slash para el Router */
  path: string;
  /** slug del cluster al que pertenece */
  cluster: string;
  /** H1 / título principal */
  h1: string;
  /** etiqueta corta para navegación y breadcrumbs */
  label: string;
  /** objetivo de negocio (del Excel) */
  objetivo: string;
  priority: "critica" | "alta";
  intent: SeoIntent;
  template: TemplateType;
  /** title SEO placeholder (<60 car) */
  seoTitle: string;
  /** meta description placeholder (<160 car) */
  metaDescription: string;
};

export const moneyPages: MoneyPage[] = [
  {
    path: "/ley-segunda-oportunidad",
    cluster: "ley-segunda-oportunidad",
    h1: "Ley de Segunda Oportunidad",
    label: "Ley de Segunda Oportunidad",
    objetivo: "Rankear por keyword principal y absorber intención legal/transaccional",
    priority: "critica",
    intent: "transaccional",
    template: "money",
    seoTitle: "🕊️ Ley de Segunda Oportunidad: cancela tus deudas",
    metaDescription:
      "Cancela tus deudas legalmente con la Ley de Segunda Oportunidad. Analizamos tu caso gratis y sin compromiso. [Pendiente revisión legal]",
  },
  {
    path: "/abogados-ley-segunda-oportunidad",
    cluster: "ley-segunda-oportunidad",
    h1: "Abogados de la Ley de Segunda Oportunidad",
    label: "Abogados LSO",
    objetivo: "Captación directa de leads con intención jurídica",
    priority: "critica",
    intent: "transaccional",
    template: "money",
    seoTitle: "⚖️ Abogados de Segunda Oportunidad: análisis gratis",
    metaDescription:
      "Abogados especialistas en la Ley de Segunda Oportunidad. Estudiamos tu caso gratis y te acompañamos para cancelar tus deudas legalmente.",
  },
  {
    path: "/cancelar-deudas",
    cluster: "cancelar-deudas",
    h1: "Cancelar deudas",
    label: "Cancelar deudas",
    objetivo: "Captar usuarios que buscan eliminar o perdonar deuda",
    priority: "critica",
    intent: "transaccional",
    template: "money",
    seoTitle: "✅ Cancelar deudas: qué salida legal te conviene",
    metaDescription:
      "¿Quieres eliminar tu deuda pero no sabes cómo? Comparamos las vías legales y te decimos cuál es la tuya. Diagnóstico gratuito de tu caso.",
  },
  {
    path: "/cancelacion-de-deudas",
    cluster: "cancelar-deudas",
    h1: "Cancelación de deudas",
    label: "Cancelación de deudas",
    objetivo: "Variante semántica transaccional y pilar informativo",
    priority: "critica",
    intent: "informativa",
    template: "money",
    seoTitle: "✅ Cancelación de deudas: cuándo puedes y cómo",
    metaDescription:
      "Todo sobre la cancelación de deudas en España: vías legales, requisitos, plazos y opciones para empezar con un diagnóstico gratuito.",
  },
  {
    path: "/reunificacion-deudas",
    cluster: "reunificacion-deudas",
    h1: "Reunificación de deudas",
    label: "Reunificación de deudas",
    objetivo: "Rankear por alternativa financiera antes de LSO",
    priority: "critica",
    intent: "transaccional",
    template: "money",
    seoTitle: "🔗 Reunifica tus deudas sin pedir otro préstamo",
    metaDescription:
      "Reunifica tus deudas en una sola cuota mensual y compara si te conviene frente a la Ley de Segunda Oportunidad.",
  },
  {
    path: "/reunificar-deudas",
    cluster: "reunificacion-deudas",
    h1: "Reunificar deudas",
    label: "Reunificar deudas",
    objetivo: "Variante de acción directa",
    priority: "critica",
    intent: "transaccional",
    template: "money",
    seoTitle: "📉 Reunificar deudas: baja tu cuota y lo que debes",
    metaDescription:
      "Aprende a reunificar tus deudas, reducir tu cuota mensual y decidir si esta opción encaja con tu situación actual.",
  },
  {
    path: "/asnef/salir-de-asnef",
    cluster: "asnef",
    h1: "Salir de ASNEF",
    label: "Salir de ASNEF",
    objetivo: "Captar problema urgente de morosidad",
    priority: "alta",
    intent: "urgente",
    template: "urgente",
    seoTitle: "🧹 Salir de ASNEF para siempre: pasos que funcionan",
    metaDescription:
      "Te explicamos cómo salir de ASNEF y otros ficheros de morosos de forma legal, según el origen de tu deuda.",
  },
  {
    path: "/embargos/parar-embargo",
    cluster: "embargos",
    h1: "Parar un embargo",
    label: "Parar embargo",
    objetivo: "Captar urgencia y derivar a diagnóstico",
    priority: "alta",
    intent: "urgente",
    template: "urgente",
    seoTitle: "🛑 Parar un embargo: qué hacer hoy para frenarlo",
    metaDescription:
      "Pasos para parar un embargo de nómina, cuenta o vivienda y revisar si puedes cancelar la deuda que lo provoca.",
  },
  {
    path: "/tarjetas-revolving/cancelar-tarjetas-revolving",
    cluster: "tarjetas-revolving",
    h1: "Cancelar tarjetas revolving",
    label: "Cancelar revolving",
    objetivo: "Captar reclamaciones por usura e intereses",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "💳 Cancela tu tarjeta revolving y recupera lo pagado",
    metaDescription:
      "Reclama y cancela tu tarjeta revolving por intereses abusivos. Revisamos tu contrato gratis y sin compromiso.",
  },
  {
    path: "/microcreditos-prestamos/cancelar-microcreditos",
    cluster: "microcreditos-prestamos",
    h1: "Cancelar microcréditos",
    label: "Cancelar microcréditos",
    objetivo: "Captar deuda pequeña con alto dolor",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "🔁 Cancelar microcréditos abusivos y salir del bucle",
    metaDescription:
      "Cancela microcréditos y préstamos rápidos con intereses abusivos. Analizamos si puedes reclamar o cancelar la deuda.",
  },
  {
    path: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
    cluster: "ley-segunda-oportunidad",
    h1: "Exoneración del pasivo insatisfecho",
    label: "Exoneración del pasivo",
    objetivo: "Autoridad legal y captación cualificada",
    priority: "alta",
    intent: "informativa",
    template: "money",
    seoTitle: "🧾 Exoneración del pasivo: qué borra y cómo",
    metaDescription:
      "Qué es la exoneración del pasivo insatisfecho: deudas que cubre, modalidades, límites y revocación. Guía jurídica clara. [Pendiente revisión legal]",
  },
  {
    path: "/autonomos-concurso-acreedores/concurso-persona-fisica",
    cluster: "autonomos-concurso-acreedores",
    h1: "Concurso de persona física",
    label: "Concurso persona física",
    objetivo: "Cubrir semántica legal post-reforma concursal",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "⚖️ Concurso de persona física: cuándo y cómo pedirlo",
    metaDescription:
      "Concurso de acreedores de persona física tras la reforma concursal. [Pendiente revisión legal]",
  },
  {
    path: "/juicio-monitorio-recobro/juicio-monitorio-deuda",
    cluster: "juicio-monitorio-recobro",
    h1: "Juicio monitorio por deuda",
    label: "Juicio monitorio",
    objetivo: "Captar demanda activa y urgencia",
    priority: "alta",
    intent: "urgente",
    template: "urgente",
    seoTitle: "⏳ Juicio monitorio: cómo responder antes de 20 días",
    metaDescription:
      "Te ha llegado un juicio monitorio por una deuda: conoce los plazos, opciones y cómo responder antes de que avance.",
  },
  {
    path: "/deudas-hacienda-seguridad-social/deudas-hacienda",
    cluster: "deudas-hacienda-seguridad-social",
    h1: "Deudas con Hacienda",
    label: "Deudas con Hacienda",
    objetivo: "Cubrir límite/exoneración y negociar expectativas",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "🏛️ Deudas con Hacienda: cómo aplazarlas o cancelarlas",
    metaDescription:
      "Qué hacer si tienes deudas con Hacienda: aplazamientos, límites y LSO. [Pendiente revisión legal]",
  },
  {
    path: "/deudas-hacienda-seguridad-social/deudas-seguridad-social",
    cluster: "deudas-hacienda-seguridad-social",
    h1: "Deudas con la Seguridad Social",
    label: "Deudas con Seguridad Social",
    objetivo: "Cubrir autónomos y deuda pública",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "🏛️ Deudas con la Seguridad Social: opciones reales",
    metaDescription:
      "Soluciones para deudas con la Seguridad Social, especialmente autónomos. [Pendiente revisión legal]",
  },
  // ----- Sub-pillars de la Ley de Segunda Oportunidad (Fase 1 SEO) -----
  {
    path: "/ley-segunda-oportunidad/requisitos",
    cluster: "ley-segunda-oportunidad",
    h1: "Requisitos de la Ley de Segunda Oportunidad",
    label: "Requisitos LSO",
    objetivo: "Rankear 'requisitos ley segunda oportunidad' (2.400/mes)",
    priority: "critica",
    intent: "informativa",
    template: "money",
    seoTitle: "✅ Requisitos LSO 2026: mira si calificas HOY",
    metaDescription:
      "Requisitos reales de la Ley de Segunda Oportunidad: insolvencia, buena fe, deuda máxima y errores que la bloquean. Diagnóstico gratis.",
  },
  {
    path: "/ley-segunda-oportunidad/coste-precio",
    cluster: "ley-segunda-oportunidad",
    h1: "¿Cuánto cuesta la Ley de Segunda Oportunidad?",
    label: "Coste LSO",
    objetivo: "Captar búsquedas de precio y desmontar 'gratis'",
    priority: "alta",
    intent: "informativa",
    template: "money",
    seoTitle: "💶 Coste de la LSO en 2026: precio real, sin trampas",
    metaDescription:
      "Cuánto cuesta la Ley de Segunda Oportunidad de verdad: honorarios, tasas, plazos y por qué 'gratis' es un espejismo. Presupuesto cerrado.",
  },
  {
    path: "/ley-segunda-oportunidad/plazos-duracion",
    cluster: "ley-segunda-oportunidad",
    h1: "Cuánto dura la Ley de Segunda Oportunidad",
    label: "Plazos LSO",
    objetivo: "Captar '¿cuánto dura?' y expectativa de tiempo",
    priority: "alta",
    intent: "informativa",
    template: "money",
    seoTitle: "⏳ Duración LSO: de la solicitud a cancelar (fases)",
    metaDescription:
      "Plazos reales de la Ley de Segunda Oportunidad: fases, cuánto tarda cada una y cuándo se frenan los embargos. Análisis gratis.",
  },
  {
    path: "/ley-segunda-oportunidad/pierdo-mi-casa",
    cluster: "ley-segunda-oportunidad",
    h1: "¿Pierdo mi casa con la Ley de Segunda Oportunidad?",
    label: "¿Pierdo mi casa?",
    objetivo: "Captar el miedo #1 y convertir en lead",
    priority: "alta",
    intent: "informativa",
    template: "money",
    seoTitle: "🏠 ¿Pierdo mi casa con la LSO? La verdad completa",
    metaDescription:
      "¿La Ley de Segunda Oportunidad me quita la casa? Cuándo la conservas y cuándo no, con criterios reales del juzgado. Valoramos tu caso gratis.",
  },
  {
    path: "/ley-segunda-oportunidad/es-fiable",
    cluster: "ley-segunda-oportunidad",
    h1: "¿Es fiable la Ley de Segunda Oportunidad?",
    label: "¿Es fiable?",
    objetivo: "Contrarrestar la duda 'timo/estafa' y ganar confianza",
    priority: "alta",
    intent: "informativa",
    template: "money",
    seoTitle: "⚖️ ¿Es fiable la LSO? Prueba, límites y mitos",
    metaDescription:
      "¿Es fiable la Ley de Segunda Oportunidad? Ley en vigor, sentencias reales, límites y qué exigirle a tu abogado para que funcione.",
  },
  {
    path: "/ley-segunda-oportunidad/como-funciona",
    cluster: "ley-segunda-oportunidad",
    h1: "Cómo funciona la Ley de Segunda Oportunidad",
    label: "Cómo funciona",
    objetivo: "Explicativo transaccional, cubre 'cómo funciona'",
    priority: "alta",
    intent: "informativa",
    template: "money",
    seoTitle: "🔎 Cómo funciona la LSO paso a paso (guía 2026)",
    metaDescription:
      "Cómo funciona la Ley de Segunda Oportunidad de verdad: fases, plazos, actores y qué se cancela. Explicado claro por abogados.",
  },
  // ----- Perfiles de deudor (Fase 2 SEO) -----
  {
    path: "/ley-segunda-oportunidad/perfiles/autonomos",
    cluster: "ley-segunda-oportunidad",
    h1: "Ley de Segunda Oportunidad para autónomos",
    label: "LSO Autónomos",
    objetivo: "Perfil autónomo con AEAT/TGSS",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "💼 LSO para autónomos: adiós a Hacienda y TGSS",
    metaDescription:
      "Ley de Segunda Oportunidad para autónomos: qué se cancela de AEAT y Seguridad Social, límites y cómo salvar tu actividad. Análisis gratis.",
  },
  {
    path: "/ley-segunda-oportunidad/perfiles/avalistas",
    cluster: "ley-segunda-oportunidad",
    h1: "Ley de Segunda Oportunidad para avalistas",
    label: "LSO Avalistas",
    objetivo: "Perfil avalista, alta intención",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "🤝 LSO para avalistas: sal del aval que te ahoga",
    metaDescription:
      "Eres avalista y te reclaman la deuda: cómo te libera la Ley de Segunda Oportunidad y qué pasa con el deudor principal. Valoramos gratis.",
  },
  {
    path: "/ley-segunda-oportunidad/perfiles/funcionarios",
    cluster: "ley-segunda-oportunidad",
    h1: "Ley de Segunda Oportunidad para funcionarios",
    label: "LSO Funcionarios",
    objetivo: "Perfil funcionario, protección de plaza",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "🛡️ LSO para funcionarios: sin perder plaza ni sueldo",
    metaDescription:
      "Ley de Segunda Oportunidad para funcionarios: no pierdes la plaza ni te embargan la nómina más allá de lo legal. Diagnóstico gratis.",
  },
  {
    path: "/ley-segunda-oportunidad/perfiles/pensionistas-jubilados",
    cluster: "ley-segunda-oportunidad",
    h1: "Ley de Segunda Oportunidad para pensionistas y jubilados",
    label: "LSO Pensionistas",
    objetivo: "Perfil pensionista, protección de pensión",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "👴 LSO para pensionistas: protege tu pensión YA",
    metaDescription:
      "Ley de Segunda Oportunidad para pensionistas: qué parte de tu pensión es inembargable y cómo cancelar deudas sin arruinar la jubilación.",
  },
  {
    path: "/ley-segunda-oportunidad/perfiles/exempresarios",
    cluster: "ley-segunda-oportunidad",
    h1: "Ley de Segunda Oportunidad tras cerrar tu empresa (SL/SLU)",
    label: "LSO Exempresarios",
    objetivo: "Perfil exempresario con SL cerrada",
    priority: "alta",
    intent: "transaccional",
    template: "money",
    seoTitle: "🏢 LSO tras cerrar tu SL: cancela deudas personales",
    metaDescription:
      "Cerraste tu SL y arrastras avales y deudas personales: la Ley de Segunda Oportunidad las cancela. Estudiamos tu caso gratis.",
  },
];

export const moneyPagesByPath: Record<string, MoneyPage> = moneyPages.reduce(
  (acc, p) => {
    acc[p.path] = p;
    return acc;
  },
  {} as Record<string, MoneyPage>,
);

export const moneyPagesByCluster = (clusterSlug: string): MoneyPage[] =>
  moneyPages.filter((p) => p.cluster === clusterSlug);