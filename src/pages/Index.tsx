
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
import ApplicationDialog from '@/components/ApplicationDialog';
import SupportDialog from '@/components/SupportDialog';
import UnifiedApplicationForm from '@/components/UnifiedApplicationForm';

const Index = () => {
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
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
      <Header 
        onApplyClick={() => setShowApplicationDialog(true)}
        onSupportClick={() => setShowSupportDialog(true)}
      />
      <main>
        <Hero onApplyClick={() => setShowApplicationDialog(true)} />
        <AboutSection />
        <WhatIsLicense />
        <LicenseCategories onApplyClick={() => setShowApplicationDialog(true)} />
        <ProcessSteps />
        <FeaturesSection />
        <StatsSection />
        <VerificationSection />
      </main>
      <Footer />
      
      <ApplicationDialog 
        isOpen={showApplicationDialog} 
        onClose={() => setShowApplicationDialog(false)}
      >
        <UnifiedApplicationForm />
      </ApplicationDialog>
      
      <SupportDialog 
        isOpen={showSupportDialog}
        onClose={() => setShowSupportDialog(false)}
      />
    </div>
  );
};

export default Index;
