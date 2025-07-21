
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated: isAdminAuthenticated, isAdmin, isLoading: adminLoading } = useAdminAuth();
  const { isAuthenticated: isRegularAuthenticated } = useAuth();
  const location = useLocation();

  // For admin routes, require both authentication and admin role
  if (requireAdmin) {
    if (adminLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }

    if (!isAdminAuthenticated || !isAdmin) {
      return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }
  } else {
    // For regular routes, use regular authentication
    if (!isRegularAuthenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
