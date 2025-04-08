
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplicationForm from "@/components/ApplicationForm";
import { Shield } from "lucide-react";

const ApplicationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm mb-4">
              <Shield className="h-4 w-4" />
              <span>License Application</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-5">Apply for Your Crypto Trading License</h1>
            
            <p className="text-lg text-muted-foreground">
              Complete the form below to apply for your official crypto trading license.
              Your information will be securely processed according to our verification protocol.
            </p>
          </div>
          
          <ApplicationForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationPage;
