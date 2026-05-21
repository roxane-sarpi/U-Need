import React from 'react';

export default function MessageBubble({ text, isMe, avatarUrl }) {
  return (
    <div className={`flex items-end gap-3 my-2 w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
      
      {/* 1. Si ce n'est PAS mon message, l'avatar s'affiche à GAUCHE */}
      {!isMe && (
        <div className="relative">
          <img 
            src={avatarUrl || "https://via.placeholder.com/40"} 
            alt="Avatar" 
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          {/* Le petit badge vert "#OPENTOWORK" de ta maquette autour de l'avatar */}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="Open to work" />
        </div>
      )}

      {/* 2. La Bulle de texte */}
      <div 
        className={`relative max-w-[65%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
          ${isMe 
            ? 'bg-[#E5A046] text-slate-950 rounded-br-none' // Style Orange (Moi)
            : 'bg-[#D9D7F1] text-slate-950 rounded-bl-none' // Style Violet (Roxane)
          }`}
      >
        <p>{text}</p>
        
        {/* Petite flèche sur le côté de la bulle pour coller à ta maquette */}
        <div 
          className={`absolute bottom-3 w-0 h-0 border-8 border-transparent
            ${isMe 
              ? 'left-full border-l-[#E5A046] -ml-1' 
              : 'right-full border-r-[#D9D7F1] -mr-1'
            }`}
        />
      </div>

      {/* 3. Si C'EST mon message, l'avatar s'affiche à DROITE */}
      {isMe && (
        <img 
          src={avatarUrl || "https://via.placeholder.com/40"} 
          alt="Mon Avatar" 
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
      )}
    </div>
  );
}