
-- First, let's create a user_roles table for proper admin access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user', 'moderator');

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
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
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Update RLS policies to require authentication and admin access for sensitive operations

-- Applications table - require admin for management, allow public for submissions
DROP POLICY IF EXISTS "Allow public application submission" ON public.applications;
DROP POLICY IF EXISTS "Allow public read of applications" ON public.applications;
DROP POLICY IF EXISTS "Allow public update of applications" ON public.applications;

CREATE POLICY "Allow public application submission" 
ON public.applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can view all applications" 
ON public.applications FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admin can update applications" 
ON public.applications FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admin can delete applications" 
ON public.applications FOR DELETE 
USING (public.is_admin());

-- Licenses table - admin only for management, public for verification
DROP POLICY IF EXISTS "Admin only access to licenses management" ON public.licenses;
DROP POLICY IF EXISTS "Allow public license verification" ON public.licenses;

CREATE POLICY "Admin can manage licenses" 
ON public.licenses FOR ALL 
USING (public.is_admin());

CREATE POLICY "Public can verify licenses" 
ON public.licenses FOR SELECT 
USING (true);

-- Contacts table - admin only for management, public for submissions
DROP POLICY IF EXISTS "Allow full access to contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow public contact submission" ON public.contacts;

CREATE POLICY "Allow public contact submission" 
ON public.contacts FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can manage contacts" 
ON public.contacts FOR SELECT, UPDATE, DELETE 
USING (public.is_admin());

-- Content table - admin only for management, public for reading
DROP POLICY IF EXISTS "Allow full access to content" ON public.content;
DROP POLICY IF EXISTS "Allow public read of content" ON public.content;

CREATE POLICY "Public can read content" 
ON public.content FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage content" 
ON public.content FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- Settings table - admin only for management, public for reading
DROP POLICY IF EXISTS "Allow full access to settings" ON public.settings;
DROP POLICY IF EXISTS "Allow public read of settings" ON public.settings;

CREATE POLICY "Public can read settings" 
ON public.settings FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage settings" 
ON public.settings FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- Payment addresses table - admin only for management, public for reading
DROP POLICY IF EXISTS "Allow full access to payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Allow public read of payment addresses" ON public.payment_addresses;

CREATE POLICY "Public can read payment addresses" 
ON public.payment_addresses FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage payment addresses" 
ON public.payment_addresses FOR INSERT, UPDATE, DELETE 
USING (public.is_admin());

-- Add RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- Add audit logging table
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view audit logs" 
ON public.admin_audit_log FOR SELECT 
USING (public.is_admin());

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at);
CREATE INDEX IF NOT EXISTS idx_licenses_license_id ON public.licenses(license_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON public.licenses(status);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.admin_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.admin_audit_log(created_at);

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
    action_type TEXT,
    table_name TEXT,
    record_id UUID DEFAULT NULL,
    old_data JSONB DEFAULT NULL,
    new_data JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.admin_audit_log (
        user_id, action, table_name, record_id, old_data, new_data
    ) VALUES (
        auth.uid(), action_type, table_name, record_id, old_data, new_data
    );
END;
$$;

-- Insert a default admin user role (you'll need to update this with actual user ID)
-- This is commented out - you'll need to add admin users manually after they sign up
-- INSERT INTO public.user_roles (user_id, role) VALUES ('your-admin-user-id', 'admin');
