import { authFetch } from "./api";

const handleResponse = (res) => {
  if (!res.ok) {
    console.warn(`Le serveur a répondu avec un statut : ${res.status}`);
    return [];
  }
  return res.json().catch(() => []);
};

export const getServicesByHelper = (id) =>
  authFetch(`/requests/helper/${id}`)
    .then(handleResponse)
    .catch((err) => {
      console.error(err);
      return [];
    });

export const getHistoryByUser = (id) =>
  authFetch(`/requests/history/${id}`)
    .then(handleResponse)
    .catch((err) => {
      console.error(err);
      return [];
    });

export const getConversationsByUser = (id) =>
  authFetch(`/requests/conversations/${id}`)
    .then(handleResponse)
    .catch((err) => {
      console.error(err);
      return [];
    });

export const updateRequestStatus = (requestId, status) =>
  authFetch(`/requests/${requestId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', // 👈 INDISPENSABLE pour le JSON
    },
    body: JSON.stringify({ status }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Impossible de mettre à jour la requête (${res.status})`);
    }
    return true;
  });