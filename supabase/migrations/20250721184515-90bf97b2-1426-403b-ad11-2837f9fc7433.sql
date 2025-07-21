
-- Emergency Database Security Fix
-- This migration will secure the database and create proper admin authentication

-- First, check if user_roles table exists and create it if needed
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles safely
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(public.has_role(auth.uid(), 'admin'), false)
$$;

-- EMERGENCY: Replace all dangerous public policies with secure ones

-- Applications table - SECURE ACCESS
DROP POLICY IF EXISTS "Allow public application submission" ON public.applications;
DROP POLICY IF EXISTS "Allow public read of applications" ON public.applications;
DROP POLICY IF EXISTS "Allow public update of applications" ON public.applications;

CREATE POLICY "Public can submit applications" 
ON public.applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can manage applications" 
ON public.applications FOR SELECT, UPDATE, DELETE 
USING (public.is_admin());

-- Contacts table - SECURE ACCESS
DROP POLICY IF EXISTS "Allow full access to contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow public contact submission" ON public.contacts;

CREATE POLICY "Public can submit contacts" 
ON public.contacts FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can manage contacts" 
ON public.contacts FOR SELECT, UPDATE, DELETE 
USING (public.is_admin());

-- Licenses table - SECURE ACCESS
DROP POLICY IF EXISTS "Admin only access to licenses management" ON public.licenses;
DROP POLICY IF EXISTS "Allow public license verification" ON public.licenses;

CREATE POLICY "Public can verify licenses" 
ON public.licenses FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage licenses" 
ON public.licenses FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- Content table - SECURE ACCESS
DROP POLICY IF EXISTS "Allow full access to content" ON public.content;
DROP POLICY IF EXISTS "Allow public read of content" ON public.content;

CREATE POLICY "Public can read content" 
ON public.content FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage content" 
ON public.content FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- Settings table - SECURE ACCESS
DROP POLICY IF EXISTS "Allow full access to settings" ON public.settings;
DROP POLICY IF EXISTS "Allow public read of settings" ON public.settings;

CREATE POLICY "Public can read settings" 
ON public.settings FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage settings" 
ON public.settings FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- Payment addresses table - SECURE ACCESS
DROP POLICY IF EXISTS "Allow full access to payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Allow public read of payment addresses" ON public.payment_addresses;

CREATE POLICY "Public can read payment addresses" 
ON public.payment_addresses FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage payment addresses" 
ON public.payment_addresses FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- User roles table policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admin can manage all roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all roles" 
ON public.user_roles FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- Create audit logging table for admin actions
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view audit logs" 
ON public.admin_audit_log FOR SELECT 
USING (public.is_admin());

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_licenses_license_id ON public.licenses(license_id);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);

-- Emergency admin user creation function (use carefully)
CREATE OR REPLACE FUNCTION public.create_admin_user(_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    _user_id UUID;
BEGIN
    -- Find user by email
    SELECT id INTO _user_id FROM auth.users WHERE email = _email;
    
    IF _user_id IS NULL THEN
        RETURN 'User not found with email: ' || _email;
    END IF;
    
    -- Insert admin role if not exists
    INSERT INTO public.user_roles (user_id, role)
    VALUES (_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RETURN 'Admin role assigned to user: ' || _email;
END;
$$;
