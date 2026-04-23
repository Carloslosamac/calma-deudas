import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  PhoneOff,
  ShieldCheck,
  Ban,
  Building2,
  UserCheck,
  FileX,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Cancelación total de deudas",
    short: "Hasta el 100%",
    description:
      "Eliminamos íntegramente tus deudas con bancos, financieras y particulares mediante el procedimiento legal.",
    stat: "100%",
    statLabel: "deuda eliminada",
  },
  {
    icon: PhoneOff,
    title: "Fin de las llamadas de cobro",
    short: "Paralización inmediata",
    description:
      "Desde el primer momento paralizamos las llamadas, cartas y presiones de los recobradores.",
    stat: "0",
    statLabel: "llamadas al día",
  },
  {
    icon: ShieldCheck,
    title: "Protección de avalistas",
    short: "Familia a salvo",
    description:
      "Tu pareja, padres o familiares avalistas también quedan protegidos del embargo.",
    stat: "100%",
    statLabel: "avalistas protegidos",
  },
  {
    icon: Ban,
    title: "Suspensión de embargos",
    short: "Tu nómina, intacta",
    description:
      "Detenemos los embargos en nómina, cuentas bancarias y bienes desde el inicio del proceso.",
    stat: "0 €",
    statLabel: "embargado al mes",
  },
  {
    icon: Building2,
    title: "Hacienda y Seguridad Social",
    short: "Deudas públicas incluidas",
    description:
      "Negociamos también deudas con Hacienda y Seguridad Social hasta los límites permitidos por ley.",
    stat: "10.000 €",
    statLabel: "máximo por ley",
  },
  {
    icon: FileX,
    title: "Salida de ASNEF",
    short: "Vuelve a tener crédito",
    description:
      "Cancelamos tus datos en ficheros de morosidad como ASNEF, RAI o Badexcug al finalizar el proceso.",
    stat: "1",
    statLabel: "vez para siempre",
  },
  {
    icon: UserCheck,
    title: "Sin coste si no se cancela",
    short: "Garantía total",
    description:
      "Si no conseguimos eliminar tu deuda, no pagas nada. Trabajamos a éxito.",
    stat: "0 €",
    statLabel: "si no funciona",
  },
];

const BenefitsSection = () => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const Active = benefits[active].icon;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % benefits.length);
    }, 3500);
    return () => clearInterval(id);
  }, [isPaused]);

  const handleSelect = (i: number) => {
    setActive(i);
    setIsPaused(true);
  };

  const scrollToForm = () => {
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="beneficios" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-deep font-medium mb-4">
            Lo que conseguimos por ti
          </p>
          <h2 className="font-poppins text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            7 beneficios reales de la
            <br />
            <span className="text-muted-foreground">Ley de Segunda Oportunidad.</span>
          </h2>
        </div>

        {/* Interactive layout */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10 items-stretch"
        >
          {/* Left: clickable list */}
          <div className="flex flex-col gap-2">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              const isActive = i === active;
              return (
                <button
                  key={b.title}
                  onClick={() => handleSelect(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative overflow-hidden text-left rounded-2xl border transition-all duration-300 px-5 py-4 flex items-center gap-4 ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-lg"
                      : "bg-surface border-border hover:border-accent/60 hover:bg-surface-elevated"
                  }`}
                >
                  {isActive && !isPaused && (
                    <motion.div
                      key={`progress-${i}-${active}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-0.5 bg-accent"
                    />
                  )}
                  <div
                    className={`shrink-0 h-11 w-11 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "bg-accent-soft text-accent-deep"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm md:text-base leading-tight ${isActive ? "text-background" : "text-foreground"}`}>
                      {b.title}
                    </div>
                    <div className={`text-xs mt-0.5 ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
                      {b.short}
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-all ${
                      isActive
                        ? "opacity-100 translate-x-0 text-background"
                        : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: dynamic visual card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-accent-soft via-background to-surface border border-border overflow-hidden min-h-[480px] flex items-center justify-center p-10">
            {/* Decorative orbs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent-soft/60 blur-3xl pointer-events-none" />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10 text-center max-w-md"
              >
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-foreground text-background mb-8 shadow-xl">
                  <Active className="h-9 w-9" strokeWidth={1.8} />
                </div>

                <div className="font-poppins text-7xl md:text-8xl font-bold tracking-tighter text-foreground leading-none mb-2 tabular-nums">
                  {benefits[active].stat}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
                  {benefits[active].statLabel}
                </div>

                <h3 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                  {benefits[active].title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {benefits[active].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {benefits.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  aria-label={`Ver beneficio ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-6 bg-foreground" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-foreground text-background">
          <div className="flex items-center gap-4">
            <Sparkles className="h-6 w-6 text-accent shrink-0" />
            <div>
              <div className="font-poppins text-xl font-semibold leading-tight">
                ¿Cumples los requisitos para acceder a estos beneficios?
              </div>
              <div className="text-background/70 text-sm mt-1">
                Análisis gratuito en 2 minutos. Sin compromiso.
              </div>
            </div>
          </div>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="h-12 px-7 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium shrink-0"
          >
            Comprobar mi caso
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;