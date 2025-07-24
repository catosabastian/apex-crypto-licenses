
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle, Wifi, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

interface LicenseCategory {
  id: string;
  name: string;
  price: string;
  available: boolean;
  minVolume: string;
  status?: string;
}

interface LicenseCategorySectionProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const LicenseCategorySection = ({ selectedCategory, onCategorySelect }: LicenseCategorySectionProps) => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const currentSettings = await supabaseDataManager.getSettings();
        console.log('Form component loaded settings:', currentSettings);
        setSettings(currentSettings);
        setLastUpdateTime(new Date());
      } catch (error) {
        console.error('Error loading settings in form:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleSettingsUpdate = () => {
      console.log('Settings updated event received in form');
      loadSettings();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    loadSettings();

    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const generateCategories = (): LicenseCategory[] => {
    return [
      {
        id: "1", 
        name: "Basic Trader",
        price: settings.category1_price || "Loading...",
        available: settings.category1_available !== false,
        minVolume: "Up to $100K",
        status: settings.category1_status || "AVAILABLE"
      },
      {
        id: "2", 
        name: "Standard Trader", 
        price: settings.category2_price || "Loading...",
        available: settings.category2_available !== false,
        minVolume: "Up to $500K",
        status: settings.category2_status || "AVAILABLE"
      },
      {
        id: "3", 
        name: "Advanced Trader",
        price: settings.category3_price || "Loading...",
        available: settings.category3_available !== false,
        minVolume: "Up to $1M",
        status: settings.category3_status || "AVAILABLE"
      },
      {
        id: "4", 
        name: "Professional Trader",
        price: settings.category4_price || "Loading...",
        available: settings.category4_available !== false,
        minVolume: "Up to $5M",
        status: settings.category4_status || "AVAILABLE"
      },
      {
        id: "5", 
        name: "Institutional Trader",
        price: settings.category5_price || "Loading...",
        available: settings.category5_available !== false,
        minVolume: "Up to $10M",
        status: settings.category5_status || "AVAILABLE"
      },
      {
        id: "6", 
        name: "Executive Trader",
        price: settings.category6_price || "Loading...",
        available: settings.category6_available !== false,
        minVolume: "Unlimited",
        status: settings.category6_status || "AVAILABLE"
      }
    ];
  };

  const categories = generateCategories();

  if (isLoading) {
    return (
      <div className="form-section">
        <div className="section-heading">
          <div className="section-icon">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold">License Category *</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading license categories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="form-section">
      <div className="section-heading">
        <div className="section-icon">
          <Shield className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold">License Category *</h3>
        <div className="flex items-center gap-2 ml-auto">
          <Wifi className="h-4 w-4 text-green-500" />
          <span className="text-xs text-green-600">Live Updates</span>
          <span className="text-xs text-muted-foreground">
            {lastUpdateTime.toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TooltipProvider>
          {categories.map((category) => {
            const isAvailable = category.available && category.status !== 'SOLD OUT';
            
            return (
              <Tooltip key={category.id}>
                <TooltipTrigger asChild>
                  <div
                    className={`category-card ${
                      selectedCategory === category.id ? 'selected' : ''
                    } ${!isAvailable ? 'disabled' : ''}`}
                    onClick={() => {
                      if (isAvailable) {
                        onCategorySelect(category.id);
                      }
                    }}
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                        {category.status && (
                          <Badge 
                            variant={
                              category.status === "SOLD OUT" ? "destructive" :
                              category.status === "RECOMMENDED" ? "default" : 
                              category.status === "SELLING FAST" ? "secondary" : "outline"
                            } 
                            className="text-xs"
                          >
                            {category.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-primary">{category.price}</p>
                      <p className="text-sm text-muted-foreground">Min Volume: {category.minVolume}</p>
                    </div>
                    
                    {selectedCategory === category.id && (
                      <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                        <p className="text-xs text-primary font-medium">
                          ✓ Selected
                        </p>
                      </div>
                    )}
                    
                    {!isAvailable && (
                      <div className="mt-3 p-2 bg-muted/30 rounded-lg">
                        <p className="text-xs text-muted-foreground font-medium">
                          This category is currently {category.status?.toLowerCase() || 'unavailable'}
                        </p>
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                
                <TooltipContent>
                  <p>
                    {isAvailable 
                      ? `Click to select ${category.name}` 
                      : `${category.name} is currently ${category.status?.toLowerCase() || 'unavailable'}`
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
      
      {!selectedCategory && (
        <div className="form-error">
          Please select an available license category
        </div>
      )}
    </div>
  );
};

export default LicenseCategorySection;
