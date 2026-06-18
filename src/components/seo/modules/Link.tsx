import { Link } from "react-router-dom";

/** Enlace interno con estilo de marca, compartido por todas las money pages. */
export const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

export default A;