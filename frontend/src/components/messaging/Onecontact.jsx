import React from 'react';

export default function Onecontact({ conversation, isActive, onClick }) {

    function supprimerDiscussion(conversationId) {
        // Logique de suppression de la discussion (ex: appel API)
        console.log(`Discussion avec ID ${conversationId} supprimée.`);
    }   
    
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between p-4 cursor-pointer border-b border-gray-100 transition-colors
        ${isActive ? 'bg-[#D9D7F1] font-medium' : 'hover:bg-gray-50'}`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar avec initiales ou image */}
        <div className="w-11 h-11 bg-zinc-800 text-white rounded-full flex items-center justify-center font-bold">
          {conversation.title.charAt(0)}
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{conversation.title}</h4>
          <p className="text-xs text-gray-500 truncate w-36">{conversation.lastMessageText}</p>
        </div>
      </div>

      {/* Bouton Poubelle de la maquette */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Empêche d'ouvrir la discussion en voulant la supprimer
          alert(`Supprimer la discussion : ${conversation.title}`)
          supprimerDiscussion(conversation.id); // Fonction à implémenter pour supprimer la discussion
        }}
        className="text-gray-400 hover:text-red-500 p-1"
      >
        🗑️
      </button>
    </div>
  );
}