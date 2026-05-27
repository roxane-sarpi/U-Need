import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  // AlertTriangle, 
  FolderTree,
  Menu,
  X
} from "lucide-react";

function AdminLayout() {
  // Gestion de l'état pour ouvrir/fermer le drawer sur mobile
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = () => setIsDrawerOpen(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Utilisateurs", path: "/admin/users", icon: Users },
    { name: "Annonces", path: "/admin/ads", icon: FileText },
    // { name: "Signalements", path: "/admin/reports", icon: AlertTriangle, badge: 7 } BONUS,
    { name: "Catégories", path: "/admin/categories", icon: FolderTree },
    // { name: "Paramètres", path: "/admin/parametres", icon: Settings } BONUS,
  ];

  return (
    // md:drawer-open force le menu à rester visible à partir des écrans intermédiaires/bureau
    <div className="drawer md:drawer-open min-h-screen bg-canvas text-ink">
      <input 
        id="admin-drawer" 
        type="checkbox" 
        className="drawer-toggle" 
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />
      
      {/* ----------------------------------------------------
          ZONE DE CONTENU (À droite sur Desktop, plein écran sur Mobile)
         ---------------------------------------------------- */}
      <div className="drawer-content flex flex-col">
        
        {/* Barre supérieure visible UNIQUEMENT sur mobile (md:hidden) */}
        <header className="flex items-center justify-between p-4 bg-ink text-white md:hidden shadow-md">
          <div className="flex flex-col items-center gap-1">
            <img src="/logo.webp" alt="logo" className="h-10 w-auto"/>
            <span className="text-[9px] bg-accent-orange px-1 py-0.5 rounded font-extrabold ml-1">ADMIN</span>
          </div>
          <label htmlFor="admin-drawer" className="btn btn-ghost btn-square btn-sm">
            <Menu size={22} />
          </label>
        </header>

        {/* Contenu dynamique de la page active */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* ----------------------------------------------------
          BARRE LATÉRALE (Sidebar mobile masquée / fixe sur Desktop)
         ---------------------------------------------------- */}
      <div className="drawer-side z-[100]">
        {/* L'overlay assombrit l'écran au clic à côté sur mobile */}
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={closeDrawer}></label>
        
        <aside className="w-64 min-h-full bg-ink text-white flex flex-col border-r border-gray-800">
          
          {/* Header de la Sidebar */}
          <div className="p-6 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="logo" className="h-10 w-auto"/>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-wide">U-Need</span>
                <span className="text-[10px] bg-accent-orange text-white font-extrabold px-1.5 py-0.5 rounded uppercase self-start mt-0.5 tracking-wider">
                  Admin
                </span>
              </div>
            </div>
            {/* Bouton fermeture visible UNIQUEMENT sur mobile */}
            <button className="md:hidden btn btn-ghost btn-circle btn-sm text-gray-400" onClick={closeDrawer}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation : On utilise notre astuce de propagation (onClick) apprise juste avant ! */}
          <nav className="flex-1 p-4 space-y-1" onClick={closeDrawer}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-lg font-medium transition-all relative group ${
                      isActive 
                        ? "bg-gray-800 text-white before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-blue-500 before:rounded-r" 
                        : "text-gray-400 hover:bg-gray-900/50 hover:text-white"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="transition-colors group-hover:text-white" />
                    <span>{item.name}</span>
                  </div>
                  
                  {item.badge && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default AdminLayout;