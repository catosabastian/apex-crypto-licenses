import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Calendar, Globe, QrCode, Award } from 'lucide-react';
import QRCode from 'react-qr-code';

interface LicenseData {
  id: string;
  holder_name: string;
  license_type: string;
  issue_date: string;
  expiry_date: string;
  status: string;
  platforms?: string;
}

interface LicenseCardProps {
  license: LicenseData;
  className?: string;
}

const LicenseCard: React.FC<LicenseCardProps> = ({ license, className = "" }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isValid = license.status === 'active' && new Date(license.expiry_date) > new Date();

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary/20 ${className}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      {/* Watermark */}
      <div className="absolute top-4 right-4 opacity-10">
        <Shield className="w-24 h-24" />
      </div>

      {/* Header */}
      <div className="relative p-6 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">APEX GLOBAL</h3>
              <p className="text-sm text-muted-foreground">Cryptocurrency Trading License</p>
            </div>
          </div>
          <Badge 
            variant={isValid ? "default" : "destructive"}
            className="px-3 py-1 text-xs font-medium"
          >
            {license.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* License Details */}
      <div className="relative p-6 space-y-6">
        {/* License ID */}
        <div className="text-center border-2 border-dashed border-primary/30 rounded-lg p-4 bg-primary/5">
          <p className="text-sm text-muted-foreground mb-1">License ID</p>
          <p className="text-2xl font-mono font-bold text-primary tracking-wider">{license.id}</p>
        </div>

        {/* Holder Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                License Holder
              </p>
              <p className="font-semibold text-lg">{license.holder_name}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                License Type
              </p>
              <p className="font-medium">{license.license_type}</p>
            </div>

            {license.platforms && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Platforms</p>
                <p className="font-medium">{license.platforms}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Issue Date
              </p>
              <p className="font-medium">{formatDate(license.issue_date)}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Expiry Date
              </p>
              <p className="font-medium">{formatDate(license.expiry_date)}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-lg border-2 border-primary/20">
                <QRCode
                  value={`https://apex-crypto-licensing.com/verify/${license.id}`}
                  size={80}
                  className="w-full h-full"
                />
                <p className="text-xs text-center mt-2 text-muted-foreground">Scan to verify</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="border-t border-primary/20 pt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Verified by APEX Global</span>
            </div>
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              <span>Digitally Secured</span>
            </div>
          </div>
        </div>

        {/* Holographic Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-30 transform rotate-12"></div>
        </div>
      </div>

      {/* Official Seal */}
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border-2 border-primary/30">
        <Shield className="w-8 h-8 text-primary" />
      </div>
    </Card>
  );
};

export default LicenseCard;