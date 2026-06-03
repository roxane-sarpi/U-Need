
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5020";

export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};