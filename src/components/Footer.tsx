import { Globe, MessageSquare, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useApplicationDialog } from "./ApplicationDialog";
import { useState, useEffect } from "react";
import { supabaseDataManager } from "@/utils/supabaseDataManager";

const Footer = () => {
  const { openApplicationDialog } = useApplicationDialog();
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Default values for immediate display
  const defaults = {
    companyName: "CryptoLicense Pro",
    supportEmail: "support@cryptolicensepro.com",
    contactPhone: "+1 (555) 123-4567",
    companyAddress: "123 Business Ave",
    city: "New York, NY 10001",
    country: "United States",
    website: ""
  };
  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Start with defaults for immediate display
        setSettings(defaults);
        setIsLoading(false);
        
        // Then try to load from database with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Settings loading timeout')), 3000)
        );
        
        const settingsPromise = supabaseDataManager.getSettings();
        const loadedSettings = await Promise.race([settingsPromise, timeoutPromise]) as Record<string, any>;
        
        // Merge with defaults
        setSettings(prev => ({
          ...prev,
          ...loadedSettings
        }));
      } catch (error) {
        console.error('[Footer] Error loading contact settings:', error);
        // Keep using defaults if loading fails
      }
    };

    loadSettings();

    // Listen for settings updates
    const handleSettingsUpdate = (data: any) => {
      if (data && typeof data === 'object') {
        setSettings(prev => ({
          ...prev,
          ...data
        }));
      }
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  // Helper function to get setting value with fallback
  const getSetting = (key: string) => {
    return settings[key] || defaults[key as keyof typeof defaults] || '';
  };
  
  return (
    <footer className="bg-primary text-primary-foreground vibrant-glow">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">{getSetting('companyName')}</h2>
                <p className="text-xs opacity-80">Crypto Licensing Regulatory</p>
              </div>
            </div>
            
            <p className="mt-4 text-sm opacity-80 max-w-md">
              {getSetting('companyName')} provides official regulatory licensing for cryptocurrency traders and institutions. Our mission is to ensure compliance and security in digital asset trading.
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
              {getSetting('supportEmail') && (
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 opacity-80" />
                  <span className="opacity-80">{getSetting('supportEmail')}</span>
                </li>
              )}
              {getSetting('contactPhone') && (
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 opacity-80" />
                  <span className="opacity-80">{getSetting('contactPhone')}</span>
                </li>
              )}
              {(getSetting('companyAddress') || getSetting('city') || getSetting('country')) && (
                <li className="flex items-start gap-2">
                  <Globe className="h-4 w-4 opacity-80 mt-0.5" />
                  <div className="opacity-80">
                    {getSetting('companyAddress') && <div>{getSetting('companyAddress')}</div>}
                    {getSetting('city') && <div>{getSetting('city')}</div>}
                    {getSetting('country') && <div>{getSetting('country')}</div>}
                  </div>
                </li>
              )}
              {getSetting('website') && (
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 opacity-80" />
                  <a 
                    href={getSetting('website')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
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
            © {new Date().getFullYear()} {getSetting('companyName')}. All rights reserved.
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
