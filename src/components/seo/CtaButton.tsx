import { Button } from "@/components/ui/button";

/** CTA global: siempre hace scroll a #hero-form (regla de marca). */
const scrollToForm = () => {
  const form = document.getElementById("hero-form");
  if (form) {
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  window.location.href = "/#hero-form";
};

const CtaButton = ({
  children = "Analizar mi deuda gratis",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <Button
    onClick={scrollToForm}
    className={`rounded-full px-6 h-12 text-sm shadow-soft bg-accent text-accent-foreground hover:bg-accent/90 ${className ?? ""}`}
  >
    {children}
  </Button>
);

export default CtaButton;