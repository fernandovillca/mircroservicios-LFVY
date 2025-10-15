import Login from "./modules/Auth/Login.svelte";
import Register from "./modules/Auth/Register.svelte";
import Home from "./modules/Home/Home.svelte";
import Users from "./modules/Users/Users.svelte";
import Tickets from "./modules/tickets/Tickets.svelte";
import MyPurchases from "./modules/purchases/MyPurchases.svelte";
import AllEvents from "./modules/events/AllEvents.svelte";
import { protectedRoute } from "./services/protectedRoute.js";

import Events from "./modules/events/Events.svelte";
import CreateEvent from "./modules/events/CreateEvent.svelte";
import EditEvent from "./modules/events/EditEvent.svelte";

const routes = {
  "/": Home,
  "/login": Login,
  "/register": Register,
  "/users": Users,
  "/events": Events,
  "/events/create": CreateEvent,
  "/events/edit/:id": EditEvent,
  "/AllEvents": AllEvents,
};

export default routes;
