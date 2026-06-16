import { useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import Pagination from "../../components/ui/Pagination"; // Ton composant réutilisé !
import AdDesktopRow from "../../components/admin/ads/AdDesktopRow";
import AdMobileCard from "../../components/admin/ads/AdMobileCard";
import AdFilters from "../../components/admin/ads/AdFilters";
import EditAdModal from "../../components/admin/ads/EditAdModal";
import { getAds } from "../../components/services/adService";

function ManageAds() {

  // Variables
  const [ads, setAds] = useState(null);
  const [adsCount, setAdsCount] = useState(0);
  const [fetchError, setFetchError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const editModalRef = useRef(null);
  const [selectedAd, setSelectedAd] = useState(null);

  const handleOpenEdit = (ad) => {
    setSelectedAd(ad);
    editModalRef.current?.showModal();
  };

  const handleResetFilters = () => {
    setSearchText("");
    setSelectedStatus("");
    setSelectedCategory("");
    setSortOrder("");
    setCurrentPage(1);
  };

  const getAllAds = async () => {
    try {
      const data = await getAds();
      setAds(data);
      setAdsCount(data.length);
      setFetchError("");
    } catch (error) {
      console.error("Données api annonces non récupérées :", error);
      setFetchError("Impossible de récupérer la liste des annonces. Vérifiez votre connexion et réessayez.");
    }
  };

  useEffect(() => {
    const fetchAds = async () => {
      await getAllAds();
    };

    void fetchAds();
  }, []);

  const filteredAds = useMemo(() => {
    if (!ads) return [];

    const query = searchText.trim().toLowerCase();

    return ads
      .filter((ad) => {
        const matchesText =
          query === "" ||
          [ad.title, ad.firstname, ad.lastname, ad.category_name]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(query));

        const matchesStatus = selectedStatus
          ? ad.status?.toLowerCase() === selectedStatus.toLowerCase()
          : true;

        const matchesCategory = selectedCategory
          ? ad.category_name?.toLowerCase() === selectedCategory.toLowerCase()
          : true;

        return matchesText && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        if (sortOrder === "recent") {
          return new Date(b.date_creation) - new Date(a.date_creation);
        }
        if (sortOrder === "oldest") {
          return new Date(a.date_creation) - new Date(b.date_creation);
        }
        return 0;
      });
  }, [ads, searchText, selectedStatus, selectedCategory, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filteredAds.length / itemsPerPage));
  const displayedAds = filteredAds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title={"Annonces"} subtitle={`${adsCount} annonces enregistrées`} />
      </div>

      {/* Barre de filtrage spécifique aux annonces */}
      <AdFilters
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onReset={handleResetFilters}
      />

      {fetchError && (
        <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          {fetchError}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
        {/* BLOC DESKTOP */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="table table-md w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30 text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                <th>Annonce</th>
                <th>Auteur</th>
                <th>Catégorie</th>
                <th>Prix (UC)</th>
                <th>Date de dépôt</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ads === null ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-sm text-gray-500">
                    Chargement des annonces...
                  </td>
                </tr>
              ) : displayedAds.length ? (
                displayedAds.map((ad) => (
                  <AdDesktopRow
                    key={ad.id}
                    ad={ad}
                    onEdit={() => handleOpenEdit(ad)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-sm text-gray-500">
                    {fetchError ? fetchError : "Aucune annonce trouvée."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BLOC MOBILE */}
        <div className="block xl:hidden divide-y divide-gray-100">
          {ads === null ? (
            <div className="p-6 text-center text-sm text-gray-500">Chargement des annonces...</div>
          ) : displayedAds.length ? (
            displayedAds.map((ad) => (
              <AdMobileCard
                key={ad.id}
                ad={ad}
                onEdit={() => handleOpenEdit(ad)}
              />
            ))
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              {fetchError ? fetchError : "Aucune annonce trouvée."}
            </div>
          )}
        </div>

        {/* Ton composant de pagination réutilisé avec la prop isAdmin */}
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={(page) => setCurrentPage(page)}
          isAdmin={true}
          totalCount={filteredAds.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Modale d'action (Changement statut / Suppression) */}
      <EditAdModal modalRef={editModalRef} ad={selectedAd} onSuccess={getAllAds} key={selectedAd?.id} />
    </>
  );
}

export default ManageAds;