import { useRef, useState } from "react";
import NewUserModal from "../../components/admin/users/NewUserModal";
import PageHeader from "../../components/admin/PageHeader";
import UserDesktopRow from "../../components/admin/users/UserDesktopRow";
import UserFilters from "../../components/admin/users/UserFilters";
import EditUserModal from "../../components/admin/users/EditUserModal";
import UserMobileCard from "../../components/admin/users/UserMobileCard";
import Pagination from "../../components/ui/Pagination";
// import { useEffect } from "react";
import { authFetch } from "../../components/services/api";
import { useEffect } from "react";


function ManageUsers() {


  const [users, setUsers] = useState(null);

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

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getUsers = async () => {
      try {
        console.log("fetch lancé");

        const response = await authFetch("/users");
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("data :", data);
        setUsers(data);
      } catch (error) {
        console.error("Données api users non récupérées :", error);
      }
    };

    getUsers();
  }, []);

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
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users ? (
                users.map(user => (
                  <UserDesktopRow key={user.id} user={user} onEdit={() => handleOpenDetails(user)}/>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-sm text-gray-500">
                    Chargement des utilisateurs...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BLOC MOBILE */}
        <div className="block xl:hidden divide-y divide-gray-100">
          {users ? (
            users.map(user => (
              <UserMobileCard key={user.id} user={user} onEdit={()=> handleOpenDetails(user)}/>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              Chargement des utilisateurs...
            </div>
          )}
        </div>

        {/* Bloc Pagination unique et partagé */}
        {/* <TablePagination /> */}
        <Pagination 
          currentPage={currentPage}
          pageCount={3} // Par exemple, pour afficher 3 pages de mock data
          onPageChange={(page) => setCurrentPage(page)}
          isAdmin={true} // Activation magique du mode Admin !
          totalCount={1247}
          itemsPerPage={5}
        />

      </div>
      <NewUserModal modalRef={modalRef}/>
      <EditUserModal modalRef={detailsModalRef} user={selectedUser}/>
    </>
  );
}

export default ManageUsers;