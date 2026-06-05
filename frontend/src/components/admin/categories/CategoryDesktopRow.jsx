import { Pencil, Trash2 } from "lucide-react";

function CategoryDesktopRow({ category, onEdit }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50">
      <td>
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: category.color }}
          ></div>
          <span className="font-semibold text-ink">{category.name}</span>
        </div>
      </td>
      <td className="text-sm text-ink/60">
        {category.description}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <div
            className="h-4 w-10 rounded-md"
            style={{ backgroundColor: category.color }}
          ></div>
          <span className="text-xs text-ink/50">{category.color}</span>
        </div>
      </td>
      <td>
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${
            category.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {category.isActive ? "ACTIF" : "INACTIF"}
        </span>
      </td>
      <td className="text-sm text-ink/60">{category.adCount}</td>
      <td className="text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-ink/60 hover:text-ink"
          >
            <Pencil size={16} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-ink/60 hover:text-ink">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CategoryDesktopRow;