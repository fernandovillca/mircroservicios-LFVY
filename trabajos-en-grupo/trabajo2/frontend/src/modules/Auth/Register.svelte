<script>
  import { push } from "svelte-spa-router";
  import { AuthService } from "../../api/usersService";

  let nombre = "";
  let apellidos = "";
  let correo = "";
  let password = "";
  let error = "";
  let success = "";

  async function handleRegister() {
    error = "";
    success = "";

    if (!nombre || !apellidos || !correo || !password) {
      error = "Por favor, complete todos los campos.";
      return;
    }

    try {
      await AuthService.register({ nombre, apellidos, correo, password });
      success = "Registro exitoso, se le redirigirá al login...";
      clearForm();
      setTimeout(() => push("/login"), 1500);
    } catch (err) {
      error = err.response?.data?.message || "Error al registrarse.";
    }
  }

  const clearForm = () => {
    nombre = "";
    apellidos = "";
    correo = "";
    password = "";
    error = "";
  };

  function goToLogin() {
    push("/login");
  }
</script>

<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
        <div class="card-header text-center h4">Registrarme</div>

        <div class="card-body">
          {#if error}
            <div class="alert alert-danger">{error}</div>
          {/if}
          {#if success}
            <div class="alert alert-success">{success}</div>
          {/if}

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Nombre"
              bind:value={nombre}
            />
            <label for="name">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="apellidos"
              placeholder="Apellidos"
              bind:value={apellidos}
            />
            <label for="apellidos">Apellidos</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="correo"
              placeholder="name@example.com"
              bind:value={correo}
            />
            <label for="correo">Correo electrónico</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              bind:value={password}
            />
            <label for="floatingPassword">Contraseña</label>
          </div>

          <div class="d-grid">
            <button class="btn btn-primary mt-3" on:click={handleRegister}>
              Registrarme
            </button>

            <button
              class="btn btn-link text-end mt-2"
              type="button"
              on:click={goToLogin}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
