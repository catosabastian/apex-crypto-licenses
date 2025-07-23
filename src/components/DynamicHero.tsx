import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, TrendingUp, Users, CheckCircle, ChevronRight, Star } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  stats: {
    licenses: string;
    countries: string;
    satisfaction: string;
  };
  features: string[];
}

const DynamicHero = () => {
  const { openApplicationDialog } = useApplicationDialog();
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Professional Cryptocurrency Trading Licenses",
    subtitle: "Secure Your Future in Digital Finance",
    description: "Get certified with our comprehensive cryptocurrency trading licenses. Join thousands of professionals who have advanced their careers with our industry-recognized certifications.",
    primaryCTA: "Start Application",
    secondaryCTA: "Learn More",
    stats: {
      licenses: "10,000+",
      countries: "50+",
      satisfaction: "98%"
    },
    features: [
      "Industry-recognized certifications",
      "Comprehensive trading curriculum",
      "Professional networking opportunities",
      "Ongoing regulatory updates"
    ]
  });

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const content = await supabaseDataManager.getContentByKey('hero_section');
        if (content && typeof content === 'object') {
          setHeroContent(content as unknown as HeroContent);
        }
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    };

    loadHeroContent();

    // Listen for content updates
    const handleContentUpdate = () => {
      loadHeroContent();
    };

    supabaseDataManager.addEventListener('content_updated', handleContentUpdate);

    return () => {
      supabaseDataManager.removeEventListener('content_updated', handleContentUpdate);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-purple-900 to-blue-800 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium">Trusted by 10,000+ Professionals</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {heroContent.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {heroContent.subtitle}
            </p>
            
            <p className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto leading-relaxed">
              {heroContent.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={openApplicationDialog}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                {heroContent.primaryCTA}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm"
              >
                {heroContent.secondaryCTA}
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-300" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{heroContent.stats.licenses}</div>
                <div className="text-blue-200">Licenses Issued</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-300" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{heroContent.stats.countries}</div>
                <div className="text-blue-200">Countries Served</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{heroContent.stats.satisfaction}</div>
                <div className="text-blue-200">Satisfaction Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Features List */}
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {heroContent.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicHero;