
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Users, 
  Lock, 
  Building, 
  HeadphonesIcon 
} from 'lucide-react';
//

const FeaturesSection = () => {
  const content = {
    subtitle: "Why Choose Us",
    title: "Comprehensive Licensing Solutions",
    description: "Our platform offers everything you need to obtain and maintain your cryptocurrency trading license.",
    items: [
      {
        icon: 'Zap',
        title: 'Fast Processing',
        description: 'Get your license approved in as little as 24 hours with our streamlined process.'
      },
      {
        icon: 'Shield',
        title: 'Secure & Compliant',
        description: 'Bank-level security with full regulatory compliance and legal backing.'
      },
      {
        icon: 'Users',
        title: 'Expert Support',
        description: '24/7 dedicated support from our team of regulatory and compliance experts.'
      },
      {
        icon: 'Lock',
        title: 'Data Protection',
        description: 'Your sensitive information is protected with military-grade encryption.'
      },
      {
        icon: 'Building',
        title: 'Institutional Grade',
        description: 'Solutions designed for both individual traders and large institutions.'
      },
      {
        icon: 'HeadphonesIcon',
        title: 'Ongoing Support',
        description: 'Continuous support and guidance throughout your licensing journey.'
      }
    ]
  };

  const iconMap: Record<string, any> = {
    Zap,
    Shield,
    Users,
    Lock,
    Building,
    HeadphonesIcon
  };

  return (
    <section className="py-20 bg-background">
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
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.items.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <Card key={index} className="feature-card group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
