
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Check, Wallet } from 'lucide-react';

interface PaymentInfoSectionProps {
  selectedCategory: {
    name: string;
    price: string;
  } | null;
  settings: {
    bitcoinAddress: string;
    ethereumAddress: string;
    usdtAddress: string;
  };
  copiedAddress: string | null;
  onCopyAddress: (address: string, type: string) => void;
}

const PaymentInfoSection = ({ selectedCategory, settings, copiedAddress, onCopyAddress }: PaymentInfoSectionProps) => {
  if (!selectedCategory) return null;

  return (
    <div className="form-section">
      <div className="section-heading">
        <div className="section-icon">
          <Wallet className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold">Payment Information</h3>
      </div>
      
      <div className="payment-notice">
        <p><strong>Selected License:</strong> {selectedCategory.name} - {selectedCategory.price}</p>
        <p className="text-sm text-muted-foreground">Please send payment to one of the addresses below and include your application details.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Bitcoin Address</Label>
          <div className="flex items-center gap-2 mt-2">
            <div className="wallet-address flex-1">{settings.bitcoinAddress}</div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCopyAddress(settings.bitcoinAddress, 'Bitcoin')}
              className={copiedAddress === 'Bitcoin' ? 'copy-button-success' : ''}
            >
              {copiedAddress === 'Bitcoin' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div>
          <Label className="text-base font-medium">Ethereum Address</Label>
          <div className="flex items-center gap-2 mt-2">
            <div className="wallet-address flex-1">{settings.ethereumAddress}</div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCopyAddress(settings.ethereumAddress, 'Ethereum')}
              className={copiedAddress === 'Ethereum' ? 'copy-button-success' : ''}
            >
              {copiedAddress === 'Ethereum' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div>
          <Label className="text-base font-medium">USDT Address</Label>
          <div className="flex items-center gap-2 mt-2">
            <div className="wallet-address flex-1">{settings.usdtAddress}</div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCopyAddress(settings.usdtAddress, 'USDT')}
              className={copiedAddress === 'USDT' ? 'copy-button-success' : ''}
            >
              {copiedAddress === 'USDT' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoSection;
