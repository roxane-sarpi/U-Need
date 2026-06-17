import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getCategoryColor } from "../../ads/adsData";

function CategoriesChart({ dataDistribution = [] }) {
  
  const chartData = useMemo(() => {
    const totalAds = dataDistribution.reduce((sum, item) => sum + Number(item.count), 0);
    if (totalAds === 0) return [];

    // 1. On trie et on prend les 4 premières catégories
    const topCategories = dataDistribution.slice(0, 4).map((cat) => ({
      name: cat.name,
      value: Number(cat.count),
      percentage: Math.round((cat.count / totalAds) * 100),
      // On passe l'id à notre fonction pour récupérer la vraie couleur !
      color: getCategoryColor(cat.id)
    }));

    // 2. On regroupe le reste dans "Autres"
    const topCountSum = topCategories.reduce((sum, cat) => sum + cat.value, 0);
    const remainingCount = totalAds - topCountSum;

    if (remainingCount > 0) {
      topCategories.push({
        name: "Autres",
        value: remainingCount,
        percentage: Math.round((remainingCount / totalAds) * 100),
        color: "#cbd5e1" // Gris neutre pour le reste
      });
    }

    return topCategories;
  }, [dataDistribution]);

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center h-48 w-full text-sm text-gray-400 font-semibold">
        Aucune donnée d'annonce disponible pour le graphique.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full justify-between w-full">
      {/* Entête */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Annonces par catégorie
        </p>
        <h3 className="text-xl font-bold text-ink mt-0.5">Répartition</h3>
      </div>

      {/* Zone du Graphique avec Recharts */}
      <div className="flex justify-center items-center h-48 my-auto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* L'infobulle au survol des parts (Magnifique et automatique !) */}
            <Tooltip 
              formatter={(value, name, props) => [`${value} annonces (${props.payload.percentage}%)`, name]}
              contentStyle={{ borderRadius: '12px', borderColor: '#f3f4f6', fontSize: '12px' }}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}  // Crée l'effet "Donut" (trou au milieu)
              outerRadius={75}  // Taille extérieure du cercle
              paddingAngle={3}  // Crée un petit espace élégant entre chaque part
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Zone de la Légende */}
      <div className="space-y-3 border-t border-gray-50 pt-4">
        {chartData.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span 
                className="w-3.5 h-3.5 rounded-md shadow-sm flex-shrink-0" 
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-gray-600 font-semibold truncate max-w-[140px]">{cat.name}</span>
            </div>
            <span className="text-gray-500 font-bold tracking-wider">{cat.percentage} %</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesChart;