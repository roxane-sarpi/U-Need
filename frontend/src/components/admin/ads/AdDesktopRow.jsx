import { Pencil } from "lucide-react";
import { getCategoryColor } from "../../ads/adsData";

function AdDesktopRow({ ad, onEdit }) {
  // Styles spécifiques pour les statuts d'annonces
  const statusStyles = {
    "en cours": "bg-amber-50 text-amber-600 font-bold border-amber-100",
    "disponible": "bg-emerald-50 text-emerald-600 font-bold border-emerald-100",
    "signalé": "bg-rose-50 text-rose-600 font-bold border-rose-100 animate-pulse",
    "terminé": "bg-gray-100 text-gray-500 font-medium border-transparent",
  };

  const date =ad.date_creation;

  const formattedDate =
  new Date(date)
    .toLocaleDateString("fr-FR");

  return (
    <tr className="hover:bg-gray-50/40 transition-colors border-b border-gray-100 last:border-none">
      
      {/* Titre de l'annonce */}
      <td>
        <span className="font-bold text-gray-700 text-[14px] block max-w-xs truncate">
          {ad.title}
        </span>
      </td>

      {/* Auteur */}
      <td className="text-sm text-gray-600 font-semibold">{ad.firstname} {ad.lastname}</td>

      {/* Catégorie */}
      <td>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded"
          style={{ backgroundColor: getCategoryColor(ad.id_category), color: '#374151' }}
        >
          {ad.category_name}
        </span>
      </td>

      {/* Prix (UC) */}
      <td className="text-xs font-bold text-gray-700">{ad.points} UC</td>

      {/* Date de dépôt */}
      <td className="text-xs text-gray-400 font-medium">{formattedDate}</td>

      {/* Statut de l'annonce */}
      <td>
        <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${statusStyles[ad.status]}`}>
          {ad.status}
        </span>
      </td>

      {/* Actions de modération */}
      <td className="text-right">
        <button 
          onClick={onEdit}
          className="btn btn-square btn-xs btn-outline border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-ink rounded-lg shadow-sm"
          title="Modérer l'annonce"
        >
          <Pencil size={14} />
        </button>
      </td>
    </tr>
  );
}

export default AdDesktopRow;