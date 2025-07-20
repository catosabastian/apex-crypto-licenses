
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import { CheckCircle, Star, Clock, AlertTriangle, Zap, Crown, Building } from 'lucide-react';

interface LicenseCategorySectionProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const LicenseCategorySection = ({ selectedCategory, onCategorySelect }: LicenseCategorySectionProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const settings = unifiedDataManager.getSettings();

  const licenseCategories = [
    { 
      id: '1', 
      name: 'Basic Trader', 
      price: settings.category1Price, 
      available: settings.category1Available, 
      minVolume: '$50,000',
      icon: CheckCircle,
      color: 'bg-gray-50 border-gray-200',
      badge: null,
      features: ['Basic trading access', 'Standard support', 'Monthly reports']
    },
    { 
      id: '2', 
      name: 'Standard Trader', 
      price: settings.category2Price, 
      available: settings.category2Available, 
      minVolume: '$100,000',
      icon: Zap,
      color: 'bg-blue-50 border-blue-200',
      badge: null,
      features: ['Enhanced trading tools', 'Priority support', 'Weekly reports', 'API access']
    },
    { 
      id: '3', 
      name: 'Advanced Trader', 
      price: settings.category3Price, 
      available: settings.category3Available, 
      minVolume: '$250,000',
      icon: Star,
      color: 'bg-accent/10 border-accent/30',
      badge: { text: 'Popular', variant: 'secondary' as const },
      features: ['Advanced analytics', 'Premium support', 'Daily reports', 'Custom API limits', 'Risk management tools']
    },
    { 
      id: '4', 
      name: 'Professional Trader', 
      price: settings.category4Price, 
      available: settings.category4Available, 
      minVolume: '$500,000',
      icon: Crown,
      color: 'bg-primary/5 border-primary/20',
      badge: { text: 'Recommended', variant: 'default' as const },
      features: ['Professional tools', 'Dedicated support', 'Real-time analytics', 'Unlimited API', 'Custom strategies', 'Priority execution']
    },
    { 
      id: '5', 
      name: 'Institutional Trader', 
      price: settings.category5Price, 
      available: settings.category5Available, 
      minVolume: '$1,000,000+',
      icon: Building,
      color: 'bg-purple-50 border-purple-200',
      badge: { text: 'Enterprise', variant: 'outline' as const },
      features: ['Enterprise solutions', 'White-label options', 'Custom integration', 'Institutional support', 'Regulatory compliance', 'Multi-user access']
    },
    { 
      id: '6', 
      name: 'Executive Trader', 
      price: settings.category6Price, 
      available: settings.category6Available, 
      minVolume: '$2,500,000+',
      icon: Crown,
      color: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200',
      badge: { text: 'Premium', variant: 'outline' as const },
      features: ['Executive tier access', 'Concierge support', 'Custom solutions', 'Private markets', 'Exclusive features', 'Personal account manager']
    }
  ];

  const getAvailabilityStatus = (category: any) => {
    if (!category.available) {
      return {
        status: 'sold-out',
        badge: { text: 'Sold Out', variant: 'destructive' as const },
        message: 'This category is currently sold out. Please choose an alternative.'
      };
    }
    
    // Strategic scarcity messaging for lower-priced categories
    if (['1', '2'].includes(category.id) && category.available) {
      return {
        status: 'limited',
        badge: { text: 'Limited Spots', variant: 'secondary' as const },
        message: 'Only a few spots remaining at this price level.'
      };
    }

    return {
      status: 'available',
      badge: null,
      message: null
    };
  };

  const getRecommendationMessage = (categoryId: string) => {
    if (['4', '5', '6'].includes(categoryId)) {
      return "Higher tier licenses include additional benefits and priority processing.";
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Choose Your License Category</h3>
        <p className="text-muted-foreground">
          Select the license tier that matches your trading volume and requirements
        </p>
      </div>

      <RadioGroup 
        value={selectedCategory} 
        onValueChange={onCategorySelect}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {licenseCategories.map((category) => {
          const IconComponent = category.icon;
          const availability = getAvailabilityStatus(category);
          const isSelected = selectedCategory === category.id;
          const isHovered = hoveredCategory === category.id;
          const recommendation = getRecommendationMessage(category.id);

          return (
            <div key={category.id} className="relative">
              <Card 
                className={`
                  cursor-pointer transition-all duration-300 hover:shadow-lg
                  ${category.color}
                  ${isSelected ? 'ring-2 ring-primary shadow-lg scale-105' : ''}
                  ${!category.available ? 'opacity-60' : ''}
                  ${isHovered ? 'shadow-md transform -translate-y-1' : ''}
                `}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={category.id} 
                        id={category.id}
                        disabled={!category.available}
                        className="mt-1"
                      />
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      {category.badge && (
                        <Badge variant={category.badge.variant} className="text-xs">
                          {category.badge.text}
                        </Badge>
                      )}
                      {availability.badge && (
                        <Badge variant={availability.badge.variant} className="text-xs">
                          {availability.badge.text}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label 
                      htmlFor={category.id} 
                      className="text-base font-semibold cursor-pointer"
                    >
                      {category.name}
                    </Label>
                    <CardDescription className="text-lg font-bold text-primary mt-1">
                      {category.price}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">
                      <strong>Min. Volume:</strong> {category.minVolume}
                    </div>
                    
                    {availability.message && (
                      <div className="flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                        <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                        <span>{availability.message}</span>
                      </div>
                    )}

                    {recommendation && (
                      <div className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                        <Zap className="h-3 w-3 mt-0.5 shrink-0" />
                        <span>{recommendation}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Key Features:</p>
                      <ul className="text-xs space-y-0.5">
                        {category.features.slice(0, isHovered ? category.features.length : 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {!isHovered && category.features.length > 3 && (
                        <p className="text-xs text-muted-foreground italic">
                          +{category.features.length - 3} more features...
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </RadioGroup>

      {selectedCategory && (
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-medium">Selected Category:</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {licenseCategories.find(cat => cat.id === selectedCategory)?.name} - {licenseCategories.find(cat => cat.id === selectedCategory)?.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default LicenseCategorySection;
