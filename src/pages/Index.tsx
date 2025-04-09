
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LicenseTiers from "@/components/LicenseTiers";
import VerificationSection from "@/components/VerificationSection";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  // Listen for clicks on application buttons
  const handleApplicationScroll = () => {
    const handleClick = () => {
      setIsApplicationOpen(true);
    };

    // When the page loads, add click event listeners to all the "Apply" buttons
    const applyButtons = document.querySelectorAll('[id="application"]');
    applyButtons.forEach(button => {
      button.addEventListener('click', handleClick);
    });

    return () => {
      // Clean up event listeners
      applyButtons.forEach(button => {
        button.removeEventListener('click', handleClick);
      });
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <LicenseTiers />
        <VerificationSection />
        <div id="application" className="hidden"></div>
        <Dialog open={isApplicationOpen} onOpenChange={setIsApplicationOpen}>
          <DialogContent className="max-w-4xl h-[90vh] overflow-auto">
            <ApplicationForm closeDialog={() => setIsApplicationOpen(false)} />
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
