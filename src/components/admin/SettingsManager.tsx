
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Edit, Save, DollarSign, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { dataManager, WebsiteSettings } from '@/utils/dataManager';

export const SettingsManager = () => {
  const [settings, setSettings] = useState<WebsiteSettings>(dataManager.getSettings());
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [isEditingWallets, setIsEditingWallets] = useState(false);
  const [tempSettings, setTempSettings] = useState<WebsiteSettings>(settings);

  const handleSaveSettings = () => {
    const updatedSettings = dataManager.updateSettings(tempSettings);
    setSettings(updatedSettings);
    setIsEditingPrices(false);
    setIsEditingWallets(false);
    toast({
      title: "Settings Updated",
      description: "Website settings have been updated successfully",
    });
  };

  const handleAvailabilityToggle = (category: keyof WebsiteSettings, value: boolean) => {
    const updates = { [category]: value };
    const updatedSettings = dataManager.updateSettings(updates);
    setSettings(updatedSettings);
    setTempSettings(updatedSettings);
    toast({
      title: "Availability Updated",
      description: `${category} availability has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Website Settings</h2>
      
      <div className="grid gap-6">
        {/* License Pricing Card */}
        <Card>
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
                  {[1, 2, 3, 4, 5].map((category) => (
                    <div key={category} className="flex items-center gap-4">
                      <Label className="w-24">Category {category}</Label>
                      <Input
                        value={tempSettings[`category${category}Price` as keyof WebsiteSettings] as string}
                        onChange={(e) => setTempSettings(prev => ({
                          ...prev,
                          [`category${category}Price`]: e.target.value
                        }))}
                        placeholder="e.g., 25,000 USDT"
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
            {[1, 2, 3, 4, 5].map((category) => (
              <div key={category} className="flex items-center justify-between p-4 border rounded-lg">
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
        <Card>
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
                <Button variant="outline" size="sm" onClick={() => setTempSettings(settings)}>
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
                      className="font-mono"
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
                      className="font-mono"
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
                      className="font-mono"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditingWallets(false)}>
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
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Bitcoin</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{settings.bitcoinAddress}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Ethereum</p>
                <p className="text-sm text-muted-foreground font-mono break-all">{settings.ethereumAddress}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
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
