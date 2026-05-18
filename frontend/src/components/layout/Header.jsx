import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PlusCircle, Bell, MessageCircle, UserCircle, Menu } from "lucide-react";
import MobileDrawer from "./MobileDrawer";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-gray-200 shadow-sm">
      <div className="drawer">
        <input id="main-drawer" type="checkbox" className="drawer-toggle" checked={isMenuOpen} onChange={toggleMenu} />
        
        <div className="drawer-content">
          {/* BARRE DE NAVIGATION PRINCIPALE */}
          <nav className="navbar h-18 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between">
            
            {/* --- CÔTÉ GAUCHE : Logo + Liens Bureau --- */}
            <div className="flex items-center gap-8 flex-1">
              {/* Menu Mobile (Burger) - Caché sur Desktop (md:hidden) */}
              <label htmlFor="main-drawer" className="btn btn-ghost btn-square md:hidden">
                <Menu size={28} />
              </label>

              {/* Logo - Toujours visible */}
              <Link to="/" className="flex-1 flex justify-end md:flex-none">
                <img src="/logo.webp" alt="U-Need" className="h-12 w-auto" />
              </Link>

              {/* Liens Bureau - Cachés sur Mobile (hidden md:flex) */}
              <div className="hidden md:flex items-center gap-6 text-ink font-medium">
                <NavLink to="/catalogue" className={({isActive}) => isActive ? "underline decoration-primary underline-offset-8 decoration-2" : "hover:text-primary transition-colors"}>
                  Catalogue
                </NavLink>
                <NavLink to="/aide" className="hover:text-primary transition-colors">
                  Comment ça marche ?
                </NavLink>
              </div>
            <div className="hidden md:flex flex-1">
              <Link to="/deposer" className="btn btn-primary px-8 rounded-xl flex gap-2 text-white">
                <PlusCircle size={20} />
                <span>Déposer une annonce</span>
              </Link>
            </div>
            </div>

            

            {/* --- CÔTÉ DROIT : Icônes (Bureau) --- */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Ces icônes sont masquées sur mobile dans la maquette Leboncoin car elles vont dans le Drawer */}
              <div className="hidden md:flex items-center gap-6">
                <Link to="/notifications" className="flex flex-col items-center gap-1 text-ink hover:text-primary">
                  <Bell size={24} />
                  <span className="text-[10px] font-medium uppercase">Notification</span>
                </Link>
                <Link to="/messagerie" className="flex flex-col items-center gap-1 text-ink hover:text-primary">
                  <MessageCircle size={24} />
                  <span className="text-[10px] font-medium uppercase">Messagerie</span>
                </Link>
                <Link to="/profil" className="flex flex-col items-center gap-1 text-ink hover:text-primary">
                  <UserCircle size={24} />
                  <span className="text-[10px] font-medium uppercase">Mon profil</span>
                </Link>
              </div>

              {/* Sur Mobile, on peut éventuellement laisser juste l'icône Profil ou rien si le burger suffit */}
            </div>
          </nav>
        </div>

        {/* Le menu latéral mobile reste identique */}
        <MobileDrawer closeMenu={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}

export default Header;