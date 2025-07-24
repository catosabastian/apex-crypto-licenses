import { Suspense, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SimpleAuthProvider } from '@/contexts/SimpleAuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import VerifyPage from '@/pages/VerifyPage';
import AdminLogin from '@/pages/AdminLogin';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/NotFound';
import CryptoServicesPage from '@/pages/services/CryptoServicesPage';
import FinTechServicesPage from '@/pages/services/FinTechServicesPage';
import GamblingServicesPage from '@/pages/services/GamblingServicesPage';
import CorporateServicesPage from '@/pages/services/CorporateServicesPage';
import ApplicationPage from '@/pages/ApplicationPage';
import RegulationsPage from '@/pages/RegulationsPage';
import LicensingSolutions from '@/pages/LicensingSolutions';
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
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
          <SimpleAuthProvider>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    }>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/regulations" element={<RegulationsPage />} />
                        <Route path="/apply" element={<ApplicationPage />} />
                        <Route path="/verify" element={<VerifyPage />} />
                        <Route path="/licensing-solutions" element={<LicensingSolutions />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
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
              </SimpleAuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
