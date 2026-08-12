import { useCallback, useEffect, useRef, useState } from "react";
import { syncLeadDetailed, type ZohoLeadFields } from "@/lib/zohoSync";

export type CrmSyncState = {
  status: "idle" | "unlinked" | "saving" | "synced" | "error";
  lastSyncedAt: number | null;
  error?: string;
  retry: () => void;
};

const DEBOUNCE_MS = 2500;

/**
 * Envía al CRM, sobre la marcha, solo los campos que han cambiado desde el
 * último envío. Ignora casos de prueba y casos sin lead vinculado.
 * Un solo vuelo: si llega un cambio mientras hay petición en curso, se encola.
 */
export function useCrmAutoSync(
  zohoId: string | null | undefined,
  fields: ZohoLeadFields,
  disabled: boolean,
): CrmSyncState {
  const [status, setStatus] = useState<CrmSyncState["status"]>("idle");
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | undefined>();

  const sentRef = useRef<ZohoLeadFields>({});
  const inFlightRef = useRef(false);
  const pendingRef = useRef<ZohoLeadFields | null>(null);
  const idRef = useRef<string | null | undefined>(zohoId);
  idRef.current = zohoId;

  // Al cambiar de lead (o al limpiar), se reinicia el estado enviado.
  useEffect(() => {
    sentRef.current = {};
    pendingRef.current = null;
    setStatus(zohoId && !disabled ? "idle" : "unlinked");
    setLastSyncedAt(null);
    setError(undefined);
  }, [zohoId, disabled]);

  const flush = useCallback(async (delta: ZohoLeadFields) => {
    if (inFlightRef.current) {
      pendingRef.current = { ...(pendingRef.current ?? {}), ...delta };
      return;
    }
    inFlightRef.current = true;
    setStatus("saving");
    const res = await syncLeadDetailed(idRef.current, delta);
    inFlightRef.current = false;
    if (res.ok) {
      sentRef.current = { ...sentRef.current, ...delta };
      setLastSyncedAt(Date.now());
      setError(undefined);
      setStatus("synced");
    } else {
      setError(res.error);
      setStatus("error");
    }
    const queued = pendingRef.current;
    pendingRef.current = null;
    if (queued && Object.keys(queued).length) void flush(queued);
  }, []);

  const serialized = JSON.stringify(fields);

  useEffect(() => {
    if (disabled || !zohoId) return;
    const current = JSON.parse(serialized) as ZohoLeadFields;
    const delta: ZohoLeadFields = {};
    for (const [k, v] of Object.entries(current)) {
      if (sentRef.current[k] !== v) delta[k] = v;
    }
    if (!Object.keys(delta).length) return;
    const t = setTimeout(() => void flush(delta), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [serialized, zohoId, disabled, flush]);

  const retry = useCallback(() => {
    const current = JSON.parse(serialized) as ZohoLeadFields;
    const delta: ZohoLeadFields = {};
    for (const [k, v] of Object.entries(current)) {
      if (sentRef.current[k] !== v) delta[k] = v;
    }
    if (Object.keys(delta).length) void flush(delta);
  }, [serialized, flush]);

  return { status, lastSyncedAt, error, retry };
}
