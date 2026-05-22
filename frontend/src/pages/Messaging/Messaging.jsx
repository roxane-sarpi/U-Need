import React, { useState } from 'react';
import Onecontact from '../../components/messaging/Onecontact';
import ChatArea from '../../components/messaging/ChatArea'; 

// Correction : Utilisation de l'ID numérique cohérent avec la BDD (99 au lieu de "user_moi")
const CURRENT_USER_ID = 99;

const mockUsers = [
    { id: 11, name: 'Theo' },
    { id: 12, name: 'Sophie' },
  { id: 13, name: 'Roxane' },
    { id: 14, name: 'Karen' },
    { id: 15, name: 'Wendy' },
  { id: 99, name: 'Moi' } 
];

const mockRequests = [
  { id: 1, id_ad: 101, id_user: 99, id_helper: 11, state: 'en cours', date_creation: '2026-05-20T10:00:00Z' }, 
  { id: 2, id_ad: 102, id_user: 99, id_helper: 12, state: 'terminé', date_creation: '2026-05-20T11:00:00Z' }, 
  { id: 3, id_ad: 103, id_user: 99, id_helper: 13, state: 'signalé', date_creation: '2026-05-20T12:00:00Z' }, // Roxane
  { id: 4, id_ad: 104, id_user: 99, id_helper: 14, state: 'en cours', date_creation: '2026-05-20T13:00:00Z' }, 
  { id: 5, id_ad: 105, id_user: 99, id_helper: 15, state: 'en cours', date_creation: '2026-05-20T14:00:00Z' }, 
];

const mockMessages = [
  { id: 1, id_request: 3, id_sender: 13, id_receiver: 99, content: "Bonjour, J'ai vu ton annonce pour le déménagement...", created_at: '2026-05-20T12:05:00Z' },
  { id: 2, id_request: 3, id_sender: 99, id_receiver: 13, content: "Bonjour, Merci pour ta proposition d'aide...", created_at: '2026-05-20T12:10:00Z' },
  { id: 3, id_request: 3, id_sender: 13, id_receiver: 99, content: "Le déménagement se passerait quand ?...", created_at: '2026-05-20T12:15:00Z' },
  { id: 4, id_request: 3, id_sender: 99, id_receiver: 13, content: "C'est parfait car le déménagement est prévu samedi", created_at: '2026-05-20T12:20:00Z' },
  { id: 5, id_request: 3, id_sender: 13, id_receiver: 99, content: "Du coup c'est parfait je suis prête à venir t'aider", created_at: '2026-05-20T12:25:00Z' },
];

const mockAds = [
  { id: 101, title: 'Aide maquette', id_user: 99, statut: 'en cours' },
  { id: 102, title: 'Aide Jardinage', id_user: 99, statut: 'en cours' },
  { id: 103, title: 'Aide déménagement', id_user: 99, statut: 'en cours', city: 'Paris', zip_code: 75000 },
  { id: 104, title: 'Aide Bricolage', id_user: 99, statut: 'en cours' },
  { id: 105, title: 'Aide Informatique', id_user: 99, statut: 'en cours' },
];

function MessagerieScreen() {
  const [activeConvId, setActiveConvId] = useState(3);
  const [messages, setMessages] = useState(mockMessages);
  
  // NOUVEL ÉTAT : Permet de basculer entre la liste et le chat sur mobile
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  const currentConv = mockRequests.find(r => r.id === activeConvId);
  const currentMessages = messages.filter(m => m.id_request === activeConvId);
  const currentAd = mockAds.find(ad => ad.id === currentConv?.id_ad);

  const handleSelectContact = (id) => {
    setActiveConvId(id);
    setShowChatOnMobile(true); // Sur mobile, on bascule automatiquement sur l'affichage du chat
  };

  const handleSendMessage = (textFromInput) => {
    const receiverId = currentConv.id_user === CURRENT_USER_ID ? currentConv.id_helper : currentConv.id_user;
    const newDbMessage = {
      id: Date.now(),
      id_request: activeConvId,
      id_sender: CURRENT_USER_ID,
      id_receiver: receiverId,
      content: textFromInput, 
      created_at: new Date().toISOString()
    };
    setMessages([...messages, newDbMessage]);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-white overflow-hidden font-sans select-none">
      
      {/* 1. SIDEBAR : Cachée sur mobile si le chat est ouvert */}
      <aside className={`w-full md:w-80 border-r border-gray-200 flex flex-col h-full
        ${showChatOnMobile ? 'hidden md:flex' : 'flex'}`}>
        
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">Messagerie</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {mockRequests.map((req) => (
            <Onecontact 
              key={req.id}
              mockAds={mockAds}
              request={req}
              isActive={req.id === activeConvId}
              onClick={() => handleSelectContact(req.id)} // Utilise la nouvelle fonction
            />
          ))}
        </div>
      </aside>

      {/* 2. ZONE DE CHAT : Cachée sur mobile si la liste est ouverte */}
      <main className={`flex-1 h-full bg-white overflow-hidden relative
        ${showChatOnMobile ? 'flex flex-col' : 'hidden md:flex md:flex-col'}`}>
        
        {/* BOUTON RETOUR : Visible UNIQUEMENT sur Mobile */}
        {showChatOnMobile && (
          <div className="md:hidden bg-gray-50 border-b border-gray-200 p-2 flex items-center">
            <button 
              onClick={() => setShowChatOnMobile(false)}
              className="text-[#5C4FE5] font-semibold text-sm flex items-center gap-1 p-2 active:bg-gray-200 rounded-lg"
            >
               Retour aux messages
            </button>
          </div>
        )}

        {currentConv ? (
          <ChatArea 
            request={currentConv}
            ad={currentAd}
            mockAds={mockAds}
            messages={currentMessages}
            currentUserId={CURRENT_USER_ID}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium p-4 text-center">
            Sélectionnez une discussion pour commencer à discuter.
          </div>
        )}
      </main>

    </div>
  );
}

export default MessagerieScreen;