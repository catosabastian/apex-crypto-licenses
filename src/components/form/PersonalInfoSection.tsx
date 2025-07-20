
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface PersonalInfoSectionProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  onChange: (field: string, value: string) => void;
}

const PersonalInfoSection = ({ formData, onChange }: PersonalInfoSectionProps) => {
  return (
    <div className="form-section">
      <div className="section-heading">
        <div className="section-icon">
          <User className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold">Personal Information</h3>
      </div>
      
      <div className="form-field-group">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              required
              className="mt-2"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              required
              className="mt-2"
              placeholder="Enter your email address"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="mt-2"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <Label htmlFor="company">Company/Organization</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => onChange('company', e.target.value)}
              className="mt-2"
              placeholder="Enter your company name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
