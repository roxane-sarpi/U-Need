import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import { useNavigate } from "react-router-dom";

function ChatArea({ request, messages, currentUserId, onSendMessage, onAccept, onRefuse }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const statusStyles = {
        'en cours': 'text-accent-orange-dark font-medium bg-accent-orange-light',
        'accepter': 'text-emerald-600 font-medium bg-emerald-100',
        'refuser': 'text-red-600 font-bold bg-red-100',
        'terminé': 'text-emerald-600 font-medium bg-emerald-100',
        'signalé': 'text-red-600 font-bold bg-red-100'
    };

    const statusTexts = {
        'en cours': 'En cours',
        'accepter': 'Acceptée',
        'refuser': 'Refusée',
        'signalé': 'Signalée'
    };

    const adTitle = request.ad_title || request.title || 'Annonce';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onSendMessage(text);
        setText('');
    };

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
                            <span
                                className="cursor-pointer hover:text-gray-700"
                                onClick={() => navigate('/detail', { state: { id: request.id_ad } })}
                            >
                                Annonce liée : <span className="underline">{adTitle}</span>
                            </span>
                        </p>
                        <span className={`px-2 py-0.5 rounded ml-1 font-medium text-[10px] uppercase ${statusStyles[request.status] || 'bg-gray-100 text-gray-700'}`}>
                            {statusTexts[request.status] || 'État inconnu'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {request.ad_owner_id === currentUserId && request.status === 'en cours' && (
                        <>
                            <button
                                type="button"
                                onClick={onRefuse}
                                className="bg-red-500 text-white px-3 py-2.5 md:px-6 rounded-xl font-semibold text-xs md:text-sm hover:bg-red-600"
                            >
                                Refuser
                            </button>
                            <button
                                type="button"
                                onClick={onAccept}
                                className="bg-primary text-white px-3 py-2.5 md:px-6 rounded-xl font-semibold text-xs md:text-sm hover:bg-accent-orange"
                            >
                                Valider l'aide
                            </button>
                        </>
                    )}
                </div>
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