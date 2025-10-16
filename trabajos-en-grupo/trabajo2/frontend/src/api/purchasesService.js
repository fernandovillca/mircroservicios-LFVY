import { createApi } from "./axiosBase";

const purchaseApi = createApi("http://localhost:8000/api");

export const PurchasesService = {
  purchaseTickets(purchaseData) {
    return purchaseApi.post("/purchases", purchaseData);
  },

  payForTickets(id) {
    return purchaseApi.post(`/purchases/${id}/pay`);
  },

  getMyPurchases() {
    return purchaseApi.get("/purchases/mine");
  },
};
