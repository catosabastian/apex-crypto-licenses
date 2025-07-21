
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Globe, Award, Shield, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const StatsSection = () => {
  const [content, setContent] = useState({
    title: 'Trusted by Industry Leaders',
    subtitle: 'Our Impact',
    description: 'Join thousands of satisfied clients who have successfully obtained their cryptocurrency licenses through our platform.',
    items: [],
    trustIndicator: {
      title: 'Regulated & Secure',
      description: 'Our platform is fully regulated and follows the highest security standards in the industry.'
    }
  });

  useEffect(() => {
    const loadContent = async () => {
      const statsContent = await supabaseDataManager.getContent('stats');
      if (statsContent && Object.keys(statsContent).length > 0) {
        setContent({
          title: statsContent.title || 'Trusted by Industry Leaders',
          subtitle: statsContent.subtitle || 'Our Impact',
          description: statsContent.description || 'Join thousands of satisfied clients who have successfully obtained their cryptocurrency licenses through our platform.',
          items: statsContent.items || [],
          trustIndicator: {
            title: 'Regulated & Secure',
            description: 'Our platform is fully regulated and follows the highest security standards in the industry.'
          }
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
    TrendingUp,
    Users,
    Globe,
    Award,
    Shield,
    Star
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.items.map((stat, index) => {
              const IconComponent = iconMap[stat.icon || 'Star'];
              return (
                <Card key={index} className="modern-card hover-lift group border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                      {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Trust Indicators */}
          <div className="mt-20 text-center animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-primary">{content.trustIndicator.title}</h3>
              </div>
              <p className="text-muted-foreground">
                {content.trustIndicator.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
