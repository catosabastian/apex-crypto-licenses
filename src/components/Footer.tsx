
import { Globe, MessageSquare, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useApplicationDialog } from "./ApplicationDialog";

const Footer = () => {
  const { openApplicationDialog } = useApplicationDialog();
  
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">APEX</h2>
                <p className="text-xs opacity-80">Crypto Licensing Regulatory</p>
              </div>
            </div>
            
            <p className="mt-4 text-sm opacity-80 max-w-md">
              APEX Crypto Licensing provides official regulatory licensing for cryptocurrency traders and institutions. Our mission is to ensure compliance and security in digital asset trading.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#licenses" className="opacity-80 hover:opacity-100 transition-opacity">License Categories</a></li>
              <li><a href="#verification" className="opacity-80 hover:opacity-100 transition-opacity">Verification Process</a></li>
              <li><button onClick={openApplicationDialog} className="opacity-80 hover:opacity-100 transition-opacity text-left">Application</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 opacity-80" />
                <span className="opacity-80">support@apexcrypto.reg</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 opacity-80" />
                <span className="opacity-80">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 opacity-20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs opacity-70">
            © {new Date().getFullYear()} APEX Crypto Licensing Regulatory. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-xs opacity-70">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Legal Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
