
import { Shield, CheckCircle, FileCheck, AlertTriangle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">About the Authority</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ensuring Regulatory Compliance for Digital Asset Trading
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-10">
            <div>
              <p className="text-lg text-muted-foreground mb-6">
                The APEX Crypto Licensing Authority is the premier regulatory body ensuring compliance, security, and legitimacy in digital asset trading operations worldwide.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6">
                Our licensing framework establishes a foundation for traders and institutions to operate within recognized legal standards, ensuring both consumer protection and market integrity.
              </p>
              
              <div className="flex gap-2 items-center p-4 border border-muted bg-muted/30 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                <p className="text-sm">Trading digital assets without proper licensing may lead to regulatory penalties in many jurisdictions.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Regulatory Protection</h3>
                  <p className="text-muted-foreground">Operate with confidence under our internationally recognized licensing framework.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Verified Status</h3>
                  <p className="text-muted-foreground">Enhance trust with clients and platforms through verified trader status.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Official Documentation</h3>
                  <p className="text-muted-foreground">Receive tamper-proof documentation recognized by major trading platforms.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 p-6 bg-muted/30 border border-muted rounded-lg">
            <div className="shrink-0 h-16 w-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Legal Notice</h4>
              <p className="text-sm text-muted-foreground">
                APEX Crypto Licensing Authority provides official licensing documentation for cryptocurrency traders and institutions based on verification of trading activity and identity. Our licenses are designed to ensure compliance with evolving digital asset regulations worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
