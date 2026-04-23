import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import personWoman from "@/assets/person-woman-walking.jpg";
import personMan from "@/assets/person-man-portrait.jpg";
import personCouple from "@/assets/person-couple-sofa.jpg";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative pt-36 pb-24 overflow-hidden bg-gradient-hero">
      {/* Soft floating orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-soft/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-foreground/80 mb-8 shadow-soft"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-accent-deep" />
          Amparado por la Ley de Segunda Oportunidad
        </motion.div>

        {/* Massive headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-poppins font-semibold tracking-tight text-foreground text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] mb-8"
        >
          Vive sin deudas.
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">Empieza hoy.</span>
            <span className="absolute inset-x-0 bottom-2 h-3 bg-accent/60 -z-0 rounded-sm" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-8 mb-10"
        >
          Analizamos tu situación en minutos y te proponemos una solución legal a medida.
          Sin compromiso, sin costes ocultos.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            onClick={scrollToForm}
            size="lg"
            className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 text-base font-medium shadow-large group"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Analizar mi deuda gratis
            <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
          <div className="text-sm text-muted-foreground">
            Resultado en 2 minutos · Sin pedir DNI
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex items-center justify-center gap-3 text-foreground/70"
        >
          <div className="flex -space-x-2">
            <img src={personWoman} alt="Cliente Calma" className="h-10 w-10 rounded-full border-2 border-background object-cover shadow-soft" />
            <img src={personCouple} alt="Cliente Calma" className="h-10 w-10 rounded-full border-2 border-background object-cover shadow-soft" />
            <img src={personMan} alt="Cliente Calma" className="h-10 w-10 rounded-full border-2 border-background object-cover shadow-soft" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
              <span className="text-foreground font-medium ml-1">4,9</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Más de 12.000 familias liberadas
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
