
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhatIsLicense from "@/components/WhatIsLicense";
import FeaturesSection from "@/components/FeaturesSection";
import ProcessSteps from "@/components/ProcessSteps";
import LicenseCategories from "@/components/LicenseCategories";
import StatsSection from "@/components/StatsSection";
import VerificationSection from "@/components/VerificationSection";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <WhatIsLicense />
        <FeaturesSection />
        <ProcessSteps />
        <LicenseCategories />
        <StatsSection />
        <VerificationSection />
        <div className="hidden">
          <ApplicationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
