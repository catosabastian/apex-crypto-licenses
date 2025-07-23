
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApplicationDialog } from '@/components/ApplicationDialog';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { DollarSign, Shield, Briefcase, Gamepad2, Building, CheckCircle } from 'lucide-react';

interface LicenseCategory {
  id: number;
  name: string;
  price: string;
  description: string;
  status: string;
  available: boolean;
  type: 'trading' | 'crypto' | 'fintech' | 'gambling' | 'corporate';
  icon: React.ComponentType<any>;
  features: string[];
}

const DynamicLicenseCategories = () => {
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { openApplicationDialog } = useApplicationDialog();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const settings = await supabaseDataManager.getSettings();
        
        const categoryData: LicenseCategory[] = [];
        
        // Define category types and icons
        const categoryTypes = {
          1: { type: 'trading' as const, icon: DollarSign, features: ['Basic trading access', 'Email support', 'Standard documentation'] },
          2: { type: 'trading' as const, icon: DollarSign, features: ['Enhanced trading limits', 'Priority support', 'Advanced analytics'] },
          3: { type: 'trading' as const, icon: DollarSign, features: ['Professional tools', 'API access', 'Dedicated account manager'] },
          4: { type: 'trading' as const, icon: DollarSign, features: ['Institutional access', 'Custom integrations', 'Premium support'] },
          5: { type: 'trading' as const, icon: DollarSign, features: ['Enterprise solutions', 'White-label options', 'Global compliance'] },
          6: { type: 'trading' as const, icon: DollarSign, features: ['Executive privileges', 'Regulatory assistance', 'Full service package'] },
          7: { type: 'crypto' as const, icon: Shield, features: ['Wallet operations', 'Security compliance', 'Multi-currency support'] },
          8: { type: 'fintech' as const, icon: Briefcase, features: ['Electronic money services', 'Payment processing', 'EU compliance'] },
          9: { type: 'fintech' as const, icon: Briefcase, features: ['Money service provider', 'Remittance services', 'Global operations'] },
          10: { type: 'gambling' as const, icon: Gamepad2, features: ['Online gambling', 'Gaming compliance', 'Player protection'] },
          11: { type: 'gambling' as const, icon: Gamepad2, features: ['Lottery operations', 'Prize distribution', 'Regulatory compliance'] },
          12: { type: 'corporate' as const, icon: Building, features: ['Offshore incorporation', 'Tax optimization', 'Privacy protection'] }
        };

        for (let i = 1; i <= 12; i++) {
          const name = settings[`category${i}_name`] || `Category ${i}`;
          const price = settings[`category${i}_price`] || '$0';
          const description = settings[`category${i}_description`] || 'Professional license category';
          const status = settings[`category${i}_status`] || 'AVAILABLE';
          const available = settings[`category${i}_available`] !== false;
          
          const categoryInfo = categoryTypes[i as keyof typeof categoryTypes];
          
          categoryData.push({
            id: i,
            name,
            price,
            description,
            status,
            available,
            type: categoryInfo.type,
            icon: categoryInfo.icon,
            features: categoryInfo.features
          });
        }
        
        setCategories(categoryData);
      } catch (error) {
        console.error('Error loading license categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
    
    const handleSettingsUpdate = () => {
      loadCategories();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200';
      case 'RECOMMENDED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SELLING FAST': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'SOLD OUT': return 'bg-red-100 text-red-800 border-red-200';
      case 'COMING SOON': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'trading': return 'text-blue-600';
      case 'crypto': return 'text-purple-600';
      case 'fintech': return 'text-green-600';
      case 'gambling': return 'text-red-600';
      case 'corporate': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">License Categories</h2>
            <p className="text-muted-foreground">Loading available license categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">License Categories</h2>
          <p className="text-muted-foreground text-lg">
            Choose the right license category for your trading needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isUnavailable = category.status === 'SOLD OUT' || !category.available;
            
            return (
              <Card key={category.id} className={`relative transition-all duration-300 hover:shadow-lg ${isUnavailable ? 'opacity-75' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${getTypeColor(category.type)}`} />
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Category {category.id}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(category.status)}>
                      {category.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {category.price}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    {category.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => openApplicationDialog(category.id)}
                    disabled={isUnavailable}
                  >
                    {isUnavailable ? 'Unavailable' : 'Apply Now'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DynamicLicenseCategories;
