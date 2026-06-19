import { Pencil, Trash2 } from "lucide-react";

function CategoryMobileCard({ category, onEdit, onDelete }) {
  return (
    <div className="p-4 flex flex-row items-center justify-between gap-4 bg-white hover:bg-gray-50/50 transition-colors">
      
      {/* Partie gauche : Texte */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm text-ink truncate">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Partie droite : Boutons d'actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={onEdit}
          className="p-2 rounded-xl hover:bg-gray-100 text-ink/60 hover:text-ink transition-colors"
          aria-label="Modifier la catégorie"
        >
          <Pencil size={16} />
        </button>
        <button 
          onClick={() => onDelete(category)} // Câblage de la suppression
          className="p-2 rounded-xl hover:bg-red-50 text-ink/60 hover:text-red-600 transition-colors"
          aria-label="Supprimer la catégorie"
        >
          <Trash2 size={16} />
        </button>
      </div>

    </div>
  );
}

export default CategoryMobileCard;