import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminPizzaService } from "../../../api/services/adminPizzaService";
import { normalizePizza } from "../../../utils/normalizePizza";
import { validatePizzaForm } from "../../../utils/validatePizzaForm";
import { PizzaForm } from "./AdminPizzaFormTypes";

export function usePizzaForm(pizzaId?: string) {
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<PizzaForm>({
    title: "",
    price: 0,
    imageUrl: "",
    category: null,
    types: [],
    sizes: [],
    description: "",
  });

  const [priceInput, setPriceInput] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof PizzaForm, string>>>({});


  useEffect(() => {
    if (!pizzaId) return;
    const loadPizza = async () => {
      const data = await AdminPizzaService.getById(pizzaId);
      setPizza(data);
      setPriceInput(String(data.price));
    };
    loadPizza();
  }, [pizzaId]);

 

  const handleSubmit = async () => {
    const normalized = normalizePizza(pizza);
    const validationErrors = validatePizzaForm(normalized);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      if (pizzaId) await AdminPizzaService.update(pizzaId, normalized);
      else await AdminPizzaService.create(normalized);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return { pizza, setPizza, priceInput, setPriceInput, errors, handleSubmit };
}