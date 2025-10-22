import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const formSchema = z.object({
  debt_amount: z.string().min(1, "Selecciona una opción"),
  loan_number: z.string().min(1, "Selecciona una opción"),
  default: z.string().min(1, "Selecciona una opción"),
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  mobile: z.string().min(9, "El móvil debe tener al menos 9 dígitos"),
});

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      debt_amount: "",
      loan_number: "",
      default: "",
      fullName: "",
      phone: "",
      mobile: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast({
      title: "Solicitud enviada",
      description: "Analizaremos tu situación y te contactaremos pronto.",
    });
    console.log(data);
  };

  const handleStepChange = (value: string, fieldName: string) => {
    form.setValue(fieldName as any, value);
    // Auto-advance to next step after a short delay for visual feedback
    setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const fullTypewriterText = "Gratis, rápido y sin compromiso.";

  const startTypewriter = () => {
    if (hasAnimated) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTypewriterText("");
    let currentIndex = 0;
    timerRef.current = setInterval(() => {
      if (currentIndex <= fullTypewriterText.length) {
        setTypewriterText(fullTypewriterText.slice(0, currentIndex));
        currentIndex++;
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setHasAnimated(true);
      }
    }, 100);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTypewriter();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (typewriterRef.current) {
      observer.observe(typewriterRef.current);
    }

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);


  return (
    <section className="relative min-h-screen bg-gradient-hero animate-sky-drift pt-32 overflow-hidden flex flex-col" style={{ backgroundSize: '200% 200%' }}>
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-8">
          <h1 className="mb-6 text-4xl sm:text-5xl leading-[1.1] text-foreground font-medium tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <div className="text-center">
              <div className="sm:hidden">
                <div>Te ayudamos a</div>
                <div>vivir <span className="text-accent">sin deudas.</span></div>
              </div>
              <div className="hidden sm:block">
                Te ayudamos a vivir <span className="text-accent">sin deudas.</span>
              </div>
            </div>
            <div className="text-3xl sm:text-4xl mt-1 text-center">Ahora mismo.</div>
          </h1>
          
          <div className="mb-8 text-base sm:text-lg text-foreground/80">
            <p className="mb-3">
              Calma analiza tu situación financiera y te propone una solución adaptada en minutos.
            </p>
            <p ref={typewriterRef} className="text-foreground/80">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="bg-gradient-card backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-2xl border border-white/20">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 1 && (
                  <FormField
                    control={form.control}
                    name="debt_amount"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-foreground text-xl font-medium block text-center">
                          ¿Cuánto debes?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => handleStepChange(value, "debt_amount")}
                            value={field.value}
                            className="space-y-3"
                          >
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "7500" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="7500" className="sr-only" />
                              <span className="font-medium">Entre 5.000€ y 10.000€</span>
                            </label>
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "15000" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="15000" className="sr-only" />
                              <span className="font-medium">Entre 10.000€ y 20.000€</span>
                            </label>
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "30000" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="30000" className="sr-only" />
                              <span className="font-medium">Más de 20.000€</span>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {currentStep === 2 && (
                  <FormField
                    control={form.control}
                    name="loan_number"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-foreground text-xl font-medium block text-center">
                          ¿Con cuántas entidades?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => handleStepChange(value, "loan_number")}
                            value={field.value}
                            className="space-y-3"
                          >
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "1" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="1" className="sr-only" />
                              <span className="font-medium">Solo 1</span>
                            </label>
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "3" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="3" className="sr-only" />
                              <span className="font-medium">Entre 2 y 4</span>
                            </label>
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "6" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="6" className="sr-only" />
                              <span className="font-medium">Más de 5</span>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {currentStep === 3 && (
                  <FormField
                    control={form.control}
                    name="default"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-foreground text-xl font-medium block text-center">
                          ¿Estás en impago ya con alguna?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => handleStepChange(value, "default")}
                            value={field.value}
                            className="space-y-3"
                          >
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "si" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="si" className="sr-only" />
                              <span className="font-medium">Sí</span>
                            </label>
                            <label className={`flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all border-2 active:scale-95 ${
                              field.value === "no" 
                                ? "bg-[#d6f2ad] text-black border-[#d6f2ad]" 
                                : "bg-white/50 text-foreground border-white/20 hover:border-accent/50"
                            }`}>
                              <RadioGroupItem value="no" className="sr-only" />
                              <span className="font-medium">No</span>
                            </label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">Nombre completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Tu nombre completo" 
                              {...field}
                              className="rounded-2xl border-0 bg-white/50 text-base focus-visible:ring-2 focus-visible:ring-accent"
                            />
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
                          <FormLabel className="text-foreground/80">Teléfono</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Tu teléfono" 
                              {...field}
                              className="rounded-2xl border-0 bg-white/50 text-base focus-visible:ring-2 focus-visible:ring-accent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">Móvil</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Tu móvil" 
                              {...field}
                              className="rounded-2xl border-0 bg-white/50 text-base focus-visible:ring-2 focus-visible:ring-accent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="flex gap-3 mt-8">
                    <Button 
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="h-12 rounded-2xl font-medium bg-white/50 border-white/20"
                    >
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Atrás
                    </Button>
                    
                    <Button 
                      type="submit"
                      variant="orange" 
                      className="flex-1 h-12 rounded-2xl shadow-lg font-medium"
                    >
                      Analizar mi situación
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                )}

                {currentStep < 4 && currentStep > 1 && (
                  <div className="flex justify-center mt-8">
                    <Button 
                      type="button"
                      onClick={handleBack}
                      variant="ghost"
                      className="text-foreground/60 hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Atrás
                    </Button>
                  </div>
                )}

                <div className="flex justify-center gap-2 mt-4">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-2 w-2 rounded-full transition-all ${
                        step === currentStep ? "bg-accent w-8" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </form>
            </Form>
          </div>

          <div className="flex items-center justify-center gap-3 text-foreground/70">
            <div className="flex -space-x-2">
              <img src={avatar1} alt="User avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              <img src={avatar2} alt="User avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              <img src={avatar3} alt="User avatar" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
            </div>
            <span className="text-sm">Confiado por más de 400K usuarios</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;