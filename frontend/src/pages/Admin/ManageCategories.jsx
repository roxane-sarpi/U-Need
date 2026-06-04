import { useRef, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import CategoryDesktopRow from "../../components/admin/categories/CategoryDesktopRow";
import CategoryMobileCard from "../../components/admin/categories/CategoryMobileCard";
import NewCategoryModal from "../../components/admin/categories/NewCategoryModal";
import EditCategoryModal from "../../components/admin/categories/EditCategoryModal";
import Pagination from "../../components/ui/Pagination";

function ManageCategories() {
  // Données mockées pour les catégories
  const mockCategories = [
    { id: 1, name: "Bricolage", description: "Travaux de bricolage et réparation", color: "#ff9eb5", isActive: true, adCount: 42 },
    { id: 2, name: "Jardinage", description: "Entretien de jardin et espaces verts", color: "#a5d8a5", isActive: true, adCount: 28 },
    { id: 3, name: "Déménagement", description: "Aide au déménagement et transport", color: "#9eb5ff", isActive: true, adCount: 15 },
    { id: 4, name: "Cours particuliers", description: "Soutien scolaire et cours à domicile", color: "#f0a5d8", isActive: false, adCount: 8 },
    { id: 5, name: "Informatique", description: "Dépannage et assistance informatique", color: "#d8d8a5", isActive: true, adCount: 33 },
  ];

  // Références pour les modales
  const newCategoryModalRef = useRef(null);
  const editCategoryModalRef = useRef(null);

  // État pour la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState(null);

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction pour ouvrir la modale d'édition
  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    editCategoryModalRef.current?.showModal();
  };

  return (
    <>
      {/* En-tête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title={"Catégories"}
          subtitle={"Gérez les catégories d'annonces"}
        />
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => newCategoryModalRef.current?.showModal()}
            className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none"
          >
            <span>+</span> <span>Nouvelle catégorie</span>
          </button>
        </div>
      </div>

      {/* Conteneur de données */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* BLOC DESKTOP */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="table table-md w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30 text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                <th>Catégorie</th>
                <th>Description</th>
                <th>Couleur</th>
                <th>Statut</th>
                <th>Annonces</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCategories.map((category) => (
                <CategoryDesktopRow
                  key={category.id}
                  category={category}
                  onEdit={() => handleOpenEdit(category)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* BLOC MOBILE */}
        <div className="block xl:hidden divide-y divide-gray-100">
          {mockCategories.map((category) => (
            <CategoryMobileCard
              key={category.id}
              category={category}
              onEdit={() => handleOpenEdit(category)}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          pageCount={3}
          onPageChange={(page) => setCurrentPage(page)}
          isAdmin={true}
          totalCount={mockCategories.length}
          itemsPerPage={5}
        />
      </div>

      {/* Modales */}
      <NewCategoryModal modalRef={newCategoryModalRef} />
      <EditCategoryModal
        modalRef={editCategoryModalRef}
        category={selectedCategory}
      />
    </>
  );
}

export default ManageCategories;