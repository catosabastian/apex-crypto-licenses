
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Upload, Award, ArrowRight, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const ProcessSteps = () => {
  const [content, setContent] = useState({
    title: 'How to Get Your License',
    subtitle: 'Simple Process',
    description: 'Follow our streamlined 3-step process to obtain your cryptocurrency trading license quickly and efficiently.',
    steps: [],
    ctaText: 'Start Your Application'
  });
  

  useEffect(() => {
    const loadContent = async () => {
      const processContent = await supabaseDataManager.getContent('process');
      setContent({
        title: processContent.title || 'How to Get Your License',
        subtitle: processContent.subtitle || 'Simple Process',
        description: processContent.description || 'Follow our streamlined 3-step process to obtain your cryptocurrency trading license quickly and efficiently.',
        steps: processContent.steps || [],
        ctaText: processContent.ctaText || 'Start Your Application'
      });
    };

    const handleContentUpdate = () => {
      loadContent();
    };

    loadContent();
    supabaseDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  const iconMap: Record<string, any> = {
    CreditCard,
    Upload,
    Award
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--muted))_1px,transparent_1px),linear-gradient(-45deg,hsl(var(--muted))_1px,transparent_1px)] bg-[length:60px_60px] opacity-30"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced header section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center gap-3 mb-6 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">{content.subtitle}</span>
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {content.title}
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Trusted by 1000+ clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Average 24h processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Regulatory compliant</span>
              </div>
            </div>
          </div>

          {/* Enhanced process steps */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative group">
                  {/* Connection line for desktop */}
                  {index < content.steps.length - 1 && (
                    <div className="hidden md:block absolute top-20 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-primary/30 z-10">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                  
                  <Card className={`relative h-full border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover:border-primary/50 ${
                    isEven ? 'hover:shadow-primary/20' : 'hover:shadow-accent/20'
                  }`}>
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      isEven ? 'from-primary/5 to-transparent' : 'from-accent/5 to-transparent'
                    } rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Step number badge */}
                    <div className={`absolute -top-4 left-6 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg ${
                      isEven ? 'bg-primary' : 'bg-accent'
                    }`}>
                      {step.number || index + 1}
                    </div>
                    
                    <CardHeader className="pt-12 pb-6">
                      {/* Enhanced icon design */}
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 ${
                        isEven 
                          ? 'bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20' 
                          : 'bg-gradient-to-br from-accent/20 to-accent/10 group-hover:from-accent/30 group-hover:to-accent/20'
                      }`}>
                        {IconComponent && (
                          <IconComponent className={`h-10 w-10 transition-colors duration-500 ${
                            isEven ? 'text-primary' : 'text-accent'
                          }`} />
                        )}
                      </div>
                      
                      <CardTitle className="text-2xl text-center mb-3 group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-8">
                      <p className="text-muted-foreground text-center text-lg leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Estimated time badge */}
                      <div className="flex justify-center mt-4">
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {index === 0 ? '5 min' : index === 1 ? '24-48h' : '1-3 days'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Enhanced CTA section */}
          <div className="text-center">
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 backdrop-blur-sm">
              <p className="text-muted-foreground mb-6 text-lg">
                Ready to get started? Begin your professional licensing journey today.
              </p>
              
              <Button 
                size="lg" 
                className="gap-3 px-10 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Award className="h-5 w-5" />
                {content.ctaText}
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                * No hidden fees • Transparent process • 100% secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
