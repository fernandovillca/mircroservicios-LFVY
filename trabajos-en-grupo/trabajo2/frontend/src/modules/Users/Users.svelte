<script>
  import Layout from "../../layouts/Main.svelte";
  import { AuthService } from "../../api/usersService";

  let users = [];

  const fetchUsers = async () => {
    try {
      const response = await AuthService.getUsers();
      users = response.data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
</script>

<Layout>
  <h3>Gestión de usuarios</h3>
  <hr />
  <div class="card">
    <div class="card-body">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user, index}
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.nombre}</td>
              <td>{user.apellidos}</td>
              <td>{user.correo}</td>
              <td>{user.rol}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Layout>
