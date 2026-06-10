import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CallRedirect from "./pages/CallRedirect";
import CallRedirectRH from "./pages/CallRedirectRH";
import CallRedirectAltaley from "./pages/CallRedirectAltaley";
import CallRedirectQuitaDeudas from "./pages/CallRedirectQuitaDeudas";
import CallRedirectLexitia from "./pages/CallRedirectLexitia";
import NotFound from "./pages/NotFound";
import MoneyLanding from "./pages/seo/MoneyLanding";
import ClusterHub from "./pages/seo/ClusterHub";
import EntityPage from "./pages/seo/EntityPage";
import CasosLSO from "./pages/seo/CasosLSO";
import Servicios from "./pages/seo/Servicios";
import { moneyPages } from "./data/seo/moneyPages";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
          <Route path="/call/smd" element={<CallRedirect />} />
          <Route path="/call/rh" element={<CallRedirectRH />} />
          <Route path="/call/altaley" element={<CallRedirectAltaley />} />
          <Route path="/call/quitadeudas" element={<CallRedirectQuitaDeudas />} />
          <Route path="/call/lexitia" element={<CallRedirectLexitia />} />
          {/* Hub de servicios */}
          <Route path="/servicios" element={<Servicios />} />
          {/* Money pages (paths explícitos, generados desde data) */}
          {moneyPages.map((p) => (
            <Route key={p.path} path={p.path} element={<MoneyLanding />} />
          ))}
          {/* Casos reales de la Ley de Segunda Oportunidad */}
          <Route path="/ley-segunda-oportunidad/casos" element={<CasosLSO />} />
          {/* Fichas de entidad: /<cluster>/<slug> */}
          <Route path="/:cluster/:slug" element={<EntityPage />} />
          {/* Índices de cluster/hub: /<cluster> */}
          <Route path="/:cluster" element={<ClusterHub />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
