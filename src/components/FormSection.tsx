import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, Lock, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  debt_amount: z.string().min(1, "Selecciona una opción"),
  loan_number: z.string().min(1, "Selecciona una opción"),
  default: z.string().min(1, "Selecciona una opción"),
  fullName: z.string().trim().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(9, "Teléfono inválido").max(20),
});

type FormValues = z.infer<typeof formSchema>;

const stepConfig = [
  {
    field: "debt_amount" as const,
    label: "¿Cuánto debes en total?",
    options: [
      { value: "7500", label: "Entre 5.000 € y 10.000 €" },
      { value: "15000", label: "Entre 10.000 € y 20.000 €" },
      { value: "30000", label: "Más de 20.000 €" },
    ],
  },
  {
    field: "loan_number" as const,
    label: "¿Con cuántas entidades?",
    options: [
      { value: "1", label: "Solo 1 entidad" },
      { value: "3", label: "Entre 2 y 4" },
      { value: "6", label: "Más de 5" },
    ],
  },
  {
    field: "default" as const,
    label: "¿Estás ya en impago con alguna?",
    options: [
      { value: "si", label: "Sí, estoy en impago" },
      { value: "no", label: "No, aún estoy al día" },
    ],
  },
];

const FormSection = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      debt_amount: "",
      loan_number: "",
      default: "",
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const totalSteps = stepConfig.length + 1;

  const handleSelect = (field: keyof FormValues, value: string) => {
    form.setValue(field, value);
    setTimeout(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), 250);
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("pipedrive-lead", { body: data });
      if (error) throw error;
      toast({
        title: "¡Solicitud recibida!",
        description: "Te llamaremos en breve para analizar tu caso.",
      });
      form.reset();
      setStep(0);
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Inténtalo de nuevo en unos minutos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="hero-form" className="py-24 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-12 items-center">
        {/* Left content */}
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-deep font-medium mb-4">
            Análisis gratuito
          </p>
          <h2 className="font-poppins text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05] mb-6">
            Descubre tu solución
            <br />
            <span className="text-accent-deep">en 2 minutos.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sin DNI. Sin compromiso. Solo respuestas claras sobre cómo salir
            de tus deudas legalmente.
          </p>

          <div className="space-y-3">
            {[
              "Diagnóstico legal personalizado",
              "Estrategia adaptada a tu caso",
              "Te llamamos en menos de 24h",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="h-3.5 w-3.5 text-foreground" strokeWidth={3} />
                </div>
                <span className="text-foreground/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Tus datos están protegidos según RGPD
          </div>
        </div>

        {/* Right form card */}
        <div className="lg:col-span-3">
          <div className="bg-surface-elevated border border-border rounded-3xl shadow-large p-6 md:p-10 backdrop-blur-sm">
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Paso {step + 1} de {totalSteps}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step ? "w-8 bg-accent" : i < step ? "w-1.5 bg-accent" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step < stepConfig.length && (
                    <motion.div
                      key={`step-${step}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FormField
                        control={form.control}
                        name={stepConfig[step].field}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-poppins text-2xl md:text-3xl font-semibold text-foreground block mb-6">
                              {stepConfig[step].label}
                            </FormLabel>
                            <FormControl>
                              <div className="space-y-3">
                                {stepConfig[step].options.map((opt) => (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => handleSelect(stepConfig[step].field, opt.value)}
                                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                                      field.value === opt.value
                                        ? "border-accent bg-accent/10"
                                        : "border-border bg-background hover:border-accent/50 hover:bg-surface"
                                    }`}
                                  >
                                    <span className="font-medium text-foreground">{opt.label}</span>
                                    <ArrowRight
                                      className={`h-5 w-5 transition-all ${
                                        field.value === opt.value
                                          ? "text-accent-deep translate-x-0"
                                          : "text-muted-foreground -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {step === stepConfig.length && (
                    <motion.div
                      key="contact-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-2">
                          Último paso
                        </h3>
                        <p className="text-muted-foreground">
                          Te enviamos tu análisis personalizado y te llamamos sin compromiso.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-muted-foreground">Nombre completo</FormLabel>
                            <FormControl>
                              <Input placeholder="María González" {...field} className="h-12 rounded-xl border-border bg-background" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-muted-foreground">Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="maria@ejemplo.com" {...field} className="h-12 rounded-xl border-border bg-background" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm text-muted-foreground">Teléfono</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="612 345 678" {...field} className="h-12 rounded-xl border-border bg-background" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-14 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-base font-medium shadow-medium"
                      >
                        {submitting ? "Enviando..." : "Recibir mi análisis gratuito"}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
