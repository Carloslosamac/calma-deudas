// Autenticación compartida con Zoho (EU). Cachea el access token en memoria y
// en la tabla `zoho_tokens` para NO pedir un refresh en cada invocación:
// Zoho bloquea con "You have made too many requests continuously" y eso
// provocaba fallos intermitentes de sincronización.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const ACCOUNTS_DOMAIN = "https://accounts.zoho.eu";
export const API_DOMAIN = "https://www.zohoapis.eu";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const CLIENT_ID = Deno.env.get("ZOHO_CLIENT_ID")!;
const CLIENT_SECRET = Deno.env.get("ZOHO_CLIENT_SECRET")!;
const GRANT_TOKEN = Deno.env.get("ZOHO_GRANT_TOKEN");

// Margen de seguridad antes de la expiración real (Zoho: 1 hora).
const SKEW_MS = 5 * 60 * 1000;

let memToken: { token: string; expiresAt: number } | null = null;

type TokenRow = {
  refresh_token: string | null;
  access_token: string | null;
  access_token_expires_at: string | null;
};

async function readRow(): Promise<TokenRow | null> {
  const { data } = await supabase
    .from("zoho_tokens")
    .select("refresh_token, access_token, access_token_expires_at")
    .eq("id", 1)
    .maybeSingle();
  return (data as TokenRow) ?? null;
}

async function saveAccessToken(token: string, expiresInSec: number) {
  const expiresAt = Date.now() + expiresInSec * 1000;
  memToken = { token, expiresAt };
  await supabase.from("zoho_tokens").update({
    access_token: token,
    access_token_expires_at: new Date(expiresAt).toISOString(),
    updated_at: new Date().toISOString(),
  }).eq("id", 1);
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: refreshToken,
  });
  const res = await fetch(`${ACCOUNTS_DOMAIN}/oauth/v2/token?${params}`, { method: "POST" });
  const json = await res.json();
  if (!res.ok || json.error || !json.access_token) {
    throw new Error(`Access token refresh failed: ${JSON.stringify(json)}`);
  }
  await saveAccessToken(json.access_token, Number(json.expires_in ?? 3600));
  return json.access_token as string;
}

async function exchangeGrantToken(): Promise<string> {
  if (!GRANT_TOKEN) throw new Error("No refresh token stored and ZOHO_GRANT_TOKEN is missing");
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: GRANT_TOKEN,
  });
  const res = await fetch(`${ACCOUNTS_DOMAIN}/oauth/v2/token?${params}`, { method: "POST" });
  const json = await res.json();
  if (!res.ok || json.error || !json.refresh_token) {
    throw new Error(`Grant token exchange failed: ${JSON.stringify(json)}`);
  }
  await supabase.from("zoho_tokens").upsert({
    id: 1,
    refresh_token: json.refresh_token,
    updated_at: new Date().toISOString(),
  });
  await saveAccessToken(json.access_token, Number(json.expires_in ?? 3600));
  return json.access_token as string;
}

/** Devuelve un access token válido, reutilizando la caché salvo `force`. */
export async function getAccessToken(force = false): Promise<string> {
  const now = Date.now();
  if (!force && memToken && memToken.expiresAt - SKEW_MS > now) return memToken.token;

  const row = await readRow();
  if (
    !force && row?.access_token && row.access_token_expires_at &&
    new Date(row.access_token_expires_at).getTime() - SKEW_MS > now
  ) {
    memToken = { token: row.access_token, expiresAt: new Date(row.access_token_expires_at).getTime() };
    return row.access_token;
  }

  if (row?.refresh_token) {
    try {
      return await refreshAccessToken(row.refresh_token);
    } catch (e) {
      // Si Zoho nos limita por exceso de refrescos, reutiliza el token cacheado
      // aunque esté dentro del margen: probablemente siga siendo válido.
      const cached = memToken?.token ?? row.access_token;
      const stillValid = row.access_token_expires_at &&
        new Date(row.access_token_expires_at).getTime() > now;
      if (cached && stillValid) return cached;
      throw e;
    }
  }
  return await exchangeGrantToken();
}

/** Ejecuta una petición a la API de Zoho reintentando una vez si el token caducó. */
export async function zohoFetch(path: string, init: RequestInit): Promise<Response> {
  let token = await getAccessToken();
  const call = (t: string) =>
    fetch(`${API_DOMAIN}${path}`, {
      ...init,
      headers: {
        ...(init.headers ?? {}),
        Authorization: `Zoho-oauthtoken ${t}`,
        "Content-Type": "application/json",
      },
    });
  let res = await call(token);
  if (res.status === 401) {
    token = await getAccessToken(true);
    res = await call(token);
  }
  return res;
}
