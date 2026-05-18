import React, { useState, useRef } from 'react';

function Adform() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    zipCode: '',
    city: '',
    uCoins: 3, // Valeur par défaut
    isUrgent: false,
  });

  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCoinSelect = (value) => {
    setFormData((prev) => ({ ...prev, uCoins: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
  };

  // Configuration des styles pour les boutons de pièces
  const coinStyles = {
    1: { bg: 'bg-[#f3f0ff]', text: 'text-[#7048e8]', border: 'border-[#d0bfff]', },
    2: { bg: 'bg-[#d5d1f5cf]', text: 'text-[#7048e8]', border: 'border-[#bac8ff]' },
    3: { bg: 'bg-[#5c4fcf9c]', text: 'text-[#7048e8]', border: 'border-[#c7d2fe]', },
    4: { bg: 'bg-[#fff9db]', text: 'text-[#f59f00]', border: 'border-[#ffe066]', },
    5: { bg: 'bg-[#f59e2c6f]', text: 'text-[#C97A0A]', border: 'border-[#ffd43b]', },


  };

  // Fonction pour gérer la sélection des fichiers
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // On convertit les fichiers en URLs lisibles par la balise <img />
    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    // On ajoute les nouvelles images dans la limite de 3 au total
    setImages((prevImages) => [...prevImages, ...newImageUrls].slice(0, 3));
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-12 font-sans antialiased bg-canvas min-h-screen">

      {/* HEADER DE LA PAGE (Ajouté pour correspondre à la maquette) */}
      <header className="mb-10 text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-ink mb-1">
          CREER VOTRE ANNONCE
        </h1>
        <p className="text-sm font-semibold text-gray-600">
          Remplisser les champs suivants pour votre Annonce
        </p>
      </header>

      {/* DISPOSITION EN GRILLE STANDARD (Tout défile normalement) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

        {/* COLONNE GAUCHE : FORMULAIRE */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* Section 1 : Information */}
          <div className="card bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-ink text-center mb-3">1.Information de l’annonce</h2>
            <div className="w-3/5 h-[1px] bg-gray-200 mx-auto mb-6"></div>

            <div className="form-control w-full mb-4">
              <label className="label font-bold text-ink text-sm" htmlFor="title">Titre de l’annonce</label>
              <input
                type="text"
                id="title"
                name="title"
                className="input input-bordered bg-gray-50 rounded-xl w-full focus:outline-none"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full mb-4">
              <label className="label font-bold text-ink text-sm" htmlFor="category">Catégorie de l’annonce</label>
              <select
                id="category"
                name="category"
                className="select select-bordered bg-gray-50 rounded-xl w-full focus:outline-none"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled>Sélectionnez une catégorie</option>
                <option value="demenagement">Déménagement</option>
                <option value="bricolage">Bricolage</option>
                <option value="aide-menagere">Aide ménagère</option>
                <option value="aide-seniors">Aide aux séniors</option>
                <option value="informatique">Informatique</option>
                <option value="petits-travaux">Petit travaux</option>
                <option value="course">Course</option>
                <option value="animaux">Animaux</option>
                <option value="jardinerie">Jardinerie</option>
                <option value="transport">Transport</option>
                <option value="aide-scolaire">Aide scolaire</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold text-black text-sm" htmlFor="description">Description de l’annonce</label>
              <textarea
                id="description"
                name="description"
                className="textarea textarea-bordered bg-gray-50 rounded-xl w-full h-32 focus:outline-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 2 : Localisation */}
          <div className="card bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-ink text-center mb-3">2.Localisation</h2>
            <div className="w-3/5 h-[1px] bg-gray-200 mx-auto mb-6"></div>

            <div className="flex gap-4">
              <div className="form-control flex-1">
                <label className="label font-bold text-ink text-sm" htmlFor="zipCode">Code postal</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="input input-bordered bg-gray-50 rounded-xl w-full focus:outline-none"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control flex-1">
                <label className="label font-bold text-black text-sm" htmlFor="city">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="input input-bordered bg-gray-50 rounded-xl w-full focus:outline-none"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section 3 : Coûts en U-Coins */}
          <div className="card bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black text-center mb-2">3. Coûts en U-Coins</h2>
            <p className="text-center font-semibold text-xs text-black mb-6">
              Combien de U-coins le helper gagnera-t-il en rendant ce service ?
            </p>

            <div className="flex justify-center gap-4 mb-6">
              {[1, 2, 3, 4, 5].map((num) => {
                const style = coinStyles[num];
                const isActive = formData.uCoins === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleCoinSelect(num)}
                    className={`w-26 h-30 text-3xl font-bold rounded-xl border dashed flex items-center justify-center shadow-sm hover:scale-105 transition-transform bg-${style.bghover}
                      ${style.bg} ${style.text} ${style.border} 
                      ${isActive ? 'ring-4 ring-offset-2 ring-indigo-500 scale-105 font-extrabold border-solid' : 'border-dashed opacity-80'}`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            <div className="form-control flex flex-row items-center justify-center gap-3 mt-4">
              <input
                type="checkbox"
                id="isUrgent"
                name="isUrgent"
                className="checkbox checkbox-primary rounded-md"
                checked={formData.isUrgent}
                onChange={handleChange}
              />
              <label htmlFor="isUrgent" className="label font-bold text-xs cursor-pointer text-black">
                si annonce urgente cochez la case
              </label>
            </div>
          </div>

          {/* Section 4 : Photo */}

          {/* Section 4 : Photo */}
          <div className="card bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
            <h2 className="text-xl font-bold text-black text-center mb-6">4. Photo (Facultatif)</h2>

            {/* Un seul input caché pour toute la section */}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="grid grid-cols-3 gap-4">
              {/* 1. Affichage des images sélectionnées */}
              {images.map((url, index) => (
                <div
                  key={index}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 cursor-pointer"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                  title="Cliquez pour supprimer"
                >
                  <img src={url} alt={`Aperçu ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-canvas text-xs font-bold">Supprimer</span>
                  </div>
                </div>
              ))}

              {/* 2. Affichage des boutons "Ajouter" pour les cases restantes (maximum 3) */}
              {Array.from({ length: Math.max(0, 3 - images.length) }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  onClick={() => fileInputRef.current.click()}
                  className="aspect-[3/4] rounded-xl border-2 border-dashed border-gray-400 bg-white flex items-center justify-center cursor-pointer text-gray-400 font-semibold text-sm hover:bg-gray-50 hover:text-gray-600 transition-colors"
                >
                  <span>+ Ajouter</span>
                </div>
              ))}
            </div>
          </div>


          {/* Boutons d'actions */}
          <div className="flex gap-4 mt-2">
            <button type="submit" className="btn flex-1 bg-[#e2a04e] hover:bg-[#d18f3d] text-white border-none rounded-xl normal-case text-base font-bold">
              Créer
            </button>
            <button type="button" className="btn flex-1 bg-[#3b32b3] hover:bg-[#2e2694] text-white border-none rounded-xl normal-case text-base font-bold">
              Annuler
            </button>
          </div>

        </form>

        {/* COLONNE DROITE : DEFILEMENT NORMAL */}
        <aside className="flex flex-col gap-6">

          {/* Solde U-Coins */}
          <div className="card bg-white border border-gray-300 rounded-2xl p-6 text-center shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black mb-4">Votre solde de U-coins :</h3>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-6xl font-extrabold text-[#e2a04e] leading-none">17</span>
              <img src="/UneedCoin.png" alt="U-Coin" className='w-15' />
            </div>
            <p className="text-xs text-gray-600 font-medium">
              après création : <strong className="text-black">{17 - formData.uCoins}</strong> <img src="/UneedCoin.png" alt="U-Coin" className="inline w-4 h-4 mb-1" />
            </p>
          </div>

          {/* Aperçu */}
          <div className="card bg-[#e0e0ff] border border-[#c5c5ff] rounded-2xl p-6 text-indigo-950">
            <h3 className="text-base font-bold flex items-center gap-2 mb-3">
              <span>ⓘ</span> Aperçu
            </h3>
            <p className="text-xs font-semibold leading-relaxed">
              Votre annonce apparaîtra au catalogue dès sa publication et restera visible tant qu'aucun helper n'aura été accepté.
            </p>
          </div>

          {/* Conseils */}
          <div className="card bg-white border border-gray-300 rounded-2xl p-6 text-black mt-4">
            <h3 className="text-xs font-extrabold tracking-wider mb-3">
              💡 CONSEILS
            </h3>
            <p className="text-xs font-semibold leading-relaxed text-gray-800">
              Plus vous offrez de U-Coins pour votre services, plus cela indiquera que votre services demande des efforts et du temps.
            </p>
          </div>

        </aside>
      </div>
    </main>
  );
}

export default Adform;