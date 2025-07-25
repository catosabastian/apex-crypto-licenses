import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Building2, Globe, CheckCircle, ArrowRight, Users } from 'lucide-react';

const FinTechServicesPage = () => {
  const navigate = useNavigate();
  
  const fintechLicenses = [
    {
      name: "EMI Cyprus",
      description: "Electronic Money Institution license for comprehensive payment services",
      jurisdiction: "Cyprus",
      features: ["EU passport rights", "Payment processing", "E-money issuance", "IBAN provision", "Multi-currency accounts"]
    },
    {
      name: "SRO Switzerland",
      description: "Self-Regulatory Organization for fintech and crypto operations",
      jurisdiction: "Switzerland",
      features: ["Combined fiat/crypto", "Banking partnerships", "Global recognition", "Flexible framework"]
    },
    {
      name: "MSO Hong Kong",
      description: "Money Service Operator license for remittance and payment services",
      jurisdiction: "Hong Kong",
      features: ["Asian market access", "Remittance services", "Currency exchange", "Payment processing"]
    },
    {
      name: "Payment Services",
      description: "Comprehensive payment licensing across multiple jurisdictions",
      jurisdiction: "Global",
      features: ["Payment processing", "Digital wallets", "Merchant services", "Cross-border payments"]
    }
  ];

  const services = [
    {
      title: "Banking Solutions",
      description: "Access to banking partnerships and financial infrastructure",
      icon: Building2,
      features: ["Core banking platforms", "Payment gateways", "IBAN services", "Multi-currency accounts"]
    },
    {
      title: "Legal Services", 
      description: "Comprehensive legal support for fintech compliance",
      icon: CheckCircle,
      features: ["Regulatory compliance", "AML/KYC policies", "Terms drafting", "Legal opinions"]
    },
    {
      title: "Global Coverage",
      description: "Licensing and support across major financial jurisdictions",
      icon: Globe,
      features: ["EU licensing", "UK regulations", "Asia-Pacific", "Offshore solutions"]
    },
    {
      title: "High-risk Industries",
      description: "Specialized support for high-risk fintech businesses",
      icon: Users,
      features: ["Gaming payments", "Crypto services", "FX trading", "Alternative lending"]
    }
  ];

  const expertise = [
    "7+ years of experience in fintech licensing",
    "75+ licenses successfully obtained",
    "350+ clients served across all sectors",
    "500+ successful compliance cases",
    "Team of 10+ seasoned professionals",
    "Former banking and regulatory experts"
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
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm font-medium">Official Government Services</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                FinTech Licensing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Regulatory Authority
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Professional support in financial licensing, legal compliance, and tailored solutions for fintech businesses. 
                From payment services to banking partnerships - we ensure full regulatory compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg" onClick={() => navigate('/apply')}>
                  Request Official Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8 py-3 text-lg" onClick={() => navigate('/apply')}>
                  Download Regulatory Brochure
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">FinTech Legal Experts</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-muted-foreground mb-6">
                    Obtaining a fintech license is a critical step - but it's also a complex process due to strict 
                    AML, compliance, and operational requirements imposed by regulators. A successful application 
                    requires more than just filling forms; it demands solid internal policies, a clear business 
                    model, and an understanding of regulatory expectations.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    From selecting the right jurisdiction and forming the company to drafting robust AML, compliance, 
                    and operational policies, we handle the full process end-to-end.
                  </p>
                </div>
                <div className="space-y-4">
                  {expertise.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our FinTech Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <CardDescription className="text-sm">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Available Licenses */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">FinTech Licensing Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {fintechLicenses.map((license, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{license.jurisdiction}</Badge>
                      <Building2 className="h-5 w-5 text-primary" />
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
                    <Button className="w-full mt-4" variant="outline" onClick={() => navigate('/apply')}>
                      Get Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose APEX Global</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">7+</div>
                <div className="text-lg opacity-90">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">75+</div>
                <div className="text-lg opacity-90">Licenses Obtained</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">350+</div>
                <div className="text-lg opacity-90">Clients Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Successful Cases</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch Your FinTech Venture?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Partner with APEX Global for expert guidance in financial licensing and compliance
            </p>
            <Button size="lg" onClick={() => navigate('/apply')}>
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FinTechServicesPage;