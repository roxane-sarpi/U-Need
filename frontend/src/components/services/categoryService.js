import { API_URL } from "./api";

export const getCategories = () =>
  fetch(`${API_URL}/categories`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  });
