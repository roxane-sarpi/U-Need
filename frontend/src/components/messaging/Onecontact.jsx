import React from 'react';

export default function Onecontact({ request, isActive, onClick, mockAds, user }) {

    // 1. On trouve l'annonce spécifique liée à cette ligne de contact
    const currentAd = mockAds.find(ad => ad.id === request.id_ad);

    // Sécurisation des valeurs au cas où l'annonce n'est pas trouvée
    const adTitle = currentAd ? currentAd.title : "Annonce inconnue";
    const firstLetter = adTitle.charAt(0).toUpperCase();

    function supprimerDiscussion(requestId) {
        // Logique de suppression de la discussion (ex: appel API)
        console.log(`Discussion avec ID ${requestId} supprimée.`);
    }   

    return (
        <div 
            onClick={onClick}
            className={`flex items-center justify-between p-4 cursor-pointer border-b border-gray-100 transition-colors
                ${isActive ? 'bg-[#D9D7F1] font-medium' : 'hover:bg-gray-50'}`}
        >
            <div className="flex items-center gap-3">
                {/* Avatar avec la première lettre du titre */}
                <div className="w-11 h-11 bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold">
                    {firstLetter}
                </div>
                
                <div>
                    {/* Affichage du vrai titre de l'annonce */}
                    <h4 className="text-sm font-semibold text-gray-900">{adTitle}</h4>
                    {/* Aperçu temporaire (titre ou texte personnalisé) */}
                    <p className="text-xs text-gray-500 truncate w-36">
                        {request.state === 'en cours' ? 'Discussion en cours...' : 'Aide terminée'}
                    </p>
                </div>
            </div>

            {/* Bouton Poubelle */}
            <button 
                onClick={(e) => {
                    e.stopPropagation(); // Empêche d'activer la discussion lors du clic sur supprimer
                    alert(`Supprimer la discussion : ${adTitle}`);
                    supprimerDiscussion(request.id);
                }}
                className="text-gray-400 hover:text-red-500 p-1"
            >
                🗑️
            </button>
        </div>
    );
}