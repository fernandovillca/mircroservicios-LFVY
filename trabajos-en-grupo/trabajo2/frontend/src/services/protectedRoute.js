import { push } from "svelte-spa-router";
import { isAuthenticated, hasRole } from "./auth.js";
import Login from "../modules/Auth/Login.svelte";
import Home from "../modules/Home/Home.svelte";

export function protectedRoute(Component, requiredRole = null) {
  if (!isAuthenticated()) {
    push("/login");
    return Login; // 👈 devolvemos un componente válido
  }

  if (requiredRole && !hasRole(requiredRole)) {
    alert("Acceso denegado");
    push("/home");
    return Home; // 👈 también devolvemos un componente
  }

  return Component; // 👈 válido para mostrar
}
