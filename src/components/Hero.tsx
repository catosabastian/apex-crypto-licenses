
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, TrendingUp, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApplicationDialog } from './ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [content, setContent] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
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
    Play,
    CheckCircle
  };

  const statsData = content.stats || [
    { number: "10K+", label: "Licensed Professionals", description: "Trusted by industry leaders" },
    { number: "98%", label: "Success Rate", description: "Application approval rate" },
    { number: "24/7", label: "Expert Support", description: "Professional assistance" }
  ];

  useEffect(() => {
    if (statsData.length > 0) {
      const interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % statsData.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [statsData.length]);

  const defaultContent = {
    badge: "Industry Leading Solutions",
    title: {
      line1: "Professional",
      line2: "Cryptocurrency",
      line3: "Licensing"
    },
    subtitle: "Secure your future in digital finance with our comprehensive licensing solutions. Join thousands of professionals who trust our platform.",
    primaryCTA: "Get Licensed Now",
    secondaryCTA: "Watch Demo",
    trustIndicators: [
      "Regulatory Compliant",
      "Industry Certified",
      "Globally Recognized"
    ],
    statsTitle: "Trusted Worldwide"
  };

  const displayContent = { ...defaultContent, ...content };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-primary/3 to-accent/8">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-white/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25% 75%, rgba(120, 119, 198, 0.15) 0%, transparent 60%),
                         radial-gradient(circle at 75% 25%, rgba(255, 183, 77, 0.12) 0%, transparent 60%),
                         radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 70%)`
      }} />
      
      {/* Advanced Grid Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23183B4A' fill-opacity='0.08'%3e%3cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20-20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
      }} />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl animate-float-delay" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent-amber/10 rounded-full blur-xl animate-pulse" />

      <div className="container relative z-10 flex flex-col justify-center min-h-screen py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Left Column - Main Content */}
            <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'}`}>
              {/* Premium Badge */}
              <div className="inline-flex">
                <Badge 
                  variant="outline" 
                  className="glass-card text-primary border-primary/30 px-8 py-4 text-base font-semibold bg-primary/8 hover:bg-primary/12 transition-all duration-500 hover:scale-105 shadow-lg"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {displayContent.badge}
                </Badge>
              </div>

              {/* Enhanced Main Headline */}
              <div className="space-y-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
                  <span className="block text-foreground drop-shadow-sm">{displayContent.title?.line1}</span>
                  <span className="block gradient-text animate-gradient bg-gradient-to-r from-primary via-accent to-accent-amber bg-300% drop-shadow-lg">{displayContent.title?.line2}</span>
                  <span className="block text-foreground drop-shadow-sm">{displayContent.title?.line3}</span>
                </h1>
                
                <p className="text-2xl md:text-3xl text-muted-foreground max-w-2xl leading-relaxed font-light">
                  {displayContent.subtitle}
                </p>
              </div>

              {/* Enhanced CTA Section */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Button
                  size="lg"
                  className="btn-primary text-xl px-12 py-8 shadow-2xl hover:shadow-primary/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden group"
                  onClick={openApplicationDialog}
                >
                  <span className="relative z-10 flex items-center">
                    {displayContent.primaryCTA}
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-outline text-xl px-12 py-8 group border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  {displayContent.secondaryCTA}
                </Button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-12">
                {displayContent.trustIndicators?.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-3 text-base text-muted-foreground group hover:text-foreground transition-colors">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse group-hover:scale-125 transition-transform" />
                    <span className="font-medium">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Right Column - Interactive Stats Dashboard */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-delay' : 'opacity-0 translate-y-8'}`}>
              <div className="glass-card p-10 rounded-3xl shadow-2xl bg-white/12 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold gradient-text mb-2">
                      {displayContent.statsTitle}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                  </div>
                  
                  {/* Enhanced Animated Stat Display */}
                  {statsData.length > 0 && (
                    <div className="text-center space-y-6 min-h-[240px] flex flex-col justify-center relative">
                      <div className="relative overflow-hidden rounded-2xl p-8 bg-primary/5 border border-primary/20">
                        <div className="text-7xl font-bold text-primary mb-4 animate-fade-in leading-none">
                          {statsData[currentStat]?.number}
                        </div>
                        <div className="text-2xl font-semibold text-foreground mb-3">
                          {statsData[currentStat]?.label}
                        </div>
                        <div className="text-lg text-muted-foreground leading-relaxed">
                          {statsData[currentStat]?.description}
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="absolute bottom-0 left-0 h-1 bg-primary rounded-full animate-gradient" 
                             style={{ width: '100%', animation: 'progress 4s linear infinite' }} />
                      </div>
                    </div>
                  )}

                  {/* Enhanced Stat Navigation */}
                  <div className="flex justify-center gap-3">
                    {statsData.map((_, index) => (
                      <button
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-500 hover:scale-125 ${
                          index === currentStat 
                            ? 'bg-primary scale-125 shadow-lg shadow-primary/50' 
                            : 'bg-primary/40 hover:bg-primary/70'
                        }`}
                        onClick={() => setCurrentStat(index)}
                      />
                    ))}
                  </div>

                  {/* Additional Visual Elements */}
                  <div className="grid grid-cols-3 gap-4 pt-6">
                    {[CheckCircle, Shield, TrendingUp].map((Icon, index) => (
                      <div key={index} className="flex flex-col items-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group">
                        <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        <div className="w-8 h-0.5 bg-primary/30 mt-2 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/15 rounded-full blur-2xl animate-float" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/15 rounded-full blur-2xl animate-float-delay" />
              <div className="absolute top-1/2 -right-4 w-6 h-6 bg-accent-amber rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-12 border-2 border-primary/60 rounded-full p-1 bg-white/10 backdrop-blur-sm">
            <div className="w-2 h-4 bg-primary rounded-full mx-auto animate-scroll" />
          </div>
          <span className="text-sm text-muted-foreground font-medium">Scroll to explore</span>
        </div>
      </div>

      {/* Additional CSS for custom animations */}
      <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }
        
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </section>
  );
};

export default Hero;
