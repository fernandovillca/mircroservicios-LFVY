import { createApi } from "./axiosBase";

const authApi = createApi("http://localhost:3000/api");

export const AuthService = {
  register(data) {
    return authApi.post("/users", data);
  },

  getUsers() {
    return authApi.get("/users");
  },

  login(data) {
    return authApi.post("/auth/login", data);
  },
};
