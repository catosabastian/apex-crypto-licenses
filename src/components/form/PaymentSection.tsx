
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, QrCode, Wallet, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import QRCode from 'react-qr-code';

interface PaymentSectionProps {
  selectedCrypto: string;
  onCryptoChange: (crypto: string) => void;
  selectedCategory: string;
}

interface PaymentSettings {
  bitcoinAddress?: string;
  ethereumAddress?: string; 
  usdtTronAddress?: string;
  usdtEthereumAddress?: string;
  xrpAddress?: string;
  category1Price?: string;
  category2Price?: string;
  category3Price?: string;
  category4Price?: string;
  category5Price?: string;
  category6Price?: string;
  category7Price?: string;
  category8Price?: string;
  category9Price?: string;
  category10Price?: string;
  category11Price?: string;
  category12Price?: string;
}

const PaymentSection = ({ selectedCrypto, onCryptoChange, selectedCategory }: PaymentSectionProps) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [paymentAddresses, setPaymentAddresses] = useState<any[]>([]);
  const [settings, setSettings] = useState<PaymentSettings>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  useEffect(() => {
    const loadPaymentData = async () => {
      try {
        setIsLoading(true);
        const [addresses, settingsData] = await Promise.all([
          supabaseDataManager.getPaymentAddresses(),
          supabaseDataManager.getSettings()
        ]);
        
        setPaymentAddresses(addresses || []);
        setSettings({
          bitcoinAddress: addresses?.find(a => a.cryptocurrency === 'BTC')?.address || '',
          ethereumAddress: addresses?.find(a => a.cryptocurrency === 'ETH')?.address || '',
          usdtTronAddress: addresses?.find(a => a.cryptocurrency === 'USDT_TRON')?.address || '',
          usdtEthereumAddress: addresses?.find(a => a.cryptocurrency === 'USDT_ETH')?.address || '',
          xrpAddress: addresses?.find(a => a.cryptocurrency === 'XRP')?.address || '',
          category1Price: settingsData.category1_price || '$25,000',
          category2Price: settingsData.category2_price || '$45,000',
          category3Price: settingsData.category3_price || '$70,000',
          category4Price: settingsData.category4_price || '$150,000',
          category5Price: settingsData.category5_price || '$250,000',
          category6Price: settingsData.category6_price || '$350,000',
          category7Price: settingsData.category7_price || '$50,000',
          category8Price: settingsData.category8_price || '$75,000',
          category9Price: settingsData.category9_price || '$100,000',
          category10Price: settingsData.category10_price || '$125,000',
          category11Price: settingsData.category11_price || '$200,000',
          category12Price: settingsData.category12_price || '$300,000'
        });
      } catch (error) {
        console.error('Error loading payment data:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load payment information. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPaymentData();
    
    const handleUpdate = () => {
      setIsLoadingPrice(true);
      loadPaymentData().finally(() => setIsLoadingPrice(false));
    };

    supabaseDataManager.addEventListener('payment_addresses_updated', handleUpdate);
    supabaseDataManager.addEventListener('settings_updated', handleUpdate);
    
    return () => {
      supabaseDataManager.removeEventListener('payment_addresses_updated', handleUpdate);
      supabaseDataManager.removeEventListener('settings_updated', handleUpdate);
    };
  }, []);

  const getWalletAddress = (crypto: string): string => {
    switch (crypto) {
      case 'BTC':
        return settings.bitcoinAddress || '';
      case 'ETH':
        return settings.ethereumAddress || '';
      case 'USDT_TRON':
        return settings.usdtTronAddress || '';
      case 'USDT_ETH':
        return settings.usdtEthereumAddress || '';
      case 'XRP':
        return settings.xrpAddress || '';
      default:
        return '';
    }
  };

  const getCryptoLabel = (crypto: string): string => {
    switch (crypto) {
      case 'BTC': return 'Bitcoin (BTC)';
      case 'ETH': return 'Ethereum (ETH)';
      case 'USDT_TRON': return 'Tether (USDT) - Tron Network';
      case 'USDT_ETH': return 'Tether (USDT) - Ethereum Network';
      case 'XRP': return 'XRP';
      default: return crypto;
    }
  };

  const getCategoryPrice = (category: string): string => {
    if (isLoadingPrice) return 'Loading...';
    
    switch (category) {
      case '1': return settings.category1Price || '$25,000';
      case '2': return settings.category2Price || '$45,000';
      case '3': return settings.category3Price || '$70,000';
      case '4': return settings.category4Price || '$150,000';
      case '5': return settings.category5Price || '$250,000';
      case '6': return settings.category6Price || '$350,000';
      case '7': return settings.category7Price || '$50,000';
      case '8': return settings.category8Price || '$75,000';
      case '9': return settings.category9Price || '$100,000';
      case '10': return settings.category10Price || '$125,000';
      case '11': return settings.category11Price || '$200,000';
      case '12': return settings.category12Price || '$300,000';
      default: return 'Contact for pricing';
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case '1': return 'Basic Trader';
      case '2': return 'Standard Trader';
      case '3': return 'Advanced Trader';
      case '4': return 'Professional Trader';
      case '5': return 'Institutional Trader';
      case '6': return 'Executive Trader';
      case '7': return 'Crypto Wallet';
      case '8': return 'Fintech EMI';
      case '9': return 'Fintech MSP';
      case '10': return 'Gambling Online';
      case '11': return 'Gambling Lottery';
      case '12': return 'Corporate Offshore';
      default: return `Category ${category}`;
    }
  };

  const handleCopyAddress = async (address: string, type: string) => {
    if (!address) {
      toast({
        title: "Address Not Available",
        description: "This wallet address hasn't been configured yet.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(type);
      toast({
        title: "Address Copied",
        description: `${getCryptoLabel(type)} address copied to clipboard`,
      });
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const selectedAddress = getWalletAddress(selectedCrypto);
  const isAddressValid = selectedAddress && selectedAddress.length > 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading payment information...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Information</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="paymentCrypto">Select Payment Cryptocurrency</Label>
          <Select 
            name="paymentCrypto" 
            value={selectedCrypto}
            onValueChange={onCryptoChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select cryptocurrency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="USDT_TRON">Tether (USDT) - Tron Network</SelectItem>
              <SelectItem value="USDT_ETH">Tether (USDT) - Ethereum Network</SelectItem>
              <SelectItem value="XRP">XRP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card className="p-6 border bg-muted/30 rounded-lg">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Payment Instructions
            </CardTitle>
            <CardDescription>
              Send the exact amount for your selected license tier to the wallet address below:
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="space-y-4">
              {selectedCategory && (
                <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg transition-all duration-200 hover:shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-foreground">
                        {getCategoryName(selectedCategory)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Category {selectedCategory} License
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isLoadingPrice && (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      )}
                      <Badge variant="default" className="font-bold text-2xl px-4 py-2 bg-primary text-primary-foreground">
                        {getCategoryPrice(selectedCategory)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-background/50 rounded-lg border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-2">
                      Selected Plan Price
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {getCategoryPrice(selectedCategory)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      💡 Price updated in real-time from admin system
                    </p>
                  </div>
                </div>
              )}
              
              {!selectedCategory && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Please select a license category above to see pricing
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-background border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm text-muted-foreground">
                    {getCryptoLabel(selectedCrypto)} Wallet Address
                  </Label>
                  <div className="flex gap-2">
                    <Dialog open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 gap-1 text-xs"
                          disabled={!isAddressValid}
                        >
                          <QrCode className="h-3 w-3" />
                          QR Code
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-sm">
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            {getCryptoLabel(selectedCrypto)} Address
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4 p-4">
                          {isAddressValid ? (
                            <>
                              <div className="bg-white p-4 rounded-lg">
                                <QRCode
                                  size={200}
                                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                  value={selectedAddress}
                                  viewBox="0 0 256 256"
                                />
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-2">Wallet Address:</p>
                                <p className="font-mono text-xs break-all bg-muted p-2 rounded">
                                  {selectedAddress}
                                </p>
                              </div>
                            </>
                          ) : (
                            <div className="text-center p-4">
                              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">
                                Wallet address not configured
                              </p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 gap-1 text-xs"
                      onClick={() => handleCopyAddress(selectedAddress, selectedCrypto)}
                      disabled={!isAddressValid}
                    >
                      {copySuccess === selectedCrypto ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="font-mono text-xs sm:text-sm break-all bg-muted/50 p-3 rounded border">
                  {isAddressValid ? (
                    selectedAddress
                  ) : (
                    <div className="flex items-center gap-2 text-amber-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Address not configured - please contact admin</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="transactionId" className="text-sm">Transaction ID/Hash</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Enter the transaction ID after sending the payment
                </p>
                <Input 
                  id="transactionId" 
                  name="transactionId" 
                  className="font-mono" 
                  placeholder="Enter transaction hash..."
                  required 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSection;
