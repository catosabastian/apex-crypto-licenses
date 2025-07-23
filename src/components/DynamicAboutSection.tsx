
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Shield, Clock, Users, CheckCircle } from 'lucide-react';

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const DynamicAboutSection = () => {
  const [content, setContent] = useState<AboutContent>({
    title: 'Why Choose Our Licensing Services?',
    subtitle: 'Industry Leading Expertise',
    description: 'With years of experience in cryptocurrency regulation and compliance, we provide the most comprehensive licensing services in the industry.',
    services: [
      {
        icon: 'Shield',
        title: 'Regulatory Compliance',
        description: 'Full compliance with international trading regulations and standards.'
      },
      {
        icon: 'Clock',
        title: 'Fast Processing',
        description: 'Quick turnaround times with our streamlined application process.'
      },
      {
        icon: 'Users',
        title: 'Expert Support',
        description: '24/7 support from our team of regulatory experts.'
      }
    ]
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const aboutContent = await supabaseDataManager.getContent('about');
        if (aboutContent.about_title) {
          setContent({
            title: aboutContent.about_title || content.title,
            subtitle: aboutContent.about_subtitle || content.subtitle,
            description: aboutContent.about_description || content.description,
            services: aboutContent.about_services || content.services
          });
        }
      } catch (error) {
        console.error('Error loading about content:', error);
      }
    };

    loadContent();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return Shield;
      case 'Clock': return Clock;
      case 'Users': return Users;
      default: return CheckCircle;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          <p className="text-xl text-muted-foreground mb-2">{content.subtitle}</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">{content.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicAboutSection;
