import team1 from "@/assets/team-lawyer-1.jpg";
import team2 from "@/assets/team-lawyer-2.jpg";
import team3 from "@/assets/team-lawyer-3.jpg";
import team4 from "@/assets/team-lawyer-4.jpg";
import team5 from "@/assets/team-lawyer-5.jpg";
import team6 from "@/assets/team-lawyer-6.jpg";

/** Miembro del equipo jurídico de Calma (fuente única de verdad). */
export type TeamMember = {
  /** identificador estable usado para referenciar autoría en los posts */
  id: string;
  /** nombre y apellidos */
  name: string;
  /** cargo / especialidad, usado como subtítulo en los chips */
  role: string;
  /** credencial corta opcional (E-E-A-T) */
  credential?: string;
  photo: string;
};

/**
 * Equipo de abogados de Calma. Los mismos profesionales que firman las páginas
 * de servicio redactan también los artículos del blog (E-E-A-T).
 */
export const TEAM: Record<string, TeamMember> = {
  "marta-belmonte": {
    id: "marta-belmonte",
    name: "Marta Belmonte",
    role: "Socia directora · Insolvencia",
    credential: "Abogada colegiada · 15 años en insolvencia",
    photo: team1,
  },
  "javier-ferrer": {
    id: "javier-ferrer",
    name: "Javier Ferrer",
    role: "Abogado concursal sénior",
    credential: "Especialista en exoneración del pasivo",
    photo: team2,
  },
  "lucia-ordonez": {
    id: "lucia-ordonez",
    name: "Lucía Ordóñez",
    role: "Abogada de admisión y viabilidad",
    credential: "Diagnóstico y viabilidad del caso",
    photo: team3,
  },
  "andres-solis": {
    id: "andres-solis",
    name: "Andrés Solís",
    role: "Responsable de litigación",
    credential: "Representación ante el juzgado",
    photo: team4,
  },
  "sara-belda": {
    id: "sara-belda",
    name: "Sara Belda",
    role: "Abogada de litigación",
    credential: "Oposición a embargos y ejecuciones",
    photo: team5,
  },
  "carlos-rivas": {
    id: "carlos-rivas",
    name: "Carlos Rivas",
    role: "Abogado de derecho bancario",
    credential: "Reclamaciones por usura e intereses abusivos",
    photo: team6,
  },
};

/** Devuelve los miembros del equipo a partir de sus ids (ignora ids inexistentes). */
export const getAuthors = (ids?: string[]): TeamMember[] =>
  (ids ?? []).map((id) => TEAM[id]).filter(Boolean) as TeamMember[];

/** Cadena de nombres para metadatos/SEO ("Marta Belmonte y Javier Ferrer"). */
export const authorsToName = (ids?: string[], fallback = "Equipo legal Calma"): string => {
  const names = getAuthors(ids).map((m) => m.name);
  if (names.length === 0) return fallback;
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
};
