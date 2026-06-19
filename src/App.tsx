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
import Gracias from "./pages/Gracias";
import CallRedirectRH from "./pages/CallRedirectRH";
import CallRedirectAltaley from "./pages/CallRedirectAltaley";
import CallRedirectQuitaDeudas from "./pages/CallRedirectQuitaDeudas";
import CallRedirectLexitia from "./pages/CallRedirectLexitia";
import NotFound from "./pages/NotFound";
import MoneyLanding from "./pages/seo/MoneyLanding";
import ClusterHub from "./pages/seo/ClusterHub";
import EntityPage from "./pages/seo/EntityPage";
import ComparativaPage from "./pages/seo/ComparativaPage";
import GuiaPage from "./pages/seo/GuiaPage";
import CasosLSO from "./pages/seo/CasosLSO";
import CasosExito from "./pages/CasosExito";
import CasoExitoPost from "./pages/CasoExitoPost";
import Servicios from "./pages/seo/Servicios";
import LocalizacionPage from "./pages/seo/LocalizacionPage";
import HerramientasHub from "./pages/seo/HerramientasHub";
import ToolPage from "./pages/seo/ToolPage";
import ScrollToTop from "./components/ScrollToTop";
import { moneyPages } from "./data/seo/moneyPages";
import { comparativas } from "./data/seo/comparativas";
import { guias } from "./data/seo/guias";
import { tools } from "./data/seo/tools";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/casos-de-exito" element={<CasosExito />} />
          <Route path="/casos-de-exito/:slug" element={<CasoExitoPost />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos-y-condiciones" element={<TermsAndConditions />} />
          <Route path="/gracias" element={<Gracias />} />
          <Route path="/call/smd" element={<CallRedirect />} />
          <Route path="/call/rh" element={<CallRedirectRH />} />
          <Route path="/call/altaley" element={<CallRedirectAltaley />} />
          <Route path="/call/quitadeudas" element={<CallRedirectQuitaDeudas />} />
          <Route path="/call/lexitia" element={<CallRedirectLexitia />} />
          {/* Hub de servicios */}
          <Route path="/servicios" element={<Servicios />} />
          {/* Herramientas: hub + una página por herramienta */}
          <Route path="/herramientas" element={<HerramientasHub />} />
          {tools.map((t) => (
            <Route key={t.path} path={t.path} element={<ToolPage />} />
          ))}
          {/* Money pages (paths explícitos, generados desde data) */}
          {moneyPages.map((p) => (
            <Route key={p.path} path={p.path} element={<MoneyLanding />} />
          ))}
          {/* Casos reales de la Ley de Segunda Oportunidad */}
          <Route path="/ley-segunda-oportunidad/casos" element={<CasosLSO />} />
          {/* Cluster local: abogados LSO por ciudad (antes del catch-all de entidad) */}
          <Route
            path="/abogados-ley-segunda-oportunidad/:ciudad"
            element={<LocalizacionPage />}
          />
          {/* Guías de educación financiera: /guias/<slug> */}
          {guias.map((g) => (
            <Route key={g.path} path={g.path} element={<GuiaPage />} />
          ))}
          {/* Comparativas: /<cluster>/<slug> (antes del catch-all de entidad) */}
          {comparativas.map((c) => (
            <Route key={c.path} path={c.path} element={<ComparativaPage />} />
          ))}
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
