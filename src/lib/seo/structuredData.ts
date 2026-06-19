import { ORGANIZATION, SITE_NAME, SITE_URL, absoluteUrl } from "./config";
import type { Localizacion } from "@/data/seo/localizaciones";
import { BRAND_RATING } from "@/data/seo/brandStats";

type JsonLd = Record<string, unknown>;

/** AggregateRating de marca (valoración media real declarada). */
const aggregateRating = (): JsonLd => ({
  "@type": "AggregateRating",
  ratingValue: BRAND_RATING.value,
  reviewCount: BRAND_RATING.count,
  bestRating: "5",
  worstRating: "1",
});

export const buildOrganization = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: ORGANIZATION.name,
  legalName: ORGANIZATION.legalName,
  url: ORGANIZATION.url,
  logo: ORGANIZATION.logo,
  email: ORGANIZATION.email,
  ...(ORGANIZATION.sameAs.length ? { sameAs: ORGANIZATION.sameAs } : {}),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: ORGANIZATION.email,
      areaServed: ORGANIZATION.areaServed,
      availableLanguage: ["Spanish"],
    },
  ],
});

export const buildWebSite = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "es-ES",
  publisher: { "@id": `${SITE_URL}#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

/**
 * WebPage de una página concreta. Enlaza el grafo: pertenece al WebSite,
 * trata sobre la Organization y referencia su BreadcrumbList por @id.
 */
export const buildWebPage = (params: {
  url: string;
  name: string;
  description: string;
  hasBreadcrumb?: boolean;
  /** Selectores CSS cuyo texto representa la "respuesta directa" (GEO/voz). */
  speakableSelectors?: string[];
}): JsonLd => {
  const pageUrl = absoluteUrl(params.url);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: params.name,
    description: params.description,
    inLanguage: "es-ES",
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#organization` },
    ...(params.speakableSelectors?.length
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: params.speakableSelectors,
          },
        }
      : {}),
    ...(params.hasBreadcrumb
      ? { breadcrumb: { "@id": `${pageUrl}#breadcrumb` } }
      : {}),
  };
};

export const buildLegalService = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: ORGANIZATION.name,
  url: SITE_URL,
  image: ORGANIZATION.logo,
  description:
    "Servicio legal especializado en la Ley de Segunda Oportunidad para cancelar deudas en España.",
  areaServed: { "@type": "Country", name: "España" },
  serviceType: "Ley de Segunda Oportunidad",
  priceRange: "€€",
  aggregateRating: aggregateRating(),
  provider: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: SITE_URL,
  },
});

/**
 * LegalService local para las landings por ciudad. Modela un negocio de
 * "área de servicio" (service-area business): SIN dirección/oficina física
 * —no existe, la atención es en remoto— pero con `areaServed` a nivel de
 * ciudad/provincia y `geo` con las coordenadas reales. Es la forma correcta
 * y honesta de declarar relevancia local ante los buscadores.
 */
export const buildLocalLegalService = (city: Localizacion): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: `${ORGANIZATION.name} · Abogados Ley de Segunda Oportunidad en ${city.name}`,
  url: absoluteUrl(`${city.path}/`),
  image: ORGANIZATION.logo,
  description: `Abogados especialistas en la Ley de Segunda Oportunidad que atienden a ${city.name} y toda la provincia de ${city.provincia}. Atención online y presencia en los juzgados cuando el procedimiento lo requiere.`,
  areaServed: {
    "@type": "City",
    name: city.name,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: city.provincia,
    },
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: city.lat,
    longitude: city.lng,
  },
  serviceType: "Ley de Segunda Oportunidad",
  priceRange: "€€",
  availableChannel: [
    {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(`${city.path}/`),
      availableLanguage: ["Spanish"],
    },
  ],
  provider: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: SITE_URL,
  },
});

export const buildBreadcrumb = (
  items: { name: string; url: string }[],
  pageUrl?: string
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  ...(pageUrl ? { "@id": `${absoluteUrl(pageUrl)}#breadcrumb` } : {}),
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.url),
  })),
});

export const buildFaq = (
  items: { question: string; answer: string }[]
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({
    "@type": "Question",
    name: it.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: it.answer,
    },
  })),
});

export const buildHowTo = (params: {
  name: string;
  description?: string;
  steps: { name: string; text: string }[];
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: params.name,
  ...(params.description ? { description: params.description } : {}),
  step: params.steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
});

export const buildArticle = (params: {
  title: string;
  description: string;
  url: string;
  image: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
  keywords?: string[];
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: params.title,
  description: params.description,
  image: params.image,
  inLanguage: "es-ES",
  author: {
    "@type": "Organization",
    name: params.author ?? ORGANIZATION.name,
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    logo: { "@type": "ImageObject", url: ORGANIZATION.logo },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absoluteUrl(params.url),
  },
  ...(params.publishedAt ? { datePublished: params.publishedAt } : {}),
  ...(params.updatedAt ? { dateModified: params.updatedAt } : {}),
  ...(params.keywords?.length ? { keywords: params.keywords.join(", ") } : {}),
});

export const buildItemList = (
  items: { name: string; url: string }[]
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: absoluteUrl(it.url),
  })),
});

/**
 * Service de una money page. Las IA usan esto para entender qué servicio
 * ofrece la página y poder recomendarlo en respuestas transaccionales.
 */
export const buildService = (params: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: params.name,
  description: params.description,
  url: absoluteUrl(params.url),
  ...(params.serviceType ? { serviceType: params.serviceType } : {}),
  areaServed: { "@type": "Country", name: "España" },
  availableLanguage: ["Spanish"],
  provider: { "@id": `${SITE_URL}#organization` },
  offers: {
    "@type": "Offer",
    name: "Estudio y diagnóstico inicial del caso",
    description:
      "Análisis del caso sin coste ni compromiso, con respuesta en menos de 24h y sin anticipos.",
    price: "0",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: absoluteUrl(params.url),
  },
});

/**
 * QAPage para la "respuesta directa" transaccional (GEO). Modela una
 * pregunta-respuesta autocontenida y citable por motores generativos.
 */
export const buildQAPage = (params: {
  question: string;
  answer: string;
  url: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "QAPage",
  mainEntity: {
    "@type": "Question",
    name: params.question,
    url: absoluteUrl(params.url),
    acceptedAnswer: {
      "@type": "Answer",
      text: params.answer,
    },
  },
});

/**
 * WebApplication para las herramientas interactivas (calculadoras, tests).
 * Permite a buscadores e IA entender que la página ofrece una utilidad
 * gratuita y usable, no solo contenido editorial.
 */
export const buildWebApplication = (params: {
  name: string;
  description: string;
  url: string;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: params.name,
  description: params.description,
  url: absoluteUrl(params.url),
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "es-ES",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  provider: { "@id": `${SITE_URL}#organization` },
});
