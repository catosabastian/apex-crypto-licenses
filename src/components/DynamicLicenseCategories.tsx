
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Shield, Briefcase, Gamepad2, Building, CheckCircle, AlertCircle } from 'lucide-react';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

interface LicenseCategory {
  id: string;
  name: string;
  type: string;
  price: string;
  minVolume: string;
  available: boolean;
  status: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const DynamicLicenseCategories = () => {
  const { openApplicationDialog } = useApplicationDialog();
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getIcon = (type: string) => {
    switch (type) {
      case 'trading': return DollarSign;
      case 'crypto': return Shield;
      case 'fintech': return Briefcase;
      case 'gambling': return Gamepad2;
      case 'corporate': return Building;
      default: return Shield;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'trading': return 'blue';
      case 'crypto': return 'purple';
      case 'fintech': return 'green';
      case 'gambling': return 'red';
      case 'corporate': return 'yellow';
      default: return 'blue';
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const settings = await supabaseDataManager.getSettings();
        
        const categoryList: LicenseCategory[] = [];
        
        // Load all 12 categories
        for (let i = 1; i <= 12; i++) {
          const name = settings[`category${i}_name`] || `Category ${i}`;
          const price = settings[`category${i}_price`] || '$0';
          const available = settings[`category${i}_available`] !== false;
          const status = settings[`category${i}_status`] || 'AVAILABLE';
          const description = settings[`category${i}_description`] || 'Professional license for trading operations';
          const minVolume = settings[`category${i}_minVolume`] || '$0';
          
          // Determine type based on category ID
          let type = 'trading';
          if (i === 7) type = 'crypto';
          else if (i === 8 || i === 9) type = 'fintech';
          else if (i === 10 || i === 11) type = 'gambling';
          else if (i === 12) type = 'corporate';
          
          categoryList.push({
            id: i.toString(),
            name,
            type,
            price,
            minVolume,
            available,
            status,
            description,
            icon: getIcon(type),
            color: getColor(type)
          });
        }
        
        setCategories(categoryList);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
    
    // Set up event listener for settings updates
    const handleSettingsUpdate = () => {
      loadCategories();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const getCategoryGroups = () => {
    const groups = {
      trading: { title: 'Trading Licenses', categories: categories.filter(c => c.type === 'trading') },
      crypto: { title: 'Crypto Licenses', categories: categories.filter(c => c.type === 'crypto') },
      fintech: { title: 'Fintech Licenses', categories: categories.filter(c => c.type === 'fintech') },
      gambling: { title: 'Gambling Licenses', categories: categories.filter(c => c.type === 'gambling') },
      corporate: { title: 'Corporate Licenses', categories: categories.filter(c => c.type === 'corporate') },
    };
    
    return Object.entries(groups).filter(([_, group]) => group.categories.length > 0);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
      case 'RECOMMENDED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SELLING FAST': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'SOLD OUT': return 'bg-red-100 text-red-800 border-red-200';
      case 'COMING SOON': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <section id="licenses" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading license categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="licenses" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">License Categories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of professional trading licenses
          </p>
        </div>

        <div className="space-y-12">
          {getCategoryGroups().map(([groupKey, group]) => (
            <div key={groupKey} className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{group.title}</h3>
                <Badge variant="outline" className="mb-8">
                  {group.categories.length} License{group.categories.length > 1 ? 's' : ''}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.categories.map((category) => {
                  const IconComponent = category.icon;
                  
                  return (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                          </div>
                          <Badge className={getStatusBadgeColor(category.status)}>
                            {category.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-2xl font-bold text-primary">{category.price}</div>
                          <div className="text-sm text-muted-foreground">
                            Min Volume: {category.minVolume}
                          </div>
                          <CardDescription className="text-sm">
                            {category.description}
                          </CardDescription>
                          
                          <div className="flex items-center gap-2 text-sm">
                            {category.available ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-green-600">Available</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 text-red-500" />
                                <span className="text-red-600">Currently Unavailable</span>
                              </>
                            )}
                          </div>
                          
                          <Button
                            onClick={openApplicationDialog}
                            disabled={!category.available}
                            className="w-full"
                            variant={category.available ? "default" : "secondary"}
                          >
                            {category.available ? 'Apply Now' : 'Sold Out'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicLicenseCategories;
