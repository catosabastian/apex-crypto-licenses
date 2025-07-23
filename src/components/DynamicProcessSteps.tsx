
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { ArrowRight } from 'lucide-react';

interface ProcessContent {
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
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
        description: 'Select the appropriate license category based on your trading needs and volume requirements.'
      },
      {
        number: '02',
        title: 'Submit Application',
        description: 'Fill out our comprehensive application form with all required documentation.'
      },
      {
        number: '03',
        title: 'Payment & Verification',
        description: 'Complete secure payment and undergo our verification process.'
      },
      {
        number: '04',
        title: 'Receive Your License',
        description: 'Get your official trading license and start trading on supported exchanges.'
      }
    ]
  });

  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const processContent = await supabaseDataManager.getContent('process');
        if (processContent.process_title) {
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

    loadContent();
  }, []);

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          <p className="text-xl text-muted-foreground mb-2">{content.subtitle}</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content.steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            onClick={openApplicationDialog}
          >
            {content.cta_text}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DynamicProcessSteps;
