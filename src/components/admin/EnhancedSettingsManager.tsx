import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import { Save, RefreshCw, DollarSign, Package, Loader2 } from 'lucide-react';

interface LicenseCategory {
  id: number;
  name: string;
  type: string;
  icon: string;
  color: string;
}

const EnhancedSettingsManager = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [dirtySettings, setDirtySettings] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const licenseCategories: LicenseCategory[] = [
    { id: 1, name: 'Basic', type: 'crypto', icon: 'Shield', color: 'blue' },
    { id: 2, name: 'Standard', type: 'crypto', icon: 'CheckCircle', color: 'green' },
    { id: 3, name: 'Advanced', type: 'crypto', icon: 'Star', color: 'purple' },
    { id: 4, name: 'Professional', type: 'crypto', icon: 'Crown', color: 'gold' },
    { id: 5, name: 'Institutional', type: 'crypto', icon: 'Building', color: 'platinum' },
    { id: 6, name: 'Executive', type: 'crypto', icon: 'Trophy', color: 'diamond' }
  ];

  const categoryGroups = {
    'Crypto Trading Licenses': licenseCategories.filter(cat => cat.type === 'crypto')
  };

  useEffect(() => {
    loadSettings();
    
    const handleSettingsUpdate = () => {
      loadSettings();
    };

    supabaseDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const loadedSettings = await supabaseDataManager.getSettings();
      console.log('EnhancedSettingsManager - Loaded settings:', loadedSettings);
      setSettings(loadedSettings);
      setDirtySettings(new Set());
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

  const handleFieldChange = (key: string, value: any) => {
    console.log('EnhancedSettingsManager - Field change:', { key, value });
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setDirtySettings(prev => new Set(prev).add(key));
  };

  const handleSaveSettings = async () => {
    if (dirtySettings.size === 0) {
      toast({
        title: "No Changes",
        description: "No settings have been modified",
      });
      return;
    }

    try {
      setIsSaving(true);
      
      const settingsToUpdate = Array.from(dirtySettings).reduce((acc, key) => {
        acc[key] = settings[key];
        return acc;
      }, {} as Record<string, any>);
      
      console.log('EnhancedSettingsManager - Saving settings:', settingsToUpdate);
      
      const success = await supabaseDataManager.bulkUpdateSettings(settingsToUpdate);
      
      if (success) {
        setDirtySettings(new Set());
        toast({
          title: "Settings Saved",
          description: `Successfully updated ${Object.keys(settingsToUpdate).length} settings`,
        });
      } else {
        throw new Error('Bulk update failed');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'AVAILABLE': return 'bg-green-500';
      case 'RECOMMENDED': return 'bg-blue-500';
      case 'SELLING FAST': return 'bg-orange-500';
      case 'SOLD OUT': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">License Categories & Pricing</h2>
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">License Categories & Pricing</h2>
          <p className="text-muted-foreground">Manage pricing and availability for all license categories</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSettings} disabled={isSaving}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={handleSaveSettings} 
            disabled={dirtySettings.size === 0 || isSaving}
            className="gap-2"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save {dirtySettings.size > 0 ? `(${dirtySettings.size})` : ''} Changes
          </Button>
        </div>
      </div>

      {Object.entries(categoryGroups).map(([groupName, categories]) => (
        <Card key={groupName}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {groupName}
            </CardTitle>
            <CardDescription>
              Configure pricing, availability, and status for each license category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-mono">
                        Category {category.id}
                      </Badge>
                      <h4 className="text-lg font-semibold">
                        {settings[`category${category.id}_name`] || `${category.name} Trader`}
                      </h4>
                      <Badge 
                        className={`text-white ${getStatusBadgeColor(settings[`category${category.id}_status`])}`}
                      >
                        {settings[`category${category.id}_status`] || 'AVAILABLE'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`category${category.id}_available`} className="text-sm">
                        Available
                      </Label>
                      <Switch
                        id={`category${category.id}_available`}
                        checked={settings[`category${category.id}_available`] !== false}
                        onCheckedChange={(checked) => 
                          handleFieldChange(`category${category.id}_available`, checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`category${category.id}_name`}>License Name</Label>
                      <Input
                        id={`category${category.id}_name`}
                        value={settings[`category${category.id}_name`] || ''}
                        onChange={(e) => handleFieldChange(`category${category.id}_name`, e.target.value)}
                        placeholder={`${category.name} Trader`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`category${category.id}_price`} className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Price
                      </Label>
                      <Input
                        id={`category${category.id}_price`}
                        value={settings[`category${category.id}_price`] || ''}
                        onChange={(e) => handleFieldChange(`category${category.id}_price`, e.target.value)}
                        placeholder="$5,000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`category${category.id}_status`}>Status</Label>
                      <Select
                        value={settings[`category${category.id}_status`] || 'AVAILABLE'}
                        onValueChange={(value) => handleFieldChange(`category${category.id}_status`, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AVAILABLE">Available</SelectItem>
                          <SelectItem value="RECOMMENDED">Recommended</SelectItem>
                          <SelectItem value="SELLING FAST">Selling Fast</SelectItem>
                          <SelectItem value="SOLD OUT">Sold Out</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`category${category.id}_description`}>Description</Label>
                    <Input
                      id={`category${category.id}_description`}
                      value={settings[`category${category.id}_description`] || ''}
                      onChange={(e) => handleFieldChange(`category${category.id}_description`, e.target.value)}
                      placeholder="Enter license description..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EnhancedSettingsManager;