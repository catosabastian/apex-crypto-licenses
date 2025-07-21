
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Globe, Shield, Zap, TrendingUp, Award, Clock } from 'lucide-react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const AboutSection = () => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('about');
        console.log('About content loaded:', data);
        setContent(data || {});
      } catch (error) {
        console.error('Failed to load about content:', error);
        setContent({});
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    CheckCircle,
    Users,
    Globe,
    Shield,
    Zap,
    TrendingUp,
    Award,
    Clock
  };

  if (loading) {
    return (
      <div className="py-24 bg-background">
        <div className="container text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  const features = content.features || [];
  const stats = content.stats || [];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6">
            {content.badge || 'About APEX'}
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title || 'Leading Crypto Licensing Authority'}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.subtitle || 'We provide comprehensive regulatory licensing solutions for cryptocurrency traders and institutions worldwide.'}
          </p>
        </div>

        {/* Stats Grid */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Features Grid */}
        {features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Shield;
              
              return (
                <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Default content when no features are available */}
        {features.length === 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Regulatory Compliance</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Full compliance with international cryptocurrency regulations and standards.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
