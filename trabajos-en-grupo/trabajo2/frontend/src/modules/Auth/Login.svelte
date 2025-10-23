<script>
  import { push } from "svelte-spa-router";
  import { AuthService } from "../../api/usersService";
  import { setAuthData } from "../../stores/auth";

  let correo = "";
  let password = "";
  let error = "";
  let success = "";

  async function handleLogin() {
    error = "";
    try {
      const res = await AuthService.login({ correo, password });

      const token = res.data?.token;

      if (token) {
        setAuthData(res.data.user || {}, token);
        success = "Inicio de sesión exitoso, redirigiendo...";
        clearForm();
        setTimeout(() => push("/"), 1500);
      } else {
        error = "Token no proporcionado en la respuesta.";
      }
    } catch (err) {
      error = err.response?.data?.message || "Error al iniciar sesión.";
    }
  }

  const clearForm = () => {
    correo = "";
    password = "";
    error = "";
  };

  function goToRegister() {
    push("/register");
  }
</script>

<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
        <div class="card-header text-center h4">Iniciar Sesión</div>

        <div class="card-body">
          {#if error}
            <div class="alert alert-danger">{error}</div>
          {/if}
          {#if success}
            <div class="alert alert-success">{success}</div>
          {/if}

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
              id="password"
              placeholder="Password"
              bind:value={password}
            />
            <label for="password">Contraseña</label>
          </div>

          <div class="d-grid">
            <button class="btn btn-primary mt-3" on:click={handleLogin}>
              Iniciar Sesión
            </button>

            <button
              class="btn btn-link text-end mt-2"
              type="button"
              on:click={goToRegister}
            >
              Registrarme
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
