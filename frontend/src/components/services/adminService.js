import { authFetch } from "./api";

export const getStatsService = async () => {
  console.log("1. Appel de getStatsService lancé...");
  const response = await authFetch("/admin/stats");
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! Statut: ${response.status}`);
  }
  
  const jsonParsed = await response.json();
  
  return jsonParsed;
};