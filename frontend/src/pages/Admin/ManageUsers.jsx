import { useRef, useState, useEffect, useMemo } from "react";
import PageHeader from "../../components/admin/PageHeader";
import UserDesktopRow from "../../components/admin/users/UserDesktopRow";
import UserFilters from "../../components/admin/users/UserFilters";
import EditUserModal from "../../components/admin/users/EditUserModal";
import UserMobileCard from "../../components/admin/users/UserMobileCard";
import Pagination from "../../components/ui/Pagination";
import { authFetch } from "../../components/services/api";

function ManageUsers() {

  //Variables
  const [users, setUsers] = useState(null);
  const [usersCount,setUsersCount] = useState(0);
  const [fetchError, setFetchError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Création d'une boîte vide pour stocker notre modale
  const detailsModalRef = useRef(null);

  // État pour savoir quel utilisateur afficher dans la modale de détails
  const [selectedUser, setSelectedUser] = useState(null);

  // Fonctions
  const handleOpenDetails = (user) => {
    setSelectedUser(user); // On mémorise le user cliqué
    detailsModalRef.current?.showModal(); // On ouvre la modale d'historique
  };

  const getUsers = async () => {
    try {
      const response = await authFetch("/users");
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
      setUsersCount(data.length);
      setFetchError("");
    } catch (error) {
      setFetchError("Impossible de récupérer la liste des utilisateurs. Vérifiez votre connexion et réessayez.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      await getUsers();
    };

    void fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    const q = searchText.trim().toLowerCase();

    const filtered = users.filter((u) => {
      const matchesText = q === "" || [u.firstname, u.lastname, u.email, u.city]
        .filter(Boolean)
        .some((s) => s.toLowerCase().includes(q));

      const matchesRole = selectedRole ? (u.role && u.role.toLowerCase() === selectedRole.toLowerCase()) : true;

      return matchesText && matchesRole;
    });

    if (sortOrder === "recent") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return filtered;
  }, [users, searchText, selectedRole, sortOrder]);

  const filteredCount = filteredUsers.length;

  const handleResetFilters = () => {
    setSearchText("");
    setSelectedRole("");
    setSortOrder("");
    setCurrentPage(1);
  };

  return (
    <>
      {/* En-tête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <PageHeader title={"Utilisateurs"} subtitle={`${usersCount} utilisateurs enregistrés`} />
      </div>

      {/* Zone de filtrage */}
      <UserFilters
        searchText={searchText}
        onSearchTextChange={setSearchText}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onReset={handleResetFilters}
      />

      {fetchError && (
        <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          {fetchError}
        </div>
      )}

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
              {users === null ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-sm text-gray-500">
                    Chargement des utilisateurs...
                  </td>
                </tr>
              ) : filteredUsers.length ? (
                filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(user => (
                  <UserDesktopRow key={user.id} user={user} onEdit={() => handleOpenDetails(user)}/>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-sm text-gray-500">
                    {fetchError ? fetchError : 'Aucun utilisateur trouvé.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* BLOC MOBILE */}
        <div className="block xl:hidden divide-y divide-gray-100">
          {users === null ? (
            <div className="p-6 text-center text-sm text-gray-500">Chargement des utilisateurs...</div>
          ) : filteredUsers.length ? (
            filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(user => (
              <UserMobileCard key={user.id} user={user} onEdit={()=> handleOpenDetails(user)}/>
            ))
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">{fetchError ? fetchError : 'Aucun utilisateur trouvé.'}</div>
          )}
        </div>

        {/* Bloc Pagination unique et partagé */}
        {/* <TablePagination /> */}
        <Pagination 
          currentPage={currentPage}
          pageCount={Math.max(1, Math.ceil(filteredCount / itemsPerPage))}
          onPageChange={(page) => setCurrentPage(page)}
          isAdmin={true}
          totalCount={filteredCount}
          itemsPerPage={itemsPerPage}
        />

      </div>
      <EditUserModal modalRef={detailsModalRef} user={selectedUser} onSuccess={getUsers} />
    </>
  );
}

export default ManageUsers;