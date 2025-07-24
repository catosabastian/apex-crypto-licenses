
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Menu, ChevronDown, ChevronUp } from 'lucide-react';

import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick: () => void;
}

const MobileNav = ({ isOpen, onToggle, onNavItemClick }: MobileNavProps) => {
  
  const [servicesOpen, setServicesOpen] = useState(false);
  

  const handleServiceClick = () => {
    onNavItemClick();
    setServicesOpen(false);
  };

  return (
    <>
      {/* Mobile Navigation Toggle */}
      <button 
        className="md:hidden text-foreground p-2" 
        onClick={onToggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X /> : <Menu />}
      </button>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container flex flex-col py-4 gap-4">
            <Link 
              to="/about" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              About
            </Link>
            <a 
              href="#licenses" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              Licenses
            </a>
            <Link 
              to="/regulations" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              Regulations
            </Link>
            
            {/* Services Dropdown */}
            <div>
              <button 
                className="text-sm font-medium py-2 hover:text-accent transition-colors flex items-center justify-between w-full"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                {servicesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {servicesOpen && (
                <div className="ml-4 space-y-2 mt-2">
                  <Link 
                    to="/services/crypto" 
                    className="block text-sm text-muted-foreground py-1 hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    Crypto Licensing
                  </Link>
                  <Link 
                    to="/services/fintech" 
                    className="block text-sm text-muted-foreground py-1 hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    FinTech Services
                  </Link>
                  <Link 
                    to="/services/gambling" 
                    className="block text-sm text-muted-foreground py-1 hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    Gambling Licensing
                  </Link>
                  <Link 
                    to="/services/corporate" 
                    className="block text-sm text-muted-foreground py-1 hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    Corporate Services
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/verify" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              Verification
            </Link>
            <Button asChild variant="default" size="sm" className="w-full">
              <Link to="/apply" onClick={onNavItemClick}>Apply Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
