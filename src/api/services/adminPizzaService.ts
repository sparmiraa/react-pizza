import { api } from "../axios";
import { Pizza } from "../../pages/admin/AdminDashboard/AdminPizzaTypes";

export const AdminPizzaService = {
  async getAll() {
    const { data } = await api.get<Pizza[]>("/items");
    return data;
  },
};
