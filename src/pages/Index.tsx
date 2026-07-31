import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import MediaLogos from "@/components/MediaLogos";
import HowItWorks from "@/components/HowItWorks";
import FormSection from "@/components/FormSection";
import FeatureSection from "@/components/FeatureSection";
import BenefitsSection from "@/components/BenefitsSection";
import { lazy, Suspense } from "react";
// Bloques bajo el pliegue: chunk aparte para aligerar el JS inicial.
// Se montan igualmente en el primer render (sin IntersectionObserver) para
// que el contenido siga disponible al renderizar la página los buscadores.
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const TrustBadges = lazy(() => import("@/components/TrustBadges"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const Footer = lazy(() => import("@/components/Footer"));
import Seo from "@/components/seo/Seo";
import {
  buildBreadcrumb,
  buildFaq,
  buildLegalService,
  buildOrganization,
  buildWebSite,
} from "@/lib/seo/structuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo
        title="✅ Cancela tus deudas legalmente y empieza de cero"
        description="Cancela tus deudas con la Ley de Segunda Oportunidad. Paramos embargos, salimos de ASNEF y empiezas de cero. Diagnóstico gratis y sin compromiso."
        canonical="/"
        keywords={[
          "Ley de Segunda Oportunidad",
          "cancelar deudas",
          "exoneración del pasivo insatisfecho",
          "abogados segunda oportunidad",
          "salir de ASNEF",
          "parar embargos",
        ]}
        structuredData={[
          buildOrganization(),
          buildWebSite(),
          buildLegalService(),
          buildBreadcrumb([{ name: "Inicio", url: "/" }]),
          buildFaq([
            {
              question: "¿Qué es la Ley de Segunda Oportunidad?",
              answer:
                "Es la ley española que permite a particulares y autónomos cancelar sus deudas cuando se encuentran en una situación de insolvencia y actúan de buena fe.",
            },
            {
              question: "¿Cuánto cuesta acogerse a la Ley de Segunda Oportunidad con Calma?",
              answer:
                "El análisis inicial es gratuito. El coste del procedimiento se adapta a cada caso y se pacta antes de empezar, sin sorpresas.",
            },
            {
              question: "¿Cuánto tarda el proceso?",
              answer:
                "Entre 6 y 18 meses según la complejidad del expediente y el juzgado competente.",
            },
          ]),
        ]}
      />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <MediaLogos />
        <HowItWorks />
        <FormSection />
        <FeatureSection />
        <BenefitsSection />
        <Suspense fallback={<div style={{ minHeight: 640 }} aria-hidden />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: 160 }} aria-hidden />}>
          <TrustBadges />
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: 520 }} aria-hidden />}>
          <PricingSection />
        </Suspense>
      </main>
      <Suspense fallback={<div style={{ minHeight: 400 }} aria-hidden />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
