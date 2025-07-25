
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Globe, CheckCircle } from 'lucide-react';

import { useEffect, useState } from 'react';
//

const WhatIsLicense = () => {
  const content = {
    subtitle: "Understanding Licenses",
    title: "What is a Crypto Trading License?",
    description: [
      "A cryptocurrency trading license is an official authorization that allows individuals and organizations to legally trade digital assets in compliance with regulatory requirements.",
      "Our licenses provide comprehensive legal coverage, ensuring your trading activities are fully compliant with international cryptocurrency regulations and local jurisdiction requirements."
    ],
    features: [
      {
        icon: 'Shield',
        title: 'Legal Protection',
        description: 'Complete legal framework for your trading operations'
      },
      {
        icon: 'FileText',
        title: 'Regulatory Compliance',
        description: 'Full compliance with international crypto regulations'
      },
      {
        icon: 'Globe',
        title: 'Global Recognition',
        description: 'Accepted in 180+ countries worldwide'
      },
      {
        icon: 'CheckCircle',
        title: 'Verified Status',
        description: 'Officially verified and registered license status'
      }
    ],
    ctaText: "Apply for License"
  };
  

  const iconMap: Record<string, any> = {
    Shield,
    FileText,
    Globe,
    CheckCircle
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">{content.subtitle}</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {content.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              {content.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <Button 
                size="lg" 
                className="gap-2" 
                onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {content.ctaText}
                <Shield className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {content.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <Card key={index} className="feature-card">
                    <CardHeader className="pb-3">
                      {IconComponent && <IconComponent className="h-8 w-8 text-primary mb-2" />}
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLicense;
