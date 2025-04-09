
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LicenseTiers from "@/components/LicenseTiers";
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
        <LicenseTiers />
        <VerificationSection />
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
