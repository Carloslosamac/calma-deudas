import { MessageCircle } from "lucide-react";

const InlineCTA = ({
  title,
  description,
  buttonLabel = "Analizar mi caso gratis",
}: {
  title: string;
  description: string;
  buttonLabel?: string;
}) => (
  <aside className="my-2 overflow-hidden rounded-3xl border border-accent/30 bg-accent-soft/40 p-7 shadow-soft md:p-9">
    <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-8">
      <div>
        <h3 className="font-poppins text-xl font-semibold leading-snug text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
      <a
        href="/#hero-form"
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-glow"
      >
        <MessageCircle className="h-4 w-4" />
        {buttonLabel}
      </a>
    </div>
  </aside>
);

export default InlineCTA;