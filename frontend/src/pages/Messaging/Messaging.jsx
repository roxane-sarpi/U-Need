import React, { useState } from 'react';
import Onecontact from '../../components/messaging/Onecontact';
import ChatArea from '../../components/messaging/ChatArea'; // On importe la zone de chat complète

const CURRENT_USER_ID = "user_moi";

const mockConversations = [
  { id: 'conv_1', title: 'Théo', annonceTitle: 'Aide maquette', status: 'En cours', lastMessageText: 'Aide maquette' },
  { id: 'conv_2', title: 'Karen', annonceTitle: 'Aide Jardinage', status: 'En cours', lastMessageText: 'Aide Jardinage' },
  { id: 'conv_3', title: 'Roxane', annonceTitle: 'Aide déménagement', status: 'En cours', lastMessageText: "Du coup c'est parfait je suis prête..." },
  { id: 'conv_4', title: 'Wendy', annonceTitle: 'Aide Bricolage', status: 'En cours', lastMessageText: 'Aide Bricolage' },
  { id: 'conv_5', title: 'Geoffrey', annonceTitle: 'Aide Informatique', status: 'En cours', lastMessageText: 'Aide Informatique' },
];

const mockMessages = [
  { id: 'm1', conversationId: 'conv_3', senderId: 'user_roxane', text: "Bonjour, J'ai vu ton annonce pour le déménagement et je me propose pour t'aider" },
  { id: 'm2', conversationId: 'conv_3', senderId: 'user_moi', text: "Bonjour, Merci pour ta proposition d'aide, ça serait pour déménager un appartement" },
  { id: 'm3', conversationId: 'conv_3', senderId: 'user_roxane', text: "Le déménagement se passerait quand ? Car je suis disponible samedi" },
  { id: 'm4', conversationId: 'conv_3', senderId: 'user_moi', text: "C'est parfait car le déménagement est prévu samedi" },
  { id: 'm5', conversationId: 'conv_3', senderId: 'user_roxane', text: "Du coup c'est parfait je suis prête à venir t'aider" },
];

function MessagerieScreen() {
  const [activeConvId, setActiveConvId] = useState('conv_3');
  const [messages, setMessages] = useState(mockMessages);

  // Données calculées pour la conversation sélectionnée
  const currentConv = mockConversations.find(c => c.id === activeConvId);
  const currentMessages = messages.filter(m => m.conversationId === activeConvId);

  // Cette fonction reçoit le texte brut envoyé depuis l'input de ChatArea
  const handleSendMessage = (textFromInput) => {
    const newDbMessage = {
      id: `msg_${Date.now()}`,
      conversationId: activeConvId,
      senderId: CURRENT_USER_ID,
      text: textFromInput, // Reçu du composant enfant
      createdAt: new Date().toISOString()
    };

    setMessages([...messages, newDbMessage]);
    
    // 💡 FUTUR CODE DB ICI (axios.post...)
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans select-none">
      
      {/* COLONNE GAUCHE : SIDEBAR */}
      <aside className="w-80 border-r border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">Messagerie</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conv) => (
            <Onecontact 
              key={conv.id}
              conversation={conv}
              isActive={conv.id === activeConvId}
              onClick={() => setActiveConvId(conv.id)}
            />
          ))}
        </div>
      </aside>

      {/* COLONNE DROITE : APPEL DE CHATAREA */}
<div className="flex h-[calc(100vh-64px)] w-full bg-white overflow-hidden font-sans select-none">
        {currentConv ? (
        <ChatArea 
          conversation={currentConv}
          messages={currentMessages}
          currentUserId={CURRENT_USER_ID}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">
          Sélectionnez une discussion pour commencer à discuter.
        </div>
      )}

        </div>
    </div>
  );
}

export default MessagerieScreen;