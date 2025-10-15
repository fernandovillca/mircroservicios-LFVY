<script>
  import { push } from "svelte-spa-router";
  import Layout from "../../layouts/Main.svelte";
  import { EventsService } from "../../api/eventsService";

  let name = "";
  let date = "";
  let location = "";
  let capacity = "";
  let price = "";

  let error = "";
  let success = "";

  async function handleSave() {
    error = "";
    success = "";

    if (!name || !date || !location || !capacity || !price) {
      error = "Por favor, complete todos los campos.";
      return;
    }

    try {
      await EventsService.createEvent({
        name,
        date,
        location,
        capacity,
        price,
      });
      success = "Evento creado exitosamente.";
      setTimeout(() => push("/events"), 1500);
    } catch (err) {
      error = err.response?.data?.message || "Error al crear el evento.";
    }
  }
</script>

<Layout>
  <h3 class="text-center">Crear Evento</h3>

  <hr />

  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
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
              placeholder="Nombre del evento"
              bind:value={name}
            />
            <label for="name">Nombre</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="date"
              class="form-control"
              id="date"
              placeholder="Fecha del evento"
              bind:value={date}
            />
            <label for="date">Fecha</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="location"
              placeholder="lugar del evento"
              bind:value={location}
            />
            <label for="location">Lugar del evento</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              id="floatingCapacity"
              placeholder="Capacidad"
              bind:value={capacity}
            />
            <label for="floatingCapacity">Capacidad</label>
          </div>
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="price"
              placeholder="Precio"
              bind:value={price}
            />
            <label for="price">Precio</label>
          </div>

          <div class="d-grid">
            <button class="btn btn-primary mt-3" on:click={handleSave}>
              Crear Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>
