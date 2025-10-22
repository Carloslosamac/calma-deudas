import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const formSchema = z.object({
  fullName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  mobile: z.string().min(9, "El móvil debe tener al menos 9 dígitos"),
  debtAmount: z.number().min(0).max(100000),
});

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      mobile: "",
      debtAmount: 5000,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast({
      title: "Solicitud enviada",
      description: "Analizaremos tu situación y te contactaremos pronto.",
    });
    console.log(data);
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          className="rounded-2xl border-0 bg-white/50 text-base focus-visible:ring-2 focus-visible:ring-orange"
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
                          className="rounded-2xl border-0 bg-white/50 text-base focus-visible:ring-2 focus-visible:ring-orange"
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
                          className="rounded-2xl border-0 bg-white/50 text-base focus-visible:ring-2 focus-visible:ring-orange"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="debtAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">
                        Cantidad de deuda: {field.value.toLocaleString('es-ES')}€
                      </FormLabel>
                      <FormControl>
                        <Slider
                          min={0}
                          max={100000}
                          step={1000}
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  variant="orange" 
                  className="w-full h-12 rounded-2xl shadow-lg font-medium mt-6"
                >
                  <ArrowUp className="h-5 w-5 mr-2" />
                  Analizar mi situación
                </Button>
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