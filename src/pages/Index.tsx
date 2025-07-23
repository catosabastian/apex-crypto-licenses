
import { useEffect } from 'react';
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
  useEffect(() => {
    // Ensure data manager is initialized
    const initializeData = async () => {
      try {
        // This will trigger the initialization of default content
        await supabaseDataManager.getSettings();
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);

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
