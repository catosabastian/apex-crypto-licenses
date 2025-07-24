
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicHero from '@/components/DynamicHero';
import DynamicAboutSection from '@/components/DynamicAboutSection';
import ServicesOverview from '@/components/ServicesOverview';
import LicenseCategories from '@/components/LicenseCategories';
import DynamicLicenseCategories from '@/components/DynamicLicenseCategories';
import DynamicProcessSteps from '@/components/DynamicProcessSteps';
import StatsSection from '@/components/StatsSection';
import FeaturesSection from '@/components/FeaturesSection';
import VerificationSection from '@/components/VerificationSection';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const Index = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log('[Index] Initializing data...');
        await supabaseDataManager.getSettings();
        setIsInitialized(true);
        console.log('[Index] Data initialized successfully');
      } catch (error) {
        console.error('[Index] Error initializing data:', error);
        // Still set initialized to true to show the page
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div id="hero">
          <DynamicHero />
        </div>
        <div id="about">
          <DynamicAboutSection />
        </div>
        <div id="services">
          <ServicesOverview />
        </div>
        <div id="licenses">
          <LicenseCategories />
        </div>
        <div id="additional-licenses">
          <DynamicLicenseCategories />
        </div>
        <div id="process">
          <DynamicProcessSteps />
        </div>
        <div id="stats">
          <StatsSection />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="verification">
          <VerificationSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
