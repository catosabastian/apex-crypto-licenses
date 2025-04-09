
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe, Shield, AlertTriangle } from 'lucide-react';
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
    <section className="relative min-h-screen pt-16 flex flex-col">
      <div className="container flex-1 flex flex-col justify-center py-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm mb-8">
            <Shield className="h-4 w-4" />
            <span className="font-semibold">Official Regulatory Service</span>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Secure official recognition for your cryptocurrency trading activities with government-compliant licensing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={openApplicationDialog}>
              Apply for License
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' })}>
              Verify License
              <Globe className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Regulatory Compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Identity Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <span className="text-sm">Trade Protection</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
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
            background: 'white',
            border: `2px solid ${body.color}`
          }}
          title={body.name}
        >
          <span className="font-bold text-xs">{body.acronym}</span>
        </div>
      ))}
    </div>
  );
};

export default Hero;
