
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { FileText, Shield, AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EnhancedAdditionalInfoSectionProps {
  formData: any;
  onChange: (field: string, value: string) => void;
}

const EnhancedAdditionalInfoSection = ({ 
  formData, 
  onChange 
}: EnhancedAdditionalInfoSectionProps) => {
  return (
    <Card className="border-2 transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Additional Information</CardTitle>
              <p className="text-sm text-muted-foreground">
                Optional details and legal agreements
              </p>
            </div>
          </div>
          <Badge variant="outline">Optional</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Additional Notes */}
        <div className="space-y-3">
          <Label htmlFor="notes" className="text-base font-medium">
            Additional Notes or Requirements
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Please provide any additional information, special requirements, or questions regarding your license application..."
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Optional: Include any specific trading requirements, compliance questions, or special circumstances.
          </p>
        </div>

        {/* Important Notice */}
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> All information provided must be accurate and complete. 
            False information may result in application rejection or license revocation.
          </AlertDescription>
        </Alert>

        {/* Legal Agreements */}
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Legal Agreements & Compliance
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox id="accuracy" required className="mt-1" />
              <div className="flex-1">
                <label htmlFor="accuracy" className="text-sm font-medium leading-relaxed cursor-pointer">
                  I certify that all information provided in this application is accurate, complete, and truthful.
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Providing false information may result in immediate application rejection and potential legal consequences.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="verification" required className="mt-1" />
              <div className="flex-1">
                <label htmlFor="verification" className="text-sm font-medium leading-relaxed cursor-pointer">
                  I consent to identity verification and background checks as part of the licensing process.
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  This includes KYC/AML procedures, document verification, and regulatory compliance checks.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="compliance" required className="mt-1" />
              <div className="flex-1">
                <label htmlFor="compliance" className="text-sm font-medium leading-relaxed cursor-pointer">
                  I agree to comply with all applicable regulations and maintain licensing requirements.
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Including ongoing compliance obligations, reporting requirements, and regulatory updates.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="terms" required className="mt-1" />
              <div className="flex-1">
                <label htmlFor="terms" className="text-sm font-medium leading-relaxed cursor-pointer">
                  I have read and agree to the Terms of Service and Privacy Policy.
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  By checking this box, you acknowledge acceptance of all terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Information */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Processing Time:</strong> Applications are typically processed within 5-7 business days. 
            You will receive email updates throughout the review process. Premium categories may have expedited processing.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default EnhancedAdditionalInfoSection;
