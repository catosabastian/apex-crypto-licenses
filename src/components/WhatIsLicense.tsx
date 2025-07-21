import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Shield, Award, FileText, Users, Building2, Lock } from 'lucide-react';
import { useApplicationDialog } from './ApplicationDialog';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const WhatIsLicense = () => {
  const [content, setContent] = useState<any>({});
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('license-info');
        setContent(data);
      } catch (error) {
        console.error('Failed to load license info content:', error);
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

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-3 glass-card px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">{content.subtitle}</span>
            </div>
            <h2 className="text-section gradient-text mb-8">
              {content.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {content.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Main Content Card */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="modern-card border-0 shadow-lg hover-lift">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{content.overview?.title}</CardTitle>
                      <CardDescription className="text-base">{content.overview?.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {content.overview?.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {content.overview?.benefits?.map((benefit, index) => {
                      const IconComponent = iconMap[benefit.icon];
                      return (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
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
              <Card className="modern-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-primary" />
                    {content.types?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {content.types?.categories?.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
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
              <Card className="modern-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="text-center">
                  <CardTitle className="gradient-text">{content.quickApply?.title}</CardTitle>
                  <CardDescription>{content.quickApply?.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full btn-primary"
                    onClick={openApplicationDialog}
                  >
                    {content.quickApply?.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {content.quickApply?.note}
                  </p>
                </CardContent>
              </Card>

              {/* Requirements Card */}
              <Card className="modern-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {content.requirements?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {content.requirements?.items?.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="modern-card border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {content.support?.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {content.support?.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    {content.support?.buttonText}
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