import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categoryService";

function AdFilters({
  searchText,
  onSearchTextChange,
  selectedStatus,
  onStatusChange,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Impossible de charger les catégories :", error);
      }
    };

    void fetchCategories();
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mt-6">
      
      {/* Grille des champs de filtrage selon le cahier des charges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1 max-w-5xl">
        
        {/* 1. FILTRE AUTEUR/TITRE (Recherche textuelle) */}
        <div className="relative w-full">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" 
            size={16} 
          />
          <input 
            type="text" 
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            placeholder="Rechercher une annonce"
            className="input input-bordered input-sm w-full pl-9 rounded-lg bg-white border-gray-200 text-xs focus:outline-none focus:border-blue-500 text-gray-700 font-medium"
          />
        </div>

        {/* 2. FILTRE STATUT */}
        <select 
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium focus:outline-none"
        >
          <option value="" disabled>Statut de l'annonce</option>
          <option value="en cours">En cours</option>
          <option value="disponible">Disponible</option>
          <option value="validée">Validée</option>
        </select>

        {/* 3. FILTRE CATÉGORIE */}
        <select 
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium focus:outline-none"
        >
          <option value="" disabled>Catégorie</option>
          {categories.map((category) => (
            <option key={category.id ?? category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* 4. FILTRE DATE */}
        <select 
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          className="select select-bordered select-sm w-full rounded-lg bg-white border-gray-200 text-xs text-gray-500 font-medium focus:outline-none"
        >
          <option value="" disabled>Date de publication</option>
          <option value="recent">Les plus récentes</option>
          <option value="oldest">Les plus anciennes</option>
        </select>
      </div>

      {/* Bouton de réinitialisation rapide, très pratique pour l'expérience d'administration */}
      <button 
        type="button"
        onClick={onReset}
        className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors self-start lg:self-auto px-2 whitespace-nowrap"
      >
        Réinitialiser
      </button>

    </div>
  );
}

export default AdFilters;