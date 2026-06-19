import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calculator,
  CreditCard,
  ShieldCheck,
  ClipboardCheck,
  TrendingDown,
  Scale,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Seo from "@/components/seo/Seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaButton from "@/components/seo/CtaButton";
import { tools, type ToolKind } from "@/data/seo/tools";
import {
  buildWebPage,
  buildBreadcrumb,
  buildOrganization,
  buildItemList,
} from "@/lib/seo/structuredData";

const SEO_TITLE = "Herramientas gratis para salir de deudas";
const SEO_DESC =
  "Calculadoras y tests gratuitos para personas con deudas: descubre qué solución te conviene, cuánto puedes cancelar y qué parte de tu sueldo es inembargable.";

const ICONS: Record<ToolKind, typeof Calculator> = {
  diagnosis: ClipboardCheck,
  cancelable: Calculator,
  salary: ShieldCheck,
  revolving: CreditCard,
  paymentPlan: TrendingDown,
  comparator: Scale,
};

const HerramientasHub = () => {
  const canonical = "/herramientas";
  const breadcrumbs = [{ name: "Inicio", to: "/" }, { name: "Herramientas" }];

  const structuredData = [
    buildWebPage({ url: canonical, name: SEO_TITLE, description: SEO_DESC, hasBreadcrumb: true }),
    buildOrganization(),
    buildBreadcrumb(
      breadcrumbs.map((b) => ({ name: b.name, url: b.to ?? canonical })),
      canonical,
    ),
    buildItemList(tools.map((t) => ({ name: t.cardTitle, url: t.path }))),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title={SEO_TITLE} description={SEO_DESC} canonical={canonical} appendSiteName={false} structuredData={structuredData} />
      <Header />

      <main className="px-6 pb-8 pt-32 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mt-6 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              Herramientas
            </p>
            <h1 className="font-poppins text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Herramientas gratuitas para personas con deudas
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Calculadoras y tests pensados para que entiendas tu situación en minutos: qué solución
              te conviene, cuánto podrías cancelar, qué parte de tu sueldo protege la ley y si pagas
              intereses abusivos. Gratis y sin registro.
            </p>
            <div className="mt-7">
              <CtaButton />
            </div>
          </header>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {tools.map((t) => {
              const Icon = ICONS[t.kind];
              return (
                <Link
                  key={t.path}
                  to={t.path}
                  className="group flex flex-col rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-medium"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft/60 text-accent-deep">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h2 className="mt-5 font-poppins text-xl font-bold tracking-tight text-foreground">
                    {t.cardTitle}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t.cardDescription}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep">
                    Usar herramienta
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <FormSection />
      <Footer />
    </div>
  );
};

export default HerramientasHub;