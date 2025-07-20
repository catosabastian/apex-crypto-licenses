
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Check, Wallet, AlertCircle, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager, ContentSettings } from '@/utils/unifiedDataManager';

export const PaymentAddressManager = () => {
  const [settings, setSettings] = useState<ContentSettings>(unifiedDataManager.getSettings());
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleSettingsUpdate = (data: { settings: ContentSettings }) => {
      setSettings(data.settings);
      setIsDirty(false);
    };

    unifiedDataManager.addEventListener('settings_updated', handleSettingsUpdate);
    
    return () => {
      unifiedDataManager.removeEventListener('settings_updated', handleSettingsUpdate);
    };
  }, []);

  const handleAddressChange = (field: keyof ContentSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSaveAddresses = () => {
    try {
      unifiedDataManager.updateSettings({
        bitcoinAddress: settings.bitcoinAddress,
        ethereumAddress: settings.ethereumAddress,
        usdtTronAddress: settings.usdtTronAddress,
        usdtEthereumAddress: settings.usdtEthereumAddress,
        xrpAddress: settings.xrpAddress,
      });

      toast({
        title: "Payment Addresses Updated",
        description: "All cryptocurrency addresses have been updated successfully",
      });
      
      setIsDirty(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update payment addresses. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyAddress = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(type);
      toast({
        title: "Address Copied",
        description: `${type} address copied to clipboard`,
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const validateAddress = (address: string, type: string): boolean => {
    if (!address || address.trim() === '') return false;
    
    switch (type) {
      case 'bitcoin':
        return address.startsWith('bc1') || address.startsWith('1') || address.startsWith('3');
      case 'ethereum':
      case 'usdtEthereum':
        return address.startsWith('0x') && address.length === 42;
      case 'usdtTron':
        return address.startsWith('T') && address.length === 34;
      case 'xrp':
        return address.startsWith('r') && address.length >= 25;
      default:
        return true;
    }
  };

  const addressFields = [
    {
      key: 'bitcoinAddress' as keyof ContentSettings,
      label: 'Bitcoin Address',
      description: 'BTC wallet address for receiving payments',
      placeholder: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      type: 'bitcoin'
    },
    {
      key: 'ethereumAddress' as keyof ContentSettings,
      label: 'Ethereum Address',
      description: 'ETH wallet address for receiving payments',
      placeholder: '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0',
      type: 'ethereum'
    },
    {
      key: 'usdtTronAddress' as keyof ContentSettings,
      label: 'USDT (Tron) Address',
      description: 'USDT-TRC20 wallet address for receiving payments',
      placeholder: 'TG3XXyExBkPp9nzdajDGFahC9nyKERJpUN',
      type: 'usdtTron'
    },
    {
      key: 'usdtEthereumAddress' as keyof ContentSettings,
      label: 'USDT (Ethereum) Address',
      description: 'USDT-ERC20 wallet address for receiving payments',
      placeholder: '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0',
      type: 'usdtEthereum'
    },
    {
      key: 'xrpAddress' as keyof ContentSettings,
      label: 'XRP Address',
      description: 'XRP wallet address for receiving payments',
      placeholder: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
      type: 'xrp'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Payment Address Management</h2>
          <p className="text-muted-foreground">Configure cryptocurrency wallet addresses for receiving payments</p>
        </div>
        <Button 
          onClick={handleSaveAddresses} 
          disabled={!isDirty}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save All Addresses
        </Button>
      </div>

      {isDirty && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You have unsaved changes. Don't forget to save your updated addresses.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {addressFields.map((field) => {
          const value = settings[field.key] as string;
          const isValid = validateAddress(value, field.type);
          
          return (
            <Card key={field.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  {field.label}
                </CardTitle>
                <CardDescription>{field.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={field.key}>Wallet Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id={field.key}
                      value={value}
                      onChange={(e) => handleAddressChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className={`font-mono ${!isValid && value ? 'border-red-500' : ''}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyAddress(value, field.label)}
                      disabled={!value || !isValid}
                    >
                      {copiedAddress === field.label ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {!isValid && value && (
                    <p className="text-sm text-red-600">
                      Invalid {field.label.toLowerCase()} format
                    </p>
                  )}
                  {!value && (
                    <p className="text-sm text-amber-600">
                      Address not configured - payments for this cryptocurrency will not be available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Double-check all addresses before saving. Incorrect addresses may result in lost payments. 
          Always test with small amounts first.
        </AlertDescription>
      </Alert>
    </div>
  );
};
