
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  cta_text: string;
  stats: Array<{ value: string; label: string }>;
}

const DynamicHero = () => {
  const [content, setContent] = useState<HeroContent>({
    title: 'Professional Trading License Services',
    subtitle: 'Secure Your Trading Future',
    description: 'Get licensed to trade across major cryptocurrency exchanges with our comprehensive licensing services. Fast, secure, and legally compliant.',
    cta_text: 'Get Licensed Now',
    stats: [
      { value: '2000+', label: 'Licensed Traders' },
      { value: '15+', label: 'Supported Exchanges' },
      { value: '99.9%', label: 'Approval Rate' }
    ]
  });
  
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const heroContent = await supabaseDataManager.getContent('hero');
        if (heroContent.hero_title) {
          setContent({
            title: heroContent.hero_title || content.title,
            subtitle: heroContent.hero_subtitle || content.subtitle,
            description: heroContent.hero_description || content.description,
            cta_text: heroContent.hero_cta_text || content.cta_text,
            stats: heroContent.hero_stats || content.stats
          });
        }
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    };

    loadContent();
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {content.title}
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
            {content.subtitle}
          </p>
        </div>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {content.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
            onClick={openApplicationDialog}
          >
            {content.cta_text}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {content.stats.map((stat, index) => {
            const icons = [Shield, TrendingUp, Users];
            const Icon = icons[index] || Shield;
            
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicHero;
