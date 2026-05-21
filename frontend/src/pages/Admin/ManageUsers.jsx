import PageHeader from "../../components/admin/PageHeader";
import UserFilters from "../../components/admin/UserFilters";
import UserRow from "../../components/admin/UserRow";

function ManageUsers(){
  const mockUsers = [
    { id: 1, name: "Lucas Martin", email: "l.martin@u-need.fr", city: "Marseille", role: "USER", balance: 17, joined: "03/04/2026", status: "ACTIF" },
    { id: 2, name: "Sophie Bernard", email: "s.bernard@u-need.fr", city: "Paris", role: "MODÉRATEUR", balance: 42, joined: "28/03/2026", status: "ACTIF" },
    { id: 3, name: "Thomas Petit", email: "t.petit@u-need.fr", city: "Lyon", role: "USER", balance: 3, joined: "22/03/2026", status: "SUSPENDU" },
    { id: 4, name: "Emma Dubois", email: "e.dubois@u-need.fr", city: "Lille", role: "USER", balance: 24, joined: "15/03/2026", status: "ACTIF" },
    { id: 5, name: "Jean Dupuis", email: "j.dupuis@u-need.fr", city: "Nantes", role: "USER", balance: 0, joined: "08/03/2026", status: "BANNI" },
  ];

  return(
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title={"Utilisateurs"} subtitle={"1 247 utilisateurs enregistrés"} />
        
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none">
            <span>+</span> <span>Nouvel utilisateur</span>
          </button>
        </div>
      </div>

      {/* 2. ZONE DE FILTRAGE */}
      <UserFilters />

      {/* 3. TABLEAU OU CONTENEUR DE CARTES */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Rendu Bureau (Affiche le grand tableau) */}
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
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Rendu Mobile/Tablette (Transforme les lignes en cartes indépendantes) */}
        <div className="block xl:hidden divide-y divide-gray-100">
          {mockUsers.map(user => (
            <div key={user.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div>
                    <h4 className="font-bold text-sm text-ink">{user.name}</h4>
                    <p className="text-sm text-gray-400 font-medium">{user.email}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md">
                  {user.balance} U-coins
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex gap-2">
                  <span className="text-gray-500 font-semibold">{user.city}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400">Inscrit le {user.joined}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{user.role}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">{user.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. SYSTÈME DE PAGINATION (Identique à ta maquette d9e40e) */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/20">
          <span className="text-xs text-gray-400 font-medium">
            Affichage de 1-8 sur 1 247
          </span>
          
          <div className="join gap-1 bg-transparent">
            <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-7 h-7">‹</button>
            <button className="join-item btn btn-xs bg-blue-600 border-blue-600 text-white rounded-lg w-7 h-7 font-bold text-xs">1</button>
            <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-7 h-7 text-xs font-semibold">2</button>
            <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-7 h-7 text-xs font-semibold">3</button>
            <button className="join-item btn btn-xs border-none bg-transparent text-gray-400 cursor-default pointer-events-none w-6 h-7">...</button>
            <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-7 h-7 text-xs font-semibold">156</button>
            <button className="join-item btn btn-xs border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 rounded-lg shadow-sm w-7 h-7">›</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default ManageUsers;