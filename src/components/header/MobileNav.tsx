
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Menu, ChevronDown, ChevronRight } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavItemClick: () => void;
}

const MobileNav = ({ isOpen, onToggle, onNavItemClick }: MobileNavProps) => {
  const { openApplicationDialog } = useApplicationDialog();
  const [servicesOpen, setServicesOpen] = useState(false);
  
  const handleApplyClick = () => {
    openApplicationDialog();
    onNavItemClick();
  };

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
          <nav className="container flex flex-col py-4 gap-2">
            <a 
              href="#about" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              About
            </a>
            
            {/* Services Dropdown */}
            <div className="flex flex-col">
              <button
                className="flex items-center justify-between text-sm font-medium py-2 hover:text-accent transition-colors"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                {servicesOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>
              
              {servicesOpen && (
                <div className="ml-4 flex flex-col gap-1">
                  <Link 
                    to="/services/crypto" 
                    className="text-sm py-2 text-muted-foreground hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    Crypto Licensing
                  </Link>
                  <Link 
                    to="/services/fintech" 
                    className="text-sm py-2 text-muted-foreground hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    FinTech Services
                  </Link>
                  <Link 
                    to="/services/gambling" 
                    className="text-sm py-2 text-muted-foreground hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    Gaming & Gambling
                  </Link>
                  <Link 
                    to="/services/corporate" 
                    className="text-sm py-2 text-muted-foreground hover:text-accent transition-colors"
                    onClick={handleServiceClick}
                  >
                    Corporate Services
                  </Link>
                </div>
              )}
            </div>
            
            <a 
              href="#verification" 
              className="text-sm font-medium py-2 hover:text-accent transition-colors" 
              onClick={onNavItemClick}
            >
              Verification
            </a>
            <Button 
              variant="default" 
              size="sm" 
              className="w-full mt-2" 
              onClick={handleApplyClick}
            >
              Apply Now
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
