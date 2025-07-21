
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, AlertCircle, User, Key, Activity, Loader2 } from "lucide-react";
import { useSecureAuth } from "@/contexts/SecureAuthContext";
import { ConnectionStatus } from "@/components/ConnectionStatus";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, login, connectionStatus, loading, error: authError } = useSecureAuth();
  const location = useLocation();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }

    // Rate limiting for security
    if (loginAttempts >= 3) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      const success = await login(username, password);
      
      if (!success) {
        setLoginAttempts(prev => prev + 1);
        
        // Reset attempts after 5 minutes
        setTimeout(() => {
          setLoginAttempts(0);
        }, 300000);
      }
    } catch (err) {
      console.error('Login submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDisabled = loginAttempts >= 3 || connectionStatus === 'disconnected' || loading || isSubmitting;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center items-center gap-4 mb-2">
            <ShieldCheck className="h-10 w-10 text-primary" />
            <ConnectionStatus />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Secure Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the secure admin dashboard
          </CardDescription>
          {connectionStatus !== 'connected' && (
            <Alert className="mt-4">
              <Activity className="h-4 w-4" />
              <AlertDescription>
                Connection status: {connectionStatus}. Some features may be limited.
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {authError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            {loginAttempts > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Login attempts: {loginAttempts}/3. Account will be temporarily locked after 3 failed attempts.
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="username" 
                  placeholder="Enter username"
                  className="pl-9" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  disabled={isDisabled}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter password"
                  className="pl-9" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  disabled={isDisabled}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isDisabled}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : connectionStatus === 'disconnected' ? (
                'Connection Required'
              ) : (
                'Login'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
