
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApplicationDialogProvider } from "@/components/ApplicationDialog";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ApplicationForm from "./components/ApplicationForm";
import CryptoLicensingPage from "./pages/CryptoLicensingPage";
import FintechPage from "./pages/FintechPage";
import GamblingPage from "./pages/GamblingPage";
import VerifyPage from "./pages/VerifyPage";
import SecureAdmin from "./pages/SecureAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ApplicationDialogProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/secure-admin" 
                element={
                  <ProtectedRoute>
                    <SecureAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route path="/apply" element={<ApplicationForm />} />
              <Route path="/crypto-licensing" element={<CryptoLicensingPage />} />
              <Route path="/fintech" element={<FintechPage />} />
              <Route path="/gambling" element={<GamblingPage />} />
              <Route path="/verify" element={<VerifyPage />} />
            </Routes>
          </BrowserRouter>
        </ApplicationDialogProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
