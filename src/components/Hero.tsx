import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, TrendingUp, Award } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen pt-16 flex flex-col government-gradient">
      <div className="container flex-1 flex flex-col justify-center py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm mb-8">
            <Shield className="h-4 w-4" />
            <span className="font-semibold">Official Regulatory Authority</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
            Simplifying Your Trading
            <span className="block gold-accent">Certificate Process</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            Effortless trading certificate acquisition with speed and compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 text-lg" 
              onClick={openApplicationDialog}
            >
              Get Started
              <TrendingUp className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg" 
              onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Verify License
              <Award className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-4 w-4 rounded-full bg-green-400"></div>
              <span className="text-white/90 font-medium">Regulatory Compliance</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-4 w-4 rounded-full bg-blue-400"></div>
              <span className="text-white/90 font-medium">Identity Verification</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-4 w-4 rounded-full bg-purple-400"></div>
              <span className="text-white/90 font-medium">Trade Protection</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
      
      <RegulatoryBubbles />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-32"></div>
    </section>
  );
};

const RegulatoryBubbles = () => {
  const regulatoryBodies = [
    { name: 'Securities and Exchange Commission', acronym: 'SEC', color: '#1E4899' },
    { name: 'Commodity Futures Trading Commission', acronym: 'CFTC', color: '#006633' },
    { name: 'Financial Conduct Authority', acronym: 'FCA', color: '#9D2235' },
    { name: 'European Securities and Markets Authority', acronym: 'ESMA', color: '#003399' },
    { name: 'Monetary Authority of Singapore', acronym: 'MAS', color: '#DA291C' },
    { name: 'Financial Services Agency', acronym: 'FSA', color: '#2A3990' },
    { name: 'Financial Market Supervisory Authority', acronym: 'FINMA', color: '#D40F7D' },
    { name: 'Australian Securities and Investments Commission', acronym: 'ASIC', color: '#234B8F' },
    { name: 'Dubai Financial Services Authority', acronym: 'DFSA', color: '#8C1D40' },
    { name: 'International Organization of Securities Commissions', acronym: 'IOSCO', color: '#004A85' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {regulatoryBodies.map((body, idx) => (
        <div 
          key={body.acronym}
          className="bubble"
          style={{
            width: `${60 + Math.random() * 30}px`,
            height: `${60 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${idx * 0.5}s`,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(1px)',
            border: `1px solid rgba(${body.color.replace('#', '').match(/.{1,2}/g)?.map(val => parseInt(val, 16) + ',') || ''} 0.2)`,
            opacity: '0.4'
          }}
          title={body.name}
        >
          <span className="font-bold text-xs opacity-60 text-white">{body.acronym}</span>
        </div>
      ))}
    </div>
  );
};

export default Hero;
