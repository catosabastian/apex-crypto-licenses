
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Globe, Award, Shield, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
//

const StatsSection = () => {
  const content = {
    subtitle: "Our Impact",
    title: "Trusted by Thousands Worldwide",
    description: "Join the growing community of licensed cryptocurrency traders and institutions.",
    items: [
      {
        icon: 'TrendingUp',
        number: '15,000+',
        label: 'Active Licenses',
        description: 'Currently active trading licenses',
        bgColor: 'bg-primary/10',
        color: 'text-primary'
      },
      {
        icon: 'Users',
        number: '20,000+',
        label: 'Licensed Traders',
        description: 'Individual traders licensed',
        bgColor: 'bg-accent-emerald/10',
        color: 'text-accent-emerald'
      },
      {
        icon: 'Globe',
        number: '150+',
        label: 'Countries',
        description: 'Global market coverage',
        bgColor: 'bg-accent-amber/10',
        color: 'text-accent-amber'
      },
      {
        icon: 'Award',
        number: '99.9%',
        label: 'Success Rate',
        description: 'Application approval rate',
        bgColor: 'bg-accent/10',
        color: 'text-accent'
      }
    ],
    trustIndicator: {
      title: "Regulatory Authority Certification",
      description: "All licenses are issued under the authority of international cryptocurrency regulatory frameworks and are legally binding in participating jurisdictions."
    }
  };

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
              const IconComponent = iconMap[stat.icon];
              return (
                <Card key={index} className="modern-card hover-lift group border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {IconComponent && <IconComponent className={`h-8 w-8 ${stat.color}`} />}
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
