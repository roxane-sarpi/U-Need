import { X } from "lucide-react";

function NewUserModal({ modalRef }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu géreras la logique d'envoi vers ton API plus tard
    console.log("Nouvel utilisateur créé !");
    
    // Fermeture automatique de la modale après soumission
    modalRef.current?.close();
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      {/* modal-box : le conteneur blanc */}
      <div className="modal-box bg-white text-ink p-6 rounded-t-2xl sm:rounded-2xl border border-gray-100 shadow-2xl relative max-w-md w-full">
        
        {/* BOUTON FERMER (Petite croix en haut à droite, masquée sur le bas mobile car moins accessible) */}
        <form method="dialog">
          <button type="button" onClick={() => modalRef.current?.close()} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-400 hover:text-ink hidden sm:flex">
            <X size={16} />
          </button>
        </form>

        {/* TITRE */}
        <div className="mb-6">
          <h3 className="font-black text-lg text-ink tracking-tight">
            Nouvel utilisateur
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Ajoutez un membre et attribuez-lui un rôle sur U-Need.
          </p>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Nom */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-600 text-xs">Nom complet</span>
            </label>
            <input 
              type="text" 
              placeholder="Ex: Lucas Martin" 
              required
              className="input input-bordered input-sm w-full rounded-xl bg-white border-gray-200 text-xs text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Champ Email */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-600 text-xs">Adresse Email</span>
            </label>
            <input 
              type="email" 
              placeholder="Ex: l.martin@u-need.fr" 
              required
              className="input input-bordered input-sm w-full rounded-xl bg-white border-gray-200 text-xs text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Champ Ville */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-600 text-xs">Ville</span>
            </label>
            <input 
              type="text" 
              placeholder="Ex: Marseille" 
              required
              className="input input-bordered input-sm w-full rounded-xl bg-white border-gray-200 text-xs text-ink focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Sélecteur de Rôle */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-600 text-xs">Rôle initial</span>
            </label>
            <select 
              defaultValue="USER"
              className="select select-bordered select-sm w-full rounded-xl bg-white border-gray-200 text-xs text-gray-700 font-medium"
            >
              <option value="USER">Utilisateur (USER)</option>
              <option value="MODÉRATEUR">Modérateur</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          {/* BOUTONS D'ACTION (S'adaptent en ligne/colonne selon l'écran) */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-gray-50 mt-6">
            {/* Bouton Annuler (ferme la modale grâce au type="button" et méthode HTML native) */}
            <button 
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn btn-sm btn-ghost rounded-xl text-xs font-bold text-gray-500"
            >
              Annuler
            </button>
            {/* Bouton Soumettre */}
            <button 
              type="submit"
              className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none"
            >
              Créer l'utilisateur
            </button>
          </div>
        </form>

      </div>
    </dialog>
  );
}

export default NewUserModal;