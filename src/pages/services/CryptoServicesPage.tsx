import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceInfoModal } from '@/components/ServiceInfoModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Globe, Building, CheckCircle, ArrowRight } from 'lucide-react';

const CryptoServicesPage = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpenModal = (license: any) => {
    const serviceInfo = {
      title: license.name,
      description: license.description,
      features: license.features,
      requirements: [
        "Valid business registration",
        "Compliance officer appointment", 
        "AML/KYC procedures",
        "Minimum capital requirements",
        "Operational documentation"
      ],
      price: "€15,000",
      timeline: "3-6 months",
      jurisdiction: license.jurisdiction
    };
    setSelectedService(serviceInfo);
    setIsModalOpen(true);
  };

  const cryptoLicenses = [
    {
      name: "MSB Canada",
      description: "Money Services Business license for crypto operations in Canada",
      jurisdiction: "Canada",
      features: ["Full crypto trading", "Fiat-to-crypto exchange", "Money transmission", "International transfers"]
    },
    {
      name: "VASP Bulgaria",
      description: "Virtual Asset Service Provider license in EU-regulated jurisdiction",
      jurisdiction: "Bulgaria",
      features: ["EU passport rights", "Crypto exchange operations", "Wallet services", "Token issuance"]
    },
    {
      name: "CASP Poland",
      description: "Crypto Asset Service Provider license for comprehensive crypto services",
      jurisdiction: "Poland",
      features: ["Exchange services", "Custody solutions", "Trading platforms", "EU compliance"]
    },
    {
      name: "VASP Georgia",
      description: "Virtual Asset Service Provider license in crypto-friendly jurisdiction",
      jurisdiction: "Georgia",
      features: ["Low regulatory burden", "Fast approval", "Crypto exchange", "Digital wallet services"]
    },
    {
      name: "SRO Switzerland",
      description: "Self-Regulatory Organization membership for crypto businesses",
      jurisdiction: "Switzerland",
      features: ["Fintech-friendly", "Combined fiat/crypto", "Banking partnerships", "Global recognition"]
    },
    {
      name: "CASP Malta",
      description: "Crypto Asset Service Provider license in blockchain island",
      jurisdiction: "Malta",
      features: ["DLT framework", "Token services", "Exchange operations", "EU access"]
    }
  ];

  const benefits = [
    "Regulatory compliance and legal clarity",
    "Access to banking and payment partners",
    "Enhanced customer trust and credibility",
    "Global market expansion opportunities",
    "Protection from regulatory changes",
    "Professional compliance support"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px] opacity-20"></div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Official Government Services</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Cryptocurrency Licensing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Regulatory Authority
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Official cryptocurrency licensing services for exchanges, wallets, and digital asset businesses. 
                Navigate complex regulatory frameworks with our government-grade compliance and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg" onClick={() => navigate('/apply')}>
                  Request Official Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-3 text-lg" onClick={() => navigate('/apply')}>
                  Download Regulatory Guide
                </Button>
              </div>
              <div className="mt-8 flex justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Government Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Regulatory Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>International Recognition</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Framework */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Regulatory Framework & Compliance</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Navigate the complex landscape of cryptocurrency regulations with our comprehensive compliance framework 
                  designed to meet international standards and regulatory requirements.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Regulatory Compliance Requirements</h3>
                    <p className="text-slate-600 mb-6">
                      Cryptocurrency licensing requires adherence to strict regulatory frameworks. Our compliance experts 
                      ensure your operations meet all necessary requirements for legal operation and international recognition.
                    </p>
                    <div className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-slate-700 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">Government-Grade Standards</h3>
                    <p className="text-slate-600 mb-6">
                      Our licensing process follows government-grade standards for security, compliance, and operational integrity. 
                      We work directly with regulatory authorities to ensure full compliance.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">99.9%</div>
                        <div className="text-xs text-slate-600">Compliance Rate</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                        <div className="text-xs text-slate-600">Monitoring</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Available Licenses */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Available Crypto Licenses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cryptoLicenses.map((license, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{license.jurisdiction}</Badge>
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{license.name}</CardTitle>
                    <CardDescription>{license.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {license.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4" variant="outline" onClick={() => handleOpenModal(license)}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our End-to-End Process</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Assessment & Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    We analyze your business model and recommend the most suitable licensing strategy
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Application & Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete application preparation, company formation, and regulatory documentation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Ongoing Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuous compliance support and regulatory maintenance after approval
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Licensed?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let our experts guide you through the crypto licensing process
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/apply')}>
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      
      {selectedService && (
        <ServiceInfoModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          serviceInfo={selectedService}
          serviceType="crypto"
        />
      )}
    </div>
  );
};

export default CryptoServicesPage;