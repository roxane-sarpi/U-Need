
import { API_URL} from "./api";


export const getAds = () =>
  fetch(`${API_URL}/ads`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  });

export const getRecentAds = (limit = 4) =>
  fetch(`${API_URL}/ads/recent?limit=${limit}`).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });

export const getAdsByUser = (id) =>
  fetch(`${API_URL}/ads/user/${id}`).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
  });
