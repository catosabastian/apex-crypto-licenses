import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Download, Calendar, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceInfo {
  title: string;
  description: string;
  features: string[];
  requirements: string[];
  price: string;
  timeline: string;
  jurisdiction?: string;
}

interface ServiceInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceInfo: ServiceInfo;
  serviceType: 'crypto' | 'fintech' | 'gambling' | 'corporate';
}

export const ServiceInfoModal = ({ open, onOpenChange, serviceInfo, serviceType }: ServiceInfoModalProps) => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    onOpenChange(false);
    navigate('/apply');
  };

  const handleBookConsultation = () => {
    onOpenChange(false);
    // Navigate to consultation booking with service type
    navigate('/apply', { state: { serviceType, consultationOnly: true } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{serviceInfo.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {serviceInfo.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {serviceInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {serviceInfo.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{serviceInfo.price}</div>
              <p className="text-sm text-muted-foreground">Starting Price</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{serviceInfo.timeline}</div>
              <p className="text-sm text-muted-foreground">Timeline</p>
            </div>
            {serviceInfo.jurisdiction && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-lg font-bold text-primary">{serviceInfo.jurisdiction}</div>
                <p className="text-sm text-muted-foreground">Jurisdiction</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleApplyNow} className="flex-1 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Apply Now
            </Button>
            <Button variant="outline" onClick={handleBookConsultation} className="flex-1 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Book Consultation
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Guide
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};