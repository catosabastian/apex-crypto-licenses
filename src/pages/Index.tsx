
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
        <section id="application" className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Licensed?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your cryptocurrency licensing journey with our comprehensive application process.
              </p>
              <div className="flex justify-center">
                <a 
                  href="/apply" 
                  className="inline-flex items-center justify-center h-12 px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
                >
                  Apply for License
                </a>
              </div>
            </div>
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
