import StatCard from "./components/StatCard";
import CategoriesChart from "./components/CategoriesChart";

function Dashboard() {
  const currentMonth = new Date().toLocaleDateString(
  "fr-FR",
  { month: "long" }
  );

  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      
      {/* 1. EN-TÊTE DU DASHBOARD */}
      {/* Colonne sur mobile, ligne alignée sur bureau */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Vue d'ensemble de la plateforme • {currentMonth} {currentYear}
          </p>
        </div>
        
        {/* BONUS : Actions : Sélecteur de date et bouton exporter */}
        {/* <div className="flex items-center gap-2 self-start sm:self-auto">
          <select className="select select-bordered select-sm rounded-xl bg-white border-gray-200 font-medium text-sm">
            <option>30 derniers jours</option>
            <option>7 derniers jours</option>
            <option>Cette année</option>
          </select>
          <button className="btn btn-sm btn-outline border-gray-200 hover:bg-gray-50 hover:text-ink rounded-xl font-bold bg-white shadow-none">
            Exporter
          </button>
        </div> */}
      </div>

      {/* 2. GRILLE DES CARTES DE STATISTIQUES */}
      {/* Mobile : 1 colonne | Tablette (sm) : 2 colonnes | Grand écran (lg) : 4 colonnes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Utilisateurs" value="1 247" trend="+12,4 %" type="up" />
        <StatCard title="Annonces actives" value="142" trend="+5,8 %" type="up" />
        <StatCard title="Échanges / Mois" value="89" trend="+18,1 %" type="up" />
        <StatCard title="Points en circulation" value="12 470" trend="stable" type="neutral" />
      </div>

      {/* 3. GRILLE DES GRAPHIQUES */}
      {/* Mobile : 1 colonne | Grand écran (lg) : 3 colonnes pour agencer les blocs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Le camembert prend la colonne restante (1 colonne sur 3) */}
        <div className="lg:col-span-1">
          <CategoriesChart />
        </div>
        
      </div>

    </div>
  );
}

export default Dashboard;