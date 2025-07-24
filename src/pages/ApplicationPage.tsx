import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedApplicationForm from '@/components/EnhancedApplicationForm';
import { Shield, CheckCircle, Clock, FileText, Users, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ApplicationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const features = [
    {
      icon: Shield,
      title: "Secure Application",
      description: "Your data is encrypted and processed with bank-level security"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Applications reviewed within 24-48 hours"
    },
    {
      icon: FileText,
      title: "Expert Review",
      description: "Professional assessment by licensed experts"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal assistance throughout the process"
    }
  ];

  const benefits = [
    "Regulatory compliance across multiple jurisdictions",
    "Access to global banking and payment networks",
    "Professional license certificate with verification",
    "Ongoing compliance and regulatory support",
    "International business expansion opportunities",
    "Enhanced credibility and trust with partners"
  ];

  const steps = [
    { number: 1, title: "Personal Information", description: "Basic details and contact information" },
    { number: 2, title: "License Category", description: "Select your license type and jurisdiction" },
    { number: 3, title: "Payment & Documents", description: "Complete payment and upload required documents" },
    { number: 4, title: "Review & Submit", description: "Final review before submission" }
  ];

  // Smooth scroll effect on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Helmet>
        <title>Apply for Cryptocurrency License - APEX Global</title>
        <meta name="description" content="Submit your cryptocurrency license application with APEX Global. Professional licensing services with expert support and fast processing." />
        <meta name="keywords" content="crypto license application, cryptocurrency license, fintech license, trading license" />
      </Helmet>
      
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <Badge variant="outline" className="mb-4 px-4 py-2">
                  <Lock className="w-4 h-4 mr-2" />
                  Secure Application Portal
                </Badge>
              </div>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Apply for Your Cryptocurrency License
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start your journey to obtaining a professional cryptocurrency trading license. 
                Our streamlined application process ensures fast, secure, and expert-guided licensing.
              </p>
              <div className="flex justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Expert Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>24-48h Processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Secure & Confidential</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative">
                    <Card className={`transition-all duration-300 ${currentStep >= step.number ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <CardHeader className="text-center pb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {currentStep > step.number ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <span className="font-bold">{step.number}</span>
                          )}
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                        <CardDescription className="text-sm">{step.description}</CardDescription>
                      </CardHeader>
                    </Card>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border transform -translate-y-1/2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Application Portal</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
                      <CardHeader>
                        <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">License Benefits</h3>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">What You Get</h3>
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium">Official License Certificate</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="font-medium">Regulatory Compliance Package</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-medium">Ongoing Expert Support</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-primary" />
                        <span className="font-medium">Secure Verification System</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="application-form" className="py-20 bg-gradient-to-br from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Submit Your Application</h2>
                <p className="text-lg text-muted-foreground">
                  Complete the form below to begin your cryptocurrency licensing process
                </p>
              </div>
              <div className="bg-background rounded-2xl shadow-2xl border border-border p-8">
                <EnhancedApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationPage;