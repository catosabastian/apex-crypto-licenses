import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Shield, Globe, Users, BookOpen, TrendingUp, Headphones, Award, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EnhancedAboutSection = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('about');
        setContent(data?.apex_services || {});
      } catch (error) {
        console.error('Error loading about content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    const handleContentUpdate = () => {
      loadContent();
    };

    supabaseDataManager.addEventListener('content_updated', handleContentUpdate);
    return () => supabaseDataManager.removeEventListener('content_updated', handleContentUpdate);
  }, []);

  const iconMap: Record<string, any> = {
    Shield,
    Globe,
    Users,
    BookOpen,
    TrendingUp,
    Headphones,
    Award,
    CheckCircle
  };

  if (loading) {
    return (
      <section id="about" className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg mx-auto max-w-md"></div>
            <div className="h-6 bg-muted rounded mx-auto max-w-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!content.title) {
    return (
      <section id="about" className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container text-center">
          <p className="text-muted-foreground">About content is being loaded...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            About APEX
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {content.title}
          </h2>
          <p className="text-xl text-primary/90 font-semibold mb-4">
            {content.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* World-Class Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose APEX?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.worldclass_features?.map((feature: any, index: number) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 animate-fade-in" 
                    style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Comprehensive Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services?.map((service: any, index: number) => {
              const IconComponent = iconMap[service.icon] || Shield;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/20 hover:-translate-y-1 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 w-fit group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-gradient-to-r from-destructive/10 via-destructive/5 to-destructive/10 border border-destructive/20 rounded-lg p-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="h-6 w-6 text-destructive" />
            <h4 className="font-semibold text-destructive">Important Legal Notice</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {content.legal_notice?.replace('⚠️ **Important Legal Notice**: ', '') || 
             'Trading digital assets without proper licensing is illegal in most jurisdictions and can result in severe penalties, including criminal charges and substantial fines. APEX Trading Regulations ensures your complete regulatory compliance and legal protection.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAboutSection;