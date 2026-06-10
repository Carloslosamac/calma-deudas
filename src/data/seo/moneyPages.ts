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
    seoTitle: "Ley de Segunda Oportunidad: cancela tus deudas | Calma",
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
    seoTitle: "Abogados Ley de Segunda Oportunidad en España | Calma",
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
    seoTitle: "Cancelar deudas: qué solución te conviene | Calma",
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
    seoTitle: "Cancelación de deudas en España: guía completa | Calma",
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
    seoTitle: "Reunificación de deudas: unifica tus cuotas | Calma",
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
    seoTitle: "Reunificar deudas: cómo hacerlo paso a paso | Calma",
    metaDescription:
      "Aprende a reunificar tus deudas y reducir tu cuota mensual. Estudio gratuito. [Placeholder]",
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
    seoTitle: "Cómo salir de ASNEF rápido y legalmente | Calma",
    metaDescription:
      "Te explicamos cómo salir de ASNEF y otros ficheros de morosos. Actúa hoy. [Placeholder]",
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
    seoTitle: "Cómo parar un embargo: qué hacer hoy | Calma",
    metaDescription:
      "Pasos para parar un embargo de nómina, cuenta o vivienda. Te ayudamos ya. [Placeholder]",
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
    seoTitle: "Cancelar tarjetas revolving por usura | Calma",
    metaDescription:
      "Reclama y cancela tu tarjeta revolving por intereses abusivos. Revisión gratuita. [Placeholder]",
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
    seoTitle: "Cancelar microcréditos abusivos en España | Calma",
    metaDescription:
      "Cancela microcréditos y préstamos rápidos con intereses abusivos. [Placeholder]",
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
    seoTitle: "Exoneración del pasivo insatisfecho: qué es | Calma",
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
    seoTitle: "Concurso de persona física: guía y requisitos | Calma",
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
    seoTitle: "Juicio monitorio por deuda: cómo responder | Calma",
    metaDescription:
      "Te ha llegado un juicio monitorio por una deuda: plazos y qué hacer. [Placeholder]",
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
    seoTitle: "Deudas con Hacienda: opciones y soluciones | Calma",
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
    seoTitle: "Deudas con la Seguridad Social: qué hacer | Calma",
    metaDescription:
      "Soluciones para deudas con la Seguridad Social, especialmente autónomos. [Pendiente revisión legal]",
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