import { Search} from "lucide-react";

function UserFilters() {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Grille des champs de saisie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1 max-w-5xl">
        
        {/* Recherche avec loupe */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={16} />
          <input 
            type="text" 
            placeholder="Rechercher par pseudo, email, ville..." 
            className="input input-bordered input-sm w-full pl-9 rounded-lg bg-white border-gray-200 text-xs focus:outline-none focus:border-blue-500 text-gray-600"
          />
        </div>

        {/* Filtre Rôle */}
        <select 
  defaultValue="" 
  className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium"
>
  <option value="" disabled>Rôle</option>
          <option>Utilisateur</option>
          <option>Modérateur</option>
          <option>Admin</option>
        </select>

        {/* Filtre Statut */}
        <select defaultValue=""  className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium">
          <option disabled value="">Statut</option>
          <option>Actif</option>
          <option>Suspendu</option>
          <option>Banni</option>
        </select>

        {/* Filtre Date */}
        <select defaultValue=""  className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium">
          <option disabled value="">Date d'inscription</option>
          <option>Du plus récent au plus ancien</option>
          <option>Du plus ancien au plus récent</option>
        </select>
      </div>
    </div>
  );
}

export default UserFilters;