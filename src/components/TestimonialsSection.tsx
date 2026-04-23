import { motion } from "framer-motion";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const testimonials = [
  {
    name: "María González",
    location: "Madrid",
    saved: "32.500 €",
    text: "Pensé que no había salida. En 8 meses estaba completamente libre de deudas gracias a la Ley de Segunda Oportunidad.",
    avatar: avatar1,
  },
  {
    name: "Carlos Ruiz",
    location: "Valencia",
    saved: "18.200 €",
    text: "Renegociaron todas mis tarjetas y préstamos. Ahora pago una cuota que sí puedo asumir.",
    avatar: avatar2,
  },
  {
    name: "Laura Martín",
    location: "Sevilla",
    saved: "45.000 €",
    text: "Profesionales, cercanos y rápidos. Me devolvieron la tranquilidad que llevaba años sin tener.",
    avatar: avatar3,
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
              className="bg-surface border border-border rounded-3xl p-7 flex flex-col hover:shadow-large hover:border-accent/40 transition-all"
            >
              <div className="mb-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                  Deuda eliminada
                </div>
                <div className="font-poppins text-4xl font-bold text-accent-deep tracking-tight">
                  {t.saved}
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6 flex-1">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <div className="font-medium text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
                <div className="ml-auto flex text-amber-500 text-sm">★★★★★</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
