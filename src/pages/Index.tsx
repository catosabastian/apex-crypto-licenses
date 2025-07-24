
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
import EnhancedApplicationForm from '@/components/EnhancedApplicationForm';
import Footer from '@/components/Footer';

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
        <AboutSection />
        <WhatIsLicense />
        <LicenseCategories />
        <ProcessSteps />
        <FeaturesSection />
        <StatsSection />
        <VerificationSection />
        <section id="application" className="py-20 bg-muted/30">
          <div className="container">
            <EnhancedApplicationForm />
          </div>
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
