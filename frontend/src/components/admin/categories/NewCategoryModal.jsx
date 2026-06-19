import { useState, useRef } from "react";
import { authFetch } from "../../services/api";

function NewCategoryModal({ modalRef, onSuccess }) {
  const formRef = useRef(null);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Corrigé : initialisé à false au lieu de ""

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const trimmedName = formData.get("name")?.trim(); // Récupère la valeur grâce au name="name" ajouté plus bas

    if (!trimmedName) {
      setError("Le nom de la catégorie est obligatoire.");
      setFeedback("");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setFeedback("");

      // Note : J'ai changé '/ads' par '/categories' car vous créez une catégorie ici
      const response = await authFetch('/categories', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }), // stringify obligatoire pour correspondre au format JSON attendu
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const serverMessage =
          body?.message || response.statusText || "Erreur lors de la création";
        throw new Error(`HTTP ${response.status} - ${serverMessage}`);
      }

      setFeedback("Catégorie créée avec succès.");
      formRef.current?.reset(); // Vide le formulaire après le succès !

      if (onSuccess) {
        await onSuccess();
      }

      setTimeout(() => {
        modalRef.current?.close();
        setFeedback(""); // Nettoie le message de succès après fermeture
      }, 900);
    } catch (err) {
      console.error("L'api call categorie n'a pas abouti :", err);
      setError("Impossible de créer la catégorie. Réessayez plus tard.");
      setFeedback("");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <dialog
      ref={modalRef}
      className="modal modal-middle backdrop-blur-sm"
      onClick={(e) => {
        // Optionnel mais pro : ferme la modale si on clique à côté
        if (e.target === modalRef.current) {
          modalRef.current.close();
        }
      }}
    >
      <div className="modal-box max-w-md bg-white text-ink p-6 rounded-2xl border border-gray-100 shadow-2xl relative w-full">
        <h3 className="text-lg font-black text-ink mb-4 tracking-tight">
          Nouvelle catégorie
        </h3>
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5">
              Nom de la catégorie *
            </label>
            <input
              name="name" // INDISPENSABLE pour que FormData(e.target) puisse lire la valeur !
              type="text"
              placeholder="Ex: Bricolage"
              className="w-full input input-bordered input-sm rounded-xl border-gray-200 bg-white text-xs text-ink focus:outline-none focus:border-blue-500 font-semibold"
              required
            />
          </div>

          {/* BLOC DES MESSAGES DE FEEDBACK (IDENTIQUE À CELUI DU COMPTE USER) */}
          {(feedback || error) && (
            <div
              className={`rounded-xl p-3 text-xs font-semibold ${
                feedback
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  : "bg-rose-50 text-rose-700 border border-rose-100"
              }`}
            >
              {feedback || error}
            </div>
          )}

          {/* SOUBLOC BOUTONS PIED DE PAGE */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-6">
            <button
              type="button"
              onClick={() => modalRef.current?.close()}
              className="btn btn-sm btn-ghost rounded-xl text-xs font-bold text-gray-500"
              disabled={isSaving}
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSaving} // Désactive le bouton pendant le chargement
              className="btn btn-sm btn-primary text-white font-bold rounded-xl text-xs shadow-none"
            >
              {isSaving ? "Création..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default NewCategoryModal;