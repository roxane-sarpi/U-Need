import { Pencil, Trash2 } from "lucide-react";

function CategoryDesktopRow({ category, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50">
      <td>
        <span className="font-semibold text-ink">{category.name}</span>
      </td>
      <td className="text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-ink/60 hover:text-ink cursor-pointer"
            aria-label="Modifier la catégorie"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(category)} // Câblage de la suppression
            className="p-1.5 rounded-lg hover:bg-red-50 text-ink/60 hover:text-red-600 cursor-pointer transition-colors"
            aria-label="Supprimer la catégorie"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CategoryDesktopRow;