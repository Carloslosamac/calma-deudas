import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Resetea el scroll al inicio en cada cambio de ruta (navegación SPA) y
 * normaliza la URL quitando la barra final (excepto la raíz) para evitar
 * duplicados de indexación (p. ej. /barcelona y /barcelona/ compitiendo).
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.length > 1 && pathname.endsWith("/")) {
      const normalized = pathname.replace(/\/+$/, "");
      navigate(`${normalized}${search}${hash}`, { replace: true });
    }
  }, [pathname, search, hash, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
};

export default ScrollToTop;