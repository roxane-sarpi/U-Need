import { useRef } from "react";

function NewCategoryModal({ modalRef }) {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour ajouter une nouvelle catégorie
    console.log("Nouvelle catégorie ajoutée");
    modalRef.current?.close();
  };

  return (
    <dialog
      ref={modalRef}
      className="modal modal-middle backdrop-blur-sm"
    >
      <div className="modal-box max-w-md rounded-2xl p-0">
        <div className="p-6">
          <h3 className="text-lg font-bold text-ink mb-4">Nouvelle catégorie</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Nom *
              </label>
              <input
                type="text"
                placeholder="Ex: Bricolage"
                className="w-full input input-bordered input-sm rounded-lg border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Description
              </label>
              <textarea
                placeholder="Description de la catégorie"
                className="w-full textarea textarea-bordered textarea-sm rounded-lg border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Couleur
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value="#ff9eb5"
                  className="w-8 h-8 rounded-lg border border-gray-200 p-0"
                />
                <span className="text-sm text-ink/60">#ff9eb5</span>
              </div>
            </div>
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
                className="btn btn-sm btn-primary rounded-xl text-white"
              >
                Créer
              </button>
            </div>
          </form>
        </div>
        </div>
      </dialog>
    );
}

export default NewCategoryModal;