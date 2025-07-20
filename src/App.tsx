
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SecureAuthProvider } from "@/contexts/SecureAuthContext";
import { ApplicationDialogProvider } from "@/components/ApplicationDialog";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SecureAdmin from "./pages/SecureAdmin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SupportPage from "./pages/SupportPage";
import AboutPage from "./pages/AboutPage";
import LicenseTypesPage from "./pages/LicenseTypesPage";
import ProcessPage from "./pages/ProcessPage";
import VerifyPage from "./pages/VerifyPage";
import FAQPage from "./pages/FAQPage";
import CompliancePage from "./pages/CompliancePage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ResourcesPage from "./pages/ResourcesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SecureAuthProvider>
        <ApplicationDialogProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/licenses" element={<LicenseTypesPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <SecureAdmin />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ApplicationDialogProvider>
      </SecureAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
