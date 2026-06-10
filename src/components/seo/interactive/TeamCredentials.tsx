import { motion } from "framer-motion";
import { Scale, BadgeCheck } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyTeamCredentials } from "@/data/seo/content/types";

/** Bloque de equipo + credenciales (autoridad jurídica, E-E-A-T). */
const TeamCredentials = ({ data }: { data: MoneyTeamCredentials }) => (
  <section>
    <div className="text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
        <Scale className="h-4 w-4" aria-hidden /> Equipo jurídico
      </span>
      <h2 className="mt-5 font-poppins text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {data.title}
      </h2>
      {data.subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{data.subtitle}</p>
      )}
    </div>

    <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 md:grid-cols-3">
      {data.members.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex flex-col items-center rounded-3xl border border-border bg-surface-elevated p-6 text-center shadow-soft"
        >
          {m.photo ? (
            <img
              src={m.photo}
              alt={`${m.name}, ${m.role}`}
              loading="lazy"
              width={160}
              height={160}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
              <Scale className="h-8 w-8" aria-hidden />
            </span>
          )}
          <p className="mt-4 font-poppins font-semibold text-foreground">{m.name}</p>
          <p className="text-sm text-muted-foreground">{m.role}</p>
          {m.credential && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent-deep">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> {m.credential}
            </p>
          )}
        </motion.div>
      ))}
    </div>

    {data.highlights && data.highlights.length > 0 && (
      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
        {data.highlights.map((h) => (
          <span
            key={h}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
          >
            <BadgeCheck className="h-4 w-4 text-accent-deep" aria-hidden /> {h}
          </span>
        ))}
      </div>
    )}

    <div className="mt-9 flex justify-center">
      <CtaButton className="h-14 px-8 text-base">Hablar con un abogado gratis</CtaButton>
    </div>
  </section>
);

export default TeamCredentials;