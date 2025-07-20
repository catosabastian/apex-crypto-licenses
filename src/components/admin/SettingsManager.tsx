import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

export function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleSettingsUpdate = () => {
      loadSettings();
      setIsDirty(false);
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    loadSettings();

    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const handlePriceChange = (category: string, value: string) => {
    setSettings(prev => ({ ...prev, [`category${category}_price`]: value }));
    setIsDirty(true);
  };

  const handleAvailabilityChange = (category: string, available: boolean) => {
    setSettings(prev => ({ ...prev, [`category${category}_available`]: available }));
    setIsDirty(true);
  };

  const handleStatusChange = (category: string, status: string) => {
    setSettings(prev => ({ ...prev, [`category${category}_status`]: status }));
    setIsDirty(true);
  };

  const handleSaveSettings = async () => {
    try {
      // Update each setting individually
      for (const [key, value] of Object.entries(settings)) {
        await supabaseDataManager.updateSetting(key, value);
      }
      
      // Force reload data to confirm updates
      await loadSettings();
      
      setIsDirty(false);
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error", 
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const loadSettings = async () => {
    try {
      const currentSettings = await supabaseDataManager.getSettings();
      console.log('Loaded settings from database:', currentSettings);
      setSettings(currentSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const categories = [
    { id: '1', name: 'Basic Trader', defaultPrice: '$25,000', defaultStatus: 'SOLD OUT' },
    { id: '2', name: 'Standard Trader', defaultPrice: '$50,000', defaultStatus: 'SOLD OUT' },
    { id: '3', name: 'Advanced Trader', defaultPrice: '$70,000', defaultStatus: 'RECOMMENDED' },
    { id: '4', name: 'Professional Trader', defaultPrice: '$150,000', defaultStatus: 'SELLING FAST' },
    { id: '5', name: 'Institutional Trader', defaultPrice: '$250,000', defaultStatus: 'SELLING FAST' },
    { id: '6', name: 'Executive Trader', defaultPrice: '$500,000', defaultStatus: 'SELLING FAST' }
  ];

  const statusOptions = ['AVAILABLE', 'RECOMMENDED', 'SELLING FAST', 'SOLD OUT'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Categories & Pricing</CardTitle>
        <CardDescription>
          Configure pricing, availability, and status for all license categories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category, index) => {
          const price = settings[`category${category.id}_price`] || category.defaultPrice;
          const available = settings[`category${category.id}_available`] !== false;
          const status = settings[`category${category.id}_status`] || category.defaultStatus;
          
          return (
            <div key={category.id}>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`price-${category.id}`}>Price</Label>
                    <Input
                      id={`price-${category.id}`}
                      value={price}
                      onChange={(e) => handlePriceChange(category.id, e.target.value)}
                      placeholder="e.g. $25,000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`status-${category.id}`}>Status</Label>
                    <select
                      id={`status-${category.id}`}
                      value={status}
                      onChange={(e) => handleStatusChange(category.id, e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {statusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`available-${category.id}`}
                        checked={available}
                        onCheckedChange={(checked) => handleAvailabilityChange(category.id, checked)}
                      />
                      <Label htmlFor={`available-${category.id}`}>Available</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              {index < categories.length - 1 && <Separator className="mt-6" />}
            </div>
          );
        })}
        
        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleSaveSettings}
            disabled={!isDirty}
            className="min-w-[120px]"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}