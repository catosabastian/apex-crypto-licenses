
import { Shield, CheckCircle, FileCheck, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Skeleton } from '@/components/ui/skeleton';

const AboutSection = () => {
  const [content, setContent] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await supabaseDataManager.getContent('about');
        setContent(data);
      } catch (error) {
        console.error('Failed to load about content:', error);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    Shield,
    CheckCircle,
    FileCheck
  };

  // Default content when database content is missing
  const defaultContent = {
    subtitle: "About Us",
    title: "Professional Crypto Licensing Authority",
    description: [
      "We provide comprehensive cryptocurrency trading licenses for individuals and institutions seeking regulatory compliance.",
      "Our licensing process ensures full regulatory compliance across multiple jurisdictions."
    ],
    features: [
      {
        icon: "Shield",
        title: "Regulatory Compliance",
        description: "Full compliance with international cryptocurrency regulations"
      },
      {
        icon: "CheckCircle", 
        title: "Verified Process",
        description: "Thoroughly vetted application and verification process"
      },
      {
        icon: "FileCheck",
        title: "Legal Documentation",
        description: "Complete legal documentation and certification"
      }
    ],
    legalNotice: "All trading activities must comply with local and international regulations. Licensing requirements may vary by jurisdiction."
  };

  // Use database content if available, otherwise use defaults
  const displayContent = {
    subtitle: content.subtitle || defaultContent.subtitle,
    title: content.title || defaultContent.title,
    description: content.description || defaultContent.description,
    features: content.features || defaultContent.features,
    legalNotice: content.legalNotice || defaultContent.legalNotice
  };

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-96 mb-6" />
            <div className="grid md:grid-cols-2 gap-12 mb-10">
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Unable to load content. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{displayContent.subtitle}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {displayContent.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-10">
            <div>
              {Array.isArray(displayContent.description) ? 
                displayContent.description.map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted-foreground mb-6">
                    {paragraph}
                  </p>
                )) :
                <p className="text-lg text-muted-foreground mb-6">
                  {displayContent.description}
                </p>
              }
              
              <div className="flex gap-2 items-center p-4 border border-muted bg-muted/30 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                <p className="text-sm">Trading digital assets without proper licensing may lead to regulatory penalties in many jurisdictions.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {Array.isArray(displayContent.features) && displayContent.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 p-6 bg-muted/30 border border-muted rounded-lg">
            <div className="shrink-0 h-16 w-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Legal Notice</h4>
              <p className="text-sm text-muted-foreground">
                {displayContent.legalNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
