-- Create new tables for enhanced functionality

-- Service pages content management
CREATE TABLE public.service_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_type TEXT NOT NULL, -- 'crypto', 'fintech', 'gambling', 'corporate'
  page_slug TEXT NOT NULL, -- 'mse-canada', 'consultation', etc.
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Consultation bookings tracking
CREATE TABLE public.consultation_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT NOT NULL, -- 'crypto', 'fintech', 'gambling', 'corporate'
  service_category TEXT, -- specific service like 'mse-canada'
  preferred_date TIMESTAMP WITH TIME ZONE,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Service inquiries tracking
CREATE TABLE public.service_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT NOT NULL,
  inquiry_type TEXT NOT NULL, -- 'pricing', 'features', 'timeline', 'general'
  message TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'in_progress', 'resolved', 'closed'
  assigned_to UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- API usage monitoring
CREATE TABLE public.api_usage_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  user_id UUID,
  ip_address INET,
  user_agent TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Email templates management
CREATE TABLE public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  template_id TEXT NOT NULL, -- EmailJS template ID
  subject TEXT NOT NULL,
  description TEXT,
  template_variables JSONB NOT NULL DEFAULT '[]', -- Array of required variables
  is_active BOOLEAN NOT NULL DEFAULT true,
  category TEXT NOT NULL DEFAULT 'general', -- 'application', 'consultation', 'notification'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.service_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for service_pages
CREATE POLICY "Public can read active service pages" 
ON public.service_pages 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage service pages" 
ON public.service_pages 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Create policies for consultation_bookings
CREATE POLICY "Public can create consultation bookings" 
ON public.consultation_bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage consultation bookings" 
ON public.consultation_bookings 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Create policies for service_inquiries  
CREATE POLICY "Public can create service inquiries" 
ON public.service_inquiries 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage service inquiries" 
ON public.service_inquiries 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Create policies for api_usage_logs
CREATE POLICY "Only admins can access API usage logs" 
ON public.api_usage_logs 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Create policies for email_templates
CREATE POLICY "Public can read active email templates" 
ON public.email_templates 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage email templates" 
ON public.email_templates 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Add triggers for updated_at
CREATE TRIGGER update_service_pages_updated_at
BEFORE UPDATE ON public.service_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_consultation_bookings_updated_at
BEFORE UPDATE ON public.consultation_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_inquiries_updated_at
BEFORE UPDATE ON public.service_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON public.email_templates
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add audit triggers
CREATE TRIGGER service_pages_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.service_pages
FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER consultation_bookings_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.consultation_bookings
FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER service_inquiries_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.service_inquiries
FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER email_templates_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.email_templates
FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

-- Insert default service pages
INSERT INTO public.service_pages (service_type, page_slug, title, description, content) VALUES
('crypto', 'mse-canada', 'MSB Canada License', 'Money Services Business license for Canada', '{"features": ["No minimum capital requirement", "Quick 3-6 month processing", "Covers all of Canada"], "benefits": ["Regulatory compliance", "Enhanced credibility", "Access to banking"], "process": ["Application preparation", "Document submission", "Review process", "License issuance"]}'),
('crypto', 'vasp-bulgaria', 'VASP Bulgaria License', 'Virtual Asset Service Provider license for Bulgaria', '{"features": ["EU market access", "€125,000 minimum capital", "1-year processing time"], "benefits": ["EU passport rights", "Crypto-friendly jurisdiction", "Professional reputation"], "process": ["Due diligence", "Application filing", "Authority review", "License grant"]}'),
('fintech', 'emi-cyprus', 'EMI Cyprus License', 'Electronic Money Institution license in Cyprus', '{"features": ["€350,000 initial capital", "EU-wide operations", "6-12 month process"], "benefits": ["Payment services", "EU passport", "Regulated status"], "process": ["Business plan", "Capital deposit", "CySEC review", "Authorization"]}'),
('fintech', 'payment-institution', 'Payment Institution License', 'Payment services authorization', '{"features": ["Various capital requirements", "Multiple jurisdictions", "Flexible timeframes"], "benefits": ["Payment processing", "Multi-country access", "Regulatory approval"], "process": ["Jurisdiction selection", "Application preparation", "Regulatory submission", "License approval"]}'),
('gambling', 'kahnawake', 'Kahnawake Gaming License', 'Gaming license from Kahnawake Gaming Commission', '{"features": ["Established jurisdiction", "Reasonable fees", "Quick processing"], "benefits": ["Gaming operations", "Player protection", "Regulatory oversight"], "process": ["Application submission", "Background checks", "Compliance review", "License issuance"]}'),
('gambling', 'curacao', 'Curaçao eGaming License', 'eGaming license from Curaçao Gaming Control Board', '{"features": ["Single license covers all", "Cost-effective", "Fast approval"], "benefits": ["Global operations", "Tax efficiency", "Established framework"], "process": ["Initial application", "Due diligence", "Technical review", "License grant"]}'),
('corporate', 'company-formation', 'Company Formation Services', 'Complete corporate structuring solutions', '{"features": ["Multiple jurisdictions", "Fast incorporation", "Ongoing support"], "benefits": ["Legal entity", "Tax optimization", "Operational flexibility"], "process": ["Jurisdiction advice", "Documentation", "Registration", "Post-incorporation"]}'),
('corporate', 'banking-solutions', 'Banking Solutions', 'Corporate banking and financial services', '{"features": ["Multi-currency accounts", "International transfers", "Trade finance"], "benefits": ["Financial infrastructure", "Global reach", "Regulatory compliance"], "process": ["Account opening", "Documentation", "Compliance checks", "Account activation"]}');

-- Insert default email templates
INSERT INTO public.email_templates (name, template_id, subject, description, template_variables, category) VALUES
('Application Confirmation', 'template_app_confirm', 'Application Received - {{applicant_name}}', 'Sent when a new license application is submitted', '["applicant_name", "application_type", "reference_number"]', 'application'),
('Consultation Booking', 'template_consultation', 'Consultation Booked - {{service_type}}', 'Sent when a consultation is booked', '["name", "service_type", "preferred_date", "message"]', 'consultation'),
('Support Request', 'template_support', 'Support Request - {{subject}}', 'General support and inquiry template', '["name", "email", "subject", "message"]', 'notification');

-- Add indexes for performance
CREATE INDEX idx_service_pages_service_type ON public.service_pages(service_type);
CREATE INDEX idx_service_pages_slug ON public.service_pages(page_slug);
CREATE INDEX idx_consultation_bookings_service_type ON public.consultation_bookings(service_type);
CREATE INDEX idx_consultation_bookings_status ON public.consultation_bookings(status);
CREATE INDEX idx_service_inquiries_service_type ON public.service_inquiries(service_type);
CREATE INDEX idx_service_inquiries_status ON public.service_inquiries(status);
CREATE INDEX idx_api_usage_logs_endpoint ON public.api_usage_logs(endpoint);
CREATE INDEX idx_api_usage_logs_created_at ON public.api_usage_logs(created_at);
CREATE INDEX idx_email_templates_category ON public.email_templates(category);