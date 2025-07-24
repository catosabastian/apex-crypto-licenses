
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const DesktopNav = () => {
  const { openApplicationDialog } = useApplicationDialog();
  
  return (
    <nav className="hidden md:flex items-center gap-6">
      <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
      
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-accent transition-colors">
          Services
          <ChevronDown className="h-3 w-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/services/crypto" className="w-full">
              Crypto Licensing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/fintech" className="w-full">
              FinTech Services
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/gambling" className="w-full">
              Gaming & Gambling
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/corporate" className="w-full">
              Corporate Services
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <a href="#verification" className="text-sm font-medium hover:text-accent transition-colors">Verification</a>
      <Button variant="outline" size="sm" asChild>
        <Link to="/setup">Setup</Link>
      </Button>
      <Button variant="default" size="sm" onClick={openApplicationDialog}>Apply Now</Button>
    </nav>
  );
};

export default DesktopNav;
