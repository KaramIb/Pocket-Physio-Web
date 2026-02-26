import { SiteHeader } from "@/components/landing/site-header";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturesSection } from "@/components/landing/features-section";
import { RealitySection } from "@/components/landing/reality-section";
import { ForClinics } from "@/components/landing/for-clinics";
import { ContactSection } from "@/components/landing/contact-section";
import { SiteFooter } from "@/components/landing/site-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <RealitySection />
        <ForClinics />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
