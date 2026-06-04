import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import MediaLogos from "@/components/MediaLogos";
import HowItWorks from "@/components/HowItWorks";
import FormSection from "@/components/FormSection";
import FeatureSection from "@/components/FeatureSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustBadges from "@/components/TrustBadges";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
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
        title="Cancela tus deudas: Ley de Segunda Oportunidad"
        description="Calma es el servicio legal especializado en la Ley de Segunda Oportunidad. Analizamos tu caso gratis, paramos embargos y te ayudamos a cancelar tus deudas."
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
        <TestimonialsSection />
        <TrustBadges />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
