
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, Globe, CheckCircle, Users, Zap, Award, TrendingUp } from 'lucide-react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const FeaturesSection = () => {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('features');
        console.log('Features content loaded:', data);
        setContent(data || {});
      } catch (error) {
        console.error('Failed to load features content:', error);
        setContent({});
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    Shield,
    Clock,
    Globe,
    CheckCircle,
    Users,
    Zap,
    Award,
    TrendingUp
  };

  if (loading) {
    return (
      <div className="py-24 bg-muted/20">
        <div className="container text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    );
  }

  const features = content.features || [];

  return (
    <section className="py-24 bg-muted/20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6">
            {content.badge || 'Key Features'}
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {content.title || 'Why Choose Our Licensing Platform'}
          </h2>
          
          <p className="text-xl text-muted-foreground">
            {content.subtitle || 'Comprehensive licensing solutions designed for the modern crypto ecosystem'}
          </p>
        </div>

        {features.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Shield;
              
              return (
                <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          // Default features when no content is loaded
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Regulatory Compliance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Full compliance with international cryptocurrency regulations and standards.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Fast Processing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Quick application processing with transparent timeline and status updates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <Globe className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Global Recognition</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Internationally recognized licenses accepted by major trading platforms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
