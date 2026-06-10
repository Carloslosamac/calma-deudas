import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localizaciones } from "@/data/seo/localizaciones";
import { getGoogleMapsBrowserKey } from "@/lib/googleMapsBrowserKey";

/**
 * Mapa interactivo de España con un punto por ciudad del cluster local.
 * Al pulsar un marcador se navega a la landing de esa ciudad.
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

const CityMap = () => {
  const navigate = useNavigate();
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
        const map = new window.google.maps.Map(ref.current, {
          center: { lat: 40.0, lng: -3.7 },
          zoom: 5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const info = new window.google.maps.InfoWindow();

        localizaciones.forEach((city) => {
          const marker = new window.google!.maps.Marker({
            position: { lat: city.lat, lng: city.lng },
            map,
            title: `Abogados Ley de Segunda Oportunidad en ${city.name}`,
          });

          marker.addListener("click", () => {
            info.setContent(
              `<div style="font-family:inherit;max-width:220px">
                <strong>${city.name}</strong>
                <p style="margin:4px 0 8px;font-size:13px;color:#555">Abogados de la Ley de Segunda Oportunidad</p>
                <a href="${city.path}" data-city="${city.slug}" style="font-size:13px;font-weight:600;color:#0a7d6b;text-decoration:underline">Ver página de ${city.name} →</a>
              </div>`,
            );
            info.open({ map, anchor: marker });
          });
        });

        // Navegación SPA al pulsar el enlace del InfoWindow.
        window.google.maps.event.addListener(info, "domready", () => {
          document.querySelectorAll<HTMLAnchorElement>("a[data-city]").forEach((a) => {
            a.onclick = (e) => {
              e.preventDefault();
              navigate(a.getAttribute("href") ?? "/");
            };
          });
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-surface/60 p-6 text-sm text-muted-foreground">
        No se pudo cargar el mapa. Consulta las ciudades en la lista de abajo.
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="application"
      aria-label="Mapa de ciudades con abogados de la Ley de Segunda Oportunidad"
      className="h-[420px] w-full overflow-hidden rounded-2xl border border-border"
    />
  );
};

export default CityMap;