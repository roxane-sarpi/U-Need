import { authFetch } from "./api";

// Récupérer l'historique des messages d'une requête (le tchat)
export const getConversationByRequestId = (requestId) =>
  authFetch(`/messages/${requestId}`).then((res) => {
    if (!res.ok) return [];
    return res.json().catch(() => []);
  });

// Envoyer un nouveau message
export const sendMessage = (payload) =>
  authFetch(`/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) throw new Error("Erreur lors de l'envoi");
    if (res.status === 201) return { success: true };
    return res.json().catch(() => ({ success: true }));
  });