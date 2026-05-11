import { useEffect } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";

const CallRedirect = () => {
  const phoneNumber = "910916445";

  useEffect(() => {
    // Redirección automática al número de teléfono
    const timer = setTimeout(() => {
      window.location.href = `tel:${phoneNumber}`;
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleManualCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Seo title="Llamando…" description="Redirigiendo a nuestro equipo." canonical="/call/smd" robots="noindex,nofollow" />
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <Phone className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Conectando tu llamada...
          </h1>
          <p className="text-muted-foreground">
            Serás redirigido automáticamente
          </p>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleManualCall}
            size="lg"
            className="w-full"
          >
            <Phone className="mr-2 h-5 w-5" />
            Llamar al {phoneNumber}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Si la llamada no se inicia automáticamente, pulsa el botón de arriba
        </p>
      </div>
    </div>
  );
};

export default CallRedirect;
