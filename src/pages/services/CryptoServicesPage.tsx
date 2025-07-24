import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Globe, Building, CheckCircle, ArrowRight } from 'lucide-react';

const CryptoServicesPage = () => {
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
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-6">Crypto Licensing Services</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Professional cryptocurrency licensing solutions for exchanges, wallets, and digital asset businesses. 
                Navigate complex regulations with our expert guidance and end-to-end support.
              </p>
              <Button size="lg" className="mr-4">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Download Guide
              </Button>
            </div>
          </div>
        </section>

        {/* Why Crypto Licensing Matters */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Crypto Licensing is Crucial</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <p className="text-lg text-muted-foreground mb-6">
                    The right crypto license is crucial for building trust, ensuring compliance, and accessing 
                    essential financial services. Whether you're launching a crypto exchange, wallet service, 
                    or token project, proper licensing can open doors to banking and liquidity providers.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Our team helps you identify the most suitable regulatory framework based on your business 
                    model, future goals, and operational needs.
                  </p>
                </div>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
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
                    <Button className="w-full mt-4" variant="outline">
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
            <Button size="lg" variant="secondary">
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CryptoServicesPage;