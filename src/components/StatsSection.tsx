
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Globe, Award, Shield, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      number: "60+",
      label: "Support Countries",
      description: "Global regulatory coverage",
      icon: Globe,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      number: "30K+",
      label: "Certifications",
      description: "Successfully issued licenses",
      icon: Award,
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      number: "15K+",
      label: "Businesses",
      description: "Trusted by companies worldwide",
      icon: Users,
      color: "text-accent-emerald",
      bgColor: "bg-accent-emerald/10"
    },
    {
      number: "24+",
      label: "Years of Experience",
      description: "Industry expertise and knowledge",
      icon: TrendingUp,
      color: "text-accent-amber",
      bgColor: "bg-accent-amber/10"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Proven Track Record</span>
            </div>
            <h2 className="text-section gradient-text mb-8">
              Trusted Globally
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our track record speaks for itself - delivering excellence in regulatory compliance worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="modern-card hover-lift group border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
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
                <h3 className="text-xl font-bold text-primary">Regulatory Excellence</h3>
              </div>
              <p className="text-muted-foreground">
                Certified by leading regulatory bodies worldwide, ensuring the highest standards of compliance and security for all our licensed traders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
