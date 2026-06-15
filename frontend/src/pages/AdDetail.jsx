import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';
import { API_URL } from '../components/services/api';

function AdDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    fetch(`${API_URL}/ads/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => { setAd(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center text-ink/50">
        Chargement...
      </div>
    );
  }

  if (!ad) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center gap-4 text-ink/50">
        <p>Annonce introuvable.</p>
        <button
          onClick={() => navigate('/catalogue')}
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowLeft size={16} /> Retour au catalogue
        </button>
      </div>
    );
  }

  const images = [ad.image_1, ad.image_2, ad.image_3].filter(Boolean);

  return (
    <div className="min-h-screen bg-canvas p-4 sm:p-6 lg:p-8">
      {/* Bouton retour + Fil d'Ariane */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center rounded-full p-2 text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink"
        >
          <ArrowLeft size={20} />
        </button>
        <p className="text-sm text-ink/60">
          Catalogue / {ad.category_name} / {ad.title}
        </p>
      </div>

      {/* Conteneur principal */}
      <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-white p-4 shadow-[0_14px_40px_rgba(26,22,51,0.08)] sm:p-6 lg:p-8">
        {/* Section principale (images + détails) */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Section gauche : Images et description */}
          <div className="flex-1">
            {/* Galerie d'images */}
            {images.length > 0 && (
              <div className="mb-6">
                {/* Version mobile */}
                <div className="lg:hidden">
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-primary-soft">
                    <img src={images[0]} alt={ad.title} className="h-full w-full object-cover" />
                  </div>
                  {images.length > 1 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {images.slice(1).map((image, index) => (
                        <div key={index} className="aspect-4/3 overflow-hidden rounded-xl bg-primary-soft">
                          <img src={image} alt={`${ad.title} ${index + 2}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Version bureau */}
                <div className="hidden lg:flex lg:gap-4">
                  <div className="flex-1">
                    <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-primary-soft">
                      <img src={images[0]} alt={ad.title} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  {images.length > 1 && (
                    <div className="flex w-48 flex-col gap-4">
                      {images.slice(1).map((image, index) => (
                        <div key={index} className="aspect-4/3 overflow-hidden rounded-xl bg-primary-soft">
                          <img src={image} alt={`${ad.title} ${index + 2}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="flex items-center justify-between">
              {ad.category_name && (
                <span className="rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wide bg-[#4E4E4E] text-white">
                  {ad.category_name}
                </span>
              )}
              <span className="rounded-md bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {ad.points} PTS
              </span>
            </div>

            {/* Localisation et urgence */}
            <div className="mt-4 flex items-center gap-4 text-sm text-ink/60">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-ink/45" />
                <span>{ad.zip_code}, {ad.city}</span>
              </div>
              {ad.urgent === 1 && (
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-ink/45" />
                  <span>ASAP</span>
                </div>
              )}
            </div>

            {/* Titre et description */}
            <h1 className="mt-4 text-xl font-extrabold leading-7 text-ink sm:text-2xl">
              {ad.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/65 sm:text-base">
              {ad.description}
            </p>
          </div>

          {/* Section droite : Coût et prestataire */}
          <div className="w-full space-y-6 lg:w-80">
            {/* Carte de coût */}
            <div className="rounded-xl bg-primary-soft p-6 text-center">
              <h2 className="text-lg font-bold text-ink">Coût de ce service</h2>
              <div className="my-4 text-4xl font-extrabold text-ink">
                {ad.points}
                <span className="inline-block h-7 w-7 align-middle -mb-1">
                  <img src="/UneedCoin.png" alt="Uneed Coin" className="h-full w-full object-contain" />
                </span>
              </div>
              <button 
                onClick={() => navigate('/messagerie', { state: { id_ad: ad.id, id_user: ad.id_user } })}
                className="w-full rounded-xl bg-primary-dark py-3 text-sm font-bold text-white transition-colors hover:bg-primary"
              >
                Proposer mon aide
              </button>
              <p className="mt-3 cursor-pointer text-sm text-ink/60 hover:text-ink">
                🚩 Signaler cette annonce
              </p>
            </div>

            {/* Carte du prestataire */}
            <div className="rounded-xl border border-ink/10 p-6">
              <div className="flex justify-center">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-primary-soft">
                  <div className="flex h-full w-full items-center justify-center text-xl font-bold text-primary-dark">
                    {ad.firstname?.charAt(0) ?? '?'}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="truncate text-lg font-bold text-ink">
                  {ad.firstname} {ad.lastname?.charAt(0)}.
                </h3>
              </div>

              <button className="mt-4 w-full rounded-xl border border-primary-dark py-2 text-sm font-bold text-primary-dark transition-colors hover:bg-primary-soft">
                Voir le profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetail;
