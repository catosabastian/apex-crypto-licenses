
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, Clock, CheckCircle, AlertCircle, Star, TrendingUp, Users, Globe } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

interface LicenseCategory {
  id: string;
  name: string;
  price: string;
  available: boolean;
  details: any;
  features: string[];
  icon: any;
  color: string;
}

interface EnhancedLicenseCategorySectionProps {
  categories: LicenseCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  settings: any;
}

const EnhancedLicenseCategorySection = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  settings 
}: EnhancedLicenseCategorySectionProps) => {
  const availableCategories = categories.filter(cat => cat.available);
  const soldOutCategories = categories.filter(cat => !cat.available);

  return (
    <Card className="border-2 transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">License Category Selection</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose the license category that best fits your trading needs
              </p>
            </div>
          </div>
          <Badge variant={selectedCategory ? "default" : "secondary"}>
            {selectedCategory ? "Selected" : "Required"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Availability Status */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium">{availableCategories.length} Categories Available</span>
          </div>
          {soldOutCategories.length > 0 && (
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <span className="text-sm text-muted-foreground">
                {soldOutCategories.length} Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Available Categories */}
        <div className="grid lg:grid-cols-2 gap-6">
          <TooltipProvider>
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              console.log("category:", category)
              
              return (
                <Tooltip key={category.id}>
                  <TooltipTrigger asChild>
                    <Card 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                        isSelected 
                          ? 'ring-2 ring-primary border-primary bg-primary/5' 
                          : category.available 
                            ? 'border-border hover:border-primary/50' 
                            : 'opacity-60 border-muted cursor-not-allowed'
                      }`}
                      onClick={() => {
                        if (category.available) {
                          onCategorySelect(category.id);
                        }
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${category.color}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{category.name}</h3>
                              <p className="text-2xl font-bold text-primary">{category.price}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            {!category.available && (
                              <Badge variant="destructive" className="text-xs">
                                SOLD OUT
                              </Badge>
                            )}
                            {isSelected && (
                              <Badge className="text-xs">
                                SELECTED
                              </Badge>
                            )}
                            {category.id === '3' && category.available && (
                              <Badge variant="secondary" className="text-xs">
                                POPULAR
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Processing Time */}
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Processing: {category.details?.processingTime || '5-7 business days'}</span>
                          </div>

                          {/* Minimum Volume */}
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span>Min Volume: {category?.minVolume || 'No minimum'}</span>
                          </div>

                          <Separator />

                          {/* Features */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold flex items-center gap-2">
                              <Star className="h-4 w-4" />
                              Key Features
                            </h4>
                            <ul className="space-y-1">
                              {category.features.map((feature, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Additional Details */}
                          {category.details?.features && (
                            <div className="pt-2 border-t">
                              <div className="flex flex-wrap gap-1">
                                {category.details.features.slice(0, 3).map((feature: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  
                  <TooltipContent side="top" className="max-w-sm">
                    <div className="space-y-2">
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm">
                        {category.available 
                          ? `Click to select this license category for ${category.price}` 
                          : 'This category is currently sold out'
                        }
                      </p>
                      {category.details?.description && (
                        <p className="text-xs text-muted-foreground">
                          {category.details.description}
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>

        {/* Selection Summary */}
        {selectedCategory && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-primary">Selected License Category</h4>
                <p className="text-sm text-muted-foreground">
                  {categories.find(c => c.id === selectedCategory)?.name} - {categories.find(c => c.id === selectedCategory)?.price}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onCategorySelect('')}
              >
                Change Selection
              </Button>
            </div>
          </div>
        )}

        {!selectedCategory && (
          <div className="text-center py-4 text-muted-foreground">
            <AlertCircle className="h-6 w-6 mx-auto mb-2" />
            <p>Please select an available license category to continue</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedLicenseCategorySection;
