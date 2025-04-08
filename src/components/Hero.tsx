
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe, Shield, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVerifyLicense = () => {
    navigate('/verification');
  };

  return (
    <section className="relative min-h-screen pt-16 flex flex-col">
      <div className="container flex-1 flex flex-col justify-center py-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-5 py-2 rounded-full text-lg font-medium mb-8">
            <Shield className="h-5 w-5" />
            <span>Unified Regulatory Framework</span>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10">
            Secure official recognition for your cryptocurrency trading activities with globally-compliant licensing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              Apply for License
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2"
              onClick={handleVerifyLicense}
            >
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
  const regulatoryAuthorities = [
    { name: 'Securities and Exchange Commission', acronym: 'SEC', country: 'USA', color: '#1A478B' },
    { name: 'Commodity Futures Trading Commission', acronym: 'CFTC', country: 'USA', color: '#00467F' },
    { name: 'European Securities and Markets Authority', acronym: 'ESMA', country: 'EU', color: '#154880' },
    { name: 'Financial Conduct Authority', acronym: 'FCA', country: 'UK', color: '#1E4F8A' },
    { name: 'Monetary Authority of Singapore', acronym: 'MAS', country: 'Singapore', color: '#27558F' },
    { name: 'Swiss Financial Market Supervisory Authority', acronym: 'FINMA', country: 'Switzerland', color: '#2D5C93' },
    { name: 'Financial Services Agency', acronym: 'FSA', country: 'Japan', color: '#346298' },
    { name: 'Australian Securities and Investments Commission', acronym: 'ASIC', country: 'Australia', color: '#3A689D' },
    { name: 'Financial Services Commission', acronym: 'FSC', country: 'South Korea', color: '#416EA1' },
    { name: 'Dubai Financial Services Authority', acronym: 'DFSA', country: 'UAE', color: '#4774A6' },
    { name: 'Canadian Securities Administrators', acronym: 'CSA', country: 'Canada', color: '#4D7AAB' },
    { name: 'Securities and Futures Commission', acronym: 'SFC', country: 'Hong Kong', color: '#5380AF' },
    { name: 'Autorité des Marchés Financiers', acronym: 'AMF', country: 'France', color: '#5986B4' },
    { name: 'Bundesanstalt für Finanzdienstleistungsaufsicht', acronym: 'BaFin', country: 'Germany', color: '#5F8CB8' },
    { name: 'Central Bank of Brazil', acronym: 'BCB', country: 'Brazil', color: '#6592BD' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {regulatoryAuthorities.map((authority, idx) => (
        <div 
          key={authority.acronym}
          className="bubble"
          style={{
            width: `${40 + Math.random() * 30}px`,
            height: `${40 + Math.random() * 30}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${idx * 0.4}s`,
            animationDuration: `${8 + Math.random() * 7}s`,
            background: '#f8f9fa',
            opacity: '0.7',
            border: `1px solid ${authority.color}`,
            boxShadow: `0 2px 8px rgba(0,0,0,0.05)`
          }}
        >
          <span className="font-bold text-xs text-gray-700" title={`${authority.name} (${authority.country})`}>
            {authority.acronym}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Hero;
