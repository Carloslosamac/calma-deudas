import { motion } from "framer-motion";
import { ClipboardList, Scale, Sparkles } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Cuéntanos tu situación",
    desc: "Responde un breve cuestionario sobre tus deudas. Sin papeleo, sin DNI, sin compromiso.",
  },
  {
    icon: Scale,
    number: "02",
    title: "Diseñamos tu estrategia legal",
    desc: "Nuestros abogados analizan tu caso y eligen la vía óptima: Segunda Oportunidad, renegociación o prescripción.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Recuperas tu calma",
    desc: "Ejecutamos el plan y te acompañamos hasta que vives, oficialmente, sin deudas.",
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
              className="relative bg-surface rounded-3xl p-8 border border-border hover:border-accent/50 hover:shadow-medium transition-all group"
            >
              <div className="flex items-start justify-between mb-12">
                <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <step.icon className="h-6 w-6 text-accent-deep" />
                </div>
                <span className="font-poppins text-5xl font-bold text-foreground/10 group-hover:text-accent/40 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="font-poppins text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
