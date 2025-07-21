
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
  const [content, setContent] = useState<any>({
    title: "Why Choose Our Licensing Service",
    subtitle: "Key Features",
    description: "Experience comprehensive licensing solutions designed for modern cryptocurrency trading requirements.",
    items: [
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick license approval and issuance process"
      },
      {
        icon: "Shield",
        title: "Secure & Compliant",
        description: "Full regulatory compliance and security measures"
      },
      {
        icon: "Users",
        title: "Expert Support",
        description: "Dedicated support throughout the licensing process"
      },
      {
        icon: "Lock",
        title: "Data Protection",
        description: "Your information is protected with enterprise-grade security"
      },
      {
        icon: "Building",
        title: "Business Solutions",
        description: "Tailored licensing for businesses of all sizes"
      },
      {
        icon: "HeadphonesIcon",
        title: "24/7 Support",
        description: "Round-the-clock customer support and assistance"
      }
    ]
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('features');
        if (data && Object.keys(data).length > 0) {
          setContent(data);
        }
      } catch (error) {
        console.error('Failed to load features content:', error);
      }
    };

    loadContent();
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
            {content.items && Array.isArray(content.items) ? 
              content.items.map((feature: any, index: number) => {
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
              }) : (
                <Card className="feature-card group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Professional Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Complete cryptocurrency trading license solutions</p>
                  </CardContent>
                </Card>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
