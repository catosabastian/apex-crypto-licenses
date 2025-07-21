
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Users, 
  Lock, 
  Building, 
  HeadphonesIcon 
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturesSection = () => {
  const [content, setContent] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await supabaseDataManager.getContent('features');
        setContent(data);
      } catch (error) {
        console.error('Failed to load features content:', error);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    Zap,
    Shield,
    Users,
    Lock,
    Building,
    HeadphonesIcon
  };

  // Default content when database content is missing
  const defaultContent = {
    subtitle: "Our Features",
    title: "Comprehensive Licensing Solutions",
    description: "Discover the features that make our cryptocurrency licensing process the most trusted in the industry.",
    items: [
      {
        icon: "Shield",
        title: "Regulatory Compliance",
        description: "Ensure full compliance with international cryptocurrency regulations and standards."
      },
      {
        icon: "Zap",
        title: "Fast Processing",
        description: "Quick and efficient license processing with minimal waiting times."
      },
      {
        icon: "Users",
        title: "Expert Support", 
        description: "Professional guidance from industry experts throughout the licensing process."
      },
      {
        icon: "Lock",
        title: "Secure Process",
        description: "Bank-level security for all your documents and sensitive information."
      },
      {
        icon: "Building",
        title: "Institutional Support",
        description: "Specialized services for institutional clients and large-scale operations."
      },
      {
        icon: "HeadphonesIcon",
        title: "24/7 Support",
        description: "Round-the-clock customer support for all your licensing needs."
      }
    ]
  };

  // Use database content if available, otherwise use defaults
  const displayContent = {
    subtitle: content.subtitle || defaultContent.subtitle,
    title: content.title || defaultContent.title,
    description: content.description || defaultContent.description,
    items: content.items || defaultContent.items
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Skeleton className="h-8 w-48 mx-auto mb-4" />
              <Skeleton className="h-12 w-96 mx-auto mb-6" />
              <Skeleton className="h-6 w-2/3 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground">Unable to load features. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">{displayContent.subtitle}</span>
              <div className="h-1 w-12 bg-primary"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {displayContent.title}
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {displayContent.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(displayContent.items) && displayContent.items.map((feature, index) => {
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
