import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, FileText, CheckCircle, ArrowRight, Globe, Shield, Briefcase } from 'lucide-react';

const CorporateServicesPage = () => {
  const corporateServices = [
    {
      title: "Company Formation",
      description: "Global company incorporations and business setup",
      icon: Building,
      features: ["Offshore incorporations", "EU company setup", "Nominee services", "Share capital management"],
      jurisdictions: ["BVI", "Seychelles", "Cyprus", "Estonia", "Malta", "Switzerland"]
    },
    {
      title: "Banking Solutions", 
      description: "Access to global banking and payment networks",
      icon: Shield,
      features: ["Business account opening", "Multi-currency accounts", "Payment processing", "Merchant services"],
      jurisdictions: ["EU Banking", "UK Banking", "Offshore Banking", "Crypto-friendly Banks"]
    },
    {
      title: "Compliance & Administration",
      description: "Ongoing corporate compliance and administration",
      icon: FileText,
      features: ["Statutory reporting", "AML compliance", "Tax planning", "Corporate governance"],
      jurisdictions: ["Global Coverage", "EU Compliance", "FATCA/CRS", "Local Regulations"]
    },
    {
      title: "Accounting Services",
      description: "Professional accounting and financial management",
      icon: Briefcase,
      features: ["Monthly bookkeeping", "Financial statements", "Tax returns", "Audit support"],
      jurisdictions: ["IFRS", "Local GAAP", "Tax Optimization", "Multi-jurisdiction"]
    }
  ];

  const bankingPartners = [
    "Core Banking Platforms",
    "Payment Gateway Solutions", 
    "Client Fund (C2B) Accounts",
    "Safeguarding Solutions",
    "High-risk Industry Support",
    "Crypto-friendly Banking"
  ];

  const officeServices = [
    "Virtual Office Solutions",
    "Physical Office Spaces",
    "Nominee Directorships",
    "Local Representation",
    "Mail Forwarding",
    "Business Addresses"
  ];

  const teamExpertise = [
    "10+ seasoned professionals",
    "Banking industry veterans", 
    "Legal and compliance experts",
    "International business specialists",
    "Former regulatory officials",
    "Multi-jurisdictional experience"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Building className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-6">Corporate Services</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive corporate services from company formation to ongoing administration. 
                We support clients throughout their entire journey with professional, compliant solutions.
              </p>
              <Button size="lg" className="mr-4">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Download Services Guide
              </Button>
            </div>
          </div>
        </section>

        {/* About Corporate Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">End-to-End Corporate Support</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-muted-foreground mb-6">
                    We support our clients throughout their entire journey - from first steps to ongoing operations - 
                    by offering a full range of corporate services tailored to their needs. Whether you're launching 
                    a new venture or managing an existing one, we help make the process smooth and compliant.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our services include global company incorporations, ongoing administration, statutory reporting, 
                    and accounting. We also assist with sourcing physical or virtual office spaces, nominee 
                    directorships, and local representation where required.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    With our help, you can focus on growing your business while we handle the operational details 
                    behind the scenes.
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Our Expert Team</h3>
                    <div className="space-y-2">
                      {teamExpertise.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Services Grid */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Corporate Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {corporateServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <IconComponent className="h-8 w-8 text-primary" />
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Key Services:</h4>
                          <ul className="space-y-1">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Coverage:</h4>
                          <div className="flex flex-wrap gap-1">
                            {service.jurisdictions.map((jurisdiction, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {jurisdiction}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Banking & Payment Solutions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Banking & Payment Solutions</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Banking Partnerships</h3>
                  <p className="text-muted-foreground mb-6">
                    With a network of hundreds of reliable banking and payment service providers, we support 
                    our clients in opening the right accounts for their operations - no matter how simple or 
                    complex the need.
                  </p>
                  <div className="space-y-2">
                    {bankingPartners.map((partner, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{partner}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Office Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    From virtual offices to physical spaces, we provide comprehensive office solutions 
                    to meet your business requirements and regulatory obligations.
                  </p>
                  <div className="space-y-2">
                    {officeServices.map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Software Solutions */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Banking & Crypto Software Solutions</h2>
              <p className="text-lg text-muted-foreground mb-8">
                When our clients need technical infrastructure to support their licensed operations, we connect 
                them with experienced software developers who specialize in building Core Banking platforms, 
                Crypto Exchanges, or custom solutions that combine both.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mx-auto" />
                    <CardTitle className="text-lg">Core Banking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete banking platforms with account management, payments, and compliance features
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mx-auto" />
                    <CardTitle className="text-lg">Crypto Exchanges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Secure trading platforms with advanced features and regulatory compliance
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mx-auto" />
                    <CardTitle className="text-lg">Custom Solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Tailored fintech solutions combining banking and crypto functionalities
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Consultation</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand your business needs and recommend optimal corporate structure
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Handle incorporation, banking setup, and initial compliance requirements
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Operations</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide ongoing administration, accounting, and compliance support
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Growth</h3>
                  <p className="text-sm text-muted-foreground">
                    Support business expansion and scaling with additional services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Establish Your Business?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let our experts handle your corporate setup and ongoing administration
            </p>
            <Button size="lg" variant="secondary">
              Schedule Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CorporateServicesPage;