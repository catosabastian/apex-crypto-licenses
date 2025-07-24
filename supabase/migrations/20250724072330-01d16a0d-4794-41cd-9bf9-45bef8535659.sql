-- Fix RLS policies to properly restrict to authenticated users only

-- Update applications table policies to require authenticated users
DROP POLICY IF EXISTS "Authenticated admins can delete applications" ON public.applications;
DROP POLICY IF EXISTS "Authenticated admins can read applications" ON public.applications;  
DROP POLICY IF EXISTS "Authenticated admins can update applications" ON public.applications;

CREATE POLICY "Only authenticated admins can delete applications" 
ON public.applications 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only authenticated admins can read applications" 
ON public.applications 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only authenticated admins can update applications" 
ON public.applications 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Update contacts table policies
DROP POLICY IF EXISTS "Authenticated admins can delete contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated admins can read contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated admins can update contacts" ON public.contacts;

CREATE POLICY "Only authenticated admins can delete contacts" 
ON public.contacts 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only authenticated admins can read contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only authenticated admins can update contacts" 
ON public.contacts 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Update content table policies
DROP POLICY IF EXISTS "Authenticated admins can delete content" ON public.content;
DROP POLICY IF EXISTS "Authenticated admins can update content" ON public.content;
DROP POLICY IF EXISTS "Authenticated admins can insert content" ON public.content;

CREATE POLICY "Only authenticated admins can delete content" 
ON public.content 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only authenticated admins can update content" 
ON public.content 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only authenticated admins can insert content" 
ON public.content 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin());

-- Update settings table policies
DROP POLICY IF EXISTS "Authenticated admins can delete settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated admins can update settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated admins can insert settings" ON public.settings;

CREATE POLICY "Only authenticated admins can delete settings" 
ON public.settings 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only authenticated admins can update settings" 
ON public.settings 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only authenticated admins can insert settings" 
ON public.settings 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin());

-- Update payment addresses policies
DROP POLICY IF EXISTS "Authenticated admins can delete payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Authenticated admins can update payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Authenticated admins can insert payment addresses" ON public.payment_addresses;

CREATE POLICY "Only authenticated admins can delete payment addresses" 
ON public.payment_addresses 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only authenticated admins can update payment addresses" 
ON public.payment_addresses 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Only authenticated admins can insert payment addresses" 
ON public.payment_addresses 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin());