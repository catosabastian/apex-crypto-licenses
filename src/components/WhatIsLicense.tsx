
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Shield, Award, FileText, Users, Building2, Lock } from 'lucide-react';
import { useApplicationDialog } from './ApplicationDialog';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const WhatIsLicense = () => {
  const [content, setContent] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const data = await supabaseDataManager.getContent('license-info');
        setContent(data);
      } catch (error) {
        console.error('Failed to load license info content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    CheckCircle,
    ArrowRight,
    Shield,
    Award,
    FileText,
    Users,
    Building2,
    Lock
  };

  // Default content when data is not available
  const defaultContent = {
    subtitle: "Professional Licensing",
    title: "What is a Digital License?",
    description: "A comprehensive overview of digital licensing, its benefits, and how it can transform your business operations.",
    overview: {
      title: "License Overview",
      subtitle: "Understanding Digital Credentials",
      description: "Digital licenses are official credentials that verify your authority to operate in specific industries or platforms. They provide legal recognition and trust for your business operations.",
      benefits: [
        {
          icon: "Shield",
          title: "Security & Trust",
          description: "Verified credentials that build customer confidence"
        },
        {
          icon: "Award",
          title: "Professional Recognition",
          description: "Official acknowledgment of your expertise"
        },
        {
          icon: "Building2",
          title: "Business Growth",
          description: "Unlock new opportunities and partnerships"
        },
        {
          icon: "Lock",
          title: "Legal Protection",
          description: "Compliance with industry regulations"
        }
      ]
    },
    types: {
      title: "License Categories",
      categories: [
        {
          tier: "Basic",
          name: "Standard License",
          description: "Essential licensing for small businesses",
          price: "$299",
          duration: "Annual"
        },
        {
          tier: "Pro",
          name: "Professional License",
          description: "Advanced features for growing companies",
          price: "$599",
          duration: "Annual"
        },
        {
          tier: "Enterprise",
          name: "Enterprise License",
          description: "Full-scale solutions for large organizations",
          price: "$1,299",
          duration: "Annual"
        }
      ]
    },
    quickApply: {
      title: "Ready to Get Licensed?",
      description: "Start your application process today and join thousands of licensed professionals.",
      buttonText: "Apply Now",
      note: "Application typically processed within 5-7 business days"
    },
    requirements: {
      title: "Requirements",
      items: [
        "Valid business registration",
        "Professional credentials",
        "Compliance documentation",
        "Identity verification",
        "Payment processing setup"
      ]
    },
    support: {
      title: "Need Help?",
      description: "Our support team is here to assist you with your licensing needs.",
      buttonText: "Contact Support"
    }
  };

  // Merge loaded content with defaults
  const displayContent = {
    ...defaultContent,
    ...content,
    overview: {
      ...defaultContent.overview,
      ...content.overview,
      benefits: content.overview?.benefits || defaultContent.overview.benefits
    },
    types: {
      ...defaultContent.types,
      ...content.types,
      categories: content.types?.categories || defaultContent.types.categories
    },
    requirements: {
      ...defaultContent.requirements,
      ...content.requirements,
      items: content.requirements?.items || defaultContent.requirements.items
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent)] animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,184,0,0.05),transparent)]" />
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">{displayContent.subtitle}</span>
            </div>
            <h2 className="text-section gradient-text mb-8">
              {displayContent.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {displayContent.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Main Content Card */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="modern-card border-0 shadow-lg hover-lift animate-fade-in-delay">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{displayContent.overview.title}</CardTitle>
                      <CardDescription className="text-base">{displayContent.overview.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {displayContent.overview.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {displayContent.overview.benefits.map((benefit, index) => {
                      const IconComponent = iconMap[benefit.icon];
                      return (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors animate-fade-in-delay">
                          {IconComponent && <IconComponent className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />}
                          <div>
                            <div className="font-semibold text-sm">{benefit.title}</div>
                            <div className="text-sm text-muted-foreground">{benefit.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* License Types */}
              <Card className="modern-card border-0 shadow-lg animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    {displayContent.types.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {displayContent.types.categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 hover-lift">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                            {category.tier}
                          </Badge>
                          <div>
                            <div className="font-semibold">{category.name}</div>
                            <div className="text-sm text-muted-foreground">{category.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{category.price}</div>
                          <div className="text-xs text-muted-foreground">{category.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply Card */}
              <Card className="modern-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 animate-scale-in">
                <CardHeader className="text-center">
                  <CardTitle className="gradient-text">{displayContent.quickApply.title}</CardTitle>
                  <CardDescription>{displayContent.quickApply.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full btn-primary hover-glow"
                    onClick={openApplicationDialog}
                  >
                    {displayContent.quickApply.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {displayContent.quickApply.note}
                  </p>
                </CardContent>
              </Card>

              {/* Requirements Card */}
              <Card className="modern-card border-0 shadow-lg animate-fade-in-delay">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {displayContent.requirements.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {displayContent.requirements.items.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3 animate-fade-in-delay" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="modern-card border-0 shadow-lg animate-float">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {displayContent.support.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {displayContent.support.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full hover-glow">
                    {displayContent.support.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLicense;
