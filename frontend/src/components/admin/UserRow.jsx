import { Eye, Pencil, MoreHorizontal } from "lucide-react";

function UserRow({ user }) {
  // Styles pour les badges de rôles
  const roleStyles = {
    ADMIN: "bg-rose-50 text-rose-600 font-medium border-rose-100",
    MODÉRATEUR: "bg-blue-50 text-blue-600 font-medium border-blue-100",
    USER: "bg-gray-100 text-gray-600 font-medium border-transparent"
  };

  // Styles pour les statuts de ta maquette
  const statusStyles = {
    ACTIF: "bg-emerald-50 text-emerald-600 font-medium border-emerald-100",
    SUSPENDU: "bg-accent-orange-light text-accent-orange-dark font-medium border-amber-100",
    BANNI: "bg-rose-50 text-rose-500 font-medium border-rose-100",
  };

  return (
    <tr className="hover:bg-gray-50/40 transition-colors border-b border-gray-100 last:border-none">

      {/* Colonne Utilisateur (Avatar + Nom) */}
      <td>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex-none" />
          <span className="font-bold text-gray-700 text-[14px]">{user.name}</span>
        </div>
      </td>

      {/* Email, Ville, Rôle */}
      <td className="text-xs text-gray-400 font-medium">{user.email}</td>
      <td className="text-sm text-gray-500 font-semibold">{user.city}</td>
      <td>
        <span className={`text-[11px] uppercase px-2 py-0.5 rounded border ${roleStyles[user.role]}`}>
          {user.role}
        </span>
      </td>

      {/* Solde & Inscription */}
      <td className="text-xs font-bold text-gray-700">{user.balance} UC</td>
      <td className="text-xs text-gray-400 font-medium">{user.joined}</td>

      {/* Statut */}
      <td>
        <span className={`text-[11px] uppercase px-2 py-0.5 rounded border ${statusStyles[user.status]}`}>
          {user.status}
        </span>
      </td>

      {/* Barre de boutons d'actions conforme à ton image */}
      <td className="text-right">
        <div className="inline-flex items-center gap-1">
          <button className="btn btn-square btn-xs btn-outline border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-ink rounded-lg shadow-sm">
            <Eye size={15} />
          </button>
          {user.status !== "BANNI" && (
            <button className="btn btn-square btn-xs btn-outline border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-ink rounded-lg shadow-sm">
              <Pencil size={15} />
            </button>
          )}
          <button className="btn btn-square btn-xs btn-outline border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:text-ink rounded-lg shadow-sm">
            <MoreHorizontal size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;