import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPhoto from './FormPhoto';
import { useAuth } from '../context/AuthContext';
import { authFetch } from '../services/api';

function Adform({ selectedCoins, setSelectedCoins }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    zipCode: '',
    city: '',
    isUrgent: false,
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    authFetch('/categories')
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error('Erreur chargement catégories :', err));
  }, []);

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImageUrls].slice(0, 3));
    setImageFiles((prevFiles) => [...prevFiles, ...files].slice(0, 3));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('zip_code', formData.zipCode);
    formPayload.append('city', formData.city);
    formPayload.append('urgent', formData.isUrgent ? 1 : 0);
    formPayload.append('id_category', formData.category);
    formPayload.append('points', selectedCoins);
    formPayload.append('statut', 'disponible');
    formPayload.append('id_user', user.id);
    formPayload.append('date_execution', '');
    if (imageFiles[0]) formPayload.append('image_1', imageFiles[0]);
    if (imageFiles[1]) formPayload.append('image_2', imageFiles[1]);
    if (imageFiles[2]) formPayload.append('image_3', imageFiles[2]);

    try {
      const res = await authFetch('/ads', {
        method: 'POST',
        body: formPayload,
      });

      if (res.ok) {
        navigate('/profile', { state: { message: 'Annonce postée !' } });
      } else {
        console.error('Erreur création annonce :', res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Styles pour les boutons de pièces
  const coinStyles = {
    1: { bg: 'bg-[#f3f0ff]', text: 'text-[#7048e8]', border: 'border-[#d0bfff]' },
    2: { bg: 'bg-[#d5d1f5cf]', text: 'text-[#7048e8]', border: 'border-[#bac8ff]' },
    3: { bg: 'bg-[#5c4fcf9c]', text: 'text-[#7048e8]', border: 'border-[#c7d2fe]' },
    4: { bg: 'bg-[#fff9db]', text: 'text-[#f59f00]', border: 'border-[#ffe066]' },
    5: { bg: 'bg-[#f59e2c6f]', text: 'text-[#C97A0A]', border: 'border-[#ffd43b]' },
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* Section 1 : Information */}
      <div className="card bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm">
        <h2 className="text-xl font-bold text-ink text-center mb-3">1. Information de l’annonce</h2>
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
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
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
        <h2 className="text-xl font-bold text-ink text-center mb-3">2. Localisation</h2>
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

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((num) => {
            const style = coinStyles[num];
            const isActive = selectedCoins === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setSelectedCoins(num)}
                className={`w-full h-30 m-auto md:w-26 md:h-30 text-3xl font-bold rounded-xl border flex items-center justify-center shadow-sm hover:scale-105 transition-transform 
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

      {/* Section 4 : Photo isolée */}
      <FormPhoto
        images={images}
        setImages={setImages}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />

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
  );
}

export default Adform;