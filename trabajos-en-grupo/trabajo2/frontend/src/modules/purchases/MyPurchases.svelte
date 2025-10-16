<script>
  import Layout from "../../layouts/Main.svelte";

  import { PurchasesService } from "../../api/purchasesService";

  let purchases = [];

  const fetchPurchases = async () => {
    try {
      const response = await PurchasesService.getMyPurchases();
      purchases = response.data.purchases;
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  fetchPurchases();

  const confirmarPago = async (purchaseId) => {
    try {
      Swal.fire({
        title: "Seguro que deseas pagar?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, pagar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await PurchasesService.payForTickets(purchaseId);

          Swal.fire({
            title: "Pago realizado con éxito.",
            text: "Tu pago ha sido procesado correctamente.",
            icon: "success",
          });

          fetchPurchases();
        }
      });
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };
</script>

<Layout>
  <h3>Mis Tickets</h3>

  <hr />

  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {#each purchases as purchase, index}
        <div class="col">
          <div class="card shadow-sm border-dark">
            <div class="card-body">
              <p class="h5 text-center">{purchase.event_title}</p>
              <hr />

              <span>
                <strong>Precio por ticket: </strong>
                <span class="badge bg-info text-dark p-2">
                  Bs. {purchase.price}</span
                >
              </span><br />
              <span>
                <strong>Cantidad: </strong>
                <span class="badge bg-warning text-dark p-2">
                  {purchase.quantity}</span
                >
              </span><br />
              <span>
                <strong>Total: </strong>
                <span class="badge bg-secondary text-white p-2">
                  Bs. {purchase.total}</span
                >
              </span>
              <p>
                <strong>Estado de compra:</strong>
                <span
                  class="badge {purchase.status === 'pendiente'
                    ? 'bg-danger'
                    : 'bg-success'} text-white p-2"
                >
                  {purchase.status}
                </span>
              </p>

              <hr />
              <div class="d-flex">
                {#if purchase.status === "pendiente"}
                  <div class="btn-group w-100">
                    <button
                      type="button"
                      class="btn btn-primary"
                      on:click={() => confirmarPago(purchase.id)}
                    >
                      Pagar
                    </button>
                  </div>
                {:else}
                  <div class="btn-group w-100">
                    <button type="button" class="btn btn-secondary" disabled>
                      Pagado
                    </button>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</Layout>
