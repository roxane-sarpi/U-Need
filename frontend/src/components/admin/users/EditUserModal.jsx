import { useState } from "react";
import { X, ShieldAlert, Trash2} from "lucide-react";
import { authFetch } from "../../services/api";

function EditUserModal({ modalRef, user, onSuccess }) {
  // États locaux pour manipuler le rôle et l'ajustement du solde
  const [role, setRole] = useState(user?.role || "USER");
  const [pointsAdjustment, setPointsAdjustment] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rawValues = Object.fromEntries(formData);
    const formValues = {
      ...rawValues,
      points: rawValues.points !== "" ? Number(rawValues.points) : undefined,
    };

    if (formValues.points === undefined) {
      delete formValues.points;
    }

    try {
      setIsSaving(true);
      setError("");
      setFeedback("");

      const response = await authFetch(`/users/${user?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const serverMessage = body?.message || response.statusText || "Erreur lors de la mise à jour";
        throw new Error(`HTTP ${response.status} - ${serverMessage}`);
      }

      await response.json();
      setFeedback("Utilisateur mis à jour avec succès.");
      setError("");
      if (onSuccess) {
        await onSuccess();
      }
      setTimeout(() => {
        modalRef.current?.close();
      }, 900);
    } catch (err) {
      console.error("L'api call n'a pas abouti :", err);
      setError("Impossible de mettre à jour le compte. Vérifiez les données et réessayez.");
      setFeedback("");
    } finally {
      setIsSaving(false);
    }
  }

  const handleAnonymize = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer et anonymiser les données de ${user.firstname} ${user.lastname} ? Cette action est irréversible.`)) {
      console.log(`Utilisateur ${user.id} anonymisé conformément au RGPD.`);
      modalRef.current?.close();
    }
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle" onClick={(e) => {
    // Si l'élément cliqué est le <dialog> lui-même (et non la modal-box à l'intérieur)
    if (e.target === modalRef.current) {
      modalRef.current.close();
    }
  }}>
      <div className="modal-box bg-white text-ink p-6 rounded-t-2xl sm:rounded-2xl border border-gray-100 shadow-2xl relative max-w-md w-full">
        
        {/* BOUTON FERMER */}
        <button 
          type="button"
          onClick={() => modalRef.current?.close()} 
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-400 hover:text-ink hidden sm:flex"
        >
          <X size={16} />
        </button>

        {/* EN-TÊTE CHANGER DE USER */}
        <div className="mb-6">
          <h3 className="font-black text-lg text-ink tracking-tight">
            Modifier le membre
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Actions rapides sur le compte de <span className="font-bold text-gray-700">{user?.firstname} {user?.lastname}</span>
          </p>
        </div>

        {/* FORMULAIRE DES ACTIONS COMPACTES */}
        <form onSubmit={handleSaveChanges} className="space-y-5">
          
          {/* 1. ACTION RÔLE */}
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-gray-600 text-xs">Rôle sur la plateforme</span>
            </label>
            <select
              name = "role" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select select-bordered select-sm w-full rounded-xl bg-white border-gray-200 text-xs text-gray-700 font-semibold"
            >
              <option value="user">Utilisateur</option>
              {/* <option value="moderateur">Modérateur</option> */}
              <option value="admin">Administrateur</option>
            </select>
          </div>

          {/* 2. ACTION AJUSTEMENT SOLDE */}
          <div className="form-control">
            <label className="label py-1 flex justify-between items-center">
              <span className="label-text font-bold text-gray-600 text-xs">Ajuster le solde</span>
              <span className="text-[11px] font-medium text-gray-400">Solde actuel : {user?.points} UC</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                name = "points" 
                type="number" 
                placeholder="Ex: 50 ou -30"
                value={pointsAdjustment === 0 ? "" : pointsAdjustment}
                onChange={(e) => setPointsAdjustment(Number(e.target.value))}
                className="input input-bordered input-sm w-full rounded-xl bg-white border-gray-200 text-xs text-ink focus:outline-none focus:border-blue-500 font-bold"
              />
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap">U-coins</span>
            </div>
          </div>

          <div className="divider before:bg-gray-50 after:bg-gray-50 my-2"></div>

          {(feedback || error) && (
            <div className={`rounded-xl p-3 text-sm ${feedback ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
              {feedback || error}
            </div>
          )}

          {/* 3. ZONE DANGER : SUPPRESSION RGPD */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <ShieldAlert size={14} /> Supprimer le compte
              </h4>
              <p className="text-[11px] text-rose-600/80 font-medium leading-relaxed">
                Efface définitivement les infos privées. Le profil deviendra anonyme pour préserver l'historique de l'application.
              </p>
            </div>
            <button 
              type="button" 
              onClick={handleAnonymize}
              className="btn btn-square btn-sm btn-outline border-rose-200 hover:bg-rose-600 hover:border-rose-600 text-rose-500 hover:text-white rounded-lg shadow-none flex-none"
            >
              <Trash2 size={15} />
            </button>
          </div>

          {/* SOUBLOC BOUTONS PIED DE PAGE */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4 border-t border-gray-50 mt-6">
            <button 
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn btn-sm btn-ghost rounded-xl text-xs font-bold text-gray-500"
            >
              Annuler
            </button>
            <button type="submit" disabled={isSaving} className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none">
              {isSaving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>

      </div>
    </dialog>
  );
}

export default EditUserModal;