-- Fix application submission - allow public to submit applications
-- The previous migration broke public application submission

-- Drop the restrictive policy for applications SELECT
DROP POLICY IF EXISTS "Only authenticated admins can read applications" ON public.applications;

-- Recreate proper policies for applications
-- Public can submit applications (INSERT remains public)
-- Only admins can read, update, delete applications
CREATE POLICY "Only authenticated admins can read applications" 
ON public.applications 
FOR SELECT 
TO authenticated
USING (public.is_admin());

-- Ensure payment addresses remain publicly readable for the application form
-- No changes needed as the policy "Public can read payment addresses" should still exist