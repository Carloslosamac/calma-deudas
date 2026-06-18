import {
  ShieldCheck,
  PhoneOff,
  Gavel,
  Users,
  Scale,
  Sparkles,
  Wallet,
  Clock,
  Lock,
  Landmark,
  Ban,
  type LucideIcon,
} from "lucide-react";
import type { MoneyIcon } from "@/data/seo/content/types";

/** Mapa compartido nombre → icono lucide para los módulos de contenido. */
export const ICONS: Record<MoneyIcon, LucideIcon> = {
  shield: ShieldCheck,
  "phone-off": PhoneOff,
  gavel: Gavel,
  users: Users,
  scale: Scale,
  sparkles: Sparkles,
  wallet: Wallet,
  clock: Clock,
  lock: Lock,
  landmark: Landmark,
  ban: Ban,
};

export type { MoneyIcon };