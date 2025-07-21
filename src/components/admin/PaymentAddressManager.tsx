import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabaseDataManager, PaymentAddress } from '@/utils/supabaseDataManager';

export function PaymentAddressManager() {
  const [addresses, setAddresses] = useState<PaymentAddress[]>([]);
  const [editingAddress, setEditingAddress] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState<string>('');
  const [isDirty, setIsDirty] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadAddresses = async () => {
      const addressData = await supabaseDataManager.getPaymentAddresses();
      setAddresses(addressData);
    };

    const handleAddressUpdate = (data: PaymentAddress[]) => {
      setAddresses(data);
      setIsDirty(false);
    };

    supabaseDataManager.addEventListener('payment_addresses_updated', handleAddressUpdate);
    loadAddresses();

    return () => {
      supabaseDataManager.removeEventListener('payment_addresses_updated', handleAddressUpdate);
    };
  }, []);

  const handleAddressChange = (cryptocurrency: string, value: string) => {
    setAddresses(prev => prev.map(addr => 
      addr.cryptocurrency === cryptocurrency 
        ? { ...addr, address: value }
        : addr
    ));
    setEditingAddress(value);
    setIsDirty(true);
  };

  const handleSaveAddresses = async () => {
    try {
      for (const address of addresses) {
        await supabaseDataManager.updatePaymentAddress(address.cryptocurrency, {
          address: address.address,
          is_active: address.is_active
        });
      }
      
      // Reload addresses to confirm updates
      const addressData = await supabaseDataManager.getPaymentAddresses();
      setAddresses(addressData);
      
      setIsDirty(false);
      toast({
        title: "Success",
        description: "Payment addresses updated successfully",
      });
    } catch (error) {
      console.error('Error saving payment addresses:', error);
      toast({
        title: "Error", 
        description: "Failed to update payment addresses",
        variant: "destructive",
      });
    }
  };

  const handleCopyAddress = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(''), 2000);
      toast({
        title: "Copied!",
        description: `${type} address copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy address",
        variant: "destructive",
      });
    }
  };

  const validateAddress = (address: string, type: string): boolean => {
    if (!address) return false;
    
    const patterns = {
      BTC: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/,
      ETH: /^0x[a-fA-F0-9]{40}$/,
      USDT_TRON: /^T[A-Za-z1-9]{33}$/,
      USDT_ETH: /^0x[a-fA-F0-9]{40}$/,
      XRP: /^r[0-9a-zA-Z]{24,34}$/
    };

    return patterns[type as keyof typeof patterns]?.test(address) || false;
  };

  const cryptoLabels = {
    BTC: { name: 'Bitcoin (BTC)', desc: 'Native SegWit address starting with bc1 or legacy address' },
    ETH: { name: 'Ethereum (ETH)', desc: 'ERC-20 compatible address starting with 0x' },
    USDT_TRON: { name: 'USDT (TRC-20)', desc: 'Tron network address starting with T' },
    USDT_ETH: { name: 'USDT (ERC-20)', desc: 'Ethereum network address starting with 0x' },
    XRP: { name: 'Ripple (XRP)', desc: 'Classic address starting with r' },
    bitcoin: { name: 'Bitcoin (BTC)', desc: 'Legacy bitcoin address format' },
    ethereum: { name: 'Ethereum (ETH)', desc: 'Standard ethereum address' },
    usdt: { name: 'USDT', desc: 'USDT address (multiple networks supported)' }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Addresses</CardTitle>
        <CardDescription>
          Manage cryptocurrency wallet addresses for receiving payments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {addresses.map((address) => {
          const crypto = address.cryptocurrency;
          const label = cryptoLabels[crypto as keyof typeof cryptoLabels];
          const isValid = validateAddress(address.address, crypto);
          
          return (
            <div key={crypto} className="space-y-2">
              <Label htmlFor={crypto} className="text-sm font-medium">
                {label?.name || crypto}
              </Label>
              <p className="text-xs text-muted-foreground mb-2">
                {label?.desc || `${crypto} wallet address`}
              </p>
              <div className="flex space-x-2">
                <Input
                  id={crypto}
                  value={address.address}
                  onChange={(e) => handleAddressChange(crypto, e.target.value)}
                  placeholder={`Enter ${crypto} address`}
                  className={`flex-1 ${!isValid && address.address ? 'border-destructive' : ''}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopyAddress(address.address, crypto)}
                  disabled={!address.address}
                  className="px-3"
                >
                  {copiedAddress === address.address ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {!isValid && address.address && (
                <p className="text-xs text-destructive">
                  Invalid {crypto} address format
                </p>
              )}
            </div>
          );
        })}
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSaveAddresses}
            disabled={!isDirty}
            className="min-w-[120px]"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}