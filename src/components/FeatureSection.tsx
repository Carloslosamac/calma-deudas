import { motion } from "framer-motion";
import { Scale, FileText, Users, Clock, ShieldCheck, TrendingDown } from "lucide-react";

const features = [
  {
    icon: Scale,
    title: "Ley Segunda Oportunidad",
    desc: "Cancela hasta el 100% de tus deudas si cumples los requisitos legales.",
    span: "md:col-span-2 md:row-span-2",
    highlight: true,
  },
  {
    icon: TrendingDown,
    title: "Renegociación",
    desc: "Reducimos cuotas e intereses con tus acreedores.",
  },
  {
    icon: FileText,
    title: "Prescripción de deudas",
    desc: "Detectamos deudas caducadas que ya no tienes que pagar.",
  },
  {
    icon: Users,
    title: "Abogados expertos",
    desc: "Un equipo especializado lleva tu caso de principio a fin.",
    span: "md:col-span-2",
  },
  {
    icon: Clock,
    title: "Respuesta en 24h",
    desc: "Sabrás si podemos ayudarte en menos de un día.",
  },
  {
    icon: ShieldCheck,
    title: "100% confidencial",
    desc: "Tus datos están protegidos según el RGPD.",
  },
];

const FeatureSection = () => {
  return (
    <section id="soluciones" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-deep font-medium mb-4">
            Soluciones
          </p>
          <h2 className="font-poppins text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05] mb-6">
            Una vía legal
            <br />
            <span className="text-muted-foreground">para cada situación.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            No aplicamos una receta única. Estudiamos tu caso y elegimos
            la combinación de soluciones legales que <span className="text-foreground font-medium">mejor encaja contigo</span>:
            desde la Ley de Segunda Oportunidad hasta la renegociación o la prescripción
            de deudas. Trabajamos todas las vías para diseñar la tuya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`${feat.span ?? ""} ${
                feat.highlight
                  ? "bg-foreground text-background"
                  : "bg-background border border-border"
              } rounded-3xl p-7 md:p-8 flex flex-col justify-between hover:shadow-medium transition-all group`}
            >
              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center ${
                  feat.highlight ? "bg-accent text-foreground" : "bg-accent/20 text-accent-deep"
                }`}
              >
                <feat.icon className="h-5 w-5" />
              </div>
              <div>
                <h3
                  className={`font-poppins font-semibold mb-2 ${
                    feat.highlight ? "text-2xl md:text-3xl" : "text-lg"
                  }`}
                >
                  {feat.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    feat.highlight ? "text-background/70 max-w-md" : "text-muted-foreground"
                  }`}
                >
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
