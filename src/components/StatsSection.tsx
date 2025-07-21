
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Globe, Award, Shield, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Skeleton } from '@/components/ui/skeleton';

const StatsSection = () => {
  const [content, setContent] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await supabaseDataManager.getContent('stats');
        setContent(data);
      } catch (error) {
        console.error('Failed to load stats content:', error);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    TrendingUp,
    Users,
    Globe,
    Award,
    Shield,
    Star
  };

  // Default content when database content is missing
  const defaultContent = {
    subtitle: "Trusted Worldwide",
    title: "Leading the Crypto Licensing Industry",
    description: "Trusted by thousands of traders and institutions worldwide for regulatory compliance.",
    items: [
      {
        icon: "Users",
        number: "10K+",
        label: "Licensed Traders",
        description: "Active licenses issued",
        bgColor: "bg-blue-50",
        color: "text-blue-600"
      },
      {
        icon: "Globe",
        number: "50+",
        label: "Countries",
        description: "Global coverage",
        bgColor: "bg-green-50", 
        color: "text-green-600"
      },
      {
        icon: "Award",
        number: "99.9%",
        label: "Success Rate",
        description: "Application approval",
        bgColor: "bg-yellow-50",
        color: "text-yellow-600"
      },
      {
        icon: "Shield",
        number: "100%",
        label: "Compliance",
        description: "Regulatory standards",
        bgColor: "bg-purple-50",
        color: "text-purple-600"
      }
    ],
    trustIndicator: {
      title: "Regulatory Excellence",
      description: "Our licensing process meets the highest international standards for cryptocurrency trading compliance."
    }
  };

  // Use database content if available, otherwise use defaults
  const displayContent = {
    subtitle: content.subtitle || defaultContent.subtitle,
    title: content.title || defaultContent.title,
    description: content.description || defaultContent.description,
    items: content.items || defaultContent.items,
    trustIndicator: content.trustIndicator || defaultContent.trustIndicator
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Skeleton className="h-8 w-48 mx-auto mb-6" />
              <Skeleton className="h-12 w-96 mx-auto mb-8" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-6" />
                    <Skeleton className="h-12 w-20 mx-auto mb-3" />
                    <Skeleton className="h-6 w-24 mx-auto mb-2" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground">Unable to load statistics. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">{displayContent.subtitle}</span>
            </div>
            <h2 className="text-section gradient-text mb-8">
              {displayContent.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {displayContent.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(displayContent.items) && displayContent.items.map((stat, index) => {
              const IconComponent = iconMap[stat.icon];
              return (
                <Card key={index} className="modern-card hover-lift group border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor || 'bg-primary/10'} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {IconComponent && <IconComponent className={`h-8 w-8 ${stat.color || 'text-primary'}`} />}
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
                <h3 className="text-xl font-bold text-primary">{displayContent.trustIndicator.title}</h3>
              </div>
              <p className="text-muted-foreground">
                {displayContent.trustIndicator.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
