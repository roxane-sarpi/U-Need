import React from 'react';

export default function Onecontact({ request, isActive, onClick, canDelete, onDeleteConversation }) {

    const statusTexts = {
    'en cours': 'Discussion en cours...',
    'terminé': 'Aide terminée',
    'signalé': '⚠️ Discussion signalée'
  };

    const adTitle = request.ad_title || request.title || "Annonce inconnue";
    const firstLetter = adTitle.charAt(0).toUpperCase();

    const contactName = request.firstname ? `${request.firstname} ${request.lastname}` : "Interlocuteur";

    function handleDeleteClick(e) {
        e.stopPropagation();
        if (typeof onDeleteConversation === 'function') {
          onDeleteConversation(request.id);
        }
    }

    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-4 cursor-pointer border-b border-gray-100 transition-colors
                ${isActive ? 'bg-indigo-50 border-r-4 border-r-[#5C4FE5] font-medium' : 'hover:bg-gray-50'}`}
        >
            <div className="flex items-center gap-3">
                {/* Avatar avec la première lettre du titre */}
                <div className="w-11 h-11 bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold">
                    {firstLetter}
                </div>

                <div>
                    {/* Affichage du vrai titre de l'annonce */}
                    <h4 className="text-sm font-semibold text-gray-900">{adTitle}</h4>
                    {/* Petit bonus : Afficher avec QUI on parle */}
                    <p className="text-[11px] text-gray-400 font-medium truncate w-36">
                        Avec : {contactName}
                    </p>
                    {/* Correction ici : request.status à la place de request.state */}
                    <p className="text-xs text-[#5C4FE5] truncate w-36 mt-0.5">
                        {statusTexts[request.status] || 'État inconnu'}
                    </p>
                </div>
            </div>

            {/* Bouton Poubelle */}
            {canDelete && (
              <button
                onClick={handleDeleteClick}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/50/waste.png" alt="Supprimer" />
              </button>
            )}
        </div>
    );
}