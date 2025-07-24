import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const UnifiedSettingsManager = () => {
  const [settings, setSettings] = useState<any>({});
  const [isDirty, setIsDirty] = useState(false);

  const loadSettings = async () => {
    try {
      const currentSettings = await supabaseDataManager.getSettings();
      setSettings(currentSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handlePriceChange = (category: string, price: string) => {
    setSettings({ ...settings, [category]: price });
    setIsDirty(true);
  };

  const handleAvailabilityChange = (category: string, available: boolean) => {
    setSettings({ ...settings, [category]: available });
    setIsDirty(true);
  };

  const handleSaveSettings = async () => {
    try {
      for (const [key, value] of Object.entries(settings)) {
        await supabaseDataManager.updateSetting(key, value);
      }
      setIsDirty(false);
      toast({
        title: "Settings Saved",
        description: "All changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive",
      });
    }
  };

  const categories = [
    { id: 1, name: 'Basic Trader', priceKey: 'category1Price', availKey: 'category1Available' },
    { id: 2, name: 'Standard Trader', priceKey: 'category2Price', availKey: 'category2Available' },
    { id: 3, name: 'Advanced Trader', priceKey: 'category3Price', availKey: 'category3Available' },
    { id: 4, name: 'Professional Trader', priceKey: 'category4Price', availKey: 'category4Available' },
    { id: 5, name: 'Institutional Trader', priceKey: 'category5Price', availKey: 'category5Available' },
    { id: 6, name: 'Executive Trader', priceKey: 'category6Price', availKey: 'category6Available' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Categories Settings</CardTitle>
        <CardDescription>Configure pricing and availability for each license category.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
            <div>
              <Label className="text-sm font-medium">{category.name}</Label>
              <p className="text-xs text-muted-foreground">Category {category.id}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`price-${category.id}`} className="text-xs">Price</Label>
              <Input
                id={`price-${category.id}`}
                value={(settings[category.priceKey] || '').replace(/"/g, '')}
                onChange={(e) => handlePriceChange(category.priceKey, e.target.value)}
                placeholder="e.g., 10,000 USDT"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Availability</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings[category.availKey] !== false}
                  onCheckedChange={(checked) => handleAvailabilityChange(category.availKey, checked)}
                />
                <span className="text-xs">
                  {settings[category.availKey] !== false ? 'Available' : 'Sold Out'}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveSettings} disabled={!isDirty}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedSettingsManager;