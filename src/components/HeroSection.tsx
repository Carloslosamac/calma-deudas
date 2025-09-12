import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const HeroSection = () => {
  const [prompt, setPrompt] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const fullTypewriterText = "Gratis, rápido y sin compromiso.";

  const startTypewriter = () => {
    if (hasAnimated) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTypewriterText("");
    let currentIndex = 0;
    timerRef.current = setInterval(() => {
      if (currentIndex <= fullTypewriterText.length) {
        setTypewriterText(fullTypewriterText.slice(0, currentIndex));
        currentIndex++;
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setHasAnimated(true);
      }
    }, 100);
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
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
    <section className="relative min-h-screen bg-gradient-hero animate-sky-drift pt-32 overflow-hidden flex flex-col" style={{ backgroundSize: '200% 200%' }}>
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-8">
          <h1 className="mb-6 text-4xl sm:text-5xl leading-[1.1] text-foreground font-anton tracking-wide">
            <div>
              Te ayudamos a vivir<span className="sm:inline block"> <span className="text-accent">sin deudas.</span></span>
            </div>
            <div className="text-3xl sm:text-4xl mt-1">Ahora mismo.</div>
          </h1>
          
          <div className="mb-8 text-base sm:text-lg text-foreground/80">
            <p className="mb-3">
              Calma analiza tu situación financiera y te propone una solución adaptada en minutos.
            </p>
            <p ref={typewriterRef} className="text-foreground/80">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-2xl border border-white/20">
            <div className="flex flex-col gap-4">
              <Textarea
                placeholder="Descríbeme tu situación con las deudas
y te ayudo."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full min-h-20 rounded-2xl border-0 bg-white/50 text-lg placeholder:text-sm placeholder:text-foreground/60 focus-visible:ring-2 focus-visible:ring-orange pr-6 py-4 resize-none"
              />
              <Button 
                variant="orange" 
                className="w-full h-12 rounded-2xl shadow-lg font-medium"
              >
                <ArrowUp className="h-5 w-5 mr-2" />
                Analizar mi situación
              </Button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-foreground/70 mb-3 text-center">
                ¿No sabes por dónde empezar? Prueba una de estas:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(suggestion)}
                    className="px-3 py-2 rounded-full bg-white/30 text-xs sm:text-sm text-foreground/80 hover:bg-white/50 transition-colors border border-white/20 text-center whitespace-nowrap"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-foreground/70">
            <div className="flex -space-x-2">
              <img src={avatar1} alt="User avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              <img src={avatar2} alt="User avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              <img src={avatar3} alt="User avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
            </div>
            <span className="text-sm">Confiado por más de 400K usuarios</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;