
-- First, let's fix the RLS policies that are causing access issues
-- Fix INSERT policies for settings table
DROP POLICY IF EXISTS "Admins can modify settings" ON public.settings;
CREATE POLICY "Admins can modify settings" 
ON public.settings 
FOR INSERT 
WITH CHECK (public.is_admin());

-- Fix INSERT policies for content table  
DROP POLICY IF EXISTS "Admins can modify content" ON public.content;
CREATE POLICY "Admins can modify content" 
ON public.content 
FOR INSERT 
WITH CHECK (public.is_admin());

-- Ensure we have default website settings
INSERT INTO public.website_settings (site_name, site_description, contact_email, contact_phone) 
VALUES (
  'APEX Crypto Licensing',
  'Professional cryptocurrency licensing and regulatory services',
  'info@apexcrypto.com',
  '+1 (555) 123-4567'
) ON CONFLICT (id) DO NOTHING;

-- Insert default settings for the application
INSERT INTO public.settings (key, value, category, description) VALUES
('application_fee', '"100"', 'pricing', 'Application processing fee'),
('license_fee_basic', '"500"', 'pricing', 'Basic license fee'),
('license_fee_standard', '"1000"', 'pricing', 'Standard license fee'),
('license_fee_premium', '"2000"', 'pricing', 'Premium license fee'),
('processing_time', '"5-10 business days"', 'general', 'Application processing time'),
('support_email', '"support@apexcrypto.com"', 'contact', 'Support email address'),
('company_name', '"APEX Crypto Licensing"', 'general', 'Company name'),
('company_address', '"123 Crypto Street, Digital City, DC 12345"', 'contact', 'Company address')
ON CONFLICT (key) DO NOTHING;

-- Insert default payment addresses
INSERT INTO public.payment_addresses (cryptocurrency, address, is_active) VALUES
('BTC', '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', true),
('ETH', '0x742d35Cc6CfF8C03FbE5b9F5c8E9f9f8f8f8f8f8', true),
('USDT_TRON', 'TQQg4EL8o1BSeKJY4MvHfxQUyoBRB5VgTG', true),
('USDT_ETH', '0x742d35Cc6CfF8C03FbE5b9F5c8E9f9f8f8f8f8f8', true)
ON CONFLICT (cryptocurrency) DO NOTHING;

-- Insert default content for the application
INSERT INTO public.content (key, section, value) VALUES
('hero.title', 'hero', '"Professional Cryptocurrency Licensing Services"'),
('hero.subtitle', 'hero', '"Get your crypto trading license with our expert guidance and support"'),
('about.title', 'about', '"About APEX Crypto Licensing"'),
('about.description', 'about', '"We are a leading provider of cryptocurrency licensing services, helping businesses navigate the complex regulatory landscape."'),
('services.title', 'services', '"Our Services"'),
('process.title', 'process', '"License Application Process"')
ON CONFLICT (key) DO NOTHING;

-- Create a function to safely create admin user during setup
CREATE OR REPLACE FUNCTION public.safe_create_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    target_user_id UUID;
BEGIN
    -- Find user by email
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = user_email 
    LIMIT 1;
    
    -- If user found, make them admin
    IF target_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (target_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$;
