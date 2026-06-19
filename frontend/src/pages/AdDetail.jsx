import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft } from 'lucide-react';
import { API_URL, buildUrl } from '../components/services/api';
import { getCategoryColor } from '../components/ads/adsData';
import { useAuth } from '../components/context/AuthContext';
import { createRequest, getConversationsByUser } from '../components/services/requestService';

function AdDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
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

console.log("Ad data : ", ad);

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

  // 1. On garde les 3 valeurs (qu'elles soient valides ou nulles) pour tester précisément l'index 0
  const allImages = [buildUrl(ad.image_1), buildUrl(ad.image_2), buildUrl(ad.image_3)];

  // 2. On isole la première image
  const firstImage = allImages[0];

  // 3. On filtre le reste pour les miniatures (en enlevant la première)
  const secondaryImages = allImages.slice(1).filter(Boolean);

  const getConversationKey = (request) => {
    const participantA = Number(request?.id_user);
    const participantB = Number(request?.id_helper);
    const orderedParticipants = [participantA, participantB].sort((left, right) => left - right);

    return [request?.id_ad, orderedParticipants[0], orderedParticipants[1]].join(':');
  };

  const handleContactHelper = async () => {
    if (!ad) return;

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsCreatingConversation(true);
      const conversationList = await getConversationsByUser(user.id);
      const existingConversation = (conversationList || []).find((request) => (
        getConversationKey(request) === [ad.id, [ad.id_user, user.id].sort((left, right) => left - right).join(':')].join(':')
      ));

      if (existingConversation) {
        navigate(`/messagerie?requestId=${existingConversation.id}`, { replace: true });
        return;
      }

      const conversation = await createRequest(ad.id, ad.id_user, user.id);
      const requestId = conversation?.id;

      if (requestId) {
        navigate(`/messagerie?requestId=${requestId}`, { replace: true });
      } else {
        navigate('/messagerie', { replace: true });
      }
    } catch (error) {
      console.error(error);
      navigate('/messagerie', { replace: true });
    } finally {
      setIsCreatingConversation(false);
    }
  };

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
            {allImages.length > 0 && (
              <div className="mb-6">
                {/* Version mobile */}
                <div className="lg:hidden">
                  {firstImage ? (
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-primary-soft">
                    <img src={firstImage} alt={ad.title} className="h-full w-full object-cover" />
                  </div>) : 
                  (
                  <div className="flex aspect-4/3 w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(91,79,207,0.12),rgba(245,158,44,0.18))]">
                    <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary-dark">U-Need
                    </span>
                  </div>
                  )}
                  
                  {secondaryImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {secondaryImages.map((image, index) => (
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
                    {firstImage ? (
                      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-primary-soft">
                        <img src={firstImage} alt={ad.title} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                    <div className="flex aspect-4/3 w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(91,79,207,0.12),rgba(245,158,44,0.18))]">
                      <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary-dark">U-Need</span>
                    </div>
                    )}
                    
                  </div>
                  {secondaryImages.length > 0 && (
                    <div className="flex w-48 flex-col gap-4">
                      {secondaryImages.map((image, index) => (
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
  {/* Partie gauche : Catégorie */}
  <div>
    {ad.category_name && (
      <span
        className="rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
        style={{ backgroundColor: getCategoryColor(ad.id_category), color: '#374151' }}
      >
        {ad.category_name}
      </span>
    )}
  </div>

  {/* Partie droite : ASAP (si urgent) + Points */}
  <div className="flex items-center gap-3">
    {/* Affichage du texte ASAP à gauche des points */}
    {ad.urgent === 1 && (
      <div className="flex items-center gap-1.5 text-red-600 font-bold bg-red-50 px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wide border border-red-200">
        <Clock size={12} />
        <span>ASAP</span>
      </div>
    )}

    {/* Le badge des Points */}
        <span className="rounded-md bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
        {ad.points} PTS
        </span>
      </div>
  </div>

            {/* Localisation et urgence */}
            <div className="mt-4 flex items-center gap-4 text-sm text-ink/60">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-ink/45" />
                <span>{ad.zip_code}, {ad.city}</span>
              </div>
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
                onClick={handleContactHelper}
                disabled={isCreatingConversation}
                className="w-full rounded-xl bg-primary-dark py-3 text-sm font-bold text-white transition-colors hover:bg-primary"
              >
                {isCreatingConversation ? 'Ouverture...' : 'Proposer mon aide'}
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
