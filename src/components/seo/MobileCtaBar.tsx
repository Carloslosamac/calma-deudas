import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/seo/scrollToForm";

/** CTA fija inferior, solo en móvil. Aparece tras pasar el hero. */
const MobileCtaBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface-elevated/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <Button
        onClick={scrollToForm}
        className="h-12 w-full rounded-full bg-accent text-base text-accent-foreground shadow-soft hover:bg-accent/90"
      >
        <span className="flex items-center justify-center gap-2">
          Analizar mi deuda gratis
          <ArrowRight className="h-5 w-5" aria-hidden />
        </span>
      </Button>
    </div>
  );
};

export default MobileCtaBar;