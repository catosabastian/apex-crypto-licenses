-- Fix application form submission by updating RLS policy to allow public submissions
-- Current policy prevents public users from submitting applications

-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "Public can submit applications" ON applications;

-- Create new policy that allows public INSERT while maintaining admin-only access for other operations
CREATE POLICY "Allow public application submissions" 
ON applications 
FOR INSERT 
WITH CHECK (true);

-- Ensure the existing policies for admin access are maintained
-- The SELECT, UPDATE, DELETE policies should remain admin-only as they currently are