
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Upload, Award, ArrowRight } from 'lucide-react';

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
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">{content.subtitle}</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.title}
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {content.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              return (
                <div key={index} className="relative">
                  <Card className="process-step">
                    <div className="step-number">
                      {step.number}
                    </div>
                    
                    <CardHeader className="pt-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                      </div>
                      <CardTitle className="text-xl text-center">{step.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground text-center">{step.description}</p>
                    </CardContent>
                  </Card>
                  
                  {index < content.steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="gap-2 px-8 py-4" 
              onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {content.ctaText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
