import { Button } from "@/components/ui/button";
import { scrollToForm } from "@/lib/seo/scrollToForm";

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