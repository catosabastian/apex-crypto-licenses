-- Update the admin user password
-- First we need to get the user ID
DO $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Get the admin user ID
    SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@apex.com';
    
    IF admin_user_id IS NOT NULL THEN
        -- Update the password hash for apex2025
        UPDATE auth.users 
        SET encrypted_password = crypt('apex2025', gen_salt('bf'))
        WHERE id = admin_user_id;
        
        RAISE NOTICE 'Password updated for admin@apex.com';
    ELSE
        RAISE NOTICE 'Admin user not found';
    END IF;
END $$;