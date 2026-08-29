import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { ORGANIZATION } from "@/lib/seo/config";
import { trackEvent } from "@/lib/tracking";

const PHONE = ORGANIZATION.telephone ?? "+34611625698";
const WHATSAPP = PHONE.replace(/[^\d]/g, "");

/**
 * Barra de contacto sticky solo en móvil (llamar / WhatsApp).
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

  const track = (label: string, targetUrl: string) =>
    trackEvent("cta_click", {
      pageType,
      ctaId: "mobile-contact-bar",
      ctaLabel: label,
      placement: "sticky",
      targetUrl,
    });

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[env(safe-area-inset-bottom)] pt-3 shadow-large backdrop-blur transition-transform duration-300 lg:hidden ${
        hidden ? "pointer-events-none translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-3 pb-3">
        <a
          href={`tel:${PHONE}`}
          onClick={() => track("Llamar", `tel:${PHONE}`)}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated px-4 font-semibold text-foreground"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          Llamar
        </a>
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("WhatsApp", `https://wa.me/${WHATSAPP}`)}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 font-semibold text-accent-foreground"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          WhatsApp
        </a>
      </div>
    </div>
  );
};

export default MobileContactBar;
