import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-ink text-white pt-10 pb-6 px-6 border-t border-gray-800">
      {/* Conteneur principal */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-8">
        
        {/* 1. BLOC LOGO & SLOGAN */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xs mx-auto md:mx-0 order-1">
          <Link to="/">
            <img src="/logo.webp" alt="U-Need" className="h-12 w-auto mb-3" />
          </Link>
          <p className="text-sm text-gray-400 italic">
            "Tu ne le sais pas encore mais tu en as déjà besoin"
          </p>
        </div>

        <hr className="border-gray-800 w-full md:hidden order-1" />

        {/* 2. BLOC BESOIN D'AIDE */}
        {/* Correction des alignements : centré sur mobile, aligné à droite sur bureau */}
        <div className="flex flex-col items-center text-center order-2 md:order-3 md:text-right">
          <h3 className="text-base font-bold mb-3 tracking-wide">Besoin d'aide ?</h3>
          <Link 
            to="/contact" 
            /* shadow-none pour enlever l'ombre + hover:scale-105 pour l'effet de zoom */
            className="btn bg-accent-orange text-ink border-none px-6 py-2 rounded-xl font-bold shadow-none transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Contactez-nous
          </Link>
        </div>

        <hr className="border-gray-800 w-full md:hidden order-2" />

        {/* 3. BLOC NAVIGATION */}
        <nav className="flex flex-col items-center gap-4 md:flex-row md:gap-8 order-3 md:order-2 font-medium">
          {/* Correction de la couleur au survol avec ton nouveau nom de variable */}
          <Link to="/catalogue" className="hover:text-accent-orange transition-colors">Catalogue</Link>
          <Link to="/faq" className="hover:text-accent-orange transition-colors">FAQ</Link>
          <Link to="/a-propos" className="hover:text-accent-orange transition-colors">Qui sommes-nous ?</Link>
        </nav>

      </div>

      {/* 4. SECTION LÉGALE & COPYRIGHT */}
      <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col items-center gap-3 text-[10px] text-gray-500 tracking-wider">
        <div className="flex gap-2">
          <Link to="/cgu" className="hover:underline">CGU</Link>
          <span>|</span>
          <Link to="/mentions-legales" className="hover:underline">Mention Légale</Link>
          <span>|</span>
          <Link to="/cookies" className="hover:underline">Cookies</Link>
        </div>
        <p>© 2026 - U-Need Company, Inc. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;