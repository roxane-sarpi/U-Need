import { useEffect, useRef } from "react";

function EditCategoryModal({ modalRef, category }) {
  const formRef = useRef(null);

  // Remplir le formulaire avec les données de la catégorie sélectionnée
  useEffect(() => {
    if (category && formRef.current) {
      formRef.current.reset();
      // Ici, vous pourriez utiliser useState pour gérer les valeurs du formulaire
      // ou utiliser formRef pour accéder aux champs et les remplir
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour éditer la catégorie
    console.log("Catégorie modifiée");
    modalRef.current?.close();
  };

  if (!category) return null;

  return (
    <dialog
      ref={modalRef}
      className="modal modal-middle backdrop-blur-sm"
    >
      <div className="modal-box max-w-md rounded-2xl p-0">
        <div className="p-6">
          <h3 className="text-lg font-bold text-ink mb-4">Modifier la catégorie</h3>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Nom *
              </label>
              <input
                type="text"
                defaultValue={category.name}
                className="w-full input input-bordered input-sm rounded-lg border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">
                Description
              </label>
              <textarea
                defaultValue={category.description}
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
                  defaultValue={category.color}
                  className="w-8 h-8 rounded-lg border border-gray-200 p-0"
                />
                <span className="text-sm text-ink/60">{category.color}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={category.isActive}
                  className="toggle toggle-primary toggle-sm"
                />
                <span className="text-sm font-medium text-ink">
                  Catégorie active
                </span>
              </label>
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
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default EditCategoryModal;