import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
// La home se importa de forma eager: es la ruta LCP crítica y evita un
// round-trip extra de chunk en la primera carga.
import Index from "./pages/Index";
// El resto de rutas se cargan bajo demanda (code-splitting) para que el
// bundle inicial no arrastre posts, casos ni los datos SEO pesados.
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const CallRedirect = lazy(() => import("./pages/CallRedirect"));
const Gracias = lazy(() => import("./pages/Gracias"));
const CallRedirectRH = lazy(() => import("./pages/CallRedirectRH"));
const CallRedirectAltaley = lazy(() => import("./pages/CallRedirectAltaley"));
const CallRedirectQuitaDeudas = lazy(() => import("./pages/CallRedirectQuitaDeudas"));
const CallRedirectLexitia = lazy(() => import("./pages/CallRedirectLexitia"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MoneyLanding = lazy(() => import("./pages/seo/MoneyLanding"));
const ClusterHub = lazy(() => import("./pages/seo/ClusterHub"));
const EntityPage = lazy(() => import("./pages/seo/EntityPage"));
const ComparativaPage = lazy(() => import("./pages/seo/ComparativaPage"));
const GuiaPage = lazy(() => import("./pages/seo/GuiaPage"));
const CasosExito = lazy(() => import("./pages/CasosExito"));
const CasoExitoPost = lazy(() => import("./pages/CasoExitoPost"));
const Servicios = lazy(() => import("./pages/seo/Servicios"));
const LocalizacionPage = lazy(() => import("./pages/seo/LocalizacionPage"));
const HerramientasHub = lazy(() => import("./pages/seo/HerramientasHub"));
const ToolPage = lazy(() => import("./pages/seo/ToolPage"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const AdminQueue = lazy(() => import("./pages/AdminQueue"));
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
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/admin" element={<AdminQueue />} />
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
          {/* Página antigua de casos: redirige a la única página de casos */}
          <Route path="/ley-segunda-oportunidad/casos" element={<Navigate to="/casos-de-exito" replace />} />
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
        </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
