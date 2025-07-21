
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Users, 
  Lock, 
  Building, 
  HeadphonesIcon 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const FeaturesSection = () => {
  const [content, setContent] = useState({
    title: 'Comprehensive Licensing Solutions',
    subtitle: 'Our Services',
    description: 'We provide end-to-end cryptocurrency licensing solutions designed to meet the evolving needs of digital asset businesses worldwide.',
    items: []
  });

  useEffect(() => {
    const loadContent = async () => {
      const featuresContent = await supabaseDataManager.getContent('features');
      if (featuresContent && Object.keys(featuresContent).length > 0) {
        setContent({
          title: featuresContent.title || 'Comprehensive Licensing Solutions',
          subtitle: featuresContent.subtitle || 'Our Services',
          description: featuresContent.description || 'We provide end-to-end cryptocurrency licensing solutions designed to meet the evolving needs of digital asset businesses worldwide.',
          items: featuresContent.items || []
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
    Zap,
    Shield,
    Users,
    Lock,
    Building,
    HeadphonesIcon
  };

  return (
    <section className="py-20 bg-background">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.items.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <Card key={index} className="feature-card group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
