
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileText, CreditCard, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const ProcessPage = () => {
  const { openApplicationDialog } = useApplicationDialog();
  
  const steps = [
    {
      step: 1,
      title: "Application Submission",
      description: "Complete our comprehensive application form with your personal and trading information.",
      icon: FileText,
      duration: "5-10 minutes",
      details: [
        "Personal identification details",
        "Trading experience and volume",
        "Regulatory compliance history",
        "Business entity information (if applicable)"
      ]
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Submit required documentation for identity and financial verification.",
      icon: Shield,
      duration: "24-48 hours",
      details: [
        "Government-issued photo ID",
        "Proof of address (recent utility bill)",
        "Bank statements (last 3 months)",
        "Trading history and volume proof"
      ]
    },
    {
      step: 3,
      title: "Payment Processing",
      description: "Secure payment of license fees through our encrypted payment system.",
      icon: CreditCard,
      duration: "Instant",
      details: [
        "Multiple cryptocurrency options",
        "Secure wallet-to-wallet transfer",
        "Immediate payment confirmation",
        "Transaction receipt and tracking"
      ]
    },
    {
      step: 4,
      title: "License Issuance",
      description: "Receive your official trading license certificate and unique license ID.",
      icon: Award,
      duration: "1-3 business days",
      details: [
        "Official PDF certificate",
        "Unique license identification number",
        "QR code for instant verification",
        "Digital wallet integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Application Process - How to Get Your Crypto Trading License</title>
        <meta name="description" content="Step-by-step guide to obtaining your cryptocurrency trading license. Simple 4-step process with 24-48 hour turnaround time." />
        <meta name="keywords" content="crypto license application process, trading license steps, cryptocurrency certification procedure" />
        <link rel="canonical" href="https://apexregulations.com/process" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">Application Process</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Simple 4-Step Process to
                <span className="block text-accent">Get Your License</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our streamlined application process ensures you can get your cryptocurrency 
                trading license quickly and efficiently, with full regulatory compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={step.step} className="relative">
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-24 w-0.5 h-32 bg-accent/30"></div>
                    )}
                    
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <Card className="flex-1">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl">
                                Step {step.step}: {step.title}
                              </CardTitle>
                              <CardDescription className="text-base mt-2">
                                {step.description}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {step.duration}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Overview */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Application Timeline</h2>
                <p className="text-lg text-muted-foreground">
                  Typical processing time for each license category
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Fast Track</CardTitle>
                    <CardDescription className="text-center">Categories 4 & 5</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">24 Hours</div>
                    <p className="text-sm text-muted-foreground">
                      Expedited processing for professional and institutional licenses
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Standard</CardTitle>
                    <CardDescription className="text-center">Category 3</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">48 Hours</div>
                    <p className="text-sm text-muted-foreground">
                      Regular processing time for advanced trader licenses
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">Basic</CardTitle>
                    <CardDescription className="text-center">Categories 1 & 2</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">72 Hours</div>
                    <p className="text-sm text-muted-foreground">
                      Standard processing for basic and standard licenses
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Application Requirements</h2>
                <p className="text-lg text-muted-foreground">
                  What you need to prepare before starting your application
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-accent" />
                      Required Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Valid government-issued photo ID</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Proof of address (utility bill, bank statement)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Bank statements (last 3 months)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Trading history and volume proof</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-accent" />
                      Eligibility Criteria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Minimum age of 18 years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Clean regulatory compliance history</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Sufficient trading volume for chosen category</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">Valid business registration (institutional only)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent/5">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Application?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of traders who have successfully obtained their cryptocurrency trading licenses through our streamlined process.
              </p>
              <Button size="lg" onClick={openApplicationDialog} className="gap-2">
                Begin Application
                <FileText className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProcessPage;
