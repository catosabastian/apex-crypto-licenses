
-- Create EmailJS settings table for admin management
CREATE TABLE public.emailjs_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL,
  template_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  template_name TEXT NOT NULL DEFAULT 'default',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for EmailJS settings
ALTER TABLE public.emailjs_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage EmailJS settings
CREATE POLICY "Only admins can manage EmailJS settings"
  ON public.emailjs_settings
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- Add trigger for updated_at
CREATE TRIGGER update_emailjs_settings_updated_at
  BEFORE UPDATE ON public.emailjs_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
