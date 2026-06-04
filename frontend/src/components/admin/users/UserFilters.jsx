import { Search } from "lucide-react";

function UserFilters({
  searchText,
  onSearchTextChange,
  selectedRole,
  onRoleChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Grille des champs de saisie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1 max-w-5xl">
        
        {/* Recherche avec loupe */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input 
            type="text" 
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            placeholder="Rechercher par pseudo, email, ville..." 
            className="input input-bordered input-sm w-full pl-9 rounded-lg bg-white border-gray-200 text-xs focus:outline-none focus:border-blue-500 text-gray-600"
          />
        </div>

        {/* Filtre Rôle */}
        <select 
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium"
        >
          <option value="">Tous les rôles</option>
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>


  

        {/* Filtre Date */}
        <select value={sortOrder} onChange={(e) => onSortOrderChange(e.target.value)} className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium">
          <option value="">Tri</option>
          <option value="recent">Du plus récent au plus ancien</option>
          <option value="oldest">Du plus ancien au plus récent</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={onReset} className="btn btn-sm btn-ghost rounded-xl text-xs font-bold bg-blue-600 border-blue-600 text-white hover:bg-blue-700">Réinitialiser</button>
      </div>
    </div>
  );
}

export default UserFilters;