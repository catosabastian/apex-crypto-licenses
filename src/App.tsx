import { Suspense, useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApplicationDialogProvider } from '@/components/ApplicationDialog';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import LicenseTypesPage from '@/pages/LicenseTypesPage';
import ProcessPage from '@/pages/ProcessPage';
import PricingPage from '@/pages/PricingPage';
import CompliancePage from '@/pages/CompliancePage';
// import ContactPage from '@/pages/ContactPage';
import SupportPage from '@/pages/SupportPage';
import FAQPage from '@/pages/FAQPage';
import ResourcesPage from '@/pages/ResourcesPage';
import NewsPage from '@/pages/NewsPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import VerifyPage from '@/pages/VerifyPage';
import AuthPage from '@/pages/AuthPage';
import Admin from '@/pages/Admin';
import Setup from '@/pages/Setup';
import NotFound from '@/pages/NotFound';
import CryptoServicesPage from '@/pages/services/CryptoServicesPage';
import FinTechServicesPage from '@/pages/services/FinTechServicesPage';
import GamblingServicesPage from '@/pages/services/GamblingServicesPage';
import CorporateServicesPage from '@/pages/services/CorporateServicesPage';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
        <SupabaseAuthProvider>
        <ApplicationDialogProvider>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    }>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/license-types" element={<LicenseTypesPage />} />
                        <Route path="/process" element={<ProcessPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/compliance" element={<CompliancePage />} />
                        <Route path="/contact" element={<SupportPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/resources" element={<ResourcesPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/testimonials" element={<TestimonialsPage />} />
                        <Route path="/verify" element={<VerifyPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/setup" element={<Setup />} />
                        <Route path="/services/crypto" element={<CryptoServicesPage />} />
                        <Route path="/services/fintech" element={<FinTechServicesPage />} />
                        <Route path="/services/gambling" element={<GamblingServicesPage />} />
                        <Route path="/services/corporate" element={<CorporateServicesPage />} />
                        <Route 
                          path="/admin" 
                          element={
                            <ProtectedRoute>
                              <Admin />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                  <Toaster />
                </ApplicationDialogProvider>
              </SupabaseAuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
