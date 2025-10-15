<script>
  import Layout from "../../layouts/Main.svelte";
  import AllEvents from "../events/AllEvents.svelte";

  import { getUser } from "../../services/auth";

  const user = getUser();

  const role = user?.role ?? "user";
</script>

<Layout>
  {#if role === "admin"}
    <div class="text-center mb-5">
      <h2>Bienvenido al panel de administración</h2>
      <hr />

      <div class="row mt-4">
        <div class="col-4">
          <div class="card">
            <div class="card-body bg-primary">
              <h5 class="card-title text-white">Administra eventos</h5>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body bg-success">
              <h5 class="card-title text-white">Administra usuarios</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <AllEvents />
</Layout>
