import { BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { MoneyConceptGlossary } from "@/data/seo/content/types";

/** Glosario educativo: define en lenguaje claro los términos clave del tema. */
const ConceptGlossary = ({ data }: { data: MoneyConceptGlossary }) => (
  <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
        <BookOpen className="h-6 w-6" aria-hidden />
      </span>
      <div>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {data.title}
        </h2>
        {data.subtitle && <p className="mt-2 text-muted-foreground">{data.subtitle}</p>}
      </div>
    </div>

    <Accordion type="single" collapsible className="mt-8">
      {data.terms.map((t) => (
        <AccordionItem key={t.term} value={t.term} className="border-border">
          <AccordionTrigger className="text-left font-poppins font-semibold text-foreground">
            {t.term}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-foreground/85">
            {t.definition}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default ConceptGlossary;
