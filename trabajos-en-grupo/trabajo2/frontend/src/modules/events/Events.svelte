<script>
  import Layout from "../../layouts/Main.svelte";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { EventsService } from "../../api/eventsService";

  let events = [];
  let loading = true;
  let error = "";

  async function loadEvents() {
    try {
      loading = true;
      error = "";
      const response = await EventsService.getEvents();
      events = response.data;
    } catch (err) {
      error = "Error al cargar los eventos";
      console.error(err);
    } finally {
      loading = false;
    }
  }

  async function deleteEvent(id) {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;

    try {
      await EventsService.deleteEvent(id);
      await loadEvents();
    } catch (err) {
      alert("Error al eliminar el evento");
      console.error(err);
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  onMount(() => {
    loadEvents();
  });
</script>

<Layout>
  <div class="container">
    <header>
      <h1></h1>
      <a href="/events/create" use:link class="btn-primary">+ Crear Evento</a>
    </header>

    {#if loading}
      <p class="loading">Cargando eventos...</p>
    {:else if error}
      <p class="error">{error}</p>
    {:else if events.length === 0}
      <p class="empty">No hay eventos registrados</p>
    {:else}
      <div class="events-grid">
        {#each events as event}
          <div class="event-card">
            <h2>{event.name}</h2>
            <p class="date">{formatDate(event.date)}</p>
            <p class="location">{event.location}</p>
            <div class="details">
              <span> Capacidad: {event.capacity}</span>
              <span> ${event.price}</span>
            </div>
            <div class="actions">
              <a href="/events/{event._id}/edit" use:link class="btn-edit"
                >Editar</a
              >
              <button
                on:click={() => deleteEvent(event._id)}
                class="btn-delete"
              >
                Eliminar
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Layout>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h1 {
    color: #333;
    margin: 0;
  }

  .btn-primary {
    background: #4caf50;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s;
  }

  .btn-primary:hover {
    background: #45a049;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .event-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s,
      box-shadow 0.2s;
  }

  .event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .event-card h2 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
    font-size: 1.3rem;
  }

  .date,
  .location {
    margin: 0.5rem 0;
    color: #666;
  }

  .details {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 6px;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .btn-edit,
  .btn-delete {
    flex: 1;
    padding: 0.5rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    border: none;
    transition: opacity 0.2s;
  }

  .btn-edit {
    background: #2196f3;
    color: white;
  }

  .btn-delete {
    background: #f44336;
    color: white;
  }

  .btn-edit:hover,
  .btn-delete:hover {
    opacity: 0.8;
  }

  .loading,
  .error,
  .empty {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
  }

  .error {
    color: #f44336;
  }
</style>
