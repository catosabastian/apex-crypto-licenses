
import { Shield, CheckCircle, FileCheck, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const AboutSection = () => {
  const [content, setContent] = useState({
    title: 'Your Trusted Partner in Cryptocurrency Licensing',
    subtitle: 'About APEX',
    description: ['APEX is a leading provider of cryptocurrency licensing solutions, helping businesses navigate the complex regulatory landscape of digital assets.'],
    features: [],
    legalNotice: 'This service is provided for informational purposes. Please consult with legal professionals for specific regulatory advice in your jurisdiction.'
  });

  useEffect(() => {
    const loadContent = async () => {
      const aboutContent = await supabaseDataManager.getContent('about');
      if (aboutContent && Object.keys(aboutContent).length > 0) {
        setContent({
          title: aboutContent.title || 'Your Trusted Partner in Cryptocurrency Licensing',
          subtitle: aboutContent.subtitle || 'About APEX',
          description: aboutContent.description || ['APEX is a leading provider of cryptocurrency licensing solutions, helping businesses navigate the complex regulatory landscape of digital assets.'],
          features: aboutContent.features || [],
          legalNotice: aboutContent.legalNotice || 'This service is provided for informational purposes. Please consult with legal professionals for specific regulatory advice in your jurisdiction.'
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
    CheckCircle,
    FileCheck
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{content.subtitle}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {content.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-10">
            <div>
              {content.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground mb-6">
                  {paragraph}
                </p>
              ))}
              
              <div className="flex gap-2 items-center p-4 border border-muted bg-muted/30 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                <p className="text-sm">Trading digital assets without proper licensing may lead to regulatory penalties in many jurisdictions.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {content.features.map((feature, index) => {
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
                {content.legalNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
