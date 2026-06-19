import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, BookOpen, Bell, MessageCircle, User, HelpCircle, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function MobileDrawer({closeMenu}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <div className="drawer-side z-[100]">
      <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={closeMenu}></label>
      
      <div className="menu p-0 w-80 min-h-full bg-canvas text-ink">
        {/* Drawer Header with a close btn */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" className="text-2xl font-bold text-primary" onClick={closeMenu}>
            <img src="/logo.webp" alt="logo" className="h-10 w-auto"/>
            </Link>
          <label htmlFor="main-drawer" className="btn btn-lg btn-circle btn-ghost">✕</label>
        </div>

        <div className="p-4 space-y-6">
          {/* Main Action section : Add an ad */}
          <Link 
            to="/create-ads" 
            className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white font-semibold shadow-md active:scale-95 transition-all" onClick={closeMenu}
          >
            <PlusCircle size={22} />
            <span>Déposer une annonce</span>
          </Link>

          {/* Main Navigation Section */}
          <nav className="space-y-1">
            <Link to="/catalogue" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
              <BookOpen size={20} className="text-gray-500" />
              <span className="font-medium">Catalogue</span>
            </Link>

            {/* if not connected link to login, if connected link to notifications, add a condition on the Link component */}
            {/* <Link to="/notifications" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
              <Bell size={20} className="text-gray-500" />
              <span className="font-medium">Notifications</span>
            </Link> */}
            <Link to="/messagerie" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
              <MessageCircle size={20} className="text-gray-500" />
              <span className="font-medium">Messagerie</span>
            </Link>
          </nav>

          <hr className="border-gray-100" />

          {/* Account section */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Mon Compte</p>
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
                  <User size={20} className="text-gray-500" />
                  <span className="font-medium">Mon profil</span>
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin/dashboard" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
                    <LayoutDashboard size={20} className="text-gray-500" />
                    <span className="font-medium">Dashboard Admin</span>
                  </Link>
                )}
                <button onClick={handleLogout} className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors w-full text-left text-red-500">
                  <LogOut size={20} />
                  <span className="font-medium">Se déconnecter</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
                  <User size={20} className="text-gray-500" />
                  <span className="font-medium">Se connecter</span>
                </Link>
                <Link to="/register" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
                  <User size={20} className="text-gray-500" />
                  <span className="font-medium">S'inscrire</span>
                </Link>
              </>
            )}
            <Link to="/a-propos" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors" onClick={closeMenu}>
              <HelpCircle size={20} className="text-gray-500" />
              <span className="font-medium">Qui sommes-nous ?</span>
            </Link>
          </div>
        </div>

        {/* Menu Footer */}
        <div className="mt-auto p-6 bg-gray-50 text-center text-xs text-gray-400">
          <p>© 2026 U-Need Inc.</p>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;