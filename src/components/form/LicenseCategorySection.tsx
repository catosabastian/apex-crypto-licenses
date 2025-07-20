
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LicenseCategory {
  id: string;
  name: string;
  price: string;
  available: boolean;
  minVolume: string;
}

interface LicenseCategorySectionProps {
  categories: LicenseCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const LicenseCategorySection = ({ categories, selectedCategory, onCategorySelect }: LicenseCategorySectionProps) => {
  return (
    <div className="form-section">
      <div className="section-heading">
        <div className="section-icon">
          <Shield className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold">License Category *</h3>
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
