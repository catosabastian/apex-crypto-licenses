
import { useState } from 'react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { Button } from '@/components/ui/button';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileNav from './header/MobileNav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on the home page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <Logo />
        
        <div className="flex items-center gap-4">
          <DesktopNav scrollToSection={scrollToSection} />
          
          {/* Desktop Start Application Button */}
          <Button 
            onClick={openApplicationDialog}
            className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 font-semibold"
          >
            Start Application
          </Button>
          
          <MobileNav 
            isOpen={isMenuOpen} 
            onToggle={toggleMenu} 
            onNavItemClick={closeMenu}
            scrollToSection={scrollToSection}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
