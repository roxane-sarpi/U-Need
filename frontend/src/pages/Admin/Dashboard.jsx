import StatCard from "../../components/admin/dashboard/StatCard";
import CategoriesChart from "../../components/admin/dashboard/CategoriesChart";
import PageHeader from "../../components/admin/PageHeader";

function Dashboard() {
  const currentMonth = new Date().toLocaleDateString(
  "fr-FR",
  { month: "long" }
  );

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* 1. EN-TÊTE DU DASHBOARD */}
      {/* Colonne sur mobile, ligne alignée sur bureau */}
      <PageHeader title={"Dashboard"} subtitle={`Vue d'ensemble de la plateforme • ${currentMonth} ${currentYear}`} />

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

    </>
  );
}

export default Dashboard;