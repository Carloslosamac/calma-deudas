import { motion } from "framer-motion";
import womanWalking from "@/assets/person-woman-walking.jpg";
import couple from "@/assets/person-couple-sofa.jpg";
import manPortrait from "@/assets/person-man-portrait.jpg";

const testimonials = [
  {
    name: "María González",
    age: 38,
    location: "Madrid",
    saved: "32.500 €",
    text: "Pensé que no había salida. En 8 meses estaba completamente libre de deudas gracias a la Ley de Segunda Oportunidad.",
    photo: womanWalking,
  },
  {
    name: "Carlos y Marta",
    age: 47,
    location: "Valencia",
    saved: "18.200 €",
    text: "Renegociaron todas nuestras tarjetas y préstamos. Ahora pagamos una cuota que sí podemos asumir, juntos.",
    photo: couple,
  },
  {
    name: "Javier Ruiz",
    age: 52,
    location: "Sevilla",
    saved: "45.000 €",
    text: "Profesionales, cercanos y rápidos. Me devolvieron la tranquilidad que llevaba años sin tener.",
    photo: manPortrait,
  },
];

const TestimonialsSection = () => {
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

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-surface border border-border rounded-3xl overflow-hidden flex flex-col hover:shadow-large hover:border-accent/40 transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={t.photo}
                  alt={`${t.name}, cliente de Calma en ${t.location}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-background">
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-0.5">
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
                    <div className="font-medium text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.age} años · {t.location}
                    </div>
                  </div>
                  <div className="flex text-amber-500 text-sm">★★★★★</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
