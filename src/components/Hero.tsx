
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Users, Award, Star, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { UnifiedApplicationForm } from './UnifiedApplicationForm';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    licenses: 0,
    traders: 0,
    volume: 0,
    satisfaction: 0
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Animate stats on mount
    const animateStats = () => {
      const targetStats = { licenses: 2847, traders: 15642, volume: 2.8, satisfaction: 98 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setStats({
          licenses: Math.floor(targetStats.licenses * easeOut),
          traders: Math.floor(targetStats.traders * easeOut),
          volume: parseFloat((targetStats.volume * easeOut).toFixed(1)),
          satisfaction: Math.floor(targetStats.satisfaction * easeOut)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timer = setTimeout(animateStats, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/5">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Interactive Mouse Effect */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: 'translate3d(0, 0, 0)',
          }}
        />

        {/* Geometric Patterns */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent/30 rotate-45 animate-bounce-slow" />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Status Badge */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Badge variant="outline" className="mb-6 px-4 py-2 glass-card border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300">
              <Shield className="w-4 h-4 mr-2" />
              Regulated & Certified Authority
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text bg-gradient-to-r from-primary via-accent-emerald to-primary bg-clip-text text-transparent">
                Professional
              </span>
              <br />
              <span className="text-foreground">Crypto Trading</span>
              <br />
              <span className="gradient-text bg-gradient-to-r from-accent-amber via-primary to-accent-emerald bg-clip-text text-transparent">
                Licenses
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Get officially certified to trade cryptocurrencies with our globally recognized licensing program. 
              <span className="text-primary font-medium"> Join thousands of professional traders</span> who trust our certification.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="animate-fade-in-up grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stats.licenses.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Active Licenses</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300 group">
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stats.traders.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Certified Traders</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-accent-emerald/20 hover:border-accent-emerald/40 transition-all duration-300 group">
              <div className="text-2xl lg:text-3xl font-bold text-accent-emerald mb-2 group-hover:scale-110 transition-transform duration-300">
                ${stats.volume}B+
              </div>
              <div className="text-sm text-muted-foreground">Trading Volume</div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-accent-amber/20 hover:border-accent-amber/40 transition-all duration-300 group">
              <div className="text-2xl lg:text-3xl font-bold text-accent-amber mb-2 group-hover:scale-110 transition-transform duration-300">
                {stats.satisfaction}%
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" style={{ animationDelay: '0.5s' }}>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Application
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="application-form-description">
                <div id="application-form-description" className="sr-only">
                  Complete the trading license application form to get certified
                </div>
                <UnifiedApplicationForm />
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-8 py-4 text-lg font-semibold glass-card border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              View License Types
              <Award className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Globally Recognized</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-accent-amber" />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-emerald" />
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span>Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
