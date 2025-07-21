
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Globe, CheckCircle } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const WhatIsLicense = () => {
  const [content, setContent] = useState({
    title: 'What is a Cryptocurrency License?',
    subtitle: 'Understanding Licensing',
    description: ['A cryptocurrency license is a legal authorization that allows businesses to operate in the digital asset space while maintaining compliance with local and international regulations.'],
    content: 'Our comprehensive licensing solutions ensure your business operates within legal frameworks while providing the flexibility to grow and expand in the cryptocurrency market.',
    benefits: ['Legal compliance with cryptocurrency regulations', 'Access to banking services and financial institutions'],
    features: [],
    ctaText: 'Get Your License'
  });
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadContent = async () => {
      const whatIsLicenseContent = await supabaseDataManager.getContent('whatIsLicense');
      if (whatIsLicenseContent && Object.keys(whatIsLicenseContent).length > 0) {
        setContent({
          title: whatIsLicenseContent.title || 'What is a Cryptocurrency License?',
          subtitle: whatIsLicenseContent.subtitle || 'Understanding Licensing',
          description: typeof whatIsLicenseContent.description === 'string' ? [whatIsLicenseContent.description] : whatIsLicenseContent.description || ['A cryptocurrency license is a legal authorization that allows businesses to operate in the digital asset space while maintaining compliance with local and international regulations.'],
          content: whatIsLicenseContent.content || 'Our comprehensive licensing solutions ensure your business operates within legal frameworks while providing the flexibility to grow and expand in the cryptocurrency market.',
          benefits: whatIsLicenseContent.benefits || ['Legal compliance with cryptocurrency regulations', 'Access to banking services and financial institutions'],
          features: whatIsLicenseContent.features || [],
          ctaText: 'Get Your License'
        });
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
    Shield,
    FileText,
    Globe,
    CheckCircle
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
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              {content.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <Button 
                size="lg" 
                className="gap-2" 
                onClick={openApplicationDialog}
              >
                {content.ctaText}
                <Shield className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {content.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <Card key={index} className="feature-card">
                    <CardHeader className="pb-3">
                      {IconComponent && <IconComponent className="h-8 w-8 text-primary mb-2" />}
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLicense;
