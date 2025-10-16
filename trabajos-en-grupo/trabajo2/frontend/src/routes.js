import Login from "./modules/Auth/Login.svelte";
import Register from "./modules/Auth/Register.svelte";
import Home from "./modules/Home/Home.svelte";
import Users from "./modules/Users/Users.svelte";
import MyPurchases from "./modules/purchases/MyPurchases.svelte";
import { protectedRoute } from "./services/protectedRoute.js";

import Events from "./modules/events/Events.svelte";
import CreateEvent from "./modules/events/CreateEvent.svelte";

const routes = {
  "/": Home,
  "/login": Login,
  "/register": Register,
  "/users": Users,
  "/events": Events,
  "/events/create": CreateEvent,
  "/mis-tickets": MyPurchases,
};

export default routes;
