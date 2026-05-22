
export const API_URL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT || 5000}`;

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