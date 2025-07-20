
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Upload, Award, ArrowRight } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const ProcessSteps = () => {
  const { openApplicationDialog } = useApplicationDialog();

  const steps = [
    {
      number: "1",
      icon: CreditCard,
      title: "Choose a Plan",
      description: "Explore and select the best licensing plan for your needs."
    },
    {
      number: "2", 
      icon: Upload,
      title: "Make Payment & Upload Documents",
      description: "Securely pay for your plan and submit the required documents."
    },
    {
      number: "3",
      icon: Award,
      title: "Get Certified",
      description: "Our experts process your application, ensuring quick approval."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Simple Process</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Started With APEX
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our seamless platform helps you obtain the necessary permits quickly and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="process-step">
                  <div className="step-number">
                    {step.number}
                  </div>
                  
                  <CardHeader className="pt-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-center">{step.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground text-center">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="gap-2 px-8 py-4" 
              onClick={openApplicationDialog}
            >
              Start Your Application
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
