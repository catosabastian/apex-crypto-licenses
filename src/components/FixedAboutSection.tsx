import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string; icon: string }[];
  legalNotice: string;
}

const FixedAboutSection = () => {
  const [content, setContent] = useState<AboutContent>({
    title: "About Professional Licensing",
    subtitle: "Industry-Leading Certification Services",
    description: "We provide comprehensive cryptocurrency trading licenses and professional certifications to help you navigate the complex world of digital finance with confidence.",
    features: [
      {
        title: "Regulatory Compliance",
        description: "Stay compliant with evolving cryptocurrency regulations worldwide.",
        icon: "Shield"
      },
      {
        title: "Professional Recognition",
        description: "Gain industry recognition and credibility in the crypto space.",
        icon: "CheckCircle"
      }
    ],
    legalNotice: "Professional licensing ensures compliance with financial regulations."
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const aboutData = await supabaseDataManager.getContent('about');
        if (aboutData && typeof aboutData === 'object') {
          const data = aboutData as any;
          setContent({
            title: data.title || content.title,
            subtitle: data.subtitle || content.subtitle,
            description: data.description || content.description,
            features: data.features || content.features,
            legalNotice: data.legalNotice || content.legalNotice
          });
        }
      } catch (error) {
        console.error('Error loading about content:', error);
      }
    };

    loadContent();

    const handleContentUpdate = () => {
      loadContent();
    };

    supabaseDataManager.addEventListener('content_updated', handleContentUpdate);

    return () => {
      supabaseDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  const iconMap: Record<string, any> = {
    Shield,
    CheckCircle,
    AlertTriangle,
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">{content.title}</h2>
          <p className="text-xl text-muted-foreground mb-8">{content.subtitle}</p>
          <p className="text-lg leading-relaxed">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {content.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Shield;
            return (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive mb-2">Legal Notice</h3>
                <p className="text-sm text-muted-foreground">{content.legalNotice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FixedAboutSection;