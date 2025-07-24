import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dice6, Globe, Shield, CheckCircle, ArrowRight, Users, CreditCard } from 'lucide-react';

const GamblingServicesPage = () => {
  const gamblingLicenses = [
    {
      name: "Kahnawake",
      description: "Comprehensive gaming license from the Kahnawake Gaming Commission",
      jurisdiction: "Kahnawake Territory",
      features: ["Online casino", "Sports betting", "Poker rooms", "International operations", "Established reputation"]
    },
    {
      name: "Curaçao",
      description: "Popular eGaming license for online gambling operations",
      jurisdiction: "Curaçao",
      features: ["Cost-effective", "Quick processing", "B2B and B2C", "Payment solutions", "Global reach"]
    },
    {
      name: "Anjouan", 
      description: "Flexible gaming license for diverse gambling operations",
      jurisdiction: "Union of Comoros",
      features: ["Low requirements", "Fast approval", "Multiple gaming types", "Competitive fees", "Remote operations"]
    },
    {
      name: "Costa Rica",
      description: "Data processing license for gaming operations",
      jurisdiction: "Costa Rica",
      features: ["Data processing", "Gaming software", "Customer support", "Technical operations", "Cost-effective"]
    }
  ];

  const gamblingServices = [
    {
      title: "License Application",
      description: "Complete assistance with gaming license applications",
      icon: Shield,
      features: ["Application preparation", "Documentation support", "Regulatory liaison", "Compliance review"]
    },
    {
      title: "Payment Solutions",
      description: "Gaming-specific payment processing and banking",
      icon: CreditCard,
      features: ["High-risk merchant accounts", "Multiple payment methods", "Crypto integration", "Global processing"]
    },
    {
      title: "Compliance Support",
      description: "Ongoing regulatory compliance and reporting",
      icon: CheckCircle,
      features: ["AML policies", "Player protection", "Responsible gaming", "Regular audits"]
    },
    {
      title: "Platform Setup",
      description: "Technical infrastructure and platform development",
      icon: Users,
      features: ["Gaming software", "Platform integration", "Security measures", "Technical support"]
    }
  ];

  const benefits = [
    "Legal operation in regulated markets",
    "Access to payment providers and banks",
    "Player trust and credibility",
    "Protection from regulatory changes",
    "International market expansion",
    "Professional compliance framework"
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
                  <Dice6 className="h-5 w-5" />
                  <span className="text-sm font-medium">Official Gaming Authority</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Gaming & Betting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Licensing Authority
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Professional gaming and betting license services for online casinos, sports betting, and gaming platforms. 
                Navigate complex gaming regulations with our specialized regulatory expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                  Apply for Gaming License
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
                  Compare Jurisdictions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Gambling Licensing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Gaming License Expertise</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-muted-foreground mb-6">
                    The business model of our clients often expands into online gaming, betting, or casino services — 
                    and to do that legally and successfully, a proper license is key. Each region has its own rules, 
                    and getting through the process takes more than just paperwork.
                  </p>
                  <p className="text-lg text-muted-foreground mb-6">
                    With the right setup, you can unlock access to payment providers, partners, and international 
                    markets with confidence. We help you get started from scratch — choosing where to register, 
                    setting up the company, and preparing the needed documents.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Since gaming often connects with other industries, we also support our partners with banking 
                    and payment solutions or simply keeping up with ongoing rules — so everything works together smoothly.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Why Gaming Licensing Matters</h3>
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

        {/* Gaming Services */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Gaming Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gamblingServices.map((service, index) => {
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
            <h2 className="text-3xl font-bold text-center mb-12">Gaming License Jurisdictions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {gamblingLicenses.map((license, index) => (
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
                      <h4 className="font-semibold text-sm">License Features:</h4>
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
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">License Application Process</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Consultation</h3>
                  <p className="text-sm text-muted-foreground">
                    Assess your gaming business model and recommend optimal jurisdiction
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Prepare application documents, policies, and technical specifications
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Submission</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit application and liaise with gaming authorities
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Launch</h3>
                  <p className="text-sm text-muted-foreground">
                    License approval and ongoing compliance support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Gaming Platform?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get your gaming license and start operating legally worldwide
            </p>
            <Button size="lg" variant="secondary">
              Start License Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GamblingServicesPage;