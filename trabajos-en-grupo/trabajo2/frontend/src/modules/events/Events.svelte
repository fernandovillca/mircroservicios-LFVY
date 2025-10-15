<script>
  import Layout from "../../layouts/Main.svelte";

  import { EventsService } from "../../api/eventsService";

  let events = [];

  const fetchEvents = async () => {
    try {
      const response = await EventsService.getEvents();
      events = response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvents();
</script>

<Layout>
  <h3>
    Gestión de eventos
    <a href="#/events/create" class="btn btn-primary">
      <i class="bi bi-plus-circle"></i>
      Agregar evento
    </a>
  </h3>
  <hr />
  <div class="card">
    <div class="card-body">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Lugar</th>
            <th scope="col">Precio</th>
            <th scope="col">Capacidad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {#each events as event, index}
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>Bs. {event.price}</td>
              <td>{event.capacity}</td>
              <td>
                <a
                  class="btn btn-sm btn-warning"
                  href={`#/events/edit/${event._id}`}
                >
                  <i class="bi bi-pencil"></i>
                </a>
                <span class="btn btn-sm btn-danger">
                  <i class="bi bi-trash3"></i>
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Layout>
