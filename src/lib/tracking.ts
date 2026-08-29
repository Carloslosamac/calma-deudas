// Lightweight UTM + conversion-page tracking.
// UTMs are captured once on first load (landing URL) and persisted in
// sessionStorage so they survive internal navigation before the user converts.

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
export type Utms = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "calma_utms";

/**
 * Reads UTM params from the current URL and stores them once.
 * Call this as early as possible when the app boots.
 */
export function captureUtms(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Utms = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 255);
    }
    // Only persist if this landing URL actually carries UTMs, and don't
    // overwrite an existing first-touch attribution with empty navigation.
    if (Object.keys(found).length > 0 && !sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) — fail silently.
  }
}

/** Returns the stored first-touch UTMs (empty object if none). */
export function getUtms(): Utms {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Utms) : {};
  } catch {
    return {};
  }
}

/** The page slug/path where the conversion happens. */
export function getConversionSlug(): string {
  if (typeof window === "undefined") return "";
  return window.location.pathname || "/";
}

/* ------------------------------------------------------------------ *
 * Capa de eventos de conversión
 * ------------------------------------------------------------------ */

export type SiteEventName = "cta_click" | "diagnosis_start" | "diagnosis_complete";

export type SiteEventPayload = {
  /** Tipo de página desde la que se dispara (blog, banco, revolving…). */
  pageType?: string;
  /** Identificador estable del CTA (ej. "solution-bridge"). */
  ctaId?: string;
  /** Texto visible del CTA. */
  ctaLabel?: string;
  /** Posición del CTA dentro de la página (inline, closing, sticky…). */
  placement?: string;
  /** Destino del CTA. */
  targetUrl?: string;
  /** Datos adicionales libres. */
  meta?: Record<string, unknown>;
};

/** Deduce el tipo de página a partir del path cuando no se pasa explícito. */
export function inferPageType(path = getConversionSlug()): string {
  if (path.startsWith("/blog/")) return "blog";
  if (path === "/blog") return "blog-index";
  if (path.startsWith("/casos-de-exito")) return "caso";
  if (path.startsWith("/bancos-hipoteca-vivienda/")) return "banco";
  if (path.startsWith("/tarjetas-revolving/")) return "revolving";
  if (path.startsWith("/empresas-de-recobro/")) return "recobro";
  if (path.startsWith("/microcreditos-prestamos/")) return "microcredito";
  if (path.startsWith("/herramientas")) return "herramienta";
  if (path === "/") return "home";
  return "otra";
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Registra un evento de conversión.
 * 1) Push a `window.dataLayer` (se crea si no existe) para que cualquier GTM
 *    futuro lo recoja sin tocar el código de los componentes.
 * 2) Insert best-effort en `site_events` (no bloquea ni rompe la interacción).
 */
export function trackEvent(name: SiteEventName, payload: SiteEventPayload = {}): void {
  if (typeof window === "undefined") return;

  const utms = getUtms();
  const pagePath = getConversionSlug();
  const pageType = payload.pageType ?? inferPageType(pagePath);

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: name,
      page_path: pagePath,
      page_type: pageType,
      cta_id: payload.ctaId,
      cta_label: payload.ctaLabel,
      placement: payload.placement,
      target_url: payload.targetUrl,
      ...utms,
      ...(payload.meta ?? {}),
    });
  } catch {
    // dataLayer nunca debe romper la navegación.
  }

  // Persistencia propia (import diferido: no entra en el bundle inicial).
  void import("@/integrations/supabase/client")
    .then(({ supabase }) =>
      supabase.from("site_events").insert({
        event_name: name,
        page_path: pagePath,
        page_type: pageType,
        cta_id: payload.ctaId ?? null,
        cta_label: payload.ctaLabel ?? null,
        placement: payload.placement ?? null,
        target_url: payload.targetUrl ?? null,
        utm_source: utms.utm_source ?? null,
        utm_medium: utms.utm_medium ?? null,
        utm_campaign: utms.utm_campaign ?? null,
        utm_term: utms.utm_term ?? null,
        utm_content: utms.utm_content ?? null,
        referrer: typeof document !== "undefined" ? document.referrer.slice(0, 500) || null : null,
        meta: (payload.meta ?? {}) as never,
      }),
    )
    .catch(() => {
      // Silencioso: la medición nunca puede afectar a la conversión.
    });
}
