import { useRef, useState } from "react";
import NewUserModal from "../../components/admin/NewUserModal";
import PageHeader from "../../components/admin/PageHeader";
import TablePagination from "../../components/admin/TablePagination";
import UserDesktopRow from "../../components/admin/UserDesktopRow";
import UserFilters from "../../components/admin/UserFilters";
import UserMobileRow from "../../components/admin/UserMobileCard";
import UserDetailsModal from "../../components/admin/UserDetailsModal";


function ManageUsers() {

  const mockUsers = [
  { id: 1, name: "Lucas Martin", email: "l.martin@u-need.fr", city: "Marseille", role: "USER", balance: 17, joined: "03/04/2026", status: "ACTIF" },
  { id: 2, name: "Sophie Bernard", email: "s.bernard@u-need.fr", city: "Paris", role: "MODÉRATEUR", balance: 42, joined: "28/03/2026", status: "ACTIF" },
  { id: 3, name: "Thomas Petit", email: "t.petit@u-need.fr", city: "Lyon", role: "USER", balance: 3, joined: "22/03/2026", status: "SUSPENDU" },
  { id: 4, name: "Emma Dubois", email: "e.dubois@u-need.fr", city: "Lille", role: "USER", balance: 24, joined: "15/03/2026", status: "ACTIF" },
  { id: 5, name: "Jean Dupuis", email: "j.dupuis@u-need.fr", city: "Nantes", role: "USER", balance: 0, joined: "08/03/2026", status: "BANNI" },
];

  // 1. On crée une boîte vide pour stocker notre modale
  const modalRef = useRef(null);
  const detailsModalRef = useRef(null);

  // État pour savoir quel utilisateur afficher dans la modale de détails
  const [selectedUser, setSelectedUser] = useState(null);

  // Fonction magique déclenchée au clic sur l'œil
  const handleOpenDetails = (user) => {
    setSelectedUser(user); // On mémorise le user cliqué
    detailsModalRef.current?.showModal(); // On ouvre la modale d'historique
  };

  return (
    <>
      {/* En-tête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title={"Utilisateurs"} subtitle={"1 247 utilisateurs enregistrés"} />
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button onClick={() => modalRef.current?.showModal()} className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none">
            <span>+</span> <span>Nouvel utilisateur</span>
          </button>
        </div>
      </div>

      {/* Zone de filtrage */}
      <UserFilters />

      {/* Conteneur de données unique */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* BLOC DESKTOP */}
        <div className="hidden xl:block overflow-x-auto">
          <table className="table table-md w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30 text-gray-400 font-bold text-[10px] uppercase tracking-wider">
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Ville</th>
                <th>Rôle</th>
                <th>Solde</th>
                <th>Inscription</th>
                <th>Statut</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map(user => (
                <UserDesktopRow key={user.id} user={user} onViewDetails={() => handleOpenDetails(user)}/>
              ))}
            </tbody>
          </table>
        </div>

        {/* BLOC MOBILE */}
        <div className="block xl:hidden divide-y divide-gray-100">
          {mockUsers.map(user => (
            <UserMobileRow key={user.id} user={user} onViewDetails={() => handleOpenDetails(user)}/>
          ))}
        </div>

        {/* Bloc Pagination unique et partagé */}
        <TablePagination />

      </div>
      <NewUserModal modalRef={modalRef}/>
      <UserDetailsModal modalRef={detailsModalRef} user={selectedUser} />
    </>
  );
}

export default ManageUsers;