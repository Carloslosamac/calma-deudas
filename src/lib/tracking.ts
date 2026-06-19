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