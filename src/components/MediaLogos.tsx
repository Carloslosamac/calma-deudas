const logos = ["El País", "El Mundo", "Expansión", "La Razón", "20minutos", "ABC", "Cinco Días"];

const MediaLogos = () => {
  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-10">
          Han hablado de nosotros
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <span
              key={logo}
              className="font-poppins font-semibold text-xl md:text-2xl text-foreground/40 hover:text-foreground/70 transition-colors tracking-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaLogos;
