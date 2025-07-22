
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import ApplicationForm from "./components/ApplicationForm";
import CryptoLicensingPage from "./pages/CryptoLicensingPage";
import FintechPage from "./pages/FintechPage";
import GamblingPage from "./pages/GamblingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/crypto-licensing" element={<CryptoLicensingPage />} />
          <Route path="/fintech" element={<FintechPage />} />
          <Route path="/gambling" element={<GamblingPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
