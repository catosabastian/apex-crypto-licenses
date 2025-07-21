import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { 
  Shield, 
  Award, 
  CreditCard, 
  Globe, 
  CheckCircle, 
  FileText, 
  Search, 
  Headphones,
  Clock,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const EnhancedWhatIsLicense = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('whatIsLicense');
        setContent(data?.comprehensive_guide || {});
      } catch (error) {
        console.error('Error loading license content:', error);
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
    Award,
    CreditCard,
    Globe,
    CheckCircle,
    FileText,
    Search,
    Headphones
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg mx-auto max-w-md"></div>
            <div className="h-6 bg-muted rounded mx-auto max-w-2xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
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
      <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container text-center">
          <p className="text-muted-foreground">License information is being loaded...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            Understanding Licensing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {content.title}
          </h2>
          <p className="text-xl text-primary/90 font-semibold mb-4">
            {content.subtitle}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.introduction}
          </p>
        </div>

        {/* What is a License Section */}
        <div className="mb-16">
          <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-background animate-fade-in">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4">
                <Lightbulb className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">{content.what_is_license?.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.what_is_license?.description}
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="font-semibold text-primary">
                  {content.what_is_license?.simple_explanation}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why You Need a License */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">{content.why_needed?.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.why_needed?.reasons?.map((reason: any, index: number) => {
              const IconComponent = iconMap[reason.icon] || Shield;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/20 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      {reason.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How It Works - Process Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">{content.how_it_works?.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.how_it_works?.steps?.map((step: any, index: number) => {
              const IconComponent = iconMap[step.icon] || CheckCircle;
              return (
                <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/20 animate-fade-in"
                      style={{ animationDelay: `${index * 150}ms` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-primary border-primary/30">
                        Step {step.step}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {step.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                  {index < content.how_it_works.steps.length - 1 && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
                      <ArrowRight className="h-6 w-6 text-primary/40" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">{content.benefits?.title}</h3>
          <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/10">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.benefits?.list?.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-center gap-3 animate-fade-in"
                       style={{ animationDelay: `${index * 50}ms` }}>
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simple Analogy */}
        <div className="mb-16">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
            <CardHeader className="text-center">
              <div className="mx-auto p-4 rounded-full bg-primary/20 w-fit mb-4">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">{content.simple_analogy?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center text-muted-foreground leading-relaxed">
                {content.simple_analogy?.description}
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />

        {/* Call to Action */}
        <div className="text-center animate-fade-in">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Your License?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your journey towards legal cryptocurrency trading with our expert guidance and world-class licensing solutions.
          </p>
          <Button 
            size="lg" 
            onClick={openApplicationDialog}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedWhatIsLicense;