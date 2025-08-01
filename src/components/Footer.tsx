
import { Globe, MessageSquare, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  
  const [settings, setSettings] = useState<any>({
    companyName: 'APEX Crypto Licensing',
    supportEmail: 'support@apexregulations.com',
    contactPhone: '+1 (609) 918-3047',
    companyAddress: '123 Business District',
    city: 'Financial City, FC 12345',
    country: 'United States',
    website: 'https://apexregulations.com/'
  });
  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // const { data: websiteSettings } = await supabase
        //   .from('website_settings')
        //   .select('*')
        //   .single();

        // if (websiteSettings) {
        //   setSettings(prev => ({
        //     ...prev,
        //     companyName: websiteSettings.site_name || prev.companyName,
        //     supportEmail: websiteSettings.contact_email || prev.supportEmail,
        //     contactPhone: websiteSettings.contact_phone || prev.contactPhone,
        //     companyAddress: websiteSettings.contact_address?.split(',')[0] || prev.companyAddress,
        //     city: websiteSettings.contact_address?.split(',')[1]?.trim() || prev.city,
        //   }));
        // }
      } catch (error) {
        // Error loading settings handled silently, use defaults
      }
    };

    loadSettings();
  }, []);
  
  return (
    <footer className="bg-primary text-primary-foreground vibrant-glow">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">{settings.companyName}</h2>
                <p className="text-xs opacity-80">Crypto Licensing Regulatory</p>
              </div>
            </div>
            
            <p className="mt-4 text-sm opacity-80 max-w-md">
              {settings.companyName} provides official regulatory licensing for cryptocurrency traders and institutions. Our mission is to ensure compliance and security in digital asset trading.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><a href="#licenses" className="opacity-80 hover:opacity-100 transition-opacity">License Categories</a></li>
              <li><Link to="/verify" className="opacity-80 hover:opacity-100 transition-opacity">Verification Process</Link></li>
              <li><Link to="/apply" className="opacity-80 hover:opacity-100 transition-opacity">Application</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 opacity-80" />
                <span className="opacity-80">{settings.supportEmail}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 opacity-80" />
                <span className="opacity-80">{settings.contactPhone}</span>
              </li>
              {/* <li className="flex items-start gap-2">
                <Globe className="h-4 w-4 opacity-80 mt-0.5" />
                <div className="opacity-80">
                  <div>{settings.companyAddress}</div>
                  <div>{settings.city}</div>
                  <div>{settings.country}</div>
                </div>
              </li> */}
              {settings.website && (
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 opacity-80" />
                  <a href={settings.website} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
                    Visit Website
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 opacity-20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs opacity-70">
            © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-xs opacity-70">
            <Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
            <Link to="/legal-notice" className="hover:opacity-100 transition-opacity">Legal Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
