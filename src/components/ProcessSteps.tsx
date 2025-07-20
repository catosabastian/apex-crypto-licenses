
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Upload, Award, ArrowRight, Clock, CheckCircle, Star, Zap } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { useEffect, useState } from 'react';
import { unifiedDataManager } from '@/utils/unifiedDataManager';

const ProcessSteps = () => {
  const [content, setContent] = useState(unifiedDataManager.getContent().process);
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const handleContentUpdate = () => {
      setContent(unifiedDataManager.getContent().process);
    };

    unifiedDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      unifiedDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  const iconMap: Record<string, any> = {
    CreditCard,
    Upload,
    Award
  };

  const enhancedSteps = [
    {
      ...content.steps[0],
      timeline: "5-10 minutes",
      features: ["Secure form processing", "Real-time validation", "Progress tracking"],
      trustIndicator: "256-bit SSL encryption"
    },
    {
      ...content.steps[1],
      timeline: "24-48 hours",
      features: ["AI-powered review", "Compliance verification", "Document analysis"],
      trustIndicator: "99.8% approval rate"
    },
    {
      ...content.steps[2],
      timeline: "Instant delivery",
      features: ["Digital certificate", "QR verification", "Blockchain secured"],
      trustIndicator: "Globally recognized"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-accent/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              <Badge variant="outline" className="px-4 py-2 bg-background/80 backdrop-blur-sm border-primary/20">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                {content.subtitle}
              </Badge>
              <div className="h-1 w-16 bg-gradient-to-r from-accent to-primary rounded-full"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {content.title}
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-amber-500" />
                <span>4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="relative h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {enhancedSteps.map((step, index) => {
                const IconComponent = iconMap[step.icon];
                return (
                  <div key={index} className="relative group">
                    <Card className="relative overflow-hidden border-2 border-transparent bg-background/60 backdrop-blur-sm hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-2">
                      {/* Step number badge */}
                      <div className="absolute -top-4 left-8 z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg border-4 border-background">
                          <span className="text-lg font-bold text-white">{step.number}</span>
                        </div>
                      </div>

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <CardHeader className="pt-12 pb-6 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          {IconComponent && <IconComponent className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />}
                        </div>
                        
                        <CardTitle className="text-2xl text-center mb-3 group-hover:text-primary transition-colors duration-300">
                          {step.title}
                        </CardTitle>
                        
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">{step.timeline}</span>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2 mb-6">
                          {step.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Trust indicator */}
                        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-3 text-center">
                          <span className="text-xs font-medium text-primary">{step.trustIndicator}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                <p className="text-white/90 mb-6 max-w-md mx-auto">
                  Join thousands of traders who have successfully obtained their licenses
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="gap-3 px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-200" 
                  onClick={openApplicationDialog}
                >
                  {content.ctaText}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
