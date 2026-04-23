import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import womanWalking from "@/assets/person-woman-walking.jpg";
import manPortrait from "@/assets/person-man-portrait.jpg";
import womanWindow from "@/assets/person-woman-window.jpg";
import closeupWoman1 from "@/assets/person-closeup-woman-1.jpg";
import closeupMan1 from "@/assets/person-closeup-man-1.jpg";
import closeupWoman2 from "@/assets/person-closeup-woman-2.jpg";
import closeupMan2 from "@/assets/person-closeup-man-2.jpg";
import closeupWoman3 from "@/assets/person-closeup-woman-3.jpg";
import closeupMan3 from "@/assets/person-closeup-man-3.jpg";

const testimonials = [
  {
    name: "María González",
    age: 38,
    location: "Madrid",
    saved: "32.500 €",
    text: "Pensé que no había salida. En 8 meses estaba completamente libre de deudas gracias a la Ley de Segunda Oportunidad.",
    photo: closeupWoman1,
  },
  {
    name: "Carlos Jiménez",
    age: 47,
    location: "Valencia",
    saved: "18.200 €",
    text: "Renegociaron todas mis tarjetas y préstamos. Ahora pago una cuota que sí puedo asumir cada mes.",
    photo: closeupMan1,
  },
  {
    name: "Javier Ruiz",
    age: 52,
    location: "Sevilla",
    saved: "45.000 €",
    text: "Profesionales, cercanos y rápidos. Me devolvieron la tranquilidad que llevaba años sin tener.",
    photo: manPortrait,
  },
  {
    name: "Ana Martínez",
    age: 44,
    location: "Barcelona",
    saved: "27.800 €",
    text: "Tras el cierre de mi negocio quedé con una deuda enorme. Hoy he vuelto a empezar, sin miedo y sin cargas.",
    photo: closeupWoman2,
  },
  {
    name: "David Fernández",
    age: 35,
    location: "Bilbao",
    saved: "21.400 €",
    text: "Pensaba que era el único en esta situación. Su equipo me trató con mucho respeto desde la primera llamada.",
    photo: closeupMan2,
  },
  {
    name: "Lucía Romero",
    age: 41,
    location: "Málaga",
    saved: "39.600 €",
    text: "Me explicaron paso a paso qué iba a pasar. Cero sorpresas, cero letra pequeña. Recomendable al 100%.",
    photo: womanWalking,
  },
  {
    name: "Elena Vargas",
    age: 36,
    location: "Zaragoza",
    saved: "16.900 €",
    text: "En menos de una semana ya tenía un plan claro. Es la mejor decisión que he tomado en años.",
    photo: closeupWoman3,
  },
  {
    name: "Miguel Ángel Castro",
    age: 54,
    location: "Murcia",
    saved: "52.100 €",
    text: "Llevaba años pagando intereses sin reducir capital. Ahora por fin he cerrado esa etapa de mi vida.",
    photo: closeupMan3,
  },
  {
    name: "Patricia López",
    age: 48,
    location: "Granada",
    saved: "34.300 €",
    text: "Siempre disponibles para resolver mis dudas. Sentí que había alguien de mi lado en todo momento.",
    photo: womanWindow,
  },
];

const TestimonialsSection = () => {
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section id="testimonios" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-deep font-medium mb-4">
            Casos reales
          </p>
          <h2 className="font-poppins text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            Historias de personas
            <br />
            <span className="text-muted-foreground">que ya viven sin deudas.</span>
          </h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.name}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <article className="group bg-surface border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-large hover:border-accent/40 transition-all">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={t.photo}
                      alt={`${t.name}, cliente de Calma en ${t.location}`}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-background">
                      <div className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-1">
                        Deuda eliminada
                      </div>
                      <div className="font-poppins text-3xl font-bold tracking-tight">
                        {t.saved}
                      </div>
                    </div>
                  </div>

                  <div className="p-7 flex flex-col flex-1">
                    <p className="text-foreground/80 leading-relaxed mb-6 flex-1">
                      "{t.text}"
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-border">
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {t.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t.age} años · {t.location}
                        </div>
                      </div>
                      <div className="flex text-amber-500 text-sm">★★★★★</div>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 h-10 w-10 bg-background border-border" />
          <CarouselNext className="hidden md:flex -right-4 lg:-right-12 h-10 w-10 bg-background border-border" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
