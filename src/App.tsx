
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { SecureAuthProvider } from "@/contexts/SecureAuthContext";
import SupabaseProtectedRoute from "@/components/SupabaseProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import SecureAdmin from "./pages/SecureAdmin";
import Setup from "./pages/Setup";
import Login from "./pages/Login";
import AboutPage from "./pages/AboutPage";
import LicenseTypesPage from "./pages/LicenseTypesPage";
import ProcessPage from "./pages/ProcessPage";
import PricingPage from "./pages/PricingPage";
import VerifyPage from "./pages/VerifyPage";
import ContactPage from "./pages/ContactPage";
import SupportPage from "./pages/SupportPage";
import FAQPage from "./pages/FAQPage";
import NewsPage from "./pages/NewsPage";
import ResourcesPage from "./pages/ResourcesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import CompliancePage from "./pages/CompliancePage";
import CryptoLicensingPage from "./pages/CryptoLicensingPage";
import FintechPage from "./pages/FintechPage";
import GamblingPage from "./pages/GamblingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <SecureAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ErrorBoundary>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/license-types" element={<LicenseTypesPage />} />
                  <Route path="/process" element={<ProcessPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/verify" element={<VerifyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/testimonials" element={<TestimonialsPage />} />
                  <Route path="/compliance" element={<CompliancePage />} />
                  <Route path="/crypto-licensing" element={<CryptoLicensingPage />} />
                  <Route path="/fintech" element={<FintechPage />} />
                  <Route path="/gambling" element={<GamblingPage />} />
                  
                  {/* Authentication Routes */}
                  <Route path="/setup" element={<Setup />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Admin Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <SupabaseProtectedRoute requireAdmin={true}>
                        <Admin />
                      </SupabaseProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/secure-admin" 
                    element={
                      <SupabaseProtectedRoute requireAdmin={true}>
                        <SecureAdmin />
                      </SupabaseProtectedRoute>
                    } 
                  />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </SecureAuthProvider>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
