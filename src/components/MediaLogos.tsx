const logos = ["El País", "El Mundo", "Expansión", "La Razón", "20minutos", "ABC", "Cinco Días", "La Vanguardia"];

const LogoRow = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
  <div className="flex shrink-0 items-center gap-16 px-8" aria-hidden={ariaHidden}>
    {logos.map((logo) => (
      <span
        key={logo}
        className="font-semibold text-2xl md:text-3xl text-foreground/65 hover:text-foreground transition-colors tracking-tight whitespace-nowrap"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {logo}
      </span>
    ))}
  </div>
);

const MediaLogos = () => {
  return (
    <section className="py-16 bg-surface border-y border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-10">
          Han hablado de nosotros
        </p>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  );
};

export default MediaLogos;
