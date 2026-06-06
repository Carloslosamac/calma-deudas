import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Seo from "@/components/seo/Seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaButton from "@/components/seo/CtaButton";
import { TestimonialCard } from "@/components/seo/interactive/Testimonials";
import type { MoneyTestimonial } from "@/data/seo/content/types";
import { absoluteUrl } from "@/lib/seo/config";
import lso1 from "@/assets/testimonios/lso-1.jpg";
import lso2 from "@/assets/testimonios/lso-2.jpg";
import lso3 from "@/assets/testimonios/lso-3.jpg";

const casos: MoneyTestimonial[] = [
  { name: "Noemí V.", amount: "136.410 €", location: "Barcelona", text: "Arrastraba tarjetas, microcréditos e hipoteca. Hoy no debe nada y vuelve a dormir tranquila.", photo: lso1 },
  { name: "Antonio R.", amount: "22.179 €", location: "Sabadell", text: "Minicréditos que se le fueron de las manos. Canceló toda su deuda con la Ley de Segunda Oportunidad.", photo: lso2 },
  { name: "Juan Vicente T.", amount: "129.320 €", location: "Valencia", text: "Deudas con bancos y financieras. Empezó de cero y recuperó su nómina por completo.", photo: lso3 },
  { name: "María Dolores P.", amount: "84.500 €", location: "Madrid", text: "Avales de un negocio que cerró. Logró cancelar la deuda y proteger a sus familiares avalistas.", photo: lso2 },
  { name: "Francisco J.", amount: "57.900 €", location: "Sevilla", text: "Préstamos personales encadenados durante años. Hoy vive sin embargos ni llamadas.", photo: lso3 },
  { name: "Carmen S.", amount: "41.230 €", location: "Zaragoza", text: "Tarjetas revolving con intereses abusivos. Las anuló y canceló el resto de su deuda.", photo: lso1 },
  { name: "José Luis M.", amount: "98.760 €", location: "Málaga", text: "Autónomo con deudas de Hacienda y proveedores. Exoneró la mayor parte y reabrió su actividad.", photo: lso2 },
  { name: "Lucía F.", amount: "33.040 €", location: "Bilbao", text: "Microcréditos y descubiertos bancarios. Salió del ASNEF y empezó de nuevo.", photo: lso1 },
  { name: "Roberto A.", amount: "112.880 €", location: "Murcia", text: "Deudas tras un divorcio y la pérdida de empleo. Canceló todo y recuperó la tranquilidad.", photo: lso3 },
];

const CasosLSO = () => {
  const canonical = "/ley-segunda-oportunidad/casos/";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Ley de Segunda Oportunidad", item: absoluteUrl("/ley-segunda-oportunidad/") },
        { "@type": "ListItem", position: 3, name: "Casos reales", item: absoluteUrl(canonical) },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Casos reales de deuda cancelada | Ley de Segunda Oportunidad"
        description="Personas reales que cancelaron sus deudas con la Ley de Segunda Oportunidad. Mira cuánto dejaron de pagar y empieza tu caso gratis."
        canonical={canonical}
        ogType="website"
        structuredData={structuredData}
      />
      <Header />

      <main className="pt-28 md:pt-32">
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="mx-auto max-w-4xl px-6 pb-14 pt-12 text-center md:pb-20 md:pt-16">
            <Breadcrumbs
              items={[
                { name: "Inicio", to: "/" },
                { name: "Ley de Segunda Oportunidad", to: "/ley-segunda-oportunidad" },
                { name: "Casos reales" },
              ]}
            />
            <h1 className="mx-auto mt-8 max-w-3xl font-poppins text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              Casos reales de personas que{" "}
              <span className="text-accent-deep">empezaron de cero</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Cada uno de ellos pensó alguna vez que no había salida. Hoy viven sin deudas,
              sin embargos y sin llamadas. Tú puedes ser el próximo.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaButton className="h-14 px-8 text-base">Quiero mi estudio gratis</CtaButton>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {casos.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] border border-accent/30 bg-accent-soft/50 p-10 text-center md:p-14">
            <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              El próximo caso puede ser el tuyo
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Cada mes que esperas sigues pagando lo que la ley puede borrar. Pide tu estudio
              gratis y descubre cuánto puedes cancelar.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaButton className="h-14 px-8 text-base">Analizar mi deuda gratis</CtaButton>
            </div>
          </div>
        </div>
      </main>

      <FormSection />
      <Footer />
    </div>
  );
};

export default CasosLSO;