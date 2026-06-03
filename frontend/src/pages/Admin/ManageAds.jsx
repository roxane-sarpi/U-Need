import { useRef, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import Pagination from "../../components/ui/Pagination"; // Ton composant réutilisé !
import AdDesktopRow from "../../components/admin/ads/AdDesktopRow";
import AdMobileCard from "../../components/admin/ads/AdMobileCard";
import AdFilters from "../../components/admin/ads/AdFilters";
import EditAdModal from "../../components/admin/ads/EditAdModal";

function ManageAds() {
  const mockAds = [
    { id: 1, title: "Perceuse à percussion Makita", author: "Lucas Martin", category: "Bricolage", price: 5, date: "20/05/2026", status: "EN ATTENTE" },
    { id: 2, title: "Tonte de pelouse / Jardinage", author: "Sophie Bernard", category: "Jardin", price: 15, date: "19/05/2026", status: "VALIDÉE" },
    { id: 3, title: "Cours de soutien Mathématiques", author: "Thomas Petit", category: "Services", price: 20, date: "18/05/2026", status: "SIGNALÉE" },
    { id: 4, title: "Canapé d'angle convertible", author: "Emma Dubois", category: "Maison", price: 50, date: "15/05/2026", status: "VALIDÉE" },
  ];

  const editModalRef = useRef(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpenEdit = (ad) => {
    setSelectedAd(ad);
    editModalRef.current?.showModal();
  };

 

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title={"Annonces"} subtitle={"412 annonces en ligne sur la plateforme"} />
      </div>

      {/* Barre de filtrage spécifique aux annonces */}
      <AdFilters />

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
              {mockAds.map(ad => (
                <AdDesktopRow
                  key={ad.id} 
                  ad={ad} 
                  onEdit={() => handleOpenEdit(ad)} 
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* BLOC MOBILE */}
        <div className="block xl:hidden divide-y divide-gray-100">
          {mockAds.map(ad => (
            <AdMobileCard 
              key={ad.id} 
              ad={ad} 
              onEdit={() => handleOpenEdit(ad)} 
            />
          ))}
        </div>

        {/* Ton composant de pagination réutilisé avec la prop isAdmin */}
        <Pagination 
          currentPage={currentPage}
          pageCount={2}
          onPageChange={(page) => setCurrentPage(page)}
          isAdmin={true}
          totalCount={412}
          itemsPerPage={8}
        />
      </div>

      {/* Modale d'action (Changement statut / Suppression) */}
      <EditAdModal modalRef={editModalRef} ad={selectedAd} key={selectedAd?.id} />
    </>
  );
}

export default ManageAds;