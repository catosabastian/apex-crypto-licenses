
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface AdditionalInfoSectionProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

const AdditionalInfoSection = ({ notes, onNotesChange }: AdditionalInfoSectionProps) => {
  return (
    <div className="form-section">
      <div className="section-heading">
        <div className="section-icon">
          <FileText className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold">Additional Information</h3>
      </div>
      
      <div className="form-field-group">
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Any additional information about your application..."
            className="min-h-[120px] mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
