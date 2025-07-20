
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Edit, Save, DollarSign, Wallet, CheckCircle, Wifi } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import { ContactSettingsManager } from './ContactSettingsManager';

export const UnifiedSettingsManager = () => {
  const [settings, setSettings] = useState(unifiedDataManager.getSettings());
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [isEditingWallets, setIsEditingWallets] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [updateCount, setUpdateCount] = useState(0);

  const mountedRef = useRef(true);

  useEffect(() => {
    console.log('[UnifiedSettingsManager] Component mounted');
    
    const handleSettingsUpdate = (data: any) => {
      if (!mountedRef.current) return;
      
      console.log('[UnifiedSettingsManager] Settings update received:', data);
      const newSettings = data.settings || data;
      
      setSettings(newSettings);
      setTempSettings(newSettings);
      setLastUpdateTime(new Date());
      setUpdateCount(prev => prev + 1);
      
      toast({
        title: "Settings Synchronized",
        description: "Changes applied across all instances",
      });
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);

    return () => {
      mountedRef.current = false;
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const handleSaveSettings = () => {
    console.log('[UnifiedSettingsManager] Saving settings:', tempSettings);
    
    try {
      const updatedSettings = unifiedDataManager.updateSettings(tempSettings);
      console.log('[UnifiedSettingsManager] Settings saved successfully:', updatedSettings);
      
      setSettings(updatedSettings);
      setIsEditingPrices(false);
      setIsEditingWallets(false);
      setLastUpdateTime(new Date());
      
      toast({
        title: "Settings Updated Successfully",
        description: "Changes are now live across all instances",
      });
      
    } catch (error) {
      console.error('[UnifiedSettingsManager] Failed to save settings:', error);
      
      toast({
        title: "Settings Update Failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleAvailabilityToggle = (category: string, value: boolean) => {
    console.log(`[UnifiedSettingsManager] Toggling availability for ${category}:`, value);
    
    try {
      const updates = { [category]: value };
      const updatedSettings = unifiedDataManager.updateSettings(updates);
      console.log('[UnifiedSettingsManager] Availability updated:', updatedSettings);
      
      setSettings(updatedSettings);
      setTempSettings(updatedSettings);
      setLastUpdateTime(new Date());
      setUpdateCount(prev => prev + 1);
      
      toast({
        title: "Availability Updated",
        description: `${String(category)} has been ${value ? 'enabled' : 'disabled'}`,
      });
      
    } catch (error) {
      console.error('[UnifiedSettingsManager] Failed to toggle availability:', error);
      
      toast({
        title: "Update Failed",
        description: "Failed to update availability",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Website Settings</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Wifi className="h-4 w-4 text-green-500" />
            <span className="text-green-600">Connected</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-medium">
              Live Updates: {updateCount} | {lastUpdateTime.toLocaleTimeString()}
            </span>
          </div>
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
                <Badge variant="default" className="bg-green-500 text-white">
                  Live ✓
                </Badge>
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
                        value={(tempSettings as any)[`category${category}Price`] || ''}
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
                  <Button onClick={handleSaveSettings} className="btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
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
                    {(settings as any)[`category${category}Price`]}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={(settings as any)[`category${category}Available`] || false}
                      onCheckedChange={(checked) => 
                        handleAvailabilityToggle(`category${category}Available`, checked)
                      }
                    />
                    <Badge variant={(settings as any)[`category${category}Available`] ? "default" : "secondary"}>
                      {(settings as any)[`category${category}Available`] ? "Available" : "Sold Out"}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Live ✓
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
                <Badge variant="default" className="bg-green-500 text-white">
                  Live ✓
                </Badge>
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
                      value={(tempSettings as any).bitcoinAddress || ''}
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
                      value={(tempSettings as any).ethereumAddress || ''}
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
                      value={(tempSettings as any).usdtAddress || ''}
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
                  <Button onClick={handleSaveSettings} className="btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg glass-card">
              <div>
                <p className="font-medium">Bitcoin</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{(settings as any).bitcoinAddress}</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Live ✓
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg glass-card">
              <div>
                <p className="font-medium">Ethereum</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{(settings as any).ethereumAddress}</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Live ✓
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg glass-card">
              <div>
                <p className="font-medium">USDT</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{(settings as any).usdtAddress}</p>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Live ✓
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
