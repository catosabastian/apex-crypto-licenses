
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager, ContentSettings } from '@/utils/unifiedDataManager';
import { Save, DollarSign, Wallet, Globe, Mail } from 'lucide-react';

const SettingsManager = () => {
  const [settings, setSettings] = useState<ContentSettings>(unifiedDataManager.getSettings());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleSettingsUpdate = (data: any) => {
      console.log('[SettingsManager] Settings update received:', data);
      setSettings(data.settings || data);
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedSettings = unifiedDataManager.updateSettings(settings);
      console.log('[SettingsManager] Settings saved:', updatedSettings);
      
      toast({
        title: "Settings Updated",
        description: "All settings have been saved and synchronized across the system.",
      });
    } catch (error) {
      console.error('[SettingsManager] Save error:', error);
      toast({
        title: "Save Failed",
        description: "There was an error saving the settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof ContentSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">System Settings</h2>
          <p className="text-muted-foreground">Manage pricing, availability, and payment settings</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Pricing
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>License Category Pricing</CardTitle>
              <CardDescription>Set pricing for each license category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category1Price">Category 1 - Basic Trader</Label>
                  <Input
                    id="category1Price"
                    value={settings.category1Price}
                    onChange={(e) => updateSetting('category1Price', e.target.value)}
                    placeholder="e.g., 10,000 USDT"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category2Price">Category 2 - Standard Trader</Label>
                  <Input
                    id="category2Price"
                    value={settings.category2Price}
                    onChange={(e) => updateSetting('category2Price', e.target.value)}
                    placeholder="e.g., 25,000 USDT"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category3Price">Category 3 - Advanced Trader</Label>
                  <Input
                    id="category3Price"
                    value={settings.category3Price}
                    onChange={(e) => updateSetting('category3Price', e.target.value)}
                    placeholder="e.g., 50,000 USDT"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category4Price">Category 4 - Professional Trader</Label>
                  <Input
                    id="category4Price"
                    value={settings.category4Price}
                    onChange={(e) => updateSetting('category4Price', e.target.value)}
                    placeholder="e.g., 100,000 USDT"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category5Price">Category 5 - Institutional Trader</Label>
                  <Input
                    id="category5Price"
                    value={settings.category5Price}
                    onChange={(e) => updateSetting('category5Price', e.target.value)}
                    placeholder="e.g., 250,000 USDT"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category6Price">Category 6 - Executive Trader</Label>
                  <Input
                    id="category6Price"
                    value={settings.category6Price}
                    onChange={(e) => updateSetting('category6Price', e.target.value)}
                    placeholder="e.g., 500,000 USDT"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Category Availability</CardTitle>
              <CardDescription>Control which license categories are available for purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Category 1 - Basic Trader</Label>
                    <p className="text-sm text-muted-foreground">{settings.category1Price}</p>
                  </div>
                  <Switch
                    checked={settings.category1Available}
                    onCheckedChange={(checked) => updateSetting('category1Available', checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Category 2 - Standard Trader</Label>
                    <p className="text-sm text-muted-foreground">{settings.category2Price}</p>
                  </div>
                  <Switch
                    checked={settings.category2Available}
                    onCheckedChange={(checked) => updateSetting('category2Available', checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Category 3 - Advanced Trader</Label>
                    <p className="text-sm text-muted-foreground">{settings.category3Price}</p>
                  </div>
                  <Switch
                    checked={settings.category3Available}
                    onCheckedChange={(checked) => updateSetting('category3Available', checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Category 4 - Professional Trader</Label>
                    <p className="text-sm text-muted-foreground">{settings.category4Price}</p>
                  </div>
                  <Switch
                    checked={settings.category4Available}
                    onCheckedChange={(checked) => updateSetting('category4Available', checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Category 5 - Institutional Trader</Label>
                    <p className="text-sm text-muted-foreground">{settings.category5Price}</p>
                  </div>
                  <Switch
                    checked={settings.category5Available}
                    onCheckedChange={(checked) => updateSetting('category5Available', checked)}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Category 6 - Executive Trader</Label>
                    <p className="text-sm text-muted-foreground">{settings.category6Price}</p>
                  </div>
                  <Switch
                    checked={settings.category6Available}
                    onCheckedChange={(checked) => updateSetting('category6Available', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Wallet Addresses</CardTitle>
              <CardDescription>Configure payment wallet addresses for different cryptocurrencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bitcoinAddress">Bitcoin (BTC) Address</Label>
                  <Input
                    id="bitcoinAddress"
                    value={settings.bitcoinAddress}
                    onChange={(e) => updateSetting('bitcoinAddress', e.target.value)}
                    placeholder="Enter Bitcoin wallet address"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ethereumAddress">Ethereum (ETH) Address</Label>
                  <Input
                    id="ethereumAddress"
                    value={settings.ethereumAddress}
                    onChange={(e) => updateSetting('ethereumAddress', e.target.value)}
                    placeholder="Enter Ethereum wallet address"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usdtAddress">USDT (Tether) Address</Label>
                  <Input
                    id="usdtAddress"
                    value={settings.usdtAddress}
                    onChange={(e) => updateSetting('usdtAddress', e.target.value)}
                    placeholder="Enter USDT wallet address"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update company contact details displayed on the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSetting('contactEmail', e.target.value)}
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => updateSetting('supportEmail', e.target.value)}
                    placeholder="support@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => updateSetting('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyAddress">Company Address</Label>
                  <Input
                    id="companyAddress"
                    value={settings.companyAddress}
                    onChange={(e) => updateSetting('companyAddress', e.target.value)}
                    placeholder="123 Business St, City, State 12345"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
