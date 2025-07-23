
-- First, let's create the proper admin authentication system
-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create the is_admin function that actually works
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
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

-- Create a function to check if any admin users exist
CREATE OR REPLACE FUNCTION public.has_admin_users()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE role = 'admin'
  );
$$;

-- Create function to create first admin user (for setup)
CREATE OR REPLACE FUNCTION public.create_first_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  INSERT INTO public.user_roles (user_id, role)
  SELECT auth.uid(), 'admin'
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  )
  AND auth.uid() IS NOT NULL;
  
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

-- Update RLS policies for user_roles
DROP POLICY IF EXISTS "Only admins can manage user roles" ON public.user_roles;
CREATE POLICY "Only admins can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix settings table RLS policies
DROP POLICY IF EXISTS "Public can read settings" ON public.settings;
DROP POLICY IF EXISTS "Only admins can modify settings" ON public.settings;

CREATE POLICY "Public can read settings" 
ON public.settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can modify settings" 
ON public.settings 
FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update settings" 
ON public.settings 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete settings" 
ON public.settings 
FOR DELETE 
USING (public.is_admin());

-- Fix content table RLS policies
DROP POLICY IF EXISTS "Public can read content" ON public.content;
DROP POLICY IF EXISTS "Only admins can modify content" ON public.content;

CREATE POLICY "Public can read content" 
ON public.content 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can modify content" 
ON public.content 
FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update content" 
ON public.content 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete content" 
ON public.content 
FOR DELETE 
USING (public.is_admin());

-- Fix applications table RLS policies
DROP POLICY IF EXISTS "Only admins can read applications" ON public.applications;
DROP POLICY IF EXISTS "Only admins can update applications" ON public.applications;
DROP POLICY IF EXISTS "Only admins can delete applications" ON public.applications;

CREATE POLICY "Admins can read applications" 
ON public.applications 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can update applications" 
ON public.applications 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete applications" 
ON public.applications 
FOR DELETE 
USING (public.is_admin());

-- Fix contacts table RLS policies
DROP POLICY IF EXISTS "Only admins can read contacts" ON public.contacts;
DROP POLICY IF EXISTS "Only admins can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Only admins can delete contacts" ON public.contacts;

CREATE POLICY "Admins can read contacts" 
ON public.contacts 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Admins can update contacts" 
ON public.contacts 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete contacts" 
ON public.contacts 
FOR DELETE 
USING (public.is_admin());

-- Fix licenses table RLS policies
DROP POLICY IF EXISTS "Admin only access to licenses management" ON public.licenses;

CREATE POLICY "Admins can manage licenses" 
ON public.licenses 
FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Fix payment_addresses table RLS policies
DROP POLICY IF EXISTS "Only admins can modify payment addresses" ON public.payment_addresses;

CREATE POLICY "Admins can modify payment addresses" 
ON public.payment_addresses 
FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update payment addresses" 
ON public.payment_addresses 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete payment addresses" 
ON public.payment_addresses 
FOR DELETE 
USING (public.is_admin());

-- Insert some demo licenses for verification testing
INSERT INTO public.licenses (license_id, holder_name, license_type, issue_date, expiry_date, status, platforms) VALUES
('CL-2025-0001-T1', 'John Doe', 'Category 1 - Basic Trader', '2024-01-01', '2025-12-31', 'active', 'Binance, Coinbase, Kraken'),
('CL-2025-0002-T2', 'Jane Smith', 'Category 2 - Standard Trader', '2024-02-01', '2025-12-31', 'active', 'Binance, Coinbase, Kraken, KuCoin'),
('CL-2025-0003-T3', 'APEX Trading Solutions Ltd.', 'Category 3 - Advanced Trader', '2024-03-01', '2025-12-31', 'active', 'Binance, Coinbase Pro, Kraken, KuCoin'),
('CL-2024-8294-T3', 'Thomas A. Anderson', 'Category 3 - Advanced', '2024-01-15', '2025-01-15', 'active', 'Binance, Kraken, Coinbase, KuCoin')
ON CONFLICT (license_id) DO NOTHING;

-- Create default admin user during setup (this will be handled by the application)
-- We'll create a setup function that can be called when needed
CREATE OR REPLACE FUNCTION public.setup_admin_user(admin_email TEXT, admin_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This is a placeholder function for setup
  -- In practice, admin users should be created through the auth system
  -- and then assigned admin role via the application
  RETURN true;
END;
$$;

-- Update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Add triggers for updated_at columns
DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.user_roles;
CREATE TRIGGER update_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON public.settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON public.settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_content_updated_at ON public.content;
CREATE TRIGGER update_content_updated_at
    BEFORE UPDATE ON public.content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_applications_updated_at ON public.applications;
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON public.contacts;
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_licenses_updated_at ON public.licenses;
CREATE TRIGGER update_licenses_updated_at
    BEFORE UPDATE ON public.licenses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_payment_addresses_updated_at ON public.payment_addresses;
CREATE TRIGGER update_payment_addresses_updated_at
    BEFORE UPDATE ON public.payment_addresses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
