import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import { useLocation } from 'react-router-dom';
import Onecontact from '../../components/messaging/Onecontact';
import ChatArea from '../../components/messaging/ChatArea';
import { getConversationsByUser, updateRequestStatus, createRequest } from '../../components/services/requestService';
import { getConversationByRequestId, sendMessage, deleteConversation } from '../../components/services/messageService';

function MessagerieScreen() {
  const { user } = useAuth();
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadConversations = async () => {
      setError('');
      try {
        const conversationList = await getConversationsByUser(user.id);
        setRequests(conversationList || []);
        if (!activeRequestId && conversationList?.length) {
          setActiveRequestId(conversationList[0].id);
        }
      } catch (err) {
        setError('Impossible de charger les conversations.');
      }
    };

    loadConversations();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const { id_ad, id_user } = location.state || {};
    
    if (id_ad && id_user && id_user !== user.id) {
      const createNewRequest = async () => {
        try {
          await createRequest(id_ad, id_user, user.id);
          const conversationList = await getConversationsByUser(user.id);
          setRequests(conversationList || []);
          if (conversationList?.length) {
            setActiveRequestId(conversationList[0].id);
          }
        } catch (err) {
          setError('Impossible de créer la conversation. Vérifiez que vous n\'avez pas déjà postulé.');
        }
      };

      createNewRequest();
    }
  }, [user, location.state]);

  useEffect(() => {
    if (!activeRequestId || !user) return;

    const loadMessages = async () => {
      setIsLoading(true);
      setError('');
      try {
        const conversation = await getConversationByRequestId(activeRequestId);
        setMessages(conversation || []);
      } catch (err) {
        setError('Impossible de charger les messages.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, [activeRequestId, user]);

  const currentRequest = requests.find((req) => req.id === activeRequestId);

  const handleSelectContact = (id) => {
    setActiveRequestId(id);
    setShowChatOnMobile(true);
  };

  const handleSendMessage = async (text) => {
    if (!currentRequest || !user) return;

    const receiverId = currentRequest.id_user === user.id ? currentRequest.id_helper : currentRequest.id_user;

    const payload = {
      content: text,
      id_sender: user.id,
      id_receiver: receiverId,
      id_request: activeRequestId,
    };

    try {
      await sendMessage(payload);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...payload,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError("Impossible d'envoyer le message.");
    }
  };

  const handleDeleteConversation = async (requestId) => {
    if (!user) return;

    try {
      await deleteConversation(requestId);
      setRequests((prev) => prev.filter((req) => req.id !== requestId));
      if (activeRequestId === requestId) {
        const remaining = requests.filter((req) => req.id !== requestId);
        setActiveRequestId(remaining.length ? remaining[0].id : null);
        setMessages([]);
      }
    } catch (err) {
      setError(err.message || "Impossible de supprimer la conversation.");
    }
  };

const handleRequestDecision = async (status) => {
    if (!currentRequest || !user) return;

    // Sécurité : on force la valeur à correspondre à l'ENUM MySQL ('accepter' ou 'refuser')
    const cleanStatus = status.toLowerCase().trim();

    try {
      await updateRequestStatus(currentRequest.id, cleanStatus);
      const refreshedRequests = await getConversationsByUser(user.id);
      setRequests(refreshedRequests || []);
      
      if (!refreshedRequests.some((req) => req.id === currentRequest.id)) {
        setActiveRequestId(refreshedRequests.length ? refreshedRequests[0].id : null);
      } else {
        setActiveRequestId(currentRequest.id);
      }
    } catch (err) {
      setError("Impossible de mettre à jour l'état de la demande.");
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-600">
        <h1 className="text-2xl font-bold mb-4">Messagerie</h1>
        <p>Veuillez vous connecter pour accéder à la messagerie.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-white overflow-hidden font-sans select-none">
      <aside className={`w-full md:w-80 border-r border-gray-200 flex flex-col h-full ${showChatOnMobile ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">Messagerie</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {requests.length > 0 ? (
            requests.map((req) => (
              <Onecontact
                key={req.id}
                request={req}
                isActive={req.id === activeRequestId}
                onClick={() => handleSelectContact(req.id)}
                canDelete={req.ad_owner_id === user.id || (req.id_helper === user.id && req.status !== 'en cours')}
                onDeleteConversation={handleDeleteConversation}
              />
            ))
          ) : (
            <div className="p-6 text-sm text-gray-500">Aucune conversation trouvée.</div>
          )}
        </div>
      </aside>

      <main className={`flex-1 h-full bg-white overflow-hidden relative ${showChatOnMobile ? 'flex flex-col' : 'hidden md:flex md:flex-col'}`}>
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

        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-100">{error}</div>
        )}

        {currentRequest ? (
          <ChatArea
            request={currentRequest}
            messages={messages}
            currentUserId={user.id}
            onSendMessage={handleSendMessage}
            onAccept={() => handleRequestDecision('accepter')} 
            onRefuse={() => handleRequestDecision('refuser')}
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
