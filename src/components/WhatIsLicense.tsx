
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Globe, CheckCircle } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const WhatIsLicense = () => {
  const { openApplicationDialog } = useApplicationDialog();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Understanding Licensing</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is a Trading License?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A crypto trading certificate is a regulatory permit that allows a company to legally operate a cryptocurrency exchange or trading platform. It ensures compliance with financial laws, anti-money laundering (AML), and know-your-customer (KYC) regulations.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Requirements vary by jurisdiction, with some countries having strict licensing frameworks. Obtaining one enhances credibility and legal security for crypto businesses.
              </p>

              <Button 
                size="lg" 
                className="gap-2" 
                onClick={openApplicationDialog}
              >
                Get Certified
                <Shield className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="feature-card">
                <CardHeader className="pb-3">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Legal Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Full adherence to financial regulations and legal requirements</p>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardHeader className="pb-3">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">AML & KYC</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Anti-money laundering and know-your-customer compliance</p>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardHeader className="pb-3">
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Global Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Accepted across multiple jurisdictions and platforms</p>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardHeader className="pb-3">
                  <CheckCircle className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Enhanced Credibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Builds trust with clients and business partners</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLicense;
