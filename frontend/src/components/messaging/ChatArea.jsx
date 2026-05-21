import React, { useState } from 'react';
import MessageBubble from './MessageBubble';

function ChatArea({ request, messages, currentUserId, onSendMessage, mockAds, user }) {
    const [text, setText] = useState('');

    // 1. On trouve l'annonce correspondante à CETTE conversation spécifique
    const currentAd = mockAds.find(ad => ad.id === request.id_ad);

    const userName = user ? user.name : "Utilisateur";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onSendMessage(text); // On envoie le texte au parent
        setText(''); // On vide l'input
    };

    // Récupération sécurisée du titre et de la première lettre pour l'avatar
    const adTitle = currentAd ? currentAd.title : 'Annonce';
    const firstLetter = adTitle.charAt(0).toUpperCase();

    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
            {/* Header de la discussion */}
            <header className="p-4 border-b border-gray-200 flex justify-between items-center px-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-zinc-700 text-white rounded-full flex items-center justify-center font-bold">
                        {firstLetter}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{adTitle}</h2>
                        <p className="text-xs text-gray-500">
                            Annonce liée : <span className="underline">{adTitle}</span>{' '}
                            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded ml-1 font-medium text-[10px] uppercase">
                                {request.state}
                            </span>
                        </p>
                    </div>
                </div>
                <button className="bg-[#3B30B7] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-opacity-90">
                    Valider son aide
                </button>
            </header>

            {/* Zone de Scroll des Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        text={msg.content} // Correction : msg.text -> msg.content
                        isMe={msg.id_sender === currentUserId} // Correction : msg.senderId -> msg.id_sender
                        avatarUrl={msg.id_sender === currentUserId ? "moi.png" : "autre.png"}
                    />
                ))}
            </div>

            {/* Input d'envoi de message */}
            <footer className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex gap-4 items-center max-w-5xl mx-auto">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Taper un message ici"
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-600"
                    />
                    <button type="submit" className="bg-[#5C4FE5] text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90">
                        Envoyer
                    </button>
                </form>
            </footer>
        </div>
    );
}

export default ChatArea;