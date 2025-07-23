
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Upload, Award, ArrowRight } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
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
  const { openApplicationDialog } = useApplicationDialog();

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
    <section id="process" className="py-20 bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              <span className="text-sm text-primary font-semibold uppercase tracking-wider px-4 py-2 bg-primary/10 rounded-full border border-primary/20">{content.subtitle}</span>
              <div className="h-1 w-16 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {content.title}
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            {/* Background connecting lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20 -translate-y-1/2"></div>
            
            {content.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-emerald-500 to-teal-500', 
                'from-purple-500 to-pink-500'
              ];
              return (
                <div key={index} className="relative z-10">
                  <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-muted/30">
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${colors[index]} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.number}
                    </div>
                    
                    <CardHeader className="pt-12 pb-6">
                      <div className={`w-20 h-20 bg-gradient-to-r ${colors[index]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-110 transition-transform duration-300`}>
                        {IconComponent && <IconComponent className="h-10 w-10 text-white" />}
                      </div>
                      <CardTitle className="text-2xl text-center font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pb-8">
                      <p className="text-muted-foreground text-center leading-relaxed text-lg">{step.description}</p>
                    </CardContent>
                  </Card>
                  
                  {index < content.steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="gap-3 px-12 py-6 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" 
              onClick={openApplicationDialog}
            >
              {content.ctaText}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
