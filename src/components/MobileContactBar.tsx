import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";

/**
 * Barra de contacto sticky solo en móvil (CTA directo al formulario).
 * Se oculta cuando el formulario de diagnóstico o un puente comercial están
 * en pantalla, para no competir con el CTA principal.
 */
const MobileContactBar = ({ pageType }: { pageType?: string }) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll("#hero-form, [data-solution-bridge]"),
    );
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  });

  const goToForm = () => {
    trackEvent("cta_click", {
      pageType,
      ctaId: "mobile-contact-bar",
      ctaLabel: "Asesórate con un experto",
      placement: "sticky",
      targetUrl: "#hero-form",
    });
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[env(safe-area-inset-bottom)] pt-3 shadow-large backdrop-blur transition-transform duration-300 lg:hidden ${
        hidden ? "pointer-events-none translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-md pb-3">
        <button
          type="button"
          onClick={goToForm}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-accent px-4 font-semibold text-accent-foreground"
        >
          Asesórate con un experto
        </button>
      </div>
    </div>
  );
};

export default MobileContactBar;
