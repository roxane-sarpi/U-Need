import { PlusCircle, BookOpen, Bell, MessageCircle, User, HelpCircle } from "lucide-react"; // Si tu as lucide-react (vu dans ton package.json)

function MobileDrawer() {
  return (
    <div className="drawer-side z-[100]">
      <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      
      <div className="menu p-0 w-80 min-h-full bg-canvas text-ink">
        {/* Header du Drawer avec bouton fermeture */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-xl font-bold text-primary">U-Need</span>
          <label htmlFor="main-drawer" className="btn btn-sm btn-circle btn-ghost">✕</label>
        </div>

        <div className="p-4 space-y-6">
          {/* Section Action Principale : Déposer une annonce */}
          <a 
            href="#" 
            className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white font-semibold shadow-md active:scale-95 transition-all"
          >
            <PlusCircle size={22} />
            <span>Déposer une annonce</span>
          </a>

          {/* Section Navigation Principale */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors">
              <BookOpen size={20} className="text-gray-500" />
              <span className="font-medium">Catalogue</span>
            </a>
            <a href="#" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors">
              <Bell size={20} className="text-gray-500" />
              <span className="font-medium">Notifications</span>
            </a>
            <a href="#" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors">
              <MessageCircle size={20} className="text-gray-500" />
              <span className="font-medium">Messagerie</span>
            </a>
          </nav>

          <hr className="border-gray-100" />

          {/* Section Compte */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Mon Compte</p>
            <a href="#" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors">
              <User size={20} className="text-gray-500" />
              <span className="font-medium">Mon profil</span>
            </a>
            <a href="#" className="flex items-center gap-4 p-3 hover:bg-primary-soft rounded-lg transition-colors">
              <HelpCircle size={20} className="text-gray-500" />
              <span className="font-medium">Comment ça marche ?</span>
            </a>
          </div>
        </div>

        {/* Footer du menu */}
        <div className="mt-auto p-6 bg-gray-50 text-center text-xs text-gray-400">
          <p>© 2026 U-Need Inc.</p>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;