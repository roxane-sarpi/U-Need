import { Pencil, Trash2 } from "lucide-react";

function CategoryMobileCard({ category, onEdit }) {
  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        <div
          className="h-6 w-6 rounded-full flex-shrink-0 mt-1"
          style={{ backgroundColor: category.color }}
        ></div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-ink truncate">{category.name}</h3>
          <p className="text-sm text-ink/60 mt-1">{category.description}</p>
          <div className="mt-3 flex items-center gap-4 text-xs">
            <div>
              <p className="font-semibold text-ink">Statut</p>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  category.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {category.isActive ? "ACTIF" : "INACTIF"}
              </span>
            </div>
            <div>
              <p className="font-semibold text-ink">Annonces</p>
              <p className="text-ink/60">{category.adCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-gray-100 text-ink/60 hover:text-ink"
        >
          <Pencil size={16} />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 text-ink/60 hover:text-ink">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default CategoryMobileCard;