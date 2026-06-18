import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import calmaLogo from "@/assets/calma-logo.png";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <img src={calmaLogo} alt="Calma logo" className="h-7" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Especialistas en cancelación de deuda al amparo de la Ley
              de Segunda Oportunidad.
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4 text-sm">Producto</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Cómo funciona</a></li>
              <li><Link to="/servicios" className="text-muted-foreground hover:text-foreground transition-colors">Servicios</Link></li>
              <li><a href="/#testimonios" className="text-muted-foreground hover:text-foreground transition-colors">Casos reales</a></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/politica-de-privacidad" className="text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link></li>
              <li><Link to="/terminos-y-condiciones" className="text-muted-foreground hover:text-foreground transition-colors">Términos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-semibold text-foreground mb-4 text-sm">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@calma.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +34 900 123 456</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Madrid, España</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Calma. Vive sin deudas.</p>
          <p>Hecho con calma en España 🇪🇸</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
