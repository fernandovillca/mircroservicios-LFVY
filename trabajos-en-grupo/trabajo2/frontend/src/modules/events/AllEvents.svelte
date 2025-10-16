<script>
  import { push } from "svelte-spa-router";
  import { EventsService } from "../../api/eventsService";
  import { PurchasesService } from "../../api/purchasesService";

  let events = [];
  let selectedEvent = null;
  let quantity = 1;
  let total = 0;

  const fetchEvents = async () => {
    try {
      const response = await EventsService.getEvents();
      events = response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvents();

  const formatearFecha = (fecha) => {
    const [anio, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${anio}`;
  };

  const openModal = (event) => {
    selectedEvent = event;
    console.log(selectedEvent);
    quantity = 1;
    total = event.price;
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
  };

  const updateTotal = () => {
    total = (selectedEvent?.price || 0) * quantity;
  };

  const confirmarCompra = async () => {
    if (!selectedEvent || quantity <= 0) {
      Swal.fire("Seleccione una cantidad válida de tickets.");
      return;
    }

    try {
      const data = {
        event_id: selectedEvent._id || selectedEvent.id,
        quantity: quantity,
      };

      await PurchasesService.purchaseTickets(data);

      Swal.fire({
        title: "Compra realizada con éxito.",
        text: "Tu compra ha sido procesada correctamente.",
        icon: "success",
      });

      push("/mis-tickets");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("exampleModal")
      );
      modal.hide();
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };
</script>

<h3 class="text-center">Eventos Disponibles</h3>

<hr />

<div class="">
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {#each events as event, index}
        <div class="col">
          <div class="card shadow-sm border-dark">
            <div class="card-body">
              <p class="h5 text-center">{event.name}</p>
              <hr />

              <span>
                <strong>lugar:</strong>
                {event.location}
              </span>
              <p>
                <strong>fecha:</strong>
                {formatearFecha(event.date)}
              </p>

              <span class="badge bg-info text-dark p-2">
                Bs. {event.price}
              </span>

              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    on:click={() => openModal(event)}
                  >
                    Comprar
                  </button>
                </div>
                <small class="text-body-secondary">
                  Cantidad Disponible: #{event.capacity}
                </small>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Modal de compra -->
<div
  class="modal fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    {#if selectedEvent}
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Comprar tikets para <strong>{selectedEvent.name}</strong>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <p>Detalles del evento:</p>
            <ul>
              <li><strong>Nombre:</strong> {selectedEvent.name}</li>
              <li><strong>Lugar:</strong> {selectedEvent.location}</li>
              <li>
                <strong>Fecha:</strong>
                {formatearFecha(selectedEvent.date)}
              </li>
              <li><strong>Precio:</strong> Bs. {selectedEvent.price}</li>
            </ul>
          </div>
          <hr />
          <div class="mb-3 row">
            <label for="inputCantidad" class="col-sm-5 col-form-label">
              Cantidad de Entradas:
            </label>
            <div class="col-sm-5">
              <input
                type="number"
                class="form-control"
                id="inputCantidad"
                bind:value={quantity}
                min="1"
                max={selectedEvent.capacity}
                on:input={updateTotal}
              />
            </div>
          </div>
          <div class="text-end h5">
            <p>
              Total a Pagar: <strong>Bs. {total}</strong>
            </p>
          </div>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancelar Compra
          </button>
          <button
            type="button"
            class="btn btn-primary"
            on:click={confirmarCompra}
          >
            Confirmar Compra
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
