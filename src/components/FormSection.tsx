import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  ArrowRight,
  Lock,
  Check,
  Banknote,
  CreditCard,
  Smartphone,
  Landmark,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { scrollToForm } from "@/lib/seo/scrollToForm";
import { triage, type Housing, type Vehicle } from "@/lib/seo/triage";

const eur = (n: number) => n.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";

const ENTITY_OPTIONS = [
  { value: "prestamos", label: "Préstamos", icon: Banknote },
  { value: "tarjetas", label: "Tarjetas", icon: CreditCard },
  { value: "microcreditos", label: "Microcréditos", icon: Smartphone },
  { value: "hacienda", label: "Hacienda", icon: Landmark },
  { value: "seguridad_social", label: "Seguridad Social", icon: ShieldCheck },
] as const;

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Mínimo 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(9, "Teléfono inválido").max(20),
});

type ContactValues = z.infer<typeof formSchema>;

type Diagnosis = {
  debtAmount: number;
  isDefault: boolean | null;
  entities: string[];
  housing: Housing | "";
  mortgagePaid: number;
  vehicle: Vehicle | "";
  vehicleValue: number;
  vehiclePaid: number;
};

const initialDiagnosis: Diagnosis = {
  debtAmount: 14000,
  isDefault: null,
  entities: [],
  housing: "",
  mortgagePaid: 30000,
  vehicle: "",
  vehicleValue: 8000,
  vehiclePaid: 5000,
};

type StepKey =
  | "debt"
  | "default"
  | "entities"
  | "housing"
  | "mortgagePaid"
  | "vehicle"
  | "vehicleValue"
  | "vehiclePaid"
  | "contact";

const FormSection = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [data, setData] = useState<Diagnosis>(initialDiagnosis);

  const form = useForm<ContactValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", phone: "" },
  });

  // Secuencia dinámica de pasos según las respuestas.
  const steps = useMemo<StepKey[]>(() => {
    const s: StepKey[] = ["debt", "default", "entities", "housing"];
    if (data.housing === "hipoteca") s.push("mortgagePaid");
    s.push("vehicle");
    if (data.vehicle === "propiedad") s.push("vehicleValue");
    if (data.vehicle === "financiado") s.push("vehiclePaid");
    s.push("contact");
    return s;
  }, [data.housing, data.vehicle]);

  const totalSteps = steps.length;
  const currentKey = steps[Math.min(step, totalSteps - 1)];

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));

  const selectAndAdvance = <K extends keyof Diagnosis>(key: K, value: Diagnosis[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setTimeout(goNext, 250);
  };

  const toggleEntity = (value: string) => {
    setData((d) => ({
      ...d,
      entities: d.entities.includes(value)
        ? d.entities.filter((e) => e !== value)
        : [...d.entities, value],
    }));
  };

  const onSubmit = async (contact: ContactValues) => {
    setSubmitting(true);
    try {
      const payload = {
        // Campos que el edge function ya entiende
        debt_amount: String(data.debtAmount),
        loan_number: String(data.entities.length || 1),
        default: data.isDefault ? "si" : "no",
        fullName: contact.fullName,
        email: contact.email,
        phone: contact.phone,
        // Datos nuevos (se conectarán a campos del CRM más adelante)
        entities: data.entities,
        housing: data.housing,
        mortgage_paid: data.housing === "hipoteca" ? data.mortgagePaid : null,
        vehicle: data.vehicle,
        vehicle_value: data.vehicle === "propiedad" ? data.vehicleValue : null,
        vehicle_paid: data.vehicle === "financiado" ? data.vehiclePaid : null,
      };
      const { error } = await supabase.functions.invoke("pipedrive-lead", { body: payload });
      if (error) throw error;
      setShowResult(true);
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

  const result = useMemo(
    () =>
      triage({
        debtAmount: data.debtAmount,
        isDefault: data.isDefault === true,
        entities: data.entities,
        housing: data.housing,
        mortgagePaid: data.mortgagePaid,
        vehicle: data.vehicle,
        vehicleValue: data.vehicleValue,
        vehiclePaid: data.vehiclePaid,
      }),
    [data],
  );

  const optionBtn = (active: boolean) =>
    `w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
      active
        ? "border-accent bg-accent/10"
        : "border-border bg-background hover:border-accent/50 hover:bg-surface"
    }`;

  const QuestionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-6">
      {children}
    </h3>
  );

  const ContinueButton = ({ disabled }: { disabled?: boolean }) => (
    <Button
      type="button"
      onClick={goNext}
      disabled={disabled}
      className="mt-8 w-full h-14 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-base font-medium shadow-medium"
    >
      Continuar
      <ArrowRight className="h-5 w-5 ml-2" />
    </Button>
  );

  const SliderStep = ({
    title,
    valueKey,
    min,
    max,
    stepSize,
  }: {
    title: string;
    valueKey: "debtAmount" | "mortgagePaid" | "vehicleValue" | "vehiclePaid";
    min: number;
    max: number;
    stepSize: number;
  }) => (
    <div>
      <QuestionTitle>{title}</QuestionTitle>
      <div className="rounded-2xl border border-border bg-background p-6">
        <p className="text-center font-poppins text-4xl font-bold text-accent-deep mb-6">
          {eur(data[valueKey])}
          {data[valueKey] >= max ? "+" : ""}
        </p>
        <Slider
          value={[data[valueKey]]}
          min={min}
          max={max}
          step={stepSize}
          onValueChange={(v) => setData((d) => ({ ...d, [valueKey]: v[0] }))}
        />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>{eur(min)}</span>
          <span>{eur(max)}+</span>
        </div>
      </div>
      <ContinueButton />
    </div>
  );

  const renderStep = () => {
    switch (currentKey) {
      case "debt":
        return (
          <SliderStep title="¿Cuánto debes en total?" valueKey="debtAmount" min={3000} max={80000} stepSize={500} />
        );
      case "default":
        return (
          <div>
            <QuestionTitle>¿Estás ya en impago con alguna deuda?</QuestionTitle>
            <div className="space-y-3">
              {[
                { v: true, label: "Sí, estoy en impago" },
                { v: false, label: "No, aún estoy al día" },
              ].map((opt) => (
                <button
                  key={String(opt.v)}
                  type="button"
                  onClick={() => selectAndAdvance("isDefault", opt.v)}
                  className={optionBtn(data.isDefault === opt.v)}
                >
                  <span className="font-medium text-foreground">{opt.label}</span>
                  <ArrowRight className="h-5 w-5 text-accent-deep opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        );
      case "entities":
        return (
          <div>
            <QuestionTitle>¿Qué tipo de deudas tienes?</QuestionTitle>
            <p className="-mt-4 mb-6 text-sm text-muted-foreground">Puedes elegir varias.</p>
            <div className="grid grid-cols-2 gap-3">
              {ENTITY_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = data.entities.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleEntity(opt.value)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                      active
                        ? "border-accent bg-accent/10"
                        : "border-border bg-background hover:border-accent/50"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        active ? "bg-accent text-accent-foreground" : "bg-surface text-muted-foreground"
                      }`}
                    >
                      {active ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span className="text-sm font-medium text-foreground text-left">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <ContinueButton disabled={data.entities.length === 0} />
          </div>
        );
      case "housing":
        return (
          <div>
            <QuestionTitle>¿Cuál es tu situación de vivienda?</QuestionTitle>
            <div className="space-y-3">
              {[
                { v: "propiedad" as Housing, label: "En propiedad (pagada)" },
                { v: "hipoteca" as Housing, label: "Con hipoteca" },
                { v: "alquiler" as Housing, label: "De alquiler" },
              ].map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => selectAndAdvance("housing", opt.v)}
                  className={optionBtn(data.housing === opt.v)}
                >
                  <span className="font-medium text-foreground">{opt.label}</span>
                  <ArrowRight className="h-5 w-5 text-accent-deep opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        );
      case "mortgagePaid":
        return (
          <SliderStep title="¿Cuánto llevas pagado de la hipoteca?" valueKey="mortgagePaid" min={0} max={300000} stepSize={5000} />
        );
      case "vehicle":
        return (
          <div>
            <QuestionTitle>¿Y tu vehículo?</QuestionTitle>
            <div className="space-y-3">
              {[
                { v: "propiedad" as Vehicle, label: "En propiedad (pagado)" },
                { v: "financiado" as Vehicle, label: "Financiado" },
              ].map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => selectAndAdvance("vehicle", opt.v)}
                  className={optionBtn(data.vehicle === opt.v)}
                >
                  <span className="font-medium text-foreground">{opt.label}</span>
                  <ArrowRight className="h-5 w-5 text-accent-deep opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        );
      case "vehicleValue":
        return (
          <SliderStep title="¿Valor estimado de tu vehículo?" valueKey="vehicleValue" min={0} max={60000} stepSize={1000} />
        );
      case "vehiclePaid":
        return (
          <SliderStep title="¿Cuánto llevas pagado del vehículo?" valueKey="vehiclePaid" min={0} max={60000} stepSize={1000} />
        );
      case "contact":
        return (
          <div className="space-y-5">
            <div>
              <h3 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Ya casi está
              </h3>
              <p className="text-muted-foreground">
                Déjanos tus datos y verás tu diagnóstico al instante. Te llamamos sin compromiso.
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
              {submitting ? "Analizando..." : "Ver mi diagnóstico"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        );
      default:
        return null;
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
            {showResult ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 text-accent-deep mb-4">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs font-medium uppercase tracking-wider">Tu diagnóstico orientativo</span>
                </div>
                <h3 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-3">
                  {result.title}
                </h3>
                <p className="text-muted-foreground mb-6">{result.description}</p>
                <ul className="space-y-3 mb-8">
                  {result.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-foreground font-medium">
                    Hemos recibido tu caso. Te llamamos en menos de 24h para confirmar tu mejor opción.
                  </p>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Esta es una orientación automática basada en tus respuestas. El diagnóstico definitivo lo realiza
                  nuestro equipo legal sin compromiso.
                </p>
              </motion.div>
            ) : (
              <>
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
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentKey}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        {renderStep()}
                      </motion.div>
                    </AnimatePresence>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
