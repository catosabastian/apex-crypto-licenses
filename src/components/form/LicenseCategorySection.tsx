
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
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Default categories for immediate display
  const defaultCategories = [
    { id: '1', name: 'Basic Trader', price: '$5,000', available: true, minVolume: '$50,000', status: 'AVAILABLE' },
    { id: '2', name: 'Standard Trader', price: '$15,000', available: true, minVolume: '$100,000', status: 'RECOMMENDED' },
    { id: '3', name: 'Advanced Trader', price: '$25,000', available: true, minVolume: '$250,000', status: 'AVAILABLE' },
    { id: '4', name: 'Professional Trader', price: '$50,000', available: true, minVolume: '$500,000', status: 'SELLING FAST' },
    { id: '5', name: 'Institutional Trader', price: '$100,000', available: true, minVolume: '$1,000,000+', status: 'AVAILABLE' },
    { id: '6', name: 'Executive Trader', price: '$200,000', available: true, minVolume: '$2,500,000+', status: 'AVAILABLE' }
  ];

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        setLoadingError(null);
        
        // Set a reasonable timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Loading timeout after 15 seconds')), 15000)
        );
        
        const settingsPromise = supabaseDataManager.getSettings();
        const currentSettings = await Promise.race([settingsPromise, timeoutPromise]) as Record<string, any>;
        
        console.log('Form component loaded settings:', currentSettings);
        setSettings(currentSettings);
        setLastUpdateTime(new Date());
      } catch (error) {
        console.error('Error loading settings in form:', error);
        setLoadingError('Failed to load latest pricing. Using default values.');
        
        // Use default settings structure
        const defaultSettings = {
          category1_name: 'Basic Trader',
          category1_price: '$5,000',
          category1_available: true,
          category2_name: 'Standard Trader',
          category2_price: '$15,000',
          category2_available: true,
          category3_name: 'Advanced Trader',
          category3_price: '$25,000',
          category3_available: true,
          category4_name: 'Professional Trader',
          category4_price: '$50,000',
          category4_available: true,
          category5_name: 'Institutional Trader',
          category5_price: '$100,000',
          category5_available: true,
          category6_name: 'Executive Trader',
          category6_price: '$200,000',
          category6_available: true
        };
        setSettings(defaultSettings);
      } finally {
        setIsLoading(false);
      }
    };

    const handleSettingsUpdate = () => {
      console.log('Settings updated event received in form');
      loadSettings();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    // Load immediately, don't wait
    loadSettings();

    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const generateCategories = (): LicenseCategory[] => {
    // If we have no settings yet, use defaults
    if (Object.keys(settings).length === 0) {
      return defaultCategories;
    }

    const categories = [];
    for (let i = 1; i <= 6; i++) {
      const category = {
        id: i.toString(),
        name: settings[`category${i}_name`] || defaultCategories[i-1].name,
        price: settings[`category${i}_price`] || defaultCategories[i-1].price,
        minVolume: defaultCategories[i-1].minVolume,
        available: settings[`category${i}_available`] !== false,
        status: settings[`category${i}_status`] || defaultCategories[i-1].status
      };
      categories.push(category);
    }
    return categories;
  };

  const categories = generateCategories();

  // Show categories immediately, even while loading
  return (
    <div className="form-section">
      <div className="section-heading">
        <div className="section-icon">
          <Shield className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold">License Category *</h3>
        <div className="flex items-center gap-2 ml-auto">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              <span className="text-xs text-blue-600">Loading latest pricing...</span>
            </>
          ) : loadingError ? (
            <>
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-amber-600">Using cached data</span>
            </>
          ) : (
            <>
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-600">Live Updates</span>
            </>
          )}
          <span className="text-xs text-muted-foreground">
            {lastUpdateTime.toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      {loadingError && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">{loadingError}</p>
        </div>
      )}
      
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
