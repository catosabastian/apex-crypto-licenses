
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Wallet, Copy, Check, QrCode, AlertCircle, CreditCard, Shield } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PaymentOption {
  id: string;
  name: string;
  address: string;
  icon: string;
}

interface EnhancedPaymentSectionProps {
  selectedCategory: any;
  paymentOptions: PaymentOption[];
  selectedPayment: string;
  onPaymentSelect: (method: string) => void;
  onCopyAddress: (address: string, type: string) => void;
  onShowQR: (address: string, type: string) => void;
  copiedAddress: string | null;
  settings: any;
}

const EnhancedPaymentSection = ({
  selectedCategory,
  paymentOptions,
  selectedPayment,
  onPaymentSelect,
  onCopyAddress,
  onShowQR,
  copiedAddress,
  settings
}: EnhancedPaymentSectionProps) => {
  if (!selectedCategory) {
    return (
      <Card className="border-2 border-dashed border-muted">
        <CardContent className="text-center py-8">
          <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Please select a license category to view payment options
          </p>
        </CardContent>
      </Card>
    );
  }

  const availablePayments = paymentOptions.filter(option => option.address && option.address.trim() !== '');
  const unavailablePayments = paymentOptions.filter(option => !option.address || option.address.trim() === '');

  return (
    <Card className="border-2 transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Payment Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose your preferred cryptocurrency payment method
              </p>
            </div>
          </div>
          <Badge variant="outline" className="gap-2">
            <Shield className="h-3 w-3" />
            Secure Payment
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* License Summary */}
        <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
              <p className="text-sm text-muted-foreground">Selected License Category</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{selectedCategory.price}</p>
              <p className="text-sm text-muted-foreground">Total Amount</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedCategory.features?.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">Select Payment Method</h4>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{availablePayments.length} methods available</span>
            </div>
          </div>

          <RadioGroup value={selectedPayment} onValueChange={onPaymentSelect}>
            <div className="grid gap-4">
              {availablePayments.map((option) => (
                <TooltipProvider key={option.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${
                        selectedPayment === option.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <div className="flex items-center gap-3 flex-1">
                            <div className="text-2xl font-mono">{option.icon}</div>
                            <div className="flex-1">
                              <Label htmlFor={option.id} className="text-base font-medium cursor-pointer">
                                {option.name}
                              </Label>
                              <p className="text-sm text-muted-foreground font-mono">
                                {option.address.slice(0, 12)}...{option.address.slice(-8)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onShowQR(option.address, option.name)}
                                className="h-8 w-8 p-0"
                              >
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => onCopyAddress(option.address, option.name)}
                                className="h-8 w-8 p-0"
                              >
                                {copiedAddress === option.name ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to select {option.name} payment method</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Unavailable Payment Methods */}
        {unavailablePayments.length > 0 && (
          <div className="space-y-4">
            <Separator />
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Temporarily Unavailable
              </h5>
              <div className="grid gap-2">
                {unavailablePayments.map((option) => (
                  <div key={option.id} className="flex items-center gap-3 p-3 border border-dashed border-muted rounded-lg opacity-60">
                    <div className="text-xl font-mono">{option.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{option.name}</p>
                      <p className="text-xs text-muted-foreground">Address not configured</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Unavailable
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Payment Details */}
        {selectedPayment && (
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4 text-primary" />
              <h5 className="font-semibold">Payment Instructions</h5>
            </div>
            <div className="space-y-2 text-sm">
              <p>• Send the exact amount: <strong>{selectedCategory.price}</strong></p>
              <p>• Use the wallet address for the selected cryptocurrency</p>
              <p>• Include your application details in the transaction memo (if supported)</p>
              <p>• Processing typically takes 1-3 confirmations</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedPaymentSection;
