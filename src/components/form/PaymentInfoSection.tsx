
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, QrCode, Wallet, AlertCircle, ExternalLink } from 'lucide-react';
import { unifiedDataManager, ContentSettings } from '@/utils/unifiedDataManager';

interface PaymentInfoSectionProps {
  selectedCategory: { name: string; price: string } | null;
  settings: ContentSettings;
  copiedAddress: string | null;
  onCopyAddress: (address: string, type: string) => void;
}

const PaymentInfoSection = ({ 
  selectedCategory, 
  settings, 
  copiedAddress, 
  onCopyAddress 
}: PaymentInfoSectionProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [transactionId, setTransactionId] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  // Payment options with addresses from admin settings
  const paymentOptions = [
    {
      id: 'bitcoin',
      name: 'Bitcoin (BTC)',
      symbol: 'BTC',
      address: settings.bitcoinAddress,
      icon: '₿',
      color: 'text-orange-500',
      network: 'Bitcoin Network'
    },
    {
      id: 'ethereum',
      name: 'Ethereum (ETH)',
      symbol: 'ETH',
      address: settings.ethereumAddress,
      icon: 'Ξ',
      color: 'text-blue-500',
      network: 'Ethereum Network'
    },
    {
      id: 'usdt',
      name: 'Tether (USDT)',
      symbol: 'USDT',
      address: settings.usdtAddress,
      icon: '₮',
      color: 'text-green-500',
      network: 'Tron Network'
    }
  ];

  const selectedOption = paymentOptions.find(option => option.id === selectedCrypto);
  
  const generateQRCodeURL = (address: string, amount?: string) => {
    if (!address) return '';
    
    let qrData = '';
    switch (selectedCrypto) {
      case 'bitcoin':
        qrData = `bitcoin:${address}${amount ? `?amount=${amount}` : ''}`;
        break;
      case 'ethereum':
        qrData = `ethereum:${address}${amount ? `?value=${amount}` : ''}`;
        break;
      case 'usdt':
        qrData = address; // For USDT, we'll just use the address
        break;
      default:
        qrData = address;
    }
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
  };

  const getPaymentInstructions = () => {
    if (!selectedCategory || !selectedOption) return null;

    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-900">Payment Instructions</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>1. Send exactly <strong>{selectedCategory.price}</strong> to the wallet address below</p>
                <p>2. Use the <strong>{selectedOption.network}</strong> for this transaction</p>
                <p>3. Copy the transaction ID/hash after sending</p>
                <p>4. Paste the transaction ID in the field below</p>
                <p>5. Our system will verify your payment within 10-30 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!selectedCategory) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Please select a license category to see payment information.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Payment Information</h3>
        <p className="text-muted-foreground">
          Complete your payment for <strong>{selectedCategory.name}</strong>
        </p>
        <Badge variant="outline" className="text-lg font-semibold">
          Total: {selectedCategory.price}
        </Badge>
      </div>

      {getPaymentInstructions()}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Select Payment Method
          </CardTitle>
          <CardDescription>
            Choose your preferred cryptocurrency for payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {paymentOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedCrypto === option.id ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedCrypto(option.id)}
              >
                <span className={`text-2xl ${option.color}`}>{option.icon}</span>
                <div className="text-center">
                  <div className="font-semibold">{option.symbol}</div>
                  <div className="text-xs opacity-70">{option.network}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedOption && selectedOption.address && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className={`text-xl ${selectedOption.color}`}>{selectedOption.icon}</span>
                {selectedOption.name} Payment
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQRCode(!showQRCode)}
                className="flex items-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                {showQRCode ? 'Hide QR' : 'Show QR'}
              </Button>
            </CardTitle>
            <CardDescription>
              Send {selectedCategory.price} to the address below on {selectedOption.network}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {selectedOption.name} Wallet Address
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  value={selectedOption.address}
                  readOnly
                  className="font-mono text-sm bg-muted"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopyAddress(selectedOption.address, selectedOption.name)}
                  className="shrink-0"
                >
                  {copiedAddress === selectedOption.name ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {showQRCode && selectedOption.address && (
              <div className="flex justify-center p-4 bg-white border rounded-lg">
                <div className="text-center space-y-2">
                  <img
                    src={generateQRCodeURL(selectedOption.address)}
                    alt={`QR Code for ${selectedOption.name} payment`}
                    className="mx-auto border rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Scan with your wallet app
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="transactionId" className="text-sm font-medium">
                Transaction ID / Hash *
              </Label>
              <Input
                id="transactionId"
                placeholder="Paste your transaction ID here after sending payment"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="font-mono text-sm"
                required
              />
              <p className="text-xs text-muted-foreground">
                Required for payment verification. You'll receive this from your wallet after sending.
              </p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="text-sm text-amber-800">
                  <strong>Important:</strong> Make sure to send the exact amount ({selectedCategory.price}) 
                  to avoid delays in processing. Network fees are separate and paid by you.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedOption?.address && (
        <Card>
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Payment Address Not Available</h4>
            <p className="text-sm text-muted-foreground mb-4">
              The wallet address for {selectedOption?.name} is not configured. 
              Please contact support or choose a different payment method.
            </p>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentInfoSection;
