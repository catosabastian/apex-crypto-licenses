import { Globe, MessageSquare, ShieldCheck, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useApplicationDialog } from "./ApplicationDialog";
import { useState, useEffect } from "react";
import { supabaseDataManager } from "@/utils/supabaseDataManager";

const Footer = () => {
  const { openApplicationDialog } = useApplicationDialog();
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadSettings = async () => {
      try {
        console.log('[Footer] Loading settings...');
        const loadedSettings = await supabaseDataManager.getSettings();
        console.log('[Footer] Settings loaded:', loadedSettings);
        
        if (loadedSettings && Object.keys(loadedSettings).length > 0) {
          setSettings(prev => ({
            ...prev,
            ...loadedSettings
          }));
        }
      } catch (error) {
        console.error('[Footer] Error loading settings:', error);
        // Keep default settings if loading fails
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();

    // Listen for settings updates
    const handleSettingsUpdate = (data: any) => {
      console.log('[Footer] Settings updated:', data);
      if (data && typeof data === 'object') {
        setSettings(prev => ({
          ...prev,
          ...data
        }));
      }
    };

    // Listen to supabase data manager events
    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  if (isLoading) {
    return (
      <footer className="bg-primary text-primary-foreground vibrant-glow">
        <div className="container py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-foreground"></div>
            <span className="ml-2 text-sm opacity-80">Loading...</span>
          </div>
        </div>
      </footer>
    );
  }
  
  return (
    <footer className="bg-primary text-primary-foreground vibrant-glow">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">{settings.companyName || "CryptoLicense Pro"}</h2>
                <p className="text-xs opacity-80">{settings.companyTagline || "Crypto Licensing Regulatory"}</p>
              </div>
            </div>
            
            <p className="mt-4 text-sm opacity-80 max-w-md">
              {settings.companyDescription || `${settings.companyName || "CryptoLicense Pro"} provides official regulatory licensing for cryptocurrency traders and institutions. Our mission is to ensure compliance and security in digital asset trading.`}
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
              {(settings.showSupportEmail === true || settings.showSupportEmail === 'true') && settings.supportEmail && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 opacity-80" />
                  <span className="opacity-80">{settings.supportEmail}</span>
                </li>
              )}
              {(settings.showPhoneNumber === true || settings.showPhoneNumber === 'true') && settings.phoneNumber && (
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 opacity-80" />
                  <span className="opacity-80">{settings.phoneNumber}</span>
                </li>
              )}
              {(settings.showAddress === true || settings.showAddress === 'true') && (settings.address || settings.city || settings.country) && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 opacity-80 mt-0.5" />
                  <div className="opacity-80">
                    {settings.address && <div>{settings.address}</div>}
                    {settings.city && <div>{settings.city}</div>}
                    {settings.country && <div>{settings.country}</div>}
                  </div>
                </li>
              )}
              {(settings.showWebsite === true || settings.showWebsite === 'true') && settings.website && (
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
            {settings.copyrightText || `© ${new Date().getFullYear()} ${settings.companyName || "CryptoLicense Pro"}. All rights reserved.`}
          </div>
          
          {(settings.showFooterLinks === true || settings.showFooterLinks === 'true') && (
            <div className="flex gap-6 text-xs opacity-70">
              {settings.privacyPolicyUrl && (
                <a href={settings.privacyPolicyUrl} className="hover:opacity-100 transition-opacity">Privacy Policy</a>
              )}
              {settings.termsOfServiceUrl && (
                <a href={settings.termsOfServiceUrl} className="hover:opacity-100 transition-opacity">Terms of Service</a>
              )}
              {settings.legalNoticeUrl && (
                <a href={settings.legalNoticeUrl} className="hover:opacity-100 transition-opacity">Legal Notice</a>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
