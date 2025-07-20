
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Edit, Save, DollarSign, Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { secureDataManager, WebsiteSettings } from '@/utils/secureDataManager';
import { ContactSettingsManager } from './ContactSettingsManager';

export const SettingsManager = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(secureDataManager.getSettings());
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [isEditingWallets, setIsEditingWallets] = useState(false);
  const [tempSettings, setTempSettings] = useState<WebsiteSettings>(settings);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  useEffect(() => {
    console.log('[SettingsManager] Component mounted, initializing settings');
    
    // Force refresh settings on mount
    const currentSettings = secureDataManager.getSettings();
    setSettings(currentSettings);
    setTempSettings(currentSettings);
  }, []);

  const handleSaveSettings = () => {
    console.log('[SettingsManager] Saving settings:', tempSettings);
    setSyncStatus('syncing');
    
    try {
      const updatedSettings = secureDataManager.updateSettings(tempSettings);
      console.log('[SettingsManager] Settings saved successfully:', updatedSettings);
      
      setSettings(updatedSettings);
      setIsEditingPrices(false);
      setIsEditingWallets(false);
      setLastUpdateTime(new Date());
      setSyncStatus('success');
      
      toast({
        title: "Settings Updated Successfully",
        description: "All changes have been saved and synchronized across the platform",
      });
      
      // Reset sync status after showing success
      setTimeout(() => setSyncStatus('idle'), 3000);
      
    } catch (error) {
      console.error('[SettingsManager] Failed to save settings:', error);
      setSyncStatus('error');
      
      toast({
        title: "Settings Update Failed",
        description: "There was an error saving your changes. Please try again.",
        variant: "destructive",
      });
      
      // Reset sync status after showing error
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const handleAvailabilityToggle = (category: keyof WebsiteSettings, value: boolean) => {
    console.log(`[SettingsManager] Toggling availability for ${category}:`, value);
    setSyncStatus('syncing');
    
    try {
      const updates = { [category]: value };
      const updatedSettings = secureDataManager.updateSettings(updates);
      console.log('[SettingsManager] Availability updated:', updatedSettings);
      
      setSettings(updatedSettings);
      setTempSettings(updatedSettings);
      setLastUpdateTime(new Date());
      setSyncStatus('success');
      
      toast({
        title: "Availability Updated",
        description: `${category} has been ${value ? 'enabled' : 'disabled'} successfully`,
      });
      
      // Reset sync status after showing success
      setTimeout(() => setSyncStatus('idle'), 2000);
      
    } catch (error) {
      console.error('[SettingsManager] Failed to toggle availability:', error);
      setSyncStatus('error');
      
      toast({
        title: "Update Failed",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
      
      // Reset sync status after showing error
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'Synchronizing...';
      case 'success':
        return 'Synchronized';
      case 'error':
        return 'Sync Failed';
      default:
        return `Last updated: ${lastUpdateTime.toLocaleTimeString()}`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Website Settings</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getSyncStatusIcon()}
          <span>{getSyncStatusText()}</span>
        </div>
      </div>
      
      <div className="grid gap-6">
        {/* Contact Information Management */}
        <ContactSettingsManager />

        {/* License Pricing Card */}
        <Card className="modern-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                License Pricing
              </CardTitle>
              <CardDescription>Manage license pricing and availability</CardDescription>
            </div>
            <Dialog open={isEditingPrices} onOpenChange={setIsEditingPrices}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setTempSettings(settings)} className="glass-button">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Prices
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit License Prices</DialogTitle>
                  <DialogDescription>
                    Update pricing for all license categories
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((category) => (
                    <div key={category} className="flex items-center gap-4">
                      <Label className="w-24">Category {category}</Label>
                      <Input
                        value={tempSettings[`category${category}Price` as keyof WebsiteSettings] as string}
                        onChange={(e) => setTempSettings(prev => ({
                          ...prev,
                          [`category${category}Price`]: e.target.value
                        }))}
                        placeholder="e.g., 25,000 USDT"
                        className="glass-card"
                      />
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingPrices(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSettings} className="btn-primary" disabled={syncStatus === 'syncing'}>
                    {syncStatus === 'syncing' ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((category) => (
              <div key={category} className="flex items-center justify-between p-4 border rounded-lg glass-card">
                <div>
                  <p className="font-medium">Category {category}</p>
                  <p className="text-sm text-muted-foreground">
                    {settings[`category${category}Price` as keyof WebsiteSettings]}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={settings[`category${category}Available` as keyof WebsiteSettings] as boolean}
                      onCheckedChange={(checked) => 
                        handleAvailabilityToggle(`category${category}Available` as keyof WebsiteSettings, checked)
                      }
                      disabled={syncStatus === 'syncing'}
                    />
                    <Badge variant={settings[`category${category}Available` as keyof WebsiteSettings] ? "default" : "secondary"}>
                      {settings[`category${category}Available` as keyof WebsiteSettings] ? "Available" : "Sold Out"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Addresses Card */}
        <Card className="modern-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Payment Addresses
              </CardTitle>
              <CardDescription>Manage cryptocurrency wallet addresses</CardDescription>
            </div>
            <Dialog open={isEditingWallets} onOpenChange={setIsEditingWallets}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setTempSettings(settings)} className="glass-button">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Addresses
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Payment Addresses</DialogTitle>
                  <DialogDescription>
                    Update cryptocurrency wallet addresses for payments
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bitcoin">Bitcoin Address</Label>
                    <Input
                      id="bitcoin"
                      value={tempSettings.bitcoinAddress}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        bitcoinAddress: e.target.value
                      }))}
                      placeholder="Bitcoin wallet address"
                      className="font-mono glass-card"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ethereum">Ethereum Address</Label>
                    <Input
                      id="ethereum"
                      value={tempSettings.ethereumAddress}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        ethereumAddress: e.target.value
                      }))}
                      placeholder="Ethereum wallet address"
                      className="font-mono glass-card"
                    />
                  </div>
                  <div>
                    <Label htmlFor="usdt">USDT Address</Label>
                    <Input
                      id="usdt"
                      value={tempSettings.usdtAddress}
                      onChange={(e) => setTempSettings(prev => ({
                        ...prev,
                        usdtAddress: e.target.value
                      }))}
                      placeholder="USDT wallet address"
                      className="font-mono glass-card"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingWallets(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSettings} className="btn-primary" disabled={syncStatus === 'syncing'}>
                    {syncStatus === 'syncing' ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg glass-card">
              <div>
                <p className="font-medium">Bitcoin</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{settings.bitcoinAddress}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg glass-card">
              <div>
                <p className="font-medium">Ethereum</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{settings.ethereumAddress}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg glass-card">
              <div>
                <p className="font-medium">USDT</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{settings.usdtAddress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
