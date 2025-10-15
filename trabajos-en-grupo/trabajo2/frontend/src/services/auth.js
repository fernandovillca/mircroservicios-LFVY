import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // contiene { id, role, ... }
  } catch (err) {
    console.error("Token inválido", err);
    return null;
  }
}

export function isAuthenticated() {
  return !!getUser();
}

export function hasRole(requiredRole) {
  const user = getUser();
  return user && user.role === requiredRole;
}
