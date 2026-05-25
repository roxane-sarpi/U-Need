import { authFetch } from "./api";

export const getUserById = (id) =>
  authFetch(`/users/${id}`).then((res) => res.json());
