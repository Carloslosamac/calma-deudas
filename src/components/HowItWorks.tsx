import { motion } from "framer-motion";
import { ClipboardList, Scale, Sparkles } from "lucide-react";
import stepForm from "@/assets/step-form.jpg";
import stepStrategy from "@/assets/step-strategy.jpg";
import stepFreedom from "@/assets/step-freedom.jpg";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Cuéntanos tu situación",
    desc: "Responde un breve cuestionario sobre tus deudas. Sin papeleo, sin DNI, sin compromiso.",
    image: stepForm,
    imageAlt: "Mujer rellenando el cuestionario en su móvil desde casa",
  },
  {
    icon: Scale,
    number: "02",
    title: "Diseñamos tu estrategia legal",
    desc: "Nuestros abogados analizan tu caso y eligen la vía óptima: Segunda Oportunidad, renegociación o prescripción.",
    image: stepStrategy,
    imageAlt: "Abogados analizando el caso en el despacho",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Recuperas tu calma",
    desc: "Ejecutamos el plan y te acompañamos hasta que vives, oficialmente, sin deudas.",
    image: stepFreedom,
    imageAlt: "Pareja en calma en casa después de cancelar sus deudas",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-deep font-medium mb-4">
            Cómo funciona
          </p>
          <h2 className="font-poppins text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            Tres pasos para recuperar
            <br />
            <span className="text-muted-foreground">tu libertad financiera.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-surface rounded-3xl border border-border hover:border-accent/50 hover:shadow-medium transition-all group overflow-hidden flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-muted">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-transparent" />
                <span className="absolute top-4 right-5 font-poppins text-5xl font-bold text-background/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  {step.number}
                </span>
                <div className="absolute bottom-4 left-4 h-12 w-12 rounded-2xl bg-background/95 backdrop-blur-sm flex items-center justify-center shadow-medium">
                  <step.icon className="h-6 w-6 text-accent-deep" />
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-poppins text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
