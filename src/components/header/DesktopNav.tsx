
import React from 'react';
import { Button } from '@/components/ui/button';

import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const DesktopNav = () => {
  
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
      <a href="#licenses" className="text-sm font-medium hover:text-accent transition-colors">Licenses</a>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1">
          Services
          <ChevronDown className="h-3 w-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/services/crypto" className="w-full">Crypto Licensing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/fintech" className="w-full">FinTech Services</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/gambling" className="w-full">Gambling Licensing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/corporate" className="w-full">Corporate Services</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <a href="#verification" className="text-sm font-medium hover:text-accent transition-colors">Verification</a>
      <Button variant="default" size="sm" onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}>Apply Now</Button>
    </nav>
  );
};

export default DesktopNav;
