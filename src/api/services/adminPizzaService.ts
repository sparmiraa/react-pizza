import { api } from "../axios";
import { Pizza } from "../../pages/admin/AdminDashboard/AdminPizzaTypes";
import { PizzaForm } from "../../pages/admin/AdminPizzaForm/AdminPizzaFormTypes";

export const AdminPizzaService = {
  async getAll() {
    const { data } = await api.get<Pizza[]>("/items");
    return data;
  },

  async getById(id: any) {
    const { data } = await api.get<PizzaForm>(`/items/${id}`);
    return data;
  },

  async create(payload: PizzaForm) {
    const { data } = await api.post<Pizza>("/items", {
      ...payload,
      rating: 0,
    });
    return data;
  },

  async update(id: string, payload: PizzaForm): Promise<Pizza> {
    const { data } = await api.put<Pizza>(`/items/${id}`, payload);
    return data;
  },
};
