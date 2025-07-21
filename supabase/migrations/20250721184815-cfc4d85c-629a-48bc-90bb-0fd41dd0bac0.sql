-- Add helper RPC functions for admin operations

-- Function to get admin users with their details
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
    id UUID,
    email TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE
)
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

-- Function to get audit logs
CREATE OR REPLACE FUNCTION public.get_audit_logs(log_limit INTEGER DEFAULT 100)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    action TEXT,
    table_name TEXT,
    record_id UUID,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE
)
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