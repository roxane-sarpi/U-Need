import React from 'react';

export default function MessageBubble({ text, isMe, initials }) {
  const avatarClassName = `relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold border border-gray-200 ${isMe ? 'bg-[#E5A046] text-slate-950' : 'bg-zinc-800 text-white'}`;
  const displayInitials = initials || '?';

  return (
    <div className={`flex items-end gap-3 my-2 w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
      {!isMe && (
        <div className={avatarClassName}>
          {displayInitials}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="Open to work" />
        </div>
      )}

      <div 
        className={`relative max-w-[65%] p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
          ${isMe 
            ? 'bg-[#E5A046] text-slate-950 rounded-br-none' // Style Orange (Moi)
            : 'bg-[#D9D7F1] text-slate-950 rounded-bl-none' // Style Violet (Roxane)
          }`}
      >
        <p>{text}</p>
        <div 
          className={`absolute bottom-3 w-0 h-0 border-8 border-transparent
            ${isMe 
              ? 'left-full border-l-[#E5A046] -ml-1' 
              : 'right-full border-r-[#D9D7F1] -mr-1'
            }`}
        />
      </div>

      {isMe && (
        <div className={avatarClassName}>
          {displayInitials}
        </div>
      )}

    </div>
  );
}