import { useEffect, useState } from "react";

/**
 * Returns a live-incrementing counter value that grows slowly over real time.
 * - `base` is the value as of `startDate`.
 * - `perDay` is how much the counter grows each calendar day.
 * - The counter also ticks visually every `tickMs` to feel "alive".
 */
export function useLiveCounter({
  base,
  startDate,
  perDay,
  tickMs = 4000,
}: {
  base: number;
  startDate: Date;
  perDay: number;
  tickMs?: number;
}) {
  const compute = () => {
    const elapsedMs = Date.now() - startDate.getTime();
    const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
    return Math.floor(base + elapsedDays * perDay);
  };

  const [value, setValue] = useState<number>(compute);

  useEffect(() => {
    const id = setInterval(() => setValue(compute()), tickMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, startDate.getTime(), perDay, tickMs]);

  return value;
}

export const formatEuro = (n: number) =>
  new Intl.NumberFormat("es-ES").format(n) + " €";

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("es-ES").format(n);
