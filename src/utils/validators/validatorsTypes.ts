import { PizzaForm } from "../../pages/admin/AdminPizzaForm/AdminPizzaFormTypes";

export type StringValidationOptions = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };

  export type PizzaFormErrors = Partial<
  Record<keyof PizzaForm, string>
>;