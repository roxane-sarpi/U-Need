import { authFetch } from "./api";

export const getUserById = (id) =>
  authFetch(`/users/${id}`).then((res) => res.json());

// 🆕 Correction : On sépare l'id et les données utilisateur (data)
export const updateUser = async (id, data) => {
  try {
    const response = await authFetch(`/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // On envoie le payload des modifications
    });

    // Gestion centralisée des erreurs HTTP
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const serverMessage = body?.message || response.statusText || "Erreur serveur";
      throw new Error(serverMessage);
    }

    // Renvoie directement les données JSON nettoyées au composant
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de updateUser pour l'id ${id} :`, error);
    // On propage l'erreur textuelle pour que le composant puisse l'afficher dans l'interface
    throw error;
  }
};