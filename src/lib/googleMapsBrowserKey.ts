/**
 * Devuelve la clave de navegador de Google Maps adecuada según el dominio.
 *
 * El conector gestionado de Lovable inyecta una clave restringida a
 * `*.lovable.app`, por lo que en el dominio personalizado `mi-calma.es`
 * Google rechaza la petición con `RefererNotAllowedMapError`.
 *
 * La clave propia del cliente está restringida por referrer a `mi-calma.es`,
 * lo que la hace segura para incrustar en el navegador. La usamos cuando la
 * página se sirve desde ese dominio, y mantenemos la clave gestionada para
 * el preview y los subdominios `*.lovable.app`.
 */

// Clave propia restringida por referrer a https://mi-calma.es/* y https://*.mi-calma.es/*
const CUSTOM_DOMAIN_KEY = "AIzaSyAWAIuJ0ejzcItwqd8RL3AuBpdIhHqqwB8";

const MANAGED_KEY = import.meta.env
  .VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as string | undefined;

export const getGoogleMapsBrowserKey = (): string | undefined => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "mi-calma.es" || host.endsWith(".mi-calma.es")) {
      return CUSTOM_DOMAIN_KEY;
    }
  }
  return MANAGED_KEY;
};
