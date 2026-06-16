import { useState } from "react";
import { updateCategory } from "../../services/categoryService";

function EditCategoryModal({ modalRef, category, onSuccess }) {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const trimmedName = formData.get("name").trim();
    if (!trimmedName) {
      setError("Le nom de la categorie est obligatoire.");
      setFeedback("");
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setFeedback("");

      const response = await updateCategory(category.id, { name: trimmedName });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const serverMessage =
          body?.message || response.statusText || "Erreur lors de la mise a jour";
        throw new Error(`HTTP ${response.status} - ${serverMessage}`);
      }

      setFeedback("Categorie mise a jour avec succes.");
      if (onSuccess) {
        await onSuccess();
      }

      setTimeout(() => {
        modalRef.current?.close();
      }, 900);
    } catch (err) {
      console.error("L'api call categorie n'a pas abouti :", err);
      setError("Impossible de mettre a jour la categorie. Reessayez plus tard.");
      setFeedback("");
    } finally {
      setIsSaving(false);
    }
  };

  if (!category) return null;

  return (
    <dialog
      ref={modalRef}
      className="modal modal-middle backdrop-blur-sm"
    >
      <div className="modal-box max-w-md rounded-2xl p-0">
        <div className="p-6">
          <h3 className="text-lg font-bold text-ink mb-4">Modifier la categorie</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Nom *
              </label>
              <input
                key={category.id}
                name="name"
                type="text"
                defaultValue={category.name}
                className="w-full input input-bordered input-sm rounded-lg border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            {(feedback || error) && (
              <div
                className={`rounded-xl p-3 text-sm ${
                  feedback
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-rose-50 text-rose-700 border border-rose-100"
                }`}
              >
                {feedback || error}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => modalRef.current?.close()}
                className="btn btn-sm btn-ghost rounded-xl text-ink/60 hover:text-ink"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-sm btn-primary rounded-xl text-white"
              >
                {isSaving ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default EditCategoryModal;
