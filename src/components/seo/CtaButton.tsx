import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/seo/scrollToForm";
import { trackEvent } from "@/lib/tracking";

const CtaButton = ({
  children = "Analizar mi deuda gratis",
  className,
  ctaId = "cta-button",
  pageType,
  placement = "inline",
  meta,
}: {
  children?: React.ReactNode;
  className?: string;
  ctaId?: string;
  pageType?: string;
  placement?: "inline" | "closing";
  /** contexto extra para la analítica (entidad, etc.) */
  meta?: Record<string, unknown>;
}) => (
  <Button
    onClick={() => {
      trackEvent("cta_click", {
        pageType,
        ctaId,
        ctaLabel: typeof children === "string" ? children : undefined,
        placement,
        targetUrl: "#hero-form",
        meta,
      });
      scrollToForm();
    }}
    className={`rounded-full px-6 h-12 text-sm shadow-soft bg-accent text-accent-foreground hover:bg-accent/90 ${className ?? ""}`}
  >
    {children}
  </Button>
);

export default CtaButton;
