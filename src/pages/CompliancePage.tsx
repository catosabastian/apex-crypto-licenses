import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, FileText, Scale, CheckCircle } from "lucide-react";

const CompliancePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Legal & Compliance - Trading License Authority</title>
        <meta name="description" content="Learn about our regulatory framework, legal compliance, terms of service, and privacy policies. We operate under strict regulatory oversight." />
        <meta name="keywords" content="compliance, legal, regulatory, terms, privacy, trading license regulation" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Legal & Compliance
              </h1>
              <p className="text-xl text-muted-foreground">
                Operating under strict regulatory oversight to ensure the highest standards of compliance and security
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Framework */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Regulatory Framework</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">International Standards</h3>
                      <p className="text-muted-foreground">Compliant with international trading regulations and standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">KYC/AML Compliance</h3>
                      <p className="text-muted-foreground">Strict Know Your Customer and Anti-Money Laundering protocols</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Data Protection</h3>
                      <p className="text-muted-foreground">GDPR compliant data handling and privacy protection</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-8 rounded-lg">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-4">Compliance Documents</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Terms of Service</span>
                    <span className="text-primary">Download</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Privacy Policy</span>
                    <span className="text-primary">Download</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Regulatory License</span>
                    <span className="text-primary">View</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Audit Report</span>
                    <span className="text-primary">Download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Information */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Legal Information</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Complete transparency in our legal structure and compliance requirements
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Company Registration</h3>
                <p className="text-muted-foreground mb-4">
                  Registered under Company Number: TLA2024001
                </p>
                <p className="text-sm text-muted-foreground">
                  Incorporated in Delaware, USA with international operations license
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Regulatory License</h3>
                <p className="text-muted-foreground mb-4">
                  License Number: TRA-2024-0001
                </p>
                <p className="text-sm text-muted-foreground">
                  Authorized to issue trading licenses in multiple jurisdictions
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Insurance Coverage</h3>
                <p className="text-muted-foreground mb-4">
                  $10M Professional Indemnity
                </p>
                <p className="text-sm text-muted-foreground">
                  Comprehensive coverage for all client transactions and data
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompliancePage;