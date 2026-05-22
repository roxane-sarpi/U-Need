import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import { Link } from 'react-router-dom';

function ChatArea({ request, messages, currentUserId, onSendMessage, mockAds, user }) {
    const [text, setText] = useState('');

    const statusStyles = {
        'en cours': 'text-accent-orange-dark font-medium bg-accent-orange-light',
        'terminé': 'text-emerald-600 font-medium bg-emerald-100',   // Vert pour ce qui est fini
        'signalé': 'text-red-600 font-bold bg-red-100' // Rouge clignotant si problème
    };

    const statusTexts = {
        'en cours': 'En cours',
        'terminé': 'Terminée',
        'signalé': 'Signalée'
    };

    // 1. On trouve l'annonce correspondante à CETTE conversation spécifique
    const currentAd = mockAds.find(ad => ad.id === request.id_ad);

    const userName = user ? user.name : "Utilisateur";

    const [showChatOnMobile, setShowChatOnMobile] = useState(false);

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
                    <div className={`w-12 h-12 bg-zinc-700 text-white rounded-full items-center justify-center font-bold hidden md:flex`}>
                        {firstLetter}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{adTitle}</h2>
                        <p className="text-xs text-gray-500">
                            <Link to={`/ads/${currentAd.id}`}>Annonce liée : <span className="underline">{adTitle}</span></Link>
                        </p>
                        <span className={`px-2 py-0.5 rounded ml-1 font-medium text-[10px] uppercase ${statusStyles[request.state] || 'bg-gray-100 text-gray-700'}`}>
                            {statusTexts[request.state] || 'État inconnu'}
                        </span>
                    </div>
                </div>
                <button className="bg-primary text-white px-3 py-2.5 md:px-6 rounded-xl font-semibold text-xs md:text-sm hover:bg-accent-orange">
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
                    <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-accent-orange">
                        Envoyer
                    </button>
                </form>
            </footer>
        </div>
    );
}

export default ChatArea;