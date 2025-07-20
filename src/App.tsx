import { Suspense, useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApplicationDialogProvider } from '@/components/ApplicationDialog';
import { AuthProvider } from '@/contexts/AuthContext';
import { SecureAuthProvider } from '@/contexts/SecureAuthContext';
import { unifiedDataManager } from '@/utils/unifiedDataManager';
import ErrorBoundary from '@/components/ErrorBoundary';
import Index from '@/pages/Index';
import AboutPage from '@/pages/AboutPage';
import LicenseTypesPage from '@/pages/LicenseTypesPage';
import ProcessPage from '@/pages/ProcessPage';
import PricingPage from '@/pages/PricingPage';
import CompliancePage from '@/pages/CompliancePage';
import ContactPage from '@/pages/ContactPage';
import SupportPage from '@/pages/SupportPage';
import FAQPage from '@/pages/FAQPage';
import ResourcesPage from '@/pages/ResourcesPage';
import NewsPage from '@/pages/NewsPage';
import TestimonialsPage from '@/pages/TestimonialsPage';
import VerifyPage from '@/pages/VerifyPage';
import Login from '@/pages/Login';
import Admin from '@/pages/Admin';
import SecureAdmin from '@/pages/SecureAdmin';
import Setup from '@/pages/Setup';
import NotFound from '@/pages/NotFound';
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
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      // Initialize the unified data manager
      console.log('[App] Initializing unified data manager...');
      
      // Verify settings are properly loaded
      const settings = unifiedDataManager.getSettings();
      console.log('[App] Settings loaded:', settings);
      
      setIsInitialized(true);
    } catch (error) {
      console.error('[App] Initialization failed:', error);
      // Try to reset and reinitialize
      try {
        unifiedDataManager.resetToDefaults();
        setIsInitialized(true);
      } catch (resetError) {
        console.error('[App] Reset failed:', resetError);
        setIsInitialized(true); // Still allow app to load
      }
    }
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing application...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <SecureAuthProvider>
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
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/resources" element={<ResourcesPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/testimonials" element={<TestimonialsPage />} />
                        <Route path="/verify" element={<VerifyPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/setup" element={<Setup />} />
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
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                  <Toaster />
                </ApplicationDialogProvider>
              </SecureAuthProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
