"use client";

import { Navbar } from "@/components/site/navbar";
import { HeroSection } from "@/components/site/hero-section";
import { MetricsSection } from "@/components/site/metrics-section";
import { ServicesSection } from "@/components/site/services-section";
import { GuaranteeSection } from "@/components/site/guarantee-section";
import { ContactSection } from "@/components/site/contact-section";
import { Footer } from "@/components/site/footer";
import { MobileCta } from "@/components/site/mobile-cta";
import { useRouter } from "@/components/site/router";
import { AboutPage } from "@/components/site/about-page";
import { TeamPage } from "@/components/site/team-page";
import { ContactPage } from "@/components/site/contact-page";
import { PrivacyPage } from "@/components/site/privacy-page";
import { TermsPage } from "@/components/site/terms-page";

export default function Home() {
  const { route } = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {route === "home" && (
          <>
            <HeroSection />
            <MetricsSection />
            <ServicesSection />
            <GuaranteeSection />
            <ContactSection />
          </>
        )}
        {route === "about" && <AboutPage currentRoute={route} />}
        {route === "team" && <TeamPage currentRoute={route} />}
        {route === "contact" && <ContactPage currentRoute={route} />}
        {route === "privacy" && <PrivacyPage currentRoute={route} />}
        {route === "terms" && <TermsPage currentRoute={route} />}
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
