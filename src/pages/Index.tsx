
import { useEffect } from 'react';
import Header from "@/components/Header";
import DynamicHero from "@/components/DynamicHero";
import DynamicLicenseCategories from "@/components/DynamicLicenseCategories";
import FixedAboutSection from "@/components/FixedAboutSection";
import ProcessSteps from "@/components/ProcessSteps";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const Index = () => {
  useEffect(() => {
    // Initialize database content if needed
    const initializeContent = async () => {
      try {
        await supabaseDataManager.initializeDefaultContent();
      } catch (error) {
        console.error('Error initializing content:', error);
      }
    };

    initializeContent();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <DynamicHero />
      <DynamicLicenseCategories />
      <div id="about">
        <FixedAboutSection />
      </div>
      <div id="process">
        <ProcessSteps />
      </div>
      <FeaturesSection />
      <StatsSection />
      <Footer />
    </div>
  );
};

export default Index;
