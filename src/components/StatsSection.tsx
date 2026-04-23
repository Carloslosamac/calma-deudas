import { motion } from "framer-motion";

const stats = [
  { value: "12.400+", label: "Familias liberadas", sub: "desde 2019" },
  { value: "8 M €", label: "Deuda cancelada", sub: "gestionados legalmente" },
  { value: "97 %", label: "Casos con éxito", sub: "tras la valoración inicial" },
  { value: "2 min", label: "Análisis inicial", sub: "100% gratuito y online" },
];

const StatsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-6 md:p-10 text-center md:text-left"
            >
              <div className="font-poppins text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground/80">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
