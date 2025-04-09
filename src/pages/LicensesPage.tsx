
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LicenseTiers from "@/components/LicenseTiers";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, FileCheck, BadgeCheck } from "lucide-react";

const LicensesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm mb-4">
              <Shield className="h-4 w-4" />
              <span>Official Licensing Options</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-5">Crypto Trading License Categories</h1>
            
            <p className="text-lg text-muted-foreground">
              Select the appropriate license category based on your trading volume and activities.
              All licenses are valid for one year and comply with global regulatory standards.
            </p>
          </div>
          
          <LicenseTiers />
          
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-muted/50 rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
                <BadgeCheck className="h-5 w-5 text-primary" />
                License Benefits & Features
              </h3>
              
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Global Recognition</span> - 
                    <span className="text-muted-foreground"> Accepted by all cryptocurrency exchanges and trading platforms worldwide.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Compliance Assurance</span> - 
                    <span className="text-muted-foreground"> Documentation proving adherence to AML/KYC standards.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Trading Status</span> - 
                    <span className="text-muted-foreground"> Verified trader status with higher transaction limits on partner platforms.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Annual Renewal</span> - 
                    <span className="text-muted-foreground"> Simplified renewal process with existing verification data.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FileCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium">Official Certificate</span> - 
                    <span className="text-muted-foreground"> Digital and physical certificates with unique verification codes.</span>
                  </div>
                </li>
              </ul>
              
              <div className="flex justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/application">Apply for License Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LicensesPage;
