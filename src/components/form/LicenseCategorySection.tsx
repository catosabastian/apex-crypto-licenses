
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle, Wifi } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { unifiedDataManager } from '@/utils/unifiedDataManager';

interface LicenseCategory {
  id: string;
  name: string;
  price: string;
  available: boolean;
  minVolume: string;
}

interface LicenseCategorySectionProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const LicenseCategorySection = ({ selectedCategory, onCategorySelect }: LicenseCategorySectionProps) => {
  const [settings, setSettings] = useState(unifiedDataManager.getSettings());
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());

  useEffect(() => {
    console.log('[LicenseCategorySection] Component mounted, listening for settings updates');
    
    const handleSettingsUpdate = (data: any) => {
      console.log('[LicenseCategorySection] Settings update received:', data);
      const newSettings = data.settings || data;
      setSettings(newSettings);
      setLastUpdateTime(new Date());
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  // Generate categories from settings
  const categories: LicenseCategory[] = [
    {
      id: '1',
      name: 'Basic Trader',
      price: settings.category1Price,
      available: settings.category1Available,
      minVolume: '$50,000'
    },
    {
      id: '2',
      name: 'Standard Trader',
      price: settings.category2Price,
      available: settings.category2Available,
      minVolume: '$100,000'
    },
    {
      id: '3',
      name: 'Advanced Trader',
      price: settings.category3Price,
      available: settings.category3Available,
      minVolume: '$250,000'
    },
    {
      id: '4',
      name: 'Professional Trader',
      price: settings.category4Price,
      available: settings.category4Available,
      minVolume: '$500,000'
    },
    {
      id: '5',
      name: 'Institutional Trader',
      price: settings.category5Price,
      available: settings.category5Available,
      minVolume: '$1,000,000+'
    },
    {
      id: '6',
      name: 'Executive Trader',
      price: settings.category6Price,
      available: settings.category6Available,
      minVolume: '$2,500,000+'
    }
  ];

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
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      {category.name}
                      {!category.available && (
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </h4>
                    {!category.available && (
                      <Badge variant="destructive" className="text-xs">
                        UNAVAILABLE
                      </Badge>
                    )}
                    {category.available && selectedCategory === category.id && (
                      <Badge className="text-xs">SELECTED</Badge>
                    )}
                  </div>
                  
                  <p className={`text-2xl font-bold mb-2 ${
                    !category.available ? 'text-muted-foreground' : 'text-primary'
                  }`}>
                    {category.price}
                  </p>
                  
                  <p className="text-sm text-muted-foreground">
                    Min Volume: {category.minVolume}
                  </p>
                  
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
