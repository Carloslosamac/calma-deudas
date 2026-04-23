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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
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
      <Footer />
    </div>
  );
};

export default Index;
