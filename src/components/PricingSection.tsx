import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import family from "@/assets/person-family-table.jpg";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative bg-foreground text-background rounded-[2rem] overflow-hidden grid md:grid-cols-2"
        >
          {/* Image side */}
          <div className="relative h-72 md:h-auto md:min-h-[480px] overflow-hidden">
            <img
              src={family}
              alt="Familia española disfrutando una comida juntos sin preocupaciones financieras"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-foreground/90 md:to-foreground" />
            <div className="absolute inset-0 md:hidden bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
          </div>

          {/* Content side */}
          <div className="relative p-10 md:p-14">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
                Empieza hoy
              </p>
              <h2 className="font-poppins text-3xl md:text-4xl font-semibold tracking-tight leading-[1.05] mb-6">
                Tu primer paso
                <br />
                es <span className="text-accent">gratis.</span>
              </h2>
              <p className="text-background/70 leading-relaxed mb-8">
                Análisis legal sin coste. Sólo cobramos si te ayudamos
                a salir de las deudas. Sin sorpresas.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Diagnóstico legal personalizado",
                  "Estrategia adaptada a tu deuda",
                  "Llamada con un abogado experto",
                  "Sin compromiso ni letra pequeña",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={3} />
                    </div>
                    <span className="text-background/90 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full h-12 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-medium shadow-glow"
              >
                Empezar análisis gratuito
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
