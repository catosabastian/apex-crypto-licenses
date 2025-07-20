
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager, ContentSettings } from '@/utils/unifiedDataManager';
import { Save, DollarSign, Wallet, Globe, Mail, Database, AlertTriangle, CheckCircle2, Wifi } from 'lucide-react';

const SettingsManager = () => {
  const [settings, setSettings] = useState<ContentSettings>(unifiedDataManager.getSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [hasSupabase, setHasSupabase] = useState(false);

  useEffect(() => {
    // Check if Supabase is connected (this would be updated when Supabase integration is active)
    const checkSupabaseConnection = () => {
      // This would check for actual Supabase connection
      // For now, we'll assume it's not connected since no Supabase integration is visible
      setHasSupabase(false);
    };

    checkSupabaseConnection();

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
        title: hasSupabase ? "Settings Saved to Database" : "Settings Saved Locally",
        description: hasSupabase 
          ? "All settings have been saved to the database and synchronized." 
          : "Settings saved to local storage. Connect Supabase for permanent database storage.",
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">System Settings</h2>
          <p className="text-muted-foreground">Manage pricing, availability, and payment settings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {hasSupabase ? (
              <>
                <Database className="h-4 w-4 text-green-500" />
                <Badge variant="default" className="bg-green-500 text-white">
                  Database Connected
                </Badge>
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 text-orange-500" />
                <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
                  Local Storage Only
                </Badge>
              </>
            )}
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 btn-primary">
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      {/* Supabase Connection Alert */}
      {!hasSupabase && (
        <Alert className="border-orange-500/20 bg-orange-500/5">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <AlertDescription className="text-sm">
            <strong>Database Connection Required:</strong> To save settings permanently and enable real-time synchronization, 
            please connect to Supabase by clicking the green Supabase button in the top-right corner of the interface.
            Currently, settings are only saved to local storage.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-card">
          <TabsTrigger value="pricing" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Pricing</span>
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Availability</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2 data-[state=active]:bg-primary/20">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                License Category Pricing
                {hasSupabase && (
                  <Badge variant="default" className="bg-green-500 text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Set pricing for each license category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((category) => (
                  <div key={category} className="space-y-3 p-4 glass-card rounded-lg">
                    <Label htmlFor={`category${category}Price`} className="text-sm font-medium">
                      Category {category} - {
                        ['Basic Trader', 'Standard Trader', 'Advanced Trader', 'Professional Trader', 'Institutional Trader', 'Executive Trader'][category - 1]
                      }
                    </Label>
                    <Input
                      id={`category${category}Price`}
                      value={(settings as any)[`category${category}Price`] || ''}
                      onChange={(e) => updateSetting(`category${category}Price` as keyof ContentSettings, e.target.value)}
                      placeholder="e.g., 10,000 USDT"
                      className="glass-card border-primary/30 focus:border-primary"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Category Availability
                {hasSupabase && (
                  <Badge variant="default" className="bg-green-500 text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Control which license categories are available for purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((category) => (
                  <div key={category} className="flex items-center justify-between p-4 glass-card rounded-lg hover:bg-primary/5 transition-colors duration-300">
                    <div className="space-y-1">
                      <Label className="font-medium">
                        Category {category} - {
                          ['Basic Trader', 'Standard Trader', 'Advanced Trader', 'Professional Trader', 'Institutional Trader', 'Executive Trader'][category - 1]
                        }
                      </Label>
                      <p className="text-sm text-muted-foreground font-mono">
                        {(settings as any)[`category${category}Price`]}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={(settings as any)[`category${category}Available`] || false}
                        onCheckedChange={(checked) => 
                          updateSetting(`category${category}Available` as keyof ContentSettings, checked)
                        }
                      />
                      <Badge 
                        variant={(settings as any)[`category${category}Available`] ? "default" : "secondary"}
                        className={(settings as any)[`category${category}Available`] ? "bg-green-500 text-white" : ""}
                      >
                        {(settings as any)[`category${category}Available`] ? "Available" : "Sold Out"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Cryptocurrency Wallet Addresses
                {hasSupabase && (
                  <Badge variant="default" className="bg-green-500 text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Configure payment wallet addresses for different cryptocurrencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="bitcoinAddress" className="text-sm font-medium">Bitcoin (BTC) Address</Label>
                  <Input
                    id="bitcoinAddress"
                    value={(settings as any).bitcoinAddress || ''}
                    onChange={(e) => updateSetting('bitcoinAddress' as keyof ContentSettings, e.target.value)}
                    placeholder="Enter Bitcoin wallet address"
                    className="font-mono text-sm glass-card border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="ethereumAddress" className="text-sm font-medium">Ethereum (ETH) Address</Label>
                  <Input
                    id="ethereumAddress"
                    value={(settings as any).ethereumAddress || ''}
                    onChange={(e) => updateSetting('ethereumAddress' as keyof ContentSettings, e.target.value)}
                    placeholder="Enter Ethereum wallet address"
                    className="font-mono text-sm glass-card border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-3 lg:col-span-2">
                  <Label htmlFor="usdtAddress" className="text-sm font-medium">USDT (Tether) Address</Label>
                  <Input
                    id="usdtAddress"
                    value={(settings as any).usdtAddress || ''}
                    onChange={(e) => updateSetting('usdtAddress' as keyof ContentSettings, e.target.value)}
                    placeholder="Enter USDT wallet address"
                    className="font-mono text-sm glass-card border-primary/30 focus:border-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
                {hasSupabase && (
                  <Badge variant="default" className="bg-green-500 text-white">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>Update company contact details displayed on the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="contactEmail" className="text-sm font-medium">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={(settings as any).contactEmail || ''}
                    onChange={(e) => updateSetting('contactEmail' as keyof ContentSettings, e.target.value)}
                    placeholder="contact@company.com"
                    className="glass-card border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="supportEmail" className="text-sm font-medium">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={(settings as any).supportEmail || ''}
                    onChange={(e) => updateSetting('supportEmail' as keyof ContentSettings, e.target.value)}
                    placeholder="support@company.com"
                    className="glass-card border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="contactPhone" className="text-sm font-medium">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={(settings as any).contactPhone || ''}
                    onChange={(e) => updateSetting('contactPhone' as keyof ContentSettings, e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="glass-card border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="companyAddress" className="text-sm font-medium">Company Address</Label>
                  <Input
                    id="companyAddress"
                    value={(settings as any).companyAddress || ''}
                    onChange={(e) => updateSetting('companyAddress' as keyof ContentSettings, e.target.value)}
                    placeholder="123 Business St, City, State 12345"
                    className="glass-card border-primary/30 focus:border-primary"
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
