import { Sparkles, Check } from "lucide-react";

type AnswerSummaryProps = {
  tldr?: string;
  takeaways?: string[];
};

/**
 * Bloque "answer-first" para GEO/AEO: ofrece una respuesta directa y los
 * puntos clave en formato extraíble por motores generativos (marcado con
 * data-geo-* para el speakable JSON-LD).
 */
export const AnswerSummary = ({ tldr, takeaways }: AnswerSummaryProps) => {
  if (!tldr && !(takeaways && takeaways.length > 0)) return null;

  return (
    <aside className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border bg-surface p-6 md:p-8">
      {tldr && (
        <div data-geo-summary>
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
            <Sparkles className="h-4 w-4" />
            En resumen
          </p>
          <p className="text-base leading-relaxed text-foreground/90 md:text-lg">{tldr}</p>
        </div>
      )}

      {takeaways && takeaways.length > 0 && (
        <div data-geo-takeaways className={tldr ? "mt-6 border-t border-border pt-6" : ""}>
          <p className="mb-3 text-sm font-semibold text-foreground">Puntos clave</p>
          <ul className="space-y-2.5">
            {takeaways.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default AnswerSummary;