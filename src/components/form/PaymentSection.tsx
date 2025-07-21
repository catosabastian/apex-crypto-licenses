
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, QrCode, Wallet, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';
import QRCode from 'react-qr-code';

interface PaymentSectionProps {
  selectedCrypto: string;
  onCryptoChange: (crypto: string) => void;
  selectedCategory: string;
  settings: any;
}

const PaymentSection = ({ selectedCrypto, onCryptoChange, selectedCategory, settings }: PaymentSectionProps) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [paymentAddresses, setPaymentAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPaymentAddresses = async () => {
      try {
        setIsLoading(true);
        const addresses = await supabaseDataManager.getPaymentAddresses();
        console.log('[PaymentSection] Loaded payment addresses:', addresses);
        setPaymentAddresses(addresses);
      } catch (error) {
        console.error('[PaymentSection] Error loading payment addresses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleAddressUpdate = (data: any) => {
      console.log('[PaymentSection] Payment addresses updated:', data);
      loadPaymentAddresses();
    };

    supabaseDataManager.addEventListener('payment_addresses_updated', handleAddressUpdate);
    loadPaymentAddresses();

    return () => {
      supabaseDataManager.removeEventListener('payment_addresses_updated', handleAddressUpdate);
    };
  }, []);

  const getWalletAddress = (crypto: string): string => {
    const cryptoMapping = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'USDT_TRON': 'usdt_tron',
      'USDT_ETH': 'usdt_ethereum',
      'XRP': 'xrp'
    };

    const mappedCrypto = cryptoMapping[crypto as keyof typeof cryptoMapping];
    const address = paymentAddresses.find(addr => addr.cryptocurrency === mappedCrypto);
    
    return address?.address || 'Address not configured';
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
    switch (category) {
      case '1': return settings.category1_price || '25,000 USDT';
      case '2': return settings.category2_price || '50,000 USDT';
      case '3': return settings.category3_price || '70,000 USDT';
      case '4': return settings.category4_price || '150,000 USDT';
      case '5': return settings.category5_price || '250,000 USDT';
      case '6': return settings.category6_price || '500,000 USDT';
      default: return 'Price not available';
    }
  };

  const handleCopyAddress = async (address: string, type: string) => {
    if (!address || address === 'Address not configured') {
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
  const isAddressValid = selectedAddress && selectedAddress !== 'Address not configured';

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Payment Cryptocurrency</Label>
            <div className="h-10 bg-muted rounded-md animate-pulse" />
          </div>
          <Card className="p-6 border bg-muted/30 rounded-lg">
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-20 bg-muted rounded animate-pulse" />
            </div>
          </Card>
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
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">License Category {selectedCategory} Price:</span>
                    <Badge variant="secondary" className="font-semibold">
                      {getCategoryPrice(selectedCategory)}
                    </Badge>
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
