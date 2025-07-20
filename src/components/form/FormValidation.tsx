
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ValidationMessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
  className?: string;
}

export const ValidationMessage = ({ type, message, className }: ValidationMessageProps) => {
  const icons = {
    error: AlertCircle,
    success: CheckCircle,
    info: Info
  };
  
  const variants = {
    error: 'destructive',
    success: 'default',
    info: 'default'
  } as const;
  
  const colors = {
    error: 'text-red-600',
    success: 'text-green-600',
    info: 'text-blue-600'
  };
  
  const Icon = icons[type];
  
  return (
    <Alert variant={variants[type]} className={className}>
      <Icon className={`h-4 w-4 ${colors[type]}`} />
      <AlertDescription className={colors[type]}>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const getFieldValidation = (field: string, value: string) => {
  switch (field) {
    case 'email':
      if (!validateRequired(value)) {
        return { isValid: false, message: 'Email is required' };
      }
      if (!validateEmail(value)) {
        return { isValid: false, message: 'Please enter a valid email address' };
      }
      return { isValid: true, message: 'Email looks good!' };
      
    case 'phone':
      if (value && !validatePhone(value)) {
        return { isValid: false, message: 'Please enter a valid phone number' };
      }
      return { isValid: true, message: '' };
      
    case 'name':
      if (!validateRequired(value)) {
        return { isValid: false, message: 'Name is required' };
      }
      if (value.length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters' };
      }
      return { isValid: true, message: 'Name looks good!' };
      
    default:
      return { isValid: true, message: '' };
  }
};
