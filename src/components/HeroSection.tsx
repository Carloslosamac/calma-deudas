import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  
  const fullTypewriterText = "Gratis, rápido y sin compromiso.";

  const startTypewriter = () => {
    setTypewriterText("");
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullTypewriterText.length) {
        setTypewriterText(fullTypewriterText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return timer;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTypewriter();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (typewriterRef.current) {
      observer.observe(typewriterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const suggestions = [
    "Pagar una sola cuota",
    "Salir de ASNEF", 
    "Acabar con el acoso",
    "Reclamar intereses",
    "Perdonar mis deudas"
  ];

  return (
    <section className="relative min-h-screen bg-gradient-hero pt-24">
      <div className="mx-auto max-w-4xl px-6 pt-20 pb-32">
        <div className="text-center">
          <h1 className="mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.1] text-foreground font-poppins tracking-wide">
            <div className="whitespace-nowrap">Te ayudamos a vivir <span className="text-accent">sin deudas.</span></div>
            <div className="-mt-2">Ahora mismo.</div>
          </h1>
          
          <div className="mb-12 text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto">
            <p className="mb-2">
              Calma analiza tu situación financiera y te propone una solución adaptada en minutos.
            </p>
            <p ref={typewriterRef} className="text-foreground/80">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
            <div className="flex items-center gap-4 mb-6">
              <Input
                placeholder="¿Cómo puedo ayudarte con las deudas?"
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
              <div className="flex gap-2 justify-between">
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