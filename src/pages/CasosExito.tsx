import { Link } from "react-router-dom";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Seo from "@/components/seo/Seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaButton from "@/components/seo/CtaButton";
import { casosExito } from "@/data/casos";
import { buildBreadcrumb, buildItemList } from "@/lib/seo/structuredData";

const CasosExito = () => {
  const canonical = "/casos-de-exito";
  const structuredData = [
    buildBreadcrumb([
      { name: "Inicio", url: "/" },
      { name: "Casos de éxito", url: canonical },
    ]),
    buildItemList(
      casosExito.map((c) => ({
        name: c.headline,
        url: `${canonical}/${c.slug}`,
      }))
    ),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Casos de éxito reales: personas que cancelaron su deuda"
        description="Historias reales de personas que cancelaron sus deudas en España. Cuánto debían, qué solución aplicaron y cómo viven hoy. Empieza tu caso gratis."
        canonical={canonical}
        ogType="website"
        appendSiteName={false}
        structuredData={structuredData}
      />
      <Header />

      <main className="pt-28 md:pt-32">
        <section className="bg-surface">
          <div className="mx-auto max-w-4xl px-6 pb-14 pt-12 text-center md:pb-20 md:pt-16">
            <Breadcrumbs
              items={[{ name: "Inicio", to: "/" }, { name: "Casos de éxito" }]}
            />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              Historias reales
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl font-poppins text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              Casos de éxito de personas que{" "}
              <span className="text-accent-deep">empezaron de cero</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Cada historia es un caso real contado al detalle: cuánto debían, qué solución
              aplicaron y cómo viven hoy. Tú puedes ser el próximo.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaButton className="h-14 px-8 text-base">Quiero mi estudio gratis</CtaButton>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            {casosExito.map((c) => (
              <Link
                key={c.slug}
                to={`/casos-de-exito/${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-surface transition-shadow hover:shadow-medium"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={c.heroImage}
                    alt={c.heroAlt}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-soft">
                    {["Ley de Segunda Oportunidad", "Concurso de persona física"].includes(
                      c.category
                    )
                      ? `${c.debtAmount} cancelados`
                      : c.debtAmount}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                    {c.category}
                  </p>
                  <h2 className="mt-3 font-poppins text-xl font-semibold leading-snug text-foreground group-hover:text-accent-deep">
                    {c.headline}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {c.dek}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {c.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {c.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {c.readTime}
                    </span>
                  </div>
                </div>
              </Link>
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

export default CasosExito;