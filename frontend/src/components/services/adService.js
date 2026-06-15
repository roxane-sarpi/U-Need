import { API_URL} from "./api";

export const getAds = () =>
  fetch(`${API_URL}/ads`).then((res) => res.json());

export const getAdsByUser = (id) =>
  fetch(`${API_URL}/ads/user/${id}`).then((res) => res.json());
