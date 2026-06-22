import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/seo/Seo";
import { Button } from "@/components/ui/button";
import type { TriageResult } from "@/lib/seo/triage";
import BenefitSimulator from "@/components/BenefitSimulator";

type GraciasState = {
  result?: TriageResult;
  name?: string;
  debtAmount?: number;
};

const Gracias = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as GraciasState;
  const { result, name, debtAmount } = state;

  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Gracias — Hemos recibido tu caso"
        description="Gracias por contactar con Calma. Nuestro equipo legal revisará tu caso y te llamará en menos de 24h."
        canonical="/gracias"
        robots="noindex,nofollow"
      />
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-secondary/5 to-accent/5 pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-6 md:py-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-surface-elevated border border-border rounded-3xl shadow-large p-5 md:p-8"
          >
            <div className="flex items-center gap-2 text-accent-deep mb-3">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Caso recibido</span>
            </div>

            <h1 className="font-poppins text-2xl md:text-3xl font-semibold text-foreground mb-2">
              {name ? `Gracias, ${name.split(" ")[0]}` : "¡Gracias!"}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Te llamamos en menos de 24h para confirmar tu mejor opción, sin compromiso.
            </p>

            {result && (
              <div className="rounded-2xl border border-border bg-background p-4 mb-5">
                <p className="text-[11px] font-medium uppercase tracking-wider text-accent-deep mb-1">
                  Tu diagnóstico orientativo
                </p>
                <h2 className="font-poppins text-xl font-semibold text-foreground">
                  {result.title}
                </h2>
              </div>
            )}

            {result && typeof debtAmount === "number" && (
              <BenefitSimulator solution={result.solution} debtAmount={debtAmount} />
            )}

            <p className="text-[11px] text-muted-foreground mb-6">
              {result
                ? "Orientación automática. El diagnóstico definitivo lo realiza nuestro equipo legal."
                : "Si has llegado aquí directamente, vuelve al inicio para analizar tu deuda."}
            </p>

            <Button asChild className="h-11 rounded-xl">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gracias;