
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Globe, CheckCircle } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { useEffect, useState } from 'react';
import { unifiedDataManager } from '@/utils/unifiedDataManager';

const WhatIsLicense = () => {
  const [content, setContent] = useState(unifiedDataManager.getContent().whatIsLicense);
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const handleContentUpdate = () => {
      setContent(unifiedDataManager.getContent().whatIsLicense);
    };

    unifiedDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      unifiedDataManager.removeEventListener('content_updated', handleContentUpdate);
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
