import { authFetch } from "./api";

export const getServicesByHelper = (id) =>
  authFetch(`/requests/helper/${id}`).then((res) => res.json());

export const getHistoryByUser = (id) =>
  authFetch(`/requests/history/${id}`).then((res) => res.json());
