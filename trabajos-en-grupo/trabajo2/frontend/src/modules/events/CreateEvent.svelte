<script>
  import { push } from 'svelte-spa-router';
  import { EventsService } from '../../api/eventsService';
  import Layout from "../../layouts/Main.svelte";
  let form = {
    name: '',
    date: '',
    location: '',
    capacity: 0,
    price: 0
  };

  let loading = false;
  let error = '';

  async function handleSubmit() {
    try {
      loading = true;
      error = '';
      
      await EventsService.createEvent(form);
      push('/events');
    } catch (err) {
      error = err.response?.data?.message || 'Error al crear el evento';
      console.error(err);
    } finally {
      loading = false;
    }
  }
</script>

<div class="container">
  <div class="form-wrapper">
    <h1>Crear Nuevo Evento</h1>
    
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="name">Nombre del Evento *</label>
        <input
          id="name"
          type="text"
          bind:value={form.name}
          required
          placeholder="Ej: Concierto de Rock"
        />
      </div>

      <div class="form-group">
        <label for="date">Fecha y Hora *</label>
        <input
          id="date"
          type="datetime-local"
          bind:value={form.date}
          required
        />
      </div>

      <div class="form-group">
        <label for="location">Ubicación *</label>
        <input
          id="location"
          type="text"
          bind:value={form.location}
          required
          placeholder="Ej: Estadio Nacional"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="capacity">Capacidad *</label>
          <input
            id="capacity"
            type="number"
            bind:value={form.capacity}
            required
            min="1"
            placeholder="0"
          />
        </div>

        <div class="form-group">
          <label for="price">Precio ($) *</label>
          <input
            id="price"
            type="number"
            bind:value={form.price}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <div class="actions">
        <button type="button" on:click={() => push('/events')} class="btn-secondary">
          Cancelar
        </button>
        <button type="submit" disabled={loading} class="btn-primary">
          {loading ? 'Guardando...' : 'Crear Evento'}
        </button>
      </div>
    </form>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .form-wrapper {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  h1 {
    margin: 0 0 2rem 0;
    color: #333;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }

  input:focus {
    outline: none;
    border-color: #4CAF50;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  button {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background: #4CAF50;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    opacity: 0.9;
  }

  .btn-secondary {
    background: #e0e0e0;
    color: #333;
  }

  .btn-secondary:hover {
    opacity: 0.8;
  }

  .error {
    color: #f44336;
    margin: 1rem 0;
    padding: 0.75rem;
    background: #ffebee;
    border-radius: 6px;
  }
</style>