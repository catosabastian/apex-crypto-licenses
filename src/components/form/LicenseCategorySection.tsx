
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

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
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${
              selectedCategory === category.id ? 'selected' : ''
            } ${!category.available ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (category.available) {
                onCategorySelect(category.id);
              }
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{category.name}</h4>
              {!category.available && <Badge variant="destructive">Sold Out</Badge>}
              {category.available && selectedCategory === category.id && <Badge>Selected</Badge>}
            </div>
            <p className="text-2xl font-bold text-primary mb-2">{category.price}</p>
            <p className="text-sm text-muted-foreground">Min Volume: {category.minVolume}</p>
          </div>
        ))}
      </div>
      {!selectedCategory && (
        <p className="text-sm text-destructive mt-2">Please select a license category</p>
      )}
    </div>
  );
};

export default LicenseCategorySection;
