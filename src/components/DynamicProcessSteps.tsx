
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { ArrowRight, CreditCard, Upload, Award, Star } from 'lucide-react';

interface ProcessContent {
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
    icon: string;
  }>;
}

const DynamicProcessSteps = () => {
  const [content, setContent] = useState<ProcessContent>({
    title: 'How to Get Your License',
    subtitle: 'Simple Process',
    description: 'Follow our streamlined process to get your trading license quickly and efficiently.',
    cta_text: 'Start Your Application',
    steps: [
      {
        number: '01',
        title: 'Choose Your License Category',
        description: 'Select the appropriate license category based on your trading needs and volume requirements.',
        icon: 'CreditCard'
      },
      {
        number: '02',
        title: 'Submit Application',
        description: 'Fill out our comprehensive application form with all required documentation.',
        icon: 'Upload'
      },
      {
        number: '03',
        title: 'Payment & Verification',
        description: 'Complete secure payment and undergo our verification process.',
        icon: 'Award'
      },
      {
        number: '04',
        title: 'Receive Your License',
        description: 'Get your official trading license and start trading on supported exchanges.',
        icon: 'Award'
      }
    ]
  });

  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const processContent = await supabaseDataManager.getContent('process');
        if (processContent && processContent.process_title) {
          setContent({
            title: processContent.process_title || content.title,
            subtitle: processContent.process_subtitle || content.subtitle,
            description: processContent.process_description || content.description,
            cta_text: processContent.process_cta_text || content.cta_text,
            steps: processContent.process_steps || content.steps
          });
        }
      } catch (error) {
        console.error('Error loading process content:', error);
      }
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
    <section id="process" className="py-24 bg-gradient-to-br from-background via-muted/20 to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">{content.subtitle}</span>
            </div>
            <h2 className="text-section gradient-text mb-8">
              {content.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative">
            {/* Background connecting lines */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20 -translate-y-1/2"></div>
            
            {content.steps.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Award;
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-emerald-500 to-teal-500', 
                'from-purple-500 to-pink-500',
                'from-orange-500 to-red-500'
              ];
              return (
                <div key={index} className="relative z-10 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-background to-muted/30">
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${colors[index] || colors[0]} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.number}
                    </div>
                    
                    <CardHeader className="pt-12 pb-6">
                      <div className={`w-20 h-20 bg-gradient-to-r ${colors[index] || colors[0]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-xl text-center font-bold">{step.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pb-8">
                      <CardDescription className="text-muted-foreground text-center leading-relaxed">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  {index < content.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              className="btn-primary gap-3 px-12 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" 
              onClick={openApplicationDialog}
            >
              {content.cta_text}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicProcessSteps;
