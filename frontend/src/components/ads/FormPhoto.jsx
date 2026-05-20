import React, { useState, useRef } from 'react';

function FormPhoto() {

    const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // On convertit les fichiers en URLs lisibles par la balise <img />
    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    // On ajoute les nouvelles images dans la limite de 3 au total
    setImages((prevImages) => [...prevImages, ...newImageUrls].slice(0, 3));
  };

    return (
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

            <div className="grid grid-rows md:grid-cols-3 gap-4">
              {/* 1. Affichage des images sélectionnées */}
              {images.map((url, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col md:flex-row m-auto w-85 h-50 md:w-45 md:h-80 rounded-xl overflow-hidden border border-gray-200 cursor-pointer"
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
                  className="flex flex-col md:flex-row m-auto w-85 h-50 md:w-55 md:h-80 rounded-xl border-2 border-dashed border-gray-400 bg-white  items-center justify-center cursor-pointer text-gray-400 font-semibold text-sm hover:bg-gray-50 hover:text-gray-600 transition-colors"
                >
                  <span>+ Ajouter</span>
                </div>
              ))}
            </div>
          </div>
    )
};

    export default FormPhoto;