import { PizzaForm } from "../pages/admin/AdminPizzaForm/AdminPizzaFormTypes";

export const normalizePizza = (data: PizzaForm) => ({
  ...data,
  title: data.title.trim(),
  description: data.description.trim(),
  imageUrl: data.imageUrl.trim(),
});
