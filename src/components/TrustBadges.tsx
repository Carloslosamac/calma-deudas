import { Scale, ShieldCheck, GraduationCap, Lock } from "lucide-react";

const badges = [
  { icon: Scale, title: "Ley Segunda Oportunidad", sub: "Ley 25/2015" },
  { icon: GraduationCap, title: "Abogados colegiados", sub: "ICAM · ICAB" },
  { icon: ShieldCheck, title: "Cumplimiento RGPD", sub: "Datos seguros" },
  { icon: Lock, title: "Confidencialidad total", sub: "100% privado" },
];

const TrustBadges = () => {
  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((b) => (
            <div key={b.title} className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-background border border-border flex items-center justify-center flex-shrink-0">
                <b.icon className="h-5 w-5 text-accent-deep" />
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">{b.title}</div>
                <div className="text-xs text-muted-foreground">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
