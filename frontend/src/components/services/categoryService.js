
import { API_URL, authFetch } from "./api";

export const getCategories = () =>
  fetch(`${API_URL}/categories`);

export const updateCategory = (id, category) =>
  authFetch(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category),

export const getCategories = () =>
  fetch(`${API_URL}/categories`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  });
