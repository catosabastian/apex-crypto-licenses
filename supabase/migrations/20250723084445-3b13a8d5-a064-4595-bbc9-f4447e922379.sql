-- Create user roles system for proper admin management
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create comprehensive website settings table
CREATE TABLE public.website_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name text NOT NULL DEFAULT 'APEX Crypto Licensing',
    site_description text DEFAULT 'Professional cryptocurrency licensing and regulatory services',
    logo_url text DEFAULT '/lovable-uploads/294fecc6-7027-4dcd-adc8-c71f110e7314.png',
    featured_image_url text,
    favicon_url text DEFAULT '/favicon.ico',
    contact_email text DEFAULT 'info@apexcrypto.com',
    contact_phone text DEFAULT '+1 (555) 123-4567',
    contact_address text,
    social_facebook text,
    social_twitter text,
    social_linkedin text,
    social_instagram text,
    maintenance_mode boolean DEFAULT false,
    announcement_text text,
    announcement_active boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create SEO settings table
CREATE TABLE public.seo_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path text NOT NULL UNIQUE,
    title text NOT NULL,
    description text NOT NULL,
    keywords text,
    og_title text,
    og_description text,
    og_image text,
    og_type text DEFAULT 'website',
    twitter_card text DEFAULT 'summary_large_image',
    twitter_title text,
    twitter_description text,
    twitter_image text,
    canonical_url text,
    robots text DEFAULT 'index, follow',
    schema_markup jsonb,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create audit log table for security tracking
CREATE TABLE public.admin_audit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    action text NOT NULL,
    table_name text NOT NULL,
    record_id uuid,
    old_data jsonb,
    new_data jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create plan validity settings table
CREATE TABLE public.plan_validity_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    license_type text NOT NULL UNIQUE,
    validity_period_months integer NOT NULL DEFAULT 12,
    renewal_reminder_days integer NOT NULL DEFAULT 30,
    grace_period_days integer NOT NULL DEFAULT 7,
    auto_renewal_enabled boolean DEFAULT false,
    price_per_period numeric(10,2),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_validity_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_roles (admin only)
CREATE POLICY "Only admins can manage user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create RLS policies for website_settings (admin only modify, public read)
CREATE POLICY "Public can read website settings"
ON public.website_settings
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify website settings"
ON public.website_settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create RLS policies for seo_settings (admin only modify, public read)
CREATE POLICY "Public can read SEO settings"
ON public.seo_settings
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify SEO settings"
ON public.seo_settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create RLS policies for audit log (admin only)
CREATE POLICY "Only admins can access audit logs"
ON public.admin_audit_log
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create RLS policies for plan validity settings (admin only modify, public read)
CREATE POLICY "Public can read plan validity settings"
ON public.plan_validity_settings
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify plan validity settings"
ON public.plan_validity_settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Update existing RLS policies to be more restrictive and use new admin functions

-- Drop existing policies that need to be replaced
DROP POLICY IF EXISTS "Allow public read of settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON public.settings;
DROP POLICY IF EXISTS "Allow public read of payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Authenticated users can manage payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Allow public read of content" ON public.content;
DROP POLICY IF EXISTS "Authenticated users can modify content" ON public.content;
DROP POLICY IF EXISTS "Public can read content" ON public.content;

-- Create new restrictive policies for settings (admin only modify, public read)
CREATE POLICY "Public can read settings"
ON public.settings
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify settings"
ON public.settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create new restrictive policies for payment addresses (admin only modify, public read)
CREATE POLICY "Public can read payment addresses"
ON public.payment_addresses
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify payment addresses"
ON public.payment_addresses
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create new restrictive policies for content (admin only modify, public read)
CREATE POLICY "Public can read content"
ON public.content
FOR SELECT
USING (true);

CREATE POLICY "Only admins can modify content"
ON public.content
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Update applications and contacts to be admin-only for management
DROP POLICY IF EXISTS "Allow authenticated application submission" ON public.applications;
DROP POLICY IF EXISTS "Allow authenticated update of applications" ON public.applications;
DROP POLICY IF EXISTS "Allow public read of applications" ON public.applications;

CREATE POLICY "Public can submit applications"
ON public.applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can read applications"
ON public.applications
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update applications"
ON public.applications
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete applications"
ON public.applications
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Update contacts policies
DROP POLICY IF EXISTS "Allow public contact submission" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can submit contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can view contacts" ON public.contacts;

CREATE POLICY "Public can submit contacts"
ON public.contacts
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can read contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (public.is_admin());

-- Create audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO public.admin_audit_log (user_id, action, table_name, record_id, old_data)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO public.admin_audit_log (user_id, action, table_name, record_id, old_data, new_data)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO public.admin_audit_log (user_id, action, table_name, record_id, new_data)
        VALUES (auth.uid(), TG_OP, TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add audit triggers to sensitive tables
CREATE TRIGGER audit_settings_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.settings
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER audit_website_settings_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.website_settings
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER audit_payment_addresses_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.payment_addresses
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER audit_licenses_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.licenses
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update timestamp triggers
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_settings_updated_at
    BEFORE UPDATE ON public.website_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_settings_updated_at
    BEFORE UPDATE ON public.seo_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plan_validity_settings_updated_at
    BEFORE UPDATE ON public.plan_validity_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.website_settings (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;

-- Insert default SEO settings for main pages
INSERT INTO public.seo_settings (page_path, title, description, keywords) VALUES
('/', 'APEX Crypto Licensing - Professional Cryptocurrency Regulatory Services', 'Get your cryptocurrency license with APEX. Professional regulatory services for crypto trading, fintech, and gambling licenses worldwide.', 'cryptocurrency license, crypto regulatory, fintech license, gambling license, regulatory compliance'),
('/about', 'About APEX - Cryptocurrency Licensing Experts', 'Learn about APEX''s expertise in cryptocurrency licensing and regulatory compliance services.', 'about apex, crypto licensing experts, regulatory services'),
('/contact', 'Contact APEX - Get Your Crypto License Today', 'Contact APEX for professional cryptocurrency licensing services and regulatory compliance.', 'contact apex, crypto license contact, regulatory services contact'),
('/pricing', 'Crypto License Pricing - APEX Regulatory Services', 'Transparent pricing for cryptocurrency licenses and regulatory compliance services.', 'crypto license pricing, regulatory services cost, license fees')
ON CONFLICT (page_path) DO NOTHING;

-- Insert default plan validity settings
INSERT INTO public.plan_validity_settings (license_type, validity_period_months, price_per_period) VALUES
('Basic Crypto Trader', 12, 2999.00),
('Standard Crypto Trader', 12, 4999.00),
('Advanced Crypto Trader', 12, 7999.00),
('Professional Crypto Trader', 12, 12999.00),
('Institutional Crypto Trader', 12, 19999.00),
('Executive Crypto Trader', 12, 29999.00),
('Crypto Wallet', 12, 15999.00),
('Fintech EMI', 24, 25999.00),
('Fintech MSP', 24, 35999.00),
('Gambling Online', 12, 45999.00),
('Gambling Lottery', 12, 55999.00),
('Corporate Offshore', 12, 8999.00)
ON CONFLICT (license_type) DO NOTHING;

-- Create initial admin user (will need to be updated with actual user ID)
-- This is just a placeholder - in practice, the first admin should be created manually
-- INSERT INTO public.user_roles (user_id, role) VALUES ('placeholder-uuid', 'admin') ON CONFLICT DO NOTHING;