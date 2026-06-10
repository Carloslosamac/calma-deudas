import { useEffect, useRef, useState } from "react";
import type { Localizacion } from "@/data/seo/localizaciones";
import { getGoogleMapsBrowserKey } from "@/lib/googleMapsBrowserKey";

/**
 * Mapa centrado en una ciudad concreta con un único marcador en sus
 * coordenadas reales. Refuerza el foco geográfico de la landing local.
 * Carga la Maps JavaScript API de forma asíncrona con callback global.
 */

const TRACKING_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as
  | string
  | undefined;

const CALLBACK = "__calmaInitCityMap";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
    [CALLBACK]?: () => void;
  }
}

let scriptLoading: Promise<void> | null = null;

const loadMaps = (): Promise<void> => {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.google?.maps) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise<void>((resolve, reject) => {
    window[CALLBACK] = () => resolve();
    const params = new URLSearchParams({
      key: getGoogleMapsBrowserKey() ?? "",
      loading: "async",
      callback: CALLBACK,
    });
    if (TRACKING_ID) params.set("channel", TRACKING_ID);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => reject(new Error("No se pudo cargar Google Maps"));
    document.head.appendChild(script);
  });
  return scriptLoading;
};

const CityLocationMap = ({ city }: { city: Localizacion }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!getGoogleMapsBrowserKey()) {
      setError(true);
      return;
    }
    let cancelled = false;

    loadMaps()
      .then(() => {
        if (cancelled || !ref.current || !window.google?.maps) return;
        const center = { lat: city.lat, lng: city.lng };
        const map = new window.google.maps.Map(ref.current, {
          center,
          zoom: 11,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        new window.google.maps.Marker({
          position: center,
          map,
          title: `Abogados Ley de Segunda Oportunidad en ${city.name}`,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [city]);

  if (error) return null;

  return (
    <div
      ref={ref}
      role="application"
      aria-label={`Zona de servicio de abogados de la Ley de Segunda Oportunidad en ${city.name}`}
      className="h-[320px] w-full overflow-hidden rounded-2xl border border-border"
    />
  );
};

export default CityLocationMap;