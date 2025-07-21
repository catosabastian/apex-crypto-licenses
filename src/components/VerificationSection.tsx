import { Shield, Search, Clock, Check, ArrowRight, QrCode, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabaseDataManager } from '@/utils/supabaseDataManager';

const VerificationSection = () => {
  const [content, setContent] = useState({
    subtitle: 'License Verification',
    title: 'Verify Any Trading License',
    description: 'Use our secure verification system to check the authenticity of any cryptocurrency trading license.',
    cards: [
      { icon: 'Shield', title: 'Secure Verification', description: 'Advanced cryptographic verification ensures authenticity.' },
      { icon: 'Search', title: 'Instant Results', description: 'Get verification results in seconds with our real-time system.' },
      { icon: 'Clock', title: 'Always Available', description: 'Our verification system is available 24/7 for your convenience.' }
    ],
    timeline: {
      title: 'Verification Process Timeline',
      steps: [
        { number: 1, title: 'License Submission', description: 'Submit your license ID for verification', badge: 'Instant', isCompleted: true },
        { number: 2, title: 'Database Check', description: 'System checks our secure license database', badge: '< 5 seconds', isCompleted: true },
        { number: 3, title: 'Verification Result', description: 'Receive detailed verification report', badge: 'Complete', isCompleted: true }
      ]
    }
  });
  const [licenseId, setLicenseId] = useState('');
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [verifiedLicense, setVerifiedLicense] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sampleLicense] = useState({
    id: 'CL-2024-8294-T2',
    holder: 'APEX Trading Solutions Ltd.',
    type: 'Professional Trader',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-15',
    platforms: 'Binance, Coinbase Pro, Kraken, Bybit'
  });

  useEffect(() => {
    const loadContent = async () => {
      const verificationContent = await supabaseDataManager.getContent('verification');
      if (verificationContent && Object.keys(verificationContent).length > 0) {
        setContent(prev => ({ ...prev, ...verificationContent }));
      }
    };

    loadContent();
    supabaseDataManager.addEventListener('content_updated', loadContent);
    
    return () => {
      supabaseDataManager.removeEventListener('content_updated', loadContent);
    };
  }, []);

  const iconMap: Record<string, any> = {
    Shield,
    Search,
    Clock
  };

  const handleVerify = async () => {
    if (!licenseId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license ID",
        variant: "destructive",
      });
      return;
    }

    const license = await supabaseDataManager.verifyLicense(licenseId.trim());
    const verified = license !== null;
    setIsVerified(verified);
    
    if (verified && license) {
      setVerifiedLicense({
        id: license.license_id,
        holder: license.holder_name,
        type: license.license_type,
        issueDate: license.issue_date,
        expiryDate: license.expiry_date,
        platforms: license.platforms || 'All major exchanges',
        status: license.status === 'active' ? 'Active' : license.status
      });
      
      toast({
        title: "License Verified",
        description: "The license is valid and in our database.",
      });
    } else {
      setVerifiedLicense(null);
      toast({
        title: "Verification Failed",
        description: "This license ID was not found in our database.",
        variant: "destructive",
      });
    }
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setIsVerified(null);
      setVerifiedLicense(null);
      setLicenseId('');
    }
  };

  return (
    <section id="verification" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-primary"></div>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{content.subtitle}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {content.title}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10">
            {content.description}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {content.cards.map((card, index) => {
              const IconComponent = iconMap[card.icon];
              return (
                <VerificationCard 
                  key={index}
                  icon={IconComponent && <IconComponent className="h-6 w-6" />}
                  title={card.title}
                  description={card.description}
                />
              );
            })}
          </div>
          
          <div className="bg-muted/30 border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{content.timeline.title}</h3>
            
            <div className="space-y-6">
              {content.timeline.steps.map((step, index) => (
                <VerificationStep 
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  badge={step.badge}
                  isCompleted={step.isCompleted}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-12">
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
              <DialogTrigger asChild>
                <Button className="mx-auto block">Verify a License</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>License Verification</DialogTitle>
                  <DialogDescription>
                    Enter the license ID to verify its authenticity. Try using: {sampleLicense.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="licenseId" className="text-right">
                      License ID
                    </Label>
                    <Input 
                      id="licenseId" 
                      value={licenseId} 
                      onChange={(e) => setLicenseId(e.target.value)} 
                      placeholder="e.g. CL-2024-8294-T2"
                      className="col-span-3"
                    />
                  </div>
                  
                  {isVerified !== null && (
                    <div className="space-y-4">
                      <Alert variant={isVerified ? "default" : "destructive"} className={isVerified ? "bg-green-50 border-green-200" : ""}>
                        <div className="flex items-center gap-2">
                          {isVerified ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          <AlertDescription>
                            {isVerified ? "License verified successfully." : "License verification failed. No matching license found."}
                          </AlertDescription>
                        </div>
                      </Alert>
                      
                      {/* Enhanced License Display */}
                      {isVerified && verifiedLicense && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold mb-4">Verified License Details</h4>
                          <LicenseCard license={verifiedLicense} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={handleVerify} type="button">Verify License</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-4">
            <Card className="license-card w-full max-w-md relative">
              <div className="watermark">APEX</div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-accent">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-white" />
                  <h3 className="text-lg font-bold text-white">APEX CRYPTO LICENSE</h3>
                </div>
                <Badge className="bg-white/20 text-white border-white/30">VERIFIED</Badge>
              </div>
              
              <CardContent className="p-6 content">
                <div className="stamp">AUTHENTIC</div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground">License Holder</h4>
                      <p className="font-bold text-lg">{sampleLicense.holder}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Category</h4>
                      <p className="font-bold text-primary">{sampleLicense.type}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">License ID</h4>
                      <p className="font-bold font-mono text-sm">{sampleLicense.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Issue Date</h4>
                      <p className="font-semibold">{sampleLicense.issueDate}</p>
                    </div>
                    <div>
                      <h4 className="text-xs text-muted-foreground uppercase tracking-wider">Expiry Date</h4>
                      <p className="font-semibold">{sampleLicense.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                    <h4 className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Authorized Platforms</h4>
                    <p className="font-medium text-sm">{sampleLicense.platforms}</p>
                  </div>
                  
                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <p>Verify at:</p>
                      <p className="font-mono">verify.apexcrypto.auth</p>
                    </div>
                    <div className="qr-section">
                      <QrCode className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center pt-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent w-full"></div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      This license is valid and registered in the APEX regulatory database
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced License Card Component
const LicenseCard = ({ license }: { license: any }) => {
  return (
    <Card className="license-card w-full max-w-2xl mx-auto relative border-2 border-green-200 bg-green-50">
      <div className="watermark">VERIFIED</div>
      
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-600 to-green-500">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-white" />
          <h3 className="text-lg font-bold text-white">APEX CRYPTO LICENSE</h3>
        </div>
        <Badge className="bg-white/20 text-white border-white/30">{license.status}</Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="stamp text-green-600">VERIFIED</div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm text-green-700">License Holder</h4>
              <p className="font-bold text-lg text-green-800">{license.holder}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <h4 className="text-xs text-green-700 uppercase tracking-wider">Category</h4>
              <p className="font-bold text-green-800">{license.type}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <h4 className="text-xs text-green-700 uppercase tracking-wider">License ID</h4>
              <p className="font-bold font-mono text-sm text-green-800">{license.id}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs text-green-700 uppercase tracking-wider">Issue Date</h4>
              <p className="font-semibold text-green-800">{license.issueDate}</p>
            </div>
            <div>
              <h4 className="text-xs text-green-700 uppercase tracking-wider">Expiry Date</h4>
              <p className="font-semibold text-green-800">{license.expiryDate}</p>
            </div>
          </div>
          
          <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <h4 className="text-xs text-green-700 uppercase tracking-wider mb-2">Authorized Platforms</h4>
            <p className="font-medium text-sm text-green-800">{license.platforms}</p>
          </div>
          
          <div className="pt-4 flex items-center justify-between">
            <div className="text-xs text-green-700">
              <p>Verify at:</p>
              <p className="font-mono">verify.apexcrypto.auth</p>
            </div>
            <div className="qr-section">
              <QrCode className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-green-700">
              ✓ This license is valid and registered in the APEX regulatory database
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface VerificationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VerificationCard = ({ icon, title, description }: VerificationCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface VerificationStepProps {
  number: number;
  title: string;
  description: string;
  badge: string;
  isCompleted: boolean;
}

const VerificationStep = ({ number, title, description, badge, isCompleted }: VerificationStepProps) => {
  return (
    <div className="flex gap-4">
      <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary text-white' : 'bg-muted border'}`}>
        {isCompleted ? <Check className="h-4 w-4" /> : number}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant="secondary">{badge}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <Separator className="mt-4" />
      </div>
    </div>
  );
};

export default VerificationSection;
