function StatCard({ title, value, trend, type = "up" }) {
  // Gestion dynamique de la couleur et de l'icône de tendance
  const isUp = type === "up";
  const isNeutral = type === "neutral";

  const trendColor = isUp 
    ? "text-emerald-600 bg-emerald-50/50" 
    : isNeutral 
    ? "text-gray-500 bg-gray-50" 
    : "text-rose-600 bg-rose-50/50";

  const trendIcon = isUp ? "▲" : isNeutral ? "=" : "▼";

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[150px] w-full">
      <div>
        {/* Titre de la stat en petits caractères gris */}
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          {title}
        </p>
        {/* Valeur principale XXL */}
        <p className="text-3xl font-black text-ink tracking-tight">
          {value}
        </p>
      </div>

      {/* Indicateur de tendance en bas */}
      <div className={`text-xs font-bold inline-flex items-center gap-1.5 px-2 py-1 rounded-lg self-start mt-4 ${trendColor}`}>
        <span className="text-[10px]">{trendIcon}</span>
        <span>{trend}</span>
      </div>
    </div>
  );
}

export default StatCard;