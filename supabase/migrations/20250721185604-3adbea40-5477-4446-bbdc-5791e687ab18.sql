
-- Phase 1: Database Security Fixes
-- Remove anonymous access and ensure admin-only access

-- Update applications table policies to require authentication
DROP POLICY IF EXISTS "Allow public application submission" ON public.applications;
DROP POLICY IF EXISTS "Allow public read of applications" ON public.applications;
DROP POLICY IF EXISTS "Allow public update of applications" ON public.applications;

-- Create secure application policies
CREATE POLICY "Allow authenticated application submission" 
ON public.applications 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Admin only read applications" 
ON public.applications 
FOR SELECT 
TO authenticated 
USING (public.is_admin());

CREATE POLICY "Admin only update applications" 
ON public.applications 
FOR UPDATE 
TO authenticated 
USING (public.is_admin());

CREATE POLICY "Admin only delete applications" 
ON public.applications 
FOR DELETE 
TO authenticated 
USING (public.is_admin());

-- Update contacts table policies
DROP POLICY IF EXISTS "Allow full access to contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow public contact submission" ON public.contacts;

CREATE POLICY "Allow authenticated contact submission" 
ON public.contacts 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Admin only manage contacts" 
ON public.contacts 
FOR ALL 
TO authenticated 
USING (public.is_admin());

-- Update content table policies
DROP POLICY IF EXISTS "Allow full access to content" ON public.content;
DROP POLICY IF EXISTS "Allow public read of content" ON public.content;

CREATE POLICY "Public read content" 
ON public.content 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Admin only manage content" 
ON public.content 
FOR ALL 
TO authenticated 
USING (public.is_admin());

-- Update licenses table policies
DROP POLICY IF EXISTS "Admin only access to licenses management" ON public.licenses;
DROP POLICY IF EXISTS "Allow public license verification" ON public.licenses;

CREATE POLICY "Public license verification" 
ON public.licenses 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Admin only manage licenses" 
ON public.licenses 
FOR ALL 
TO authenticated 
USING (public.is_admin());

-- Update payment_addresses table policies
DROP POLICY IF EXISTS "Allow full access to payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Allow public read of payment addresses" ON public.payment_addresses;

CREATE POLICY "Public read payment addresses" 
ON public.payment_addresses 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Admin only manage payment addresses" 
ON public.payment_addresses 
FOR ALL 
TO authenticated 
USING (public.is_admin());

-- Update settings table policies
DROP POLICY IF EXISTS "Allow full access to settings" ON public.settings;
DROP POLICY IF EXISTS "Allow public read of settings" ON public.settings;

CREATE POLICY "Public read settings" 
ON public.settings 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Admin only manage settings" 
ON public.settings 
FOR ALL 
TO authenticated 
USING (public.is_admin());

-- Create simple admin promotion function
CREATE OR REPLACE FUNCTION public.promote_to_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_id uuid;
    admin_exists boolean;
BEGIN
    -- Get current user
    current_user_id := auth.uid();
    
    IF current_user_id IS NULL THEN
        RETURN false;
    END IF;
    
    -- Check if any admin exists
    SELECT EXISTS(
        SELECT 1 FROM public.user_roles WHERE role = 'admin'
    ) INTO admin_exists;
    
    -- If no admin exists, make current user admin
    IF NOT admin_exists THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (current_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
        RETURN true;
    END IF;
    
    -- If admin exists, check if current user is already admin
    RETURN EXISTS(
        SELECT 1 FROM public.user_roles 
        WHERE user_id = current_user_id AND role = 'admin'
    );
END;
$$;
