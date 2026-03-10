import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CallRedirect from "./pages/CallRedirect";
import CallRedirectRH from "./pages/CallRedirectRH";
import CallRedirectAltaley from "./pages/CallRedirectAltaley";
import CallRedirectQuitaDeudas from "./pages/CallRedirectQuitaDeudas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
          <Route path="/call/smd" element={<CallRedirect />} />
          <Route path="/call/rh" element={<CallRedirectRH />} />
          <Route path="/call/altaley" element={<CallRedirectAltaley />} />
          <Route path="/call/quitadeudas" element={<CallRedirectQuitaDeudas />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
