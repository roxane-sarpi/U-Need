
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5020";

export function buildUrl(resourcePath) {
  if (!resourcePath) return null;
  const path = resourcePath.startsWith('/') ? resourcePath : `/${resourcePath}`;
  return `${API_URL}${path}`;
}

// Décoder le JWT et récupérer le payload
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return null;
  }
};

// Vérifier si le token est expiré
export const isTokenExpired = (token) => {
  if (!token) return true;
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  // exp est en secondes, Date.now() en millisecondes
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  // Ajouter 1 minute de marge de sécurité
  return currentTime > expirationTime - 60000;
};

// Gérer la déconnexion (logout)
const handleTokenExpired = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");
  
  // Vérifier si le token est expiré AVANT de faire l'appel
  if (token && isTokenExpired(token)) {
    handleTokenExpired();
    // Retourner une promise rejetée
    return Promise.reject(new Error("Token expiré"));
  }
  
  const isFormData = options.body instanceof FormData;
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  }).then((response) => {
    // Intercepter les 401 (token invalide/expiré d'après le backend)
    if (response.status === 401) {
      console.warn("Token invalide ou expiré - déconnexion automatique");
      handleTokenExpired();
    }
    return response;
  });
};