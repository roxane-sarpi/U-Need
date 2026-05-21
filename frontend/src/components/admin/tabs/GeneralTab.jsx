// On imagine de faux composants d'onglets légers pour l'instant
function GeneralTab({ user }) {
  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
        <div><span className="text-gray-400 block font-medium">Ville</span><span className="font-bold text-gray-700">{user?.city}</span></div>
        <div><span className="text-gray-400 block font-medium">Solde actuel</span><span className="font-bold text-blue-600">{user?.balance} UC</span></div>
        <div className="col-span-2"><span className="text-gray-400 block font-medium">ID Utilisateur</span><span className="font-mono text-gray-500">#UN-{user?.id}9283</span></div>
      </div>
      <div>
        <h4 className="font-bold text-gray-700 mb-2 text-sm">Dernières Transactions</h4>
        <div className="border border-gray-100 rounded-xl divide-y divide-gray-100 bg-white">
          <div className="p-3 flex justify-between"><span>Achat "Pince multiprise"</span><span className="text-rose-500 font-bold">-5 UC</span></div>
          <div className="p-3 flex justify-between"><span>Bonus Inscription</span><span className="text-emerald-500 font-bold">+22 UC</span></div>
        </div>
      </div>
    </div>
  );
}

export default GeneralTab;