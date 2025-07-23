
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EnhancedAboutSection from '@/components/EnhancedAboutSection';
import EnhancedWhatIsLicense from '@/components/EnhancedWhatIsLicense';
import LicenseCategories from '@/components/LicenseCategories';
import ProcessSteps from '@/components/ProcessSteps';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import VerificationSection from '@/components/VerificationSection';
import Footer from '@/components/Footer';
import ServicesOverview from '@/components/ServicesOverview';
import SupportDialog from '@/components/SupportDialog';

const Index = () => {
  const [showSupportDialog, setShowSupportDialog] = useState(false);

  // Scroll to hash if present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <FeaturesSection />
        <section id="about">
          <EnhancedAboutSection />
        </section>
        <section id="licenses">
          <LicenseCategories />
        </section>
        <EnhancedWhatIsLicense />
        <section id="process">
          <ProcessSteps />
        </section>
        <StatsSection />
        <section id="verification">
          <VerificationSection />
        </section>
      </main>
      <Footer />
      
      <SupportDialog 
        open={showSupportDialog}
        onOpenChange={setShowSupportDialog}
      />
    </div>
  );
};

export default Index;
