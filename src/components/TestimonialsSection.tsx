import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "María González",
    handle: "@mariag_libre",
    text: "Calma me ayudó a salir de una deuda de €35,000. En 8 meses estaba completamente libre de deudas.",
    avatar: "/src/assets/avatar-1.jpg"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    handle: "@carlosruiz",
    text: "Pensé que nunca saldría del agujero financiero. Gracias a Calma pude renegociar todas mis deudas.",
    avatar: "/src/assets/avatar-2.jpg"
  },
  {
    id: 3,
    name: "Laura Martín",
    handle: "@laura_martin",
    text: "La Ley de Segunda Oportunidad me devolvió la esperanza. Calma me guió en cada paso del proceso.",
    avatar: "/src/assets/avatar-3.jpg"
  },
  {
    id: 4,
    name: "Roberto Silva",
    handle: "@robertosilva",
    text: "Logré cancelar el 70% de mis deudas siguiendo el plan personalizado que me creó Calma.",
    avatar: "/src/assets/avatar-1.jpg"
  },
  {
    id: 5,
    name: "Ana Jiménez",
    handle: "@anajimenez",
    text: "Increíble cómo analizaron mi situación y encontraron deudas prescritas que ni sabía que tenía.",
    avatar: "/src/assets/avatar-2.jpg"
  },
  {
    id: 6,
    name: "Miguel Torres",
    handle: "@migueltorres",
    text: "En solo 3 meses pasé de deber €28,000 a tener un plan claro para mi libertad financiera.",
    avatar: "/src/assets/avatar-3.jpg"
  },
  {
    id: 7,
    name: "Patricia Vega",
    handle: "@patriciavega",
    text: "El acompañamiento es excepcional. Nunca me sentí sola durante todo el proceso de liberación.",
    avatar: "/src/assets/avatar-1.jpg"
  },
  {
    id: 8,
    name: "Javier López",
    handle: "@javierlopez",
    text: "Rápido, eficaz y sin sorpresas. Calma cumplió todo lo que me prometió desde el primer día.",
    avatar: "/src/assets/avatar-2.jpg"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-w-[320px] mx-4">
    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
      {testimonial.text}
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
          <div className="text-gray-500 text-xs">{testimonial.handle}</div>
        </div>
      </div>
      <div className="text-gray-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-yellow-50 overflow-hidden">
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-medium mb-4 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          "Calma me <span className="text-orange-500">cambió la vida</span>."
        </h2>
        <p className="text-lg text-foreground/70 mb-8">
          Historias reales de personas que recuperaron su libertad financiera.
        </p>
        <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3">
          Comenzar mi liberación
        </Button>
      </div>

      {/* Upper row - scrolls right */}
      <div className="relative mb-8 group">
        <div className="flex animate-scroll-right group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Lower row - scrolls left */}
      <div className="relative group">
        <div className="flex animate-scroll-left group-hover:[animation-play-state:paused]">
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
            <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;