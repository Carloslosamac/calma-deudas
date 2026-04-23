import { motion } from "framer-motion";
import { useLiveCounter, formatNumber } from "@/hooks/useLiveCounter";

const START = new Date("2026-04-01T00:00:00Z");

const StatsSection = () => {
  const families = useLiveCounter({ base: 12_412, startDate: START, perDay: 7, tickMs: 4000 });
  const debt = useLiveCounter({ base: 8_240_000, startDate: START, perDay: 6500, tickMs: 3500 });

  const stats = [
    {
      value: formatNumber(families),
      label: "Familias liberadas",
      sub: "y subiendo cada día",
      live: true,
    },
    {
      value: formatNumber(debt) + " €",
      label: "Deuda cancelada",
      sub: "gestionados legalmente",
      live: true,
    },
    { value: "97 %", label: "Casos con éxito", sub: "tras la valoración inicial" },
    { value: "2 min", label: "Análisis inicial", sub: "100% gratuito y online" },
  ];

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
              className="bg-background p-4 md:p-10 text-center md:text-left"
            >
              <div className="font-poppins text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-foreground tracking-tight mb-2 tabular-nums break-words leading-tight">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground/80 inline-flex items-center gap-2">
                {stat.live && (
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                  </span>
                )}
                <span>{stat.label}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
