import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
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

      <main className="flex-1 bg-gradient-to-br from-background via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-surface-elevated border border-border rounded-3xl shadow-large p-6 md:p-10"
          >
            <div className="flex items-center gap-2 text-accent-deep mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-medium uppercase tracking-wider">Caso recibido</span>
            </div>

            <h1 className="font-poppins text-3xl md:text-4xl font-semibold text-foreground mb-3">
              {name ? `Gracias, ${name.split(" ")[0]}` : "¡Gracias!"}
            </h1>
            <p className="text-muted-foreground mb-8">
              Hemos recibido tu caso. Nuestro equipo legal te llamará en menos de 24h para confirmar tu mejor opción, sin compromiso.
            </p>

            {result && (
              <div className="rounded-2xl border border-border bg-background p-6 mb-8">
                <p className="text-xs font-medium uppercase tracking-wider text-accent-deep mb-3">
                  Tu diagnóstico orientativo
                </p>
                <h2 className="font-poppins text-2xl font-semibold text-foreground mb-3">
                  {result.title}
                </h2>
                <p className="text-muted-foreground mb-6">{result.description}</p>
                <ul className="space-y-3">
                  {result.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
                        <Check className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result && typeof debtAmount === "number" && (
              <BenefitSimulator solution={result.solution} debtAmount={debtAmount} />
            )}

            <p className="text-xs text-muted-foreground mb-8">
              {result
                ? "Esta es una orientación automática basada en tus respuestas. El diagnóstico definitivo lo realiza nuestro equipo legal sin compromiso."
                : "Si has llegado aquí directamente, vuelve al inicio para analizar tu deuda."}
            </p>

            <Button asChild className="h-12 rounded-xl">
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