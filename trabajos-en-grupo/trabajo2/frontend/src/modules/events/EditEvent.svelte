<script>
  import Layout from "../../layouts/Main.svelte";

  export let id; // Se recibe automáticamente desde la ruta dinámica

  console.log("ID recibido:", id);
</script>

<Layout>
  <h3 class="text-center">Editar Evento</h3>
  <hr />
</Layout>
