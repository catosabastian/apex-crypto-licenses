
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, BookOpen, GlobeCheck, Scale, FileCheck } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Our Authority</h1>
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Our Mission
                </h2>
                <p className="text-muted-foreground">
                  The Global Crypto Compliance Authority (GCCA) serves as a central regulatory framework to streamline cryptocurrency trading compliance across multiple jurisdictions. We collaborate with major regulatory bodies worldwide to offer unified licensing solutions that adhere to international standards, enabling traders and businesses to operate globally with confidence.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <GlobeCheck className="h-6 w-6 text-primary" />
                  Global Recognition
                </h2>
                <p className="text-muted-foreground">
                  Our licenses are recognized across multiple jurisdictions thanks to our partnership network with key regulatory authorities including the SEC, CFTC, ESMA, FCA, MAS, FINMA, and dozens more. By obtaining a GCCA license, traders gain access to compliant trading capabilities in major markets worldwide through a single application process.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  Compliance Standards
                </h2>
                <p className="text-muted-foreground">
                  Our licensing framework incorporates rigorous compliance standards derived from established financial regulations while adapting to the unique nature of digital assets. We conduct thorough due diligence on all applicants to ensure only legitimate and trustworthy traders receive official certification.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <FileCheck className="h-6 w-6 text-primary" />
                  Verification System
                </h2>
                <p className="text-muted-foreground">
                  All licenses issued by GCCA feature tamper-proof verification capabilities. Trading partners, platforms, and regulatory bodies can instantly verify the authenticity and current status of any trader's license through our secure verification portal, enhancing trust and security across the cryptocurrency ecosystem.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
