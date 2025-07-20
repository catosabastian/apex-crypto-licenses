
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Users, 
  Lock, 
  Building, 
  HeadphonesIcon 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Licensing",
      description: "Get your trading certificate quickly with our streamlined process"
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Ensure full adherence to local and international regulations"
    },
    {
      icon: Users,
      title: "Expert Assistance",
      description: "Our team guides you through every step for a hassle-free experience"
    },
    {
      icon: Lock,
      title: "Secure Document Handling",
      description: "Your sensitive information is protected with top-tier security"
    },
    {
      icon: Building,
      title: "Multi-Industry Support",
      description: "Suitable for businesses across various sectors"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your licensing needs"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">Our Features</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Our Licensing Services
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive licensing solutions with unmatched expertise and support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
