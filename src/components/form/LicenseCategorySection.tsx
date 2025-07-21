import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle, Wifi } from 'lucide-react';
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

  useEffect(() => {
    const loadSettings = async () => {
      const currentSettings = await supabaseDataManager.getSettings();
      setSettings(currentSettings);
      setLastUpdateTime(new Date());
    };

    const handleSettingsUpdate = (data: any) => {
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
        price: settings.category1_price || "$25,000",
        available: settings.category1_available !== false,
        minVolume: "Up to $100K",
        status: settings.category1_status || "SOLD OUT"
      },
      {
        id: "2", 
        name: "Standard Trader", 
        price: settings.category2_price || "$50,000",
        available: settings.category2_available !== false,
        minVolume: "Up to $500K",
        status: settings.category2_status || "SOLD OUT"
      },
      {
        id: "3", 
        name: "Advanced Trader",
        price: settings.category3_price || "$70,000",
        available: settings.category3_available !== false,
        minVolume: "Up to $1M",
        status: settings.category3_status || "RECOMMENDED"
      },
      {
        id: "4", 
        name: "Professional Trader",
        price: settings.category4_price || "$150,000",
        available: settings.category4_available !== false,
        minVolume: "Up to $5M",
        status: settings.category4_status || "SELLING FAST"
      },
      {
        id: "5", 
        name: "Institutional Trader",
        price: settings.category5_price || "$250,000",
        available: settings.category5_available !== false,
        minVolume: "Up to $10M",
        status: settings.category5_status || "SELLING FAST"
      },
      {
        id: "6", 
        name: "Executive Trader",
        price: settings.category6_price || "$500,000",
        available: settings.category6_available !== false,
        minVolume: "Unlimited",
        status: settings.category6_status || "SELLING FAST"
      }
    ];
  };

  const categories = generateCategories();

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
          {categories.map((category) => (
            <Tooltip key={category.id}>
              <TooltipTrigger asChild>
                <div
                  className={`category-card ${
                    selectedCategory === category.id ? 'selected' : ''
                  } ${!category.available ? 'disabled' : ''}`}
                  onClick={() => {
                    if (category.available) {
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
                            category.status === "SOLD OUT" ? "secondary" :
                            category.status === "RECOMMENDED" ? "default" : "outline"
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
                  
                  {!category.available && (
                    <div className="mt-3 p-2 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground font-medium">
                        This category is currently sold out
                      </p>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              
              <TooltipContent>
                <p>
                  {category.available 
                    ? `Click to select ${category.name}` 
                    : `${category.name} is currently unavailable`
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
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