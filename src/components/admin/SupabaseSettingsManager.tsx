import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Edit, Save, DollarSign, Wallet, CheckCircle, Wifi, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

export const SupabaseSettingsManager = () => {
  const [settings, setSettings] = useState<any>({});
  const [paymentAddresses, setPaymentAddresses] = useState<any[]>([]);
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [isEditingWallets, setIsEditingWallets] = useState(false);
  const [tempSettings, setTempSettings] = useState<any>({});
  const [tempAddresses, setTempAddresses] = useState<any[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [settingsData, addressesData] = await Promise.all([
        supabaseDataManager.getSettings(),
        supabaseDataManager.getPaymentAddresses()
      ]);
      
      setSettings(settingsData);
      setPaymentAddresses(addressesData);
      setIsConnected(true);
      setLastUpdateTime(new Date());
    } catch (error) {
      console.error('Failed to load settings:', error);
      setIsConnected(false);
      toast({
        title: "Connection Error",
        description: "Failed to load settings from database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      // Save pricing settings
      for (const [key, value] of Object.entries(tempSettings)) {
        if (key.includes('category') && (key.includes('Price') || key.includes('Available'))) {
          await supabaseDataManager.updateSetting(key, value);
        }
      }
      
      toast({
        title: "Settings Updated",
        description: "All pricing settings have been saved successfully",
      });
      
      setIsEditingPrices(false);
      loadData();
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save settings to database",
        variant: "destructive",
      });
    }
  };

  const handleSaveAddresses = async () => {
    try {
      for (const address of tempAddresses) {
        await supabaseDataManager.updatePaymentAddress(address.cryptocurrency, { address: address.address });
      }
      
      toast({
        title: "Addresses Updated",
        description: "All payment addresses have been saved successfully",
      });
      
      setIsEditingWallets(false);
      loadData();
    } catch (error) {
      console.error('Failed to save addresses:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save addresses to database",
        variant: "destructive",
      });
    }
  };

  const handleAvailabilityToggle = async (category: string, value: boolean) => {
    try {
      const key = `${category}Available`;
      await supabaseDataManager.updateSetting(key, value);
      
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
      
      toast({
        title: "Availability Updated",
        description: `${category} has been ${value ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      console.error('Failed to toggle availability:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update availability",
        variant: "destructive",
      });
    }
  };

  const getPrice = (category: number) => {
    return settings[`category${category}Price`] || '$0';
  };

  const getAvailability = (category: number) => {
    return settings[`category${category}Available`] || false;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Database Settings</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-green-600">Connected to Supabase</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Disconnected</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-medium">
              Last sync: {lastUpdateTime.toLocaleTimeString()}
            </span>
          </div>
          <Button onClick={loadData} variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6">
        {/* License Pricing Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                License Pricing
                <Badge variant="default" className="bg-green-500 text-white">
                  Database ✓
                </Badge>
              </CardTitle>
              <CardDescription>Manage license pricing and availability from Supabase</CardDescription>
            </div>
            <Dialog open={isEditingPrices} onOpenChange={setIsEditingPrices}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setTempSettings(settings)}>
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
                        value={tempSettings[`category${category}Price`] || ''}
                        onChange={(e) => setTempSettings(prev => ({
                          ...prev,
                          [`category${category}Price`]: e.target.value
                        }))}
                        placeholder="e.g., $25,000"
                      />
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingPrices(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((category) => (
              <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Category {category}</p>
                  <p className="text-sm text-muted-foreground">
                    {getPrice(category)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={getAvailability(category)}
                      onCheckedChange={(checked) => 
                        handleAvailabilityToggle(`category${category}`, checked)
                      }
                    />
                    <Badge variant={getAvailability(category) ? "default" : "secondary"}>
                      {getAvailability(category) ? "Available" : "Sold Out"}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Database ✓
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Addresses Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Payment Addresses
                <Badge variant="default" className="bg-green-500 text-white">
                  Database ✓
                </Badge>
              </CardTitle>
              <CardDescription>Manage cryptocurrency wallet addresses from Supabase</CardDescription>
            </div>
            <Dialog open={isEditingWallets} onOpenChange={setIsEditingWallets}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setTempAddresses([...paymentAddresses])}>
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
                  {tempAddresses.map((address, index) => (
                    <div key={address.cryptocurrency}>
                      <Label htmlFor={address.cryptocurrency}>
                        {address.cryptocurrency.toUpperCase().replace('_', ' ')} Address
                      </Label>
                      <Input
                        id={address.cryptocurrency}
                        value={address.address}
                        onChange={(e) => {
                          const newAddresses = [...tempAddresses];
                          newAddresses[index].address = e.target.value;
                          setTempAddresses(newAddresses);
                        }}
                        placeholder={`${address.cryptocurrency} wallet address`}
                        className="font-mono"
                      />
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingWallets(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAddresses}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentAddresses.map((address) => (
              <div key={address.cryptocurrency} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{address.cryptocurrency.toUpperCase().replace('_', ' ')}</p>
                  <p className="text-sm text-muted-foreground font-mono break-all">{address.address}</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Database ✓
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};