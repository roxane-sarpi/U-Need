import { useEffect, useState } from "react";
import StatCard from "../../components/admin/dashboard/StatCard";
import CategoriesChart from "../../components/admin/dashboard/CategoriesChart";
import PageHeader from "../../components/admin/PageHeader";
import { getStatsService } from "../../components/services/adminService";

function Dashboard() {
  const currentYear = new Date().getFullYear();

  const [stats, setStats] = useState(null);
  const [fetchError, setFetchError] = useState("");

  const getAllStats = async () => {
    try {
      const data = await getStatsService();
      setStats(data);
      setFetchError("");
    } catch (error) {
      console.error("Données api statistiques non récupérées :", error);
      setFetchError(
        "Impossible de récupérer les statistiques du tableau de bord. Vérifiez votre connexion et réessayez."
      );
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      await getAllStats();
    };

    void fetchStats();
  }, []);

  return (
    <>
      {/* 1. EN-TÊTE DU DASHBOARD */}
      <PageHeader 
        title={"Dashboard"} 
        subtitle={`Vue d'ensemble de la plateforme • ${currentYear}`} 
      />

      {/* BANDEAU D'ERREUR SYNCHRONISÉ */}
      {fetchError && (
        <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700 mt-6">
          {fetchError}
        </div>
      )}

      {/* 2. GRILLE DES CARTES DE STATISTIQUES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard 
          title="Utilisateurs" 
          value={stats === null ? "..." : stats.totalUsers}
        />
        <StatCard 
          title="Annonces actives" 
          value={stats === null ? "..." : stats.availableAds}
        />
        <StatCard 
          title="Échanges totaux" 
          value={stats === null ? "..." : stats.totalExchanges}
        />
        <StatCard 
          title="Points en circulation" 
          value={stats === null ? "..." : `${stats.totalPoints} UC`}
        />
      </div>

      {/* 3. GRILLE DES GRAPHIQUES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          {/* On ne passe le graphique que si les données sont prêtes */}
          {stats !== null && <CategoriesChart />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;