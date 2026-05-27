import { useState, useEffect } from "react";
import { X, ShieldAlert, Trash2, CheckCircle, AlertTriangle } from "lucide-react";

function EditAdModal({ modalRef, ad }) {
  // État local pour manipuler le statut de l'annonce
  const [status, setStatus] = useState("EN ATTENTE");

  // On synchronise le statut local dès que l'admin clique sur une autre annonce
  useEffect(() => {
    if (ad) {
      setStatus(ad.status);
    }
  }, [ad]);

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Logique MVP / Simulation de modification
    console.log(`Statut mis à jour pour l'annonce "${ad.title}" : ${status}`);
    modalRef.current?.close();
  };

  const handleDeleteAd = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement l'annonce "${ad.title}" ?`)) {
      console.log(`Annonce ${ad.id} supprimée définitivement.`);
      modalRef.current?.close();
    }
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-white text-ink p-6 rounded-t-2xl sm:rounded-2xl border border-gray-100 shadow-2xl relative max-w-md w-full">
        
        {/* BOUTON FERMER MATÉRIEL */}
        <button 
          type="button"
          onClick={() => modalRef.current?.close()} 
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-400 hover:text-ink hidden sm:flex"
        >
          <X size={16} />
        </button>

        {/* EN-TÊTE MODALE */}
        <div className="mb-6">
          <h3 className="font-black text-lg text-ink tracking-tight">
            Modérer l'annonce
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Auteur : <span className="font-bold text-gray-700">{ad?.author}</span> • Catégorie : <span className="font-medium text-gray-600">{ad?.category}</span>
          </p>
        </div>

        {/* APERÇU RAPIDE DE L'ANNONCE INTERNE */}
        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100/70 mb-5">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Titre de l'offre</h4>
          <p className="text-sm font-bold text-ink leading-snug">{ad?.title}</p>
          <span className="inline-block text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-2">
            Valeur : {ad?.price} UC
          </span>
        </div>

        {/* FORMULAIRE DES ACTIONS */}
        <form onSubmit={handleSaveChanges} className="space-y-5">
          
          {/* 1. SÉLECTION DU STATUT */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-600 text-xs">Statut de publication</span>
            </label>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered select-sm w-full rounded-xl bg-white border-gray-200 text-xs text-gray-700 font-semibold focus:outline-none"
            >
              <option value="EN ATTENTE">⏳ En attente de validation</option>
              <option value="VALIDÉE">✅ Validée (En ligne)</option>
              <option value="REFUSÉE">❌ Refusée / Rejetée</option>
              <option value="SIGNALÉE">⚠️ Signalée par la communauté</option>
            </select>
          </div>

          <div className="divider before:bg-gray-50 after:bg-gray-50 my-2"></div>

          {/* 2. ZONE DANGER : SUPPRESSION DÉFINITIVE */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <ShieldAlert size={14} /> Supprimer l'annonce
              </h4>
              <p className="text-[11px] text-rose-600/80 font-medium leading-relaxed">
                Retire définitivement cette publication de la plateforme. Cette action est immédiate et irréversible.
              </p>
            </div>
            <button 
              type="button" 
              onClick={handleDeleteAd}
              className="btn btn-square btn-sm btn-outline border-rose-200 hover:bg-rose-600 hover:border-rose-600 text-rose-500 hover:text-white rounded-lg shadow-none flex-none"
            >
              <Trash2 size={15} />
            </button>
          </div>

          {/* BOUTONS PIED DE PAGE */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-gray-50 mt-6">
            <button 
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn btn-sm btn-ghost rounded-xl text-xs font-bold text-gray-500"
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none">
              Enregistrer les modifications
            </button>
          </div>
        </form>

        {/* ASTUCE FERMETURE CLIC EXTÉRIEUR */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>

      </div>
    </dialog>
  );
}

export default EditAdModal;