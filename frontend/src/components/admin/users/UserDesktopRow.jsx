import { Pencil} from "lucide-react";
import { roleStyles } from "../adminData";

function UserDesktopRow({ user, onEdit }) {

  const date =user.created_at;

  const formattedDate =
  new Date(date)
    .toLocaleDateString("fr-FR");

  return (
    <tr className="hover:bg-gray-50/40 transition-colors border-b border-gray-100 last:border-none">
      <td>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex-none" />
          <span className="font-bold text-gray-700 text-[14px]">{user.firstname} {user.lastname}</span>
        </div>
      </td>
      <td className="text-xs text-gray-400 font-medium">{user.email}</td>
      <td className="text-sm text-gray-500 font-semibold">{user.city}</td>
      <td>
        <span className={`text-[11px] uppercase px-2 py-0.5 rounded border ${roleStyles[user.role]}`}>
          {user.role}
        </span>
      </td>
      <td className="text-xs font-bold text-gray-700">{user.points} UC</td>
      <td className="text-xs text-gray-400 font-medium">{formattedDate}</td>
      <td className="text-right">
        <div className="inline-flex items-center gap-1">
            <button onClick={onEdit} className="btn btn-square btn-xs btn-outline border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-ink rounded-lg shadow-sm">
              <Pencil size={15} />
            </button>
        </div>
      </td>
    </tr>
  );
}

export default UserDesktopRow;