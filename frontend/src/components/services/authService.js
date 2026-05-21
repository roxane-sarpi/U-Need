import { API_URL } from "./api";

export const register = (userData) => {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const login = (credentials) => {
  return fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (!res.ok) throw new Error("Identifiants incorrects");
    return res.json();
  });
};
