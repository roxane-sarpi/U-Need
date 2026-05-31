function CategoriesChart() {
  // Centralisation des données du Top 5
  const categories = [
    { name: "Bricolage", percentage: "42 %", color: "bg-blue-600", strokeColor: "#2563eb", share: 42 },
    { name: "Informatique", percentage: "26 %", color: "bg-gray-300", strokeColor: "#d1d5db", share: 26 },
    { name: "Jardinage", percentage: "18 %", color: "bg-gray-200", strokeColor: "#e5e7eb", share: 18 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full justify-between w-full">
      {/* Entête de la carte */}
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Échanges par catégorie
        </p>
        <h3 className="text-xl font-bold text-ink mt-0.5">Top 5</h3>
      </div>

      {/* Zone du Graphique Donut (SVG) */}
      <div className="flex justify-center items-center py-6 my-auto">
        <div className="relative w-44 h-44">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            {/* Cercle de fond (représente le reste / 14 %) */}
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f3f4f6" strokeWidth="4.5" />
            
            {/* Segment Jardinage (18 %) */}
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e5e7eb" strokeWidth="4.5" 
                    strokeDasharray="18 82" strokeDashoffset="-68" />
            
            {/* Segment Informatique (26 %) */}
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#d1d5db" strokeWidth="4.5" 
                    strokeDasharray="26 74" strokeDashoffset="-42" />
            
            {/* Segment Bricolage (42 %) */}
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563eb" strokeWidth="4.5" 
                    strokeDasharray="42 58" strokeDashoffset="0" />
          </svg>
        </div>
      </div>

      {/* Zone de la Légende */}
      <div className="space-y-3 mt-2 border-t border-gray-50 pt-4">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              {/* Petite pastille colorée */}
              <span className={`w-3.5 h-3.5 rounded-md shadow-sm ${cat.color}`} />
              <span className="text-gray-600 font-semibold">{cat.name}</span>
            </div>
            {/* Pourcentage calé à droite */}
            <span className="text-gray-500 font-bold tracking-wider">{cat.percentage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesChart;