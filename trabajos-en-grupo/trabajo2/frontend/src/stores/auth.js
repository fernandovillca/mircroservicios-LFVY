import { writable } from "svelte/store";

export const user = writable(null);
export const token = writable(localStorage.getItem("token") || null);

export function setAuthData(userData, tokenValue) {
  user.set(userData);
  token.set(tokenValue);
  localStorage.setItem("token", tokenValue);
}

export function logout() {
  user.set(null);
  token.set(null);
  localStorage.removeItem("token");
}
