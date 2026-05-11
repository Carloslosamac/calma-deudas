import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "Rosa Medina",
    age: 46,
    location: "Madrid",
    saved: "28.700 €",
    text: "Después de separarme me quedé sola con dos hijos y cuatro tarjetas que ya no podía pagar. En Calma me escucharon sin juzgarme y acogieron mi caso a la Ley de Segunda Oportunidad. Hoy duermo del tirón por primera vez en años.",
    photo: testimonial1,
  },
  {
    name: "Javier Ortega",
    age: 49,
    location: "Getafe",
    saved: "41.300 €",
    text: "Soy autónomo y con la subida de costes acabé pidiendo préstamos para tapar otros préstamos. Llegué con miedo y me fui con un plan. En 10 meses cancelaron toda mi deuda y he podido seguir trabajando sin embargos.",
    photo: testimonial2,
  },
  {
    name: "Antonio Hernández",
    age: 74,
    location: "Alcalá de Henares",
    saved: "19.800 €",
    text: "Avalé a mi hijo y, cuando él no pudo pagar, los bancos vinieron a por mi pensión. A mi edad pensaba que ya no había nada que hacer. Los abogados de Calma frenaron los embargos y cancelaron la deuda. Recuperé mi pensión y mi tranquilidad.",
    photo: testimonial3,
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
