-- Create proper admin setup function
CREATE OR REPLACE FUNCTION public.setup_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow this if no admin exists
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN false;
  END IF;
  
  -- Create admin role for current user
  IF auth.uid() IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (auth.uid(), 'admin');
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Update RLS policies to require authentication for admin functions
-- Applications table - require authentication for admin operations
DROP POLICY IF EXISTS "Admins can delete applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can read applications" ON public.applications;
DROP POLICY IF EXISTS "Admins can update applications" ON public.applications;

CREATE POLICY "Authenticated admins can delete applications" 
ON public.applications 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Authenticated admins can read applications" 
ON public.applications 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Authenticated admins can update applications" 
ON public.applications 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Contacts table - require authentication for admin operations
DROP POLICY IF EXISTS "Admins can delete contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can read contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can update contacts" ON public.contacts;

CREATE POLICY "Authenticated admins can delete contacts" 
ON public.contacts 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Authenticated admins can read contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Authenticated admins can update contacts" 
ON public.contacts 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Content table - require authentication for admin operations  
DROP POLICY IF EXISTS "Admins can delete content" ON public.content;
DROP POLICY IF EXISTS "Admins can update content" ON public.content;
DROP POLICY IF EXISTS "Admins can modify content" ON public.content;

CREATE POLICY "Authenticated admins can delete content" 
ON public.content 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Authenticated admins can update content" 
ON public.content 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated admins can insert content" 
ON public.content 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin());

-- Settings table - require authentication for admin operations
DROP POLICY IF EXISTS "Admins can delete settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can update settings" ON public.settings;
DROP POLICY IF EXISTS "Admins can modify settings" ON public.settings;

CREATE POLICY "Authenticated admins can delete settings" 
ON public.settings 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Authenticated admins can update settings" 
ON public.settings 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated admins can insert settings" 
ON public.settings 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin());

-- Payment addresses - require authentication for admin operations
DROP POLICY IF EXISTS "Admins can delete payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Admins can update payment addresses" ON public.payment_addresses;
DROP POLICY IF EXISTS "Admins can modify payment addresses" ON public.payment_addresses;

CREATE POLICY "Authenticated admins can delete payment addresses" 
ON public.payment_addresses 
FOR DELETE 
TO authenticated
USING (public.is_admin());

CREATE POLICY "Authenticated admins can update payment addresses" 
ON public.payment_addresses 
FOR UPDATE 
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated admins can insert payment addresses" 
ON public.payment_addresses 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin());

-- Initialize default settings and content if not exists
INSERT INTO public.settings (key, value, category, description) VALUES
  ('category1Price', '"10,000 USDT"', 'pricing', 'Category 1 license price'),
  ('category2Price', '"25,000 USDT"', 'pricing', 'Category 2 license price'),
  ('category3Price', '"50,000 USDT"', 'pricing', 'Category 3 license price'),
  ('category4Price', '"100,000 USDT"', 'pricing', 'Category 4 license price'),
  ('category5Price', '"250,000 USDT"', 'pricing', 'Category 5 license price'),
  ('category6Price', '"500,000 USDT"', 'pricing', 'Category 6 license price'),
  ('category1Available', 'true', 'availability', 'Category 1 availability'),
  ('category2Available', 'true', 'availability', 'Category 2 availability'),
  ('category3Available', 'true', 'availability', 'Category 3 availability'),
  ('category4Available', 'true', 'availability', 'Category 4 availability'),
  ('category5Available', 'true', 'availability', 'Category 5 availability'),
  ('category6Available', 'true', 'availability', 'Category 6 availability')
ON CONFLICT (key) DO NOTHING;

-- Initialize payment addresses
INSERT INTO public.payment_addresses (cryptocurrency, address, is_active) VALUES
  ('BTC', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', true),
  ('ETH', '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0', true),
  ('USDT_TRON', 'TG3XXyExBkPp9nzdajDGFahC9nyKERJpUN', true),
  ('USDT_ETH', '0x742d35Cc6663C65C926d75d60e3B3d97c8a0e0e0', true),
  ('XRP', 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH', true)
ON CONFLICT (cryptocurrency) DO NOTHING;