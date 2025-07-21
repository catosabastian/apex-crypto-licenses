import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, TrendingUp, Users, Shield, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApplicationDialog } from './ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [content, setContent] = useState<any>({});
  const { openApplicationDialog } = useApplicationDialog();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await supabaseDataManager.getContent('hero');
        setContent(data);
      } catch (error) {
        console.error('Failed to load hero content:', error);
      }
    };

    loadContent();
  }, []);

  const iconMap: Record<string, any> = {
    TrendingUp,
    Users,
    Shield,
    Zap,
    Play
  };

  const statsData = content.stats || [];

  useEffect(() => {
    if (statsData.length > 0) {
      const interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % statsData.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [statsData.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(255, 183, 77, 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`
      }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%239C92AC' fill-opacity='0.1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
      }} />

      <div className="container relative z-10 flex flex-col justify-center min-h-screen py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Badge */}
              <Badge 
                variant="outline" 
                className="glass-card text-primary border-primary/20 px-6 py-3 text-sm font-medium bg-primary/5 hover:bg-primary/10 transition-all duration-300"
              >
                {content.badge}
              </Badge>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-foreground">{content.title?.line1}</span>
                  <span className="block gradient-text animate-gradient">{content.title?.line2}</span>
                  <span className="block text-foreground">{content.title?.line3}</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                  {content.subtitle}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="btn-primary text-lg px-8 py-6 shadow-2xl hover:shadow-primary/50 transition-all duration-300"
                  onClick={openApplicationDialog}
                >
                  {content.primaryCTA}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-outline text-lg px-8 py-6 group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {content.secondaryCTA}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8">
                {content.trustIndicators?.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Interactive Stats */}
            <div className="relative animate-fade-in-delay">
              <div className="glass-card p-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-center gradient-text">
                    {content.statsTitle}
                  </h3>
                  
                  {/* Animated Stat Display */}
                  {statsData.length > 0 && (
                    <div className="text-center space-y-4 min-h-[200px] flex flex-col justify-center">
                      <div className="relative">
                        <div className="text-6xl font-bold text-primary mb-2 animate-fade-in">
                          {statsData[currentStat]?.number}
                        </div>
                        <div className="text-xl font-semibold text-foreground mb-2">
                          {statsData[currentStat]?.label}
                        </div>
                        <div className="text-muted-foreground">
                          {statsData[currentStat]?.description}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stat Indicators */}
                  <div className="flex justify-center gap-2">
                    {statsData.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentStat 
                            ? 'bg-primary scale-125' 
                            : 'bg-primary/30 hover:bg-primary/60'
                        }`}
                        onClick={() => setCurrentStat(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float-delay" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
          <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-scroll" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
