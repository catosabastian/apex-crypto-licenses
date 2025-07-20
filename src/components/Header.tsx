
import { useState } from 'react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import MobileNav from './header/MobileNav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openApplicationDialog } = useApplicationDialog();
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <Logo />
        <DesktopNav />
        <MobileNav 
          isOpen={isMenuOpen} 
          onToggle={toggleMenu} 
          onNavItemClick={closeMenu} 
        />
      </div>
    </header>
  );
};

export default Header;
