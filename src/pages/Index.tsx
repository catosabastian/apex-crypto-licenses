
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LicenseCategories from "@/components/LicenseCategories";
import VerificationSection from "@/components/VerificationSection";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import { ApplicationDialogProvider } from "@/components/ApplicationDialog";

const Index = () => {
  return (
    <ApplicationDialogProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main>
          <Hero />
          <AboutSection />
          <LicenseCategories />
          <VerificationSection />
          <div className="hidden">
            <ApplicationForm />
          </div>
        </main>
        <Footer />
      </div>
    </ApplicationDialogProvider>
  );
};

export default Index;
