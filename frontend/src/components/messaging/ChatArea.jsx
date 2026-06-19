import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import { useNavigate } from "react-router-dom";

function ChatArea({ request, messages, currentUserId, currentUser, onSendMessage, onAccept, onRefuse }) {
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const statusStyles = {
        'en cours': 'text-accent-orange-dark font-medium bg-accent-orange-light',
        'accepter': 'text-emerald-600 font-medium bg-emerald-100',
        'refuser': 'text-red-600 font-bold bg-red-100',
        'terminé': 'text-emerald-700 font-medium bg-emerald-50 border border-emerald-200', // Style adouci pour le header
        'signalé': 'text-red-600 font-bold bg-red-100'
    };

    const statusTexts = {
        'en cours': 'En cours',
        'accepter': 'Acceptée',
        'refuser': 'Refusée',
        'terminé': 'Terminé', // 🆕 Ajout du texte de statut manquant
        'signalé': 'Signalée'
    };

    const adTitle = request.ad_title || request.title || 'Annonce';
    const currentUserFirstName = currentUser?.firstname || '';
    const currentUserLastName = currentUser?.lastname || '';
    const contactFirstName = request.firstname || '';
    const contactLastName = request.lastname || '';
    const pointsAmount = request.points || 0;

    const buildInitials = (firstName = '', lastName = '') => {
        const initials = `${firstName.trim().charAt(0)}${lastName.trim().charAt(0)}`.toUpperCase();
        return initials || '?';
    };

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
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        text={msg.content}
                        isMe={msg.id_sender === currentUserId}
                        initials={msg.id_sender === currentUserId
                          ? buildInitials(currentUserFirstName, currentUserLastName)
                          : buildInitials(msg.firstname || contactFirstName, msg.lastname || contactLastName)}
                    />
                ))}

                {/* 🆕 Correction de la structure conditionnelle JSX */}
                {request.status === "terminé" && (
                    <div className="mt-4 p-4 rounded-xl text-sm text-center font-medium border bg-emerald-50 text-emerald-800 border-emerald-200">
                        {request.ad_owner_id === currentUserId ? (
                            <p>
                                Le service a été rendu. {contactFirstName || "L'aidant"} a reçu {pointsAmount} PTS. {pointsAmount} PTS vous ont été déduits.
                            </p>
                        ) : (
                            <p>
                                Le service a été rendu. Vous avez reçu {pointsAmount} PTS !
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Input d'envoi de message */}
            <footer className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex gap-4 items-center max-w-5xl mx-auto">
                    <input
                        type="text"
                        value={text}
                        disabled={request.status === 'terminé'} // Optionnel : Bloque l'input si c'est fini
                        onChange={(e) => setText(e.target.value)}
                        placeholder={request.status === 'terminé' ? "La discussion est clôturée" : "Taper un message ici"}
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-purple-600 disabled:bg-gray-50 disabled:text-gray-400"
                    />
                    <button 
                        type="submit" 
                        disabled={request.status === 'terminé'}
                        className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-accent-orange disabled:opacity-50"
                    >
                        Envoyer
                    </button>
                </form>
            </footer>
        </div>
    );
}

export default ChatArea;