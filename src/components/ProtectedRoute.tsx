
import { Navigate, useLocation } from "react-router-dom";
import { useSecureAuth } from "@/contexts/SecureAuthContext";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSecure?: boolean;
}

const ProtectedRoute = ({ children, requireSecure = false }: ProtectedRouteProps) => {
  const { isAuthenticated: isSecureAuthenticated } = useSecureAuth();
  const { isAuthenticated: isRegularAuthenticated } = useAuth();
  const location = useLocation();

  // Use secure auth for secure admin routes, regular auth for standard admin
  const isAuthenticated = requireSecure ? isSecureAuthenticated : isRegularAuthenticated;

  if (!isAuthenticated) {
    // Redirect to appropriate login page
    const loginPath = requireSecure ? "/login" : "/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
