import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <div className="text-center max-w-sm mx-auto">
          <h1 className="mb-6 text-4xl sm:text-5xl font-light leading-[1.1] text-foreground font-poppins tracking-wide">
            <div>Te ayudamos a vivir</div>
            <div><span className="text-accent">sin deudas.</span></div>
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

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 mb-8 shadow-2xl border border-white/30">
            <div className="relative">
              <Input
                placeholder="¿Cómo puedo ayudarte con las deudas?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-16 rounded-3xl border-0 bg-transparent text-lg placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 pr-16 pl-6"
              />
              <Button 
                variant="orange" 
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-2xl shadow-lg hover:scale-105 transition-transform"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-foreground/70 mb-3 text-center">
              ¿No sabes por dónde empezar? Prueba una de estas:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="w-full px-4 py-3 rounded-full bg-white/30 text-sm text-foreground/80 hover:bg-white/50 transition-colors border border-white/20 text-center"
                >
                  {suggestion}
                </button>
              ))}
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