
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { unifiedDataManager, ContentSettings } from '@/utils/unifiedDataManager';
import EnhancedApplicationForm from '@/components/EnhancedApplicationForm';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  notes: string;
}

const UnifiedApplicationForm = () => {
  // Use the enhanced form implementation
  return <EnhancedApplicationForm />;
};

export default UnifiedApplicationForm;
