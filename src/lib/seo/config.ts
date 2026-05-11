/**
 * Configuración SEO global de Calma.
 * Toda la web se canoniza contra mi-calma.es.
 */
export const SITE_URL = "https://mi-calma.es";
export const SITE_NAME = "Calma";
export const SITE_LOCALE = "es_ES";
export const SITE_LANG = "es-ES";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.jpg`;

// Cuentas sociales (placeholders — actualizar cuando estén creadas)
export const TWITTER_SITE = "@calma_legal";
export const TWITTER_CREATOR = "@calma_legal";

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Calma Legal",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-192.png`,
  email: "hola@mi-calma.es",
  telephone: "+34900000000",
  areaServed: "ES",
  sameAs: [] as string[], // añadir LinkedIn / Instagram cuando existan
};

/** Construye una URL absoluta hacia mi-calma.es a partir de un path relativo. */
export const absoluteUrl = (path: string = "/"): string => {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
