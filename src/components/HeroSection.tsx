import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");

  const suggestions = [
    "Panel de Reportes",
    "Plataforma de Juegos", 
    "Portal de Integración",
    "App de Networking",
    "Visualizador de Habitaciones"
  ];

  return (
    <section className="relative min-h-screen bg-gradient-hero pt-24">
      <div className="mx-auto max-w-4xl px-6 pt-20 pb-32">
        <div className="text-center">
          <h1 className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground font-poppins tracking-wide">
            Te ayudamos a vivir <span className="text-accent">sin deudas.</span>
            <br />
            Ahora mismo.
          </h1>
          
          <p className="mb-12 text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
            Base44 te permite crear aplicaciones completamente funcionales en minutos con solo tus palabras.{" "}
            <br />
            Sin necesidad de programar.
          </p>

          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-4 mb-6">
              <Input
                placeholder="¿Qué quieres crear?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 h-14 rounded-2xl border-0 bg-white/50 text-lg placeholder:text-foreground/60 focus-visible:ring-2 focus-visible:ring-orange"
              />
              <Button 
                variant="orange" 
                size="icon"
                className="h-14 w-14 rounded-2xl shadow-lg"
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
            </div>

            <div className="text-left">
              <p className="text-sm text-foreground/70 mb-3">
                ¿No sabes por dónde empezar? Prueba una de estas:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="px-4 py-2 rounded-full bg-white/50 text-sm text-foreground/80 hover:bg-white/70 transition-colors border border-white/30"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-foreground/70">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full bg-orange border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-accent border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-primary border-2 border-white"></div>
            </div>
            <span className="text-sm">Confiado por más de 400K usuarios</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;