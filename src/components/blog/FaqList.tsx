import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = { q: string; a: React.ReactNode };

const FaqList: React.FC<{ items: FaqItem[] }> = ({ items }) => (
  <Accordion type="single" collapsible className="rounded-3xl border border-border bg-surface-elevated px-2 shadow-soft md:px-4">
    {items.map((item, i) => (
      <AccordionItem key={i} value={`faq-${i}`} className="border-border">
        <AccordionTrigger className="px-4 py-5 text-left font-poppins text-base font-semibold text-foreground hover:no-underline md:text-lg">
          {item.q}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-5 text-base leading-relaxed text-foreground/80">
          {item.a}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FaqList;