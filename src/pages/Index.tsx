
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import WhatIsLicense from '@/components/WhatIsLicense';
import LicenseCategories from '@/components/LicenseCategories';
import ProcessSteps from '@/components/ProcessSteps';
import FeaturesSection from '@/components/FeaturesSection';
import StatsSection from '@/components/StatsSection';
import VerificationSection from '@/components/VerificationSection';
import Footer from '@/components/Footer';
import { ApplicationDialogProvider } from '@/components/ApplicationDialog';
import SupportDialog from '@/components/SupportDialog';
import UnifiedApplicationForm from '@/components/UnifiedApplicationForm';

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
    <ApplicationDialogProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <AboutSection />
          <WhatIsLicense />
          <LicenseCategories />
          <ProcessSteps />
          <FeaturesSection />
          <StatsSection />
          <VerificationSection />
        </main>
        <Footer />
        
        <SupportDialog 
          open={showSupportDialog}
          onOpenChange={setShowSupportDialog}
        />
      </div>
    </ApplicationDialogProvider>
  );
};

export default Index;
