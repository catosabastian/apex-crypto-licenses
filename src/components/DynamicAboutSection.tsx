
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Shield, Clock, Users, CheckCircle, AlertTriangle, Star } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

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
  const { openApplicationDialog } = useApplicationDialog();
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
        if (aboutContent && aboutContent.about_title) {
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

    const handleContentUpdate = () => {
      loadContent();
    };

    loadContent();
    supabaseDataManager.addEventListener('content_updated', handleContentUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
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
    <section id="about" className="py-24 bg-gradient-to-br from-background via-muted/20 to-primary/5 relative overflow-hidden">
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

          {/* Important Notice */}
          <div className="mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <Card className="border-2 border-warning/30 bg-warning/5 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-warning">
                  <AlertTriangle className="h-6 w-6" />
                  Important Legal Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground font-medium">
                  Our licensing services are designed to provide legitimate regulatory compliance for cryptocurrency trading operations. 
                  All licenses are issued in accordance with applicable jurisdictional requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Fully compliant with international standards</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Recognized by major financial institutions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Ongoing regulatory support included</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Annual compliance monitoring</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {content.services.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <Card key={index} className="modern-card hover-lift group border-0 shadow-lg">
                  <CardHeader className="pb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Join thousands of successful traders who have obtained their licenses through our expert guidance.
              </p>
              <Button 
                size="lg" 
                className="btn-primary gap-3 px-10 py-6 text-lg"
                onClick={openApplicationDialog}
              >
                <Shield className="h-6 w-6" />
                Start Your Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicAboutSection;
