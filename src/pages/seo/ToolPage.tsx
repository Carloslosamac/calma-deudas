import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Seo from "@/components/seo/Seo";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CtaButton from "@/components/seo/CtaButton";
import FaqList from "@/components/blog/FaqList";
import NotFound from "@/pages/NotFound";
import SolutionDiagnosisTool from "@/components/seo/interactive/SolutionDiagnosisTool";
import CancelableDebtCalculator from "@/components/seo/interactive/CancelableDebtCalculator";
import UnseizableSalaryCalculator from "@/components/seo/interactive/UnseizableSalaryCalculator";
import UsuryCalculator from "@/components/seo/interactive/UsuryCalculator";
import PaymentPlanSimulator from "@/components/seo/interactive/PaymentPlanSimulator";
import SolutionComparator from "@/components/seo/interactive/SolutionComparator";
import { getTool, REVOLVING_LEGAL_APR, REVOLVING_CARD_APR } from "@/data/seo/tools";
import {
  buildWebApplication,
  buildWebPage,
  buildBreadcrumb,
  buildOrganization,
  buildFaq,
} from "@/lib/seo/structuredData";

const ToolWidget = ({ kind }: { kind: string }) => {
  switch (kind) {
    case "diagnosis":
      return <SolutionDiagnosisTool />;
    case "cancelable":
      return <CancelableDebtCalculator />;
    case "salary":
      return <UnseizableSalaryCalculator />;
    case "paymentPlan":
      return <PaymentPlanSimulator />;
    case "comparator":
      return <SolutionComparator />;
    case "revolving":
      return (
        <UsuryCalculator
          data={{
            title: "Simula tu tarjeta revolving",
            subtitle: "Mueve el saldo y comprueba cuánto pagas de más cada año.",
            legalApr: REVOLVING_LEGAL_APR,
            cardApr: REVOLVING_CARD_APR,
            defaultBalance: 3000,
            maxBalance: 15000,
          }}
        />
      );
    default:
      return null;
  }
};

/** Resuelve una herramienta por pathname y la renderiza con su contenido SEO. */
const ToolPage = () => {
  const { pathname } = useLocation();
  const tool = getTool(pathname);

  if (!tool) return <NotFound />;

  const canonical = tool.path;
  const breadcrumbs = [
    { name: "Inicio", to: "/" },
    { name: "Herramientas", to: "/herramientas" },
    { name: tool.navLabel },
  ];

  const structuredData = [
    buildWebPage({
      url: canonical,
      name: tool.seoTitle,
      description: tool.metaDescription,
      hasBreadcrumb: true,
    }),
    buildOrganization(),
    buildBreadcrumb(
      breadcrumbs.map((b) => ({ name: b.name, url: b.to ?? canonical })),
      canonical,
    ),
    buildWebApplication({
      name: tool.h1,
      description: tool.metaDescription,
      url: canonical,
    }),
    ...(tool.faq.length
      ? [buildFaq(tool.faq.map((f) => ({ question: f.q, answer: f.a })))]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={tool.seoTitle}
        description={tool.metaDescription}
        canonical={canonical}
        appendSiteName={false}
        structuredData={structuredData}
      />
      <Header />

      <main className="px-6 pb-8 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              {tool.eyebrow}
            </p>
            <h1 className="font-poppins text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {tool.h1}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {tool.intro}
            </p>
          </header>

          {/* Herramienta interactiva */}
          <div className="mt-10">
            <ToolWidget kind={tool.kind} />
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-border bg-surface/60 p-4 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <p>{tool.disclaimer}</p>
            </div>
          </div>

          {/* Contenido explicativo (SEO/GEO) */}
          <div className="mt-14 space-y-12">
            {tool.sections.map((s) => (
              <section key={s.title} className="scroll-mt-28">
                <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                  {s.title}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            {tool.faq.length > 0 && (
              <section className="scroll-mt-28">
                <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                  Preguntas frecuentes
                </h2>
                <div className="mt-5">
                  <FaqList items={tool.faq.map((f) => ({ q: f.q, a: f.a }))} />
                </div>
              </section>
            )}
          </div>

          <div className="mt-12 flex justify-center">
            <CtaButton className="h-14 px-8 text-base">Analizar mi caso gratis</CtaButton>
          </div>

          {/* Bloque editorial E-E-A-T */}
          <div className="mt-14 rounded-3xl border border-border bg-surface p-6">
            <p className="font-poppins font-semibold text-foreground">
              Contenido elaborado por el equipo de Calma
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Revisado por abogado especialista en la Ley de Segunda Oportunidad.
            </p>
          </div>

          {/* Enlazado interno */}
          {tool.related.length > 0 && (
            <nav aria-label="Contenido relacionado" className="mt-14">
              <h2 className="mb-5 font-poppins text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Contenido relacionado
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {tool.related.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="block rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft/40"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </main>

      <FormSection />
      <Footer />
    </div>
  );
};

export default ToolPage;