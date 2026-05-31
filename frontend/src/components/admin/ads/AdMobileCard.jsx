function AdMobileCard({ ad, onEdit }) {
  const statusStyles = {
    "EN ATTENTE": "bg-amber-50 text-amber-600",
    "VALIDÉE": "bg-emerald-50 text-emerald-600",
    // "SIGNALÉE": "bg-rose-50 text-rose-600 font-bold",
    "REFUSÉE": "bg-gray-100 text-gray-400",
  };

  return (
    <div 
      onClick={onEdit}
      onKeyDown={(e) => e.key === "Enter" && onEdit()}
      role="button"
      tabIndex={0}
      className="p-4 space-y-3 cursor-pointer transition-colors hover:bg-gray-50/50 active:bg-gray-100 focus:outline-none focus:bg-gray-50 select-none"
    >
      {/* Ligne supérieure : Titre et Prix */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-ink line-clamp-2">{ad.title}</h4>
          <p className="text-xs text-gray-400 font-medium mt-0.5">par {ad.author}</p>
        </div>
        <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md whitespace-nowrap">
          {ad.price} UC
        </span>
      </div>
      
      {/* Ligne inférieure : Catégorie, Date et Statut */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <div className="flex gap-2 text-gray-400 font-medium">
          <span className="text-gray-500 font-semibold">{ad.category}</span>
          <span>•</span>
          <span>{ad.date}</span>
        </div>
        
        {/* Badge Statut compact */}
        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${statusStyles[ad.status]}`}>
          {ad.status}
        </span>
      </div>
    </div>
  );
}

export default AdMobileCard;