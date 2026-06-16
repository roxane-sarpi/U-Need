
import { API_URL, authFetch } from "./api";

export const getCategories = () =>
  fetch(`${API_URL}/categories`);

export const updateCategory = (id, category) =>
  authFetch(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(category)
  });
