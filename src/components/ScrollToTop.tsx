import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resetea el scroll al inicio en cada cambio de ruta (navegación SPA). */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
};

export default ScrollToTop;