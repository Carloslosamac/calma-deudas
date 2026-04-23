import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative bg-foreground text-background rounded-[2rem] p-10 md:p-16 overflow-hidden"
        >
          {/* Decorative orb */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-4">
                Empieza hoy
              </p>
              <h2 className="font-poppins text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-6">
                Tu primer paso
                <br />
                es <span className="text-accent">gratis.</span>
              </h2>
              <p className="text-background/70 text-lg leading-relaxed">
                Análisis legal sin coste. Sólo cobramos si te ayudamos
                a salir de las deudas. Sin sorpresas.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Diagnóstico legal personalizado",
                "Estrategia adaptada a tu deuda",
                "Llamada con un abogado experto",
                "Sin compromiso ni letra pequeña",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-foreground" strokeWidth={3} />
                  </div>
                  <span className="text-background/90">{item}</span>
                </div>
              ))}

              <Button
                onClick={() => document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-6 w-full h-14 rounded-2xl bg-accent text-foreground hover:bg-accent/90 text-base font-medium shadow-glow"
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
