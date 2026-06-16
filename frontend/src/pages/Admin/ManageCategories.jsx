import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import CategoryDesktopRow from "../../components/admin/categories/CategoryDesktopRow";
import CategoryMobileCard from "../../components/admin/categories/CategoryMobileCard";
import NewCategoryModal from "../../components/admin/categories/NewCategoryModal";
import EditCategoryModal from "../../components/admin/categories/EditCategoryModal";
import Pagination from "../../components/ui/Pagination";
import { getCategories } from "../../components/services/categoryService";
import { authFetch } from "../../components/services/api";

function ManageCategories() {
  const [categories, setCategories] = useState(null);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [fetchError, setFetchError] = useState("");

  const newCategoryModalRef = useRef(null);
  const editCategoryModalRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleOpenEdit = (category) => {
    setSelectedCategory(category);
    editCategoryModalRef.current?.showModal();
  };

  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      setCategories(data);
      setCategoriesCount(data.length);
      setFetchError("");
    } catch (error) {
      console.error("Donnees api categories non recuperees :", error);
      setFetchError(
        "Impossible de recuperer la liste des categories. Verifiez votre connexion et reessayez."
      );
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await getAllCategories();
    };

    void fetchCategories();
  }, []);

  const handleDeleteCategory = async (category) => {
  if (!window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement la catégorie "${category.name}" ? En cascade, toutes les annonces et requêtes liées seront supprimées.`)) {
    return;
  }

  try {
    const response = await authFetch(`/categories/${category.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new Error(body?.message || "Erreur lors de la suppression");
    }

    // On rafraîchit la liste des catégories après suppression réussie !
    await getAllCategories();
  } catch (err) {
    console.error("Erreur suppression catégorie :", err);
    setFetchError("Impossible de supprimer la catégorie. Réessayez plus tard.");
  }
};

  const paginatedCategories = categories
    ? categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title={"Categories"}
          subtitle={`${categoriesCount} categories d'annonces`}
        />
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => newCategoryModalRef.current?.showModal()}
            className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none"
          >
            <span>+</span> <span>Nouvelle categorie</span>
          </button>
        </div>
      </div>

      {fetchError && (
        <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          {fetchError}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="hidden xl:block overflow-x-auto">
          <table className="table table-md w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30 text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                <th>Categorie</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories === null ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-sm text-gray-500">
                    Chargement des categories...
                  </td>
                </tr>
              ) : paginatedCategories.length ? (
                paginatedCategories.map((category) => (
                  <CategoryDesktopRow
                    key={category.id}
                    category={category}
                    onEdit={() => handleOpenEdit(category)}
                    onDelete={handleDeleteCategory}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-sm text-gray-500">
                    {fetchError ? fetchError : "Aucune categorie trouvee."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="block xl:hidden divide-y divide-gray-100">
          {categories === null ? (
            <div className="p-6 text-center text-sm text-gray-500">
              Chargement des categories...
            </div>
          ) : paginatedCategories.length ? (
            paginatedCategories.map((category) => (
              <CategoryMobileCard
                key={category.id}
                category={category}
                onEdit={() => handleOpenEdit(category)}
              />
            ))
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              {fetchError ? fetchError : "Aucune categorie trouvee."}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          pageCount={Math.max(1, Math.ceil(categoriesCount / itemsPerPage))}
          onPageChange={(page) => setCurrentPage(page)}
          isAdmin={true}
          totalCount={categoriesCount}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <NewCategoryModal modalRef={newCategoryModalRef} onSuccess={getAllCategories}/>
      <EditCategoryModal
        modalRef={editCategoryModalRef}
        category={selectedCategory}
        onDelete={handleDeleteCategory}
      />
    </>
  );
}

export default ManageCategories;
