
import { API_URL, authFetch } from "./api";

export const updateCategory = (id, category) =>
  authFetch(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),
  });

  export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);

  console.log("RESPPPONSE :", response);
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! Statut: ${response.status}`);
  }
  
  return await response.json(); // On extrait et on renvoie directement l'objet JSON
};
