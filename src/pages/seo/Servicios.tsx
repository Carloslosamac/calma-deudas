import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Seo from "@/components/seo/Seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaButton from "@/components/seo/CtaButton";
import { clusters } from "@/data/seo/architecture";
import { moneyPages, moneyPagesByCluster } from "@/data/seo/moneyPages";
import { buildBreadcrumb, buildItemList, buildLegalService } from "@/lib/seo/structuredData";

/** Hub `/servicios`: índice navegable de todas las soluciones (money pages). */
const Servicios = () => {
  const canonical = "/servicios/";

  // Clusters que tienen al menos una money page, en el orden de la arquitectura.
  const groups = clusters
    .map((c) => ({ cluster: c, pages: moneyPagesByCluster(c.slug) }))
    .filter((g) => g.pages.length > 0);

  const structuredData = [
    buildBreadcrumb([
      { name: "Inicio", url: "/" },
      { name: "Servicios", url: canonical },
    ]),
    buildItemList(moneyPages.map((p) => ({ name: p.h1, url: p.path }))),
    buildLegalService(),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Servicios para cancelar deudas | Calma"
        description="Todas las soluciones de Calma para cancelar, reunificar y reclamar deudas: Ley de Segunda Oportunidad, embargos, ASNEF, revolving, microcréditos y más."
        canonical={canonical}
        structuredData={structuredData}
      />
      <Header />

      <main className="px-6 pb-8 pt-32 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs items={[{ name: "Inicio", to: "/" }, { name: "Servicios" }]} />

          <header className="mt-6 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              Soluciones
            </p>
            <h1 className="font-poppins text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Todos nuestros servicios para vivir sin deudas
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Elige tu situación y descubre cómo podemos ayudarte a cancelar, reunificar o
              reclamar tu deuda. Cada caso es distinto: analizamos el tuyo gratis y sin
              compromiso.
            </p>
            <div className="mt-7">
              <CtaButton />
            </div>
          </header>

          <div className="mt-14 space-y-12">
            {groups.map(({ cluster, pages }) => (
              <section key={cluster.slug} className="scroll-mt-28">
                <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                  {cluster.label}
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {pages.map((p) => (
                    <li key={p.path}>
                      <Link
                        to={p.path}
                        className="group flex h-full flex-col rounded-2xl border border-border bg-surface-elevated p-5 transition-colors hover:border-accent/50 hover:bg-accent-soft/40"
                      >
                        <span className="flex items-center justify-between gap-3 font-poppins font-semibold text-foreground">
                          {p.h1}
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-accent-deep transition-transform group-hover:translate-x-1"
                            aria-hidden
                          />
                        </span>
                        <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {p.metaDescription.replace(/\s*\[[^\]]*\]\s*$/, "")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>

      <FormSection />
      <Footer />
    </div>
  );
};

export default Servicios;