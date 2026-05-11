import { ORGANIZATION, SITE_NAME, SITE_URL, absoluteUrl } from "./config";

type JsonLd = Record<string, unknown>;

export const buildOrganization = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
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
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "es-ES",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

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
  provider: {
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: SITE_URL,
  },
});

export const buildBreadcrumb = (
  items: { name: string; url: string }[]
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
