<script>
  import { push } from "svelte-spa-router";
  import { getUser } from "../services/auth.js";

  const user = getUser();

  const role = user?.role ?? "user";

  const logout = () => {
    localStorage.removeItem("token");
    push("/login");
  };
</script>

<nav
  class="navbar navbar-expand-lg navbar bg-dark border-bottom border-body"
  data-bs-theme="dark"
>
  <div class="container-fluid">
    <span class="navbar-brand">Microservicios</span>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="#/">Inicio</a>
        </li>

        {#if role === "admin"}
          <li class="nav-item">
            <a class="nav-link" href="#/users">Gestión de Usuarios</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/events">Gestión de Eventos</a>
          </li>
        {/if}

        {#if role === "user"}
          <li class="nav-item">
            <a class="nav-link" href="#/mis-tickets">Mis Tikets</a>
          </li>
        {/if}
      </ul>
      <button class="btn btn-outline-light btn-sm" on:click={logout}>
        Cerrar sesión
      </button>
    </div>
  </div>
</nav>

<main class="container mt-4">
  <slot />
</main>
