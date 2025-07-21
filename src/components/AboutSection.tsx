
import { Shield, CheckCircle, FileCheck, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const AboutSection = () => {
  const [content, setContent] = useState<any>({
    title: "Professional Cryptocurrency Trading Licenses",
    subtitle: "Authority & Compliance",
    description: [
      "We are a globally recognized authority in cryptocurrency trading license issuance, providing comprehensive licensing solutions for individuals and businesses entering the digital asset trading space.",
      "Our licenses ensure full regulatory compliance and provide the legal framework necessary for legitimate cryptocurrency trading operations."
    ],
    features: [
      {
        icon: "Shield",
        title: "Regulatory Compliance",
        description: "Full compliance with international cryptocurrency trading regulations"
      },
      {
        icon: "CheckCircle", 
        title: "Global Recognition",
        description: "Licenses recognized by major cryptocurrency exchanges worldwide"
      },
      {
        icon: "FileCheck",
        title: "Legal Framework",
        description: "Complete legal protection for your trading activities"
      }
    ],
    legalNotice: "This service provides legitimate cryptocurrency trading licenses issued by authorized regulatory bodies. All licenses are subject to verification and compliance requirements."
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('about');
        if (data && Object.keys(data).length > 0) {
          setContent(data);
        }
      } catch (error) {
        console.error('Failed to load about content:', error);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    Shield,
    CheckCircle,
    FileCheck
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{content.subtitle}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {content.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-10">
            <div>
              {content.description && Array.isArray(content.description) ? 
                content.description.map((paragraph: string, index: number) => (
                  <p key={index} className="text-lg text-muted-foreground mb-6">
                    {paragraph}
                  </p>
                )) : (
                  <p className="text-lg text-muted-foreground mb-6">
                    {content.description || "We provide professional cryptocurrency trading licenses for individuals and businesses."}
                  </p>
                )
              }
              
              <div className="flex gap-2 items-center p-4 border border-muted bg-muted/30 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
                <p className="text-sm">Trading digital assets without proper licensing may lead to regulatory penalties in many jurisdictions.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {content.features && Array.isArray(content.features) ? 
                content.features.map((feature: any, index: number) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="flex gap-4">
                    <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Professional Licensing</h3>
                      <p className="text-muted-foreground">Complete cryptocurrency trading license solutions</p>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 p-6 bg-muted/30 border border-muted rounded-lg">
            <div className="shrink-0 h-16 w-16 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Legal Notice</h4>
              <p className="text-sm text-muted-foreground">
                {content.legalNotice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
