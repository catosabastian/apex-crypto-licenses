import { Navigate, useLocation } from "react-router-dom";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { Loader2 } from "lucide-react";

interface SupabaseProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const SupabaseProtectedRoute = ({ children, requireAdmin = true }: SupabaseProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useSupabaseAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to setup page (which has its own auth)
    return <Navigate to="/setup" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to setup page to become admin
    return <Navigate to="/setup" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default SupabaseProtectedRoute;