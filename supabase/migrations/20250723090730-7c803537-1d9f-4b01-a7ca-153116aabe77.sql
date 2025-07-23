-- Create user roles system for proper admin management
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer functions to avoid infinite recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  );
$$;

-- Create RLS policies for user_roles
CREATE POLICY "Only admins can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create audit logging system
CREATE TABLE public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    user_agent TEXT,
    ip_address INET
);

-- Enable RLS on audit log
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can access audit logs" 
ON public.admin_audit_log 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS TRIGGER AS $$
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

-- Create website settings table for comprehensive site management
CREATE TABLE public.website_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT NOT NULL DEFAULT 'APEX Crypto Licensing',
    site_description TEXT DEFAULT 'Professional cryptocurrency licensing and regulatory services',
    logo_url TEXT DEFAULT '/lovable-uploads/294fecc6-7027-4dcd-adc8-c71f110e7314.png',
    featured_image_url TEXT,
    favicon_url TEXT DEFAULT '/favicon.ico',
    contact_email TEXT DEFAULT 'info@apexcrypto.com',
    contact_phone TEXT DEFAULT '+1 (555) 123-4567',
    contact_address TEXT,
    social_facebook TEXT,
    social_twitter TEXT,
    social_linkedin TEXT,
    social_instagram TEXT,
    announcement_text TEXT,
    announcement_active BOOLEAN DEFAULT false,
    maintenance_mode BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read website settings" 
ON public.website_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify website settings" 
ON public.website_settings 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create SEO settings table
CREATE TABLE public.seo_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_path TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    keywords TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    og_type TEXT DEFAULT 'website',
    twitter_card TEXT DEFAULT 'summary_large_image',
    twitter_title TEXT,
    twitter_description TEXT,
    twitter_image TEXT,
    canonical_url TEXT,
    robots TEXT DEFAULT 'index, follow',
    schema_markup JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read SEO settings" 
ON public.seo_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify SEO settings" 
ON public.seo_settings 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create plan validity settings table
CREATE TABLE public.plan_validity_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_type TEXT NOT NULL,
    validity_period_months INTEGER NOT NULL DEFAULT 12,
    price_per_period DECIMAL,
    auto_renewal_enabled BOOLEAN DEFAULT false,
    grace_period_days INTEGER NOT NULL DEFAULT 7,
    renewal_reminder_days INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.plan_validity_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read plan validity settings" 
ON public.plan_validity_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can modify plan validity settings" 
ON public.plan_validity_settings 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Update triggers for updated_at columns
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

-- Add audit triggers to sensitive tables
CREATE TRIGGER audit_applications_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER audit_licenses_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.licenses
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER audit_settings_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.settings
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER audit_website_settings_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.website_settings
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

-- Create admin functions for managing the system
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE(id uuid, email text, role text, created_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Only allow admins to view admin users
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied. Admin role required.';
    END IF;

    RETURN QUERY
    SELECT 
        ur.user_id as id,
        au.email::TEXT as email,
        ur.role::TEXT as role,
        ur.created_at
    FROM public.user_roles ur
    JOIN auth.users au ON ur.user_id = au.id
    WHERE ur.role = 'admin'
    ORDER BY ur.created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_audit_logs(log_limit integer DEFAULT 100)
RETURNS TABLE(id uuid, user_id uuid, action text, table_name text, record_id uuid, old_data jsonb, new_data jsonb, created_at timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Only allow admins to view audit logs
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied. Admin role required.';
    END IF;

    RETURN QUERY
    SELECT 
        aal.id,
        aal.user_id,
        aal.action,
        aal.table_name,
        aal.record_id,
        aal.old_data,
        aal.new_data,
        aal.created_at
    FROM public.admin_audit_log aal
    ORDER BY aal.created_at DESC
    LIMIT log_limit;
END;
$$;

-- Insert default website settings
INSERT INTO public.website_settings (id) VALUES (gen_random_uuid());

-- Insert default plan validity settings
INSERT INTO public.plan_validity_settings (license_type, validity_period_months, grace_period_days, renewal_reminder_days)
VALUES 
    ('crypto', 12, 7, 30),
    ('fintech', 24, 14, 60),
    ('gambling', 12, 7, 30);

-- Fix existing RLS policies to be more restrictive
DROP POLICY IF EXISTS "Admin only access to licenses management" ON public.licenses;
CREATE POLICY "Only admins can manage licenses" 
ON public.licenses 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Allow public license verification" 
ON public.licenses 
FOR SELECT 
USING (true);

-- Update applications policies
DROP POLICY IF EXISTS "Only admins can read applications" ON public.applications;
DROP POLICY IF EXISTS "Only admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "Only admins can delete applications" ON public.applications;

CREATE POLICY "Only admins can read applications" 
ON public.applications 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Only admins can update applications" 
ON public.applications 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can delete applications" 
ON public.applications 
FOR DELETE 
USING (public.is_admin());

-- Update settings policies
DROP POLICY IF EXISTS "Only admins can modify settings" ON public.settings;
CREATE POLICY "Only admins can modify settings" 
ON public.settings 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());