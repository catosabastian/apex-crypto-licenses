import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Loader2, DollarSign, Shield, Briefcase, Gamepad2, Building } from 'lucide-react';

interface LicenseCategory {
  id: string;
  name: string;
  type: string;
  icon: React.ComponentType<any>;
  color: string;
}

export function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // All 12 license categories grouped by type
  const licenseCategories: LicenseCategory[] = [
    // Trading Licenses (1-6)
    { id: '1', name: 'Basic Trader', type: 'trading', icon: DollarSign, color: 'blue' },
    { id: '2', name: 'Standard Trader', type: 'trading', icon: DollarSign, color: 'blue' },
    { id: '3', name: 'Advanced Trader', type: 'trading', icon: DollarSign, color: 'blue' },
    { id: '4', name: 'Professional Trader', type: 'trading', icon: DollarSign, color: 'blue' },
    { id: '5', name: 'Institutional Trader', type: 'trading', icon: DollarSign, color: 'blue' },
    { id: '6', name: 'Executive Trader', type: 'trading', icon: DollarSign, color: 'blue' },
    
    // Crypto Licenses (7)
    { id: '7', name: 'Crypto Wallet License', type: 'crypto', icon: Shield, color: 'purple' },
    
    // Fintech Licenses (8-9)
    { id: '8', name: 'Fintech EMI License', type: 'fintech', icon: Briefcase, color: 'green' },
    { id: '9', name: 'Fintech MSP License', type: 'fintech', icon: Briefcase, color: 'green' },
    
    // Gambling Licenses (10-11)
    { id: '10', name: 'Gambling Online License', type: 'gambling', icon: Gamepad2, color: 'red' },
    { id: '11', name: 'Gambling Lottery License', type: 'gambling', icon: Gamepad2, color: 'red' },
    
    // Corporate License (12)
    { id: '12', name: 'Corporate Offshore License', type: 'corporate', icon: Building, color: 'yellow' },
  ];

  const categoryGroups = {
    trading: { title: 'Trading Licenses', color: 'blue', categories: licenseCategories.filter(c => c.type === 'trading') },
    crypto: { title: 'Crypto Licenses', color: 'purple', categories: licenseCategories.filter(c => c.type === 'crypto') },
    fintech: { title: 'Fintech Licenses', color: 'green', categories: licenseCategories.filter(c => c.type === 'fintech') },
    gambling: { title: 'Gambling Licenses', color: 'red', categories: licenseCategories.filter(c => c.type === 'gambling') },
    corporate: { title: 'Corporate Licenses', color: 'yellow', categories: licenseCategories.filter(c => c.type === 'corporate') },
  };

  const statusOptions = ['AVAILABLE', 'RECOMMENDED', 'SELLING FAST', 'SOLD OUT', 'COMING SOON'];

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

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const currentSettings = await supabaseDataManager.getSettings();
      setSettings(currentSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (categoryId: string, field: string, value: any) => {
    setSettings(prev => ({ ...prev, [`category${categoryId}_${field}`]: value }));
    setIsDirty(true);
  };

  const handleSaveSettings = async () => {
    if (!isDirty) return;
    
    try {
      setIsSaving(true);
      
      // Update each setting individually
      const settingsToUpdate = Object.entries(settings).filter(([key]) => 
        key.startsWith('category') && (
          key.includes('_price') || 
          key.includes('_available') || 
          key.includes('_status') ||
          key.includes('_name') ||
          key.includes('_description') ||
          key.includes('_minVolume')
        )
      );
      
      for (const [key, value] of settingsToUpdate) {
        await supabaseDataManager.updateSetting(key, value);
      }
      
      await loadSettings();
      setIsDirty(false);
      toast({
        title: "Success",
        description: "All license categories updated successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error", 
        description: `Failed to update settings: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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
      <Card>
        <CardHeader>
          <CardTitle>License Categories & Pricing Management</CardTitle>
          <CardDescription>Loading all license categories...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading categories...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          License Categories & Pricing Management
        </CardTitle>
        <CardDescription>
          Configure all 12 license categories with pricing, availability, status, and descriptions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {Object.entries(categoryGroups).map(([groupKey, group]) => (
          <div key={groupKey} className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{group.title}</h2>
              <Badge variant="outline" className={`bg-${group.color}-50 text-${group.color}-700 border-${group.color}-200`}>
                {group.categories.length} License{group.categories.length > 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="grid gap-6">
              {group.categories.map((category) => {
                const categorySettings = {
                  name: settings[`category${category.id}_name`] || category.name,
                  price: settings[`category${category.id}_price`] || '$0',
                  available: settings[`category${category.id}_available`] !== false,
                  status: settings[`category${category.id}_status`] || 'AVAILABLE',
                  description: settings[`category${category.id}_description`] || '',
                  minVolume: settings[`category${category.id}_minVolume`] || '$0',
                };

                const IconComponent = category.icon;

                return (
                  <Card key={category.id} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                          <CardTitle className="text-lg">Category {category.id}</CardTitle>
                          <Badge className={getStatusBadgeColor(categorySettings.status)}>
                            {categorySettings.status}
                          </Badge>
                        </div>
                        <Switch
                          checked={categorySettings.available}
                          onCheckedChange={(checked) => handleFieldChange(category.id, 'available', checked)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${category.id}`}>License Name</Label>
                          <Input
                            id={`name-${category.id}`}
                            value={categorySettings.name}
                            onChange={(e) => handleFieldChange(category.id, 'name', e.target.value)}
                            placeholder="e.g. Advanced Trader"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`price-${category.id}`}>Price</Label>
                          <Input
                            id={`price-${category.id}`}
                            value={categorySettings.price}
                            onChange={(e) => handleFieldChange(category.id, 'price', e.target.value)}
                            placeholder="e.g. $25,000"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`minVolume-${category.id}`}>Minimum Volume</Label>
                          <Input
                            id={`minVolume-${category.id}`}
                            value={categorySettings.minVolume}
                            onChange={(e) => handleFieldChange(category.id, 'minVolume', e.target.value)}
                            placeholder="e.g. $100K"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`status-${category.id}`}>Status</Label>
                          <Select
                            value={categorySettings.status}
                            onValueChange={(value) => handleFieldChange(category.id, 'status', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(option => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`description-${category.id}`}>Description</Label>
                          <Textarea
                            id={`description-${category.id}`}
                            value={categorySettings.description}
                            onChange={(e) => handleFieldChange(category.id, 'description', e.target.value)}
                            placeholder="Brief description of this license..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <Separator />
          </div>
        ))}
        
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            Managing {licenseCategories.length} license categories across {Object.keys(categoryGroups).length} different types
          </div>
          <Button 
            onClick={handleSaveSettings}
            disabled={!isDirty || isSaving}
            className="min-w-[140px]"
            size="lg"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving All...
              </>
            ) : (
              'Save All Changes'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}